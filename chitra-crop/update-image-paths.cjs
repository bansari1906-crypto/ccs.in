const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
const products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const updatedProducts = products.map(product => ({
  ...product,
  images: product.images ? product.images.map(img => img.replace('/assets/products/', '/products/')) : product.images
}));

fs.writeFileSync(catalogPath, JSON.stringify(updatedProducts, null, 2));
console.log('✅ Product image paths updated successfully!');
