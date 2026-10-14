const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const updates4158 = [
  {
    name: "JORAWAR",
    updates: {
      category: "Agriculture Fungicide",
      subcategory: "Systemic Fungicide",
      technicalName: "Azoxystrobin 11% + Tebuconazole 18.3% SC",
      description: "Combination fungicide for broad-spectrum fungal disease control.",
      modeOfAction: "Systemic fungicidal activity inhibiting fungal respiration and sterol biosynthesis.",
      uses: "Preventive and curative disease management.",
      targetPests: ["Powdery Mildew", "Rust", "Leaf Spot"],
      suitableCrops: ["Paddy", "Chilli", "Grapes", "Vegetables"],
      benefits: ["Long-lasting protection and broad-spectrum control."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid inhalation and direct contact",
      composition: "Azoxystrobin 11% + Tebuconazole 18.3% SC",
      activeIngredient: "Azoxystrobin, Tebuconazole",
      formulation: "SC",
      specialFeatures: "Dual-action fungicide formulation"
    }
  },
  {
    name: "KARGIL-75",
    updates: {
      category: "Agriculture Fungicide",
      subcategory: "Fungicide",
      technicalName: "Carbendazim 12% + Mancozeb 63% WP",
      description: "Broad-spectrum fungicide with systemic and contact action.",
      modeOfAction: "Prevents fungal growth through dual action.",
      uses: "Disease prevention and control in crops.",
      targetPests: ["Leaf Spot", "Blight", "Anthracnose"],
      suitableCrops: ["Vegetables", "Fruits", "Cereals"],
      benefits: ["Preventive and curative disease control."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Use gloves and mask during application",
      composition: "Carbendazim 12% + Mancozeb 63% WP",
      activeIngredient: "Carbendazim, Mancozeb",
      formulation: "WP",
      specialFeatures: "Dual fungicidal protection"
    }
  },
  {
    name: "VANDAN",
    updates: {
      category: "Agriculture Fungicide",
      subcategory: "Systemic Fungicide",
      technicalName: "Carbendazim 46.27% SC",
      description: "Systemic fungicide for effective fungal disease management.",
      modeOfAction: "Inhibits fungal cell division.",
      uses: "Disease prevention and crop protection.",
      targetPests: ["Powdery Mildew", "Leaf Spot", "Blight"],
      suitableCrops: ["Fruits", "Vegetables", "Field Crops"],
      benefits: ["Systemic protection and long residual activity."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid direct contact with skin and eyes",
      composition: "Carbendazim 46.27% SC",
      activeIngredient: "Carbendazim",
      formulation: "SC",
      specialFeatures: "Systemic disease control"
    }
  },
  {
    name: "KRANTIKARI",
    updates: {
      category: "Agriculture Fungicide",
      subcategory: "Systemic Fungicide",
      technicalName: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
      description: "Advanced fungicide for preventive and curative disease control.",
      modeOfAction: "Inhibits fungal respiration and sterol synthesis.",
      uses: "Broad-spectrum fungal disease management.",
      targetPests: ["Rust", "Blight", "Powdery Mildew"],
      suitableCrops: ["Chilli", "Paddy", "Fruits", "Vegetables"],
      benefits: ["Long-lasting disease protection and improved crop health."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool and dry area",
      safetyPrecautions: "Avoid inhalation and eye contact",
      composition: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
      activeIngredient: "Azoxystrobin, Difenoconazole",
      formulation: "SC",
      specialFeatures: "Dual systemic fungicide technology"
    }
  },
  {
    name: "CHITRAZINE",
    updates: {
      category: "Agricultural Herbicide",
      subcategory: "Selective Herbicide",
      technicalName: "Atrazine 50% WP",
      description: "Selective herbicide for weed control in crops.",
      modeOfAction: "Inhibits photosynthesis in weeds.",
      uses: "Pre and post-emergence weed control.",
      targetPests: ["Broadleaf Weeds and Grasses"],
      suitableCrops: ["Maize and Sugarcane"],
      benefits: ["Effective long-lasting weed control."],
      dose: "Not Available",
      applicationMethod: "Spray Application",
      packSizes: ["Not Available"],
      storageInstructions: "Store away from moisture",
      safetyPrecautions: "Avoid inhalation during mixing",
      composition: "Atrazine 50% WP",
      activeIngredient: "Atrazine",
      formulation: "WP",
      specialFeatures: "Selective weed control"
    }
  },
  {
    name: "KILL 71",
    updates: {
      category: "Agricultural Herbicide",
      subcategory: "Systemic Herbicide",
      technicalName: "Ammonium Salt of Glyphosate 71% SG",
      description: "Non-selective systemic herbicide for broad-spectrum weed control.",
      modeOfAction: "Inhibits amino acid synthesis in weeds.",
      uses: "Control of annual and perennial weeds.",
      targetPests: ["Broadleaf Weeds", "Grasses", "Sedges"],
      suitableCrops: ["Non-crop areas and directed crop spraying"],
      benefits: ["Complete weed eradication and systemic action."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store tightly sealed",
      safetyPrecautions: "Avoid drift to desirable crops",
      composition: "Glyphosate 71% SG",
      activeIngredient: "Glyphosate",
      formulation: "SG",
      specialFeatures: "Strong systemic translocation"
    }
  },
  {
    name: "KILL 41",
    updates: {
      category: "Agricultural Herbicide",
      subcategory: "Herbicide",
      technicalName: "Glyphosate 41% SL",
      description: "Systemic herbicide for effective weed management.",
      modeOfAction: "Translocated herbicide inhibiting plant growth.",
      uses: "Weed control in agricultural and non-crop areas.",
      targetPests: ["Broadleaf Weeds and Grasses"],
      suitableCrops: ["Directed application crops"],
      benefits: ["Broad-spectrum weed management."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid spray drift",
      composition: "Glyphosate 41% SL",
      activeIngredient: "Glyphosate",
      formulation: "SL",
      specialFeatures: "Effective systemic action"
    }
  },
  {
    name: "FUNGASTIN",
    updates: {
      category: "Agricultural Fungicide",
      subcategory: "Fungicide",
      technicalName: "Carbendazim 50% WP",
      description: "Fungicide formulation listed under herbicide section in catalog.",
      modeOfAction: "Systemic fungicidal activity inhibiting fungal growth.",
      uses: "Control of fungal diseases.",
      targetPests: ["Blight", "Leaf Spot", "Mildew"],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Preventive and curative disease control."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in dry cool place",
      safetyPrecautions: "Avoid inhalation and direct contact",
      composition: "Carbendazim 50% WP",
      activeIngredient: "Carbendazim",
      formulation: "WP",
      specialFeatures: "Broad-spectrum fungicidal activity"
    }
  },
  {
    name: "ATTACK 505",
    updates: {
      category: "Agricultural Insecticide",
      subcategory: "Combination Insecticide",
      technicalName: "Chlorpyriphos 50% + Cypermethrin 5% EC",
      description: "Combination insecticide for broad-spectrum pest management.",
      modeOfAction: "Contact and stomach poison action.",
      uses: "Control of chewing and sucking pests.",
      targetPests: ["Bollworms", "Whiteflies", "Caterpillars"],
      suitableCrops: ["Cotton", "Vegetables", "Fruits"],
      benefits: ["Fast knockdown and long residual action."],
      dose: "400 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid direct exposure during spraying",
      composition: "Chlorpyriphos 50% + Cypermethrin 5% EC",
      activeIngredient: "Chlorpyriphos, Cypermethrin",
      formulation: "EC",
      specialFeatures: "Synergistic combination formula"
    }
  },
  {
    name: "CCS-CARB ULTRA",
    updates: {
      category: "Bio Stimulant",
      subcategory: "Plant Immunity Booster",
      technicalName: "Plant Immunity Booster Bio Stimulant",
      description: "Bio stimulant designed to improve plant immunity and vigor.",
      modeOfAction: "Enhances natural plant defense mechanisms.",
      uses: "Stress management and growth promotion.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Improved immunity and crop vigor."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep away from children",
      composition: "Bio stimulant formulation",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Immunity enhancement"
    }
  },
  {
    name: "MULTI POWER 55",
    updates: {
      category: "Bio Stimulant",
      subcategory: "Bio Stimulant",
      technicalName: "Bio Stimulant",
      description: "Growth-promoting bio stimulant for agricultural crops.",
      modeOfAction: "Improves nutrient utilization and plant metabolism.",
      uses: "Crop growth enhancement.",
      targetPests: [],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Better crop vigor and productivity."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in dry area",
      safetyPrecautions: "Avoid direct exposure",
      composition: "Bio stimulant formulation",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Crop growth promotion"
    }
  },
  {
    name: "FLOWER PLUS",
    updates: {
      category: "Bio Stimulant",
      subcategory: "Amino Acid Bio Stimulant",
      technicalName: "Amino Acids + Vitamins Bio Stimulant",
      description: "Bio stimulant supporting flowering and fruit development.",
      modeOfAction: "Supplies amino acids and vitamins for metabolic activity.",
      uses: "Flowering and fruit setting enhancement.",
      targetPests: [],
      suitableCrops: ["Fruits", "Vegetables", "Flowers"],
      benefits: ["Better flowering, fruit setting and crop quality."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep container sealed after use",
      composition: "Amino Acids and Vitamins",
      activeIngredient: "Amino Acids",
      formulation: "Liquid",
      specialFeatures: "Flowering booster formulation"
    }
  },
  {
    name: "MENTED SUPER",
    updates: {
      category: "Bio Stimulant",
      subcategory: "Plant Immunity Booster",
      technicalName: "Plant Immunity Booster Bio Stimulant",
      description: "Bio stimulant for stress resistance and crop health improvement.",
      modeOfAction: "Enhances plant defense and physiological activity.",
      uses: "Plant immunity and stress management.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better stress tolerance and crop vigor."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid direct contact",
      composition: "Bio stimulant formulation",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Immunity enhancement technology"
    }
  },
  {
    name: "FLO-AVTAR",
    updates: {
      category: "Bio Stimulant",
      subcategory: "Bio Stimulant",
      technicalName: "Bio Stimulant",
      description: "Agricultural bio stimulant for plant growth enhancement.",
      modeOfAction: "Supports physiological and metabolic crop activity.",
      uses: "Growth and productivity enhancement.",
      targetPests: [],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Improved growth and crop health."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Keep away from children",
      composition: "Bio stimulant formulation",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Growth enhancement support"
    }
  },
  {
    name: "CRAGIBB",
    updates: {
      category: "Plant Growth Regulator",
      subcategory: "Gibberellic Acid PGR",
      technicalName: "Gibberellic Acid 0.001% L",
      description: "Plant growth regulator promoting cell elongation and crop growth.",
      modeOfAction: "Stimulates physiological growth processes in plants.",
      uses: "Flowering, fruit enlargement and crop growth.",
      targetPests: [],
      suitableCrops: ["Fruits", "Vegetables", "Grapes"],
      benefits: ["Better fruit size, elongation and flowering."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid excessive application",
      composition: "Gibberellic Acid 0.001%",
      activeIngredient: "Gibberellic Acid",
      formulation: "Liquid",
      specialFeatures: "Growth stimulation technology"
    }
  },
  {
    name: "ROOT RATAN",
    updates: {
      category: "Humic Acid",
      subcategory: "Humic Acid Booster",
      technicalName: "Humic Acid + Alginic Acid",
      description: "Soil conditioner and root growth promoter.",
      modeOfAction: "Enhances nutrient uptake and root development.",
      uses: "Soil health and root stimulation.",
      targetPests: [],
      suitableCrops: ["All crops"],
      benefits: ["Better root growth and nutrient efficiency."],
      dose: "Not Available",
      applicationMethod: "Soil Application, Drip Irrigation",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep container tightly closed",
      composition: "Humic Acid + Alginic Acid",
      activeIngredient: "Humic Acid, Alginic Acid",
      formulation: "Liquid",
      specialFeatures: "Root stimulation support"
    }
  },
  {
    name: "AMITRA 80",
    updates: {
      category: "Amino Acid",
      subcategory: "Plant Growth Promoter",
      technicalName: "Amino Acid 80% Powder",
      description: "Premium amino acid formulation for crop growth and stress resistance.",
      modeOfAction: "Improves metabolism and nutrient uptake.",
      uses: "Flowering, fruit setting and stress management.",
      targetPests: [],
      suitableCrops: ["Pomegranate", "Grapes", "Vegetables", "Fruits"],
      benefits: ["Better flowering, fruit setting and crop growth."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray, Soil Application",
      packSizes: ["250 gm", "500 gm", "1 Kg"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid moisture contamination",
      composition: "Amino Acid 80%",
      activeIngredient: "Amino Acids",
      formulation: "Powder",
      specialFeatures: "Stress resistance enhancement"
    }
  },
  {
    name: "SUPPORTER",
    updates: {
      category: "Agricultural Pesticide",
      subcategory: "Virus Controller",
      technicalName: "Specially Virus Controller Pesticide",
      description: "Specialized pesticide formulation for virus management in crops.",
      modeOfAction: "Supports crop protection against viral stress conditions.",
      uses: "Virus management in agricultural crops.",
      targetPests: ["Viral Diseases"],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Crop protection and improved plant health."],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Keep away from children and food materials",
      composition: "Not Available",
      activeIngredient: "Not Available",
      formulation: "Liquid",
      specialFeatures: "Specialized virus control support"
    }
  }
];

let updatedCount = 0;
for (const update of updates4158) {
  const product = products.find(p => p.name.toLowerCase() === update.name.toLowerCase().replace(/[- ]/g, '').toLowerCase());
  if (product) {
    Object.assign(product, update.updates, {
      overview: update.updates.description,
      description: update.updates.description
    });
    updatedCount++;
  } else {
    console.warn("Could not find product:", update.name);
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
console.log("✅ Updated", updatedCount, "products!");
