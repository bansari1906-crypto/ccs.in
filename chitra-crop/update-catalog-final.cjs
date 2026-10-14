
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'official-product-catalog.json');
let catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const allProducts = [
  {
    name: "CHITRA ZN",
    category: "Liquid Fertilizer",
    composition: "Chelated Zinc as Zinc-Glycine (Liquid)",
    description: "Liquid chelated zinc fertilizer formulated with Zinc-Glycine technology for quick absorption and correction of zinc deficiency.",
    keyBenefits: ["Fast zinc absorption", "Improves chlorophyll synthesis", "Enhances plant growth", "Better flowering and fruit development", "Improves nutrient efficiency"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Cereals", "Pulses"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA-COC",
    category: "Fungicide",
    technicalName: "Copper Oxychloride 50% WP",
    formulation: "WP",
    productType: "Contact Fungicide",
    description: "CHITRA-COC is a broad-spectrum contact fungicide containing Copper Oxychloride 50% WP for preventive control of fungal and bacterial diseases.",
    keyBenefits: ["Broad-spectrum disease control", "Preventive action", "Long-lasting protection", "Effective against fungal and bacterial infections", "Improves crop health"],
    targetDiseases: ["Leaf Spot", "Blight", "Anthracnose", "Downy Mildew", "Bacterial Leaf Spot"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Plantation crops"],
    dosage: "400–600 gm per acre",
    packaging: ["500 gm", "1 Kg"]
  },
  {
    name: "CHITRACOL",
    category: "Fungicide",
    technicalName: "Propineb 70% WP",
    formulation: "WP",
    productType: "Contact Fungicide",
    description: "Propineb based protective fungicide providing effective disease prevention in fruits and vegetable crops.",
    keyBenefits: ["Broad-spectrum protection", "Preventive action", "Multi-site activity", "Long residual effect"],
    targetDiseases: ["Leaf Spot", "Early Blight", "Downy Mildew", "Rust"],
    recommendedCrops: ["Fruits", "Vegetables", "Grapes"],
    dosage: "500–700 gm per acre",
    packaging: ["500 gm", "1 Kg"]
  },
  {
    name: "CHITRAZINE",
    category: "Herbicide",
    technicalName: "Atrazine 50% WP",
    formulation: "WP",
    productType: "Selective Herbicide",
    description: "Selective herbicide used for effective control of broadleaf and grassy weeds in maize and sugarcane crops.",
    keyBenefits: ["Pre and early post-emergence control", "Long residual activity", "Broad-spectrum weed management", "Reduces crop competition"],
    targetWeeds: ["Broadleaf weeds", "Grassy weeds"],
    recommendedCrops: ["Maize", "Sugarcane"],
    dosage: "800–1200 gm per acre",
    packaging: ["500 gm", "1 Kg"]
  },
  {
    name: "CHITWEED SUPER",
    category: "Herbicide",
    technicalName: "2,4-D Amine Salt 58% SL",
    formulation: "SL",
    productType: "Selective Herbicide",
    description: "Selective post-emergence herbicide for controlling broadleaf weeds in cereal crops.",
    keyBenefits: ["Effective broadleaf weed control", "Systemic action", "Fast absorption", "Improves crop growth"],
    recommendedCrops: ["Wheat", "Paddy", "Maize"],
    dosage: "As per crop recommendation",
    packaging: ["250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHITWEED",
    category: "Herbicide",
    technicalName: "2,4-D Ethyl Ester 38% EC",
    formulation: "EC",
    productType: "Selective Herbicide",
    description: "Post-emergence herbicide used for controlling broadleaf weeds in cereal crops.",
    keyBenefits: ["Systemic weed control", "Fast action", "Effective broadleaf weed management", "Improves crop productivity"],
    recommendedCrops: ["Wheat", "Paddy", "Maize"],
    packaging: ["250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "C-IMIDA",
    category: "Insecticide",
    technicalName: "Imidacloprid 17.8% SL",
    formulation: "SL",
    productType: "Systemic Insecticide",
    description: "Systemic insecticide effective against sucking pests in cotton, vegetables and horticultural crops.",
    keyBenefits: ["Strong systemic action", "Long duration control", "Excellent sucking pest management", "Quick absorption"],
    targetPests: ["Aphids", "Whiteflies", "Jassids", "Thrips"],
    recommendedCrops: ["Cotton", "Chilli", "Vegetables", "Fruits"],
    packaging: ["100 ml", "250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CLEAN N CLEAR",
    category: "Herbicide",
    technicalName: "Halosulfuron Methyl 5% + Atrazine 48% WG",
    formulation: "WG",
    productType: "Selective Herbicide",
    description: "Combination herbicide providing effective control of sedges, broadleaf weeds and grasses.",
    keyBenefits: ["Dual mode weed control", "Long residual activity", "Broad-spectrum performance", "Better crop establishment"],
    recommendedCrops: ["Maize", "Sugarcane"],
    targetWeeds: ["Sedges", "Broadleaf weeds", "Grassy weeds"]
  },
  {
    name: "CRAGIBB",
    category: "Plant Growth Regulator (PGR)",
    technicalName: "Gibberellic Acid 0.001% L",
    formulation: "Liquid",
    description: "Plant growth regulator used to enhance plant growth, flowering and fruit development.",
    keyBenefits: ["Stimulates plant growth", "Improves flowering", "Better fruit setting", "Enhances crop yield"],
    recommendedCrops: ["Grapes", "Fruits", "Vegetables", "Floriculture crops"],
    packaging: ["250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CRETA SUPER",
    category: "Insecticide",
    technicalName: "Thiamethoxam 30% FS",
    formulation: "FS",
    productType: "Seed Treatment Insecticide",
    description: "Systemic seed treatment insecticide providing early protection against sucking and soil pests.",
    keyBenefits: ["Protects seedlings", "Long-lasting systemic action", "Improved crop establishment", "Effective pest protection"],
    targetPests: ["Aphids", "Jassids", "Thrips", "Termites"],
    recommendedCrops: ["Cotton", "Maize", "Paddy", "Wheat"]
  },
  {
    name: "CYMO PLUS",
    category: "Fungicide",
    technicalName: "Cymoxanil 8% + Mancozeb 64% WP",
    formulation: "WP",
    productType: "Systemic & Contact Fungicide",
    description: "Combination fungicide with preventive and curative action against major fungal diseases.",
    keyBenefits: ["Dual action fungicide", "Curative and preventive effect", "Broad-spectrum disease control", "Long residual protection"],
    targetDiseases: ["Downy Mildew", "Late Blight", "Leaf Spot"],
    recommendedCrops: ["Potato", "Grapes", "Vegetables"],
    packaging: ["600 gm", "1 Kg"]
  },
  {
    name: "CYQ-320",
    category: "Insecticide",
    technicalName: "Cypermethrin 3% + Quinalphos 20% EC",
    formulation: "EC",
    productType: "Contact & Stomach Insecticide",
    description: "Broad-spectrum insecticide effective against chewing and sucking pests.",
    keyBenefits: ["Quick knockdown action", "Long residual control", "Broad-spectrum pest management"],
    targetPests: ["Bollworms", "Caterpillars", "Leaf folders", "Stem borers"],
    recommendedCrops: ["Cotton", "Paddy", "Vegetables"]
  },
  {
    name: "DHARTI RATAN",
    category: "Bio Stimulant",
    composition: "Humic Acid + Alginic Acid + Amino Acid",
    description: "Premium bio stimulant improving root development, nutrient uptake and crop vigor.",
    keyBenefits: ["Promotes root growth", "Improves nutrient efficiency", "Enhances stress tolerance", "Increases crop productivity"],
    recommendedCrops: ["All Crops", "Fruits", "Vegetables", "Cotton"],
    packaging: ["1 Kg", "5 Kg"]
  },
  {
    name: "DIFINE-25",
    category: "Fungicide",
    technicalName: "Difenoconazole 25% EC",
    formulation: "EC",
    productType: "Systemic Fungicide",
    description: "Systemic triazole fungicide providing excellent preventive and curative disease control.",
    keyBenefits: ["Strong systemic movement", "Long-lasting protection", "Preventive and curative action"],
    targetDiseases: ["Powdery Mildew", "Rust", "Leaf Spot", "Anthracnose"],
    recommendedCrops: ["Chilli", "Fruits", "Vegetables"]
  },
  {
    name: "DUALSTRIKE GR",
    category: "Insecticide",
    technicalName: "Thiamethoxam 1.0% + Chlorantraniliprole 0.5% GR",
    formulation: "GR",
    productType: "Granular Insecticide",
    description: "Dual action granular insecticide for controlling stem borers and soil pests.",
    keyBenefits: ["Long residual protection", "Root zone activity", "Effective pest management"],
    targetPests: ["Stem Borer", "Leaf Folder", "Early Stage Caterpillars"],
    recommendedCrops: ["Paddy"],
    packaging: ["2.5 Kg", "5 Kg"]
  },
  {
    name: "FENDOL-DP",
    category: "Insecticide",
    technicalName: "Fenvalerate 0.4% DP",
    formulation: "DP",
    productType: "Dusting Insecticide",
    description: "Dust formulation insecticide providing quick control of household and agricultural insect pests.",
    keyBenefits: ["Fast knockdown effect", "Easy application", "Effective residual action"],
    packaging: ["1 Kg"]
  },
  {
    name: "FEURADON-3G",
    category: "Insecticide / Nematicide",
    technicalName: "Carbofuran 3% CG",
    formulation: "CG (Granules)",
    description: "Granular insecticide and nematicide used for soil pest and nematode management.",
    keyBenefits: ["Controls soil insects", "Effective nematode management", "Long residual activity"],
    targetPests: ["Root grubs", "Stem borers", "Nematodes"],
    recommendedCrops: ["Paddy", "Sugarcane", "Cotton", "Vegetables"],
    packaging: ["5 Kg"]
  },
  {
    name: "FIMIDA-40",
    category: "Insecticide",
    technicalName: "Fipronil 40% + Imidacloprid 40% WG",
    formulation: "WG",
    productType: "Systemic & Contact Insecticide",
    description: "Advanced combination insecticide providing broad-spectrum control of sucking and chewing pests.",
    keyBenefits: ["Dual mode action", "Fast knockdown effect", "Long-lasting control", "Effective on resistant pest populations"],
    targetPests: ["Aphids", "Whiteflies", "Thrips", "Jassids", "Termites"],
    recommendedCrops: ["Cotton", "Paddy", "Vegetables", "Sugarcane"],
    packaging: ["100 gm"]
  },
  {
    name: "FLO-AVTAR",
    category: "Bio Stimulant",
    description: "Bio-stimulant formulation.",
    keyBenefits: ["Improves flowering and fruit setting", "Enhances plant vigor", "Reduces flower dropping", "Improves crop yield and quality"],
    recommendedCrops: ["All crops"],
    dosage: "2-3 ml/L water (typical)",
    packaging: ["100 ml", "250 ml", "500 ml", "1 L"]
  },
  {
    name: "FLO-JEET",
    category: "Flowering Stimulant",
    description: "Flowering promoter formulation.",
    keyBenefits: ["Promotes early flowering", "Increases flower retention", "Improves fruit formation", "Enhances crop productivity"],
    recommendedCrops: ["Cotton", "Chilli", "Pomegranate", "Vegetables", "Fruits"],
    dosage: "2-3 ml/L water"
  },
  {
    name: "FLOWER PLUS",
    category: "Bio Stimulant",
    technicalName: "Amino Acids + Vitamins",
    keyBenefits: ["Increases flowering", "Improves fruit size", "Enhances stress tolerance", "Boosts plant metabolism"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Pulses"],
    dosage: "2-3 ml/L water"
  },
  {
    name: "FUNGASTIN",
    category: "Systemic Fungicide",
    technicalName: "Carbendazim 50% WP",
    targetDiseases: ["Powdery Mildew", "Leaf Spot", "Anthracnose", "Blast Disease"],
    dosage: "1-2 g/L water"
  },
  {
    name: "HARIYALI SULF-80",
    category: "Contact Fungicide",
    technicalName: "Sulphur 80% WDG",
    targetDiseases: ["Powdery Mildew", "Mites", "Scab", "Leaf Spot"],
    keyBenefits: ["Controls fungal diseases", "Provides Sulphur nutrition"],
    dosage: "2-3 g/L water"
  },
  {
    name: "HARIYALI GOLD PLUS",
    category: "Plant Growth Promoter",
    composition: "Humic Acid, Fulvic Acid, Amino Acid, Seaweed Extract",
    keyBenefits: ["Root development", "Better nutrient uptake", "Stress resistance", "Increased yield"],
    dosage: "2-4 ml/L water"
  },
  {
    name: "HIT-WICKET",
    category: "Contact Herbicide",
    technicalName: "Paraquat Dichloride 24% SL",
    targetWeeds: ["Annual Weeds", "Broadleaf Weeds", "Grasses"],
    keyBenefits: ["Fast weed burn-down", "Non-selective herbicide"],
    dosage: "5-10 ml/L water"
  },
  {
    name: "WELCOME HONEY BEE",
    category: "Adjuvant / Pollination Enhancer",
    technicalName: "Citrus Peel Extract Silicon Based Adjuvant",
    keyBenefits: ["Attracts pollinators", "Improves pollination", "Better fruit setting", "Improves spray spreading"],
    dosage: "0.5-1 ml/L water"
  },
  {
    name: "HUKUMAT",
    category: "Systemic & Contact Insecticide",
    technicalName: "Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC",
    targetPests: ["Aphids", "Jassids", "Thrips", "Whiteflies", "Caterpillars"],
    dosage: "0.5 ml/L water"
  },
  {
    name: "JODIDAR",
    category: "Antibiotic Bactericide",
    technicalName: "Kasugamycin 3% SL",
    targetDiseases: ["Bacterial Blight", "Leaf Blight", "Bacterial Leaf Spot"],
    dosage: "2-3 ml/L water"
  },
  {
    name: "JORAWAR",
    category: "Systemic Fungicide",
    technicalName: "Azoxystrobin 11% + Tebuconazole 18.3% SC",
    targetDiseases: ["Rust", "Blast", "Powdery Mildew", "Anthracnose", "Leaf Spot"],
    dosage: "1 ml/L water"
  },
  {
    name: "KARGIL-75",
    category: "Systemic & Contact Fungicide",
    technicalName: "Carbendazim 12% + Mancozeb 63% WP",
    targetDiseases: ["Early Blight", "Late Blight", "Leaf Spot", "Rust"],
    dosage: "2 g/L water"
  },
  {
    name: "KILL-41",
    category: "Herbicide",
    technicalName: "Glyphosate 41% SL",
    targetWeeds: ["Annual Weeds", "Perennial Weeds", "Grasses"],
    dosage: "10-15 ml/L water"
  },
  {
    name: "KILL-71",
    category: "Systemic Herbicide",
    technicalName: "Ammonium Salt of Glyphosate 71% SG",
    targetWeeds: ["Broadleaf Weeds", "Grasses", "Sedges"],
    dosage: "5-8 g/L water"
  },
  {
    name: "KILL-LARVA",
    category: "Insecticide",
    technicalName: "Chlorantraniliprole 18.5% SC",
    targetPests: ["Fruit Borer", "Stem Borer", "Pod Borer", "Leaf Folder"],
    dosage: "0.3-0.4 ml/L water"
  },
  {
    name: "KRANTIKARI",
    category: "Systemic Fungicide",
    technicalName: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
    targetDiseases: ["Powdery Mildew", "Anthracnose", "Rust", "Leaf Spot"],
    dosage: "0.75-1 ml/L water"
  },
  {
    name: "LASKAR",
    category: "Insecticide",
    technicalName: "Lambda Cyhalothrin 4.9% CS",
    targetPests: ["Bollworms", "Caterpillars", "Fruit Borers", "Sucking Pests"],
    dosage: "0.5 ml/L water"
  }
];

// Update each product in the catalog
for (let i = 0; i < catalog.length; i++) {
  const product = catalog[i];
  const productDetails = allProducts.find(dp => 
    dp.name.toLowerCase().replace(/[- ]/g, '') === product.name.toLowerCase().replace(/[- ]/g, '')
  );
  
  if (productDetails) {
    // Update product fields
    if (productDetails.category) product.category = productDetails.category;
    if (productDetails.technicalName) product.technicalName = productDetails.technicalName;
    if (productDetails.productType) product.productType = productDetails.productType;
    if (productDetails.formulation) product.formulation = productDetails.formulation;
    if (productDetails.composition) product.composition = productDetails.composition;
    if (productDetails.description) product.description = productDetails.description;
    if (productDetails.description) product.overview = productDetails.description;
    if (productDetails.keyBenefits) product.key_benefits = productDetails.keyBenefits;
    if (productDetails.recommendedCrops) product.target_crops = productDetails.recommendedCrops;
    if (productDetails.targetPests) product.targetPests = productDetails.targetPests;
    if (productDetails.targetDiseases) product.targetDiseases = productDetails.targetDiseases;
    if (productDetails.targetWeeds) product.targetWeeds = productDetails.targetWeeds;
    if (productDetails.dosage) product.usage_dosage = productDetails.dosage;
    if (productDetails.packaging) product.packSizes = productDetails.packaging;
    
    console.log(`✅ Updated ${product.name}`);
  }
}

// Write the updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('\n🎉 All products updated!');
