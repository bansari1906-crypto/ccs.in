const fs = require('fs');
const path = require('path');

// Load product catalog
const catalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// User-provided product list to check
const userProducts = [
  "AAKRAMAN", "ABACHIT", "ACTIVE 100", "AGNEEPATH GR", "AGNEEPATH SC", "AZOTECH",
  "AZOTRI PLUS", "AZTRIX", "BATALIYAN", "BENZO KILL", "BENZO NIL", "BENZO FIRE",
  "BHAGAO", "BHISMA GOLD", "C-IMIDA SUPER", "CCS-CARB ULTRA", "CCS-CARB", "CCS-NEEM 100",
  "CHIT FIGHTER", "CHIT PRIDE", "CHITARA GOLD", "CHITARA", "CHITGIBB EZY", "CHITGOR",
  "CHITRA OXY", "CHITRA 888", "CHITRA AMS", "CHITRA BOOST", "CHITRA CALBO", "CHITRA CAL-11",
  "CHITRA CN", "CHITRA DEFEND", "CHITRA FE", "CHITRA M-45", "CHITRA MAP NPK", "CHITRA MAX",
  "CHITRA MEG", "CHITRA MKP NPK", "CHITRA NK", "CHITRA NKP NPK", "CHITRA NOP NPK", "CHITRA NP NPK",
  "CHITRA NP", "CHITRA NPK 13-40-13", "CHITRA NPK 19-19-19", "CHITRA PACLO", "CHITRA PKA NPK",
  "CHITRA PYRAD", "CHITRA SARTHI", "CHITRA SONITE", "CHITRA SOP", "CHITRA ZIB", "CHITRA ZINCOOX",
  "CHITRA ZINC", "CHITRA ZN", "CHITRA-COC", "CHITRACOL", "CHITRAZINE", "CHITWEED SUPER", "CHITWEED",
  "CLEAN N CLEAR", "CRAGIBB", "CRETA SUPER", "CYMO PLUS", "CYQ-320", "DHARTI RATAN", "DIFINE-25",
  "DUALSTRIKE", "FENDOL-DP", "FEURADON-3G", "FLO-AVTAR", "FLO-JEET", "FLOWER PLUS", "FUNGASTIN",
  "HARIYALI SULF-80", "HARIYALI", "HIT-WICKET", "WELCOME HONEY BEE", "HUKUMAT", "JODIDAR", "JORAWAR",
  "KARGIL-75", "KILL-41", "KILL-71", "KILL-LARVA", "KRANTIKARI", "LASKAR", "MENTED SUPER", "METMAX",
  "MORPHIS", "MR.THANKS", "MULTI POWER 55", "NOVA-404", "ON SPOT", "PENDI-STOP", "PICOXY ZOLE",
  "PLATINUM-5", "PRIDEZOLE", "PRO-VALIDA", "PYRAMET", "QUEENPHOS", "QUIZFOP-10", "ROOT RAJA",
  "ROOT RATAN PACK", "ROOT RATAN", "SAFE COVER", "SEED MAX PRO", "SEED MAX", "SHAKTIMAN",
  "SULFO-ON", "SUPPORTER", "TEBU SF", "TEBU TRY", "TEBZOLE SUPER", "TEBZOLE", "VANDAN",
  "VITARA GOLD"
];

// Products to specifically check for duplicates
const duplicateCheckProducts = ["AAKRAMAN", "PRIDEZOLE", "FIMIDA-40", "HARIYALI SULF-80"];

// Initialize audit report
const report = {
  productsPresent: [],
  productsMissing: [],
  duplicateProductsRemoved: [],
  productsWithMissingDetails: [],
  productsWithBrokenImages: [],
  productsWithWrongCategory: [],
  finalTotalProductCount: 0,
  finalStatus: "FAIL"
};

// Step 1: Check product presence
console.log("Checking product presence...");
userProducts.forEach(userProduct => {
  const found = catalog.find(p => 
    p.name.toLowerCase() === userProduct.toLowerCase() || 
    p.name.toLowerCase() === userProduct.toLowerCase().replace(/\s+/g, '-') ||
    p.name.toLowerCase() === userProduct.toLowerCase().replace(/\s+/g, '')
  );
  if (found) {
    report.productsPresent.push(userProduct);
  } else {
    report.productsMissing.push(userProduct);
  }
});

// Step 2: Check for duplicates
console.log("Checking for duplicates...");
const seenNames = {};
const seenSlugs = {};
const duplicateIndices = [];
catalog.forEach((product, index) => {
  // Check name duplicates
  if (seenNames[product.name.toLowerCase()]) {
    console.log(`Duplicate found: ${product.name} (indexes ${seenNames[product.name.toLowerCase()]} and ${index})`);
    duplicateIndices.push(index); // Mark later one for removal
  } else {
    seenNames[product.name.toLowerCase()] = index;
  }

  // Check slug duplicates
  if (seenSlugs[product.slug]) {
    console.log(`Duplicate slug found: ${product.slug} (indexes ${seenSlugs[product.slug]} and ${index})`);
  } else {
    seenSlugs[product.slug] = index;
  }
});

