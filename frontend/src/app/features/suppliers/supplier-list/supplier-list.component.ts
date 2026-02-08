import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';
import { AuthService } from '../../../core/services/auth.service';
import { Supplier } from '../../../core/models';

@Component({
  selector: 'app-supplier-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  loading = true;
  showForm = false;
  editingSupplier: Supplier = { name: '', contact_name: '', email: '', phone: '', address: '' };
  isEditing = false;

  constructor(
    private supplierService: SupplierService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  newSupplier(): void {
    this.editingSupplier = { name: '', contact_name: '', email: '', phone: '', address: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editSupplier(supplier: Supplier): void {
    this.editingSupplier = { ...supplier };
    this.isEditing = true;
    this.showForm = true;
  }

  saveSupplier(): void {
    if (this.isEditing && this.editingSupplier.id) {
      this.supplierService.updateSupplier(this.editingSupplier.id, this.editingSupplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.cancelForm();
        },
        error: (error) => console.error('Error:', error)
      });
    } else {
      this.supplierService.createSupplier(this.editingSupplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.cancelForm();
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  deleteSupplier(id: number): void {
    if (confirm('¿Eliminar este proveedor?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.loadSuppliers(),
        error: (error) => alert('Error al eliminar')
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingSupplier = { name: '', contact_name: '', email: '', phone: '', address: '' };
  }

  logout(): void {
    this.authService.logout();
  }
}
