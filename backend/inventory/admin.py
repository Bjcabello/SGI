from django.contrib import admin
from .models import Product, StockMovement

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'category', 'supplier', 'price', 'quantity', 'min_stock']
    list_filter = ['category', 'supplier']
    search_fields = ['name', 'sku']

@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ['product', 'movement_type', 'quantity', 'created_by', 'created_at']
    list_filter = ['movement_type', 'created_at']