// Step 3: Check for missing details
console.log("Checking for missing details...");
catalog.forEach(product => {
  const missing = [];
  if (!product.technicalName) missing.push("technicalName");
  if (!product.formulation) missing.push("formulation");
  if (!product.description) missing.push("description");
  if (!product.benefits || product.benefits.length === 0) missing.push("benefits");
  if (!product.dose) missing.push("dose");
  if (!product.suitableCrops || product.suitableCrops.length === 0) missing.push("suitableCrops");
  if (!product.packSizes || product.packSizes.length === 0) missing.push("packSizes");
  if (!product.seoTitle) missing.push("seoTitle");
  if (!product.seoDescription) missing.push("seoDescription");
  if (!product.images || product.images.length === 0) missing.push("images");
  if (missing.length > 0) {
    report.productsWithMissingDetails.push({
      name: product.name,
      missing: missing
    });
  }
});

// Step 4: Check for wrong categories (using user's list as reference)
console.log("Checking for wrong categories...");
const expectedCategories = {
  "AAKRAMAN": "INSECTICIDE",
  "ABACHIT": "INSECTICIDE",
  "ACTIVE 100": "PGR",
  "AGNEEPATH GR": "INSECTICIDE",
  "AGNEEPATH SC": "INSECTICIDE",
  "AZOTECH": "FUNGICIDE",
  "AZOTRI PLUS": "FUNGICIDE",
  "AZTRIX": "FUNGICIDE",
  "BATALIYAN": "HERBICIDE",
  "BENZO KILL": "INSECTICIDE",
  "BENZO NIL": "INSECTICIDE",
  "BENZO FIRE": "INSECTICIDE",
  "BHAGAO": "HERBICIDE",
  "BHISMA GOLD": "INSECTICIDE",
  "C-IMIDA SUPER": "INSECTICIDE",
  "CCS-CARB ULTRA": "PGR",
  "CCS-CARB": "PGR",
  "CCS-NEEM 100": "INSECTICIDE",
  "CHIT FIGHTER": "INSECTICIDE",
  "CHIT PRIDE": "INSECTICIDE",
  "CHITARA GOLD": "INSECTICIDE",
  "CHITARA": "INSECTICIDE",
  "CHITGIBB EZY": "PGR",
  "CHITGOR": "INSECTICIDE",
  "CHITRA OXY": "HERBICIDE",
  "CHITRA 888": "FERTILIZER",
  "CHITRA AMS": "FERTILIZER",
  "CHITRA BOOST": "PGR",
  "CHITRA CALBO": "FERTILIZER",
  "CHITRA CAL-11": "FERTILIZER",
  "CHITRA CN": "FERTILIZER",
  "CHITRA DEFEND": "FUNGICIDE",
  "CHITRA FE": "FERTILIZER",
  "CHITRA M-45": "FUNGICIDE",
  "CHITRA MAP NPK": "FERTILIZER",
  "CHITRA MAX": "FERTILIZER",
  "CHITRA MEG": "FERTILIZER",
  "CHITRA MKP NPK": "FERTILIZER",
  "CHITRA NK": "FERTILIZER",
  "CHITRA NKP NPK": "FERTILIZER",
  "CHITRA NOP NPK": "FERTILIZER",
  "CHITRA NP NPK": "FERTILIZER",
  "CHITRA NP": "FERTILIZER",
  "CHITRA NPK 13-40-13": "FERTILIZER",
  "CHITRA NPK 19-19-19": "FERTILIZER",
  "CHITRA PACLO": "PGR",
  "CHITRA PKA NPK": "FERTILIZER",
  "CHITRA PYRAD": "INSECTICIDE",
  "CHITRA SARTHI": "FUNGICIDE",
  "CHITRA SONITE": "FERTILIZER",
  "CHITRA SOP": "FERTILIZER",
  "CHITRA ZIB": "FERTILIZER",
  "CHITRA ZINCOOX": "FERTILIZER",
  "CHITRA ZINC": "FERTILIZER",
  "CHITRA ZN": "FERTILIZER",
  "CHITRA-COC": "FUNGICIDE",
  "CHITRACOL": "FUNGICIDE",
  "CHITRAZINE": "HERBICIDE",
  "CHITWEED SUPER": "HERBICIDE",
  "CHITWEED": "HERBICIDE",
  "CLEAN N CLEAR": "PGR",
  "CRAGIBB": "PGR",
  "CRETA SUPER": "INSECTICIDE",
  "CYMO PLUS": "FUNGICIDE",
  "CYQ-320": "INSECTICIDE",
  "DHARTI RATAN": "PGR",
  "DIFINE-25": "FUNGICIDE",
  "DUALSTRIKE": "INSECTICIDE",
  "FENDOL-DP": "INSECTICIDE",
  "FEURADON-3G": "INSECTICIDE",
  "FLO-AVTAR": "PGR",
  "FLO-JEET": "PGR",
  "FLOWER PLUS": "PGR",
  "FUNGASTIN": "FUNGICIDE",
  "HARIYALI SULF-80": "FUNGICIDE",
  "HARIYALI": "PGR",
  "HIT-WICKET": "HERBICIDE",
  "WELCOME HONEY BEE": "PGR",
  "HUKUMAT": "INSECTICIDE",
  "JODIDAR": "HERBICIDE",
  "JORAWAR": "FUNGICIDE",
  "KARGIL-75": "FUNGICIDE",
  "KILL-41": "HERBICIDE",
  "KILL-71": "HERBICIDE",
  "KILL-LARVA": "INSECTICIDE",
  "KRANTIKARI": "FUNGICIDE",
  "LASKAR": "INSECTICIDE",
  "MENTED SUPER": "PGR",
  "METMAX": "FUNGICIDE",
  "MORPHIS": "INSECTICIDE",
  "MR.THANKS": "FUNGICIDE",
  "MULTI POWER 55": "PGR",
  "NOVA-404": "INSECTICIDE",
  "ON SPOT": "PGR",
  "PENDI-STOP": "HERBICIDE",
  "PICOXY ZOLE": "FUNGICIDE",
  "PLATINUM-5": "INSECTICIDE",
  "PRIDEZOLE": "INSECTICIDE",
  "PRO-VALIDA": "FUNGICIDE",
  "PYRAMET": "FUNGICIDE",
  "QUEENPHOS": "INSECTICIDE",
  "QUIZFOP-10": "HERBICIDE",
  "ROOT RAJA": "PGR",
  "ROOT RATAN PACK": "PGR",
  "ROOT RATAN": "PGR",
  "SAFE COVER": "FUNGICIDE",
  "SEED MAX PRO": "FUNGICIDE",
  "SEED MAX": "FUNGICIDE",
  "SHAKTIMAN": "FUNGICIDE",
  "SULFO-ON": "HERBICIDE",
  "SUPPORTER": "PGR",
  "TEBU SF": "FUNGICIDE",
  "TEBU TRY": "FUNGICIDE",
  "TEBZOLE SUPER": "FUNGICIDE",
  "TEBZOLE": "HERBICIDE",
  "VANDAN": "FUNGICIDE",
  "VITARA GOLD": "FUNGICIDE"
};

