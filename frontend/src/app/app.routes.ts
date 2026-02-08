import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/new',
    loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/category-list/category-list.component').then(m => m.CategoryListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./features/suppliers/supplier-list/supplier-list.component').then(m => m.SupplierListComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/auth/login' }
];
