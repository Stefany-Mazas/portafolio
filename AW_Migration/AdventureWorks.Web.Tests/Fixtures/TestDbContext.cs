using Microsoft.EntityFrameworkCore;
using AdventureWorks.Web.Data;
using AdventureWorks.Web.Models.Domain;

namespace AdventureWorks.Web.Tests.Fixtures;

/// <summary>
/// Test DbContext que hereda directamente de ApplicationDbContext.
/// Esto asegura compatibilidad con ProductService en producción.
/// </summary>
public class TestDbContext : ApplicationDbContext
{
    public TestDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// Helper para crear un TestDbContext en memoria vacío.
    /// </summary>
    public static TestDbContext CreateEmpty()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new TestDbContext(options);
    }
}