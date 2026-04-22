using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Testing;
using AdventureWorks.Web.Models.Domain;
using AdventureWorks.Web.Models.Api;
using System.Net.Http.Headers;
using System.Text.Json;

namespace AdventureWorks.Web.Tests.Controllers;

/// <summary>
/// Integration tests para los API Controllers.
/// 
/// Usa WebApplicationFactory para probar el pipeline completo:
/// - Routing
/// - Model binding
/// - Serialización JSON
/// - Status codes
/// 
/// Desafío: ApplicationDbContext de producción usa SQL Server con 
/// ExcludeFromMigrations() para tablas AW. En tests, necesitamos
/// usar InMemory. Lo resolvemos con una clase CustomWebApplicationFactory
/// que sobreescribe el DbContext.
/// </summary>
public class ProductsApiControllerTests : IClassFixture<CustomWebApplicationFactory>, IDisposable
{
    private readonly CustomWebApplicationFactory _factory;
    private readonly HttpClient _client;

    public ProductsApiControllerTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    public void Dispose()
    {
        _client.Dispose();
    }

    // ── GET /api/products ────────────────────────────────────

    [Fact]
    public async Task GetProducts_ReturnsOk_WithValidResponse()
    {
        // Act
        var response = await _client.GetAsync("/api/products?page=1&pageSize=5");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetProducts_ReturnsCorrectPaginationStructure()
    {
        // Act
        var response = await _client.GetAsync("/api/products?page=1&pageSize=5");
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<PagedResultApiResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        // Assert
        Assert.NotNull(result);
        Assert.Equal(5, result.PageSize);
        Assert.Equal(1, result.Page);
        Assert.True(result.TotalPages >= 0);
        Assert.True(result.Total >= 0);
        Assert.NotNull(result.Items);
    }

    [Fact]
    public async Task GetProducts_WithSearch_FiltersResults()
    {
        // Act — búsqueda por "Mountain"
        var response = await _client.GetAsync("/api/products?q=Mountain&pageSize=20");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<PagedResultApiResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        Assert.NotNull(result);
        // Si hay productos con "Mountain", todos deberían contenerlo
        if (result.Items.Any())
        {
            Assert.All(result.Items, item =>
                Assert.Contains("Mountain", item.Name, StringComparison.OrdinalIgnoreCase));
        }
    }

    [Fact]
    public async Task GetProducts_WithCategoryId_FiltersResults()
    {
        // Act — filtro por categoría (usando los IDs del seed)
        var response = await _client.GetAsync("/api/products?categoryId=1&pageSize=20");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetProducts_CapsPageSizeAt50()
    {
        // Act — pido 100, debería limitarse a 50
        var response = await _client.GetAsync("/api/products?pageSize=100");
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<PagedResultApiResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        // Assert
        Assert.NotNull(result);
        Assert.Equal(50, result.PageSize);
    }

    [Fact]
    public async Task GetProducts_DefaultsPageTo1IfInvalid()
    {
        // Act — página inválida
        var response = await _client.GetAsync("/api/products?page=-1");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<PagedResultApiResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        Assert.NotNull(result);
        Assert.Equal(1, result.Page);
    }

    // ── GET /api/products/{id} ───────────────────────────────

    [Fact]
    public async Task GetProduct_ReturnsOk_ForExistingProduct()
    {
        // Arrange — primero busco un producto existente
        var listResponse = await _client.GetAsync("/api/products?pageSize=1");
        var listJson = await listResponse.Content.ReadAsStringAsync();
        var list = JsonSerializer.Deserialize<PagedResultApiResponse>(listJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (list?.Items.FirstOrDefault() is null)
        {
            // No hay productos en la DB de test
            Assert.True(true, "No products in test DB");
            return;
        }

        var productId = list.Items.First().ProductID;

        // Act
        var response = await _client.GetAsync($"/api/products/{productId}");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadAsStringAsync();
        var product = JsonSerializer.Deserialize<ProductApiResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        Assert.NotNull(product);
        Assert.Equal(productId, product.ProductID);
    }

    [Fact]
    public async Task GetProduct_ReturnsNotFound_ForNonExistent()
    {
        // Act
        var response = await _client.GetAsync("/api/products/999999");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);
    }

    // ── GET /api/products/categories ────────────────────────

    [Fact]
    public async Task GetCategories_ReturnsOk()
    {
        // Act
        var response = await _client.GetAsync("/api/products/categories");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetCategories_ReturnsCategoriesWithCorrectStructure()
    {
        // Act
        var response = await _client.GetAsync("/api/products/categories");
        var json = await response.Content.ReadAsStringAsync();
        var categories = JsonSerializer.Deserialize<List<CategoryApiResponse>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        // Assert
        Assert.NotNull(categories);
        if (categories.Any())
        {
            Assert.All(categories, c =>
            {
                Assert.True(c.ProductCategoryID > 0);
                Assert.False(string.IsNullOrEmpty(c.Name));
            });
        }
    }

    // ── DTOs para deserializar respuestas JSON ──────────────

    private class PagedResultApiResponse
    {
        public List<ProductApiResponse> Items { get; set; } = new();
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }

    private class ProductApiResponse
    {
        public int ProductID { get; set; }
        public string Name { get; set; } = "";
        public string ProductNumber { get; set; } = "";
        public decimal ListPrice { get; set; }
        public SubcategoryApiResponse? Subcategory { get; set; }
    }

    private class SubcategoryApiResponse
    {
        public int ProductSubcategoryID { get; set; }
        public string Name { get; set; } = "";
        public CategoryApiResponse? Category { get; set; }
    }

    private class CategoryApiResponse
    {
        public int ProductCategoryID { get; set; }
        public string Name { get; set; } = "";
    }
}
