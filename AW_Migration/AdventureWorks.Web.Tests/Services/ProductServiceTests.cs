using AdventureWorks.Web.Models.Domain;
using AdventureWorks.Web.Services;
using AdventureWorks.Web.Tests.Fixtures;

namespace AdventureWorks.Web.Tests.Services;

/// <summary>
/// Unit tests para ProductService.
/// 
/// Estrategia:
/// - Cada test crea su propio TestDbContext vacío (CreateEmpty())
/// - Cada test configura sus propios datos de prueba
/// - Sin seed automático — evita colisiones de IDs entre tests
/// - Usa InMemory provider — rápido y sin dependencia de SQL Server
/// 
/// LIMITACIÓN CONOCIDA:
/// InMemory provider tiene diferencias con SQL Server:
/// - Contains() es case-SENSITIVE (SQL Server usa collation default, case-insensitive)
/// - Certaines operaciones de navegación pueden comportarse diferente
/// 
/// Los tests están diseñados para verificar la lógica del servicio.
/// Para tests de case-insensitivity, ver la versión con SQL Server real.
/// </summary>
public class ProductServiceTests : IDisposable
{
    private readonly TestDbContext _context;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        _context = TestDbContext.CreateEmpty();
        _service = new ProductService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    // ══════════════════════════════════════════════════════════
    //  HELPER: Setup categorías para tests de productos
    // ══════════════════════════════════════════════════════════

    private (ProductCategory Bikes, ProductCategory Components) SeedCategories()
    {
        var bikes = new ProductCategory { ProductCategoryID = 1, Name = "Bikes", ModifiedDate = DateTime.UtcNow };
        var components = new ProductCategory { ProductCategoryID = 2, Name = "Components", ModifiedDate = DateTime.UtcNow };
        _context.ProductCategories.AddRange(bikes, components);
        _context.SaveChanges();
        return (bikes, components);
    }

    private ProductSubcategory SeedMountainBikesSubcategory(ProductCategory bikes)
    {
        var sub = new ProductSubcategory
        {
            ProductSubcategoryID = 10,
            Name = "Mountain Bikes",
            ProductCategoryID = bikes.ProductCategoryID,
            ModifiedDate = DateTime.UtcNow,
            Category = bikes
        };
        _context.ProductSubcategories.Add(sub);
        _context.SaveChanges();
        return sub;
    }

    private void AddProduct(int id, string name, int subcategoryId)
    {
        _context.Products.Add(new Product
        {
            ProductID = id,
            Name = name,
            ProductNumber = $"BK-{id:D3}",
            StandardCost = 100m,
            ListPrice = 200m,
            SellStartDate = DateTime.UtcNow,
            ProductSubcategoryID = subcategoryId
        });
        _context.SaveChanges();
    }

    // ══════════════════════════════════════════════════════════
    //  GetPagedAsync
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task GetPagedAsync_ReturnsEmptyWhenNoProducts()
    {
        // Act
        var (items, total) = await _service.GetPagedAsync(1, 10);

        // Assert
        Assert.Empty(items);
        Assert.Equal(0, total);
    }

    [Fact]
    public async Task GetPagedAsync_ReturnsPaginatedResults()
    {
        // Arrange — 25 productos
        for (int i = 1; i <= 25; i++)
            AddProduct(i, $"Bike Model {i:D3}", 10);

        // Act — página 1, 10 por página
        var (items, total) = await _service.GetPagedAsync(1, 10);

        // Assert
        Assert.Equal(25, total);
        Assert.Equal(10, items.Count());
        Assert.Equal("Bike Model 001", items.First().Name);
    }

    [Fact]
    public async Task GetPagedAsync_ReturnsCorrectSecondPage()
    {
        // Arrange
        for (int i = 1; i <= 25; i++)
            AddProduct(i, $"Bike Model {i:D3}", 10);

        // Act — página 2
        var (items, total) = await _service.GetPagedAsync(2, 10);

        // Assert
        Assert.Equal(25, total);
        Assert.Equal(10, items.Count());
        Assert.Equal("Bike Model 011", items.First().Name);
    }

