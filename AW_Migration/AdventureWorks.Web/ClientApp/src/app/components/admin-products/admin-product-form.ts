import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminProductService, ProductUpsert } from '../../services/admin-product.service';
import { CategoryDto } from '../../models/product.model';

/**
 * Formulario para crear o editar un producto.
 * Se usa tanto para crear productos nuevos como para editar existentes.
 */
@Component({
  selector: 'app-admin-product-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-product-form.html'
})
export class AdminProductFormComponent implements OnInit {
  private readonly svc = inject(AdminProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Determina si estamos editando o creando
  readonly isEditing = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly categories = signal<CategoryDto[]>([]);

  // El ID del producto si estamos editando
  private productId: number | null = null;

  // Datos del formulario
  form = {
    name: '',
    productNumber: '',
    color: '',
    listPrice: 0,
    standardCost: 0,
    size: '',
    weight: null as number | null,
    productSubcategoryID: null as number | null
  };

  ngOnInit(): void {
    // Cargar categorías
    this.svc.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: (err) => this.error.set('Error loading categories')
    });

    // Verificar si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.productId = +id;
      this.isEditing.set(true);
      this.loadProduct(this.productId);
    }
  }

  private loadProduct(id: number): void {
    this.loading.set(true);

    this.svc.getById(id).subscribe({
      next: (product) => {
        this.form = {
          name: product.name,
          productNumber: product.productNumber,
          color: product.color || '',
          listPrice: product.listPrice,
          standardCost: product.standardCost,
          size: product.size || '',
          weight: product.weight || null,
          productSubcategoryID: product.subcategory?.productSubcategoryID || null
        };
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Product not found');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    // Validación básica
    if (!this.form.name.trim()) {
      this.error.set('Name is required');
      return;
    }
    if (!this.form.productNumber.trim()) {
      this.error.set('Product number is required');
      return;
    }

    this.error.set(null);
    this.saving.set(true);

    const data: ProductUpsert = {
      name: this.form.name.trim(),
      productNumber: this.form.productNumber.trim(),
      color: this.form.color || null,
      listPrice: this.form.listPrice,
      standardCost: this.form.standardCost,
      size: this.form.size || null,
      weight: this.form.weight,
      productSubcategoryID: this.form.productSubcategoryID
    };

    if (this.isEditing() && this.productId) {
      this.svc.update(this.productId, data).subscribe({
        next: () => {
          this.saving.set(false);
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.error.set('Error updating product: ' + (err.error?.message || err.message));
          this.saving.set(false);
        }
      });
    } else {
      this.svc.create(data).subscribe({
        next: () => {
          this.saving.set(false);
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.error.set('Error creating product: ' + (err.error?.message || err.message));
          this.saving.set(false);
        }
      });
    }
  }
}
