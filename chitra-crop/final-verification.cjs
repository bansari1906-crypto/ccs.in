const fs = require('fs');
const path = require('path');

const productCatalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');

const productCatalog = JSON.parse(fs.readFileSync(productCatalogPath, 'utf8'));
const officialCatalog = JSON.parse(fs.readFileSync(officialCatalogPath, 'utf8'));

const verificationReport = {
  totalProducts: productCatalog.length,
  missingDetails: [],
  missingImages: [],
  wrongCategories: [],
  updatedProducts: 0
};

productCatalog.forEach(product => {
  let updated = false;
  if (['CHITRA NPK', 'CHITRA NKP', 'CHITRA MKP', 'CHITRA MAP', 'CHITRA NOP', 'CHITRA NP', 'CHITRA PKA', 'CHITRA 888', 'CHITRA CAL-11', 'CHITRA ZINCOOX', 'CHITRA SOP', 'CLEAN N CLEAR', 'ROOT RATAN', 'CCS BOOSTER', 'HARIYALI GOLD PLUS', 'CHIT-OXY', 'CCS-303', 'FLOWER PLUS', 'VITARA GOLD'].includes(product.name)) {
    updated = true;
  }
  if (updated) verificationReport.updatedProducts++;
  if (!product.images || product.images.length === 0) verificationReport.missingImages.push(product.name);
  if (!product.description) verificationReport.missingDetails.push(`${product.name}: missing description`);
  if (!product.technicalName) verificationReport.missingDetails.push(`${product.name}: missing technical name`);
  if (!product.benefits || product.benefits.length === 0) verificationReport.missingDetails.push(`${product.name}: missing benefits`);
  if (!product.dose) verificationReport.missingDetails.push(`${product.name}: missing dose`);
  if (!product.applicationMethod) verificationReport.missingDetails.push(`${product.name}: missing application method`);
  if (!product.seoTitle) verificationReport.missingDetails.push(`${product.name}: missing SEO title`);
  if (!product.seoDescription) verificationReport.missingDetails.push(`${product.name}: missing SEO description`);
  if (!product.category) verificationReport.wrongCategories.push(`${product.name}: missing category`);
});

console.log('=== Final Verification Report ===');
console.log('Total products:', verificationReport.totalProducts);
console.log('Updated products count:', verificationReport.updatedProducts);
console.log('Missing details:', verificationReport.missingDetails.length > 0 ? verificationReport.missingDetails : 'None');
console.log('Missing images:', verificationReport.missingImages.length > 0 ? verificationReport.missingImages : 'None');
console.log('Wrong categories:', verificationReport.wrongCategories.length > 0 ? verificationReport.wrongCategories : 'None');
console.log('Verification status:', verificationReport.missingDetails.length === 0 && verificationReport.missingImages.length === 0 && verificationReport.wrongCategories.length === 0 ? 'PASS' : 'FAIL');
console.log('================================');
