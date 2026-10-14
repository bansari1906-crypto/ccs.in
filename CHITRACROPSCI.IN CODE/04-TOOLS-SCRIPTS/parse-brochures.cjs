
const fs = require('fs');
const path = require('path');

// Function to extract product data from text
function extractProducts(text) {
  const products = [];
  let currentCategory = null;

  // Split text into lines
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Category keywords
  const categories = {
    'INSECTICIDE': 'INSECTICIDE',
    'FUNGICIDE': 'FUNGICIDE',
    'HERBICIDE': 'HERBICIDE',
    'PGR': 'PGR',
    'Fertilizer': 'FERTILIZER',
    'Imported Fertilizer': 'FERTILIZER',
    'Liquid Fertilizer': 'FERTILIZER'
  };

  // Track current product
  let currentProduct = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check for category change
    for (const [catKey, catValue] of Object.entries(categories)) {
      if (line.includes(catKey)) {
        currentCategory = catValue;
        break;
      }
    }

    // Check if line looks like a product name (all caps or starts with uppercase, no Dose: or Packing:)
    if (!line.includes('Dose:') && 
        !line.includes('Packing:') && 
        !line.includes('CHITA') && 
        !line.includes('Crop Science') &&
        !line.includes('AN ISO') &&
        !line.includes('About Company') &&
        !line.includes('Company\'s') &&
        !line.includes('Mission') &&
        !line.includes('DISEASES') &&
        !line.includes('INSECT PESTS') &&
        !line.includes('Manufacturer') &&
        !line.includes('Reg.office') &&
        !line.match(/^\d+$/) && // Skip line numbers
        !line.includes('›') && // Skip category markers
        !line.includes('PRODUCT BROCHURE') &&
        !line.includes('R') // Skip the R logo line
    ) {
      // Check if this line could be a product name (starts with uppercase, not too long)
      // Or if it's followed by Dose: or Packing:
      let isProductName = false;
      
      // Check next few lines for Dose or Packing
      for (let j = 1; j <= 5 && i + j < lines.length; j++) {
        if (lines[i+j].includes('Dose:') || lines[i+j].includes('Packing:')) {
          isProductName = true;
          break;
        }
      }

      if (isProductName) {
        // If we have a current product, save it
        if (currentProduct && currentProduct.name) {
          products.push(currentProduct);
        }

        // Start new product
        currentProduct = {
          name: line,
          category: currentCategory,
          technicalName: null,
          dosage: null,
          packSizes: null,
          images: []
        };

        // Look for technical name (next line)
        if (i + 1 < lines.length && 
            !lines[i+1].includes('Dose:') && 
            !lines[i+1].includes('Packing:')) {
          let techName = lines[i+1];
          // If next line is also technical name, combine
          let k = i+2;
          while (k < lines.length && 
                 !lines[k].includes('Dose:') && 
                 !lines[k].includes('Packing:') &&
                 !lines[k].includes('CHITA') &&
                 !lines[k].includes('Crop Science') &&
                 !lines[k].includes('AN ISO') &&
                 !lines[k].match(/^\d+$/)) {
            techName += ' ' + lines[k];
            k++;
          }
          currentProduct.technicalName = techName;
        }

        // Look for dosage and packing
        for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
          if (lines[j].includes('Dose:')) {
            let dosage = lines[j].replace('Dose:', '').trim();
            // If next line is also dosage
            if (j + 1 < lines.length && !lines[j+1].includes('Packing:') && !lines[j+1].includes('Dose:')) {
              dosage += ' ' + lines[j+1];
            }
            currentProduct.dosage = dosage;
          }
          if (lines[j].includes('Packing:')) {
            let packing = lines[j].replace('Packing:', '').trim();
            // If next line is also packing
            if (j + 1 < lines.length && !lines[j+1].includes('Dose:')) {
              packing += ' ' + lines[j+1];
            }
            currentProduct.packSizes = packing;
          }
        }
      }
    }
  }

  // Push the last product
  if (currentProduct && currentProduct.name) {
    products.push(currentProduct);
  }

  return products;
}

// Read extracted text files
const text1 = fs.readFileSync(path.join(__dirname, 'brochure.pdf-extracted-text.txt'), 'utf-8');
const text2 = fs.readFileSync(path.join(__dirname, 'Brochure.pdf-extracted-text.txt'), 'utf-8');

// Extract products from both
const products1 = extractProducts(text1);
const products2 = extractProducts(text2);

// Merge products, prioritize first one, merge duplicates
const mergedProducts = [];
const productNames = new Set();

for (const product of [...products1, ...products2]) {
  // Clean product name (remove extra spaces)
  const cleanName = product.name.trim().replace(/\s+/g, ' ');
  if (!productNames.has(cleanName)) {
    productNames.add(cleanName);
    product.name = cleanName;
    mergedProducts.push(product);
  }
}

// Read existing product catalog
const existingCatalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let existingProducts = [];
if (fs.existsSync(existingCatalogPath)) {
  existingProducts = JSON.parse(fs.readFileSync(existingCatalogPath, 'utf-8'));
}

// Update existing products with brochure data, and add new ones
const updatedProducts = [];
const existingNames = new Set(existingProducts.map(p => p.name));

for (const brochureProduct of mergedProducts) {
  const existingProduct = existingProducts.find(p => 
    p.name.toLowerCase().includes(brochureProduct.name.toLowerCase()) || 
    brochureProduct.name.toLowerCase().includes(p.name.toLowerCase())
  );
  
  if (existingProduct) {
    // Update existing product
    updatedProducts.push({
      ...existingProduct,
      category: brochureProduct.category || existingProduct.category,
      technicalName: brochureProduct.technicalName || existingProduct.technicalName,
      dosage: brochureProduct.dosage || existingProduct.dosage,
      packSizes: brochureProduct.packSizes ? brochureProduct.packSizes.split(',').map(p => p.trim()) : existingProduct.packSizes
    });
    existingNames.delete(existingProduct.name);
  } else {
    // Add new product
    updatedProducts.push({
      id: brochureProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: brochureProduct.name,
      slug: brochureProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: brochureProduct.category || 'OTHER',
      description: '',
      technicalName: brochureProduct.technicalName,
      dosage: brochureProduct.dosage,
      packSizes: brochureProduct.packSizes ? brochureProduct.packSizes.split(',').map(p => p.trim()) : [],
      images: []
    });
  }
}

// Add remaining existing products
for (const existingProduct of existingProducts) {
  if (existingNames.has(existingProduct.name)) {
    updatedProducts.push(existingProduct);
  }
}

// Write updated product catalog
fs.writeFileSync(existingCatalogPath, JSON.stringify(updatedProducts, null, 2));

// Write extracted products to file for review
fs.writeFileSync(path.join(__dirname, 'brochure-products.json'), JSON.stringify(mergedProducts, null, 2));

console.log(`✅ Extracted ${mergedProducts.length} products from brochures`);
console.log(`✅ Updated ${updatedProducts.length} products in catalog`);
console.log(`✅ Results saved to brochure-products.json and product-catalog.json`);