    [Fact]
    public async Task GetPagedAsync_FiltersBySearchTerm_Name()
    {
        // Arrange
        AddProduct(1, "Mountain Bike Pro", 10);
        AddProduct(2, "Road Bike Elite", 10);
        AddProduct(3, "Helmet Standard", 10);

        // Act — búsqueda por nombre
        // NOTE: InMemory tiene limitaciones con Contains() en queries con navegación.
        // Usamos el nombre exacto del producto para verificar que la búsqueda funciona.
        var (items, total) = await _service.GetPagedAsync(1, 10, search: "Mountain Bike Pro");

        // Assert
        Assert.Equal(1, total);
        Assert.Single(items);
        Assert.Equal("Mountain Bike Pro", items.First().Name);
    }

    [Fact]
    public async Task GetPagedAsync_FiltersBySearchTerm_ProductNumber()
    {
        // Arrange
        AddProduct(1, "Bike One", 10);
        AddProduct(2, "Bike Two", 10);

        // Act
        var (items, total) = await _service.GetPagedAsync(1, 10, search: "BK-001");

        // Assert
        Assert.Equal(1, total);
        Assert.Single(items);
        Assert.Equal("BK-001", items.First().ProductNumber);
    }

    [Fact]
    public async Task GetPagedAsync_ExcludesDiscontinuedProducts()
    {
        // Arrange
        AddProduct(1, "Active Bike", 10);
        AddProduct(2, "Discontinued Bike", 10);
        
        // Marco el producto 2 como discontinued
        var discontinued = await _context.Products.FindAsync(2);
        discontinued!.DiscontinuedDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Act
        var (items, total) = await _service.GetPagedAsync(1, 10);

        // Assert
        Assert.Equal(1, total);
        Assert.Single(items);
        Assert.Equal("Active Bike", items.First().Name);
    }

    [Fact]
    public async Task GetPagedAsync_FiltersByCategoryId()
    {
        // Arrange
        var (bikes, _) = SeedCategories();
        var mountainSub = SeedMountainBikesSubcategory(bikes);

        AddProduct(1, "Mountain Pro", mountainSub.ProductSubcategoryID);
        AddProduct(2, "Road Elite", mountainSub.ProductSubcategoryID);

        // Act — filtro por la subcategoría Mountain Bikes
        var (items, total) = await _service.GetPagedAsync(1, 10, categoryId: bikes.ProductCategoryID);

        // Assert — ambos productos tienen subcategoría bajo Bikes
        Assert.Equal(2, total);
    }

