from django.db import models

class Supplier(models.Model):
    name = models.CharField(max_length=200, verbose_name='nombre')
    contact_name = models.CharField(max_length=100, verbose_name='nombre de contacto')
    email = models.EmailField(verbose_name='correo electrónico')
    phone = models.CharField(max_length=20, verbose_name='teléfono')
    address = models.TextField(verbose_name='dirección')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='actualizado el')
    
    class Meta:
        db_table = 'suppliers'
    
    def __str__(self):
        return self.name