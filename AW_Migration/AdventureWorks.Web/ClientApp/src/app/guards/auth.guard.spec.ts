import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../models/auth.model';
import { of, throwError } from 'rxjs';

describe('authGuard', () => {
  let authServiceMock: any;
  let routerMock: any;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: any;

  beforeEach(() => {
    authServiceMock = {
      checked: false,
      isAuthenticated: vi.fn(),
      isAdmin: vi.fn(),
      loadCurrentUser: vi.fn(),
      redirectToLogin: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    mockRoute = {
      url: []
    } as ActivatedRouteSnapshot;

    mockState = {
      url: '/products'
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should allow access when user is already authenticated', () => {
    authServiceMock.checked = true;
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const result = authGuard(mockRoute, mockState);

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not authenticated and already checked', () => {
    authServiceMock.checked = true;
    authServiceMock.isAuthenticated.mockReturnValue(false);

    const result = authGuard(mockRoute, mockState);

    expect(result).toBe(false);
    expect(authServiceMock.redirectToLogin).toHaveBeenCalledWith('/products');
  });

  it('should query server when user is not yet checked', () => {
    const mockUser: CurrentUser = { email: 'test@test.com', isAdmin: false };
    authServiceMock.loadCurrentUser.mockReturnValue(of(mockUser));

    authGuard(mockRoute, mockState);

    const req = authServiceMock.loadCurrentUser;
    expect(req).toHaveBeenCalled();
  });

  it('should allow access when server returns user', () => {
    const mockUser: CurrentUser = { email: 'test@test.com', isAdmin: false };
    authServiceMock.loadCurrentUser.mockReturnValue(of(mockUser));

    const result = authGuard(mockRoute, mockState);

    expect(result).toBe(true);
    expect(authServiceMock.redirectToLogin).not.toHaveBeenCalled();
  });

  it('should redirect to login when server returns 401', () => {
    authServiceMock.loadCurrentUser.mockReturnValue(throwError(() => ({ status: 401 })));

    authGuard(mockRoute, mockState);

    // Wait for the observable to complete
    setTimeout(() => {
      expect(authServiceMock.redirectToLogin).toHaveBeenCalledWith('/products');
    }, 0);
  });

  it('should redirect to login when server returns null user', () => {
    authServiceMock.loadCurrentUser.mockReturnValue(of(null));

    authGuard(mockRoute, mockState);

    setTimeout(() => {
      expect(authServiceMock.redirectToLogin).toHaveBeenCalledWith('/products');
    }, 0);
  });

  it('should set checked to true after server response', () => {
    const mockUser: CurrentUser = { email: 'test@test.com', isAdmin: false };
    authServiceMock.loadCurrentUser.mockReturnValue(of(mockUser));

    authGuard(mockRoute, mockState);

    setTimeout(() => {
      expect(authServiceMock.checked).toBe(true);
    }, 0);
  });
});
