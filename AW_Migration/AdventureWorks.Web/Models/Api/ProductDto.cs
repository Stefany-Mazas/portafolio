namespace AdventureWorks.Web.Models.Api;

/// <summary>
/// DTO de respuesta para endpoints de la API de productos.
/// Evita exponer entidades EF directamente y rompe ciclos de referencia.
/// </summary>
public class ProductDto
{
    public int ProductID { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ProductNumber { get; set; } = string.Empty;
    public string? Color { get; set; }
    public decimal ListPrice { get; set; }
    public decimal StandardCost { get; set; }
    public string? Size { get; set; }
    public decimal? Weight { get; set; }
    public string? ProductLine { get; set; }
    public string? Style { get; set; }
    public SubcategoryDto? Subcategory { get; set; }
}

public class SubcategoryDto
{
    public int ProductSubcategoryID { get; set; }
    public string Name { get; set; } = string.Empty;
    public CategoryDto? Category { get; set; }
}

public class CategoryDto
{
    public int ProductCategoryID { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}

/// <summary>DTO para crear o actualizar un producto (POST/PUT)</summary>
public class ProductUpsertDto
{
    public string Name { get; set; } = string.Empty;
    public string ProductNumber { get; set; } = string.Empty;
    public string? Color { get; set; }
    public decimal ListPrice { get; set; }
    public decimal StandardCost { get; set; }
    public string? Size { get; set; }
    public decimal? Weight { get; set; }
    public int? ProductSubcategoryID { get; set; }
}
