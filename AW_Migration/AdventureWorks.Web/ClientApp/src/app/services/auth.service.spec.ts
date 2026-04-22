import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CurrentUser } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadCurrentUser', () => {
    it('should set user when API returns 200 with user data', () => {
      const mockUser: CurrentUser = {
        email: 'admin@adventureworks.com',
        isAdmin: true,
        roles: ['Administrator']
      };

      service.loadCurrentUser().subscribe();

      const req = httpMock.expectOne('/api/auth/me');
      req.flush(mockUser);

      expect(service.currentUser()).toEqual(mockUser);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.isAdmin()).toBe(true);
    });

    it('should set user to null when API returns 401', () => {
      service.loadCurrentUser().subscribe();

      const req = httpMock.expectOne('/api/auth/me');
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.isAdmin()).toBe(false);
    });

    it('should set checked to true after request', () => {
      expect(service.checked).toBe(false);

      const mockUser: CurrentUser = { email: 'test@test.com', isAdmin: false };
      service.loadCurrentUser().subscribe();

      const req = httpMock.expectOne('/api/auth/me');
      req.flush(mockUser);

      expect(service.checked).toBe(true);
    });
  });

  describe('clearUser', () => {
    it('should set user to null', () => {
      // First set a user
      const mockUser: CurrentUser = { email: 'test@test.com', isAdmin: false };
      service.loadCurrentUser().subscribe();
      const req = httpMock.expectOne('/api/auth/me');
      req.flush(mockUser);

      expect(service.isAuthenticated()).toBe(true);

      // Then clear
      service.clearUser();

      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when user is null', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return true when user exists', () => {
      service.loadCurrentUser().subscribe();
      const req = httpMock.expectOne('/api/auth/me');
      req.flush({ email: 'test@test.com', isAdmin: false });

      expect(service.isAuthenticated()).toBe(true);
    });
  });

  describe('isAdmin', () => {
    it('should return false when user is null', () => {
      expect(service.isAdmin()).toBe(false);
    });

    it('should return true when user is admin', () => {
      service.loadCurrentUser().subscribe();
      const req = httpMock.expectOne('/api/auth/me');
      req.flush({ email: 'admin@adventureworks.com', isAdmin: true });

      expect(service.isAdmin()).toBe(true);
    });

    it('should return false when user is not admin', () => {
      service.loadCurrentUser().subscribe();
      const req = httpMock.expectOne('/api/auth/me');
      req.flush({ email: 'customer@test.com', isAdmin: false });

      expect(service.isAdmin()).toBe(false);
    });
  });
});
