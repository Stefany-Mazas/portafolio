# AdventureWorks — Migration Notes
## ASP.NET MVC 4 → ASP.NET Core 8 MVC

**Project:** AdventureWorks Web Application  
**Source:** ASP.NET MVC 4 (.NET Framework 4.x)  
**Target:** ASP.NET Core 8 MVC + Angular 21  
**Environment:** Linux Mint 22.3 / SQL Server 2022 (Docker)  
**Date:** April 2026

---

## 1. Project Structure

| MVC 4 | ASP.NET Core 8 | Notes |
|---|---|---|
| `Global.asax` | `Program.cs` | Single entry point, minimal hosting model |
| `Web.config` | `appsettings.json` + `appsettings.Development.json` | Credentials in Development only, never committed |
| `RouteConfig.cs` | `app.MapControllerRoute()` in `Program.cs` | Inline route registration |
| `FilterConfig.cs` | Middleware pipeline in `Program.cs` | `UseAuthentication()` → `UseAuthorization()` order is critical |
| `BundleConfig.cs` | CDN links (Bootstrap 5, Bootstrap Icons) | No bundler needed for Razor views |
| `App_Start/` | Removed | All configuration consolidated in `Program.cs` |

---

## 2. Authentication & Authorization

### What changed

MVC 4 used `FormsAuthentication` with a hardcoded credential check and manual cookie management via `HttpContext.SignInAsync`. This was replaced with **ASP.NET Core Identity**.

| MVC 4 / Legacy | ASP.NET Core 8 |
|---|---|
| `FormsAuthentication.SetAuthCookie()` | `SignInManager.PasswordSignInAsync()` |
| `[Authorize]` from `System.Web.Mvc` | `[Authorize]` from `Microsoft.AspNetCore.Authorization` |
| Roles in `web.config` `<authorization>` | `AddAuthorization()` policies in `Program.cs` |
| Passwords stored as plain text or MD5 | PBKDF2 + SHA256 + salt (Identity default) |
| Manual claims construction | Identity manages claims automatically |

### Why ASP.NET Core Identity

- Passwords hashed with **PBKDF2 + SHA256 + per-user salt** — no custom crypto needed
- Built-in **lockout** after 5 failed attempts (15 min cooldown)
- Role management via `AspNetRoles` / `AspNetUserRoles` tables
- `UserManager<IdentityUser>` and `SignInManager<IdentityUser>` injected via DI — testable
- Seed on startup creates roles (`Administrator`, `Sales`, `Customer`) and default admin user

### Cookie configuration

```csharp
// Program.cs — replaces <authentication mode="Forms"> in web.config
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    options.SlidingExpiration = true;
    options.Cookie.HttpOnly = true;       // XSS protection
    options.Cookie.SameSite = SameSiteMode.Lax;  // CSRF mitigation
});
```

### Middleware order (critical)

```csharp
app.UseRouting();
app.UseAuthentication();   // must come before Authorization
app.UseAuthorization();
app.UseSession();
```

---

## 3. Dependency Injection

MVC 4 used `DependencyResolver` or static service locators. ASP.NET Core has DI built in.

| MVC 4 | ASP.NET Core 8 |
|---|---|
| `DependencyResolver.SetResolver()` | `builder.Services.AddScoped<>()` |
| Static `HttpContext.Current` | `IHttpContextAccessor` injected |
| `new ProductService()` in controller | Constructor injection via `IProductService` |

```csharp
// ProductsController — constructor injection
public ProductsController(IProductService productService, ILogger<ProductsController> logger)
{
    _productService = productService;
    _logger = logger;
}
```

---

## 4. Controllers & Action Results

| MVC 4 | ASP.NET Core 8 | Notes |
|---|---|---|
| `ActionResult` | `IActionResult` | Interface, more flexible |
| `JsonResult` with `JsonRequestBehavior.AllowGet` | `Ok(data)` | No AllowGet needed, CORS handled separately |
| `System.Web.Mvc.Controller` | `Microsoft.AspNetCore.Mvc.Controller` | Different namespace |
| `[HttpPost]` from `System.Web.Mvc` | `[HttpPost]` from `Microsoft.AspNetCore.Mvc` | Same attribute, different assembly |
| `Session["key"]` | `HttpContext.Session.SetString("key", value)` | Requires `AddSession()` + `UseSession()` |
| `TempData["msg"]` | `TempData["msg"]` | Same API, backed by session or cookie |

