import os
import shutil
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()
from products.models import Category, Product
from django.conf import settings

SOURCE_IMAGES_DIR = r'c:\Users\bansa\Desktop\iamges product'
MEDIA_PRODUCTS_DIR = os.path.join(settings.MEDIA_ROOT, 'products')
os.makedirs(MEDIA_PRODUCTS_DIR, exist_ok=True)

# First, get or create all required categories
categories_data = [
    ("Insecticide", "insecticide", "Premium insecticides for effective pest control"),
    ("Fungicide", "fungicide", "Advanced fungicides to protect crops from diseases"),
    ("Herbicide", "herbicide", "Selective herbicides for weed management"),
    ("Fertilizer", "fertilizer", "Nutrient-rich fertilizers for healthy crop growth"),
    ("Water Soluble Fertilizer", "water-soluble-fertilizer", "100% water soluble fertilizers"),
    ("Liquid Fertilizer", "liquid-fertilizer", "Liquid fertilizers for quick nutrient absorption"),
    ("PGR", "pgr", "Plant Growth Regulators for better yield and quality"),
    ("Bio Products", "bio-products", "Organic and biological products for sustainable farming"),
    ("Adjuvant / Spreader", "adjuvant-spreader", "High-quality adjuvants and spreaders"),
    ("Bio Stimulant", "bio-stimulant", "Bio stimulants to enhance plant growth and stress tolerance"),
    ("Humic Acid", "humic-acid", "Humic acid products for soil health"),
    ("Amino Acid", "amino-acid", "Amino acid based products"),
]

category_map = {}
for name, slug, desc in categories_data:
    cat, created = Category.objects.get_or_create(
        name=name,
        defaults={
            'slug': slug,
            'description': desc,
            'status': 'active'
        }
    )
    category_map[name] = cat
    if created:
        print(f"Created category: {name}")

