using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdventureWorks.Web.Models.ViewModels;
using AdventureWorks.Web.Services;

namespace AdventureWorks.Web.Controllers;

/// <summary>
/// MVC Controller — devuelve vistas Razor.
/// Los endpoints JSON para Angular están en Api/ProductsApiController.
/// </summary>
[Authorize]
public class ProductsController : Controller
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    // GET /Products
    [HttpGet]
    public async Task<IActionResult> Index(string? search, int? categoryId, int page = 1)
    {
        const int pageSize = 20;

        var (items, total) = await _productService.GetPagedAsync(page, pageSize, search, categoryId);
        var categories = await _productService.GetCategoriesAsync();

        var vm = new ProductListViewModel
        {
            Products = items,
            Categories = categories,
            Search = search,
            CategoryId = categoryId,
            CurrentPage = page,
            PageSize = pageSize,
            TotalCount = total
        };

        return View(vm);
    }

    // GET /Products/Details/5
    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product is null)
            return NotFound();

        return View(product);
    }
}
