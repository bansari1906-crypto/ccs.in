const fs = require('fs');
const path = require('path');

// Read product catalog
const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

// Define the fertilizer updates
const fertilizerUpdates = [
  {
    name: "Chitra Gold Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Liquid Fertilizer",
      technicalName: "NPK 19:19:19 Fully Chelated Liquid Fertilizer",
      description: "Balanced liquid NPK fertilizer with equal nitrogen, phosphorus and potassium for complete plant nutrition.",
      modeOfAction: "Provides instantly available macro nutrients through chelated liquid formulation.",
      uses: "Vegetative growth, flowering, fruiting and root development.",
      targetPests: [],
      suitableCrops: ["Vegetables", "Fruits", "Cereals", "Cash Crops", "Flowers"],
      benefits: ["Balanced nutrition", "better growth", "flowering and root development"],
      dose: "Not Available",
      applicationMethod: "Drip Irrigation, Foliar Spray, Seed Treatment, Soil Application",
      packSizes: ["1 Litre"],
      storageInstructions: "Store in cool dry place away from sunlight",
      safetyPrecautions: "Keep away from children. Not for human consumption.",
      composition: "NPK 19:19:19",
      activeIngredient: "Nitrogen, Phosphorus, Potassium",
      formulation: "Liquid",
      specialFeatures: "Fully chelated balanced nutrition"
    }
  },
  {
    name: "Chitra NP Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "NP Liquid Fertilizer",
      technicalName: "Nitrogen-Phosphorus Liquid Fertilizer",
      description: "Liquid fertilizer supporting root development and early crop establishment.",
      modeOfAction: "Supplies nitrogen and phosphorus for chlorophyll formation and root elongation.",
      uses: "Early vegetative growth and crop establishment.",
      targetPests: [],
      suitableCrops: ["All Agricultural Crops"],
      benefits: ["Better root development and early crop growth"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray, Drip Irrigation, Soil Application",
      packSizes: ["1 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid contact with eyes. Keep away from children.",
      composition: "Nitrogen and Phosphorus",
      activeIngredient: "NP Nutrients",
      formulation: "Liquid",
      specialFeatures: "Quick absorption formulation"
    }
  },
  {
    name: "Chitra NK Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "NK Liquid Fertilizer",
      technicalName: "Nitrogen-Potassium Liquid Fertilizer",
      description: "Liquid fertilizer designed to improve plant vigor and fruit quality.",
      modeOfAction: "Potassium improves enzyme activation and stress tolerance.",
      uses: "Fruit development and crop vigor improvement.",
      targetPests: [],
      suitableCrops: ["Fruit Crops and Agricultural Crops"],
      benefits: ["Better fruit quality", "stress tolerance and crop vigor"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray, Drip Irrigation, Soil Application",
      packSizes: ["1 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid eye and skin contact",
      composition: "Nitrogen and Potassium",
      activeIngredient: "NK Nutrients",
      formulation: "Liquid",
      specialFeatures: "Suitable for all crop stages"
    }
  },
  {
    name: "Chitra NOP NPK Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "NPK 13:00:45 Potassium Nitrate Fertilizer",
      description: "Water soluble fertilizer supplying nitrogen and high potassium.",
      modeOfAction: "High potassium supports fruit maturation and crop quality.",
      uses: "Fruit setting and maturation stages.",
      targetPests: [],
      suitableCrops: ["Fruits", "Vegetables", "Horticultural Crops"],
      benefits: ["Improves fruit size", "color and quality"],
      dose: "Not Available",
      applicationMethod: "Fertigation, Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Keep sealed after use",
      composition: "NPK 13:00:45",
      activeIngredient: "Potassium Nitrate",
      formulation: "Water Soluble Powder",
      specialFeatures: "High potassium formula"
    }
  },
  {
    name: "Chitra NP NPK Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "NPK Water Soluble Fertilizer Mixture",
      description: "Balanced NP fertilizer for crop growth and root development.",
      modeOfAction: "Supplies essential nutrients rapidly through water-soluble form.",
      uses: "Crop growth and establishment.",
      targetPests: [],
      suitableCrops: ["All Crops"],
      benefits: ["Improved nutrient uptake and crop development"],
      dose: "Not Available",
      applicationMethod: "Fertigation, Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid moisture contamination",
      composition: "NP Mixture",
      activeIngredient: "Nitrogen and Phosphorus",
      formulation: "Water Soluble Powder",
      specialFeatures: "Rapid nutrient absorption"
    }
  },
  {
    name: "Chitra MKP Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "Mono Potassium Phosphate Fertilizer",
      description: "Water soluble fertilizer supplying phosphorus and potassium.",
      modeOfAction: "Supports flowering and fruit setting.",
      uses: "Flowering and fruiting stages.",
      targetPests: [],
      suitableCrops: ["Fruits", "Vegetables", "Flowers"],
      benefits: ["Better flowering and fruit quality"],
      dose: "Not Available",
      applicationMethod: "Fertigation and Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in dry area",
      safetyPrecautions: "Keep away from moisture",
      composition: "MKP",
      activeIngredient: "Phosphorus and Potassium",
      formulation: "Water Soluble Powder",
      specialFeatures: "Chloride free formulation"
    }
  },
  {
    name: "Chitra NKP Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "NKP Fertilizer Mixture",
      description: "Water soluble fertilizer for balanced crop nutrition.",
      modeOfAction: "Provides macro nutrients for growth and productivity.",
      uses: "Crop growth and fruit development.",
      targetPests: [],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Better nutrient balance and productivity"],
      dose: "Not Available",
      applicationMethod: "Fertigation",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep sealed properly",
      composition: "NKP Mixture",
      activeIngredient: "NPK Nutrients",
      formulation: "Water Soluble Powder",
      specialFeatures: "Fast dissolving formula"
    }
  },
  {
    name: "Chitra MAP Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "Mono Ammonium Phosphate Fertilizer",
      description: "Highly efficient phosphorus fertilizer for early crop growth.",
      modeOfAction: "Supplies nitrogen and phosphorus for root growth.",
      uses: "Seedling and vegetative stages.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better root establishment and growth"],
      dose: "Not Available",
      applicationMethod: "Fertigation, Foliar Spray",
      packSizes: [],
      storageInstructions: "Store away from moisture",
      safetyPrecautions: "Use proper handling practices",
      composition: "MAP",
      activeIngredient: "Nitrogen and Phosphorus",
      formulation: "Water Soluble Powder",
      specialFeatures: "High phosphorus availability"
    }
  },
  {
    name: "Chitra PKA Water Soluble Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Water Soluble Fertilizers",
      technicalName: "PKA Fertilizer Mixture",
      description: "Water soluble fertilizer promoting crop productivity.",
      modeOfAction: "Supplies essential macro nutrients.",
      uses: "Growth and productivity enhancement.",
      targetPests: [],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Better yield and crop health"],
      dose: "Not Available",
      applicationMethod: "Fertigation",
      packSizes: [],
      storageInstructions: "Store in dry area",
      safetyPrecautions: "Avoid direct moisture exposure",
      composition: "PKA Mixture",
      activeIngredient: "NPK Nutrients",
      formulation: "Water Soluble Powder",
      specialFeatures: "Efficient nutrient delivery"
    }
  },
  {
    name: "Chitra MEG Magnesium Sulphate",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Magnesium Fertilizer",
      technicalName: "Magnesium Sulphate Water Soluble Fertilizer",
      description: "Magnesium fertilizer supporting chlorophyll production.",
      modeOfAction: "Supplies magnesium and sulphur nutrients.",
      uses: "Corrects magnesium deficiency.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better photosynthesis and greener foliage"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray and Soil Application",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid inhalation of dust",
      composition: "Magnesium Sulphate",
      activeIngredient: "Magnesium and Sulphur",
      formulation: "Water Soluble Powder",
      specialFeatures: "Quick deficiency correction"
    }
  },
  {
    name: "Chitra Zinc Zn-EDTA 12%",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Micronutrient Fertilizer",
      technicalName: "Zn-EDTA 12% Water Soluble Fertilizer",
      description: "Chelated zinc fertilizer for zinc deficiency correction.",
      modeOfAction: "Provides readily available zinc to crops.",
      uses: "Micronutrient management.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better enzyme activity and plant growth"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep away from moisture",
      composition: "Zn-EDTA 12%",
      activeIngredient: "Zinc",
      formulation: "Water Soluble Powder",
      specialFeatures: "Fully chelated zinc source"
    }
  },
  {
    name: "Chitra ZIB Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Liquid Micronutrient",
      technicalName: "Not Available",
      description: "Liquid micronutrient fertilizer for crop nutrition.",
      modeOfAction: "Supplies essential nutrients in liquid form.",
      uses: "Nutrient supplementation.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better crop health and vigor"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep away from children",
      composition: "Not Available",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Easy absorption"
    }
  },
  {
    name: "Chitra Zincoox Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Zinc Fertilizer",
      technicalName: "Not Available",
      description: "Zinc-based liquid fertilizer formulation.",
      modeOfAction: "Supplies zinc nutrients to plants.",
      uses: "Zinc deficiency correction.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better plant growth and development"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Avoid direct exposure",
      composition: "Zinc formulation",
      activeIngredient: "Zinc",
      formulation: "Liquid",
      specialFeatures: "Quick nutrient availability"
    }
  },
  {
    name: "Chitra B Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Boron Fertilizer",
      technicalName: "Boron Liquid Fertilizer",
      description: "Boron fertilizer supporting flowering and fruit setting.",
      modeOfAction: "Supplies boron for reproductive growth.",
      uses: "Flowering and fruit development.",
      targetPests: [],
      suitableCrops: ["Fruits and vegetables"],
      benefits: ["Better flowering and fruit setting"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Keep away from children",
      composition: "Boron formulation",
      activeIngredient: "Boron",
      formulation: "Liquid",
      specialFeatures: "Supports reproductive growth"
    }
  },
  {
    name: "Chitra MAX Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Liquid Fertilizer",
      technicalName: "Not Available",
      description: "Multi-nutrient liquid fertilizer for crop nutrition.",
      modeOfAction: "Supplies essential nutrients rapidly.",
      uses: "General crop nutrition.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better growth and productivity"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray and Drip",
      packSizes: [],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Avoid contact with eyes",
      composition: "Not Available",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Fast nutrient absorption"
    }
  },
  {
    name: "Chitra Ca Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Calcium Fertilizer",
      technicalName: "Calcium Liquid Fertilizer",
      description: "Calcium fertilizer for strong plant structure and fruit quality.",
      modeOfAction: "Supplies calcium nutrient to plants.",
      uses: "Calcium deficiency management.",
      targetPests: [],
      suitableCrops: ["Fruits and vegetables"],
      benefits: ["Better fruit firmness and plant strength"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Keep away from children",
      composition: "Calcium formulation",
      activeIngredient: "Calcium",
      formulation: "Liquid",
      specialFeatures: "Improves fruit firmness"
    }
  },
  {
    name: "Chitra Zn Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Zinc Fertilizer",
      technicalName: "Zinc Liquid Fertilizer",
      description: "Zinc micronutrient fertilizer for healthy crop growth.",
      modeOfAction: "Corrects zinc deficiency rapidly.",
      uses: "Micronutrient supplementation.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Improved growth and chlorophyll formation"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid direct skin contact",
      composition: "Zinc formulation",
      activeIngredient: "Zinc",
      formulation: "Liquid",
      specialFeatures: "Rapid zinc correction"
    }
  },
  {
    name: "Chitra Cal-11 Micronutrient Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Micronutrient Fertilizer",
      technicalName: "Cal-11 Micronutrient Mixture",
      description: "Multi micronutrient fertilizer for balanced crop nutrition.",
      modeOfAction: "Supplies essential micronutrients.",
      uses: "Micronutrient deficiency management.",
      targetPests: [],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Better crop growth and yield"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in dry area",
      safetyPrecautions: "Keep container sealed",
      composition: "Micronutrient mixture",
      activeIngredient: "Multi micronutrients",
      formulation: "Liquid/Powder Not Available",
      specialFeatures: "Balanced micronutrient supply"
    }
  },
  {
    name: "Chitra CBZ Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Liquid Fertilizer",
      technicalName: "Not Available",
      description: "Liquid fertilizer formulation for crop nutrition support.",
      modeOfAction: "Supplies nutrients in readily available form.",
      uses: "Crop growth improvement.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better crop vigor and nutrient uptake"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: [],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Keep away from children",
      composition: "Not Available",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Easy application"
    }
  },
  {
    name: "CCS-303 Liquid Fertilizer",
    updates: {
      category: "AGRICULTURAL FERTILIZER",
      subcategory: "Liquid Fertilizer",
      technicalName: "Not Available",
      description: "Agricultural liquid fertilizer for balanced crop nutrition.",
      modeOfAction: "Provides essential nutrients to plants.",
      uses: "General crop nutrition and growth support.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Improved crop growth and productivity"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray and Drip Irrigation",
      packSizes: [],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep away from children",
      composition: "Not Available",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Suitable for multiple crops"
    }
  }
];

// Function to match product names (fuzzy match)
function findMatchingProduct(name) {
  const nameLower = name.toLowerCase();
  return products.find(p => {
    const pNameLower = p.name.toLowerCase();
    return pNameLower === nameLower ||
           pNameLower.includes(nameLower) ||
           nameLower.includes(pNameLower);
  });
}

// Apply the fertilizer updates
let updatedCount = 0;
for (const update of fertilizerUpdates) {
  const product = findMatchingProduct(update.name);
  if (product) {
    // Update the product, keeping existing properties like id, slug, images
    Object.assign(product, update.updates, {
      overview: update.updates.description,
      description: update.updates.description
    });
    updatedCount++;
  } else {
    console.warn(`Product not found: ${update.name}`);
  }
}

// Write back to catalog
fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
console.log(`✅ Updated ${updatedCount} fertilizer products successfully!`);
