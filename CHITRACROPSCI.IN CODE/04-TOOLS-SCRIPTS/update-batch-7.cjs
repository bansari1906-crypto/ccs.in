const fs = require('fs');
const path = require('path');

const productCatalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const officialCatalogPath = path.join(__dirname, 'src/data/official-product-catalog.json');

// Mapping of user product names to catalog-specific product names
const nameMappings = {
  productCatalog: {
    "CHITRA NPK 19-19-19": "CHITRA NPK",
    "CHITRA NPK 13-40-13": "CHITRA NKP",
    "CHITRA NPK 00-52-34": "CHITRA MKP",
    "CHITRA NPK 12-61-00": "CHITRA MAP",
    "CHITRA NPK 13-00-45": "CHITRA NOP",
    "CHITRA NPK 00-00-50": "CHITRA SOP",
    "CHITRA NPK NP": "CHITRA NP",
    "CHITRA NKP NPK": "CHITRA NKP",
    "CHITRA PKA NPK": "CHITRA PKA",
    "CHITRA 888": "CHITRA 888",
    "CHITRA CAL-11": "CHITRA CAL-11",
    "CHITRA ZINCOOX": "CHITRA ZINCOOX",
    "CHITRA SOP": "CHITRA SOP",
    "CLEAN N CLEAR": "CLEAN N CLEAR",
    "ROOT RATAN PACK": "ROOT RATAN",
    "CCS BOOSTER PLUS": "CCS BOOSTER",
    "HARIYALI": "HARIYALI GOLD PLUS",
    "CHITRA OXY": "CHIT-OXY",
    "CCS 303 GOLD": "CCS-303",
    "FLOWER KING": "FLOWER PLUS"
  },
  officialCatalog: {
    "CHITRA NPK 19-19-19": "CHITRA NPK 19:19:19",
    "CHITRA NPK 13-40-13": "CHITRA NPK 13:40:13",
    "CHITRA NPK 00-52-34": "CHITRA MKP",
    "CHITRA NPK 12-61-00": "CHITRA MAP",
    "CHITRA NPK 13-00-45": "CHITRA NOP",
    "CHITRA NPK 00-00-50": "CHITRA SOP",
    "CHITRA NPK NP": "CHITRA NP",
    "CHITRA NKP NPK": "CHITRA NKP",
    "CHITRA PKA NPK": "CHITRA PKA",
    "CHITRA 888": "CHITRA 888",
    "CHITRA CAL-11": "CHITRA CAL-11",
    "CHITRA ZINCOOX": "CHITRA ZINCOOX",
    "CHITRA SOP": "CHITRA SOP",
    "ROOT RATAN PACK": "ROOT RATAN",
    "HARIYALI": "HARIYALI GOLD PLUS",
    "CHITRA OXY": "CHIT-OXY",
    "CCS 303 GOLD": "CCS-303",
    "FLOWER KING": "FLOWER PLUS"
  }
};

