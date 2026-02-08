from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from categories.views import CategoryViewSet
from suppliers.views import SupplierViewSet
from inventory.views import ProductViewSet, StockMovementViewSet


router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('suppliers', SupplierViewSet)
router.register('products', ProductViewSet)
router.register('stock-movements', StockMovementViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
