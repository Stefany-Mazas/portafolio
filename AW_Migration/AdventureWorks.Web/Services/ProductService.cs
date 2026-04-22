using Microsoft.EntityFrameworkCore;
using AdventureWorks.Web.Data;
using AdventureWorks.Web.Models.Domain;

namespace AdventureWorks.Web.Services;

/// <summary>
/// Servicio de productos.
/// 
/// Usa ApplicationDbContext directamente para evitar ambigüedad en la inyección de dependencias.
/// </summary>
public class ProductService : IProductService
{
    private readonly ApplicationDbContext _db;

    public ProductService(ApplicationDbContext db) => _db = db;

    public async Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize, string? search = null, int? categoryId = null)
    {
        // Set<T>() funciona con cualquier DbContext (InMemory o SqlServer)
        var query = _db.Set<Product>()
            .Include(p => p.Subcategory).ThenInclude(s => s!.Category)
            .Where(p => p.SellEndDate == null && p.DiscontinuedDate == null)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search) || p.ProductNumber.Contains(search));

        if (categoryId.HasValue)
            query = query.Where(p => p.Subcategory != null &&
                                     p.Subcategory.ProductCategoryID == categoryId.Value);

        var total = await query.CountAsync();
        var items = await query.OrderBy(p => p.Name)
                               .Skip((page - 1) * pageSize)
                               .Take(pageSize)
                               .ToListAsync();
        return (items, total);
    }

    public async Task<Product?> GetByIdAsync(int id) =>
        await _db.Set<Product>()
            .Include(p => p.Subcategory).ThenInclude(s => s!.Category)
            .FirstOrDefaultAsync(p => p.ProductID == id);

    public async Task<IEnumerable<ProductCategory>> GetCategoriesAsync() =>
        await _db.Set<ProductCategory>().OrderBy(c => c.Name).ToListAsync();

    public async Task<Product> CreateAsync(Product product)
    {
        product.ModifiedDate = DateTime.UtcNow;
        if (product.SellStartDate == default) product.SellStartDate = DateTime.UtcNow;
        _db.Set<Product>().Add(product);
        await _db.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> UpdateAsync(int id, Product updated)
    {
        var existing = await _db.Set<Product>().FindAsync(id);
        if (existing is null) return null;

        existing.Name = updated.Name;
        existing.ProductNumber = updated.ProductNumber;
        existing.Color = updated.Color;
        existing.ListPrice = updated.ListPrice;
        existing.StandardCost = updated.StandardCost;
        existing.Size = updated.Size;
        existing.Weight = updated.Weight;
        existing.ProductSubcategoryID = updated.ProductSubcategoryID;
        existing.ModifiedDate = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _db.Set<Product>().FindAsync(id);
        if (product is null) return false;

        // Soft delete — marca como descontinuado, no borra el registro
        product.DiscontinuedDate = DateTime.UtcNow;
        product.ModifiedDate = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return true;
    }
}
