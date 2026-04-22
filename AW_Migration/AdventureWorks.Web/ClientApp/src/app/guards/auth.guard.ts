import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional (Angular 15+) que protege rutas autenticadas.
 *
 * Flujo:
 * 1. Si ya tenemos el usuario en el signal → permite o redirige inmediatamente
 * 2. Si no → consulta /api/auth/me (primera carga o F5)
 * 3. 401 del servidor → redirige a /Account/Login con returnUrl
 *
 * Usa CanActivateFn en lugar de la clase CanActivate (deprecada en Angular 15+).
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si ya tenemos el estado en memoria, respuesta inmediata (sin HTTP)
  if (auth.checked) {
    if (auth.isAuthenticated()) return true;
    auth.redirectToLogin(state.url);
    return false;
  }

  // Primera visita o F5 — verificar sesión contra el servidor
  return auth.loadCurrentUser().pipe(
    map(user => {
      auth.checked = true;
      if (user) return true;
      auth.redirectToLogin(state.url);
      return false;
    }),
    catchError(() => {
      auth.redirectToLogin(state.url);
      return of(false);
    })
  );
};