catalog.forEach(product => {
  const expected = expectedCategories[product.name];
  if (expected && product.category !== expected) {
    report.productsWithWrongCategory.push({
      name: product.name,
      current: product.category,
      expected: expected
    });
  }
});

// Step 5: Remove duplicates (keep first occurrence, remove later ones)
console.log("Removing duplicates...");
const cleanedCatalog = catalog.filter((_, index) => !duplicateIndices.includes(index));

// Add removed duplicates to report
duplicateIndices.forEach(index => {
  report.duplicateProductsRemoved.push(catalog[index].name);
});

// Step 6: Update catalog
fs.writeFileSync(catalogPath, JSON.stringify(cleanedCatalog, null, 2), 'utf8');
report.finalTotalProductCount = cleanedCatalog.length;

// Step 7: Final status
report.finalStatus = 
  report.productsMissing.length === 0 &&
  report.productsWithMissingDetails.length === 0 &&
  report.productsWithBrokenImages.length === 0 &&
  report.productsWithWrongCategory.length === 0 ? "PASS" : "FAIL";

// Print final report
console.log("\n================ FINAL AUDIT REPORT ================");
console.log(`Total products in user list: ${userProducts.length}`);
console.log(`Products present: ${report.productsPresent.length}`);
console.log(`Products missing: ${report.productsMissing.length}`);
console.log(`Duplicates removed: ${report.duplicateProductsRemoved.length}`);
console.log(`Products with missing details: ${report.productsWithMissingDetails.length}`);
console.log(`Products with wrong category: ${report.productsWithWrongCategory.length}`);
console.log(`Final total product count: ${report.finalTotalProductCount}`);
console.log(`Final status: ${report.finalStatus}`);

if (report.productsMissing.length > 0) {
  console.log("\nMissing products:", report.productsMissing);
}
if (report.duplicateProductsRemoved.length > 0) {
  console.log("\nRemoved duplicates:", report.duplicateProductsRemoved);
}
if (report.productsWithMissingDetails.length > 0) {
  console.log("\nProducts with missing details:", report.productsWithMissingDetails);
}
if (report.productsWithWrongCategory.length > 0) {
  console.log("\nProducts with wrong category:", report.productsWithWrongCategory);
}
console.log("===================================================");
