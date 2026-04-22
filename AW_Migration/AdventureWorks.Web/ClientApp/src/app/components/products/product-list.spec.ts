import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list';
import { ProductService } from '../../services/product.service';
import { Product, PagedResult } from '../models/product.model';
import { of, throwError } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: any;

  const mockProducts: Product[] = [
    {
      productID: 1,
      name: 'Test Product 1',
      productNumber: 'TP-001',
      listPrice: 99.99,
      standardCost: 50.00,
      color: 'Red'
    },
    {
      productID: 2,
      name: 'Test Product 2',
      productNumber: 'TP-002',
      listPrice: 149.99,
      standardCost: 75.00,
      color: 'Blue'
    }
  ];

  const mockPagedResult: PagedResult<Product> = {
    items: mockProducts,
    total: 2,
    page: 1,
    pageSize: 12,
    totalPages: 1
  };

  beforeEach(async () => {
    productServiceMock = {
      getProducts: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

    component.ngOnInit();

    expect(productServiceMock.getProducts).toHaveBeenCalledWith('', 1, 12);
    expect(component.result()).toEqual(mockPagedResult);
    expect(component.loading()).toBe(false);
  });

  it('should handle error when loading products fails', () => {
    productServiceMock.getProducts.mockReturnValue(throwError(() => new Error('Server error')));

    component.load();

    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('Could not load products. Make sure the backend is running.');
  });

  describe('search functionality', () => {
    it('should reset to page 1 and reload when searching', () => {
      component.currentPage.set(3);
      productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.onSearch();

      expect(component.currentPage()).toBe(1);
      expect(productServiceMock.getProducts).toHaveBeenCalledWith('', 1, 12);
    });

    it('should use searchTerm when searching', () => {
      component.searchTerm = 'bike';
      productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.onSearch();

      expect(productServiceMock.getProducts).toHaveBeenCalledWith('bike', 1, 12);
    });

    it('should clear search and reload', () => {
      component.searchTerm = 'bike';
      productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.clearSearch();

      expect(component.searchTerm).toBe('');
      expect(component.currentPage()).toBe(1);
    });
  });

  describe('pagination', () => {
    it('should calculate totalPages correctly', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 25,
        page: 1,
        pageSize: 12,
        totalPages: 3
      };
      component.result.set(pagedResult);

      expect(component.totalPages()).toBe(3);
    });

    it('should generate pages array', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 50,
        page: 1,
        pageSize: 12,
        totalPages: 5
      };
      component.result.set(pagedResult);

      expect(component.pages()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not navigate when page is invalid', () => {
      productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));
      component.currentPage.set(2);

      component.goTo(0);
      expect(productServiceMock.getProducts).not.toHaveBeenCalled();

      component.goTo(-1);
      expect(productServiceMock.getProducts).not.toHaveBeenCalled();
    });

    it('should navigate to valid page', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 50,
        page: 1,
        pageSize: 12,
        totalPages: 5
      };
      component.result.set(pagedResult);
      productServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.goTo(3);

      expect(component.currentPage()).toBe(3);
      expect(productServiceMock.getProducts).toHaveBeenCalledWith('', 3, 12);
    });
  });

  describe('computed signals', () => {
    it('should return 0 totalPages when result is null', () => {
      component.result.set(null);
      expect(component.totalPages()).toBe(0);
    });

    it('should return empty array when result is null', () => {
      component.result.set(null);
      expect(component.pages()).toEqual([]);
    });
  });
});