const productsData = [
  {
    userProductName: "CHITRA NPK 19-19-19",
    category: "FERTILIZER",
    technicalName: "NPK 19:19:19 Water Soluble Fertilizers",
    formulation: "Water Soluble Fertilizers",
    description: "Balanced NPK fertilizer for all growth stages and crop nutrition.",
    uses: "Vegetative growth and balanced nutrition.",
    benefits: ["Improves crop growth", "Balanced nutrient supply", "Enhances yield"],
    suitableCrops: ["All Crops"],
    dose: "5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 19-19-19 Fertilizer",
    seoDescription: "Balanced water soluble NPK fertilizer for healthy crop development."
  },
  {
    userProductName: "CHITRA NPK 13-40-13",
    category: "FERTILIZER",
    technicalName: "NPK 13:40:13 Water Soluble Fertilizers",
    formulation: "Water Soluble Fertilizers",
    description: "High phosphorus fertilizer for root and flowering development.",
    uses: "Root growth and flowering enhancement.",
    benefits: ["Strong root establishment", "Improves flowering"],
    suitableCrops: ["All Crops"],
    dose: "5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 13-40-13 Fertilizer",
    seoDescription: "High phosphorus NPK fertilizer for flowering and root growth."
  },
  {
    userProductName: "CHITRA NPK 00-52-34",
    category: "FERTILIZER",
    technicalName: "Mono Potassium Phosphate 00:52:34",
    formulation: "Water Soluble Fertilizers",
    description: "High phosphorus and potassium fertilizer for flowering and fruiting.",
    uses: "Flowering and fruit development.",
    benefits: ["Improves flowering", "Better fruit quality"],
    suitableCrops: ["All Crops"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 00-52-34 Fertilizer",
    seoDescription: "Water soluble fertilizer for flowering and fruit development."
  },
  {
    userProductName: "CHITRA NPK 12-61-00",
    category: "FERTILIZER",
    technicalName: "Mono Ammonium Phosphate 12:61:00",
    formulation: "Water Soluble Fertilizers",
    description: "High phosphorus fertilizer for early root establishment.",
    uses: "Root development and vegetative growth.",
    benefits: ["Strong root growth", "Enhances crop establishment"],
    suitableCrops: ["All Crops"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 12-61-00 Fertilizer",
    seoDescription: "High phosphorus fertilizer for strong root development."
  },
  {
    userProductName: "CHITRA NPK 13-00-45",
    category: "FERTILIZER",
    technicalName: "Potassium Nitrate 13:00:45",
    formulation: "Water Soluble Fertilizers",
    description: "Potassium-rich fertilizer for fruit development and quality enhancement.",
    uses: "Fruit growth and ripening support.",
    benefits: ["Improves fruit quality", "Enhances color and shelf life"],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 13-00-45 Fertilizer",
    seoDescription: "Potassium nitrate fertilizer for fruit quality improvement."
  },
  {
    userProductName: "CHITRA NPK 00-00-50",
    category: "FERTILIZER",
    technicalName: "Sulphate of Potash 00:00:50",
    formulation: "Water Soluble Fertilizers",
    description: "Potassium fertilizer for flowering and fruit quality enhancement.",
    uses: "Fruit development and stress management.",
    benefits: ["Improves crop quality", "Enhances flowering"],
    suitableCrops: ["All Crops"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK 00-00-50 Fertilizer",
    seoDescription: "Sulphate of potash fertilizer for crop quality and flowering."
  },
  {
    userProductName: "CHITRA NPK NP",
    category: "FERTILIZER",
    technicalName: "Nitrogen Phosphorus Water Soluble Fertilizers",
    formulation: "Water Soluble Fertilizers",
    description: "Balanced nitrogen and phosphorus fertilizer for vegetative and root growth.",
    uses: "Early crop establishment and nutrient management.",
    benefits: ["Promotes root growth", "Improves crop vigor"],
    suitableCrops: ["All Crops"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NPK NP Fertilizer",
    seoDescription: "Nitrogen and phosphorus fertilizer for healthy crop development."
  },
  {
    userProductName: "CHITRA NKP NPK",
    category: "FERTILIZER",
    technicalName: "NPK Water Soluble Fertilizers",
    formulation: "Water Soluble Fertilizers",
    description: "Balanced nutrient fertilizer for complete crop nutrition.",
    uses: "Growth and yield enhancement.",
    benefits: ["Balanced nutrition", "Improves crop productivity"],
    suitableCrops: ["All Crops"],
    dose: "5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA NKP NPK Fertilizer",
    seoDescription: "Balanced NPK fertilizer for complete crop nutrition."
  },
  {
    userProductName: "CHITRA PKA NPK",
    category: "FERTILIZER",
    technicalName: "Potassium Rich NPK Fertilizer",
    formulation: "Water Soluble Fertilizers",
    description: "Potassium-enriched fertilizer for fruit quality and crop development.",
    uses: "Flowering and fruiting support.",
    benefits: ["Improves fruit quality", "Enhances crop yield"],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA PKA NPK Fertilizer",
    seoDescription: "Potassium-rich NPK fertilizer for flowering and fruit quality."
  },
  {
    userProductName: "CHITRA 888",
    category: "FERTILIZER",
    technicalName: "Balanced Micronutrient Fertilizer",
    formulation: "Granule",
    description: "Premium balanced fertilizer for healthy crop growth and productivity.",
    uses: "Balanced nutrient management.",
    benefits: ["Improves crop vigor", "Supports healthy growth"],
    suitableCrops: ["All Crops"],
    dose: "5–10 Kg per acre",
    applicationMethod: "Soil Application",
    packSizes: ["5 Kg", "10 Kg", "25 Kg"],
    seoTitle: "CHITRA 888 Fertilizer",
    seoDescription: "Balanced fertilizer for crop nutrition and healthy development."
  },
  {
    userProductName: "CHITRA CAL-11",
    category: "FERTILIZER",
    technicalName: "Calcium Based Liquid Fertilizer",
    formulation: "Liquid",
    description: "Liquid calcium fertilizer for fruit firmness and crop quality improvement.",
    uses: "Calcium deficiency correction.",
    benefits: ["Improves fruit quality", "Enhances plant strength"],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "CHITRA CAL-11 Fertilizer",
    seoDescription: "Liquid calcium fertilizer for quality crop production."
  },
  {
    userProductName: "CHITRA ZINCOOX",
    category: "FERTILIZER",
    technicalName: "Zinc Oxide Suspension Fertilizer",
    formulation: "Suspension",
    description: "Zinc fertilizer for correcting zinc deficiency and improving crop growth.",
    uses: "Zinc deficiency management.",
    benefits: ["Improves chlorophyll activity", "Enhances plant vigor"],
    suitableCrops: ["All Crops"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "CHITRA ZINCOOX Fertilizer",
    seoDescription: "Zinc fertilizer for healthy crop growth and nutrient balance."
  },
  {
    userProductName: "CHITRA SOP",
    category: "FERTILIZER",
    technicalName: "Sulphate of Potash Fertilizer",
    formulation: "Water Soluble Fertilizers",
    description: "Potassium fertilizer for improving crop quality and stress tolerance.",
    uses: "Flowering and fruit quality enhancement.",
    benefits: ["Improves color and shelf life", "Enhances stress tolerance"],
    suitableCrops: ["All Crops"],
    dose: "3–5 Kg per acre",
    applicationMethod: "Drip / Foliar Spray",
    packSizes: ["1 Kg", "5 Kg", "25 Kg"],
    seoTitle: "CHITRA SOP Fertilizer",
    seoDescription: "Sulphate of potash fertilizer for flowering and fruit quality."
  },
  {
    userProductName: "CLEAN N CLEAR",
    category: "PGR",
    technicalName: "Sticker Spreader Activator",
    formulation: "Liquid",
    description: "Agricultural adjuvant for improving spray coverage and pesticide performance.",
    uses: "Spray spreading and sticking enhancement.",
    benefits: ["Improves spray efficiency", "Better chemical absorption"],
    suitableCrops: ["All Crops"],
    dose: "5–10 ml per pump",
    applicationMethod: "Tank Mix Spray",
    packSizes: ["100 ml", "250 ml", "500 ml"],
    seoTitle: "CLEAN N CLEAR Spray Adjuvant",
    seoDescription: "Sticker spreader for improved agricultural spray performance."
  },
  {
    userProductName: "ROOT RATAN PACK",
    category: "PGR",
    technicalName: "Root Development Combo Pack",
    formulation: "Combo Kit",
    description: "Combination root booster package for strong root establishment.",
    uses: "Root development and crop establishment.",
    benefits: ["Improves root mass", "Better nutrient absorption"],
    suitableCrops: ["All Crops"],
    dose: "As per crop requirement",
    applicationMethod: "Soil Drench / Drip",
    packSizes: ["Combo Pack"],
    seoTitle: "ROOT RATAN PACK Root Booster",
    seoDescription: "Root development combo pack for strong crop establishment."
  },
  {
    userProductName: "CCS BOOSTER PLUS",
    category: "PGR",
    technicalName: "Advanced Crop Growth Booster",
    formulation: "Liquid",
    description: "Premium bio stimulant for crop growth and productivity enhancement.",
    uses: "Vegetative growth and stress tolerance improvement.",
    benefits: ["Improves yield", "Enhances crop vigor"],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "CCS BOOSTER PLUS Crop Booster",
    seoDescription: "Advanced crop booster for healthy growth and higher yield."
  },
  {
    userProductName: "HARIYALI",
    category: "PGR",
    technicalName: "Organic Plant Growth Enhancer",
    formulation: "Liquid",
    description: "Organic bio stimulant for healthy crop development and stress management.",
    uses: "Growth enhancement and plant strengthening.",
    benefits: ["Improves crop vigor", "Enhances stress tolerance"],
    suitableCrops: ["All Crops"],
    dose: "500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "HARIYALI Plant Growth Enhancer",
    seoDescription: "Organic bio stimulant for crop growth and development."
  },
  {
    userProductName: "CHITRA OXY",
    category: "HERBICIDE",
    technicalName: "Oxyfluorfen 23.5% EC",
    formulation: "EC",
    activeIngredient: "Oxyfluorfen",
    description: "Selective pre-emergence herbicide for annual weed control.",
    uses: "Broadleaf and grassy weed management.",
    benefits: ["Excellent residual control", "Fast weed suppression"],
    suitableCrops: ["Onion", "Groundnut"],
    dose: "200–300 ml per acre",
    applicationMethod: "Pre-emergence Spray",
    packSizes: ["100 ml", "250 ml", "500 ml"],
    seoTitle: "CHITRA OXY Herbicide",
    seoDescription: "Oxyfluorfen herbicide for pre-emergence weed management."
  },
  {
    userProductName: "CCS 303 GOLD",
    category: "PGR",
    technicalName: "Premium Bio Stimulant",
    formulation: "Liquid",
    description: "Advanced plant growth promoter for healthy crop performance.",
    uses: "Growth enhancement and stress management.",
    benefits: ["Improves plant vigor", "Enhances nutrient uptake"],
    suitableCrops: ["All Crops"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml", "1 Ltr"],
    seoTitle: "CCS 303 GOLD Bio Stimulant",
    seoDescription: "Premium bio stimulant for healthy crop growth and yield."
  },
  {
    userProductName: "FLOWER KING",
    category: "PGR",
    technicalName: "Flowering and Fruiting Booster",
    formulation: "Liquid",
    description: "Plant growth promoter for improved flowering and fruit setting.",
    uses: "Flower induction and fruit development.",
    benefits: ["Improves flowering", "Better fruit retention"],
    suitableCrops: ["Fruits", "Vegetables"],
    dose: "250–500 ml per acre",
    applicationMethod: "Foliar Spray",
    packSizes: ["250 ml", "500 ml"],
    seoTitle: "FLOWER KING Flower Booster",
    seoDescription: "Flowering stimulant for better fruit setting and crop productivity."
  }
];

function updateCatalog(catalogPath, nameMapping, catalogType) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  let updatedCount = 0;
  let notFound = [];

  productsData.forEach(productData => {
    const actualProductName = nameMapping[productData.userProductName];
    if (!actualProductName) {
      // Skip if no mapping for this catalog
      return;
    }
    
    const index = catalog.findIndex(p => p.name === actualProductName);
    if (index !== -1) {
      const existingProduct = catalog[index];
      
      // Update fields based on catalog type
      if (catalogType === 'productCatalog') {
        // product-catalog.json structure
        catalog[index] = {
          ...existingProduct,
          ...productData,
          name: existingProduct.name, // keep original name
          overview: productData.description,
          targetPests: existingProduct.targetPests || []
        };
      } else if (catalogType === 'officialCatalog') {
        // official-product-catalog.json structure
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

// Update both catalogs
console.log('Updating product-catalog.json...');
updateCatalog(productCatalogPath, nameMappings.productCatalog, 'productCatalog');

console.log('\nUpdating official-product-catalog.json...');
updateCatalog(officialCatalogPath, nameMappings.officialCatalog, 'officialCatalog');
