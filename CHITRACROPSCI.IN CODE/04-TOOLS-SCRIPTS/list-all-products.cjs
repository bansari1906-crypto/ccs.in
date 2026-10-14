const fs = require('fs');
const path = require('path');

const productCatalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');

const catalog1 = JSON.parse(fs.readFileSync(productCatalogPath, 'utf8'));
const catalog2 = JSON.parse(fs.readFileSync(officialCatalogPath, 'utf8'));

console.log('=== product-catalog.json products ===');
catalog1.forEach(p => {
  console.log(`- ${p.name}`);
});

console.log('\n=== official-product-catalog.json products ===');
catalog2.forEach(p => {
  console.log(`- ${p.name}`);
});
