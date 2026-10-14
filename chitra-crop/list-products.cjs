const fs = require('fs');
const path = require('path');

const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(officialCatalogPath, 'utf8'));

console.log('Official product catalog product names:');
catalog.forEach(p => {
  console.log('- ' + p.name);
});
