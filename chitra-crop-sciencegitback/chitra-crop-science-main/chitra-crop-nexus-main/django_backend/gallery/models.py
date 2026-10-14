from django.db import models
import os
from django.conf import settings
from utils import compress_image

class GalleryItem(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.FileField(upload_to='gallery/')
    category = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Gallery Image {self.id}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            image_path = os.path.join(settings.MEDIA_ROOT, self.image.name)
            compress_image(image_path)