# Define product data with real information
products_data = [
    # --- Insecticides ---
    {
        'name': 'ACTIVE 100',
        'slug': 'active-100',
        'category_name': 'Insecticide',
        'composition': 'Contact us for complete technical details.',
        'short_description': 'Effective insecticide for crop protection',
        'full_description': 'ACTIVE 100 is a reliable insecticide for protecting crops against various pests.',
        'benefits': 'Effective pest control\nCrop safety',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'active 100.jpeg',
        'meta_title': 'ACTIVE 100 Insecticide | Chitra Crop Science',
        'meta_description': 'ACTIVE 100 insecticide for effective crop pest control.',
    },
    {
        'name': 'AGNEEPATH GR',
        'slug': 'agneepath-gr',
        'category_name': 'Insecticide',
        'composition': 'Fipronil',
        'short_description': 'AGNEEPATH GR - Granular insecticide',
        'full_description': 'AGNEEPATH GR is a granular insecticide for effective pest control.',
        'benefits': 'Granular formulation\nLong lasting effect',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'agneepath gr.jpeg',
        'meta_title': 'AGNEEPATH GR Insecticide | Chitra Crop Science',
        'meta_description': 'AGNEEPATH GR granular insecticide for crop protection.',
    },
    {
        'name': 'AGNEEPATH SC',
        'slug': 'agneepath-sc',
        'category_name': 'Insecticide',
        'composition': 'Fipronil 5% SC',
        'short_description': 'AGNEEPATH SC - Fipronil 5% SC systemic insecticide',
        'full_description': 'AGNEEPATH SC is a systemic insecticide containing Fipronil 5% SC.',
        'benefits': 'Systemic action\nEffective against various pests',
        'target_crops': 'Cotton, Rice, Vegetables',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'agneepath sc.jpeg',
        'meta_title': 'AGNEEPATH SC - Fipronil 5% SC | Chitra Crop Science',
        'meta_description': 'AGNEEPATH SC with Fipronil 5% SC for systemic insect control.',
    },
    {
        'name': 'AMITRA 80',
        'slug': 'amitra-80',
        'category_name': 'Amino Acid',
        'composition': 'Amino Acid 80% Powder',
        'short_description': 'AMITRA 80 - Amino Acid 80% Powder',
        'full_description': 'AMITRA 80 is an amino acid based product containing 80% amino acid powder.',
        'benefits': 'Improves plant growth\nEnhances nutrient uptake',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'amitra 80.jpeg',
        'meta_title': 'AMITRA 80 - Amino Acid 80% Powder | Chitra Crop Science',
        'meta_description': 'AMITRA 80 amino acid 80% powder for plant growth.',
    },
    {
        'name': 'ATTACK-20',
        'slug': 'attack-20',
        'category_name': 'Insecticide',
        'composition': 'Contact us for complete technical details.',
        'short_description': 'ATTACK-20 insecticide for pest control',
        'full_description': 'ATTACK-20 is an insecticide for effective pest management.',
        'benefits': 'Effective pest control',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'attack-20.jpeg',
        'meta_title': 'ATTACK-20 Insecticide | Chitra Crop Science',
        'meta_description': 'ATTACK-20 insecticide for crop pest control.',
    },
    {
        'name': 'ATTACK-505',
        'slug': 'attack-505',
        'category_name': 'Insecticide',
        'composition': 'Chlorpyriphos 50% + Cypermethrin 5% EC',
        'short_description': 'ATTACK-505 - Chlorpyriphos 50% + Cypermethrin 5% EC',
        'full_description': 'ATTACK-505 is a combination insecticide containing Chlorpyriphos 50% + Cypermethrin 5% EC.',
        'benefits': 'Broad spectrum control\nContact and stomach action',
        'target_crops': 'Cotton, Vegetables, Pulses',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'attack-505.jpeg',
        'meta_title': 'ATTACK-505 Insecticide | Chitra Crop Science',
        'meta_description': 'ATTACK-505 with Chlorpyriphos 50% + Cypermethrin 5% EC.',
    },
    {
        'name': 'BENZO KILL',
        'slug': 'benzo-kill',
        'category_name': 'Insecticide',
        'composition': 'Emamectin Benzoate 5% SG',
        'short_description': 'BENZO KILL - Emamectin Benzoate 5% SG',
        'full_description': 'BENZO KILL is an insecticide containing Emamectin Benzoate 5% SG.',
        'benefits': 'Effective against caterpillars',
        'target_crops': 'Cotton, Vegetables',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'benzo kill.jpeg',
        'meta_title': 'BENZO KILL - Emamectin Benzoate 5% SG | Chitra Crop Science',
        'meta_description': 'BENZO KILL with Emamectin Benzoate 5% SG.',
    },
    {
        'name': 'BENZO FIRE',
        'slug': 'benzo-fire',
        'category_name': 'Insecticide',
        'composition': 'Emamectin Benzoate 1.9% EC',
        'short_description': 'BENZO FIRE - Emamectin Benzoate 1.9% EC',
        'full_description': 'BENZO FIRE is an insecticide containing Emamectin Benzoate 1.9% EC.',
        'benefits': 'Effective against Lepidopteran pests',
        'target_crops': 'Cotton, Vegetables, Pulses',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'benzofire.jpeg',
        'meta_title': 'BENZO FIRE - Emamectin Benzoate 1.9% EC | Chitra Crop Science',
        'meta_description': 'BENZO FIRE with Emamectin Benzoate 1.9% EC.',
    },
    {
        'name': 'BHISMA GOLD',
        'slug': 'bhisma-gold',
        'category_name': 'Insecticide',
        'composition': 'Profenophos 50% EC',
        'short_description': 'BHISMA GOLD - Profenophos 50% EC',
        'full_description': 'BHISMA GOLD is an insecticide containing Profenophos 50% EC.',
        'benefits': 'Broad spectrum insecticide',
        'target_crops': 'Cotton, Vegetables',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'bhisma gold.jpeg',
        'meta_title': 'BHISMA GOLD - Profenophos 50% EC | Chitra Crop Science',
        'meta_description': 'BHISMA GOLD with Profenophos 50% EC.',
    },
    {
        'name': 'C-IMIDA SUPER',
        'slug': 'c-imida-super',
        'category_name': 'Insecticide',
        'composition': 'Imidacloprid 30.5% SC',
        'short_description': 'C-IMIDA SUPER - Imidacloprid 30.5% SC systemic insecticide',
        'full_description': 'C-IMIDA SUPER is a systemic insecticide containing Imidacloprid 30.5% SC.',
        'benefits': 'Systemic action\nLong lasting control',
        'target_crops': 'Cotton, Rice, Vegetables, Fruits',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'c imida super.jpeg',
        'meta_title': 'C-IMIDA SUPER - Imidacloprid 30.5% SC | Chitra Crop Science',
        'meta_description': 'C-IMIDA SUPER with Imidacloprid 30.5% SC.',
    },
    {
        'name': 'C-IMIDA',
        'slug': 'c-imida',
        'category_name': 'Insecticide',
        'composition': 'Imidacloprid 17.8% SL',
        'short_description': 'C-IMIDA - Imidacloprid 17.8% SL systemic insecticide',
        'full_description': 'C-IMIDA is a systemic insecticide containing Imidacloprid 17.8% SL.',
        'benefits': 'Systemic action\nEffective against sucking pests',
        'target_crops': 'Cotton, Rice, Vegetables',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'c-imida.jpeg',
        'meta_title': 'C-IMIDA - Imidacloprid 17.8% SL | Chitra Crop Science',
        'meta_description': 'C-IMIDA with Imidacloprid 17.8% SL.',
    },
    {
        'name': 'CCS-303',
        'slug': 'ccs-303',
        'category_name': 'Bio Products',
        'composition': 'Contact us for complete technical details.',
        'short_description': 'CCS-303 organic growth promoter',
        'full_description': 'CCS-303 is an organic growth promoter for sustainable agriculture.',
        'benefits': 'Organic and safe\nPromotes plant growth',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'ccs 303.jpeg',
        'meta_title': 'CCS-303 - Organic Growth Promoter | Chitra Crop Science',
        'meta_description': 'CCS-303 organic growth promoter.',
    },
    {
        'name': 'CCS-CARB ULTRA',
        'slug': 'ccs-carb-ultra',
        'category_name': 'Bio Stimulant',
        'composition': 'Contact us for complete technical details.',
        'short_description': 'CCS-CARB ULTRA - Plant Immunity Booster Bio Stimulant',
        'full_description': 'CCS-CARB ULTRA is a plant immunity booster bio stimulant.',
        'benefits': 'Enhances plant immunity\nImproves stress tolerance',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'ccs carb ultra.jpeg',
        'meta_title': 'CCS-CARB ULTRA Bio Stimulant | Chitra Crop Science',
        'meta_description': 'CCS-CARB ULTRA plant immunity booster.',
    },
    {
        'name': 'CCS-CARB',
        'slug': 'ccs-carb',
        'category_name': 'Bio Stimulant',
        'composition': 'Contact us for complete technical details.',
        'short_description': 'CCS-CARB bio stimulant',
        'full_description': 'CCS-CARB is a bio stimulant for better crop health.',
        'benefits': 'Improves crop health',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'ccs carb.jpeg',
        'meta_title': 'CCS-CARB Bio Stimulant | Chitra Crop Science',
        'meta_description': 'CCS-CARB bio stimulant.',
    },
    {
        'name': 'CCS-NEEM100',
        'slug': 'ccs-neem100',
        'category_name': 'Insecticide',
        'composition': 'Azadirachtin 1% (10000 ppm)',
        'short_description': 'CCS-NEEM100 - Neem based insecticide',
        'full_description': 'CCS-NEEM100 is a natural neem-based insecticide.',
        'benefits': 'Natural and organic',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'ccs neem100.jpeg',
        'meta_title': 'CCS-NEEM100 - Neem Insecticide | Chitra Crop Science',
        'meta_description': 'CCS-NEEM100 neem based insecticide.',
    },
    {
        'name': 'CHITARA',
        'slug': 'chitara',
        'category_name': 'Insecticide',
        'composition': 'Thiamethoxam 25% WG',
        'short_description': 'CHITARA - Thiamethoxam 25% WG systemic insecticide',
        'full_description': 'CHITARA is a systemic insecticide containing Thiamethoxam 25% WG.',
        'benefits': 'Systemic action\nQuick knockdown',
        'target_crops': 'Cotton, Rice, Vegetables, Fruits',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'chitara.jpeg',
        'meta_title': 'CHITARA - Thiamethoxam 25% WG | Chitra Crop Science',
        'meta_description': 'CHITARA with Thiamethoxam 25% WG.',
    },
    {
        'name': 'CHITGOR',
        'slug': 'chitgor',
        'category_name': 'Insecticide',
        'composition': 'Dimethoate 30% EC',
        'short_description': 'CHITGOR - Dimethoate 30% EC broad spectrum insecticide',
        'full_description': 'CHITGOR is a broad spectrum insecticide containing Dimethoate 30% EC.',
        'benefits': 'Broad spectrum control',
        'target_crops': 'Cotton, Vegetables, Fruits, Cereals',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'chitgor.jpeg',
        'meta_title': 'CHITGOR - Dimethoate 30% EC | Chitra Crop Science',
        'meta_description': 'CHITGOR with Dimethoate 30% EC.',
    },
    {
        'name': 'CHIT-OXY',
        'slug': 'chit-oxy',
        'category_name': 'Herbicide',
        'composition': 'Oxyfluorfen 23.5% EC',
        'short_description': 'CHIT-OXY - Oxyfluorfen 23.5% EC selective herbicide',
        'full_description': 'CHIT-OXY is a selective herbicide containing Oxyfluorfen 23.5% EC.',
        'benefits': 'Selective weed control',
        'target_crops': 'Cotton, Soybean, Pulses, Vegetables',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'chitra - oxy.jpeg',
        'meta_title': 'CHIT-OXY - Oxyfluorfen 23.5% EC Herbicide | Chitra Crop Science',
        'meta_description': 'CHIT-OXY with Oxyfluorfen 23.5% EC.',
    },
    {
        'name': 'CHITRA 888',
        'slug': 'chitra-888',
        'category_name': 'Liquid Fertilizer',
        'composition': 'NPK 8-8-8 Liquid',
        'short_description': 'CHITRA 888 - NPK 8-8-8 Liquid Fertilizer',
        'full_description': 'CHITRA 888 is a liquid fertilizer containing NPK 8-8-8.',
        'benefits': 'Balanced nutrition\nQuick absorption',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'chitra 888.jpeg',
        'meta_title': 'CHITRA 888 - NPK 8-8-8 Liquid Fertilizer | Chitra Crop Science',
        'meta_description': 'CHITRA 888 liquid fertilizer NPK 8-8-8.',
    },
    {
        'name': 'CHITRA AMS',
        'slug': 'chitra-ams',
        'category_name': 'Fertilizer',
        'composition': 'Ammonium Sulphate',
        'short_description': 'CHITRA AMS - Ammonium Sulphate Fertilizer',
        'full_description': 'CHITRA AMS is Ammonium Sulphate fertilizer.',
        'benefits': 'Provides nitrogen and sulphur',
        'target_crops': 'All crops',
        'usage': 'Contact us for complete details.',
        'packaging': 'Contact us for packaging sizes',
        'image_filename': 'chitra ams.jpeg',
        'meta_title': 'CHITRA AMS - Ammonium Sulphate | Chitra Crop Science',
        'meta_description': 'CHITRA AMS ammonium sulphate fertilizer.',
    },
]

