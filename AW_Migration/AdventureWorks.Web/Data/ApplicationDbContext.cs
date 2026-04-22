using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AdventureWorks.Web.Models.Domain;

namespace AdventureWorks.Web.Data;

// IdentityDbContext agrega las tablas AspNetUsers, AspNetRoles, etc.
public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // ── Production ──────────────────────────────────────────
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }
    public DbSet<ProductSubcategory> ProductSubcategories { get; set; }

    // ── Sales ────────────────────────────────────────────────
    public DbSet<Customer> Customers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Production.Product ───────────────────────────────
        modelBuilder.Entity<Product>(e =>
        {
            e.ToTable("Product", "Production");
            e.HasKey(p => p.ProductID);
            e.Property(p => p.Name).HasMaxLength(50).IsRequired();
            e.Property(p => p.ProductNumber).HasMaxLength(25).IsRequired();
            e.Property(p => p.Color).HasMaxLength(15);
            e.Property(p => p.Size).HasMaxLength(5);
            e.Property(p => p.StandardCost).HasColumnType("money");
            e.Property(p => p.ListPrice).HasColumnType("money");
            e.Property(p => p.Weight).HasColumnType("decimal(8,2)");

            e.HasOne(p => p.Subcategory)
             .WithMany(s => s.Products)
             .HasForeignKey(p => p.ProductSubcategoryID)
             .IsRequired(false);
        });

        // ── Production.ProductCategory ───────────────────────
        modelBuilder.Entity<ProductCategory>(e =>
        {
            e.ToTable("ProductCategory", "Production");
            e.HasKey(c => c.ProductCategoryID);
            e.Property(c => c.Name).HasMaxLength(50).IsRequired();
        });

        // ── Production.ProductSubcategory ────────────────────
        modelBuilder.Entity<ProductSubcategory>(e =>
        {
            e.ToTable("ProductSubcategory", "Production");
            e.HasKey(s => s.ProductSubcategoryID);
            e.Property(s => s.Name).HasMaxLength(50).IsRequired();

            e.HasOne(s => s.Category)
             .WithMany(c => c.Subcategories)
             .HasForeignKey(s => s.ProductCategoryID);
        });

        // ── Sales.Customer (vista simplificada sin Identity) ─
        modelBuilder.Entity<Customer>(e =>
        {
            e.ToTable("Customer", "Sales");
            e.HasKey(c => c.CustomerID);
            e.Property(c => c.AccountNumber).HasMaxLength(10);
            e.Ignore(c => c.FirstName);
            e.Ignore(c => c.LastName);
            e.Ignore(c => c.EmailAddress);
            e.Ignore(c => c.FullName);
            // Excluir de migraciones — tabla existente en AdventureWorks2019
            e.ToTable(t => t.ExcludeFromMigrations());
        });

        // Excluir tablas de AdventureWorks de migraciones (ya existen en la DB)
        modelBuilder.Entity<Product>().ToTable(t => t.ExcludeFromMigrations());
        modelBuilder.Entity<ProductCategory>().ToTable(t => t.ExcludeFromMigrations());
        modelBuilder.Entity<ProductSubcategory>().ToTable(t => t.ExcludeFromMigrations());
    }
}
