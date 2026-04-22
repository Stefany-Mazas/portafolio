import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product, PagedResult } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  private readonly svc = inject(ProductService);

  // ngModel necesita una propiedad normal, no un signal
  searchTerm = '';
  currentPage = signal(1);
  readonly pageSize = 12;

  result = signal<PagedResult<Product> | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  totalPages = computed(() => this.result()?.totalPages ?? 0);
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.svc.getProducts(this.searchTerm, this.currentPage(), this.pageSize).subscribe({
      next: (data) => { this.result.set(data); this.loading.set(false); },
      error: () => { this.error.set('Could not load products. Make sure the backend is running.'); this.loading.set(false); }
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
}
