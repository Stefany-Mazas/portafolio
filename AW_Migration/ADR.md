# ADRs - Architecture Decision Records

Decisiones de arquitectura documentadas del proyecto AdventureWorks.

---

## ADR-001: Usar Entity Framework Core en lugar de Dapper

### Estado: ✅ Aprobado

### Contexto
El proyecto requiere acceso a datos para una aplicación webfull-stack con SQL Server. Se evalúa entre EF Core y Dapper.

### Decisión
Usar **Entity Framework Core 8** como ORM principal.

### Consecuencias
- Positivo: Productividad con migrationsautomáticas
- Positivo: LINQ para consultas tipadas
- Positivo: Cambio de base de datos con mínimo código
- Negativo: Overhead vs Dapper puro
- Negativo: Curva de aprendizaje para optimizations

### Justificación
Para un equipo con experiencia media, EF Core ofrece mejor productividad. El overheades aceptable para aplicaciones de tamaño medio. Las migrations y change tracking ahorran tiempo desarrollo.

---

## ADR-002: Dos controladoresseparados para Products (MVC + API)

### Estado: ✅ Aprobado

### Contexto
Se necesita mostrar productos tanto en vistas Razor (MVC) como en el frontend Angular (SPA). Both necesitan acceder a los mismos datos.

### Decisión
Crear dos controladores separados:
- `ProductsController` → Devuelve vistas Razor
- `ProductsApiController` → Devuelve JSON

### Consecuencias
- Positivo: Separación clara de responsabilidades
- Positivo: API dedicada para SPA
- Negativo: Duplicación de lógica de negocio → Se mitiga con servicio compartido
- Negativo: Mantener dos archivos

### Justificación
El patrón "BFF" (Backend for Frontend) recomienda una API dedicada paranuestros frontends. ProductsController usa MVC patterns (ViewModels), ProductsApiController usa DTOs. La lógica de negocio está en ProductService, ambos controladores lo usan.

---

## ADR-003: Soft delete en productos en lugar de hard delete

### Estado: ✅ Aprobado

### Contexto
Los productos tienen relaciones con otras tablas (SalesOrderDetail, WorkOrder). Borrar físicamente rompería integridad referencial.

### Decisión
Usar **soft delete**: marcar campo `DiscontinuedDate` en lugarde borrar el registro.

### Consecuencias
- Positivo: Mantiene integridad referencial
- Positivo: Historial de datos completo
- Negativo: Agregar filtro en todas las consultas (`WHERE DiscontinuedDate IS NULL`)

### Justificación
AdventureWorks usa este patrón nativamente (campo DiscontinuedDate). Todas las queries existentes ya filtran productos activos. No requiere cambio de schema.

---

## ADR-004: Usar standalone components en Angular

### Estado: ✅ Aprobado

### Contexto
El proyecto usa Angular 19+. Se evalúa entre NgModules tradicionales y standalone components.

### Decisión
Usar **standalone components** exclusivamente.

### Consecuencias
- Positivo: Menos boilerplate
- Positivo: Dependencias explícitas en cada componente
- Positivo: Lazy loading nativo
- Negativo: Migration desde AngularJS más compleja

### Justificación
Angular 17+ recomienda standalone como default. Reducesize del bundle y simplify dependency graph. En el portafolio 3D usamos este patrón exclusivamente.

---

## ADR-005: Usar Signals en lugar de RxJS BehaviorSubject

### Estado: ✅ Aprobado

### Contexto
Se necesita estado reactivo simple en Angular. Opciones: RxJS (BehaviorSubject) vs Angular Signals.

### Decisión
Usar **Signals** para estado local simple.

### Consecuencias
- Positivo: Sintaxis más simple y legible
- Positivo: Mejor rendimiento que BehaviorSubject
- Negativo: No hay para flujos complejos
- Negativo: RxJS sigue siendo necesario para HTTP

### Justificación
Signals (Angular 16+) son la nueva forma recomendada parareactividad local. Para flujos HTTP complejos, RxJS sigue siendo necesario. Usamos signals para: `selectedProject`, `loading`, `error`. HTTP usa observables.

---

## ADR-006: Autenticación con cookies en lugar de JWT

### Estado: ✅ Aprobado

### Contexto
Se necesita autenticación para el e-commerce. Opciones: JWT (token) vs cookies cifradas.

### Decisión
Usar **ASP.NET Core Identity con cookies**.

### Consecuencias
- Positivo: Segura contra XSS (HttpOnly)
- Positivo: Negocia automáticamente con Identity
- Negativo: No sirve para APIs sin estado
- Negativo: Tamaño del cookie

### Justificación
Para MVC + SPA con el mismo origen, las cookies son más simples. JWT sirve para microservices o SPAs en distinto dominio. Usamos cookies con DataProtection de Core.

---

## ADR-007: Soft delete con campo DiscontinuedDate

### Estado: ✅ Aprobado

### Contexto
Los productos en AdventureWorks no se borran, se marcan como descontinuados. El campo existe: `DiscontinuedDate`.

### Decisión
Usar el camponativo `DiscontinuedDate` para soft delete en lugar de `IsDeleted`.

### Consecuencias
- Positivo: No altera el schema existent
- Positivo: Compatible con reportes históricos
- Negativo: Recordar filtro en cada query

### Justificación
AdventureWorks2019 ya tiene este mecanismo. Our queries ya filtran `WHERE SellEndDate IS NULL AND DiscontinuedDate IS NULL`. No hay reason to change.

---

## ADR-008: ExcludeFromMigrations para tablas existentes

### Estado: ✅ Aprobado

### Contexto
Las tablas de AdventureWorks (Product, ProductCategory, etc.) ya existen en la base de datos. EF Core quiere crear migraciones para ellas.

### Decisión
Usar `HasDefaultSchema("Production")` + configuración para **no generar migrations** para tablas existentes.

### Consecuencias
- Positivo: Solo migrations para Identity
- Negativo: Schema changes requieren SQL manual

### Justificación
Las tablas de AW ya están pobladas. CRUD operations las usa como solo lectura. Solo necesitamos crear tablas de Identity. migrations sería conflictivo.

---

## Formato ADR

Cada ADR sigue este formato:

```
# ADR-XXX: Título cort

### Estado: ✅ Aprobado | ⚠️ Pendiente | ❌ Rechazado

### Contexto
Situación que requiere decisión.

### Decisión
Qué se eligió y por qué.

### Consecuencias
- Positivo: ...
- Negativo: ...

### Justificación
Razón técnica o de negocio.
```

---

*ADRs del proyecto AdventureWorks - Abril 2026*