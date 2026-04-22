import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, PagedResult } from '../models/product.model';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return paginated products', () => {
      const mockResponse: PagedResult<Product> = {
        items: [
          { productID: 1, name: 'Product 1', productNumber: 'P1', listPrice: 100, standardCost: 50 }
        ],
        total: 1,
        page: 1,
        pageSize: 12,
        totalPages: 1
      };

      service.getProducts('bike', 1, 12).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/products?q=bike&page=1&pageSize=12');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should use default values when no params provided', () => {
      service.getProducts().subscribe();

      const req = httpMock.expectOne('/api/products?q=&page=1&pageSize=12');
      expect(req.request.method).toBe('GET');
      req.flush({ items: [], total: 0, page: 1, pageSize: 12, totalPages: 0 });
    });

    it('should encode search query', () => {
      service.getProducts('mountain bike', 1, 12).subscribe();

      const req = httpMock.expectOne('/api/products?q=mountain%20bike&page=1&pageSize=12');
      expect(req.request.method).toBe('GET');
      req.flush({ items: [], total: 0, page: 1, pageSize: 12, totalPages: 0 });
    });
  });

  describe('getProduct', () => {
    it('should return single product by ID', () => {
      const mockProduct: Product = {
        productID: 1,
        name: 'Test Product',
        productNumber: 'TP-001',
        listPrice: 99.99,
        standardCost: 50
      };

      service.getProduct(1).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne('/api/products/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });
  });

  describe('getCategories', () => {
    it('should return list of categories', () => {
      const mockCategories = [
        { productCategoryID: 1, name: 'Bikes' },
        { productCategoryID: 2, name: 'Accessories' }
      ];

      service.getCategories().subscribe(categories => {
        expect(categories).toEqual(mockCategories);
      });

      const req = httpMock.expectOne('/api/products/categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);
    });
  });
});
