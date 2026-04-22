import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { CurrentUser } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/auth';

  // Signal privado — la fuente de verdad del estado de auth
  private readonly _user = signal<CurrentUser | null>(null);
  private _checked = false;

  // Signals públicos de solo lectura
  readonly currentUser = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly isAdmin = computed(() => this._user()?.isAdmin ?? false);

  /**
   * Consulta /api/auth/me para inicializar el estado de auth.
   * Llamado una vez al arrancar la app (APP_INITIALIZER).
   * Si el servidor devuelve 401, el usuario no está autenticado.
   */
  loadCurrentUser(): Observable<CurrentUser | null> {
    return this.http.get<CurrentUser>(`${this.base}/me`).pipe(
      tap(user => this._user.set(user)),
      catchError(() => {
        this._user.set(null);
        return of(null);
      })
    );
  }

  /**
   * Redirige al login de ASP.NET Core MVC.
   * La cookie de Identity se gestiona en el servidor — no hay JWT que borrar.
   */
  redirectToLogin(returnUrl: string = '/products'): void {
    // environment.apiBase es '' en producción (mismo origen)
    // y 'http://localhost:5218' en desarrollo (puertos distintos)
    window.location.href = `${environment.apiBase}/Account/Login?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  /**
   * Marca al usuario como no autenticado localmente.
   * El logout real se hace via POST /Account/Logout (form en MVC).
   */
  clearUser(): void {
    this._user.set(null);
  }

  /**
   * Indica si ya se hizo la consulta inicial al servidor.
   */
  get checked(): boolean { return this._checked; }
  set checked(v: boolean) { this._checked = v; }
}
