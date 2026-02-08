import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { User, Product } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  lowStockProducts: Product[] = [];
  totalProducts = 0;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
      }
    });

    this.productService.getLowStock().subscribe({
      next: (products) => {
        this.lowStockProducts = products;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
