using AdventureWorks.Web.Models.Domain;

namespace AdventureWorks.Web.Services;

public interface IProductService
{
    Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize, string? search = null, int? categoryId = null);

    Task<Product?> GetByIdAsync(int id);
    Task<IEnumerable<ProductCategory>> GetCategoriesAsync();

    // CRUD — solo accesible para Administrator
    Task<Product> CreateAsync(Product product);
    Task<Product?> UpdateAsync(int id, Product product);
    Task<bool> DeleteAsync(int id);
}
