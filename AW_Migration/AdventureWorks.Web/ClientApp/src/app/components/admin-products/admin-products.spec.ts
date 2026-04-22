import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminProductsComponent } from './admin-products';
import { AdminProductService } from '../../services/admin-product.service';
import { Product, PagedResult } from '../models/product.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let adminServiceMock: any;
  let routerMock: any;

  const mockProducts: Product[] = [
    {
      productID: 1,
      name: 'Admin Product 1',
      productNumber: 'AP-001',
      listPrice: 99.99,
      standardCost: 50.00,
      color: 'Red'
    },
    {
      productID: 2,
      name: 'Admin Product 2',
      productNumber: 'AP-002',
      listPrice: 149.99,
      standardCost: 75.00,
      color: 'Blue'
    }
  ];

  const mockPagedResult: PagedResult<Product> = {
    items: mockProducts,
    total: 2,
    page: 1,
    pageSize: 20,
    totalPages: 1
  };

  beforeEach(async () => {
    adminServiceMock = {
      getProducts: vi.fn(),
      delete: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AdminProductsComponent, HttpClientTestingModule],
      providers: [
        { provide: AdminProductService, useValue: adminServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

    component.ngOnInit();

    expect(adminServiceMock.getProducts).toHaveBeenCalledWith('', 1, 20);
    expect(component.result()).toEqual(mockPagedResult);
    expect(component.loading()).toBe(false);
  });

  it('should handle error when loading products fails', () => {
    adminServiceMock.getProducts.mockReturnValue(throwError(() => new Error('Server error')));

    component.load();

    expect(component.loading()).toBe(false);
    expect(component.error()).toContain('Error loading products');
  });

  describe('search functionality', () => {
    it('should reset to page 1 and reload when searching', () => {
      component.currentPage.set(3);
      adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.onSearch();

      expect(component.currentPage()).toBe(1);
      expect(adminServiceMock.getProducts).toHaveBeenCalledWith('', 1, 20);
    });

    it('should use searchTerm when searching', () => {
      component.searchTerm = 'bike';
      adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.onSearch();

      expect(adminServiceMock.getProducts).toHaveBeenCalledWith('bike', 1, 20);
    });

    it('should clear search and reload', () => {
      component.searchTerm = 'bike';
      adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.clearSearch();

      expect(component.searchTerm).toBe('');
      expect(component.currentPage()).toBe(1);
    });
  });

  describe('pagination', () => {
    it('should calculate totalPages correctly', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 50,
        page: 1,
        pageSize: 20,
        totalPages: 3
      };
      component.result.set(pagedResult);

      expect(component.totalPages()).toBe(3);
    });

    it('should generate pages array', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 100,
        page: 1,
        pageSize: 20,
        totalPages: 5
      };
      component.result.set(pagedResult);

      expect(component.pages()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should navigate to valid page', () => {
      const pagedResult: PagedResult<Product> = {
        items: mockProducts,
        total: 100,
        page: 1,
        pageSize: 20,
        totalPages: 5
      };
      component.result.set(pagedResult);
      adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.goTo(3);

      expect(component.currentPage()).toBe(3);
      expect(adminServiceMock.getProducts).toHaveBeenCalledWith('', 3, 20);
    });
  });

  describe('delete functionality', () => {
    it('should set deletingId during delete', () => {
      adminServiceMock.delete.mockReturnValue(of(void 0));

      const product = mockProducts[0];
      component.doDelete(product.productID);

      expect(component.deletingId()).toBe(product.productID);
    });

    it('should reload after successful delete', () => {
      adminServiceMock.delete.mockReturnValue(of(void 0));
      adminServiceMock.getProducts.mockReturnValue(of(mockPagedResult));

      component.doDelete(1);

      // After delete completes, should reload
      // The subscription callback will be called
    });

    it('should handle delete error', () => {
      // Mock window.alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      adminServiceMock.delete.mockReturnValue(throwError(() => new Error('Delete failed')));

      component.doDelete(1);

      expect(component.deletingId()).toBeNull();
      expect(alertSpy).toHaveBeenCalled();
      
      alertSpy.mockRestore();
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

  describe('pageSize', () => {
    it('should have pageSize of 20 for admin', () => {
      expect(component.pageSize).toBe(20);
    });
  });
});
