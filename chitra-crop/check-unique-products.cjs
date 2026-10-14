const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
const products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

console.log("Checking unique products for missing details...\n");
console.log("=".repeat(100));

const processed = new Set();
const productsWithMissingDetails = [];

for (const product of products) {
  if (processed.has(product.name)) continue;
  processed.add(product.name);

  const missingFields = [];
  
  if (!product.technicalName) missingFields.push("technicalName");
  if (!product.category) missingFields.push("category");
  if (!product.subcategory) missingFields.push("subcategory");
  if (!product.description) missingFields.push("description");
  if (!product.uses) missingFields.push("uses");
  if (!product.suitableCrops?.length) missingFields.push("suitableCrops");
  if (!product.benefits?.length) missingFields.push("benefits");
  if (!product.applicationMethod) missingFields.push("applicationMethod");
  if (!product.composition) missingFields.push("composition");
  if (!product.activeIngredient) missingFields.push("activeIngredient");
  if (!product.formulation) missingFields.push("formulation");

  if (missingFields.length > 0) {
    productsWithMissingDetails.push({
      name: product.name,
      missingFields
    });
  }
}

if (productsWithMissingDetails.length > 0) {
  console.log("\nFound unique products with missing details:");
  console.log("=".repeat(100));
  for (const p of productsWithMissingDetails) {
    console.log(`\n- ${p.name}`);
  }
  console.log("\n".repeat(2), "=" .repeat(100));
  console.log(`\nTotal unique products with missing details: ${productsWithMissingDetails.length}`);
} else {
  console.log("\n✅ All products have complete details!");
}
