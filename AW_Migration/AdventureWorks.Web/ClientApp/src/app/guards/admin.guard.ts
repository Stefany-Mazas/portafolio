import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional que protege rutas exclusivas para Administrators.
 *
 * Flujo:
 * 1. Si ya tenemos el usuario y es admin → permite acceso
 * 2. Si ya tenemos el usuario pero NO es admin → redirige a home (403 implícito)
 * 3. Si no sabemos quién es → consulta /api/auth/me
 * 4. 401/403 del servidor → redirige a /Account/Login
 *
 * A diferencia de authGuard, este verifica específicamente el rol Administrator.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si ya tenemos el estado en memoria
  if (auth.checked) {
    if (auth.isAdmin()) return true;
    // Es usuario pero no admin → redirigir a home
    router.navigate(['/']);
    return false;
  }

  // Primera visita o F5 — verificar sesión contra el servidor
  return auth.loadCurrentUser().pipe(
    map(user => {
      auth.checked = true;
      if (user?.isAdmin) return true;
      // Usuario autenticado pero no admin
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      auth.redirectToLogin(state.url);
      return of(false);
    })
  );
};