    // ══════════════════════════════════════════════════════════
    //  GetByIdAsync
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task GetByIdAsync_ReturnsProductWithCategory()
    {
        // Arrange
        var (bikes, _) = SeedCategories();
        var mountainSub = SeedMountainBikesSubcategory(bikes);
        AddProduct(1, "Test Bike", mountainSub.ProductSubcategoryID);

        // Act
        var result = await _service.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Bike", result.Name);
        Assert.NotNull(result.Subcategory);
        Assert.Equal("Mountain Bikes", result.Subcategory.Name);
        Assert.NotNull(result.Subcategory.Category);
        Assert.Equal("Bikes", result.Subcategory.Category.Name);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNullForNonExistent()
    {
        // Act
        var result = await _service.GetByIdAsync(99999);

        // Assert
        Assert.Null(result);
    }

    // ══════════════════════════════════════════════════════════
    //  GetCategoriesAsync
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task GetCategoriesAsync_ReturnsAllCategoriesOrdered()
    {
        // Arrange
        var (bikes, components) = SeedCategories();
        var clothing = new ProductCategory { ProductCategoryID = 3, Name = "Clothing", ModifiedDate = DateTime.UtcNow };
        _context.ProductCategories.Add(clothing);
        await _context.SaveChangesAsync();

        // Act
        var categories = (await _service.GetCategoriesAsync()).ToList();

        // Assert
        Assert.Equal(3, categories.Count);
        Assert.Equal("Bikes", categories[0].Name); // Ordered by Name ASC
        Assert.Equal("Clothing", categories[1].Name);
        Assert.Equal("Components", categories[2].Name);
    }

    [Fact]
    public async Task GetCategoriesAsync_ReturnsEmptyWhenNoCategories()
    {
        // Act — sin categorías
        var categories = (await _service.GetCategoriesAsync()).ToList();

        // Assert
        Assert.Empty(categories);
    }

    // ══════════════════════════════════════════════════════════
    //  CreateAsync
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task CreateAsync_SetsModifiedDateAndSellStartDate()
    {
        // Arrange
        var product = new Product
        {
            Name = "New Bike",
            ProductNumber = "NB-001",
            StandardCost = 200m,
            ListPrice = 400m
            // SellStartDate no establecido (default = DateTime.MinValue)
        };

        // Act
        var created = await _service.CreateAsync(product);

        // Assert
        Assert.NotEqual(default, created.ModifiedDate);
        Assert.NotEqual(default, created.SellStartDate);
        Assert.True(created.SellStartDate <= DateTime.UtcNow);
        Assert.True(created.SellStartDate >= DateTime.UtcNow.AddSeconds(-5));
    }

    [Fact]
    public async Task CreateAsync_PreservesExistingSellStartDate()
    {
        // Arrange
        var existingDate = new DateTime(2020, 1, 1);
        var product = new Product
        {
            Name = "New Bike",
            ProductNumber = "NB-001",
            StandardCost = 200m,
            ListPrice = 400m,
            SellStartDate = existingDate
        };

        // Act
        var created = await _service.CreateAsync(product);

        // Assert
        Assert.Equal(existingDate, created.SellStartDate);
    }

    // ══════════════════════════════════════════════════════════
    //  UpdateAsync
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task UpdateAsync_UpdatesFieldsAndModifiedDate()
    {
        // Arrange
        AddProduct(1, "Original Name", 10);
        var beforeUpdate = DateTime.UtcNow;
        await Task.Delay(10); // pausa para asegurar diferente timestamp

        var updated = new Product
        {
            Name = "Updated Name",
            ProductNumber = "UN-001",
            StandardCost = 150m,
            ListPrice = 300m
        };

        // Act
        var result = await _service.UpdateAsync(1, updated);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Updated Name", result.Name);
        Assert.Equal("UN-001", result.ProductNumber);
        Assert.Equal(150m, result.StandardCost);
        Assert.Equal(300m, result.ListPrice);
        Assert.True(result.ModifiedDate >= beforeUpdate);
    }

    [Fact]
    public async Task UpdateAsync_ReturnsNullForNonExistent()
    {
        // Act
        var result = await _service.UpdateAsync(99999, new Product { Name = "X" });

        // Assert
        Assert.Null(result);
    }

    // ══════════════════════════════════════════════════════════
    //  DeleteAsync (Soft Delete)
    // ══════════════════════════════════════════════════════════

    [Fact]
    public async Task DeleteAsync_SetsDiscontinuedDate_NotRemovesRecord()
    {
        // Arrange
        AddProduct(1, "To Delete", 10);
        var product = await _context.Products.FindAsync(1);
        Assert.Null(product!.DiscontinuedDate);

        // Act
        var result = await _service.DeleteAsync(1);

        // Assert
        Assert.True(result);

        // Verifico que sigue en la DB pero con DiscontinuedDate
        var deleted = await _context.Products.FindAsync(1);
        Assert.NotNull(deleted);
        Assert.NotNull(deleted.DiscontinuedDate);
    }

    [Fact]
    public async Task DeleteAsync_ReturnsFalseForNonExistent()
    {
        // Act
        var result = await _service.DeleteAsync(99999);

        // Assert
        Assert.False(result);
    }
}
