const fs = require('fs');
const path = require('path');

// Read user product data
const userProducts = JSON.parse(fs.readFileSync(path.join(__dirname, 'user-product-data.json'), 'utf8'));

// Read official catalog
const officialCatalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'official-product-catalog.json'), 'utf8'));

const officialProductNames = officialCatalog.map(p => p.name.toLowerCase().trim());

const missingProducts = userProducts.filter(up => {
  const name = up.name.toLowerCase().trim();
  return !officialProductNames.includes(name);
});

console.log('Missing products from catalog:');
console.log(missingProducts.map(p => p.name));
console.log('Total missing:', missingProducts.length);

// Write missing products to a file
fs.writeFileSync(path.join(__dirname, 'missing-products.json'), JSON.stringify(missingProducts, null, 2));
console.log('Missing products saved to missing-products.json');