# Add products to database
for product_data in products_data:
    try:
        # Get category
        category = category_map.get(product_data['category_name'])
        if not category:
            print(f"Category not found: {product_data['category_name']}")
            continue
        
        # Copy image file
        image_src_path = os.path.join(SOURCE_IMAGES_DIR, product_data['image_filename'])
        product_image = None
        if os.path.exists(image_src_path):
            image_dest_filename = product_data['image_filename'].replace(' ', '_')
            image_dest_path = os.path.join(MEDIA_PRODUCTS_DIR, image_dest_filename)
            shutil.copy2(image_src_path, image_dest_path)
            print(f"Copied image: {product_data['image_filename']}")
            product_image = f'products/{image_dest_filename}'
        else:
            print(f"Image not found: {product_data['image_filename']}")
        
        # Create or update product
        product, created = Product.objects.get_or_create(
            slug=product_data['slug'],
            defaults={
                'name': product_data['name'],
                'category': category,
                'short_description': product_data['short_description'],
                'full_description': product_data['full_description'],
                'composition': product_data['composition'],
                'benefits': product_data['benefits'],
                'target_crops': product_data['target_crops'],
                'usage_instructions': product_data['usage'],
                'packaging_sizes': product_data['packaging'],
                'image': product_image,
                'meta_title': product_data['meta_title'],
                'meta_description': product_data['meta_description'],
                'is_active': True,
                'is_featured': False,
            }
        )
        
        if created:
            print(f"Created product: {product_data['name']}")
        else:
            print(f"Product already exists: {product_data['name']}")
            
    except Exception as e:
        print(f"Error processing product {product_data['name']}: {e}")

print("\nProduct population complete!")
