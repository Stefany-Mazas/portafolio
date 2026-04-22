using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdventureWorks.Web.Models.Api;
using AdventureWorks.Web.Models.Domain;
using AdventureWorks.Web.Services;

namespace AdventureWorks.Web.Controllers.Api;

/// <summary>
/// CRUD de productos — exclusivo para rol Administrator.
/// Separado del endpoint de lectura para aplicar el principio de menor privilegio.
/// </summary>
[ApiController]
[Route("api/admin/products")]
[Authorize(Roles = "Administrator")]
[Produces("application/json")]
public class AdminProductsApiController : ControllerBase
{
    private readonly IProductService _svc;

    public AdminProductsApiController(IProductService svc) => _svc = svc;

    // GET api/admin/products?q=&page=1&pageSize=20
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetAll(
        [FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var (items, total) = await _svc.GetPagedAsync(page, pageSize, q);
        return Ok(new PagedResult<ProductDto>
        {
            Items = items.Select(ToDto),
            Total = total,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)total / pageSize)
        });
    }

    // GET api/admin/products/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetOne(int id)
    {
        var p = await _svc.GetByIdAsync(id);
        return p is null ? NotFound() : Ok(ToDto(p));
    }

    // POST api/admin/products
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] ProductUpsertDto dto)
    {
        var product = FromDto(dto);
        var created = await _svc.CreateAsync(product);
        return CreatedAtAction(nameof(GetOne), new { id = created.ProductID }, ToDto(created));
    }

    // PUT api/admin/products/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, [FromBody] ProductUpsertDto dto)
    {
        var updated = await _svc.UpdateAsync(id, FromDto(dto));
        return updated is null ? NotFound() : Ok(ToDto(updated));
    }

    // DELETE api/admin/products/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _svc.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    // ── Helpers ──────────────────────────────────────────────

    private static ProductDto ToDto(Product p) => new()
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

    private static Product FromDto(ProductUpsertDto dto) => new()
    {
        Name = dto.Name,
        ProductNumber = dto.ProductNumber,
        Color = dto.Color,
        ListPrice = dto.ListPrice,
        StandardCost = dto.StandardCost,
        Size = dto.Size,
        Weight = dto.Weight,
        ProductSubcategoryID = dto.ProductSubcategoryID
    };
}
