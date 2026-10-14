import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()
from products.models import Product
from products.serializers import ProductSerializer
import json

print("=== CHECKING PRODUCT SERIALIZER OUTPUT ===")
products = Product.objects.all()[:3]
for product in products:
    serializer = ProductSerializer(product)
    print(json.dumps(serializer.data, indent=2))
    print("-" * 80)
