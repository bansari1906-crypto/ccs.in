
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()

from products.models import Product
from django.core.files import File

# Get all product images in media/products
media_products_dir = os.path.join(os.path.dirname(__file__), 'media', 'products')
if not os.path.exists(media_products_dir):
    print(f"Directory not found: {media_products_dir}")
else:
    image_files = {f.lower(): f for f in os.listdir(media_products_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))}
    
    products = Product.objects.all()
    updated_count = 0
    
    for product in products:
        # Normalize product name to match image filename
        product_name_lower = product.name.lower().replace(' ', '_').replace('-', '_')
        
        # Try to find matching image
        matched_image = None
        for img_name_lower, img_name_original in image_files.items():
            img_base = os.path.splitext(img_name_lower)[0].replace(' ', '_').replace('-', '_')
            if img_base in product_name_lower or product_name_lower in img_base:
                matched_image = img_name_original
                break
        
        if matched_image:
            img_path = os.path.join(media_products_dir, matched_image)
            if os.path.exists(img_path):
                with open(img_path, 'rb') as f:
                    django_file = File(f)
                    product.image.save(matched_image, django_file, save=True)
                    updated_count += 1
                    print(f"Updated {product.name} -> {matched_image}")
    
    print(f"\nTotal products updated: {updated_count}")
    print("Product images update complete!")

