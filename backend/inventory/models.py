from django.db import models
from categories.models import Category
from suppliers.models import Supplier

class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='nombre')
    description = models.TextField(verbose_name='descripción')
    sku = models.CharField(max_length=50, unique=True, verbose_name='SKU')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='categoría')
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, verbose_name='proveedor')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='precio')
    quantity = models.IntegerField(default=0, verbose_name='cantidad')
    min_stock = models.IntegerField(default=10, verbose_name='stock mínimo')
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name='imagen')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='actualizado el')
    
    class Meta:
        db_table = 'products'
    
    def __str__(self):
        return self.name

class StockMovement(models.Model):
    MOVEMENT_TYPES = [
        ('IN', 'Entrada'),
        ('OUT', 'Salida'),
        ('ADJ', 'Ajuste'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='producto')
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_TYPES, verbose_name='tipo de movimiento')
    quantity = models.IntegerField(verbose_name='cantidad')
    notes = models.TextField(blank=True, verbose_name='notas')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='creado el')
    created_by = models.ForeignKey('users.User', on_delete=models.PROTECT, verbose_name='creado por')
    
    class Meta:
        db_table = 'stock_movements'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.movement_type} - {self.product.name} - {self.quantity}"