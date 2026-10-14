from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Testimonial
from .serializers import TestimonialSerializer

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return Testimonial.objects.all().order_by('-created_at')
        return Testimonial.objects.filter(is_visible=True).order_by('-created_at')
