═══════════════════════════════════════════════════════════════
BITÁCORA DEL PROYECTO ADVENTUREWORKS MIGRATION
═══════════════════════════════════════════════════════════════

##  Fecha de inicio: Abril 2026

##  OBJETIVO
Migrar una aplicación ASP.NET MVC 4 a ASP.NET Core 8 con Angular 21
para demostrar el Perfil 4 (Desarrollador ASP.NET Core MVC Senior)

═══════════════════════════════════════════════════════════════
## 📋 RESUMEN DE LO HECHO
═══════════════════════════════════════════════════════════════

### 1. BACKEND (ASP.NET Core 8)
-  Program.cs con configuración completa
-  ApplicationDbContext con EF Core + Identity
-  Controllers MVC (ProductsController, AccountController, HomeController)
-  API Controllers (ProductsApiController, AdminProductsApiController, AuthApiController)
-  Services (IProductService, ProductService)
-  Modelos de dominio (Product, ProductCategory, ProductSubcategory, Customer)
-  DTOs para API (ProductDto, PagedResult)
-  Autenticación con Cookie + Identity
-  Políticas de roles (Administrator, Sales, Customer)
-  Views Razor con Bootstrap 5
-  Seed automático de roles y usuario admin

### 2. FRONTEND (Angular 21)
-  Componentes standalone (Home, ProductList, AdminProducts, AdminProductForm)
-  Servicios HTTP (ProductService, AdminProductService, AuthService)
-  Guards (authGuard, adminGuard)
-  Routing con protección de rutas
-  Signals para estado reactivo
-  Modelos TypeScript (Product, CurrentUser)

### 3. TESTS
-  37 tests unitarios de backend (xUnit + Moq)
-  TestDbContext con InMemory provider
-  CustomWebApplicationFactory para integración
-  Tests Angular creados (faltan configurar runner)

### 4. DOCUMENTACIÓN
-  README.md completo (1064 líneas)
-  MIGRATION.md con decisiones técnicas
-  PERFIL4_QUESTIONS.txt (40 preguntas)
- .github/workflows/ci.yml

═══════════════════════════════════════════════════════════════
##  PROBLEMAS RESUELTOS
═══════════════════════════════════════════════════════════════

### Problema 1: ProductService no reconocía DbContext
**Error:** "Unable to resolve service for type 'Microsoft.EntityFrameworkCore.DbContext'"
**Solución:** Cambiar de `DbContext` genérico a `ApplicationDbContext` directo

### Problema 2: Tests fallaban por incompatibilidad de DbContext
**Error:** CS1503 - no se podía convertir TestDbContext a ApplicationDbContext
**Solución:** TestDbContext ahora hereda de ApplicationDbContext

### Problema 3: Angular no conectaba al backend
**Error:** ECONNREFUSED 127.0.0.1:5218
**Solución:** Backend no estaba corriendo correctamente

═══════════════════════════════════════════════════════════════
##  ESTRUCTURA FINAL
═══════════════════════════════════════════════════════════════

Proyectos/AW_Migration/
├── AdventureWorks.sln
├── README.md                         ← Documentación principal
├── MIGRATION.md                      ← Notas de migración
│
├── .github/workflows/ci.yml          ← CI/CD
│
├── AdventureWorks.Web/              ← BACKEND
│   ├── Controllers/
│   │   ├── Api/
│   │   │   ├── AuthApiController.cs
│   │   │   ├── ProductsApiController.cs
│   │   │   └── AdminProductsApiController.cs
│   │   ├── AccountController.cs
│   │   ├── HomeController.cs
│   │   └── ProductsController.cs
│   ├── Services/
│   │   ├── IProductService.cs
│   │   └── ProductService.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Models/
│   │   ├── Domain/
│   │   │   ├── Product.cs
│   │   │   ├── ProductCategory.cs
│   │   │   ├── ProductSubcategory.cs
│   │   │   └── Customer.cs
│   │   ├── Api/
│   │   │   └── ProductDto.cs
│   │   └── ViewModels/
│   ├── Views/                       ← Razor Views
│   ├── Program.cs
│   └── ClientApp/                   ← FRONTEND Angular
│       └── src/app/
│           ├── components/
│           ├── services/
│           ├── guards/
│           └── models/
│
└── AdventureWorks.Web.Tests/       ← TESTS (37 passing)
    ├── Controllers/
    ├── Services/
    ├── Fixtures/
    └── README.md                    

═══════════════════════════════════════════════════════════════
##  CÓMO CORRER EL PROYECTO
═══════════════════════════════════════════════════════════════

# Terminal 1 - Backend
cd /home/stefany/Proyectos/AW_Migration
dotnet run --project AdventureWorks.Web

# Terminal 2 - Frontend
cd /home/stefany/Proyectos/AW_Migration/AdventureWorks.Web/ClientApp
npm start

# Abrir en navegador: http://localhost:5218

# Credenciales:
# admin@adventureworks.com / Admin1234!



═══════════════════════════════════════════════════════════════
##  ESTADO ACTUAL
═══════════════════════════════════════════════════════════════

| Componente | Estado |
|------------|--------|
| Backend |  Funcionando |
| Frontend |  Compilando |
| Auth |  Funcionando |
| Tests |  37 passing |
| Documentación |  Completa |

## Puntuación Perfil 4: ~8/10

═══════════════════════════════════════════════════════════════
##  LINKS ÚTILES
═══════════════════════════════════════════════════════════════

- Demo: http://localhost:5218
- GitHub: (subir con git)
- Stack: ASP.NET Core 8 + Angular 21 + SQL Server 2022

═══════════════════════════════════════════════════════════════
