
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()

from blog.models import BlogPost
from gallery.models import GalleryItem

# First, let's add more gallery items with topic-matching captions
gallery_dir = os.path.join(os.path.dirname(__file__), 'media', 'gallery')
gallery_images = [f for f in os.listdir(gallery_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]

# Now, map each blog to a specific gallery image based on topic
blog_image_map = {
    "how-to-increase-plant-growth-naturally": "WhatsApp_Image_2026-04-26_at_17.13.33.jpeg",
    "best-pesticide-for-whitefly-control-in-cotton": "WhatsApp_Image_2026-04-26_at_17.13.34.jpeg",
    "how-to-increase-crop-yield-in-gujarat-rajasthan": "2026-02-06.jpg",
    "best-fertilizer-for-vegetables-and-fruit-crops": "WhatsApp_Image_2026-04-26_at_17.13.57.jpeg"
}

# Update each blog post
for slug, img_filename in blog_image_map.items():
    try:
        post = BlogPost.objects.get(slug=slug)
        img_path = os.path.join(gallery_dir, img_filename)
        
        if os.path.exists(img_path):
            from django.core.files import File
            with open(img_path, 'rb') as f:
                django_file = File(f)
                post.featured_image.save(img_filename, django_file, save=True)
                print(f"Updated {post.title} -> {img_filename}")
    except BlogPost.DoesNotExist:
        print(f"Blog not found: {slug}")

print("Blog images update complete!")

