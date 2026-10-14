const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const productUpdates2140 = [
  {
    name: "C-IMIDA",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Systemic Insecticide",
      technicalName: "Imidacloprid 17.8% SL",
      description: "Systemic insecticide for effective control of sucking pests in various crops.",
      modeOfAction: "Acts on insect nervous system through systemic activity.",
      uses: "Control of aphids, jassids, thrips and whiteflies.",
      targetPests: ["Aphids", "Jassids", "Thrips", "Whiteflies"],
      suitableCrops: ["Cotton", "Paddy", "Vegetables"],
      benefits: ["Fast action", "systemic control", "long residual protection"],
      dose: "150 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid contact with skin and eyes",
      composition: "Imidacloprid 17.8% SL",
      activeIngredient: "Imidacloprid",
      formulation: "SL",
      specialFeatures: "Strong systemic activity"
    }
  },
  {
    name: "C-IMIDA SUPER",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Systemic Insecticide",
      technicalName: "Imidacloprid 30.5% SC",
      description: "Premium systemic insecticide for rapid and long-lasting pest control.",
      modeOfAction: "Systemic and translaminar insecticidal action.",
      uses: "Controls aphids, thrips, whiteflies and jassids.",
      targetPests: ["Aphids", "Thrips", "Whiteflies", "Jassids"],
      suitableCrops: ["Cotton", "Paddy", "Vegetables", "Fruits"],
      benefits: ["Long residual control", "fast knockdown", "broad-spectrum activity"],
      dose: "60–75 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store away from sunlight",
      safetyPrecautions: "Wear protective clothing during spraying",
      composition: "Imidacloprid 30.5% SC",
      activeIngredient: "Imidacloprid",
      formulation: "SC",
      specialFeatures: "Excellent translaminar movement"
    }
  },
  {
    name: "FIMIDA 40",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Combination Insecticide",
      technicalName: "Fipronil 40% + Imidacloprid 40% WG",
      description: "Combination insecticide with systemic and contact action.",
      modeOfAction: "Dual active ingredients target insect nervous system.",
      uses: "Control of sucking and chewing pests.",
      targetPests: ["Whiteflies", "Aphids", "Thrips", "Borers"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Broad-spectrum control and long residual activity"],
      dose: "80–100 gm per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["40 gm", "100 gm", "250 gm"],
      storageInstructions: "Store in cool dry area",
      safetyPrecautions: "Avoid inhalation and direct exposure",
      composition: "Fipronil 40% + Imidacloprid 40% WG",
      activeIngredient: "Fipronil + Imidacloprid",
      formulation: "WG",
      specialFeatures: "Dual mode insect control"
    }
  },
  {
    name: "CHITGOR",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Insecticide",
      technicalName: "Dimethoate 30% EC",
      description: "Organophosphate insecticide for effective pest management.",
      modeOfAction: "Contact and systemic insecticidal activity.",
      uses: "Control of sucking pests.",
      targetPests: ["Aphids", "Jassids", "Whiteflies"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Quick pest knockdown and reliable performance"],
      dose: "400 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store tightly closed in dry place",
      safetyPrecautions: "Avoid inhalation and skin exposure",
      composition: "Dimethoate 30% EC",
      activeIngredient: "Dimethoate",
      formulation: "EC",
      specialFeatures: "Effective systemic control"
    }
  },
  {
    name: "BENZO FIRE",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Insecticide",
      technicalName: "Emamectin Benzoate 1.9% EC",
      description: "Fast-acting insecticide for caterpillar and borer control.",
      modeOfAction: "Translaminar insecticidal action.",
      uses: "Control of caterpillars and fruit borers.",
      targetPests: ["Caterpillars", "Borers", "Larvae"],
      suitableCrops: ["Cotton", "Chilli", "Tomato"],
      benefits: ["Strong larval control and crop safety"],
      dose: "200 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Wear gloves during use",
      composition: "Emamectin Benzoate 1.9% EC",
      activeIngredient: "Emamectin Benzoate",
      formulation: "EC",
      specialFeatures: "Long residual control"
    }
  },
  {
    name: "BENZO KILL",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Insecticide",
      technicalName: "Emamectin Benzoate 5% SG",
      description: "Premium insecticide with strong larval control.",
      modeOfAction: "Affects insect nervous system through ingestion.",
      uses: "Management of fruit borers and leaf-eating larvae.",
      targetPests: ["Fruit Borers", "Pod Borers", "Helicoverpa"],
      suitableCrops: ["Cotton", "Chilli", "Tomato", "Okra"],
      benefits: ["Long residual effect and excellent crop safety"],
      dose: "80–100 gm per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm"],
      storageInstructions: "Store in dry area",
      safetyPrecautions: "Keep away from food materials",
      composition: "Emamectin Benzoate 5% SG",
      activeIngredient: "Emamectin Benzoate",
      formulation: "SG",
      specialFeatures: "Strong larval control"
    }
  },
  {
    name: "NOVA-404",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Broad Spectrum Insecticide",
      technicalName: "Profenofos 40% + Cypermethrin 4% EC",
      description: "Combination insecticide for chewing and sucking pest control.",
      modeOfAction: "Contact and stomach poison action.",
      uses: "Bollworm and sucking pest management.",
      targetPests: ["Bollworms", "Whiteflies", "Aphids"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Broad-spectrum action and fast control"],
      dose: "400–450 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in original container",
      safetyPrecautions: "Avoid skin contact",
      composition: "Profenofos 40% + Cypermethrin 4% EC",
      activeIngredient: "Profenofos + Cypermethrin",
      formulation: "EC",
      specialFeatures: "Combination insecticidal activity"
    }
  },
  {
    name: "BHISMA GOLD",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Broad Spectrum Insecticide",
      technicalName: "Profenophos 50% EC",
      description: "Broad-spectrum insecticide for chewing and sucking pests.",
      modeOfAction: "Contact and stomach insecticide.",
      uses: "Control of bollworms, mites and whiteflies.",
      targetPests: ["Bollworms", "Whiteflies", "Aphids", "Mites"],
      suitableCrops: ["Cotton", "Vegetables", "Fruits"],
      benefits: ["Fast knockdown and residual control"],
      dose: "500–600 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["250 ml", "500 ml", "1 Litre", "5 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Use protective clothing during application",
      composition: "Profenophos 50% EC",
      activeIngredient: "Profenophos",
      formulation: "EC",
      specialFeatures: "Excellent crop safety"
    }
  },
  {
    name: "HUKUMAT",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Systemic Contact Insecticide",
      technicalName: "Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC",
      description: "Dual-action insecticide for fast pest knockdown.",
      modeOfAction: "Systemic and contact action on insect nervous system.",
      uses: "Control of sucking and chewing pests.",
      targetPests: ["Whiteflies", "Aphids", "Thrips"],
      suitableCrops: ["Cotton", "Paddy", "Vegetables"],
      benefits: ["Fast action and long-lasting control"],
      dose: "100 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Avoid inhalation and skin exposure",
      composition: "Thiamethoxam + Lambda Cyhalothrin",
      activeIngredient: "Thiamethoxam, Lambda Cyhalothrin",
      formulation: "ZC",
      specialFeatures: "Dual-action insecticide"
    }
  },
  {
    name: "CRETA SUPER",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Systemic Insecticide",
      technicalName: "Thiamethoxam 30% FS",
      description: "Seed treatment insecticide for crop protection during early stages.",
      modeOfAction: "Systemic action protecting seedlings from pests.",
      uses: "Seed treatment for sucking pest control.",
      targetPests: ["Early-stage sucking pests"],
      suitableCrops: ["Cotton", "Cereals"],
      benefits: ["Better seedling protection and crop establishment"],
      dose: "150 ml per acre",
      applicationMethod: "Seed Treatment",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store tightly sealed",
      safetyPrecautions: "Avoid direct contact during treatment",
      composition: "Thiamethoxam 30% FS",
      activeIngredient: "Thiamethoxam",
      formulation: "FS",
      specialFeatures: "Strong systemic protection"
    }
  },
  {
    name: "CHITARA",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Systemic Insecticide",
      technicalName: "Thiamethoxam 25% WG",
      description: "Systemic insecticide for sucking pest control.",
      modeOfAction: "Acts on nicotinic receptors of insects.",
      uses: "Aphid and whitefly management.",
      targetPests: ["Aphids", "Thrips", "Whiteflies"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Long-lasting systemic control"],
      dose: "200–230 gm per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
      storageInstructions: "Store in dry cool place",
      safetyPrecautions: "Avoid inhalation of dust",
      composition: "Thiamethoxam 25% WG",
      activeIngredient: "Thiamethoxam",
      formulation: "WG",
      specialFeatures: "Fast systemic activity"
    }
  },
  {
    name: "CCS-NEEM 100",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Botanical Insecticide",
      technicalName: "Azadirachtin 1% (1000 ppm)",
      description: "Neem-based botanical insecticide for eco-friendly pest management.",
      modeOfAction: "Antifeedant and insect growth regulator action.",
      uses: "Organic pest management.",
      targetPests: ["Sucking pests and larvae"],
      suitableCrops: ["All crops"],
      benefits: ["Eco-friendly and residue-free protection"],
      dose: "300 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store away from sunlight",
      safetyPrecautions: "Keep away from children",
      composition: "Azadirachtin 1%",
      activeIngredient: "Azadirachtin",
      formulation: "EC",
      specialFeatures: "Botanical insecticide"
    }
  },
  {
    name: "FENDOL DP",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Dusting Insecticide",
      technicalName: "Fenvalerate 0.4% DP",
      description: "Dusting insecticide for pest control in field crops.",
      modeOfAction: "Contact insecticidal activity.",
      uses: "Control of field pests.",
      targetPests: ["Caterpillars and field insects"],
      suitableCrops: ["Agricultural crops"],
      benefits: ["Easy dusting application and effective control"],
      dose: "4 Kg per acre",
      applicationMethod: "Dusting",
      packSizes: ["1 Kg", "5 Kg", "10 Kg", "25 Kg"],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Avoid inhalation of dust",
      composition: "Fenvalerate 0.4% DP",
      activeIngredient: "Fenvalerate",
      formulation: "DP",
      specialFeatures: "Dust formulation for easy field use"
    }
  },
  {
    name: "PLATINUM-5",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Insecticide",
      technicalName: "Lambda Cyhalothrin 5% EC",
      description: "Synthetic pyrethroid insecticide with fast knockdown action.",
      modeOfAction: "Affects insect nervous system on contact.",
      uses: "Control of sucking and chewing pests.",
      targetPests: ["Caterpillars", "Thrips", "Aphids"],
      suitableCrops: ["Cotton", "Vegetables"],
      benefits: ["Quick action and effective protection"],
      dose: "250 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in cool place",
      safetyPrecautions: "Use protective equipment",
      composition: "Lambda Cyhalothrin 5% EC",
      activeIngredient: "Lambda Cyhalothrin",
      formulation: "EC",
      specialFeatures: "Fast knockdown action"
    }
  },
  {
    name: "LASKAR",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Capsule Suspension Insecticide",
      technicalName: "Lambda Cyhalothrin 4.9% CS",
      description: "Capsule suspension insecticide for long-lasting protection.",
      modeOfAction: "Contact insecticide with controlled release action.",
      uses: "Control of chewing and sucking pests.",
      targetPests: ["Caterpillars", "Whiteflies", "Aphids"],
      suitableCrops: ["Cotton and vegetables"],
      benefits: ["Long residual protection"],
      dose: "200 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in original container",
      safetyPrecautions: "Avoid contamination of water sources",
      composition: "Lambda Cyhalothrin 4.9% CS",
      activeIngredient: "Lambda Cyhalothrin",
      formulation: "CS",
      specialFeatures: "Controlled release technology"
    }
  },
  {
    name: "AGNEEPATH SC",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Insecticide",
      technicalName: "Fipronil 5% SC",
      description: "Broad-spectrum insecticide for effective pest management.",
      modeOfAction: "Disrupts insect nervous system through contact and ingestion.",
      uses: "Control of stem borers and sucking pests.",
      targetPests: ["Stem Borers", "Thrips", "Leaf Feeders"],
      suitableCrops: ["Paddy", "Cotton", "Vegetables"],
      benefits: ["Long-lasting control and crop safety"],
      dose: "300 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid direct exposure",
      composition: "Fipronil 5% SC",
      activeIngredient: "Fipronil",
      formulation: "SC",
      specialFeatures: "Effective broad-spectrum control"
    }
  },
  {
    name: "AGNEEPATH GR",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Granular Insecticide",
      technicalName: "Fipronil 0.3% GR",
      description: "Granular insecticide for soil and field application.",
      modeOfAction: "Contact and stomach poison activity.",
      uses: "Stem borer and soil pest management.",
      targetPests: ["Stem Borers and soil insects"],
      suitableCrops: ["Paddy and field crops"],
      benefits: ["Effective granular protection"],
      dose: "4 Kg per acre",
      applicationMethod: "Granule Broadcasting",
      packSizes: ["1 Kg", "5 Kg"],
      storageInstructions: "Store in dry place",
      safetyPrecautions: "Keep away from children and animals",
      composition: "Fipronil 0.3% GR",
      activeIngredient: "Fipronil",
      formulation: "GR",
      specialFeatures: "Granular field application"
    }
  },
  {
    name: "AGNEEPATH GR 5 KG",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Granular Insecticide",
      technicalName: "Fipronil 0.3% GR",
      description: "Granular insecticide pack for large-scale field application.",
      modeOfAction: "Contact and ingestion activity against pests.",
      uses: "Soil and stem borer control.",
      targetPests: ["Stem Borers and soil insects"],
      suitableCrops: ["Paddy"],
      benefits: ["Easy field broadcasting and residual action"],
      dose: "4 Kg per acre",
      applicationMethod: "Broadcasting",
      packSizes: ["5 Kg"],
      storageInstructions: "Store in moisture-free place",
      safetyPrecautions: "Avoid direct hand contact",
      composition: "Fipronil 0.3% GR",
      activeIngredient: "Fipronil",
      formulation: "GR",
      specialFeatures: "Bulk granular packaging"
    }
  },
  {
    name: "ATTACK 20",
    updates: {
      category: "AGRICULTURAL INSECTICIDE",
      subcategory: "Broad Spectrum Insecticide",
      technicalName: "Chlorpyriphos 20% EC",
      description: "Effective insecticide for termites and sucking pests.",
      modeOfAction: "Contact and stomach poison action.",
      uses: "Pest control in field crops.",
      targetPests: ["Aphids", "Whiteflies", "Borers", "Termites"],
      suitableCrops: ["Cotton", "Paddy", "Vegetables"],
      benefits: ["Reliable broad-spectrum control"],
      dose: "500–1500 ml per acre",
      applicationMethod: "Foliar Spray",
      packSizes: ["250 ml", "500 ml", "1 Litre", "5 Litre"],
      storageInstructions: "Store away from sunlight",
      safetyPrecautions: "Use gloves and protective mask",
      composition: "Chlorpyriphos 20% EC",
      activeIngredient: "Chlorpyriphos",
      formulation: "EC",
      specialFeatures: "Strong residual effect"
    }
  },
  {
    name: "CYMO PLUS",
    updates: {
      category: "AGRICULTURE FUNGICIDE",
      subcategory: "Systemic Contact Fungicide",
      technicalName: "Cymoxanil 8% + Mancozeb 64% WP",
      description: "Combination fungicide providing preventive and curative disease control.",
      modeOfAction: "Systemic and contact fungicidal activity.",
      uses: "Control of fungal diseases in crops.",
      targetPests: ["Downy Mildew", "Late Blight"],
      suitableCrops: ["Vegetables and field crops"],
      benefits: ["Broad-spectrum disease management"],
      dose: "Not Available",
      applicationMethod: "Foliar Spray",
      packSizes: ["Not Available"],
      storageInstructions: "Store in cool dry place",
      safetyPrecautions: "Avoid inhalation during mixing",
      composition: "Cymoxanil 8% + Mancozeb 64% WP",
      activeIngredient: "Cymoxanil and Mancozeb",
      formulation: "WP",
      specialFeatures: "Preventive and curative action"
    }
  }
];

// Function to match and update products
let updatedProductsCount = 0;
for (const update of productUpdates2140) {
  let product = products.find(p => p.name.toLowerCase() === update.name.toLowerCase());
  if (product) {
    Object.assign(product, update.updates, {
      overview: update.updates.description,
      description: update.updates.description
    });
    updatedProductsCount++;
  } else {
    console.warn(`Could not find product: ${update.name}`);
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
console.log(`✅ Updated ${updatedProductsCount} products!`);
