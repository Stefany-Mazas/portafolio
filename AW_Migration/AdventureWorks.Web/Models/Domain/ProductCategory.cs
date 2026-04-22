namespace AdventureWorks.Web.Models.Domain;

/// <summary>
/// Mapea Production.ProductCategory de AdventureWorks2019
/// </summary>
public class ProductCategory
{
    public int ProductCategoryID { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime ModifiedDate { get; set; }

    public ICollection<ProductSubcategory> Subcategories { get; set; } = new List<ProductSubcategory>();
}
