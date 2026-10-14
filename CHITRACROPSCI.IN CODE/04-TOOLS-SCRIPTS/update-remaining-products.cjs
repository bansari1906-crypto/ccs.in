const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const remainingProductUpdates = [
  {
    name: "FIMIDA-40",
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
    name: "CCS NEEM 100",
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
    name: "FENDOL-DP",
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
    name: "ATTACK-20",
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
  }
];

let updatedCount = 0;
for (const update of remainingProductUpdates) {
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
console.log("✅ Updated", updatedCount, "remaining products!");
