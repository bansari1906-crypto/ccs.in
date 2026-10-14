
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'official-product-catalog.json');
let catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const allProductsFromImages = [
  {
    name: "AAKRAMAN",
    category: "Insecticide",
    technicalName: "Chlorantraniliprole 9.3% + Lambda Cyhalothrin 4.6% ZC",
    productType: "Systemic Insecticide",
    formulation: "ZC",
    targetPests: ["Caterpillars", "Borers", "Lepidopteran insects"],
    targetCrops: ["Cotton", "Paddy", "Chilli", "Vegetables"],
    keyBenefits: ["Dual action insecticide", "Fast knockdown effect", "Long duration control"],
    images: ["/assets/products/aakraman.jpeg"]
  },
  {
    name: "VITARA GOLD",
    category: "Fungicide",
    technicalName: "Metalaxyl 8% + Mancozeb 64% WP",
    productType: "Systemic and Contact Fungicide",
    formulation: "WP",
    images: ["/assets/products/vitara gold.jpeg"]
  },
  {
    name: "Abachit",
    category: "Insecticide",
    technicalName: "Abamectin 1.9% EC",
    formulation: "EC",
    targetPests: ["Mites", "Thrips", "Leaf miners"],
    targetCrops: ["Chilli", "Cotton", "Tea", "Vegetables"],
    keyBenefits: ["Translaminar activity", "Effective on sucking pests"],
    images: ["/assets/products/abachit.jpeg"]
  },
  {
    name: "Active 100",
    category: "Adjuvant / Spreader",
    technicalName: "Silicon Based Super Spreader",
    productType: "Agricultural Adjuvant",
    keyBenefits: ["Improves spray spreading", "Better absorption", "Rainfastness support"],
    images: ["/assets/products/active 100.jpeg"]
  },
  {
    name: "AGNEEPATH GR",
    category: "Insecticide",
    technicalName: "Fipronil 0.3% GR",
    formulation: "Granules (GR)",
    targetPests: ["Stem borer", "Leaf folder"],
    targetCrops: ["Paddy", "Sugarcane"],
    keyBenefits: ["Soil and root zone protection", "Long residual effect"],
    images: ["/assets/products/agneepath gr.jpeg"]
  },
  {
    name: "AGNEEPATH SC",
    category: "Insecticide",
    technicalName: "Fipronil 5% SC",
    formulation: "SC",
    productType: "Systemic & Contact Insecticide",
    targetPests: ["Stem borer", "Thrips", "Termites"],
    targetCrops: ["Rice", "Sugarcane", "Vegetables"],
    images: ["/assets/products/agneepath sc.jpeg"]
  },
  {
    name: "AMITRA 80",
    category: "Plant Growth / Nutrition",
    technicalName: "Amino Acid 80% Powder",
    productType: "Water Soluble",
    keyBenefits: ["Improves plant growth", "Stress resistance", "Better flowering & fruiting"],
    images: ["/assets/products/amitra 80.jpeg"]
  },
  {
    name: "Attack-50",
    category: "Insecticide",
    technicalName: "Chlorpyriphos 50% EC",
    formulation: "EC",
    targetPests: ["Termites", "Borers", "Soil insects"],
    targetCrops: ["Paddy", "Cotton", "Sugarcane"],
    images: ["/assets/products/attack - 50.jpeg"]
  },
  {
    name: "ATTACK-10 G",
    category: "Insecticide",
    technicalName: "Chlorpyriphos 10% GR",
    formulation: "GR",
    targetPests: ["Soil insects", "Termites"],
    targetCrops: ["Groundnut", "Vegetables", "Sugarcane"],
    images: ["/assets/products/attack -10 g.jpeg"]
  },
  {
    name: "ATTACK-20",
    category: "Insecticide",
    technicalName: "Chlorpyriphos 20% EC",
    formulation: "EC",
    productType: "Contact & Stomach Insecticide",
    targetPests: ["Termites", "Bollworms", "Soil insects"],
    targetCrops: ["Cotton", "Paddy", "Sugarcane", "Vegetables"],
    keyBenefits: ["Broad spectrum control", "Long residual action"],
    images: ["/assets/products/attack-20.jpeg"]
  },
  {
    name: "ATTACK-505",
    category: "Insecticide",
    technicalName: "Chlorpyriphos 50% + Cypermethrin 5% EC",
    formulation: "EC",
    keyBenefits: ["Broad spectrum insect control", "Contact and stomach poison action"],
    targetCrops: ["Cotton", "Paddy", "Vegetables"],
    images: ["/assets/products/attack-505.jpeg"]
  },
  {
    name: "Azotech",
    category: "Fungicide",
    technicalName: "Azoxystrobin 23% SC",
    productType: "Systemic Fungicide",
    formulation: "SC",
    targetDiseases: ["Powdery mildew", "Rust", "Blast"],
    targetCrops: ["Grapes", "Paddy", "Chilli"],
    images: ["/assets/products/azotech.jpeg"]
  },
  {
    name: "AZOTRI PLUS",
    category: "Fungicide",
    technicalName: "Tricyclazole 20.4% + Azoxystrobin 6.8% SC",
    formulation: "SC",
    targetDiseases: ["Blast disease"],
    targetCrops: ["Paddy"],
    images: ["/assets/products/azotriplus.jpeg"]
  },
  {
    name: "AZTRIX",
    category: "Fungicide",
    technicalName: "Azoxystrobin 16.7% + Tricyclazole 33.3% SC",
    formulation: "SC",
    targetDiseases: ["Blast", "fungal diseases"],
    targetCrops: ["Paddy"],
    images: ["/assets/products/aztrix.jpeg"]
  },
  {
    name: "BATALIYAN",
    category: "Herbicide",
    technicalName: "Mesotrione 2.27% + Atrazine 22.7% SC",
    productType: "Selective Herbicide",
    targetCrops: ["Maize"],
    targetWeeds: ["Broadleaf & grassy weeds"],
    images: ["/assets/products/bataliyan.jpeg"]
  },
  {
    name: "BENZO KILL",
    category: "Insecticide",
    technicalName: "Emamectin Benzoate 5% SG",
    formulation: "SG",
    targetPests: ["Bollworm", "Caterpillars"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    images: ["/assets/products/benzo kill.jpeg"]
  },
  {
    name: "BENZO NIL",
    category: "Insecticide",
    technicalName: "Emamectin Benzoate 1.5% + Fipronil 3.5% SC",
    formulation: "SC",
    keyBenefits: ["Dual mode action", "Effective on chewing pests"],
    targetCrops: ["Cotton", "Chilli"],
    images: ["/assets/products/benzo nil.jpeg"]
  },
  {
    name: "BENZO FIRE",
    category: "Insecticide",
    technicalName: "Emamectin Benzoate 1.9% EC",
    formulation: "EC",
    targetPests: ["Caterpillars", "Fruit borers"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    images: ["/assets/products/benzofire.jpeg"]
  },
  {
    name: "BHAGAO",
    category: "Herbicide",
    technicalName: "Halosulfuron Methyl 75% WG",
    formulation: "WG",
    productType: "Selective Herbicide",
    targetWeeds: ["Sedges and broadleaf weeds"],
    targetCrops: ["Maize", "Sugarcane"],
    keyBenefits: ["Post-emergence herbicide", "Effective sedge control"],
    images: ["/assets/products/bhagao.jpeg"]
  },
  {
    name: "BHISMA GOLD",
    category: "Insecticide",
    technicalName: "Profenophos 50% EC",
    formulation: "EC",
    productType: "Broad Spectrum Insecticide",
    targetPests: ["Bollworms", "Caterpillars", "Sucking pests"],
    targetCrops: ["Cotton", "Vegetables"],
    keyBenefits: ["Fast action", "Effective on resistant pests"],
    images: ["/assets/products/bhisma gold.jpeg"]
  },
  {
    name: "C-IMIDA",
    category: "Insecticide",
    technicalName: "Imidacloprid 17.8% SL",
    formulation: "SL",
    productType: "Systemic Insecticide",
    targetPests: ["Aphids", "Whiteflies", "Jassids", "Thrips"],
    targetCrops: ["Cotton", "Chilli", "Vegetables", "Fruits"],
    packaging: ["100 ml", "250 ml", "500 ml", "1 Liter"],
    images: ["/assets/products/c-imida.jpeg"]
  },
  {
    name: "C-IMIDA SUPER",
    category: "Insecticide",
    technicalName: "Imidacloprid 30.5% SC",
    formulation: "SC",
    productType: "Systemic Insecticide",
    targetPests: ["Aphids", "Jassids", "Whiteflies", "Thrips"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    keyBenefits: ["Long systemic protection", "Excellent sucking pest control"],
    images: ["/assets/products/c imida super (2).jpeg"]
  },
  {
    name: "CAPHEXA",
    category: "Fungicide",
    technicalName: "Captan 70% + Hexaconazole 5% WP",
    formulation: "WP",
    productType: "Contact Fungicide",
    targetDiseases: ["Leaf spot", "Blight", "Powdery mildew"],
    targetCrops: ["Fruits", "Vegetables"],
    keyBenefits: ["Dual mode disease control", "Preventive and curative action"],
    images: ["/assets/products/caphexa.jpeg"]
  },
  {
    name: "CCS-303",
    category: "Organic / Bio Product",
    productType: "Organic Plant Nutrient",
    keyBenefits: ["Crop nutrition support", "Improves soil health", "Organic formulation"],
    images: ["/assets/products/ccs 303.jpeg"]
  },
  {
    name: "CCS-CARB ULTRA",
    category: "Bio Stimulant",
    productType: "Plant Immunity Booster",
    keyBenefits: ["Enhances root growth", "Improves plant immunity", "Organic carbon support"],
    images: ["/assets/products/ccs carb ultra.jpeg"]
  },
  {
    name: "CCS-CARB",
    category: "Bio Stimulant",
    productType: "Plant Immunity Booster",
    keyBenefits: ["Root development", "Soil microbial activity support", "Crop stress tolerance"],
    images: ["/assets/products/ccs carb.jpeg"]
  },
  {
    name: "CCS-NEEM100",
    category: "Bio Insecticide",
    technicalName: "Neem Seed Kernel Based EC containing Azadirachtin 1% (10000 ppm min.)",
    formulation: "EC",
    productType: "Botanical Insecticide",
    targetPests: ["Aphids", "Whiteflies", "Caterpillars"],
    targetCrops: ["Vegetables", "Fruits", "Cotton"],
    keyBenefits: ["Eco-friendly", "Organic pest management"],
    images: ["/assets/products/ccs neem100.jpeg"]
  },
  {
    name: "CHIT FIGHTER",
    category: "Insecticide",
    technicalName: "Chlorantraniliprole 0.4% GR",
    formulation: "GR",
    targetPests: ["Stem borer", "Leaf folder"],
    targetCrops: ["Paddy", "Sugarcane"],
    keyBenefits: ["Granular insecticide", "Long residual control"],
    images: ["/assets/products/chit fighter.jpeg"]
  },
  {
    name: "CHIT PRIDE",
    category: "Insecticide",
    technicalName: "Acetamiprid 20% SP",
    formulation: "SP",
    productType: "Systemic Insecticide",
    targetPests: ["Whiteflies", "Aphids", "Jassids"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    keyBenefits: ["Quick knockdown", "Effective sucking pest control"],
    images: ["/assets/products/chit pride.jpeg"]
  },
  {
    name: "CHITARA",
    category: "Insecticide",
    technicalName: "Thiamethoxam 25% WG",
    formulation: "WG",
    productType: "Systemic Insecticide",
    targetPests: ["Sucking pests"],
    targetCrops: ["Cotton", "Chilli", "Vegetables"],
    keyBenefits: ["Fast absorption", "Excellent pest control"],
    images: ["/assets/products/chitara.jpeg"]
  },
  {
    name: "CHITARA GOLD",
    category: "Insecticide",
    technicalName: "Thiamethoxam 75% SG",
    formulation: "SG",
    productType: "Systemic Insecticide",
    targetPests: ["Aphids", "Whiteflies", "Thrips"],
    targetCrops: ["Cotton", "Paddy", "Vegetables"],
    keyBenefits: ["Highly effective systemic action", "Long duration control"],
    images: ["/assets/products/chitara gold.jpeg"]
  },
  {
    name: "CHITGIBB EZY",
    category: "Plant Growth Regulator",
    technicalName: "Gibberellic Acid 40% WSG",
    formulation: "WSG",
    keyBenefits: ["Promotes plant growth", "Improves flowering and fruit setting", "Enhances crop yield"],
    images: ["/assets/products/chitgibb ezy.jpeg"]
  },
  {
    name: "CHITGOR",
    category: "Insecticide",
    technicalName: "Dimethoate 30% EC",
    formulation: "EC",
    productType: "Systemic Insecticide",
    targetPests: ["Aphids", "Thrips", "Jassids"],
    targetCrops: ["Cotton", "Vegetables"],
    keyBenefits: ["Contact and systemic action", "Controls sucking pests"],
    images: ["/assets/products/chitgor.jpeg"]
  },
  {
    name: "CHITHEXA",
    category: "Fungicide",
    technicalName: "Hexaconazole 5% SC",
    formulation: "SC",
    productType: "Systemic Fungicide",
    targetDiseases: ["Sheath blight", "Powdery mildew"],
    targetCrops: ["Paddy", "Groundnut", "Mango"],
    keyBenefits: ["Preventive and curative action"],
    images: ["/assets/products/chithexa.jpeg"]
  },
  {
    name: "CHITHEXA GOLD",
    category: "Fungicide",
    technicalName: "Hexaconazole 75% WG",
    formulation: "WG",
    productType: "Systemic Fungicide",
    targetDiseases: ["Powdery mildew", "Rust"],
    targetCrops: ["Paddy", "Chilli", "Mango"],
    keyBenefits: ["Strong fungal protection", "Long residual effect"],
    images: ["/assets/products/chithexa gold.jpeg"]
  },
  {
    name: "CHITMIZA",
    category: "Herbicide",
    technicalName: "Imazethapyr 70% WG",
    formulation: "WG",
    productType: "Selective Herbicide",
    targetWeeds: ["Broadleaf and grassy weeds"],
    targetCrops: ["Soybean", "Groundnut", "Pulses"],
    keyBenefits: ["Early weed control", "Long residual activity"],
    images: ["/assets/products/chitmiza.jpeg"]
  },
  {
    name: "CHITMIZA-10",
    category: "Herbicide",
    technicalName: "Imazethapyr 10% SL",
    productType: "Selective Herbicide",
    keyBenefits: ["Broad-spectrum weed control", "Fast absorption by weeds", "Long residual action", "Improves crop growth by reducing weed competition"],
    targetCrops: ["Soybean", "Groundnut", "Pulses"],
    dosage: "800-1000 ml per acre",
    packaging: ["250 ml", "500 ml", "1 Liter"],
    images: ["/assets/products/chitmiza-10.jpeg"]
  }
];

// Update or add each product
for (const productData of allProductsFromImages) {
  const existingIndex = catalog.findIndex(p => 
    p.name.toLowerCase().replace(/[- ]/g, '') === productData.name.toLowerCase().replace(/[- ]/g, '')
  );
  
  if (existingIndex !== -1) {
    // Update existing product
    const existingProduct = catalog[existingIndex];
    Object.assign(existingProduct, productData);
    console.log(`✅ Updated ${productData.name}`);
  } else {
    // Add new product
    const newProduct = {
      id: `prod-${productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      slug: productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      price: 0,
      featured: false,
      subcategory: "",
      application_method: "",
      safety_precautions: "",
      storage_instructions: "",
      faqs: [],
      related_products: [],
      ...productData,
      overview: productData.description || productData.name,
      description: productData.description || productData.name
    };
    catalog.push(newProduct);
    console.log(`🆕 Added ${productData.name}`);
  }
}

// Write the updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('\n🎉 All products updated and added!');