### JSON serialization

MVC 4 used `Newtonsoft.Json` by default. ASP.NET Core 8 uses `System.Text.Json`.

```csharp
// Program.cs — configured to avoid reference cycles from EF navigation properties
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // keep PascalCase for Razor
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
```

> **Decision:** API endpoints for Angular return anonymous DTOs with explicit camelCase property names to avoid serialization cycles and keep the contract explicit.

---

## 5. Entity Framework

| Legacy | ASP.NET Core 8 |
|---|---|
| EF 6 (`DbContext` in `App_Data`) | EF Core 8 |
| `Database.SetInitializer()` | `dotnet ef migrations` |
| `connectionStrings` in `web.config` | `ConnectionStrings` in `appsettings.json` |
| `Trusted_Connection=True` (Windows Auth) | `User Id=sa;Password=...` (SQL auth, required on Linux) |

### Key mapping decisions

- Tables `Production.Product`, `Production.ProductCategory`, `Production.ProductSubcategory`, `Sales.Customer` are **read-only** — mapped with `ExcludeFromMigrations()` since they already exist in AdventureWorks2019.
- Identity tables (`AspNetUsers`, `AspNetRoles`, etc.) are managed by EF migrations in the same database.
- `ApplicationDbContext` inherits from `IdentityDbContext` to combine both concerns in one context.

---

## 6. Frontend Migration: AngularJS 1.5.5 → Angular 21

This is the most significant architectural change.

| AngularJS 1.5.5 | Angular 21 |
|---|---|
| `$scope` / two-way binding | Signals (`signal()`, `computed()`) |
| `$http` service | `HttpClient` with `provideHttpClient(withFetch())` |
| `ng-controller` | Standalone components with `@Component` |
| `$routeProvider` | `provideRouter(routes)` |
| `angular.module().config()` | `appConfig` with `ApplicationConfig` |
| `ng-repeat` | `@for` block (Angular 17+ control flow) |
| `ng-if` | `@if` block |
| Global `angular.js` script tag | Tree-shakeable ES modules |

### Architecture decisions

- **Standalone components** — no NgModules, simpler mental model
- **Signals** for local state instead of RxJS `BehaviorSubject` for simple cases
- **Proxy** (`proxy.conf.js`) routes `/Products/*` to ASP.NET Core backend during development — no CORS configuration needed
- Angular runs on port `4200`, backend on `5218` — two separate processes in development

### Backend endpoints consumed by Angular

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /Products/Search?q=&page=&pageSize=` | Anonymous | Product list with pagination |
| `GET /Products/Categories` | Anonymous | Category filter dropdown |

---

## 7. Data Protection (Linux-specific)

On Linux, ASP.NET Core Data Protection keys must be persisted explicitly. Without this, keys are regenerated on every restart, invalidating all existing cookies.

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/home/stefany/.aspnet/DataProtection-Keys"))
    .SetApplicationName("AdventureWorks");
```

> **Note for production:** use Azure Key Vault or a shared network path for multi-instance deployments.

---

## 8. Configuration: web.config → appsettings.json

```xml
<!-- MVC 4 web.config -->
<connectionStrings>
  <add name="AdventureWorksDb" connectionString="..." />
</connectionStrings>
<authentication mode="Forms">
  <forms loginUrl="~/Account/Login" timeout="30" />
</authentication>
```

```json
// appsettings.json (non-sensitive defaults)
{
  "ConnectionStrings": {
    "AdventureWorksDb": "Server=localhost,1433;Database=AdventureWorks2019;TrustServerCertificate=True"
  }
}

// appsettings.Development.json (credentials — not committed to source control)
{
  "ConnectionStrings": {
    "AdventureWorksDb": "Server=localhost,1433;Database=AdventureWorks2019;User Id=sa;Password=...;TrustServerCertificate=True"
  }
}
```

---

## 9. Pending / Out of Scope

- [ ] Email confirmation on registration
- [ ] Password reset flow
- [ ] Angular auth guard (`CanActivate`) for protected routes
- [ ] `[ApiController]` dedicated API layer for Angular
- [ ] Production deployment configuration (reverse proxy, HTTPS termination)
- [ ] Unit tests for `ProductService` and `AccountController`
