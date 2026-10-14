
import requests
import json

response = requests.get("http://127.0.0.1:8000/api/products/")
if response.status_code == 200:
    products = response.json()
    if isinstance(products, dict):
        products = products.get('results', [])
    categories = set()
    for p in products:
        if 'category_name' in p:
            categories.add(p['category_name'])
        elif 'category' in p:
            categories.add(p['category'])
    print("Product Categories from API:")
    for cat in sorted(categories):
        print(f"  - {cat}")
        print(f"    Normalized: {cat.lower().replace(' ', '-')}")

