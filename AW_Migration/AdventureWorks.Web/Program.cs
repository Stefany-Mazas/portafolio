using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.DataProtection;
using AdventureWorks.Web.Data;
using AdventureWorks.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// ============================================
// 1. CONFIGURACIÓN MVC (Equivalente a <system.web>)
// ============================================
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        // camelCase para los endpoints API consumidos por Angular
        // Las vistas Razor no usan esta serialización — no hay impacto
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DictionaryKeyPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// ============================================
// 2. ENTITY FRAMEWORK - SQL SERVER
// ============================================
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AdventureWorksDb")));

// ============================================
// 3. ASP.NET CORE IDENTITY (reemplaza cookie auth manual)
// ============================================
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Política de passwords — ajustable según requisitos AW
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;

    // Lockout tras 5 intentos fallidos
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);

    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Rutas de cookie (Identity las gestiona internamente)
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    options.SlidingExpiration = true;
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
});

// ============================================
// 4. AUTORIZACIÓN (Políticas de Roles - AW Legacy)
// ============================================
builder.Services.AddAuthorization(options =>
{
    // Políticas equivalentes a <authorization> del web.config
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Administrator"));
    options.AddPolicy("RequireSalesRole", policy => policy.RequireRole("Sales", "Administrator"));
    options.AddPolicy("RequireCustomerRole", policy => policy.RequireRole("Customer"));
});

// ============================================
// 5. DATA PROTECTION (Claves de sesión - CRÍTICO en Linux)
// ============================================
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"/home/stefany/.aspnet/DataProtection-Keys"))
    .SetApplicationName("AdventureWorks");

// ============================================
// 6. SESSION (para mensajes flash / TempData)
// ============================================
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// ============================================
// 6b. SERVICIOS DE NEGOCIO
// ============================================
builder.Services.AddScoped<IProductService, ProductService>();

// ============================================
// 7. SPA SERVICES (Angular — proxy en dev, static en prod)
// ============================================
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist/ClientApp/browser";
});

var app = builder.Build();

// ============================================
// 7. PIPELINE MIDDLEWARE (Equivalente a <system.webServer>)
// ============================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}
else
{
    app.UseDeveloperExceptionPage();
}
app.UseStaticFiles();

if (!app.Environment.IsDevelopment())
    app.UseSpaStaticFiles();

app.UseRouting();

// IMPORTANTE: Orden correcto para AW Legacy
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

// ============================================
// SEED: roles y usuario admin inicial
// ============================================
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    string[] roles = ["Administrator", "Sales", "Customer"];
    foreach (var role in roles)
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));

    // Usuario admin por defecto — cambiar password en producción
    const string adminEmail = "admin@adventureworks.com";
    if (await userManager.FindByEmailAsync(adminEmail) is null)
    {
        var admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
        var result = await userManager.CreateAsync(admin, "Admin1234!");
        if (result.Succeeded)
            await userManager.AddToRoleAsync(admin, "Administrator");
    }
}

// ============================================
// 8. ROUTING MVC (Equivalente a RouteConfig.cs)
// ============================================
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// ============================================
// 9. SPA — proxy en desarrollo, archivos estáticos en producción
// ============================================
app.MapWhen(ctx =>
    !ctx.Request.Path.StartsWithSegments("/api") &&
    !ctx.Request.Path.StartsWithSegments("/Account") &&
    !ctx.Request.Path.StartsWithSegments("/Home") &&
    !ctx.Request.Path.StartsWithSegments("/Products") &&
    !ctx.Request.Path.StartsWithSegments("/Admin"),
    spaApp =>
    {
        spaApp.UseSpa(spa =>
        {
            spa.Options.SourcePath = "ClientApp";
            if (app.Environment.IsDevelopment())
                spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
        });
    });

app.Run();

// ── Necesario para WebApplicationFactory en tests de integración ──
// Con top-level statements, C# genera una clase Program interna.
// Esta declaración explícita la hace accesible para CustomWebApplicationFactory.
public partial class Program { }