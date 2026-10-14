
const fs = require('fs');
const path = require('path');

const BROCHURE_PRODUCTS = {
  INSECTICIDE: [
    "CCS-NEEM 100", "HUKUMAT", "PLATINUM-5", "ATTACK-505", "LASKAR", "NOVA-404",
    "BHISMA GOLD", "ATTACK-20", "CHITGOR", "BENZO FIRE", "CRETA SUPER", "C-IMIDA",
    "C-IMIDA SUPER", "AGNEEPATH SC", "CHITARA", "BENZO KILL", "MONOSIL", "AGNEEPATH GR",
    "FEURADON-3G", "FIMIDA-40", "FENDOL-DP", "ATTACK-10 G", "DUALSTRIKE GR",
    "CHIT PRIDE", "QUEENPHOS", "CHITRA PYRAD", "ABACHIT", "CHITWEED", "ATTACK-50",
    "BENZO NIL", "AAKRAMAN", "CHITARA GOLD", "KILL-LARVA", "CYQ-320", "MORPHIS",
    "CHIT FIGHTER"
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
    "BATALIYAN", "CHITMIZA", "SULFO-ON", "TEMBA", "CHITMIZA-10", "BHAGAO",
    "CHITRA MSM"
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
    "CHITRA CALBO", "CHITRA ZINC", "CHITRA NPK 19-19-19", "CHITRA NPK 13-40-13",
    "CHITRA NPK 00-52-34", "CHITRA NPK 12-61-00", "CHITRA NPK 13-00-45",
    "CHITRA NPK 00-00-50", "CHITRA NPK NP", "CHITRA NKP NPK", "CHITRA PKA NPK",
    "CHITRA 888", "CHITRA CAL-11", "CHITRA ZINCOOX", "CHITRA SOP"
  ]
};

// Helper functions
const normalizeProductName = (name) => name.toUpperCase().trim().replace(/\s+/g, ' ');
const getProductSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Load catalog
const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Load available images
const imagesDir = path.join(__dirname, 'public', 'assets', 'products');
const newImagesDir = path.join(imagesDir, 'NEW PRODUCTS');

const availableImages = new Map();
const scanDirectory = (dir, prefix = '') => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, prefix + file + '/');
    } else {
      const lowerName = file.toLowerCase();
      availableImages.set(lowerName, prefix + file);
    }
  }
};
scanDirectory(imagesDir);
console.log(`Found ${availableImages.size} available product images`);

// Create product maps
const catalogByName = new Map();
const catalogBySlug = new Map();
for (const product of catalog) {
  const normName = normalizeProductName(product.name);
  catalogByName.set(normName, product);
  catalogBySlug.set(product.slug, product);
}

// Initialize report
const report = {
  totalBrochureProducts: 0,
  totalCatalogProducts: catalog.length,
  missingProducts: [],
  missingImages: [],
  missingDetails: [],
  wrongCategories: [],
  brokenRoutes: [],
  productsFixed: [],
  productsVerified: 0
};

// Count total brochure products
for (const prods of Object.values(BROCHURE_PRODUCTS)) {
  report.totalBrochureProducts += prods.length;
}

// Step 1: Verify brochure products
for (const [expectedCategory, brochureNames] of Object.entries(BROCHURE_PRODUCTS)) {
  for (const brochureName of brochureNames) {
    const normName = normalizeProductName(brochureName);
    const product = catalogByName.get(normName);

    if (!product) {
      console.log(`Missing product: ${brochureName}`);
      report.missingProducts.push(brochureName);
      continue;
    }

    // Step 2: Verify category
    if (product.category !== expectedCategory) {
      console.log(`Wrong category for ${brochureName}: expected ${expectedCategory}, got ${product.category}`);
      report.wrongCategories.push({ product: brochureName, expected: expectedCategory, actual: product.category });
      // Fix category
      const idx = catalog.findIndex(p => normalizeProductName(p.name) === normName);
      if (idx !== -1) {
        catalog[idx].category = expectedCategory;
        report.productsFixed.push(brochureName);
      }
    }

    // Step 3: Verify image
    let imageOkay = false;
    if (product.images && product.images.length > 0) {
      const imgPath = product.images[0];
      const imgFileName = path.basename(imgPath).toLowerCase();
      if (availableImages.has(imgFileName)) {
        imageOkay = true;
      } else {
        // Try to find image by product name
        let foundImage = null;
        for (const [imgLower, imgFullPath] of availableImages) {
          if (imgLower.includes(normName.replace(/[^a-z0-9]/g, ''))) {
            foundImage = `/assets/products/${imgFullPath}`;
            break;
          }
        }
        if (foundImage) {
          const idx = catalog.findIndex(p => normalizeProductName(p.name) === normName);
          if (idx !== -1) {
            catalog[idx].images = [foundImage];
            imageOkay = true;
            report.productsFixed.push(`${brochureName} (image fixed)`);
          }
        }
      }
    }

    if (!imageOkay) {
      report.missingImages.push(brochureName);
    }

    // Step 4: Verify details
    const requiredFields = [
      'technicalName', 'description', 'dose', 'packSizes', 'uses',
      'benefits', 'suitableCrops', 'applicationMethod'
    ];
    const missing = [];
    for (const field of requiredFields) {
      const value = product[field];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      report.missingDetails.push({ product: brochureName, fields: missing });
    }

    report.productsVerified++;
  }
}

// Save updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

// Save report
const reportPath = path.join(__dirname, 'complete-verification-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

// Print report
console.log('\n===============================');
console.log('COMPLETE VERIFICATION REPORT');
console.log('===============================');
console.log('Total brochure products:', report.totalBrochureProducts);
console.log('Total catalog products:', report.totalCatalogProducts);
console.log('Missing products:', report.missingProducts.length, report.missingProducts);
console.log('Missing images:', report.missingImages.length, report.missingImages);
console.log('Missing details:', report.missingDetails.length, report.missingDetails);
console.log('Wrong categories:', report.wrongCategories.length, report.wrongCategories);
console.log('Products fixed:', report.productsFixed.length, report.productsFixed);
console.log('Products verified:', report.productsVerified);

console.log('\nSaved to:', reportPath);
