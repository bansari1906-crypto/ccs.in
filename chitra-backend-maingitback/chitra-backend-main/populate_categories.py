import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()
from products.models import Category

categories = [
    ("Insecticide", "insecticide", "Premium insecticides for effective pest control"),
    ("Fungicide", "fungicide", "Advanced fungicides to protect crops from diseases"),
    ("Herbicide", "herbicide", "Selective herbicides for weed management"),
    ("Fertilizer", "fertilizer", "Nutrient-rich fertilizers for healthy crop growth"),
    ("PGR", "pgr", "Plant Growth Regulators for better yield and quality"),
    ("Bio Products", "bio-products", "Organic and biological products for sustainable farming"),
    ("Adjuvant / Spreader", "adjuvant-spreader", "High-quality adjuvants and spreaders"),
]

for name, slug, description in categories:
    cat, created = Category.objects.get_or_create(
        name=name,
        defaults={
            'slug': slug,
            'description': description,
            'status': 'active'
        }
    )
    if created:
        print(f"Created category: {name}")
    else:
        print(f"Category already exists: {name}")

print("Categories populated successfully!")
