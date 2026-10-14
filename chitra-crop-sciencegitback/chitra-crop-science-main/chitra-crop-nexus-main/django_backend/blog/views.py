from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return BlogPost.objects.all().order_by('-created_at')
        return BlogPost.objects.filter(is_published=True).order_by('-created_at')
