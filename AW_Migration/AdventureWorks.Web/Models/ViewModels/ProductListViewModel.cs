using AdventureWorks.Web.Models.Domain;

namespace AdventureWorks.Web.Models.ViewModels;

public class ProductListViewModel
{
    public IEnumerable<Product> Products { get; set; } = Enumerable.Empty<Product>();
    public IEnumerable<ProductCategory> Categories { get; set; } = Enumerable.Empty<ProductCategory>();

    // Filtros activos
    public string? Search { get; set; }
    public int? CategoryId { get; set; }

    // Paginación
    public int CurrentPage { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public int TotalCount { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
