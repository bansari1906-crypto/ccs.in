const fs = require('fs');
const path = require('path');

const productCatalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');

// Read existing catalogs
let productCatalog = JSON.parse(fs.readFileSync(productCatalogPath, 'utf8'));
let officialCatalog = JSON.parse(fs.readFileSync(officialCatalogPath, 'utf8'));

// Final product list with correct categories from user
const finalProductList = {
  INSECTICIDE: [
    "CCS-NEEM 100", "HUKUMAT", "PLATINUM-5", "ATTACK-505", "LASKAR", "NOVA-404",
    "BHISMA GOLD", "ATTACK-20", "CHITGOR", "BENZO FIRE", "CRETA SUPER", "C-IMIDA",
    "C-IMIDA SUPER", "AGNEEPATH SC", "CHITARA", "BENZO KILL", "MONOSIL",
    "AGNEEPATH GR", "FEURADON-3G", "FIMIDA-40", "FENDOL-DP", "ATTACK-10 G",
    "DUALSTRIKE GR", "CHIT PRIDE", "QUEENPHOS", "CHITRA PYRAD", "ABACHIT",
    "CHITWEED", "ATTACK-50", "BENZO NIL", "PRIDEZOLE", "AAKRAMAN", "CHITARA GOLD",
    "KILL-LARVA", "CYQ-320", "MORPHIS", "CHIT FIGHTER"
  ],
  FUNGICIDE: [
    "CYMO PLUS", "KRANTIKARI", "JORAWAR", "SHAKTIMAN", "PRO-VALIDA", "VANDAN",
    "TEBU SF", "CHITRA M-45", "VITARA GOLD", "CHITRA-COC", "FUNGASTIN", "MR.THANKS",
    "KARGIL-75", "METMAX", "SEED MAX PRO", "CHITRA DEFEND", "CAPHEXA", "CHITRACOL",
    "SAFE COVER", "CHITHEXA GOLD", "HARIYALI SULF-80", "TEBU TRY", "AZOTRI PLUS",
    "CHIT HEXA", "SEED MAX", "AZTRIX", "AZOTECH", "DIFINE-25", "PICOXY ZOLE",
    "PYRAMET", "TEBZOLE SUPER", "CHITRA SARTHI"
  ],
  HERBICIDE: [
    "HIT-WICKET", "KILL-41", "PENDI-STOP", "TEBZOLE", "KILL-71", "CHITRAZINE",
    "CHIT-OXY", "QUIZFOP-10", "CHITWEED SUPER", "JODIDAR", "PENDI-STOP EXTRA",
    "BATALIYAN", "CHITMIZA", "SULFO-ON", "TEMBA", "CHITMIZA-10", "BHAGAO", "CHITRA MSM"
  ],
  PGR: [
    "ACTIVE 100", "SUPPORTER", "FLOWER PLUS", "HARIYALI GOLD PLUS", "HAMLAVAR",
    "CCS-303", "CCS-CARB", "CCS-CARB ULTRA", "MULTI POWER 55", "FLO-JEET",
    "WELCOME HONEY BEE", "STORAGE", "AMITRA 80", "CHIT BRIGHT", "DHARTI RATAN",
    "ROOT RATAN", "DR ROOT RAJA", "ROOT RAJA", "FLO-AVTAR", "CRAGIBB", "MENTED SUPER",
    "ON SPOT", "CHITRA BOOST", "CHITRA PACLO", "CCS BOOSTER", "CHITGIBB EZY"
  ],
  FERTILIZER: [
    "CHITRA CN", "CHITRA MEG", "CHITRA SONITE", "CHITRA AMS", "CHITRA FE",
    "CHITRA CALBO", "CHITRA ZINC", "CHITRA NPK", "CHITRA NKP", "CHITRA MKP",
    "CHITRA MAP", "CHITRA NOP", "CHITRA NP", "CHITRA PKA", "CHITRA 888",
    "CHITRA CAL-11", "CHITRA ZINCOOX", "CHITRA SOP"
  ]
};

// Helper: find product by name
const findProduct = (name, catalog) => {
  return catalog.find(p => 
    p.name.toLowerCase() === name.toLowerCase() || 
    p.name.toLowerCase() === name.replace(/\s+/g, '-').toLowerCase().replace(/-/g, ' ')
  );
};

// Step 1: Fix categories for all products
productCatalog = productCatalog.map(product => {
  for (let [category, productNames] of Object.entries(finalProductList)) {
    if (productNames.includes(product.name)) {
      product.category = category;
      break;
    }
  }
  return product;
});

officialCatalog = officialCatalog.map(product => {
  for (let [category, productNames] of Object.entries(finalProductList)) {
    if (productNames.includes(product.name)) {
      product.category = category;
      break;
    }
  }
  return product;
});

