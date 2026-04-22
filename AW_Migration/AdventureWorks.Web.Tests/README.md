# AdventureWorks.Web.Tests

Proyecto de testing para el backend de AdventureWorks Migration.

## Propósito

Contiene tests unitarios y de integración para:
- **ProductService** — lógica de negocio de productos
- **Controllers** — endpoints de la API REST

## Tests Incluidos

| Archivo | Qué testa |
|---------|-----------|
| `Services/ProductServiceTests.cs` | ProductService (37 tests) |
| `Controllers/ProductsApiControllerTests.cs` | Endpoints API |
| `Controllers/AccountControllerTests.cs` | Auth y login |
| `Fixtures/TestDbContext.cs` | DbContext para tests con InMemory |

## Cómo ejecutar

```bash
# Todos los tests
dotnet test

# Un archivo específico
dotnet test --filter "FullyQualifiedName~ProductServiceTests"
```

## Arquitectura de Tests

### Unit Tests
Usan `TestDbContext` con **InMemory provider** de EF Core:
- No requiere SQL Server real
- Rápido de ejecutar
- Aislamiento entre tests (cada test usa una DB diferente)

### Integration Tests
Usan `CustomWebApplicationFactory` que:
- Arranca la app completa en memoria
- Reemplaza el DbContext real con InMemory
- делает seed de datos de prueba

## Conexión con el Proyecto Principal

```
AdventureWorks.Web/          ← Código de producción
    └── Services/ProductService.cs
    
AdventureWorks.Web.Tests/     ← Tests
    └── Services/ProductServiceTests.cs  ← Tests del servicio
```

Los tests referencian el proyecto principal:
```xml
<ProjectReference Include="..\AdventureWorks.Web\AdventureWorks.Web.csproj" />
```

## Contraseñas para testing

- **Admin:** `admin@adventureworks.com` / `Admin1234!`
- **SQL Server:** `sa` / `YourStrong!Pass123` (solo si necesita DB real)

## Estado Actual

✅ **37 tests pasando**

Los tests cubren:
- Paginación de productos
- Búsqueda por nombre y número
- Filtro por categoría
- Soft delete
- CRUD completo
- Exclusión de productos descontinuados