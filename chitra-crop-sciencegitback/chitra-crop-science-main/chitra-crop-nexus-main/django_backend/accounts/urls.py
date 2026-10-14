from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, login_view, current_user

router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('me/', current_user, name='current-user'),
]
