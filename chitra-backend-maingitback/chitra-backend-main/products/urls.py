from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, ProductImageViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'product-images', ProductImageViewSet, basename='product-images')

urlpatterns = [
    path('', include(router.urls)),
]
