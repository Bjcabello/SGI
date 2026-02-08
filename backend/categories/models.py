from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='nombre')
    description = models.TextField(blank=True, verbose_name='descripción')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='actualizado el')
    
    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'Categorías'
    
    def __str__(self):
        return self.name