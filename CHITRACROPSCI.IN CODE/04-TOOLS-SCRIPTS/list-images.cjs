const fs = require('fs');
const path = require('path');

// Directories to check
const dirs = [
  path.join(__dirname, 'public', 'images', 'products'),
  path.join(__dirname, 'public', 'assets', 'products'),
];

const allImages = [];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      allImages.push({
        name: file,
        path: path.join(dir, file),
        normalized: file.toLowerCase().replace(/\s+/g, '-'),
      });
    });
  }
});

console.log('Found images:', allImages.length);
console.log('\nAll product images:');
allImages.forEach(img => {
  console.log(`- ${img.name} (${img.normalized})`);
});

// Now let's check our product catalog
const catalog = require('./src/data/product-catalog.json');

console.log('\n\nChecking product images:');
let missing = 0;
catalog.forEach(product => {
  const imgPath = product.images?.[0];
  if (imgPath) {
    const filename = imgPath.split('/').pop();
    const found = allImages.some(img => 
      img.name === filename || img.normalized === filename.toLowerCase().replace(/\s+/g, '-')
    );
    if (!found) {
      missing++;
      console.log(`❌ Missing image for ${product.name}: ${filename}`);
    }
  }
});
console.log(`\nTotal missing: ${missing}`);

// Save the image list
fs.writeFileSync(
  path.join(__dirname, 'product-images.json'),
  JSON.stringify(allImages, null, 2)
);
console.log('Image list saved to product-images.json');
