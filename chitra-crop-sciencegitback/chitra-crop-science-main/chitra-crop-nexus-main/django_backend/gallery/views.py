from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import GalleryItem
from .serializers import GalleryItemSerializer

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all().order_by('-created_at')
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
