
const fs = require('fs');
const path = require('path');

// Define the brochure product list with exact categories
const brochureProducts = {
  "INSECTICIDE": [
    "CCS-NEEM 100",
    "HUKUMAT",
    "PLATINUM-5",
    "ATTACK-505",
    "LASKAR",
    "NOVA-404",
    "BHISMA GOLD",
    "ATTACK-20",
    "CHITGOR",
    "BENZO FIRE",
    "CRETA SUPER",
    "C-IMIDA",
    "C-IMIDA SUPER",
    "AGNEEPATH SC",
    "CHITARA",
    "BENZO KILL",
    "MONOSIL",
    "AGNEEPATH GR",
    "FEURADON-3G",
    "FIMIDA-40",
    "FENDOL-DP",
    "ATTACK-10 G",
    "DUALSTRIKE GR",
    "CHIT PRIDE",
    "QUEENPHOS",
    "CHITRA PYRAD",
    "ABACHIT",
    "ATTACK-50",
    "BENZO NIL",
    "AAKRAMAN",
    "PRIDEZOLE",
    "CHITARA GOLD",
    "KILL-LARVA",
    "CYQ-320",
    "MORPHIS",
    "CHIT FIGHTER",
    "CHITWEED"
  ],
  "FUNGICIDE": [
    "CYMO PLUS",
    "KRANTIKARI",
    "JORAWAR",
    "SHAKTIMAN",
    "PRO-VALIDA",
    "VANDAN",
    "TEBU SF",
    "CHITRA M-45",
    "VITARA GOLD",
    "CHITRA-COC",
    "FUNGASTIN",
    "MR.THANKS",
    "KARGIL-75",
    "METMAX",
    "SEED MAX PRO",
    "CHITRA DEFEND",
    "CAPHEXA",
    "CHITRACOL",
    "SAFE COVER",
    "CHITHEXA GOLD",
    "HARIYALI SULF-80",
    "TEBU TRY",
    "AZOTRI PLUS",
    "CHIT HEXA",
    "SEED MAX",
    "AZTRIX",
    "AZOTECH",
    "DIFINE-25",
    "PICOXY ZOLE",
    "PYRAMET",
    "TEBUZOLE SUPER",
    "CHITRA SARTHI"
  ],
  "HERBICIDE": [
    "HIT-WICKET",
    "KILL-41",
    "PENDI-STOP",
    "TEBUZOLE",
    "KILL-71",
    "CHITRAZINE",
    "CHIT-OXY",
    "QUIZFOP-10",
    "CHITWEED SUPER",
    "JODIDAR",
    "PENDI-STOP EXTRA",
    "BATALIYAN",
    "CHITMIZA",
    "SULFO-ON",
    "TEMBA",
    "CHITMIZA-10",
    "BHAGAO",
    "CHITRA MSM"
  ],
  "PGR": [
    "ACTIVE 100",
    "SUPPORTER",
    "FLOWER PLUS",
    "HARIYALI GOLD PLUS",
    "HAMLAVAR",
    "CCS-303",
    "CCS-CARB",
    "CCS-CARB ULTRA",
    "MULTI POWER 55",
    "FLO-JEET",
    "WELCOME HONEY BEE",
    "STORAGE",
    "AMITRA 80",
    "CHIT BRIGHT",
    "DHARTI RATAN",
    "ROOT RATAN",
    "DR ROOT RAJA",
    "ROOT RAJA",
    "FLO-AVTAR",
    "CRAGIBB",
    "MENTED SUPER",
    "ON SPOT",
    "CHITRA BOOST",
    "CHITRA PACLO",
    "CCS BOOSTER",
    "CHITGIBB EZY"
  ],
  "FERTILIZER": [
    "CHITRA CN",
    "CHITRA MEG",
    "CHITRA SONITE",
    "CHITRA AMS",
    "CHITRA FE",
    "CHITRA CALBO",
    "CHITRA ZINC",
    "CHITRA NPK 19-19-19",
    "CHITRA NPK 13-40-13",
    "CHITRA NPK 00-52-34",
    "CHITRA NPK 12-61-00",
    "CHITRA NPK 13-00-45",
    "CHITRA NPK 00-00-50",
    "CHITRA NPK NP",
    "CHITRA NKP NPK",
    "CHITRA PKA NPK",
    "CHITRA 888",
    "CHITRA CAL-11",
    "CHITRA ZINCOOX",
    "CHITRA SOP"
  ]
};

