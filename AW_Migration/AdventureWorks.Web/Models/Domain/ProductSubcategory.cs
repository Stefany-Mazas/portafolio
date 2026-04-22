namespace AdventureWorks.Web.Models.Domain;

/// <summary>
/// Mapea Production.ProductSubcategory de AdventureWorks2019
/// </summary>
public class ProductSubcategory
{
    public int ProductSubcategoryID { get; set; }
    public int ProductCategoryID { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime ModifiedDate { get; set; }

    public ProductCategory? Category { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
