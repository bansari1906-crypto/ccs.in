const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const updates = [
  {
    name: "AAKRAMAN",
    updates: {
      category: "INSECTICIDE",
      subcategory: "ZC INSECTICIDE",
      technicalName: "Chlorantraniliprole 9.3% + Lambda Cyhalothrin 4.6% ZC",
      description: "Dual action insecticide for effective chewing pest control.",
      uses: "Caterpillar and larval control",
      targetPests: ["Caterpillars", "Larvae"],
      suitableCrops: ["Cotton", "Chilli", "Vegetables"],
      benefits: ["Fast knockdown and long residual effect"],
      dose: "150 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Chlorantraniliprole 9.3% + Lambda Cyhalothrin 4.6% ZC",
      activeIngredient: "Chlorantraniliprole, Lambda Cyhalothrin",
      formulation: "ZC"
    }
  },
  {
    name: "ABACHIT",
    updates: {
      category: "INSECTICIDE",
      subcategory: "AVERMECTIN INSECTICIDE",
      technicalName: "Abamectin 1.9% EC",
      description: "Broad spectrum insecticide and miticide.",
      uses: "Mite and sucking pest control",
      targetPests: ["Mites", "Sucking Pests"],
      suitableCrops: ["Vegetables", "Cotton"],
      benefits: ["Translaminar action and quick control"],
      dose: "150–200 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Abamectin 1.9% EC",
      activeIngredient: "Abamectin",
      formulation: "EC"
    }
  },
  {
    name: "AMITRA 80",
    updates: {
      category: "PGR",
      subcategory: "AMINO ACID",
      technicalName: "Amino Acid 80% Powder",
      description: "Plant growth promoter and stress reliever.",
      uses: "Growth enhancement and flowering support",
      targetPests: [],
      suitableCrops: ["All Crops"],
      benefits: ["Better flowering and crop vigor"],
      dose: "500 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Amino Acid 80%",
      activeIngredient: "Amino Acid",
      formulation: "Powder"
    }
  },
  {
    name: "ATTACK-10 G",
    updates: {
      category: "INSECTICIDE",
      subcategory: "GRANULAR INSECTICIDE",
      technicalName: "Chlorpyriphos 10% GR",
      description: "Granular insecticide for soil pest control.",
      uses: "Soil insect and termite control",
      targetPests: ["Soil Insects", "Termites"],
      suitableCrops: ["Paddy", "Sugarcane"],
      benefits: ["Long residual control"],
      dose: "4–10 Kg Per Acre",
      applicationMethod: "Soil Application",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Chlorpyriphos 10% GR",
      activeIngredient: "Chlorpyriphos",
      formulation: "GR"
    }
  },
  {
    name: "ATTACK-50",
    updates: {
      category: "INSECTICIDE",
      subcategory: "ORGANOPHOSPHATE INSECTICIDE",
      technicalName: "Chlorpyriphos 50% EC",
      description: "Contact and stomach insecticide.",
      uses: "Bollworm and sucking pest control",
      targetPests: ["Bollworms", "Sucking Pests"],
      suitableCrops: ["Cotton and Vegetables"],
      benefits: ["Strong residual effect"],
      dose: "300–400 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Chlorpyriphos 50% EC",
      activeIngredient: "Chlorpyriphos",
      formulation: "EC"
    }
  },
  {
    name: "AZOTECH",
    updates: {
      category: "FUNGICIDE",
      subcategory: "SYSTEMIC FUNGICIDE",
      technicalName: "Dimethomorph 50% WP",
      description: "Systemic fungicide for fungal disease control.",
      uses: "Downy mildew and blight control",
      targetPests: ["Downy Mildew", "Blight"],
      suitableCrops: ["Grapes", "Vegetables"],
      benefits: ["Curative and preventive action"],
      dose: "400–450 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Dimethomorph 50% WP",
      activeIngredient: "Dimethomorph",
      formulation: "WP"
    }
  },
  {
    name: "AZTRIX",
    updates: {
      category: "FUNGICIDE",
      subcategory: "CONTACT FUNGICIDE",
      technicalName: "Propineb 70% WP",
      description: "Broad spectrum contact fungicide.",
      uses: "Leaf spot and blight control",
      targetPests: ["Leaf Spot", "Blight"],
      suitableCrops: ["Fruits and Vegetables"],
      benefits: ["Preventive disease management"],
      dose: "600–800 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Propineb 70% WP",
      activeIngredient: "Propineb",
      formulation: "WP"
    }
  },
  {
    name: "BENZO NIL",
    updates: {
      category: "INSECTICIDE",
      subcategory: "COMBINATION INSECTICIDE",
      technicalName: "Emamectin Benzoate 1.5% + Fipronil 3.5% SC",
      description: "Combination insecticide for larval pest control.",
      uses: "Caterpillar and borer control",
      targetPests: ["Caterpillars", "Borers"],
      suitableCrops: ["Cotton", "Chilli"],
      benefits: ["Dual action insect control"],
      dose: "200–300 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Emamectin Benzoate 1.5% + Fipronil 3.5% SC",
      activeIngredient: "Emamectin Benzoate, Fipronil",
      formulation: "SC"
    }
  },
  {
    name: "BHAGAO",
    updates: {
      category: "HERBICIDE",
      subcategory: "SULFONYLUREA HERBICIDE",
      technicalName: "Halosulfuron Methyl 75% WG",
      description: "Selective herbicide for sedge weed control.",
      uses: "Weed management",
      targetPests: ["Sedge Weeds"],
      suitableCrops: ["Sugarcane and Maize"],
      benefits: ["Effective sedge control"],
      dose: "36 gm Per Acre",
      applicationMethod: "Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Halosulfuron Methyl 75% WG",
      activeIngredient: "Halosulfuron Methyl",
      formulation: "WG"
    }
  },
  {
    name: "C-IMIDA",
    updates: {
      category: "INSECTICIDE",
      subcategory: "SYSTEMIC INSECTICIDE",
      technicalName: "Imidacloprid 17.8% SL",
      description: "Systemic insecticide for sucking pest control.",
      uses: "Whitefly and aphid control",
      targetPests: ["Whiteflies", "Aphids"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Long residual activity"],
      dose: "150 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Imidacloprid 17.8% SL",
      activeIngredient: "Imidacloprid",
      formulation: "SL"
    }
  },
  {
    name: "CCS-303",
    updates: {
      category: "PGR",
      subcategory: "BIO STIMULANT",
      technicalName: "Bio Stimulant",
      description: "Crop growth enhancer bio stimulant.",
      uses: "Plant growth and vigor enhancement",
      targetPests: [],
      suitableCrops: ["All Crops"],
      benefits: ["Better crop performance"],
      dose: "250–300 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Bio Stimulant",
      activeIngredient: "Bio Stimulant",
      formulation: "Liquid"
    }
  },
  {
    name: "CCS-CARB",
    updates: {
      category: "PGR",
      subcategory: "PLANT IMMUNITY BOOSTER",
      technicalName: "Plant Immunity Booster Bio Stimulant",
      description: "Enhances crop immunity and stress tolerance.",
      uses: "Stress management",
      targetPests: [],
      suitableCrops: ["All Crops"],
      benefits: ["Improved immunity and growth"],
      dose: "1 Ltr Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Plant Immunity Booster Bio Stimulant",
      activeIngredient: "Plant Immunity Booster",
      formulation: "Liquid"
    }
  },
  {
    name: "CYQ-320",
    updates: {
      category: "INSECTICIDE",
      subcategory: "COMBINATION INSECTICIDE",
      technicalName: "Cypermethrin 3% + Quinalphos 20% EC",
      description: "Broad spectrum contact insecticide.",
      uses: "Caterpillar and sucking pest control",
      targetPests: ["Caterpillars", "Sucking Pests"],
      suitableCrops: ["Cotton and Vegetables"],
      benefits: ["Fast knockdown action"],
      dose: "400–500 ml Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Cypermethrin 3% + Quinalphos 20% EC",
      activeIngredient: "Cypermethrin, Quinalphos",
      formulation: "EC"
    }
  },
  {
    name: "CHIT FIGHTER",
    updates: {
      category: "INSECTICIDE",
      subcategory: "GRANULAR INSECTICIDE",
      technicalName: "Chlorantraniliprole 0.4% GR",
      description: "Granular insecticide for borer control.",
      uses: "Stem borer control",
      targetPests: ["Stem Borers"],
      suitableCrops: ["Paddy"],
      benefits: ["Long residual activity"],
      dose: "400 ml Per Acre",
      applicationMethod: "Soil/Granule Application",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Chlorantraniliprole 0.4% GR",
      activeIngredient: "Chlorantraniliprole",
      formulation: "GR"
    }
  },
  {
    name: "CHIT PRIDE",
    updates: {
      category: "INSECTICIDE",
      subcategory: "NEONICOTINOID INSECTICIDE",
      technicalName: "Acetamiprid 20% SP",
      description: "Systemic insecticide for sucking pests.",
      uses: "Aphid and whitefly control",
      targetPests: ["Aphids", "Whiteflies"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Quick systemic action"],
      dose: "20–40 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Acetamiprid 20% SP",
      activeIngredient: "Acetamiprid",
      formulation: "SP"
    }
  },
  {
    name: "CHITARA",
    updates: {
      category: "INSECTICIDE",
      subcategory: "SYSTEMIC INSECTICIDE",
      technicalName: "Thiamethoxam 25% WG",
      description: "Systemic insecticide for sucking pest control.",
      uses: "Whitefly and aphid control",
      targetPests: ["Whiteflies", "Aphids"],
      suitableCrops: ["Cotton and Vegetables"],
      benefits: ["Long duration protection"],
      dose: "200–230 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Thiamethoxam 25% WG",
      activeIngredient: "Thiamethoxam",
      formulation: "WG"
    }
  },
  {
    name: "CHITGIBB EZY",
    updates: {
      category: "PGR",
      subcategory: "GIBBERELLIC ACID",
      technicalName: "Gibberellic Acid 40% WSG",
      description: "Flowering and growth stimulant.",
      uses: "Flowering and fruit development",
      targetPests: [],
      suitableCrops: ["Fruits and Vegetables"],
      benefits: ["Better fruit size and yield"],
      dose: "10–20 gm Per Acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      composition: "Gibberellic Acid 40% WSG",
      activeIngredient: "Gibberellic Acid",
      formulation: "WSG"
    }
  },
  {
    name: "CHITMIZA-10",
    updates: {
      category: "HERBICIDE",
      subcategory: "SELECTIVE HERBICIDE",
      technicalName: "Imazethapyr 10% SL",
      description: "Selective herbicide for weed control.",
      uses: "Broadleaf weed management",
      targetPests: ["Broadleaf Weeds"],
      suitableCrops: ["Soybean and Pulses"],
      benefits: ["Effective post-emergence control"],
      dose: "400–600 ml Per Acre",
      applicationMethod: "Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Ltr"],
      composition: "Imazethapyr 10% SL",
      activeIngredient: "Imazethapyr",
      formulation: "SL"
    }
  },
  {
    name: "CHITRA 888",
    updates: {
      category: "FERTILIZER",
      subcategory: "NPK FERTILIZER",
      technicalName: "NPK Fertilizer",
      description: "Balanced nutrient fertilizer for crop growth.",
      uses: "Nutrient management",
      targetPests: [],
      suitableCrops: ["All Crops"],
      benefits: ["Balanced crop nutrition"],
      dose: "Not Available",
      applicationMethod: "Soil/Fertigation",
      packSizes: ["Not Available"],
      composition: "NPK Fertilizer",
      activeIngredient: "NPK",
      formulation: "Not Available"
    }
  }
];

let updatedCount = 0;
for (const update of updates) {
  const product = products.find(p => p.name.toLowerCase() === update.name.toLowerCase());
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
