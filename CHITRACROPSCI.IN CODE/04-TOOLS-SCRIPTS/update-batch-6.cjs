
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const PRODUCTS_DATA = [
  {
    "slug": "chit-bright",
    "name": "CHIT BRIGHT",
    "category": "PGR",
    "technicalName": "Micronutrient Plant Booster",
    "formulation": "Liquid",
    "description": "Crop enhancer for greener leaves and healthy vegetative growth.",
    "uses": "Leaf greening and chlorophyll improvement.",
    "benefits": ["Improves photosynthesis", "Enhances crop vigor"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Foliar Spray",
    "dose": "250–500 ml per acre",
    "packSizes": ["250 ml", "500 ml", "1 Ltr"],
    "seoTitle": "CHIT BRIGHT Plant Booster",
    "seoDescription": "Micronutrient based crop enhancer for greener and healthier crops."
  },
  {
    "slug": "dharti-ratan",
    "name": "DHARTI RATAN",
    "category": "PGR",
    "technicalName": "Soil Conditioner Bio Stimulant",
    "formulation": "Granule",
    "description": "Advanced soil conditioner for improving soil fertility and root development.",
    "uses": "Soil health and root zone enhancement.",
    "benefits": ["Improves soil structure", "Enhances root growth"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Soil Application",
    "dose": "5–10 Kg per acre",
    "packSizes": ["5 Kg", "10 Kg", "25 Kg"],
    "seoTitle": "DHARTI RATAN Soil Conditioner",
    "seoDescription": "Soil conditioner for improved fertility and root development."
  },
  {
    "slug": "root-ratan",
    "name": "ROOT RATAN",
    "category": "PGR",
    "technicalName": "Root Growth Enhancer",
    "formulation": "Liquid",
    "description": "Bio stimulant for strong root development and crop establishment.",
    "uses": "Root growth and nutrient uptake enhancement.",
    "benefits": ["Improves root mass", "Better nutrient absorption"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Drip / Soil Drench",
    "dose": "500 ml per acre",
    "packSizes": ["250 ml", "500 ml", "1 Ltr"],
    "seoTitle": "ROOT RATAN Root Booster",
    "seoDescription": "Root growth promoter for stronger root development and crop vigor."
  },
  {
    "slug": "dr-root-raja",
    "name": "DR ROOT RAJA",
    "category": "PGR",
    "technicalName": "Advanced Root Activator",
    "formulation": "Liquid",
    "description": "Premium root activator for improved root growth and crop establishment.",
    "uses": "Root development and stress recovery.",
    "benefits": ["Strong root system", "Improves crop health"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Drip / Soil Drench",
    "dose": "500 ml – 1 Ltr per acre",
    "packSizes": ["250 ml", "500 ml", "1 Ltr"],
    "seoTitle": "DR ROOT RAJA Root Activator",
    "seoDescription": "Advanced root growth promoter for healthy crop development."
  },
  {
    "slug": "root-raja",
    "name": "ROOT RAJA",
    "category": "PGR",
    "technicalName": "Root Development Bio Stimulant",
    "formulation": "Liquid",
    "description": "Plant growth promoter for strong and healthy root systems.",
    "uses": "Root growth and plant establishment.",
    "benefits": ["Enhances root development", "Improves nutrient uptake"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Drip / Soil Drench",
    "dose": "500 ml per acre",
    "packSizes": ["250 ml", "500 ml", "1 Ltr"],
    "seoTitle": "ROOT RAJA Root Growth Promoter",
    "seoDescription": "Bio stimulant for healthy root development and crop growth."
  },
  {
    "slug": "flo-avtar",
    "name": "FLO-AVTAR",
    "category": "PGR",
    "technicalName": "Flowering Enhancer",
    "formulation": "Liquid",
    "description": "Flowering stimulant for better flower initiation and fruit setting.",
    "uses": "Flower and fruit development.",
    "benefits": ["Improves flowering", "Better fruit retention"],
    "suitableCrops": ["Vegetables", "Fruits"],
    "applicationMethod": "Foliar Spray",
    "dose": "250–500 ml per acre",
    "packSizes": ["250 ml", "500 ml"],
    "seoTitle": "FLO-AVTAR Flower Booster",
    "seoDescription": "Flowering enhancer for improved fruit setting and crop yield."
  },
  {
    "slug": "cragibb",
    "name": "CRAGIBB",
    "category": "PGR",
    "technicalName": "Gibberellic Acid Based Plant Growth Regulator",
    "formulation": "Liquid",
    "description": "Plant growth regulator for vegetative growth and fruit development.",
    "uses": "Flowering and fruit enlargement.",
    "benefits": ["Enhances fruit size", "Improves crop growth"],
    "suitableCrops": ["Fruits", "Vegetables"],
    "applicationMethod": "Foliar Spray",
    "dose": "100–200 ml per acre",
    "packSizes": ["100 ml", "250 ml"],
    "seoTitle": "CRAGIBB Plant Growth Regulator",
    "seoDescription": "Gibberellic acid based growth regulator for flowering and fruit growth."
  },
  {
    "slug": "mented-super",
    "name": "MENTED SUPER",
    "category": "PGR",
    "technicalName": "Micronutrient Enriched Bio Stimulant",
    "formulation": "Liquid",
    "description": "Plant growth enhancer enriched with essential micronutrients.",
    "uses": "Vegetative growth and stress management.",
    "benefits": ["Improves plant vigor", "Enhances crop health"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Foliar Spray",
    "dose": "250–500 ml per acre",
    "packSizes": ["250 ml", "500 ml"],
    "seoTitle": "MENTED SUPER Plant Booster",
    "seoDescription": "Micronutrient enriched bio stimulant for healthy crop growth."
  },
  {
    "slug": "on-spot",
    "name": "ON SPOT",
    "category": "PGR",
    "technicalName": "Ethephon 39% SL",
    "formulation": "SL",
    "activeIngredient": "Ethephon",
    "description": "Plant growth regulator for ripening and flowering enhancement.",
    "uses": "Fruit ripening and flowering synchronization.",
    "benefits": ["Uniform ripening", "Improved harvest quality"],
    "suitableCrops": ["Mango", "Pineapple", "Tomato"],
    "applicationMethod": "Foliar Spray",
    "dose": "200–400 ml per acre",
    "packSizes": ["100 ml", "250 ml", "500 ml"],
    "seoTitle": "ON SPOT Plant Growth Regulator",
    "seoDescription": "Ethephon based plant growth regulator for fruit ripening and flowering."
  },
  {
    "slug": "chitra-boost",
    "name": "CHITRA BOOST",
    "category": "PGR",
    "technicalName": "Paclobutrazole 40% SC",
    "formulation": "SC",
    "activeIngredient": "Paclobutrazole",
    "description": "Plant growth regulator for controlled vegetative growth and flowering.",
    "uses": "Flower induction and canopy management.",
    "benefits": ["Improves flowering", "Controls excessive vegetative growth"],
    "suitableCrops": ["Mango", "Fruits"],
    "applicationMethod": "Soil Drench",
    "dose": "3–5 ml per tree",
    "packSizes": ["100 ml", "250 ml", "500 ml"],
    "seoTitle": "CHITRA BOOST Plant Growth Regulator",
    "seoDescription": "Paclobutrazole based growth regulator for flowering management."
  },
  {
    "slug": "chitra-paclo",
    "name": "CHITRA PACLO",
    "category": "PGR",
    "technicalName": "Paclobutrazole 23% SC",
    "formulation": "SC",
    "activeIngredient": "Paclobutrazole",
    "description": "Plant growth regulator for flowering and growth control.",
    "uses": "Canopy management and flower induction.",
    "benefits": ["Promotes flowering", "Controls vegetative growth"],
    "suitableCrops": ["Mango", "Fruit Crops"],
    "applicationMethod": "Soil Drench",
    "dose": "3–5 ml per tree",
    "packSizes": ["100 ml", "250 ml"],
    "seoTitle": "CHITRA PACLO Growth Regulator",
    "seoDescription": "Paclobutrazole growth regulator for flower induction and canopy management."
  },
  {
    "slug": "ccs-booster",
    "name": "CCS BOOSTER",
    "category": "PGR",
    "technicalName": "Crop Growth Enhancer",
    "formulation": "Liquid",
    "description": "Plant growth booster for improved crop development.",
    "uses": "Vegetative growth and crop strengthening.",
    "benefits": ["Improves crop vigor", "Enhances nutrient utilization"],
    "suitableCrops": ["All Crops"],
    "applicationMethod": "Foliar Spray",
    "dose": "500 ml per acre",
    "packSizes": ["250 ml", "500 ml", "1 Ltr"],
    "seoTitle": "CCS BOOSTER Crop Enhancer",
    "seoDescription": "Plant growth booster for healthy crop growth and yield improvement."
  },
  {
    "slug": "chitgibb-ezy",
    "name": "CHITGIBB EZY",
    "category": "PGR",
    "technicalName": "Gibberellic Acid Based Bio Stimulant",
    "formulation": "Liquid",
    "description": "Plant growth promoter for flowering and fruit development.",
    "uses": "Flower induction and fruit enlargement.",
    "benefits": ["Enhances flowering", "Improves fruit size"],
    "suitableCrops": ["Fruits", "Vegetables"],
    "applicationMethod": "Foliar Spray",
    "dose": "100–200 ml per acre",
    "packSizes": ["100 ml", "250 ml", "500 ml"],
    "seoTitle": "CHITGIBB EZY Plant Growth Promoter",
    "seoDescription": "Gibberellic acid based bio stimulant for flowering and fruit development."
  }
];

PRODUCTS_DATA.forEach(productData => {
  const index = catalog.findIndex(p => p.slug === productData.slug);
  if (index !== -1) {
    const existing = catalog[index];
    catalog[index] = {
      ...existing,
      name: productData.name,
      category: productData.category,
      technicalName: productData.technicalName,
      formulation: productData.formulation,
      activeIngredient: productData.activeIngredient,
      description: productData.description,
      overview: productData.description,
      uses: productData.uses,
      benefits: productData.benefits,
      suitableCrops: productData.suitableCrops,
      applicationMethod: productData.applicationMethod,
      dose: productData.dose,
      packSizes: productData.packSizes,
      seoTitle: productData.seoTitle,
      seoDescription: productData.seoDescription
    };
    console.log(`Updated: ${productData.name}`);
  } else {
    console.warn(`Product with slug ${productData.slug} not found in catalog!`);
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('Catalog updated successfully!');
