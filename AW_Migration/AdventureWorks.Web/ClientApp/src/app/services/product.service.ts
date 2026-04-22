import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult, Product, CategoryDto } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/products';

  getProducts(
    q: string = '',
    page: number = 1,
    pageSize: number = 12,
    categoryId?: number
  ): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (q) params = params.set('q', q);
    if (categoryId) params = params.set('categoryId', categoryId);

    return this.http.get<PagedResult<Product>>(this.base, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.base}/categories`);
  }
}
