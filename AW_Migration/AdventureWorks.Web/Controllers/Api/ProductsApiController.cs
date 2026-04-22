using Microsoft.AspNetCore.Mvc;
using AdventureWorks.Web.Models.Api;
using AdventureWorks.Web.Services;

namespace AdventureWorks.Web.Controllers.Api;

/// <summary>
/// API REST para productos — consumida por el frontend Angular.
/// Separada del MVC controller para demostrar la diferencia entre
/// [ApiController] y Controller en ASP.NET Core.
///
/// Diferencias clave vs MVC Controller:
/// - [ApiController] activa validación automática de ModelState (400 sin código extra)
/// - Binding desde body/query/route sin [FromBody] explícito en la mayoría de casos
/// - Respuestas ProblemDetails (RFC 7807) en errores de validación
/// - No devuelve vistas — solo datos serializados
/// </summary>
[ApiController]
[Route("api/products")]
[Produces("application/json")]
public class ProductsApiController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsApiController> _logger;

    public ProductsApiController(IProductService productService, ILogger<ProductsApiController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    /// <summary>
    /// GET api/products?q=bike&amp;page=1&amp;pageSize=12&amp;categoryId=1
    /// Listado paginado con búsqueda y filtro por categoría.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] string? q,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12,
        [FromQuery] int? categoryId = null)
    {
        if (pageSize > 50) pageSize = 50;
        if (page < 1) page = 1;

        var (items, total) = await _productService.GetPagedAsync(page, pageSize, q, categoryId);

        var result = new PagedResult<ProductDto>
        {
            Items = items.Select(MapToDto),
            Total = total,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)total / pageSize)
        };

        return Ok(result);
    }

    /// <summary>
    /// GET api/products/{id}
    /// Detalle de un producto por ID.
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product is null)
        {
            _logger.LogWarning("Product {ProductId} not found", id);
            return NotFound(new { message = $"Product {id} not found." });
        }

        return Ok(MapToDto(product));
    }

    /// <summary>
    /// GET api/products/categories
    /// Lista de categorías para el filtro del frontend.
    /// </summary>
    [HttpGet("categories")]
    [ProducesResponseType(typeof(IEnumerable<CategoryDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _productService.GetCategoriesAsync();
        return Ok(categories.Select(c => new CategoryDto
        {
            ProductCategoryID = c.ProductCategoryID,
            Name = c.Name
        }));
    }

    // ── Mapping ──────────────────────────────────────────────────────────────

    private static ProductDto MapToDto(Models.Domain.Product p) => new()
    {
        ProductID = p.ProductID,
        Name = p.Name,
        ProductNumber = p.ProductNumber,
        Color = p.Color,
        ListPrice = p.ListPrice,
        StandardCost = p.StandardCost,
        Size = p.Size,
        Weight = p.Weight,
        ProductLine = p.ProductLine?.Trim(),
        Style = p.Style?.Trim(),
        Subcategory = p.Subcategory is null ? null : new SubcategoryDto
        {
            ProductSubcategoryID = p.Subcategory.ProductSubcategoryID,
            Name = p.Subcategory.Name,
            Category = p.Subcategory.Category is null ? null : new CategoryDto
            {
                ProductCategoryID = p.Subcategory.Category.ProductCategoryID,
                Name = p.Subcategory.Category.Name
            }
        }
    };
}
