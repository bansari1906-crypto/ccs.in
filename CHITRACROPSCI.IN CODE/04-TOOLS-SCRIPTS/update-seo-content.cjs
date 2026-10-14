
const fs = require('fs');
const path = require('path');
const catalogPath = path.join(__dirname, 'src/data/product-catalog.json');
let catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const IMPORTANT_PRODUCTS = [
  "ACTIVE 100",
  "CHITARA",
  "CHITARA GOLD",
  "QUEENPHOS",
  "KILL-LARVA",
  "CHITRA BOOST",
  "ROOT RAJA",
  "CHITRA PACLO",
  "CHITRA SOP",
  "PRIDEZOLE",
  "PICOXY ZOLE",
  "TEBZOLE SUPER",
  "CYMO PLUS",
  "CHITWEED",
  "PENDI-STOP"
];

const PRODUCT_CONTENT = {
  "ACTIVE 100": {
    description: "ACTIVE 100 is a powerful plant growth regulator (PGR) designed to enhance crop yield and improve overall plant health. Formulated with advanced technology, it promotes vigorous growth, better flowering, and improved fruit setting. Suitable for a wide range of crops including cotton, paddy, wheat, chilli, tomato, grapes, and vegetables, ACTIVE 100 is a trusted choice for farmers seeking better productivity. It works by regulating plant hormones, leading to stronger stems, better root development, and increased resistance to environmental stresses. With regular use, farmers notice significant improvements in crop quality and yield.",
    benefits: ["Enhances crop yield significantly", "Improves flowering and fruit setting", "Promotes strong root development", "Increases resistance to environmental stresses", "Suitable for all major crops", "Farmer-friendly and easy to apply"],
    suitableCrops: ["Cotton", "Paddy", "Wheat", "Chilli", "Tomato", "Grapes", "Vegetables", "Fruits"],
    faqs: [
      { question: "What is ACTIVE 100 used for?", answer: "ACTIVE 100 is used as a plant growth regulator to enhance crop yield, improve flowering, and promote better plant health." },
      { question: "Which crops can use ACTIVE 100?", answer: "ACTIVE 100 is suitable for cotton, paddy, wheat, chilli, tomato, grapes, vegetables, and fruits." },
      { question: "How to apply ACTIVE 100?", answer: "Follow the recommended dosage and application method as per crop requirements. It can be applied through foliar spray or as directed." }
    ]
  },
  "CHITARA": {
    description: "CHITARA is a premium systemic insecticide for effective control of sucking pests. With its unique formulation, CHITARA provides quick knock-down and long-lasting protection against whiteflies, aphids, thrips, jassids, and other sucking pests. Ideal for cotton, vegetables, fruits, and other crops, it ensures healthy crop growth by protecting plants from pest damage. CHITARA is known for its systemic action, which means it moves through the plant tissue to provide protection from the inside out. This makes it highly effective against pests that may be hidden or not directly hit by the spray.",
    benefits: ["Effective against sucking pests", "Systemic action for long-lasting protection", "Quick knock-down effect", "Suitable for multiple crops", "Helps improve crop quality", "Trusted by farmers across regions"],
    suitableCrops: ["Cotton", "Vegetables", "Fruits", "Chilli", "Tomato"],
    targetPests: ["Whiteflies", "Aphids", "Thrips", "Jassids"],
    faqs: [
      { question: "What pests does CHITARA control?", answer: "CHITARA controls sucking pests like whiteflies, aphids, thrips, and jassids." },
      { question: "Is CHITARA safe for crops?", answer: "Yes, CHITARA is safe when used as per recommended dosage and guidelines." },
      { question: "How does CHITARA work?", answer: "CHITARA works systemically, moving through the plant to provide protection from the inside out." }
    ]
  },
  "CHITARA GOLD": {
    description: "CHITARA GOLD is an advanced formulation of CHITARA, offering enhanced protection against sucking pests. Designed for modern farming needs, it provides superior control of whiteflies, aphids, thrips, and other sucking pests while being gentle on beneficial insects when used correctly. CHITARA GOLD's advanced technology ensures better absorption and translocation in plants, leading to more effective pest control. It is recommended for crops like cotton, vegetables, fruits, and various other agricultural crops where sucking pest pressure is high.",
    benefits: ["Enhanced protection against sucking pests", "Advanced formulation for better efficacy", "Better absorption and translocation", "Gentle on beneficial insects", "Improved crop health and yield", "Longer duration of control"],
    suitableCrops: ["Cotton", "Vegetables", "Fruits", "Chilli", "Tomato", "Grapes"],
    targetPests: ["Whiteflies", "Aphids", "Thrips", "Jassids"],
    faqs: [
      { question: "What makes CHITARA GOLD different?", answer: "CHITARA GOLD has an advanced formulation for better efficacy, absorption, and translocation in plants." },
      { question: "Which crops is CHITARA GOLD for?", answer: "CHITARA GOLD is recommended for cotton, vegetables, fruits, chilli, tomato, and grapes." },
      { question: "How often to apply CHITARA GOLD?", answer: "Follow the recommended application schedule based on pest pressure and crop stage." }
    ]
  },
  "QUEENPHOS": {
    description: "QUEENPHOS is a broad-spectrum insecticide known for its effectiveness against a wide range of insect pests. With both contact and stomach action, it controls caterpillars, larvae, borers, and other chewing pests effectively. QUEENPHOS is trusted by farmers for its reliable performance in crops like cotton, paddy, vegetables, and fruits. It provides quick knock-down and residual activity, ensuring crops remain protected for longer periods. When used as per guidelines, QUEENPHOS helps farmers achieve better pest control and improved yields.",
    benefits: ["Broad-spectrum insect control", "Contact and stomach action", "Quick knock-down effect", "Residual activity", "Controls caterpillars and larvae", "Suitable for multiple crops"],
    suitableCrops: ["Cotton", "Paddy", "Vegetables", "Fruits", "Chilli"],
    targetPests: ["Caterpillars", "Larvae", "Borers", "Chewing pests"],
    faqs: [
      { question: "What pests does QUEENPHOS control?", answer: "QUEENPHOS controls caterpillars, larvae, borers, and other chewing pests." },
      { question: "How does QUEENPHOS work?", answer: "QUEENPHOS works through both contact and stomach action on pests." },
      { question: "Is QUEENPHOS suitable for paddy?", answer: "Yes, QUEENPHOS is suitable for paddy and many other crops." }
    ]
  },
  "KILL-LARVA": {
    description: "KILL-LARVA is a specialized larvicide designed specifically for effective control of larval stages of insects. Targeted at larvae, caterpillars, and borers, it provides excellent protection to crops during critical growth stages. KILL-LARVA works by disrupting the normal functioning of larvae, leading to their quick elimination. It is suitable for a wide range of crops including cotton, vegetables, fruits, pulses, and more. Farmers rely on KILL-LARVA for its consistent performance in preventing damage from larval infestations.",
    benefits: ["Specialized larvicide", "Effective against larvae and caterpillars", "Protects crops during critical stages", "Quick elimination of larvae", "Suitable for multiple crops", "Helps prevent yield loss"],
    suitableCrops: ["Cotton", "Vegetables", "Fruits", "Pulses", "Chilli", "Tomato"],
    targetPests: ["Larvae", "Caterpillars", "Borers"],
    faqs: [
      { question: "What is KILL-LARVA used for?", answer: "KILL-LARVA is used for controlling larval stages of insects like caterpillars and borers." },
      { question: "When to apply KILL-LARVA?", answer: "Apply KILL-LARVA at the first sign of larval infestation for best results." },
      { question: "Is KILL-LARVA safe for crops?", answer: "Yes, KILL-LARVA is safe when used according to recommended guidelines." }
    ]
  },
  "CHITRA BOOST": {
    description: "CHITRA BOOST is a powerful plant growth promoter that stimulates vegetative growth and improves overall plant vigor. Formulated with essential nutrients and bio-stimulants, CHITRA BOOST helps plants develop a robust root system and healthy foliage. It is ideal for use during early growth stages, after transplanting, or when plants show signs of stress. CHITRA BOOST enhances nutrient uptake, improves photosynthesis, and helps plants better withstand environmental challenges. Suitable for all crops, it is a valuable addition to any farmer's crop nutrition program.",
    benefits: ["Stimulates vegetative growth", "Improves plant vigor", "Enhances nutrient uptake", "Boosts photosynthesis", "Improves stress tolerance", "Suitable for all crops"],
    suitableCrops: ["All Crops", "Cotton", "Paddy", "Wheat", "Vegetables", "Fruits"],
    faqs: [
      { question: "What is CHITRA BOOST used for?", answer: "CHITRA BOOST is used to stimulate vegetative growth and improve overall plant vigor." },
      { question: "When to apply CHITRA BOOST?", answer: "Apply CHITRA BOOST during early growth stages, after transplanting, or when plants need a boost." },
      { question: "Is CHITRA BOOST suitable for all crops?", answer: "Yes, CHITRA BOOST is suitable for all crops." }
    ]
  },
  "ROOT RAJA": {
    description: "ROOT RAJA is a specialized root growth stimulant designed to promote healthy and extensive root development. With its unique formulation, ROOT RAJA enhances root growth, improves nutrient and water uptake, and helps plants establish quickly. It is particularly beneficial during transplanting, sowing, and for crops grown in challenging soil conditions. ROOT RAJA stimulates the growth of both primary and secondary roots, leading to a stronger and more extensive root system. This helps plants better access nutrients and water, resulting in improved crop health and yield.",
    benefits: ["Promotes extensive root development", "Improves nutrient uptake", "Enhances water absorption", "Helps quick establishment", "Ideal for transplanting", "Stronger, healthier plants"],
    suitableCrops: ["All Crops", "Vegetables", "Fruits", "Cotton", "Paddy", "Wheat"],
    faqs: [
      { question: "What does ROOT RAJA do?", answer: "ROOT RAJA promotes healthy and extensive root development in plants." },
      { question: "When to use ROOT RAJA?", answer: "Use ROOT RAJA during transplanting, sowing, or when establishing new crops." },
      { question: "Is ROOT RAJA safe for all crops?", answer: "Yes, ROOT RAJA is safe and beneficial for all crops." }
    ]
  },
  "CHITRA PACLO": {
    description: "CHITRA PACLO is a plant growth regulator that helps control excessive vegetative growth and promotes reproductive growth. By managing plant height and canopy, CHITRA PACLO improves light penetration and air circulation within the crop. This leads to better flowering, fruit setting, and overall yield. It is commonly used in crops like cotton, paddy, wheat, and various horticultural crops where controlling vegetative growth is important. CHITRA PACLO helps redirect the plant's energy from excessive leaf and stem growth to flower and fruit development.",
    benefits: ["Controls excessive vegetative growth", "Promotes reproductive growth", "Improves flowering and fruit setting", "Enhances light penetration", "Better air circulation", "Increases yield potential"],
    suitableCrops: ["Cotton", "Paddy", "Wheat", "Horticultural Crops"],
    faqs: [
      { question: "What is CHITRA PACLO used for?", answer: "CHITRA PACLO is used to control excessive vegetative growth and promote reproductive growth." },
      { question: "Which crops benefit from CHITRA PACLO?", answer: "Cotton, paddy, wheat, and various horticultural crops benefit from CHITRA PACLO." },
      { question: "How does CHITRA PACLO help yield?", answer: "By redirecting energy to reproductive growth, CHITRA PACLO improves flowering and fruiting, leading to better yield." }
    ]
  },
  "CHITRA SOP": {
    description: "CHITRA SOP is a high-quality potassium fertilizer that provides essential potassium to crops for healthy growth and development. Potassium is a vital nutrient that plays a key role in various plant processes including photosynthesis, water regulation, and disease resistance. CHITRA SOP is suitable for all crops, especially those requiring high potassium levels like fruits, vegetables, cotton, and tobacco. It helps improve fruit quality, enhances flavor, and increases crop resistance to environmental stresses. Regular application of CHITRA SOP ensures crops receive the potassium they need for optimal performance.",
    benefits: ["High-quality potassium source", "Improves fruit quality", "Enhances flavor and taste", "Increases stress resistance", "Improves disease resistance", "Suitable for all crops"],
    suitableCrops: ["Fruits", "Vegetables", "Cotton", "Tobacco", "All Crops"],
    faqs: [
      { question: "What is CHITRA SOP?", answer: "CHITRA SOP is a high-quality potassium fertilizer for crops." },
      { question: "Why is potassium important for crops?", answer: "Potassium is vital for photosynthesis, water regulation, and disease resistance in plants." },
      { question: "Which crops need CHITRA SOP?", answer: "Fruits, vegetables, cotton, tobacco, and all crops requiring potassium benefit from CHITRA SOP." }
    ]
  },
  "PRIDEZOLE": {
    description: "PRIDEZOLE is a broad-spectrum fungicide for effective control of various fungal diseases. With its protective and curative action, PRIDEZOLE controls fungal infections and prevents their spread in crops. It is effective against diseases like powdery mildew, downy mildew, blight, leaf spot, and other fungal pathogens. PRIDEZOLE is suitable for a wide range of crops including fruits, vegetables, pulses, and commercial crops. Its systemic action ensures it moves through the plant tissue, providing protection from within. Farmers trust PRIDEZOLE for reliable fungal disease control.",
    benefits: ["Broad-spectrum fungal disease control", "Protective and curative action", "Systemic movement in plants", "Controls powdery mildew, downy mildew, blight", "Suitable for multiple crops", "Prevents disease spread"],
    suitableCrops: ["Fruits", "Vegetables", "Pulses", "Cotton", "Grapes"],
    targetDiseases: ["Powdery Mildew", "Downy Mildew", "Blight", "Leaf Spot", "Fungal Diseases"],
    faqs: [
      { question: "What diseases does PRIDEZOLE control?", answer: "PRIDEZOLE controls fungal diseases like powdery mildew, downy mildew, blight, and leaf spot." },
      { question: "How does PRIDEZOLE work?", answer: "PRIDEZOLE works through protective and curative action with systemic movement in plants." },
      { question: "Is PRIDEZOLE good for grapes?", answer: "Yes, PRIDEZOLE is suitable for grapes and many other crops." }
    ]
  },
  "PICOXY ZOLE": {
    description: "PICOXY ZOLE is an advanced fungicide for control of difficult fungal diseases. With its powerful formulation, PICOXY ZOLE provides excellent control of diseases like powdery mildew, rust, and other fungal pathogens. It offers both protective and curative properties, making it effective in preventing new infections and treating existing ones. PICOXY ZOLE is suitable for crops like grapes, fruits, vegetables, and ornamental plants where fungal disease pressure can be high. Its unique mode of action ensures long-lasting protection and helps maintain crop health.",
    benefits: ["Advanced fungicide", "Controls difficult fungal diseases", "Protective and curative action", "Long-lasting protection", "Suitable for grapes and fruits", "Maintains crop health"],
    suitableCrops: ["Grapes", "Fruits", "Vegetables", "Ornamental Plants"],
    targetDiseases: ["Powdery Mildew", "Rust", "Fungal Diseases"],
    faqs: [
      { question: "What makes PICOXY ZOLE special?", answer: "PICOXY ZOLE is an advanced fungicide with powerful control of difficult fungal diseases." },
      { question: "Which crops is PICOXY ZOLE for?", answer: "PICOXY ZOLE is used on grapes, fruits, vegetables, and ornamental plants." },
      { question: "Does PICOXY ZOLE have curative action?", answer: "Yes, PICOXY ZOLE has both protective and curative properties." }
    ]
  },
  "TEBZOLE SUPER": {
    description: "TEBZOLE SUPER is a premium fungicide with broad-spectrum activity against a wide range of fungal pathogens. Its advanced formulation provides excellent protection and control of diseases like powdery mildew, rust, blight, and various leaf spots. TEBZOLE SUPER is known for its systemic action, which allows it to move through the plant and provide internal protection. It is widely used in crops like fruits, vegetables, cereals, pulses, and commercial crops. TEBZOLE SUPER is trusted by farmers for its consistent performance and reliable disease control.",
    benefits: ["Premium broad-spectrum fungicide", "Advanced formulation", "Excellent disease protection", "Systemic action", "Controls powdery mildew, rust, blight", "Suitable for many crops"],
    suitableCrops: ["Fruits", "Vegetables", "Cereals", "Pulses", "Cotton"],
    targetDiseases: ["Powdery Mildew", "Rust", "Blight", "Leaf Spot", "Fungal Diseases"],
    faqs: [
      { question: "What diseases does TEBZOLE SUPER control?", answer: "TEBZOLE SUPER controls powdery mildew, rust, blight, leaf spots, and other fungal diseases." },
      { question: "Is TEBZOLE SUPER systemic?", answer: "Yes, TEBZOLE SUPER has systemic action and moves through plant tissue." },
      { question: "Which crops use TEBZOLE SUPER?", answer: "Fruits, vegetables, cereals, pulses, and cotton use TEBZOLE SUPER." }
    ]
  },
  "CYMO PLUS": {
    description: "CYMO PLUS is a combination fungicide offering dual-mode action for enhanced fungal disease control. With two active ingredients working together, CYMO PLUS provides broad-spectrum protection and reduces the risk of resistance development. It controls diseases like downy mildew, blight, and various other fungal infections effectively. CYMO PLUS is suitable for crops like grapes, vegetables, potatoes, and tomatoes where multiple fungal diseases are a concern. Its protective and curative properties make it a valuable tool in integrated disease management programs.",
    benefits: ["Dual-mode fungicide", "Broad-spectrum control", "Reduced resistance risk", "Protective and curative action", "Controls downy mildew and blight", "Suitable for vegetables and grapes"],
    suitableCrops: ["Grapes", "Vegetables", "Potatoes", "Tomatoes"],
    targetDiseases: ["Downy Mildew", "Blight", "Fungal Diseases"],
    faqs: [
      { question: "What is special about CYMO PLUS?", answer: "CYMO PLUS is a combination fungicide with dual-mode action for enhanced disease control." },
      { question: "What diseases does CYMO PLUS control?", answer: "CYMO PLUS controls downy mildew, blight, and other fungal diseases." },
      { question: "Is CYMO PLUS good for tomatoes?", answer: "Yes, CYMO PLUS is suitable for tomatoes, potatoes, grapes, and vegetables." }
    ]
  },
  "CHITWEED": {
    description: "CHITWEED is a selective herbicide for effective control of weeds in crops. Designed to target specific weeds without harming the main crop, CHITWEED helps maintain crop health and maximize yield potential. It controls a wide range of broadleaf and grassy weeds, depending on the formulation. CHITWEED is suitable for various crops where weed competition can significantly reduce yields. By eliminating weeds, it ensures crops receive all the nutrients, water, and sunlight they need for optimal growth and development.",
    benefits: ["Selective weed control", "Protects crops from weed competition", "Improves crop yield", "Controls broadleaf and grassy weeds", "Suitable for multiple crops", "Maximizes crop potential"],
    suitableCrops: ["Cotton", "Paddy", "Wheat", "Vegetables", "Pulses"],
    targetWeeds: ["Broadleaf Weeds", "Grassy Weeds"],
    faqs: [
      { question: "What is CHITWEED used for?", answer: "CHITWEED is used for selective weed control in crops." },
      { question: "Does CHITWEED harm crops?", answer: "CHITWEED is selective and targets weeds without harming the main crop when used correctly." },
      { question: "Which weeds does CHITWEED control?", answer: "CHITWEED controls broadleaf and grassy weeds depending on the specific formulation." }
    ]
  },
  "PENDI-STOP": {
    description: "PENDI-STOP is a pre-emergence herbicide that prevents weed seeds from germinating. By creating a protective barrier in the soil, PENDI-STOP stops weeds before they emerge, reducing early competition with crops. This is particularly beneficial during the critical early growth stages when young crops are most vulnerable to weed pressure. PENDI-STOP is suitable for a wide range of crops including cotton, vegetables, pulses, and many others. It provides long-lasting residual control, helping keep fields clean for extended periods.",
    benefits: ["Pre-emergence weed control", "Prevents weed germination", "Reduces early weed competition", "Long-lasting residual control", "Protects young crops", "Suitable for multiple crops"],
    suitableCrops: ["Cotton", "Vegetables", "Pulses", "Wheat", "Groundnut"],
    targetWeeds: ["Germinating Weeds", "Annual Weeds"],
    faqs: [
      { question: "What is PENDI-STOP?", answer: "PENDI-STOP is a pre-emergence herbicide that prevents weed seed germination." },
      { question: "When to apply PENDI-STOP?", answer: "Apply PENDI-STOP before weeds emerge, usually after sowing or transplanting crops." },
      { question: "Does PENDI-STOP have residual activity?", answer: "Yes, PENDI-STOP provides long-lasting residual weed control." }
    ]
  }
};

// Update products in catalog
catalog = catalog.map(product => {
  const productName = product.name.toUpperCase();
  if (IMPORTANT_PRODUCTS.includes(productName) && PRODUCT_CONTENT[productName]) {
    const content = PRODUCT_CONTENT[productName];
    return {
      ...product,
      description: content.description || product.description,
      benefits: content.benefits || product.benefits,
      suitableCrops: content.suitableCrops || product.suitableCrops,
      targetCrops: content.suitableCrops || product.targetCrops,
      targetPests: content.targetPests || product.targetPests,
      targetDiseases: content.targetDiseases || product.targetDiseases,
      targetWeeds: content.targetWeeds || product.targetWeeds,
      faqs: content.faqs || product.faqs,
      seoTitle: `${product.name} - ${product.category} | Chitra Crop Science`,
      seoDescription: content.description?.substring(0, 150) || product.seoDescription
    };
  }
  return product;
});

// Save updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log('✅ Successfully updated important products with SEO content!');

