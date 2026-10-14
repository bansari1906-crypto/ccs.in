"""
URL configuration for chitra_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .sitemaps import (
    StaticViewSitemap,
    ProductSitemap,
    CategorySitemap,
    BlogPostSitemap,
)

sitemaps = {
    'static': StaticViewSitemap,
    'products': ProductSitemap,
    'categories': CategorySitemap,
    'blog': BlogPostSitemap,
}


def home(request):
    return JsonResponse({
        'message': 'Chitra Crop Science API',
        'version': '1.0.0',
        'status': 'online'
    })


urlpatterns = [
    path('', home, name='home'),
    path('about/', home, name='about'),
    path('products/', home, name='products'),
    path('blog/', home, name='blog'),
    path('gallery/', home, name='gallery'),
    path('contact/', home, name='contact'),
    path('testimonials/', home, name='testimonials'),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('accounts.urls')),
    path('api/', include('products.urls')),
    path('api/', include('leads.urls')),
    path('api/', include('customers.urls')),
    path('api/', include('blog.urls')),
    path('api/', include('gallery.urls')),
    path('api/', include('testimonials.urls')),
    path('api/', include('settings_app.urls')),
    path('api/admin/', include('analytics_app.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
