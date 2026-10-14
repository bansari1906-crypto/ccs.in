from django.db import models
import os
from django.conf import settings
from utils import compress_image

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to='categories/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')], default='active')

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    short_description = models.TextField(blank=True, null=True)
    full_description = models.TextField(blank=True, null=True)
    composition = models.TextField(blank=True, null=True)
    benefits = models.TextField(blank=True, null=True)
    usage_instructions = models.TextField(blank=True, null=True)
    target_crops = models.TextField(blank=True, null=True)
    packaging_sizes = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='products/', blank=True, null=True)
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            image_path = os.path.join(settings.MEDIA_ROOT, self.image.name)
            compress_image(image_path)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.FileField(upload_to='products/gallery/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            image_path = os.path.join(settings.MEDIA_ROOT, self.image.name)
            compress_image(image_path)
