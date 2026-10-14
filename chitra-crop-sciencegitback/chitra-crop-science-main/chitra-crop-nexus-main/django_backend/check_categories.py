
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()

from products.models import Product

categories = set()
for p in Product.objects.all():
    if p.category:
        categories.add(p.category)

print("Available Product Categories:")
for cat in sorted(categories):
    print(f"  - {cat}")
    print(f"    Normalized: {cat.lower().replace(' ', '-')}")

print(f"\nTotal unique categories: {len(categories)}")

