namespace AdventureWorks.Web.Models.Domain;

/// <summary>
/// Mapea Sales.Customer + Person.Person de AdventureWorks2019
/// </summary>
public class Customer
{
    public int CustomerID { get; set; }
    public int? PersonID { get; set; }
    public int? StoreID { get; set; }
    public int? TerritoryID { get; set; }
    public string? AccountNumber { get; set; }
    public DateTime ModifiedDate { get; set; }

    // Datos de Person.Person (JOIN)
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? EmailAddress { get; set; }

    public string FullName => $"{FirstName} {LastName}".Trim();
}
