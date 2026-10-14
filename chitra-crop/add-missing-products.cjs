const fs = require('fs');
const path = require('path');

// Read user product data
const userProducts = JSON.parse(fs.readFileSync(path.join(__dirname, 'user-product-data.json'), 'utf8'));

// Read official catalog
function addProductsToCatalog(catalogPath) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const catalogNames = catalog.map(p => p.name.toLowerCase().trim());
  
  const newProducts = userProducts
    .filter(up => !catalogNames.includes(up.name.toLowerCase().trim()))
    .map(up => {
      // Generate slug from name
      const slug = up.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      return {
        slug: slug,
        id: `prod-${slug}`,
        name: up.name,
        images: [`/assets/products/${slug.toLowerCase().replace(/-/g, '')}.jpeg`],
        category: up.category,
        subcategory: "",
        overview: `${up.category} product from Chitra Crop Science.`,
        description: `${up.name} is a high-quality ${up.category} from Chitra Crop Science.`,
        key_benefits: [
          "High quality formulation",
          "Excellent effectiveness",
          "Trusted brand"
        ],
        usage_dosage: up.dose,
        target_crops: ["All Crops"],
        application_method: "Foliar spray / Soil application",
        safety_precautions: "Use protective gear. Keep away from children.",
        storage_instructions: "Store in cool, dry place.",
        faqs: [
          {
            question: "What is the recommended dosage?",
            answer: up.dose
          },
          {
            question: "Which crops is this suitable for?",
            answer: "This product is suitable for a wide range of field and horticultural crops."
          }
        ],
        related_products: [],
        price: 0,
        featured: false,
        technicalName: up.technicalName,
        packSizes: up.packing
      };
    });
  
  console.log(`Adding ${newProducts.length} products to ${catalogPath}`);
  newProducts.forEach(p => console.log(`  - ${p.name}`));
  
  const updatedCatalog = [...catalog, ...newProducts];
  
  fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2));
  console.log(`Successfully added new products to ${catalogPath}`);
}

// Update both catalogs
addProductsToCatalog(path.join(__dirname, 'src', 'data', 'official-product-catalog.json'));
addProductsToCatalog(path.join(__dirname, 'src', 'data', 'product-catalog.json'));

console.log('All missing products added successfully!');
