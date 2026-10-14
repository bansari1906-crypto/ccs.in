import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()
from products.models import Product, Category
import json

print("=== PRODUCTS IN DATABASE ===")
products = Product.objects.all()
print(f"Total products: {products.count()}")
for p in products:
    print(f"- {p.name} (slug: {p.slug}, category: {p.category}, active: {p.is_active})")

print("\n=== CATEGORIES IN DATABASE ===")
categories = Category.objects.all()
print(f"Total categories: {categories.count()}")
for c in categories:
    print(f"- {c.name} (slug: {c.slug}, status: {c.status})")
