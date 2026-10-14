
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'official-product-catalog.json');
let catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const detailedProducts = [
  {
    name: "CHITMIZA-10",
    category: "Herbicide",
    technicalName: "Imazethapyr 10% SL",
    productType: "Selective Herbicide",
    description: "CHITMIZA-10 is a selective post-emergence herbicide containing Imazethapyr 10% SL. It effectively controls broadleaf weeds, grasses, and sedges in soybean and pulse crops.",
    keyBenefits: ["Broad-spectrum weed control", "Fast absorption by weeds", "Long residual action", "Improves crop growth by reducing weed competition", "Suitable for soybean and groundnut crops"],
    recommendedCrops: ["Soybean", "Groundnut", "Pulses"],
    dosage: "800–1000 ml per acre",
    packaging: ["250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHIT-OXY",
    category: "Herbicide",
    technicalName: "Oxyfluorfen 23.5% EC",
    productType: "Selective Herbicide",
    description: "Selective herbicide for controlling annual broadleaf and grassy weeds in onion, garlic, and other vegetable crops.",
    keyBenefits: ["Excellent pre and post-emergence weed control", "Long-lasting protection", "Improves crop establishment", "Effective at low dosage"],
    recommendedCrops: ["Onion", "Garlic", "Vegetable crops"],
    dosage: "200–300 ml per acre",
    packaging: ["100 ml", "250 ml", "500 ml"]
  },
  {
    name: "CHITRA 888",
    category: "Liquid Fertilizer",
    composition: "NPK 8-8-8 Liquid",
    description: "Balanced NPK liquid fertilizer specially developed for sugarcane crops for healthy vegetative growth and improved productivity.",
    keyBenefits: ["Balanced nutrition supply", "Enhances root and shoot growth", "Improves crop vigor", "Better nutrient absorption"],
    recommendedCrops: ["Sugarcane"],
    dosage: "2–3 ml per liter spray",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA AMS",
    category: "Water Soluble Fertilizer",
    technicalName: "Ammonium Sulphate",
    description: "100% water soluble fertilizer supplying nitrogen and sulphur for healthy crop growth.",
    keyBenefits: ["Improves chlorophyll formation", "Enhances nitrogen utilization", "Promotes healthy green growth", "Easy water solubility"],
    dosage: "5–10 kg per acre",
    packaging: ["25 Kg Bag"]
  },
  {
    name: "CHITRA B",
    category: "Liquid Fertilizer",
    composition: "Chelated Boron as Boron-Glycin",
    description: "Liquid boron fertilizer used to correct boron deficiency and improve flowering and fruit setting.",
    keyBenefits: ["Improves flower retention", "Better fruit development", "Prevents boron deficiency", "Enhances pollination"],
    recommendedCrops: ["Cotton", "Vegetables", "Fruits", "Groundnut"],
    dosage: "2–3 ml per liter",
    packaging: ["250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHITRA BOOST",
    category: "Plant Growth Regulator (PGR)",
    technicalName: "Paclobutrazole 40% SC",
    description: "Plant growth regulator used to manage vegetative growth and promote flowering and fruiting.",
    keyBenefits: ["Controls excessive vegetative growth", "Enhances flowering", "Improves fruit quality", "Increases yield potential"],
    recommendedCrops: ["Mango", "Pomegranate", "Cotton"],
    dosage: "As per crop recommendation",
    packaging: ["100 ml", "250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHITRA CA",
    category: "Liquid Fertilizer",
    composition: "Chelated Calcium as Calcium-Glycine",
    description: "Chelated calcium fertilizer for improving cell wall strength and fruit quality.",
    keyBenefits: ["Reduces fruit cracking", "Improves shelf life", "Better calcium absorption", "Strengthens plant tissues"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA CAL-11",
    category: "Micronutrient Fertilizer",
    composition: "Concentrated Liquid Calcium 11%",
    description: "High concentration calcium fertilizer for correcting calcium deficiency in crops.",
    keyBenefits: ["Fast calcium availability", "Improves fruit firmness", "Prevents blossom end rot", "Enhances crop quality"],
    dosage: "2–4 ml per liter",
    packaging: ["1 Liter"]
  },
  {
    name: "CHITRA CALBO",
    category: "Water Soluble Fertilizer",
    composition: "Boronated Calcium Nitrate",
    description: "Water soluble fertilizer supplying calcium and boron for flowering and fruit development.",
    keyBenefits: ["Improves fruit setting", "Reduces flower dropping", "Enhances fruit quality", "100% water soluble"],
    packaging: ["25 Kg Bag"]
  },
  {
    name: "CHITRA CBZ",
    category: "Liquid Fertilizer",
    composition: "Fortified Calcium Suspension",
    description: "Advanced calcium suspension fertilizer for crop strength and fruit quality improvement.",
    keyBenefits: ["Improves plant strength", "Better fruit firmness", "Corrects calcium deficiency", "Increases shelf life"],
    dosage: "2–3 ml per liter",
    packaging: ["1 Liter"]
  },
  {
    name: "CHITRA CN",
    category: "Water Soluble Fertilizer",
    technicalName: "Calcium Nitrate",
    description: "100% water soluble calcium nitrate fertilizer for healthy plant development.",
    keyBenefits: ["Provides calcium and nitrogen", "Improves root growth", "Enhances fruit quality", "Quick nutrient availability"],
    packaging: ["25 Kg Bag"]
  },
  {
    name: "CHITRA DEFEND",
    category: "Fungicide",
    technicalName: "Chlorothalonil 75% WP",
    productType: "Contact Fungicide",
    description: "Broad-spectrum contact fungicide used for preventive disease management.",
    keyBenefits: ["Prevents fungal diseases", "Multi-site action", "Long residual protection", "Effective disease control"],
    recommendedCrops: ["Vegetables", "Fruits", "Field crops"],
    dosage: "400–600 gm per acre",
    packaging: ["500 gm", "1 Kg"]
  },
  {
    name: "CHITRA FE",
    category: "Micronutrient Fertilizer",
    composition: "Fe-EDTA 12%",
    description: "Chelated iron fertilizer for correction of iron deficiency in crops.",
    keyBenefits: ["Prevents yellowing of leaves", "Improves chlorophyll formation", "Enhances plant growth", "Highly soluble"],
    dosage: "1–2 gm per liter",
    packaging: ["500 gm"]
  },
  {
    name: "CHITRA GOLD",
    category: "Liquid Fertilizer",
    composition: "Calcium Nitrate Fortified with Magnesium",
    description: "Premium calcium and magnesium liquid fertilizer for balanced crop nutrition.",
    keyBenefits: ["Improves chlorophyll activity", "Better fruit quality", "Enhances nutrient uptake", "Prevents calcium & magnesium deficiency"],
    packaging: ["1 Liter"]
  },
  {
    name: "CHITRA M-45",
    category: "Fungicide",
    technicalName: "Mancozeb 75% WP",
    productType: "Contact Fungicide",
    description: "Protective fungicide effective against a wide range of fungal diseases.",
    keyBenefits: ["Broad-spectrum disease protection", "Preventive action", "Multi-site fungicide", "Improves crop health"],
    recommendedCrops: ["Vegetables", "Fruits", "Field crops"],
    dosage: "400–600 gm per acre",
    packaging: ["500 gm", "1 Kg"]
  },
  {
    name: "CHITRA MAP",
    category: "Water Soluble Fertilizer",
    composition: "Mono Ammonium Phosphate (12:61:00)",
    description: "High phosphorus fertilizer promoting root growth and flowering.",
    keyBenefits: ["Promotes strong roots", "Improves flowering", "Enhances energy transfer", "Fully water soluble"],
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA MAX",
    category: "Liquid Fertilizer",
    composition: "Potassium Metaphosphate Dimer (0-40-40)",
    description: "High phosphorus and potassium liquid fertilizer for flowering and fruit development.",
    keyBenefits: ["Improves flowering", "Better fruit size and color", "Enhances crop quality", "Supports stress resistance"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA MEG",
    category: "Water Soluble Fertilizer",
    technicalName: "Magnesium Sulphate",
    description: "Water soluble magnesium fertilizer for healthy green crop growth.",
    keyBenefits: ["Enhances photosynthesis", "Prevents magnesium deficiency", "Improves leaf greenness", "Easy absorption"],
    packaging: ["25 Kg Bag"]
  },
  {
    name: "CHITRA MKP",
    category: "Water Soluble Fertilizer",
    composition: "Mono Potassium Phosphate (00:52:34)",
    productType: "NPK Water Soluble Fertilizer",
    description: "Chitra MKP is a premium phosphorus and potassium-rich water soluble fertilizer designed to promote flowering, root development, and fruit quality.",
    keyBenefits: ["High phosphorus for strong root growth", "Enhances flowering and fruit setting", "Improves crop quality and size", "Fully water soluble", "Suitable for drip and foliar application"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Grapes", "Floriculture crops"],
    dosage: "Foliar Spray: 3–5 gm per liter; Drip Irrigation: 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA NK",
    category: "Liquid Fertilizer",
    composition: "NK 6:0:18 fortified with Calcium, Magnesium & Boron",
    description: "Balanced NK liquid fertilizer fortified with secondary nutrients for healthy vegetative growth and improved fruit quality.",
    keyBenefits: ["Provides nitrogen and potassium", "Improves fruit development", "Enhances crop vigor", "Reduces nutrient deficiencies", "Improves stress tolerance"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Sugarcane"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA NKP",
    category: "Water Soluble Fertilizer",
    composition: "NPK 10:26:26",
    description: "Balanced NPK fertilizer supplying nitrogen, phosphorus, and potassium for overall crop growth and productivity.",
    keyBenefits: ["Balanced nutrient supply", "Supports root and flower development", "Enhances fruit size and quality", "Fully water soluble", "Suitable for all crop stages"],
    recommendedCrops: ["Field crops", "Vegetables", "Fruits", "Floriculture crops"],
    dosage: "3–5 gm per liter; 3–5 kg per acre through drip",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA NOP",
    category: "Water Soluble Fertilizer",
    technicalName: "Potassium Nitrate",
    composition: "NPK 13:00:45",
    description: "High potassium fertilizer ideal for flowering, fruit development, and improving crop quality.",
    keyBenefits: ["Improves fruit color and size", "Enhances flowering", "Increases sweetness and shelf life", "Quick nutrient absorption", "100% water soluble"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Horticulture crops"],
    dosage: "3–5 gm per liter; 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA NP",
    category: "Water Soluble Fertilizer",
    composition: "NPK 17:44:00",
    description: "High phosphorus water soluble fertilizer promoting root development and early crop establishment.",
    keyBenefits: ["Encourages strong root growth", "Improves flowering initiation", "Enhances nutrient uptake", "Fully water soluble"],
    recommendedCrops: ["Cereals", "Vegetables", "Fruits", "Pulses"],
    dosage: "3–5 gm per liter; 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA NP (Liquid)",
    category: "Liquid Fertilizer",
    composition: "Fortified NP (7-21-0) Liquid",
    description: "Liquid NP fertilizer formulated for rapid phosphorus availability and healthy vegetative growth.",
    keyBenefits: ["Promotes root development", "Enhances early crop growth", "Improves flowering", "Fast nutrient absorption"],
    recommendedCrops: ["Vegetables", "Cotton", "Fruits", "Pulses"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA NPK 13:40:13",
    category: "Water Soluble Fertilizer",
    composition: "NPK 13:40:13",
    description: "Water soluble fertilizer with high phosphorus content ideal for early plant growth and flowering stage.",
    keyBenefits: ["Strong root establishment", "Better flowering", "Balanced crop nutrition", "Improves crop vigor"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Floriculture"],
    dosage: "3–5 gm per liter",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA NPK 19:19:19",
    category: "Water Soluble Fertilizer",
    composition: "NPK 19:19:19",
    description: "Fully balanced NPK fertilizer suitable for all crop stages and all types of crops.",
    keyBenefits: ["Balanced nutrition", "Promotes healthy vegetative growth", "Improves flowering and yield", "Quick nutrient availability", "Fully water soluble"],
    recommendedCrops: ["All crops", "Fruits", "Vegetables", "Field crops"],
    dosage: "3–5 gm per liter; 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA PACLO",
    category: "Plant Growth Regulator (PGR)",
    technicalName: "Paclobutrazole 23% SC",
    description: "Plant growth regulator used to manage excessive vegetative growth and improve flowering and fruiting.",
    keyBenefits: ["Controls plant height", "Improves flowering", "Enhances fruit setting", "Better canopy management", "Improves yield quality"],
    recommendedCrops: ["Mango", "Pomegranate", "Cotton", "Ornamentals"],
    dosage: "As per crop recommendation",
    packaging: ["100 ml", "250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHITRA PKA",
    category: "Water Soluble Fertilizer",
    composition: "NPK 00:60:20",
    productType: "NPK Water Soluble Fertilizer",
    description: "Chitra PKA is a high phosphorus and potassium water soluble fertilizer designed to promote strong root development, flowering, and fruit formation.",
    keyBenefits: ["High phosphorus content for root growth", "Enhances flowering and fruit setting", "Improves crop quality and yield", "Fully water soluble", "Suitable for foliar spray and drip irrigation"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Grapes", "Floriculture crops"],
    dosage: "Foliar Spray: 3–5 gm per liter; Drip Irrigation: 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA PYRAD",
    category: "Insecticide",
    technicalName: "Tolfenpyrad 15% EC",
    formulation: "EC",
    productType: "Contact Insecticide",
    description: "Chitra Pyrad is a broad-spectrum insecticide containing Tolfenpyrad 15% EC, effective against sucking and chewing insect pests.",
    keyBenefits: ["Quick knockdown action", "Effective against resistant pests", "Broad-spectrum insect control", "Long-lasting protection", "Excellent crop safety"],
    targetPests: ["Thrips", "Whiteflies", "Aphids", "Mites", "Caterpillars"],
    recommendedCrops: ["Chilli", "Cotton", "Vegetables", "Fruits"],
    dosage: "As per crop recommendation",
    packaging: ["100 ml", "250 ml", "500 ml", "1 Liter"]
  },
  {
    name: "CHITRA SARTHI",
    category: "Fungicide",
    technicalName: "Kresoxim-Methyl 15% + Chlorothalonil 56% WG",
    formulation: "WG",
    productType: "Systemic & Contact Fungicide",
    description: "Chitra Sarthi is a combination fungicide providing preventive and curative control against a wide range of fungal diseases.",
    keyBenefits: ["Dual mode action", "Preventive and curative disease control", "Broad-spectrum protection", "Long residual activity", "Improves crop health"],
    targetDiseases: ["Powdery Mildew", "Downy Mildew", "Leaf Spot", "Blight", "Rust"],
    recommendedCrops: ["Grapes", "Chilli", "Vegetables", "Fruits"],
    dosage: "As per crop recommendation",
    packaging: ["100 gm", "250 gm", "500 gm"]
  },
  {
    name: "CHITRA SONITE",
    category: "Water Soluble Fertilizer",
    technicalName: "Potassium Schoenite",
    productType: "Potassium & Magnesium Fertilizer",
    description: "Chitra Sonite is a premium water soluble fertilizer supplying potassium and magnesium for better crop growth, quality, and yield.",
    keyBenefits: ["Provides potassium and magnesium", "Improves fruit size and color", "Enhances sugar accumulation", "Increases stress tolerance", "Fully water soluble"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Sugarcane", "Horticultural crops"],
    dosage: "Foliar Spray: 3–5 gm per liter; Drip Irrigation: 3–5 kg per acre",
    packaging: ["25 Kg"]
  },
  {
    name: "CHITRA SOP",
    category: "Water Soluble Fertilizer",
    technicalName: "Potassium Sulphate",
    composition: "NPK 00:00:50",
    productType: "Potassium Fertilizer",
    description: "Chitra SOP is a high potassium fertilizer ideal for flowering, fruit development, quality improvement, and stress management.",
    keyBenefits: ["High potassium content", "Improves fruit size and color", "Enhances sweetness and shelf life", "Increases drought tolerance", "Fully water soluble"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Grapes", "Floriculture crops"],
    dosage: "Foliar Spray: 3–5 gm per liter; Drip Irrigation: 3–5 kg per acre",
    packaging: ["1 Kg", "25 Kg"]
  },
  {
    name: "CHITRA ZIB",
    category: "Liquid Fertilizer",
    composition: "NPK 11:11:8 fortified with Zinc & Boron",
    description: "Balanced liquid fertilizer enriched with zinc and boron for healthy crop growth, flowering, and fruit development.",
    keyBenefits: ["Balanced NPK nutrition", "Zinc and boron supplementation", "Improves flowering and fruit setting", "Enhances nutrient uptake", "Improves crop vigor"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Groundnut", "Field Crops"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA ZINCOOX",
    category: "Micronutrient Fertilizer",
    composition: "Zinc Oxide Suspension 39.5% Zn",
    description: "Highly concentrated liquid zinc fertilizer formulated to correct zinc deficiency and improve crop growth.",
    keyBenefits: ["Rapid zinc correction", "Improves chlorophyll formation", "Enhances root growth", "Improves flowering and yield", "Better nutrient utilization"],
    recommendedCrops: ["Cotton", "Paddy", "Wheat", "Vegetables", "Fruits"],
    dosage: "2–3 ml per liter",
    packaging: ["500 ml", "1 Liter"]
  },
  {
    name: "CHITRA ZINK",
    category: "Micronutrient Fertilizer",
    composition: "Zn-EDTA 12%",
    technicalName: "Chelated Zinc as Zn-EDTA",
    description: "Chelated zinc fertilizer with high solubility for rapid correction of zinc deficiency in crops.",
    keyBenefits: ["Highly available zinc source", "Prevents zinc deficiency symptoms", "Improves chlorophyll formation", "Enhances crop growth and yield", "100% water soluble"],
    recommendedCrops: ["Fruits", "Vegetables", "Cotton", "Cereals", "Pulses"],
    dosage: "1–2 gm per liter",
    packaging: ["500 gm"]
  }
];

// Update each product in the catalog
for (let i = 0; i < catalog.length; i++) {
  const product = catalog[i];
  const detailedProduct = detailedProducts.find(dp => 
    dp.name.toLowerCase().replace(/[- ]/g, '') === product.name.toLowerCase().replace(/[- ]/g, '')
  );
  
  if (detailedProduct) {
    // Update product fields
    if (detailedProduct.category) product.category = detailedProduct.category;
    if (detailedProduct.technicalName) product.technicalName = detailedProduct.technicalName;
    if (detailedProduct.productType) product.productType = detailedProduct.productType;
    if (detailedProduct.formulation) product.formulation = detailedProduct.formulation;
    if (detailedProduct.composition) product.composition = detailedProduct.composition;
    if (detailedProduct.description) product.description = detailedProduct.description;
    if (detailedProduct.overview) product.overview = detailedProduct.description;
    if (detailedProduct.keyBenefits) product.key_benefits = detailedProduct.keyBenefits;
    if (detailedProduct.recommendedCrops) product.target_crops = detailedProduct.recommendedCrops;
    if (detailedProduct.targetPests) product.targetPests = detailedProduct.targetPests;
    if (detailedProduct.targetDiseases) product.targetDiseases = detailedProduct.targetDiseases;
    if (detailedProduct.dosage) product.usage_dosage = detailedProduct.dosage;
    if (detailedProduct.packaging) product.packSizes = detailedProduct.packaging;
    
    console.log(`✅ Updated ${product.name}`);
  }
}

// Write the updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('\n🎉 Product catalog fully updated!');
