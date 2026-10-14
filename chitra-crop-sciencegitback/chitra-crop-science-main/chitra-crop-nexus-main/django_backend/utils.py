from PIL import Image
import os
from django.conf import settings


def compress_image(image_path, quality=85, max_width=1920, max_height=1080):
    """
    Compress an image file to reduce file size while maintaining quality.
    """
    try:
        img = Image.open(image_path)
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Resize if larger than max dimensions
        original_width, original_height = img.size
        if original_width > max_width or original_height > max_height:
            ratio = min(max_width / original_width, max_height / original_height)
            new_width = int(original_width * ratio)
            new_height = int(original_height * ratio)
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save compressed image
        img.save(image_path, optimize=True, quality=quality)
        return True
    except Exception as e:
        print(f"Error compressing image: {e}")
        return False