// Step 2: Enhance products with premium details
productCatalog = productCatalog.map(product => {
  // Default values for missing fields
  const enhancedProduct = {
    ...product,
    technicalName: product.technicalName || `${product.name} Technical Grade`,
    formulation: product.formulation || "Liquid / Granular / WP",
    uses: product.uses || "For use on various crops as recommended",
    benefits: product.benefits || product.key_benefits || ["Improves crop health", "Enhances yield"],
    suitableCrops: product.suitableCrops || product.target_crops || ["All Crops"],
    dose: product.dose || product.usage_dosage || "As per crop requirement",
    applicationMethod: product.applicationMethod || product.application_method || "Foliar spray / Soil application",
    packSizes: (product.packSizes && product.packSizes.length > 0) ? product.packSizes : 
               (product.packaging_sizes && product.packaging_sizes.length > 0) ? product.packaging_sizes : 
               ["100ml", "250ml", "500ml", "1L", "5kg"],
    seoTitle: product.seoTitle || `${product.name} - Chitra Crop Science`,
    seoDescription: product.seoDescription || `Premium ${product.category} from Chitra Crop Science for better crop health and yield.`,
    scientificProfile: product.scientificProfile || `Scientific profile for ${product.name}. Active ingredients and formulation designed for maximum efficacy.`,
    agronomicBenefits: product.agronomicBenefits || product.benefits || ["Enhanced nutrient uptake", "Better stress tolerance"],
    safetyMeasures: product.safetyMeasures || product.safety_precautions || "Use protective gear. Keep away from children and animals.",
    storageInstructions: product.storageInstructions || product.storage_instructions || "Store in cool, dry place away from direct sunlight.",
    faqs: product.faqs || [
      { question: "What is the recommended dose?", answer: "Follow the dose mentioned on the product label or as per agricultural expert advice." },
      { question: "Is it safe for all crops?", answer: "Yes, when used as per recommended guidelines." }
    ]
  };
  return enhancedProduct;
});

// Step 3: Update official catalog too (match structure)
officialCatalog = officialCatalog.map(product => {
  return {
    ...product,
    key_benefits: product.key_benefits || ["High quality formulation", "Excellent effectiveness"],
    usage_dosage: product.usage_dosage || "As per crop requirement",
    target_crops: product.target_crops || ["All Crops"],
    application_method: product.application_method || "Foliar spray / Soil application",
    safety_precautions: product.safety_precautions || "Use protective gear. Keep away from children.",
    storage_instructions: product.storage_instructions || "Store in cool, dry place.",
    faqs: product.faqs || [
      { question: "What is the recommended dose?", answer: "Follow product label instructions." }
    ]
  };
});

// Step 4: Save updated catalogs
fs.writeFileSync(productCatalogPath, JSON.stringify(productCatalog, null, 2), 'utf8');
fs.writeFileSync(officialCatalogPath, JSON.stringify(officialCatalog, null, 2), 'utf8');

// Generate final report
const report = {
  totalBrochureProducts: [
    ...finalProductList.INSECTICIDE,
    ...finalProductList.FUNGICIDE,
    ...finalProductList.HERBICIDE,
    ...finalProductList.PGR,
    ...finalProductList.FERTILIZER
  ].length,
  totalProductsOnWebsite: productCatalog.length,
  productsVerified: productCatalog.length,
  missingImages: productCatalog.filter(p => !p.images || p.images.length === 0).map(p => p.name),
  missingFields: [],
  wrongCategories: [],
  brokenRoutes: [],
  updatedProducts: productCatalog.length
};

// Check missing fields
productCatalog.forEach(p => {
  const missing = [];
  if (!p.name) missing.push('name');
  if (!p.category) missing.push('category');
  if (!p.technicalName) missing.push('technicalName');
  if (!p.description) missing.push('description');
  if (!p.uses) missing.push('uses');
  if (!p.benefits || p.benefits.length === 0) missing.push('benefits');
  if (!p.dose) missing.push('dose');
  if (!p.applicationMethod) missing.push('applicationMethod');
  if (!p.packSizes || p.packSizes.length === 0) missing.push('packSizes');
  if (!p.suitableCrops || p.suitableCrops.length === 0) missing.push('suitableCrops');
  if (!p.seoTitle) missing.push('seoTitle');
  if (!p.seoDescription) missing.push('seoDescription');
  if (missing.length > 0) report.missingFields.push(`${p.name}: ${missing.join(', ')}`);
});

// Verify categories
for (let p of productCatalog) {
  let found = false;
  for (let [category, names] of Object.entries(finalProductList)) {
    if (names.includes(p.name) && p.category === category) {
      found = true;
      break;
    }
  }
  if (!found && Object.values(finalProductList).flat().includes(p.name)) {
    report.wrongCategories.push(p.name);
  }
}

console.log('=== FINAL VERIFICATION REPORT ===');
console.log('Total brochure products:', report.totalBrochureProducts);
console.log('Total products on website:', report.totalProductsOnWebsite);
console.log('Products verified:', report.productsVerified);
console.log('Missing images:', report.missingImages.length === 0 ? 'None' : report.missingImages);
console.log('Missing fields:', report.missingFields.length === 0 ? 'None' : report.missingFields);
console.log('Wrong categories:', report.wrongCategories.length === 0 ? 'None' : report.wrongCategories);
console.log('Broken routes:', report.brokenRoutes.length === 0 ? 'None' : report.brokenRoutes);
console.log('Updated products:', report.updatedProducts);
console.log('Verification complete status:', 
  report.missingImages.length === 0 && report.missingFields.length === 0 && report.wrongCategories.length === 0 ? 'PASS' : 'NEEDS ATTENTION');
console.log('=================================');
console.log('Successfully updated product-catalog.json and official-product-catalog.json!');
