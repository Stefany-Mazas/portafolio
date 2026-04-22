using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AdventureWorks.Web.Controllers.Api;

/// <summary>
/// Endpoints de autenticación para el frontend Angular.
/// Permite que la SPA consulte el estado de sesión del usuario
/// sin manejar tokens — la cookie de Identity viaja automáticamente.
/// </summary>
[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthApiController : ControllerBase
{
    /// <summary>
    /// GET api/auth/me
    /// Devuelve los datos del usuario autenticado.
    /// Retorna 401 si no hay sesión activa — el guard de Angular lo intercepta.
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Me()
    {
        var email = User.FindFirstValue(ClaimTypes.Email)
                    ?? User.FindFirstValue(ClaimTypes.Name)
                    ?? User.Identity?.Name;

        var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();

        return Ok(new
        {
            email,
            roles,
            isAdmin = User.IsInRole("Administrator")
        });
    }
}
