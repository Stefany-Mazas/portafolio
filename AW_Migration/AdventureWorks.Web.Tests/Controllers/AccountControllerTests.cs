using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using AdventureWorks.Web.Controllers;
using AdventureWorks.Web.Models;

namespace AdventureWorks.Web.Tests.Controllers;

/// <summary>
/// Unit tests para AccountController usando Moq.
/// 
/// Estrategia:
/// - Mock de UserManager<IdentityUser> — testea User creation, role assignment
/// - Mock de SignInManager<IdentityUser> — testea login/logout
/// - No necesitamos una DB real porque Identity tiene sus propios stores
/// 
/// LIMITACIÓN:
/// No podemos testear el login real sin una DB de Identity real o un
/// InMemory store. Testeamos la lógica del controller, no la de Identity.
/// </summary>
public class AccountControllerTests
{
    private readonly Mock<UserManager<IdentityUser>> _userManager;
    private readonly Mock<SignInManager<IdentityUser>> _signInManager;
    private readonly AccountController _controller;

    public AccountControllerTests()
    {
        // Setup mocks — el patrón para Identity con Moq
        var store = new Mock<IUserStore<IdentityUser>>();
        _userManager = new Mock<UserManager<IdentityUser>>(
            store.Object, null!, null!, null!, null!, null!, null!, null!, null!);

        var contextAccessor = new Mock<IHttpContextAccessor>();
        var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<IdentityUser>>();
        _signInManager = new Mock<SignInManager<IdentityUser>>(
            _userManager.Object, contextAccessor.Object, userPrincipalFactory.Object,
            null!, null!, null!, null!);

        _controller = new AccountController(_userManager.Object, _signInManager.Object);

        // Mock IUrlHelper para que Url.IsLocalUrl() funcione en tests
        var urlHelper = new Mock<IUrlHelper>();
        urlHelper.Setup(x => x.IsLocalUrl(It.IsAny<string>())).Returns(true);
        _controller.Url = urlHelper.Object;
    }

    // ── Register ─────────────────────────────────────────────

    [Fact]
    public async Task Register_ModelStateInvalid_ReturnsViewWithModel()
    {
        // Arrange
        _controller.ModelState.AddModelError("Email", "Required");
        var model = new RegisterViewModel { Email = "", Password = "Test1234!", ConfirmPassword = "Test1234!" };

        // Act
        var result = await _controller.Register(model);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.Equal(nameof(AccountController.Register), viewResult.ViewName ?? "Register");
    }

    [Fact]
    public async Task Register_Success_AssignsCustomerRole()
    {
        // Arrange
        var model = new RegisterViewModel
        {
            Email = "newuser@test.com",
            Password = "Test1234!",
            ConfirmPassword = "Test1234!"
        };

        _userManager.Setup(x => x.CreateAsync(It.IsAny<IdentityUser>(), model.Password))
            .ReturnsAsync(IdentityResult.Success);

        _userManager.Setup(x => x.AddToRoleAsync(It.IsAny<IdentityUser>(), "Customer"))
            .ReturnsAsync(IdentityResult.Success);

        _signInManager.Setup(x => x.SignInAsync(It.IsAny<IdentityUser>(), false, null))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Register(model);

        // Assert
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirectResult.ActionName);
        Assert.Equal("Home", redirectResult.ControllerName);

        // Verifica que se agregó el rol Customer
        _userManager.Verify(x => x.AddToRoleAsync(
            It.Is<IdentityUser>(u => u.Email == "newuser@test.com"),
            "Customer"), Times.Once);
    }

    [Fact]
    public async Task Register_CreateFails_ReturnsViewWithErrors()
    {
        // Arrange
        var model = new RegisterViewModel
        {
            Email = "existing@test.com",
            Password = "Test1234!",
            ConfirmPassword = "Test1234!"
        };

        var errors = new[] { new IdentityError { Description = "Email already exists." } };
        _userManager.Setup(x => x.CreateAsync(It.IsAny<IdentityUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Failed(errors));

        // Act
        var result = await _controller.Register(model);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.False(_controller.ModelState.IsValid);
        Assert.Single(_controller.ModelState[string.Empty]?.Errors ?? []);
    }

    // ── Login ───────────────────────────────────────────────

    [Fact]
    public async Task Login_ModelStateInvalid_ReturnsView()
    {
        // Arrange
        _controller.ModelState.AddModelError("Email", "Required");
        var model = new LoginViewModel { Email = "", Password = "" };

        // Act
        var result = await _controller.Login(model);

        // Assert
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public async Task Login_Success_RedirectsToLocalUrl()
    {
        // Arrange
        var model = new LoginViewModel
        {
            Email = "test@test.com",
            Password = "Test1234!",
            RememberMe = false
        };

        _signInManager.Setup(x => x.PasswordSignInAsync(
            model.Email, model.Password, model.RememberMe, true)) // lockoutOnFailure = true
            .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);

        // Act
        var result = await _controller.Login(model, returnUrl: "/Products");

        // Assert
        var redirectResult = Assert.IsType<RedirectResult>(result);
        Assert.Equal("/Products", redirectResult.Url);
    }

    [Fact]
    public async Task Login_Success_WithoutReturnUrl_RedirectsToHome()
    {
        // Arrange
        var model = new LoginViewModel
        {
            Email = "test@test.com",
            Password = "Test1234!"
        };

        _signInManager.Setup(x => x.PasswordSignInAsync(
            It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
            .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);

        // Act
        var result = await _controller.Login(model);

        // Assert
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirectResult.ActionName);
        Assert.Equal("Home", redirectResult.ControllerName);
    }

    [Fact]
    public async Task Login_LockedOut_ReturnsViewWithLockoutMessage()
    {
        // Arrange
        var model = new LoginViewModel { Email = "locked@test.com", Password = "Wrong1!" };

        _signInManager.Setup(x => x.PasswordSignInAsync(
            It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
            .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.LockedOut);

        // Act
        var result = await _controller.Login(model);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.Contains("locked", 
            _controller.ModelState[string.Empty]?.Errors?[0]?.ErrorMessage ?? "", 
            StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Login_Failed_ReturnsViewWithError()
    {
        // Arrange
        var model = new LoginViewModel
        {
            Email = "test@test.com",
            Password = "WrongPassword"
        };

        _signInManager.Setup(x => x.PasswordSignInAsync(
            It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
            .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Failed);

        // Act
        var result = await _controller.Login(model);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.Contains("Invalid", 
            _controller.ModelState[string.Empty]?.Errors?[0]?.ErrorMessage ?? "");
    }

    // ── Logout ───────────────────────────────────────────────

    [Fact]
    public async Task Logout_CallsSignOut()
    {
        // Arrange
        _signInManager.Setup(x => x.SignOutAsync())
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Logout();

        // Assert
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirectResult.ActionName);
        _signInManager.Verify(x => x.SignOutAsync(), Times.Once);
    }

    // ── AccessDenied ────────────────────────────────────────

    [Fact]
    public void AccessDenied_ReturnsView()
    {
        // Act
        var result = _controller.AccessDenied();

        // Assert
        Assert.IsType<ViewResult>(result);
    }
}