// Create a mapping from product name to category
const productToCategory = {};
for (const [category, products] of Object.entries(brochureProducts)) {
  for (const product of products) {
    productToCategory[product.toUpperCase()] = category;
  }
}

// Calculate total brochure products
let totalBrochureProducts = 0;
for (const products of Object.values(brochureProducts)) {
  totalBrochureProducts += products.length;
}

// Paths
const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
const imagesDir = path.join(__dirname, 'public', 'assets', 'products');
const newImagesDir = path.join(imagesDir, 'NEW PRODUCTS');

// Load current catalog
let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (e) {
  console.error("Error loading catalog:", e);
  process.exit(1);
}

// Get list of available images
const availableImages = new Set();
const addImagesFromDir = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addImagesFromDir(fullPath);
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.webp')) {
      availableImages.add(file.toLowerCase());
    }
  }
};
addImagesFromDir(imagesDir);
console.log("Available images count:", availableImages.size);

// Report variables
const report = {
  totalBrochureProducts,
  totalCatalogProducts: catalog.length,
  missingProducts: [],
  missingImages: [],
  wrongCategories: [],
  productsFixed: [],
  productsVerified: 0
};

// Normalize product name for comparison
const normalizeName = (name) => name.toUpperCase().trim();

// Check and update catalog
for (let i = 0; i < catalog.length; i++) {
  const product = catalog[i];
  const normalizedName = normalizeName(product.name);
  const correctCategory = productToCategory[normalizedName];

  // Check if product is in brochure list
  if (!correctCategory) {
    report.missingProducts.push(product.name);
    continue;
  }

  // Check category
  if (product.category !== correctCategory) {
    report.wrongCategories.push({
      name: product.name,
      old: product.category,
      new: correctCategory
    });
    catalog[i].category = correctCategory;
    report.productsFixed.push(product.name);
  }

  // Check image path
  if (product.images && product.images.length > 0) {
    const imagePath = product.images[0];
    const imageFileName = path.basename(imagePath).toLowerCase();

    // Check if file exists in either directory
    const existsInMain = fs.existsSync(path.join(imagesDir, path.basename(imagePath)));
    const existsInNew = fs.existsSync(path.join(newImagesDir, path.basename(imagePath)));

    if (!existsInMain && !existsInNew) {
      // Try to find matching image
      let foundMatch = false;
      for (const img of availableImages) {
        if (img.includes(normalizedName.replace(/\s+/g, '').replace(/-/g, ''))) {
          foundMatch = true;
          // Update image path
          const subDir = existsInNew ? 'NEW PRODUCTS/' : '';
          catalog[i].images = [`/assets/products/${subDir}${path.basename(img)}`];
          console.log(`Updated image for ${product.name} to ${img}`);
        }
      }

      if (!foundMatch) {
        report.missingImages.push(product.name);
      }
    }
  } else {
    report.missingImages.push(product.name);
  }

  report.productsVerified++;
}

// Check for missing brochure products
const catalogNames = new Set(catalog.map(p => normalizeName(p.name)));
for (const [cat, products] of Object.entries(brochureProducts)) {
  for (const productName of products) {
    if (!catalogNames.has(normalizeName(productName))) {
      report.missingProducts.push(productName);
    }
  }
}

// Write updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

// Generate and save report
const reportPath = path.join(__dirname, 'final-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

// Print report
console.log("\n==== FINAL REPORT ====");
console.log("Total brochure products:", report.totalBrochureProducts);
console.log("Total catalog products:", report.totalCatalogProducts);
console.log("Missing products (not in catalog):", report.missingProducts.length, report.missingProducts);
console.log("Missing images:", report.missingImages.length, report.missingImages);
console.log("Wrong categories fixed:", report.wrongCategories.length, report.wrongCategories);
console.log("Products fixed:", report.productsFixed.length, report.productsFixed);
console.log("Products verified:", report.productsVerified);

console.log("\nReport saved to:", reportPath);
