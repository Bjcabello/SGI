import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth.service';
import { Category } from '../../../core/models';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingCategory: Category = { name: '', description: '' };
  isEditing = false;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  newCategory(): void {
    this.editingCategory = { name: '', description: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editCategory(category: Category): void {
    this.editingCategory = { ...category };
    this.isEditing = true;
    this.showForm = true;
  }

  saveCategory(): void {
    if (this.isEditing && this.editingCategory.id) {
      this.categoryService.updateCategory(this.editingCategory.id, this.editingCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.cancelForm();
        },
        error: (error) => console.error('Error:', error)
      });
    } else {
      this.categoryService.createCategory(this.editingCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.cancelForm();
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  deleteCategory(id: number): void {
    if (confirm('¿Eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (error) => alert('Error al eliminar')
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingCategory = { name: '', description: '' };
  }

  logout(): void {
    this.authService.logout();
  }
}
