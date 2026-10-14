
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()

from gallery.models import GalleryItem
from django.core.files import File

source_dir = r"c:\Users\bansa\Desktop\images vedios of chitracrop"

if not os.path.exists(source_dir):
    print(f"Source directory does not exist: {source_dir}")
else:
    image_files = [f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
    
    for filename in image_files:
        file_path = os.path.join(source_dir, filename)
        title = os.path.splitext(filename)[0].replace("-", " ").replace("_", " ").title()
        
        existing = GalleryItem.objects.filter(title=title).first()
        if not existing:
            with open(file_path, 'rb') as f:
                django_file = File(f)
                gallery_item = GalleryItem.objects.create(
                    title=title,
                    category="Agriculture"
                )
                gallery_item.image.save(filename, django_file, save=True)
                print(f"Created gallery item: {title}")
        else:
            print(f"Gallery item already exists: {title}")

print("Gallery population complete!")

