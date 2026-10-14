
import json
import csv
from pathlib import Path

BASE_DIR = Path(r"c:\Users\bansa\Downloads\chitracropscience.in")

# Extract from Database
print("=== Extracting from Database ===")
db_csv = BASE_DIR / "audit_output" / "fullstack_products_product.csv"
db_products = []
with open(db_csv, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        db_products.append(row["name"].strip().upper())
print(f"Database products: {len(db_products)}")
with open(BASE_DIR / "PRODUCTS_IN_DATABASE.md", "w", encoding='utf-8') as f:
    f.write("# PRODUCTS IN DATABASE\n\n")
    f.write(f"Total: {len(db_products)}\n\n")
    for i, product in enumerate(db_products, 1):
        f.write(f"{i}. {product}\n")

# Extract from Frontend JSON
print("\n=== Extracting from Frontend JSON ===")
json1 = BASE_DIR / "chitra-crop-sciencegitback" / "chitra-crop-science-main" / "chitra-crop-nexus-main" / "src" / "data" / "product-catalog.json"
json2 = BASE_DIR / "chitra-crop-sciencegitback" / "chitra-crop-science-main" / "chitra-crop-nexus-main" / "src" / "data" / "official-product-catalog.json"
json_products = []
for json_file in [json1, json2]:
    if json_file.exists():
        with open(json_file, encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                json_products.append(item["name"].strip().upper())
json_products = list(set(json_products))
json_products.sort()
print(f"Frontend JSON products: {len(json_products)}")
with open(BASE_DIR / "PRODUCTS_IN_FRONTEND_JSON.md", "w", encoding='utf-8') as f:
    f.write("# PRODUCTS IN FRONTEND JSON\n\n")
    f.write(f"Total: {len(json_products)}\n\n")
    for i, product in enumerate(json_products, 1):
        f.write(f"{i}. {product}\n")

# Extract from Live Site (we collected earlier from WebFetch)
print("\n=== Extracting from Live Site ===")
live_products = [
    "ACTIVE 100", "AGNEEPATH GR", "AGNEEPATH SC", "AMITRA 80", "ATTACK-20",
    "ATTACK-505", "BENZO KILL", "BENZO FIRE", "BHISMA GOLD", "C-IMIDA SUPER",
    "C-IMIDA", "CCS-303", "CCS-CARB ULTRA", "CCS-CARB", "CCS-NEEM100",
    "CHITARA", "CHITGOR", "CHIT-OXY", "CHITRA 888", "CHITRA AMS", "CHITRA B",
    "CHITRA CA", "CHITRA CAL-11", "CHITRA CALBO", "CHITRA CBZ", "CHITRA CN",
    "CHITRA FE", "CHITRA GOLD", "CHITRA M-45", "CHITRA MAP", "CHITRA MAX",
    "CHITRA MEG", "CHITRA MKP", "CHITRA NK", "CHITRA NKP", "CHITRA NOP",
    "CHITRA NP", "CHITRA NP LIQUID", "CHITRA NPK 13:40:13", "CHITRA NPK 19:19:19",
    "CHITRA PKA", "CHITRA SONITE", "CHITRA SOP", "CHITRA ZIB", "CHITRA ZINCOOX",
    "CHITRA ZINK", "CHITRA ZN", "CHITRA-COC", "CHITRAZINE", "CRAGIBB", "CRETA SUPER"
]
live_products = [p.strip().upper() for p in live_products]
print(f"Live site products: {len(live_products)}")
with open(BASE_DIR / "PRODUCTS_ON_LIVE_SITE.md", "w", encoding='utf-8') as f:
    f.write("# PRODUCTS ON LIVE SITE\n\n")
    f.write(f"Total: {len(live_products)}\n\n")
    for i, product in enumerate(live_products, 1):
        f.write(f"{i}. {product}\n")

# Compare
print("\n=== COMPARISON ===")
db_set = set(db_products)
json_set = set(json_products)
live_set = set(live_products)

print(f"\nMissing in Database: {json_set - db_set}")
print(f"Missing in Frontend JSON: {db_set - json_set}")
print(f"Missing on Live Site: {db_set - live_set}")

with open(BASE_DIR / "PRODUCTS_COMPARISON.md", "w", encoding='utf-8') as f:
    f.write("# PRODUCTS COMPARISON\n\n")
    f.write("## Missing in Database\n")
    for p in sorted(list(json_set - db_set)):
        f.write(f"- {p}\n")
    f.write("\n## Missing in Frontend JSON\n")
    for p in sorted(list(db_set - json_set)):
        f.write(f"- {p}\n")
    f.write("\n## Missing on Live Site\n")
    for p in sorted(list(db_set - live_set)):
        f.write(f"- {p}\n")

print("Done!")
