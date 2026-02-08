import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { Product, Category, Supplier } from '../../../core/models';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    sku: '',
    category: 0,
    supplier: 0,
    price: 0,
    quantity: 0,
    min_stock: 10
  };
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  isEditing = false;
  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadProduct(+id);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error:', error)
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => this.suppliers = suppliers,
      error: (error) => console.error('Error:', error)
    });
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => this.product = product,
      error: (error) => {
        console.error('Error:', error);
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const operation = this.isEditing && this.product.id
      ? this.productService.updateProduct(this.product.id, this.product)
      : this.productService.createProduct(this.product);

    operation.subscribe({
      next: () => {
        alert(`Producto ${this.isEditing ? 'actualizado' : 'creado'} exitosamente`);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Error al guardar el producto';
        this.loading = false;
      }
    });
  }

  validateForm(): boolean {
    if (!this.product.name || !this.product.sku) {
      this.errorMessage = 'Nombre y SKU son obligatorios';
      return false;
    }
    if (this.product.category === 0) {
      this.errorMessage = 'Seleccione una categoría';
      return false;
    }
    if (this.product.supplier === 0) {
      this.errorMessage = 'Seleccione un proveedor';
      return false;
    }
    if (this.product.price <= 0) {
      this.errorMessage = 'El precio debe ser mayor a 0';
      return false;
    }
    return true;
  }
}
