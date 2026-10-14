const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
let products = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const updates = [
  {
    name: "JORAWAR",
    updates: {
      category: "AGRICULTURE FUNGICIDE",
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
      category: "AGRICULTURE FUNGICIDE",
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
      category: "AGRICULTURE FUNGICIDE",
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
      category: "AGRICULTURE FUNGICIDE",
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
