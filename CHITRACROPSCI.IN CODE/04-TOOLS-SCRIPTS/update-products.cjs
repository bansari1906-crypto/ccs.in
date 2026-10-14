const fs = require('fs');
const path = require('path');

// Read user product data
const userProducts = JSON.parse(fs.readFileSync(path.join(__dirname, 'user-product-data.json'), 'utf8'));

// Function to update a product catalog file
function updateCatalog(catalogPath) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  
  const updatedCatalog = catalog.map(product => {
    // Find matching product from user data (case-insensitive)
    const matchingUserProduct = userProducts.find(up => 
      up.name.toLowerCase().trim() === product.name.toLowerCase().trim()
    );
    
    if (matchingUserProduct) {
      console.log(`Updating product: ${product.name}`);
      
      // Update the product with user data
      return {
        ...product,
        technicalName: matchingUserProduct.technicalName,
        usage_dosage: matchingUserProduct.dose,
        packSizes: matchingUserProduct.packing,
        category: matchingUserProduct.category
      };
    }
    return product;
  });
  
  fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2));
  console.log(`Successfully updated ${catalogPath}`);
}

// Update both catalogs
updateCatalog(path.join(__dirname, 'src', 'data', 'official-product-catalog.json'));
updateCatalog(path.join(__dirname, 'src', 'data', 'product-catalog.json'));

console.log('All product catalogs updated successfully!');
