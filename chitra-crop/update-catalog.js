
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'official-product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const userProducts = [
  {
    name: "AAKRAMAN",
    category: "INSECTICIDE",
    technicalName: "Chlorantraniliprole 9.3% + Lambda Cyhalothrin 4.6% ZC",
    type: "Systemic Insecticide",
    formulation: "ZC",
    targetPests: ["Caterpillars", "Borers", "Lepidopteran insects"],
    targetCrops: ["Cotton", "Paddy", "Chilli", "Vegetables"],
    features: ["Dual action insecticide", "Fast knockdown effect", "Long duration control"]
  },
  {
    name: "Abachit",
    category: "INSECTICIDE",
    technicalName: "Abamectin 1.9% EC",
    formulation: "EC",
    targetPests: ["Mites", "Thrips", "Leaf miners"],
    targetCrops: ["Chilli", "Cotton", "Tea", "Vegetables"],
    features: ["Translaminar activity", "Effective on sucking pests"]
  },
  {
    name: "ACTIVE 100",
    category: "PGR",
    technicalName: "Silicon Based Super Spreader",
    type: "Agricultural Adjuvant",
    features: ["Improves spray spreading", "Better absorption", "Rainfastness support"]
  },
  {
    name: "AGNEEPATH GR",
    category: "INSECTICIDE",
    technicalName: "Fipronil 0.3% GR",
    formulation: "Granules (GR)",
    targetPests: ["Stem borer", "Leaf folder"],
    targetCrops: ["Paddy", "Sugarcane"],
    features: ["Soil and root zone protection", "Long residual effect"]
  },
  {
    name: "AGNEEPATH SC",
    category: "INSECTICIDE",
    technicalName: "Fipronil 5% SC",
    formulation: "SC",
    type: "Systemic & Contact Insecticide",
    targetPests: ["Stem borer", "Thrips", "Termites"],
    targetCrops: ["Rice", "Sugarcane", "Vegetables"]
  },
  {
    name: "AMITRA 80",
    category: "PGR",
    technicalName: "Amino Acid 80% Powder",
    type: "Water Soluble",
    features: ["Improves plant growth", "Stress resistance", "Better flowering & fruiting"]
  },
  {
    name: "ATTACK-50",
    category: "INSECTICIDE",
    technicalName: "Chlorpyriphos 50% EC",
    formulation: "EC",
    targetPests: ["Termites", "Borers", "Soil insects"],
    targetCrops: ["Paddy", "Cotton", "Sugarcane"]
  },
  {
    name: "ATTACK-10 G",
    category: "INSECTICIDE",
    technicalName: "Chlorpyriphos 10% GR",
    formulation: "GR",
    targetPests: ["Soil insects", "Termites"],
    targetCrops: ["Groundnut", "Vegetables", "Sugarcane"]
  },
  {
    name: "ATTACK-505",
    category: "INSECTICIDE",
    technicalName: "Chlorpyriphos 50% + Cypermethrin 5% EC",
    formulation: "EC",
    features: ["Broad spectrum insect control", "Contact and stomach poison action"],
    targetCrops: ["Cotton", "Paddy", "Vegetables"]
  },
  {
    name: "Azotech",
    category: "FUNGICIDE",
    technicalName: "Azoxystrobin 23% SC",
    type: "Systemic Fungicide",
    formulation: "SC",
    targetDiseases: ["Powdery mildew", "Rust", "Blast"],
    targetCrops: ["Grapes", "Paddy", "Chilli"]
  },
  {
    name: "AZOTRI PLUS",
    category: "FUNGICIDE",
    technicalName: "Tricyclazole 20.4% + Azoxystrobin 6.8% SC",
    formulation: "SC",
    targetDiseases: ["Blast disease"],
    targetCrops: ["Paddy"]
  },
  {
    name: "AZTRIX",
    category: "FUNGICIDE",
    technicalName: "Azoxystrobin 16.7% + Tricyclazole 33.3% SC",
    formulation: "SC",
    targetDiseases: ["Blast", "Fungal diseases"],
    targetCrops: ["Paddy"]
  },
  {
    name: "BATALIYAN",
    category: "HERBICIDE",
    technicalName: "Mesotrione 2.27% + Atrazine 22.7% SC",
    type: "Selective Herbicide",
    targetCrops: ["Maize"],
    targetWeeds: ["Broadleaf & grassy weeds"]
  },
  {
    name: "BENZO KILL",
    category: "INSECTICIDE",
    technicalName: "Emamectin Benzoate 5% SG",
    formulation: "SG",
    targetPests: ["Bollworm", "Caterpillars"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"]
  },
  {
    name: "BENZO NIL",
    category: "INSECTICIDE",
    technicalName: "Emamectin Benzoate 1.5% + Fipronil 3.5% SC",
    formulation: "SC",
    features: ["Dual mode action", "Effective on chewing pests"],
    targetCrops: ["Cotton", "Chilli"]
  },
  {
    name: "BENZO FIRE",
    category: "INSECTICIDE",
    technicalName: "Emamectin Benzoate 1.9% EC",
    formulation: "EC",
    targetPests: ["Caterpillars", "Fruit borers"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"]
  },
  {
    name: "ATTACK-20",
    category: "INSECTICIDE",
    technicalName: "Chlorpyriphos 20% EC",
    formulation: "EC",
    type: "Contact & Stomach Insecticide",
    targetPests: ["Termites", "Bollworms", "Soil insects"],
    targetCrops: ["Cotton", "Paddy", "Sugarcane", "Vegetables"],
    features: ["Broad spectrum control", "Long residual action"]
  },
  {
    name: "BHAGAO",
    category: "HERBICIDE",
    technicalName: "Halosulfuron Methyl 75% WG",
    formulation: "WG",
    type: "Selective Herbicide",
    targetWeeds: ["Sedges and broadleaf weeds"],
    targetCrops: ["Maize", "Sugarcane"],
    features: ["Post-emergence herbicide", "Effective sedge control"]
  },
  {
    name: "BHISMA GOLD",
    category: "INSECTICIDE",
    technicalName: "Profenophos 50% EC",
    formulation: "EC",
    type: "Broad Spectrum Insecticide",
    targetPests: ["Bollworms", "Caterpillars", "Sucking pests"],
    targetCrops: ["Cotton", "Vegetables"],
    features: ["Fast action", "Effective on resistant pests"]
  },
  {
    name: "C-IMIDA SUPER",
    category: "INSECTICIDE",
    technicalName: "Imidacloprid 30.5% SC",
    formulation: "SC",
    type: "Systemic Insecticide",
    targetPests: ["Aphids", "Jassids", "Whiteflies", "Thrips"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    features: ["Long systemic protection", "Excellent sucking pest control"]
  },
  {
    name: "CAPHEXA",
    category: "FUNGICIDE",
    technicalName: "Captan 70% + Hexaconazole 5% WP",
    formulation: "WP",
    type: "Contact Fungicide",
    targetDiseases: ["Leaf spot", "Blight", "Powdery mildew"],
    targetCrops: ["Fruits", "Vegetables"],
    features: ["Dual mode disease control", "Preventive and curative action"]
  },
  {
    name: "CCS-303",
    category: "PGR",
    type: "Organic Plant Nutrient",
    features: ["Crop nutrition support", "Improves soil health", "Organic formulation"]
  },
  {
    name: "CCS-CARB ULTRA",
    category: "PGR",
    type: "Plant Immunity Booster",
    features: ["Enhances root growth", "Improves plant immunity", "Organic carbon support"]
  },
  {
    name: "CCS-CARB",
    category: "PGR",
    type: "Plant Immunity Booster",
    features: ["Root development", "Soil microbial activity support", "Crop stress tolerance"]
  },
  {
    name: "CCS-NEEM100",
    category: "Neem Based Bio Insecticide",
    technicalName: "Neem Seed Kernel Based EC containing Azadirachtin 1% (10000 ppm min.)",
    formulation: "EC",
    type: "Botanical Insecticide",
    targetPests: ["Aphids", "Whiteflies", "Caterpillars"],
    targetCrops: ["Vegetables", "Fruits", "Cotton"],
    features: ["Eco-friendly", "Organic pest management"]
  },
  {
    name: "CHIT FIGHTER",
    category: "INSECTICIDE",
    technicalName: "Chlorantraniliprole 0.4% GR",
    formulation: "GR",
    targetPests: ["Stem borer", "Leaf folder"],
    targetCrops: ["Paddy", "Sugarcane"],
    features: ["Granular insecticide", "Long residual control"]
  },
  {
    name: "CHIT PRIDE",
    category: "INSECTICIDE",
    technicalName: "Acetamiprid 20% SP",
    formulation: "SP",
    type: "Systemic Insecticide",
    targetPests: ["Whiteflies", "Aphids", "Jassids"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    features: ["Quick knockdown", "Effective sucking pest control"]
  },
  {
    name: "CHITARA GOLD",
    category: "INSECTICIDE",
    technicalName: "Thiamethoxam 75% SG",
    formulation: "SG",
    type: "Systemic Insecticide",
    targetPests: ["Aphids", "Whiteflies", "Thrips"],
    targetCrops: ["Cotton", "Paddy", "Vegetables"],
    features: ["Highly effective systemic action", "Long duration control"]
  },
  {
    name: "CHITARA",
    category: "INSECTICIDE",
    technicalName: "Thiamethoxam 25% WG",
    formulation: "WG",
    type: "Systemic Insecticide",
    targetPests: ["Sucking pests"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    features: ["Fast absorption", "Excellent pest control"]
  },
  {
    name: "CHITGIBB EZY",
    category: "PGR",
    technicalName: "Gibberellic Acid 40% WSG",
    formulation: "WSG",
    features: ["Promotes plant growth", "Improves flowering and fruit setting", "Enhances crop yield"]
  },
  {
    name: "CHITGOR",
    category: "INSECTICIDE",
    technicalName: "Dimethoate 30% EC",
    formulation: "EC",
    type: "Systemic Insecticide",
    targetPests: ["Aphids", "Thrips", "Jassids"],
    targetCrops: ["Cotton", "Vegetables"],
    features: ["Contact and systemic action", "Controls sucking pests"]
  },
  {
    name: "CHITHEXA GOLD",
    category: "FUNGICIDE",
    technicalName: "Hexaconazole 75% WG",
    formulation: "WG",
    type: "Systemic Fungicide",
    targetDiseases: ["Powdery mildew", "Rust"],
    targetCrops: ["Paddy", "Chilli", "Mango"],
    features: ["Strong fungal protection", "Long residual effect"]
  },
  {
    name: "CHIT HEXA",
    category: "FUNGICIDE",
    technicalName: "Hexaconazole 5% SC",
    formulation: "SC",
    type: "Systemic Fungicide",
    targetDiseases: ["Sheath blight", "Powdery mildew"],
    targetCrops: ["Paddy", "Groundnut", "Mango"],
    features: ["Preventive and curative action"]
  },
  {
    name: "CHITMIZA",
    category: "HERBICIDE",
    technicalName: "Imazethapyr 70% WG",
    formulation: "WG",
    type: "Selective Herbicide",
    targetWeeds: ["Broadleaf and grassy weeds"],
    targetCrops: ["Soybean", "Groundnut", "Pulses"],
    features: ["Early weed control", "Long residual activity"]
  }
];

// Update the catalog with user products
for (let i = 0; i < catalog.length; i++) {
  const product = catalog[i];
  const userProduct = userProducts.find(up => 
    up.name.toUpperCase() === product.name.toUpperCase()
  );
  
  if (userProduct) {
    // Update the product with user info
    if (userProduct.technicalName) product.technicalName = userProduct.technicalName;
    if (userProduct.category) product.category = userProduct.category;
    if (userProduct.formulation) product.formulation = userProduct.formulation;
    if (userProduct.type) product.type = userProduct.type;
    
    if (userProduct.targetPests && userProduct.targetPests.length > 0) {
      product.targetPests = userProduct.targetPests;
    }
    if (userProduct.targetDiseases && userProduct.targetDiseases.length > 0) {
      product.targetDiseases = userProduct.targetDiseases;
    }
    if (userProduct.targetWeeds && userProduct.targetWeeds.length > 0) {
      product.targetWeeds = userProduct.targetWeeds;
    }
    
    if (userProduct.targetCrops && userProduct.targetCrops.length > 0) {
      product.target_crops = userProduct.targetCrops;
    }
    
    if (userProduct.features && userProduct.features.length > 0) {
      product.key_benefits = userProduct.features;
    }
    
    console.log(`✅ Updated ${product.name}`);
  }
}

// Write the updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('\n🎉 Product catalog updated successfully!');
