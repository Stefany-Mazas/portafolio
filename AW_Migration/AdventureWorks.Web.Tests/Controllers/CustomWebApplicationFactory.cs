using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AdventureWorks.Web.Data;
using AdventureWorks.Web.Models.Domain;
using AdventureWorks.Web.Services;

namespace AdventureWorks.Web.Tests.Controllers;

/// <summary>
/// WebApplicationFactory personalizada para tests de integración.
/// 
/// Reemplaza ApplicationDbContext con uno en InMemory para tests
/// que no requieren SQL Server real.
/// </summary>
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly string _dbName = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // ── Reemplazar ApplicationDbContext con InMemory ──────────────────
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(ApplicationDbContext));

            if (dbContextDescriptor is not null)
                services.Remove(dbContextDescriptor);

            services.AddDbContext<ApplicationDbContext>((sp, options) =>
                options.UseInMemoryDatabase(_dbName));
        });
    }

    private void SeedTestData(ApplicationDbContext context)
    {
        if (context.Products.Any()) return;

        var bikes = new ProductCategory { ProductCategoryID = 1, Name = "Bikes", ModifiedDate = DateTime.UtcNow };
        var components = new ProductCategory { ProductCategoryID = 2, Name = "Components", ModifiedDate = DateTime.UtcNow };
        context.ProductCategories.AddRange(bikes, components);

        var mountain = new ProductSubcategory { ProductSubcategoryID = 1, Name = "Mountain Bikes", ProductCategoryID = 1, ModifiedDate = DateTime.UtcNow, Category = bikes };
        var road = new ProductSubcategory { ProductSubcategoryID = 2, Name = "Road Bikes", ProductCategoryID = 1, ModifiedDate = DateTime.UtcNow, Category = bikes };
        context.ProductSubcategories.AddRange(mountain, road);

        context.Products.AddRange(
            new Product
            {
                ProductID = 1,
                Name = "Mountain Bike Pro",
                ProductNumber = "MB-500",
                Color = "Black",
                StandardCost = 300m,
                ListPrice = 599.99m,
                SellStartDate = new DateTime(2020, 1, 1),
                ProductSubcategoryID = 1,
                Subcategory = mountain
            },
            new Product
            {
                ProductID = 2,
                Name = "Road Bike Elite",
                ProductNumber = "RB-800",
                Color = "Silver",
                StandardCost = 800m,
                ListPrice = 1599.99m,
                SellStartDate = new DateTime(2020, 1, 1),
                ProductSubcategoryID = 2,
                Subcategory = road
            }
        );

        context.SaveChanges();
    }
}