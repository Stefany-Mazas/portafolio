namespace AdventureWorks.Web.Models.Domain;

/// <summary>
/// Mapea Production.Product de AdventureWorks2019
/// </summary>
public class Product
{
    public int ProductID { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ProductNumber { get; set; } = string.Empty;
    public string? Color { get; set; }
    public decimal StandardCost { get; set; }
    public decimal ListPrice { get; set; }
    public string? Size { get; set; }
    public decimal? Weight { get; set; }
    public int? ProductSubcategoryID { get; set; }
    public string? ProductLine { get; set; }
    public string? Style { get; set; }
    public DateTime SellStartDate { get; set; }
    public DateTime? SellEndDate { get; set; }
    public DateTime? DiscontinuedDate { get; set; }
    public DateTime ModifiedDate { get; set; }

    // Navegación
    public ProductSubcategory? Subcategory { get; set; }
}
