import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product, PagedResult, CategoryDto } from '../models/product.model';

/**
 * DTO para crear o editar un producto.
 * Coincide con ProductUpsertDto en el backend.
 */
export interface ProductUpsert {
  name: string;
  productNumber: string;
  color?: string | null;
  listPrice: number;
  standardCost: number;
  size?: string | null;
  weight?: number | null;
  productSubcategoryID?: number | null;
}

/**
 * Servicio de administración de productos.
 * Todos los endpoints requieren rol Administrator.
 * Los requests HTTP envían cookies de sesión automáticamente.
 */
@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/admin/products';

  /**
   * GET /api/admin/products?q=&page=1&pageSize=20
   * Lista paginada con búsqueda — incluye productos descontinuados.
   */
  getProducts(
    q: string = '',
    page: number = 1,
    pageSize: number = 20
  ): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (q) params = params.set('q', q);

    return this.http.get<PagedResult<Product>>(this.base, { params });
  }

  /**
   * GET /api/admin/products/{id}
   */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  /**
   * POST /api/admin/products
   */
  create(product: ProductUpsert): Observable<Product> {
    return this.http.post<Product>(this.base, product);
  }

  /**
   * PUT /api/admin/products/{id}
   */
  update(id: number, product: ProductUpsert): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, product);
  }

  /**
   * DELETE /api/admin/products/{id}
   * Soft delete — marca como descontinuado, no borra el registro.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  /**
   * GET /api/products/categories
   * Categorías para el dropdown del formulario.
   * Este endpoint es público, no requiere admin.
   */
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>('/api/products/categories');
  }
}
