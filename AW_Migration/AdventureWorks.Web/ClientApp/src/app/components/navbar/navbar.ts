import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">
          <i class="bi bi-bicycle"></i> Adventure Works
        </a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <a class="nav-link" routerLink="/"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: true }">Home</a>
            </li>
            @if (auth.isAuthenticated()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/products" routerLinkActive="active">
                  <i class="bi bi-box-seam"></i> Products
                </a>
              </li>
              @if (auth.isAdmin()) {
                <li class="nav-item">
                  <a class="nav-link" routerLink="/admin/products" routerLinkActive="active">
                    <i class="bi bi-gear"></i> Admin
                  </a>
                </li>
              }
            }
          </ul>

          <ul class="navbar-nav ms-auto">
            @if (auth.isAuthenticated()) {
              <li class="nav-item">
                <span class="navbar-text text-light me-3">
                  <i class="bi bi-person-circle"></i>
                  {{ auth.currentUser()?.email }}
                  @if (auth.isAdmin()) {
                    <span class="badge bg-warning text-dark ms-1">Admin</span>
                  }
                </span>
              </li>
              <li class="nav-item">
                <!-- Logout via form POST al MVC controller — la cookie se borra en el servidor -->
                <form action="/Account/Logout" method="post" class="d-inline">
                  <input name="__RequestVerificationToken" type="hidden" [value]="getAntiforgeryToken()" />
                  <button type="submit" class="btn btn-outline-light btn-sm">
                    <i class="bi bi-box-arrow-right"></i> Logout
                  </button>
                </form>
              </li>
            } @else {
              <li class="nav-item">
                <a class="nav-link text-light" href="/Account/Login">
                  <i class="bi bi-box-arrow-in-right"></i> Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light" href="/Account/Register">
                  <i class="bi bi-person-plus"></i> Register
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  readonly auth = inject(AuthService);

  ngOnInit(): void {
    // Carga el usuario al iniciar la navbar si aún no se ha verificado
    if (!this.auth.checked) {
      this.auth.loadCurrentUser().subscribe(() => {
        this.auth.checked = true;
      });
    }
  }

  /** Lee el token antiforgery de la cookie para el form de logout */
  getAntiforgeryToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  }
}
