import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="text-center py-5">
      <h1 class="display-4">Welcome to Adventure Works</h1>
      <p class="lead text-muted">Your premier source for outdoor and cycling equipment.</p>

      @if (auth.isAuthenticated()) {
        <div class="alert alert-success d-inline-block mt-3">
          <i class="bi bi-check-circle"></i>
          Logged in as <strong>{{ auth.currentUser()?.email }}</strong>
        </div>
        <div class="mt-3">
          <a routerLink="/products" class="btn btn-primary btn-lg">
            <i class="bi bi-box-seam"></i> Browse Products
          </a>
        </div>
      } @else {
        <div class="mt-4 d-flex gap-3 justify-content-center">
          <a href="/Account/Login" class="btn btn-primary btn-lg">
            <i class="bi bi-box-arrow-in-right"></i> Sign In
          </a>
          <a href="/Account/Register" class="btn btn-outline-primary btn-lg">
            <i class="bi bi-person-plus"></i> Register
          </a>
        </div>
      }
    </div>
  `
})
export class HomeComponent {
  readonly auth = inject(AuthService);
}
