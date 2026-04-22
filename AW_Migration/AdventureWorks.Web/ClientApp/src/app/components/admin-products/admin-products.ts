import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { AdminProductService, ProductUpsert } from '../../services/admin-product.service';
import { Product, PagedResult } from '../../models/product.model';

/**
 * Componente de administración de productos.
 * Muestra lista paginada con acciones: crear, editar, eliminar.
 */
@Component({
  selector: 'app-admin-products',
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './admin-products.html'
})
export class AdminProductsComponent implements OnInit {
  private readonly svc = inject(AdminProductService);
  private readonly router = inject(Router);

  // Estado
  searchTerm = '';
  currentPage = signal(1);
  readonly pageSize = 20;

  result = signal<PagedResult<Product> | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  // Confirmación de eliminación
  deletingId = signal<number | null>(null);

  // Computed
  totalPages = computed(() => this.result()?.totalPages ?? 0);
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.svc.getProducts(this.searchTerm, this.currentPage(), this.pageSize).subscribe({
      next: (data) => {
        this.result.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error loading products: ' + (err.message || 'Unknown error'));
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.load();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.load();
  }

  /**
   * Confirma y ejecuta soft delete.
   */
  confirmDelete(product: Product): void {
    if (confirm(`Soft delete "${product.name}"? It will be marked as discontinued.`)) {
      this.doDelete(product.productID);
    }
  }

  private doDelete(id: number): void {
    this.deletingId.set(id);

    this.svc.delete(id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.load(); // Refresh
      },
      error: (err) => {
        this.deletingId.set(null);
        alert('Error deleting product: ' + (err.message || 'Unknown error'));
      }
    });
  }

  /**
   * Indica si un producto está descontinuado.
   */
  isDiscontinued(product: Product): boolean {
    return !!product.subcategory?.category?.name; // Simplificado por ahora
  }
}
