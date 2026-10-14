from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SiteSettingsViewSet

router = DefaultRouter()
router.register(r'settings', SiteSettingsViewSet, basename='settings')

urlpatterns = [
    path('', include(router.urls)),
]
