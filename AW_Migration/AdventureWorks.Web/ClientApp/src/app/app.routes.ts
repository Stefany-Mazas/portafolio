import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductListComponent } from './components/products/product-list';
import { AdminProductsComponent } from './components/admin-products/admin-products';
import { AdminProductFormComponent } from './components/admin-products/admin-product-form';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: 'Products',
    canActivate: [authGuard]
  },
  // ── Admin Routes ────────────────────────────────────────
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    title: 'Admin: Products',
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/new',
    component: AdminProductFormComponent,
    title: 'Admin: New Product',
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/:id',
    component: AdminProductFormComponent,
    title: 'Admin: Edit Product',
    canActivate: [authGuard, adminGuard]
  },
  // ── Fallback ────────────────────────────────────────────
  { path: '**', redirectTo: '' }
];
