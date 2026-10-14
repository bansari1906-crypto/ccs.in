const fs = require('fs');
const path = require('path');

const productCatalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');

const nameMappings = {
  productCatalog: {
    "VITARA SUPER": "VITARA GOLD"
  },
  officialCatalog: {
    "VITARA SUPER": "VITARA GOLD"
  }
};

const productsData = [
  {
    userProductName: "VITARA SUPER",
    category: "FUNGICIDE",
    technicalName: "Metalaxyl + Mancozeb Combination Fungicide",
    formulation: "WP",
    description: "Combination fungicide for preventive and curative disease management.",
    uses: "Downy mildew and blight control.",
    benefits: [
      "Broad-spectrum disease control",
      "Strong systemic movement"
    ],
    suitableCrops: ["Grapes", "Potato", "Vegetables"],
    dose: "500–700 gm per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 gm", "500 gm", "1 Kg"],
    seoTitle: "VITARA SUPER Fungicide",
    seoDescription: "Combination fungicide for blight and downy mildew management."
  },
  {
    userProductName: "POWER ROOT",
    category: "PGR",
    technicalName: "Root Growth Bio Stimulant",
    formulation: "Liquid",
    description: "Advanced root growth promoter for strong root establishment.",
    uses: "Root development and crop establishment.",
    benefits: [
      "Improves root mass",
      "Better nutrient absorption"
    ],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Drip / Soil Drench",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "POWER ROOT Root Booster",
    seoDescription: "Root development stimulant for healthy crop establishment."
  },
  {
    userProductName: "SUPER FLOWER",
    category: "PGR",
    technicalName: "Flowering Bio Stimulant",
    formulation: "Liquid",
    description: "Flowering enhancer for improved flower initiation and fruit setting.",
    uses: "Flower and fruit development.",
    benefits: [
      "Improves flowering",
      "Enhances fruit retention"
    ],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml"],
    seoTitle: "SUPER FLOWER Plant Booster",
    seoDescription: "Flowering enhancer for improved fruit set and crop yield."
  },
  {
    userProductName: "GREEN MAGIC",
    category: "PGR",
    technicalName: "Seaweed Based Plant Booster",
    formulation: "Liquid",
    description: "Seaweed based crop enhancer for healthy vegetative growth.",
    uses: "Crop vigor and stress management.",
    benefits: [
      "Improves chlorophyll activity",
      "Enhances plant health"
    ],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "GREEN MAGIC Plant Growth Promoter",
    seoDescription: "Seaweed based plant booster for crop vigor and stress tolerance."
  },
  {
    userProductName: "MICRO POWER",
    category: "FERTILIZER",
    technicalName: "Micronutrient Mixture Fertilizer",
    formulation: "Powder",
    description: "Balanced micronutrient fertilizer for correcting deficiencies.",
    uses: "Micronutrient management.",
    benefits: [
      "Improves crop health",
      "Enhances nutrient balance"
    ],
    suitableCrops: ["All Crops"],
    dose: "500 gm per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["500 gm", "1 Kg"],
    seoTitle: "MICRO POWER Micronutrient Fertilizer",
    seoDescription: "Balanced micronutrient fertilizer for healthy crop development."
  },
  {
    userProductName: "SUPER ZINC",
    category: "FERTILIZER",
    technicalName: "Chelated Zinc Fertilizer",
    formulation: "Powder",
    description: "Chelated zinc formulation for zinc deficiency correction.",
    uses: "Zinc nutrient management.",
    benefits: [
      "Improves crop growth",
      "Enhances chlorophyll formation"
    ],
    suitableCrops: ["All Crops"],
    dose: "250–500 gm per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 gm", "500 gm", "1 Kg"],
    seoTitle: "SUPER ZINC Fertilizer",
    seoDescription: "Chelated zinc fertilizer for crop nutrient management."
  },
  {
    userProductName: "MEGA CAL",
    category: "FERTILIZER",
    technicalName: "Calcium Based Liquid Fertilizer",
    formulation: "Liquid",
    description: "Calcium nutrient solution for fruit firmness and crop quality.",
    uses: "Calcium deficiency correction.",
    benefits: [
      "Improves fruit quality",
      "Enhances plant strength"
    ],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "MEGA CAL Calcium Fertilizer",
    seoDescription: "Liquid calcium fertilizer for crop quality enhancement."
  },
  {
    userProductName: "BIO SHAKTI",
    category: "PGR",
    technicalName: "Organic Bio Stimulant",
    formulation: "Liquid",
    description: "Organic crop growth enhancer for healthy plant development.",
    uses: "Vegetative growth and stress tolerance.",
    benefits: [
      "Improves crop vigor",
      "Enhances plant strength"
    ],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml"],
    seoTitle: "BIO SHAKTI Plant Booster",
    seoDescription: "Organic bio stimulant for healthy crop growth and development."
  },
  {
    userProductName: "YIELD MAX",
    category: "PGR",
    technicalName: "Yield Enhancer Bio Stimulant",
    formulation: "Liquid",
    description: "Plant growth promoter for yield enhancement and crop productivity.",
    uses: "Yield improvement and crop strengthening.",
    benefits: [
      "Improves productivity",
      "Enhances crop performance"
    ],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "YIELD MAX Crop Booster",
    seoDescription: "Yield enhancer for better crop productivity and performance."
  },
  {
    userProductName: "GOLD NPK",
    category: "FERTILIZER",
    technicalName: "Balanced NPK Water Soluble Fertilizer",
    formulation: "Water Soluble Fertilizers",
    description: "Balanced fertilizer for complete crop nutrition.",
    uses: "Vegetative growth and balanced nutrition.",
    benefits: [
      "Improves crop vigor",
      "Balanced nutrient supply"
    ],
    suitableCrops: ["All Crops"],
    dose: "5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "GOLD NPK Fertilizer",
    seoDescription: "Balanced water soluble fertilizer for crop nutrition."
  }
];

function updateCatalog(catalogPath, nameMapping, catalogType) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  let updatedCount = 0;
  let notFound = [];

  productsData.forEach(productData => {
    const actualProductName = nameMapping[productData.userProductName];
    if (!actualProductName) {
      notFound.push(productData.userProductName);
      return;
    }

    const index = catalog.findIndex(p => p.name === actualProductName);
    if (index !== -1) {
      const existingProduct = catalog[index];
      if (catalogType === 'productCatalog') {
        catalog[index] = {
          ...existingProduct,
          ...productData,
          name: existingProduct.name,
          overview: productData.description,
          targetPests: existingProduct.targetPests || []
        };
      } else if (catalogType === 'officialCatalog') {
        catalog[index] = {
          ...existingProduct,
          category: productData.category,
          overview: productData.description,
          description: productData.description,
          key_benefits: productData.benefits,
          usage_dosage: productData.dose,
          target_crops: productData.suitableCrops,
          application_method: productData.applicationMethod
        };
      }
      
      console.log(`Updated product: ${productData.userProductName} (as ${actualProductName})`);
      updatedCount++;
    } else {
      notFound.push(productData.userProductName);
    }
  });

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`\nTotal products updated in ${catalogType}: ${updatedCount}`);
  if (notFound.length > 0) {
    console.log(`Products not found in ${catalogType}: ${notFound.join(', ')}`);
  }
}

console.log('Updating product-catalog.json...');
updateCatalog(productCatalogPath, nameMappings.productCatalog, 'productCatalog');

console.log('\nUpdating official-product-catalog.json...');
updateCatalog(officialCatalogPath, nameMappings.officialCatalog, 'officialCatalog');
