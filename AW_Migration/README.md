# AdventureWorks Web — Migration Project

Migración completa de una aplicación ASP.NET MVC 4 (.NET Framework) a **ASP.NET Core 8 MVC** con frontend **Angular 21**.

> Proyecto de demostración técnica — Perfil 4: Desarrollador ASP.NET Core MVC con experiencia en migración y Angular moderno.

---

## Índice

1. [Stack tecnológico](#stack-tecnológico)
2. [Requisitos previos](#requisitos-previos)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Configuración inicial](#configuración-inicial)
5. [Cómo correr el proyecto](#cómo-correr-el-proyecto)
6. [Arquitectura del backend](#arquitectura-del-backend)
7. [Arquitectura del frontend Angular](#arquitectura-del-frontend-angular)
8. [Autenticación y autorización](#autenticación-y-autorización)
9. [API REST](#api-rest)
10. [Decisiones de arquitectura](#decisiones-de-arquitectura)
11. [Uso de IA (GitHub Copilot)](#uso-de-ia-github-copilot)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | ASP.NET Core 8 MVC |
| ORM | Entity Framework Core 8 |
| Base de datos | SQL Server 2022 (Docker en Linux) |
| Autenticación | ASP.NET Core Identity + Cookie Auth |
| Frontend | Angular 21 (standalone components, signals) |
| UI | Bootstrap 5.3 + Bootstrap Icons 1.11 |
| Lenguaje frontend | TypeScript 5.9 |
| Serialización JSON | System.Text.Json (built-in .NET 8) |

---

## Requisitos previos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
- [Node.js 20+](https://nodejs.org/) y npm 10+
- [Docker](https://www.docker.com/) con SQL Server 2022
- `dotnet-ef` tool: `dotnet tool install --global dotnet-ef`

### SQL Server en Docker

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Pass123" \
  -p 1433:1433 --name sqlserver2022 \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

### Restaurar AdventureWorks2019

```bash
# Descargar backup
wget -O /tmp/AdventureWorks2019.bak \
  https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak

# Copiar al contenedor
docker cp /tmp/AdventureWorks2019.bak sqlserver2022:/tmp/

# Restaurar
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'YourStrong!Pass123' -C -Q "
RESTORE DATABASE [AdventureWorks2019]
FROM DISK = '/tmp/AdventureWorks2019.bak'
WITH MOVE 'AdventureWorks2019' TO '/var/opt/mssql/data/AdventureWorks2019.mdf',
     MOVE 'AdventureWorks2019_log' TO '/var/opt/mssql/data/AdventureWorks2019_log.ldf',
     NOUNLOAD, STATS = 10"
```

---

## Estructura del proyecto

```
AdventureWorks.Web/
├── Controllers/
│   ├── AccountController.cs        # Login, Register, Logout (MVC + Identity)
│   ├── HomeController.cs           # Index, Privacy, Admin (Razor views)
│   ├── ProductsController.cs       # Catálogo MVC con vistas Razor
│   └── Api/
│       ├── AuthApiController.cs    # GET /api/auth/me → estado de sesión para Angular
│       ├── ProductsApiController.cs # GET /api/products → lectura pública
│       └── AdminProductsApiController.cs # CRUD /api/admin/products → solo Administrator
│
├── Data/
│   └── ApplicationDbContext.cs     # IdentityDbContext + tablas AW (read-only)
│
├── Models/
│   ├── Domain/                     # Entidades EF: Product, Category, Customer
│   ├── Api/                        # DTOs de respuesta: ProductDto, PagedResult<T>
│   ├── ViewModels/                 # ViewModels Razor: ProductListViewModel
│   ├── LoginViewModel.cs
│   └── RegisterViewModel.cs
│
├── Services/
│   ├── IProductService.cs          # Interfaz — permite inyección y testing
│   └── ProductService.cs           # Implementación con EF Core
│
├── Views/
│   ├── Account/                    # Login.cshtml, Register.cshtml
│   ├── Home/                       # Index.cshtml, Admin.cshtml
│   ├── Products/                   # Index.cshtml, Details.cshtml
│   └── Shared/
│       ├── _Layout.cshtml          # Layout principal con navbar
│       └── _ValidationScriptsPartial.cshtml
│
├── ClientApp/                      # Angular 21 SPA
│   └── src/app/
│       ├── components/
│       │   ├── navbar/             # Navbar reactivo con AuthService
│       │   ├── home/               # Landing page
│       │   └── products/           # Lista de productos con paginación
│       ├── services/
│       │   ├── auth.service.ts     # Estado de sesión con signals
│       │   └── product.service.ts  # HttpClient → /api/products
│       ├── guards/
│       │   └── auth.guard.ts       # CanActivateFn → protege /products
│       ├── models/
│       │   ├── auth.model.ts
│       │   └── product.model.ts
│       └── environments/
│           ├── environment.ts      # Desarrollo
│           └── environment.prod.ts # Producción
│
├── Program.cs                      # Entry point — DI, middleware, seed
├── appsettings.json                # Config sin credenciales
└── appsettings.Development.json    # Credenciales locales (no commitear)
```

---

## Configuración inicial

### 1. Credenciales de base de datos

Edita `AdventureWorks.Web/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "AdventureWorksDb": "Server=localhost,1433;Database=AdventureWorks2019;User Id=sa;Password=TU_PASSWORD;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

> Este archivo **no se debe commitear**. Agrégalo a `.gitignore`.

### 2. Data Protection (Linux)

En `Program.cs`, ajusta la ruta de claves según tu usuario:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/home/TU_USUARIO/.aspnet/DataProtection-Keys"))
    .SetApplicationName("AdventureWorks");
```

### 3. Aplicar migraciones de Identity

```bash
# Solo la primera vez — crea las tablas AspNetUsers, AspNetRoles, etc.
DOTNET_ROOT=/usr/share/dotnet ~/.dotnet/tools/dotnet-ef database update \
  --project AdventureWorks.Web/AdventureWorks.Web.csproj
```

### 4. Instalar dependencias Angular

```bash
cd AdventureWorks.Web/ClientApp
npm install
```

---

## Cómo correr el proyecto

Necesitas **dos terminales**:

```bash
# Terminal 1 — Backend ASP.NET Core
dotnet run --project AdventureWorks.Web

# Terminal 2 — Frontend Angular (dev server interno)
cd AdventureWorks.Web/ClientApp
npm start
```

Abre el navegador en: **`http://localhost:5218`**

> El puerto 4200 (Angular dev server) es interno. El usuario siempre usa el 5218.
> El backend actúa como proxy hacia Angular en desarrollo.

### Credenciales por defecto (seed automático)

| Email | Password | Rol |
|---|---|---|
| `admin@adventureworks.com` | `Admin1234!` | Administrator |

Los usuarios registrados desde `/Account/Register` reciben el rol `Customer`.

---

## Arquitectura del backend

### Routing

ASP.NET Core usa routing por atributos y convencional. En `Program.cs`:

```csharp
// Ruta convencional para MVC (vistas Razor)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Los API controllers usan [Route("api/...")] — routing por atributos
```

### Action Results

| Método | Cuándo usarlo |
|---|---|
| `View(model)` | Devolver una vista Razor |
| `Ok(data)` | 200 con JSON — endpoints API |
| `NotFound()` | 404 |
| `CreatedAtAction(...)` | 201 tras POST exitoso |
| `NoContent()` | 204 tras DELETE exitoso |
| `RedirectToAction(...)` | Redirect MVC post-login |

### Filtros y atributos

```csharp
[Authorize]                          // requiere sesión activa
[Authorize(Roles = "Administrator")] // requiere rol específico
[AllowAnonymous]                     // permite acceso sin sesión
[HttpGet] / [HttpPost] / [HttpPut] / [HttpDelete]  // verbos HTTP
[ApiController]                      // activa validación automática de ModelState
[Route("api/products")]              // ruta base del controller
```

### Serialización JSON con System.Text.Json

Configurado en `Program.cs`:

```csharp
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        // Mantiene PascalCase para compatibilidad con Razor
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        // Evita ciclos de referencia en navegaciones EF
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
```

Los endpoints de Angular devuelven DTOs con propiedades en camelCase explícito para evitar ambigüedad.

### Inyección de dependencias

```csharp
// Registro en Program.cs
builder.Services.AddScoped<IProductService, ProductService>();

// Uso en controlador — constructor injection
public ProductsController(IProductService productService)
{
    _productService = productService;
}
```

`AddScoped` crea una instancia por request HTTP — correcto para servicios con DbContext.

### Razor Views — Tag Helpers

```html
<!-- Tag helpers reemplazan el HTML helper de MVC 4 -->
<form asp-action="Login" asp-controller="Account" method="post">
    <input asp-for="Email" class="form-control" />
    <span asp-validation-for="Email" class="text-danger"></span>
    <button type="submit">Login</button>
</form>

<!-- Partial view -->
@await Html.RenderPartialAsync("_ValidationScriptsPartial")

<!-- Layout -->
@{
    Layout = "_Layout";
    ViewData["Title"] = "Products";
}
```

---

## Arquitectura del frontend Angular

### Componentes standalone (Angular 15+)

No hay NgModules. Cada componente declara sus propias dependencias:

```typescript
@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CurrencyPipe],  // imports directos
  templateUrl: './product-list.html'
})
export class ProductListComponent { }
```

### Signals (Angular 17+)

Reemplazan `$scope` y `BehaviorSubject` para estado local simple:

```typescript
// Estado reactivo sin RxJS
searchTerm = '';
currentPage = signal(1);
result = signal<PagedResult<Product> | null>(null);
loading = signal(false);

// Computed — se recalcula automáticamente cuando cambia result()
totalPages = computed(() => this.result()?.totalPages ?? 0);
```

### HttpClient

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts(q = '', page = 1, pageSize = 12): Observable<PagedResult<Product>> {
    const params = new HttpParams().set('q', q).set('page', page).set('pageSize', pageSize);
    return this.http.get<PagedResult<Product>>('/api/products', { params });
  }
}
```

### Routing

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard]   // guard funcional
  },
  { path: '**', redirectTo: '' }
];
```

### Auth Guard (CanActivateFn)

```typescript
// Función pura — no clase (deprecada en Angular 15+)
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if (auth.checked) {
    if (auth.isAuthenticated()) return true;
    auth.redirectToLogin(state.url);
    return false;
  }

  // Primera carga — consulta /api/auth/me
  return auth.loadCurrentUser().pipe(
    map(user => {
      auth.checked = true;
      if (user) return true;
      auth.redirectToLogin(state.url);
      return false;
    })
  );
};
```

### Control flow moderno (Angular 17+)

```html
<!-- Reemplaza *ngIf y *ngFor de AngularJS -->
@if (auth.isAuthenticated()) {
  <span>{{ auth.currentUser()?.email }}</span>
}

@for (p of result()!.items; track p.productID) {
  <tr>...</tr>
} @empty {
  <tr><td>No products found.</td></tr>
}
```

### Proxy de desarrollo

`proxy.conf.js` redirige las peticiones al backend sin CORS:

```javascript
// Angular (4200) → Backend (5218) para rutas de API y MVC
{
  context: ["/api", "/Account", "/Products"],
  target: "http://localhost:5218",
  secure: false
}
```

### Environments

```typescript
// environment.ts (desarrollo)
export const environment = { production: false, apiBase: '' };

// environment.prod.ts (producción)
export const environment = { production: true, apiBase: '' };
```

---

## Autenticación y autorización

### Flujo completo

```
1. Usuario visita /products (Angular)
2. authGuard → GET /api/auth/me
3a. 200 OK → usuario autenticado → carga la ruta
3b. 401    → redirectToLogin('/products')
              → window.location.href = /Account/Login?returnUrl=%2Fproducts
4. Login MVC (Razor) → SignInManager.PasswordSignInAsync()
5. Cookie de Identity establecida en el servidor
6. Redirect a /products → authGuard → GET /api/auth/me → 200 OK
```

### Políticas de roles

```csharp
// Program.cs
options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Administrator"));
options.AddPolicy("RequireSalesRole", policy => policy.RequireRole("Sales", "Administrator"));
```

### Roles disponibles

| Rol | Acceso |
|---|---|
| Anónimo | Home, Login, Register |
| Customer | Catálogo de productos (Angular + MVC) |
| Administrator | Todo + CRUD via `/api/admin/products` |

### Seguridad de passwords

ASP.NET Core Identity usa **PBKDF2 + SHA256 + salt por usuario**. Configuración:

```csharp
options.Password.RequireDigit = true;
options.Password.RequiredLength = 8;
options.Password.RequireUppercase = true;
options.Lockout.MaxFailedAccessAttempts = 5;
options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
```

---

## API REST

### Endpoints públicos (autenticado)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/auth/me` | Usuario actual (401 si no autenticado) |
| GET | `/api/products` | Lista paginada con búsqueda |
| GET | `/api/products/{id}` | Detalle de producto |
| GET | `/api/products/categories` | Categorías para filtro |

### Endpoints de administración (rol Administrator)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/admin/products` | Lista completa con paginación |
| GET | `/api/admin/products/{id}` | Detalle |
| POST | `/api/admin/products` | Crear producto |
| PUT | `/api/admin/products/{id}` | Actualizar producto |
| DELETE | `/api/admin/products/{id}` | Soft delete (marca como descontinuado) |

### Ejemplo de request

```bash
# Listar productos (requiere cookie de sesión)
curl -b cookies.txt http://localhost:5218/api/products?q=bike&page=1&pageSize=5

# Crear producto (requiere rol Administrator)
curl -b cookies.txt -X POST http://localhost:5218/api/admin/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Bike","productNumber":"NB-001","listPrice":999.99,"standardCost":500.00}'
```

---

## Decisiones de arquitectura

### Por qué dos controllers para productos

`ProductsController` (MVC) devuelve vistas Razor — para el navegador con sesión.
`ProductsApiController` (`[ApiController]`) devuelve JSON — para Angular.

La diferencia técnica clave:

| `Controller` | `ControllerBase` + `[ApiController]` |
|---|---|
| Hereda vistas, TempData, ViewBag | Solo datos, sin vistas |
| `IActionResult` genérico | `ActionResult<T>` tipado |
| Validación manual de ModelState | Validación automática → 400 |
| Routing convencional | Routing por atributos obligatorio |

### Por qué soft delete en productos

`Production.Product` en AdventureWorks tiene relaciones con `SalesOrderDetail`, `WorkOrder`, etc. Borrar físicamente violaría integridad referencial. El campo `DiscontinuedDate` es el mecanismo nativo de AW para retirar productos.

### Por qué `ExcludeFromMigrations()` en tablas AW

Las tablas `Production.Product`, `Production.ProductCategory`, etc. ya existen en AdventureWorks2019. EF Core las mapea para lectura pero no las gestiona con migraciones — evita conflictos entre el schema de AW y las migraciones de Identity.

### Por qué un solo puerto en producción

En desarrollo: Angular (4200) + Backend (5218) separados para hot-reload.
En producción: el backend sirve el build de Angular como archivos estáticos. Un solo origen, sin CORS, sin proxy.

---

## Uso de IA (GitHub Copilot)

### Conversión de controladores MVC 4 → ASP.NET Core

Diferencias identificadas y corregidas en código generado por IA:

| MVC 4 (generado por IA) | ASP.NET Core 8 (corrección) |
|---|---|
| `using System.Web.Mvc` | `using Microsoft.AspNetCore.Mvc` |
| `ActionResult` | `IActionResult` o `ActionResult<T>` |
| `new JsonResult(data)` | `Ok(data)` |
| `Session["key"]` | `HttpContext.Session.GetString("key")` |
| Constructor sin DI | Constructor con parámetros inyectados |
| `[HttpPost]` de `System.Web` | `[HttpPost]` de `Microsoft.AspNetCore` |
| `Trusted_Connection=True` | `User Id=sa;Password=...` (Linux) |

### Ciclo de vida de controladores — diferencia crítica

En MVC 4, los controladores podían tener estado entre requests si se usaba mal el DI container. En ASP.NET Core, los controladores son **transient por defecto** — se crean y destruyen por cada request. Esto significa que no se puede guardar estado en propiedades del controlador entre requests.

### Revisión de código Angular generado

Patrones corregidos en código generado por IA:

- `ngModel` con signals → usar propiedad normal para two-way binding
- `*ngIf` / `*ngFor` → `@if` / `@for` (Angular 17+ control flow)
- `CanActivate` clase → `CanActivateFn` función (Angular 15+)
- Ciclos de referencia en JSON → DTOs planos en lugar de entidades EF directas
- `PropertyNamingPolicy = null` en MVC + camelCase explícito en DTOs de API

---

## Comandos de referencia rápida

```bash
# Compilar backend
dotnet build AdventureWorks.Web/AdventureWorks.Web.csproj

# Correr backend
dotnet run --project AdventureWorks.Web

# Nueva migración EF
DOTNET_ROOT=/usr/share/dotnet ~/.dotnet/tools/dotnet-ef migrations add NombreMigracion \
  --project AdventureWorks.Web/AdventureWorks.Web.csproj

# Aplicar migraciones
DOTNET_ROOT=/usr/share/dotnet ~/.dotnet/tools/dotnet-ef database update \
  --project AdventureWorks.Web/AdventureWorks.Web.csproj

# Instalar dependencias Angular
cd AdventureWorks.Web/ClientApp && npm install

# Correr Angular dev server
cd AdventureWorks.Web/ClientApp && npm start

# Build Angular producción
cd AdventureWorks.Web/ClientApp && npm run build
```

---

## Gestión de secretos

### Situación actual

Las credenciales de desarrollo están en `appsettings.Development.json` — válido para desarrollo local pero **nunca debe commitearse**.

```bash
# Verificar que está en .gitignore
echo "appsettings.Development.json" >> .gitignore
```

### Mejora recomendada: User Secrets

User Secrets almacena credenciales fuera del repositorio, en el sistema de archivos del desarrollador:

```bash
# Inicializar (ya configurado en el .csproj con UserSecretsId)
dotnet user-secrets init --project AdventureWorks.Web

# Guardar la cadena de conexión
dotnet user-secrets set "ConnectionStrings:AdventureWorksDb" \
  "Server=localhost,1433;Database=AdventureWorks2019;User Id=sa;Password=YourStrong!Pass123;TrustServerCertificate=True;MultipleActiveResultSets=true" \
  --project AdventureWorks.Web

# Verificar
dotnet user-secrets list --project AdventureWorks.Web
```

Los secretos se guardan en `~/.microsoft/usersecrets/<UserSecretsId>/secrets.json` — fuera del repo.

### Mejora opcional: Azure Key Vault (producción)

```csharp
// Program.cs — solo en producción
if (!builder.Environment.IsDevelopment())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
        new DefaultAzureCredential());
}
```

---

## Testing

### Estrategia por capa

| Capa | Framework | Qué testear |
|---|---|---|
| Servicios backend | xUnit + Moq | `ProductService`, lógica de negocio |
| Controllers API | xUnit + `WebApplicationFactory` | Endpoints, status codes, serialización |
| Componentes Angular | Vitest + Angular Testing Utilities | Signals, guards, servicios |
| E2E | Playwright | Login → catálogo → admin CRUD |

### Backend — xUnit + Moq

```bash
# Crear proyecto de tests
dotnet new xunit -n AdventureWorks.Web.Tests
dotnet add AdventureWorks.Web.Tests reference AdventureWorks.Web
dotnet add AdventureWorks.Web.Tests package Moq
dotnet add AdventureWorks.Web.Tests package Microsoft.AspNetCore.Mvc.Testing
```

Ejemplo de test de servicio:

```csharp
public class ProductServiceTests
{
    [Fact]
    public async Task GetPagedAsync_WithSearch_ReturnsFilteredResults()
    {
        // Arrange — DbContext en memoria
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase("TestDb")
            .Options;
        using var ctx = new ApplicationDbContext(options);
        var service = new ProductService(ctx);

        // Act
        var (items, total) = await service.GetPagedAsync(1, 10, "bike");

        // Assert
        Assert.All(items, p => Assert.Contains("bike", p.Name, StringComparison.OrdinalIgnoreCase));
    }
}
```

Ejemplo de test de controller API:

```csharp
public class ProductsApiControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProductsApiControllerTests(WebApplicationFactory<Program> factory)
        => _client = factory.CreateClient();

    [Fact]
    public async Task GetProducts_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/products?page=1&pageSize=5");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
```

```bash
# Correr tests
dotnet test AdventureWorks.Web.Tests
```

### Frontend — Vitest (ya configurado en package.json)

```bash
# Correr tests unitarios Angular
cd AdventureWorks.Web/ClientApp
npm run test          # modo watch
npx vitest run        # ejecución única (CI)
```

### E2E — Playwright

```bash
# Instalar
npm init playwright@latest

# Correr
npm run test:e2e
```

Ejemplo de test E2E:

```typescript
test('login y ver productos', async ({ page }) => {
  await page.goto('http://localhost:5218/Account/Login');
  await page.fill('[name="Email"]', 'admin@adventureworks.com');
  await page.fill('[name="Password"]', 'Admin1234!');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/');
  await page.goto('http://localhost:5218');
  await expect(page.locator('text=Browse Products')).toBeVisible();
});
```

---

## Manejo de errores y observabilidad

### Estado actual

En desarrollo, `UseDeveloperExceptionPage()` muestra el stack trace completo. En producción redirige a `/Home/Error`.

### Mejora: Global Exception Handler + ProblemDetails

```csharp
// Program.cs — agregar antes del pipeline
builder.Services.AddProblemDetails();

// Para API controllers — respuestas RFC 7807
builder.Services.ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation failed"
        };
        return new BadRequestObjectResult(problemDetails);
    };
});

// Middleware de errores para API
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.ContentType = "application/problem+json";
        var error = context.Features.Get<IExceptionHandlerFeature>();
        await context.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = 500,
            Title = "An unexpected error occurred.",
            Detail = app.Environment.IsDevelopment() ? error?.Error.Message : null
        });
    });
});
```

### Mejora: Logging estructurado con Serilog

```bash
dotnet add AdventureWorks.Web package Serilog.AspNetCore
dotnet add AdventureWorks.Web package Serilog.Sinks.Console
dotnet add AdventureWorks.Web package Serilog.Sinks.File
```

```csharp
// Program.cs
builder.Host.UseSerilog((ctx, config) =>
    config
        .ReadFrom.Configuration(ctx.Configuration)
        .Enrich.FromLogContext()
        .Enrich.WithCorrelationId()   // correlación de requests
        .WriteTo.Console(outputTemplate:
            "[{Timestamp:HH:mm:ss} {Level:u3}] {CorrelationId} {Message:lj}{NewLine}{Exception}")
        .WriteTo.File("logs/aw-.log", rollingInterval: RollingInterval.Day));
```

Uso en controladores:

```csharp
// Ya inyectado — usar structured logging, no string interpolation
_logger.LogWarning("Product {ProductId} not found by user {UserId}", id, userId);
_logger.LogInformation("Products search: query={Query} results={Count}", q, total);
```

---

## Performance: Caching y optimizaciones

### Response caching para categorías

Las categorías de productos cambian raramente — candidatas ideales para cache:

```csharp
// Program.cs
builder.Services.AddResponseCaching();
builder.Services.AddMemoryCache();

// En el controller
[HttpGet("categories")]
[ResponseCache(Duration = 300)] // 5 minutos
public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    => Ok(await _svc.GetCategoriesAsync());
```

### Paginación eficiente

El `ProductService` ya usa `.Skip().Take()` — EF Core lo traduce a `OFFSET/FETCH` en SQL Server, evitando cargar toda la tabla en memoria.

### Proyección en queries

Para listas, proyectar solo las columnas necesarias en lugar de cargar la entidad completa:

```csharp
// Más eficiente que Include() completo para listas grandes
var items = await _db.Products
    .Where(p => p.SellEndDate == null)
    .Select(p => new ProductDto
    {
        ProductID = p.ProductID,
        Name = p.Name,
        ListPrice = p.ListPrice
        // Solo las columnas que necesita la vista
    })
    .ToListAsync();
```

---

## CI/CD y despliegue

### GitHub Actions — build y test automático

Crea el archivo `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET 8
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Restore
        run: dotnet restore AdventureWorks.Web/AdventureWorks.Web.csproj

      - name: Build
        run: dotnet build AdventureWorks.Web/AdventureWorks.Web.csproj --no-restore --configuration Release

      - name: Test
        run: dotnet test AdventureWorks.Web.Tests --no-build --configuration Release

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: AdventureWorks.Web/ClientApp/package-lock.json

      - name: Install
        run: npm ci
        working-directory: AdventureWorks.Web/ClientApp

      - name: Build
        run: npm run build
        working-directory: AdventureWorks.Web/ClientApp

      - name: Test
        run: npx vitest run
        working-directory: AdventureWorks.Web/ClientApp
```

### Build de producción manual

```bash
# 1. Build Angular
cd AdventureWorks.Web/ClientApp
npm run build
# Output: ClientApp/dist/ClientApp/browser/

# 2. Build .NET con Angular incluido
cd ../..
dotnet publish AdventureWorks.Web/AdventureWorks.Web.csproj \
  --configuration Release \
  --output ./publish

# 3. Correr en producción
cd publish
ASPNETCORE_ENVIRONMENT=Production \
ASPNETCORE_URLS=http://0.0.0.0:8080 \
dotnet AdventureWorks.Web.dll
```

---

## Verificación final del proyecto

### Comandos para verificar que todo funciona

```bash
# 1. Verificar que SQL Server está corriendo
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 2. Verificar conexión a la DB y que AdventureWorks existe
sudo docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'YourStrong!Pass123' -C \
  -Q "SELECT name FROM sys.databases WHERE name IN ('AdventureWorks2019')"

# 3. Verificar tablas de Identity creadas
sudo docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'YourStrong!Pass123' -C -d AdventureWorks2019 \
  -Q "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'AspNet%'"

# 4. Verificar usuario admin creado (tras primer arranque)
sudo docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'YourStrong!Pass123' -C -d AdventureWorks2019 \
  -Q "SELECT Email, EmailConfirmed FROM AspNetUsers"

# 5. Compilar backend
dotnet build AdventureWorks.Web/AdventureWorks.Web.csproj

# 6. Compilar frontend
cd AdventureWorks.Web/ClientApp && npx ng build --configuration development

# 7. Probar API sin autenticación (debe devolver 401)
curl -s -o /dev/null -w "%{http_code}" http://localhost:5218/api/auth/me

# 8. Probar endpoint público de productos (debe devolver 200 con JSON)
curl -s "http://localhost:5218/api/products?page=1&pageSize=3" | python3 -m json.tool | head -20
```

### Credenciales de acceso

| Recurso | URL | Usuario | Password |
|---|---|---|---|
| App web | `http://localhost:5218` | `admin@adventureworks.com` | `Admin1234!` |
| SQL Server | `localhost:1433` | `sa` | `YourStrong!Pass123` |
| Angular dev | `http://localhost:4200` | — | — (interno) |

### Checklist de verificación

```
[ ] Docker corriendo con sqlserver2022
[ ] AdventureWorks2019 restaurada (tablas Production.Product, Sales.Customer)
[ ] Tablas Identity creadas (AspNetUsers, AspNetRoles, etc.)
[ ] dotnet run --project AdventureWorks.Web → "Now listening on: http://localhost:5218"
[ ] npm start en ClientApp → "Local: http://localhost:4200"
[ ] http://localhost:5218 → muestra home de Adventure Works
[ ] http://localhost:5218/Account/Login → login con admin@adventureworks.com / Admin1234!
[ ] Tras login → redirige a home con badge "Admin"
[ ] http://localhost:5218/Products → tabla de productos con datos reales
[ ] http://localhost:5218/api/products?page=1&pageSize=5 → JSON con productos
[ ] http://localhost:5218/api/auth/me → JSON con email y roles del usuario
[ ] http://localhost:5218/Account/Register → registro de nuevo usuario
[ ] Nuevo usuario registrado → rol Customer, puede ver productos
```

---

## Guía para presentar el proyecto en entrevista

Cuando te pregunten por el proyecto, ofrece:

> "¿Te gustaría que camine por cómo migré un controller específico? Puedo mostrar:
> 1. El código original en MVC 4 (AngularJS + Controller)
> 2. El prompt que usé con GitHub Copilot
> 3. Las correcciones que apliqué manualmente (DI, lifecycle, serialización)
> 4. El resultado final en Core 8 + Angular 21
> 5. Cómo validé que no rompí funcionalidad existente"

### Ejemplo concreto: AccountController

**MVC 4 original (con problemas):**
```csharp
// Sistema.Web.Mvc — namespace incorrecto para Core
using System.Web.Mvc;

public class AccountController : Controller
{
    // Sin DI — instanciación manual
    private UserService _userService = new UserService();

    [HttpPost]
    public ActionResult Login(LoginViewModel model)  // ActionResult, no IActionResult
    {
        // FormsAuthentication — no existe en Core
        FormsAuthentication.SetAuthCookie(model.Email, model.RememberMe);
        return RedirectToAction("Index", "Home");
    }
}
```

**Prompt usado con GitHub Copilot:**
```
Convierte este AccountController de ASP.NET MVC 4 a ASP.NET Core 8.
Usa ASP.NET Core Identity con UserManager y SignInManager.
Aplica inyección de dependencias en el constructor.
Cambia ActionResult por IActionResult.
Reemplaza FormsAuthentication por SignInManager.PasswordSignInAsync().
```

**Correcciones manuales aplicadas:**
- Namespace `System.Web.Mvc` → `Microsoft.AspNetCore.Mvc`
- `ActionResult` → `IActionResult`
- `FormsAuthentication` → `SignInManager<IdentityUser>`
- Constructor sin DI → constructor con `UserManager` y `SignInManager` inyectados
- Agregar `lockoutOnFailure: true` para activar el lockout de Identity
- Agregar manejo de `result.IsLockedOut`

**Resultado final:** ver `Controllers/AccountController.cs`

**Validación:** login funciona, cookie se establece, roles se cargan correctamente, lockout activo tras 5 intentos fallidos.

### Puntos técnicos para destacar

- **Ciclo de vida de controladores:** en MVC 4 podían tener estado entre requests; en Core son transient — se crean y destruyen por request. Cualquier estado debe ir en servicios con el scope correcto.
- **Middleware order:** `UseAuthentication()` debe ir antes de `UseAuthorization()` — error común en migraciones.
- **`[ApiController]` vs `Controller`:** la diferencia no es solo semántica — activa validación automática de ModelState, ProblemDetails RFC 7807, y binding inteligente de parámetros.
- **Serialización JSON:** MVC 4 usaba Newtonsoft.Json por defecto. Core 8 usa System.Text.Json — diferencias en manejo de ciclos de referencia, naming policies y tipos nullable.
- **Linux + SQL Server:** `Trusted_Connection=True` (Windows Auth) no funciona en Linux — requiere SQL auth. Data Protection keys deben persistirse explícitamente o se regeneran en cada restart.
