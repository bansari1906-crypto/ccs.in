
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'src', 'data');

// Step 1: Create backup of current product-catalog.json
const currentCatalogPath = path.join(DATA_DIR, 'product-catalog.json');
const backupPath = path.join(DATA_DIR, 'product-catalog-backup.json');
const officialCatalogPath = path.join(DATA_DIR, 'official-product-catalog.json');

console.log('Step 1: Creating backup...');

if (fs.existsSync(currentCatalogPath)) {
  fs.copyFileSync(currentCatalogPath, backupPath);
  console.log('✅ Backup created: product-catalog-backup.json');
}

// Step 2: Read current and official catalogs
const currentCatalog = JSON.parse(fs.readFileSync(currentCatalogPath, 'utf-8'));
const officialCatalog = JSON.parse(fs.readFileSync(officialCatalogPath, 'utf-8'));

// Step 3: Generate verification report
const currentProductNames = new Set(currentCatalog.map(p => p.name));
const officialProductNames = new Set(officialCatalog.map(p => p.name));

// Find duplicates in current catalog
const nameCount = {};
const duplicates = [];
for (const product of currentCatalog) {
  if (nameCount[product.name]) {
    duplicates.push(product.name);
  } else {
    nameCount[product.name] = 1;
  }
}

// Find missing and extra products
const missingProducts = [...officialProductNames].filter(name => !currentProductNames.has(name));
const extraProducts = [...currentProductNames].filter(name => !officialProductNames.has(name));

// Find products with incorrect names (not in official list)
const incorrectNames = [];
for (const product of currentCatalog) {
  if (!officialProductNames.has(product.name)) {
    incorrectNames.push(product.name);
  }
}

const report = {
  timestamp: new Date().toISOString(),
  totalProductsBefore: currentCatalog.length,
  totalProductsAfter: officialCatalog.length,
  duplicateProducts: [...new Set(duplicates)],
  missingProducts: missingProducts,
  extraProducts: extraProducts,
  incorrectProductNames: incorrectNames,
  productsToRestore: officialCatalog.map(p => p.name)
};

// Write verification report
const reportPath = path.join(DATA_DIR, 'product-verification-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('✅ Verification report generated: product-verification-report.json');
console.log('✅ Report details:');
console.log('  • Total products before:', currentCatalog.length);
console.log('  • Total products after:', officialCatalog.length);
console.log('  • Duplicate products:', [...new Set(duplicates)].length);
console.log('  • Missing products:', missingProducts.length);
console.log('  • Extra products:', extraProducts.length);

// Step 4: Restore official catalog
console.log('\nStep 4: Restoring official catalog...');
fs.writeFileSync(currentCatalogPath, JSON.stringify(officialCatalog, null, 2));

console.log('✅ Official catalog restored successfully!');
