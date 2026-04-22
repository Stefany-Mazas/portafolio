# Query Optimization Examples - Entity Framework Core

Ejemplos de optimización de queries basados en el proyecto AdventureWorks.

---

## Optimización 1: Proyección en lugar de cargar entidades completas

### ❌ ANTES (carga toda la entidad)

```csharp
public async Task<IEnumerable<Product>> GetAllAsync() =>
    await _db.Products.ToListAsync();
```

### ✅ DESPUÉS (solo columnas necesarias)

```csharp
public async Task<IEnumerable<ProductDto>> GetAllAsync() =>
    await _db.Products
        .Select(p => new ProductDto
        {
            ProductID = p.ProductID,
            Name = p.Name,
            ProductNumber = p.ProductNumber,
            ListPrice = p.ListPrice
        })
        .ToListAsync();
```

**Por qué es mejor:** Meno memoria usada, transferencia de datos reducida.

---

## Optimización 2: AsNoTracking para consultas de solo lectura

### ❌ ANTES (con tracking)

```csharp
public async Task<IEnumerable<Product>> GetPagedAsync(int page, int pageSize)
{
    return await _db.Products
        .OrderBy(p => p.Name)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
}
```

### ✅ DESPUÉS (sin tracking)

```csharp
public async Task<IEnumerable<Product>> GetPagedAsync(int page, int pageSize)
{
    return await _db.Projects
        .AsNoTracking()  // ← No guarda en el change tracker
        .OrderBy(p => p.Name)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
}
```

**Por qué es mejor:** EF Core no guarda las entidades en el ChangeTracker, ahorrando memoria. Usar para listados donde no vas a hacer Updates.

---

## Optimización 3: Paginación efciente con Skip/Take

### ✅ Ya implementado en ProductService.cs

```csharp
var items = await query
    .OrderBy(p => p.Name)
    .Skip((page - 1) * pageSize)  // ← Omitting first N records
    .Take(pageSize)                 // ← Taking only pageSize records
    .ToListAsync();
```

**Por qué es mejor:** EF Core traduce esto a `OFFSET/FETCH` en SQL Server, evitando cargar toda la tabla.

---

## Optimización 4: Include con ThenInclude solo cuando es necesario

### ❌ Sobrecarga (carga relaciones innecesarias)

```csharp
// Carga TODAS las relaciones siempre
var products = await _db.Products
    .Include(p => p.Subcategory)
        .ThenInclude(s => s.Category)
    .ToListAsync();
```

### ✅ Optimizado (carga bajo demanda)

```csharp
// Solo para detalles del producto
public async Task<Product?> GetByIdAsync(int id) =>
    await _db.Products
        .Include(p => p.Subcategory)
            .ThenInclude(s => s!.Category)
        .FirstOrDefaultAsync(p => p.ProductID == id);

// Para lista simple, sinIncludes
public async Task<IEnumerable<ProductListItem>> GetListAsync() =>
    await _db.Products
        .AsNoTracking()
        .Select(p => new ProductListItem
        {
            ProductID = p.ProductID,
            Name = p.Name,
            ListPrice = p.ListPrice
        })
        .ToListAsync();
```

---

## Optimización 5: Ejecución diferida vs inmediata

### ❌ Múltiples consultas (N+1 problem)

```csharp
var products = await _db.Products.ToListAsync();
foreach (var product in products)
{
    var category = await _db.Categories.FindAsync(product.CategoryId);
    product.CategoryName = category.Name;  // ← UNA CONSULTA POR CADA PRODUCTO
}
```

### ✅ Una sola consulta con join

```csharp
var products = await _db.Products
    .Join(_db.Categories,
        p => p.CategoryId,
        c => c.Id,
        (p, c) => new { Product = p, CategoryName = c.Name })
    .ToListAsync();
```

---

## Optimización 6: Indices en la base de datos

### SQL para crear índices

```sql
-- Índice para búsqueda por nombre
CREATE INDEX IX_Product_Name 
ON Production.Product (Name);

-- Índice compuesto para filtros comunes
CREATE INDEX IX_Product_Category_Active 
ON Production.Product (ProductCategoryID, SellEndDate, DiscontinuedDate);

-- Índice para paginación
CREATE INDEX IX_Product_Name_Paged 
ON Production.Product (Name) 
INCLUDE (ProductNumber, ListPrice);
```

**Dónde aplicarlo:** En migraciones de EF Core:

```csharp
migrationBuilder.Sql(@"
    CREATE INDEX IX_Product_Name 
    ON Production.Product (Name)");
```

---

## Optimización 7: Cacheo de respuestas

### Para categorías (cambian poco)

```csharp
[HttpGet("categories")]
[ResponseCache(Duration = 300)]  // ← Cache por 5 minutos
public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    => Ok(await _svc.GetCategoriesAsync());
```

**Por qué es mejor:** Las categorías cambian raramente. Cachear reduce llamadas a la base de datos.

---

## Resumen de técnicas usadas en el proyecto:

| Técnica | Dónde se usa |
|---------|---------------|
| `AsNoTracking()` | Listas de solo lectura |
| `.Skip().Take()` | Paginación |
| `.Select()` proyecciones | DTOs en lugar de entidades |
| `[ResponseCache]` | Categorías |
| Indices SQL | Migration |
| Soft delete | No borrar, marcar |

---

*Documentación de query optimization - Abril 2026*