export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published_at: string;
  category: "review" | "guide" | "case-study";
  video_url?: string;
  farmer_name?: string;
  location?: string;
  crop?: string;
  product_name?: string;
  rating?: number;
}

export const staticBlogs: BlogItem[] = [
  {
    id: "review-ccs-303-bagoda",
    title: "CCS-303 Field Review: 100% Organic Thrips & Mites Defense in Pomegranate Orchard (Bagoda, Rajasthan)",
    slug: "ccs-303-pomegranate-orchard-review-bagoda-rajasthan",
    excerpt: "Live field report from Bhagwati village, Bagoda: How Chitra Crop Science CCS-303 achieved complete thrips and mites control while ensuring heavy flower retention in pomegranate orchards.",
    category: "review",
    video_url: "/assets/media/review-ccs-303-bagoda.mp4",
    cover_image: "/assets/media/poster-ccs-303-reel.jpg",
    farmer_name: "Farmer Field Demonstration & Agronomy Review",
    location: "Bhagwati Village, Bagoda, Rajasthan",
    crop: "Pomegranate (अनार)",
    product_name: "CCS-303 (100% Biological Organic Protection)",
    rating: 5,
    author: "Chitra Agronomy Team",
    published_at: new Date().toISOString(),
    content: `## Live Field Case Study: Bagoda, Rajasthan
**Location:** Bhagwati Village, Bagoda Tehsil, Rajasthan  
**Crop Inspected:** Pomegranate (अनार का बगीचा)  
**Flagship Solution:** Chitra Crop Science CCS-303  
**Key Pests Targeted:** Thrips (*Scirtothrips dorsalis*) & Red Spider Mites (*Tetranychus urticae*)

---

### Field Background & The Challenge
Pomegranate orchards across Rajasthan and North Gujarat face severe threats during the pre-flowering and fruit-setting stages. Sucking pests, especially thrips and mites, pierce tender leaves, calyxes, and young fruitlets. This results in heavy blossom drop, leaf curling, and rough scab-like blemishes on the fruit rind—reducing market grade and farmer profits by up to 40%.

### Farmer Feedback & Video Transcript
> *"राम राम किसान भाइयों! आज हम हैं राजस्थान की सुनहरी धरती पर बागोड़ा के भगवती गांव में। आप मेरे पीछे देख सकते हैं यह अनार का बगीचा है। इसमें फूल बहुत ही शानदार तरीके से आए हुए हैं और थ्रिप्स तथा माइट्स का अटैक बिल्कुल न के बराबर है। इसका मुख्य कारण यह है कि यहां हमने Chitra Crop Science का CCS-303 स्प्रे किया हुआ है। यह 100% बायोलॉजिकल और सुरक्षित फॉर्मूलेशन है जो फूलों को नुकसान पहुंचाए बिना थ्रिप्स को पूरी तरह कंट्रोल करता है।"*

### Why CCS-303 Delivers Superior Results
1. **100% Biological & Safe:** Unlike harsh chemical insecticides that cause flower burning and scare away pollinators, CCS-303 is gentle on blossoms and beneficial insects.
2. **Dual Action Against Thrips & Mites:** Knocks down both active nymphs and adult mites, creating an invisible protective biological shield over fruit and foliage.
3. **Residue-Free Harvest:** Ideal for premium domestic mandis and export-grade pomegranate production.

### Recommended Application Dosage
- **Foliar Spray:** 2.0 ml to 2.5 ml per liter of clean water (or 400–500 ml per 200 liters barrel per acre).
- **Timing:** First spray at initial bud burst; repeat 12–15 days later during peak flower flush for maximum fruit setting.`
  },
  {
    id: "review-karmiramji-pomegranate",
    title: "Karmiram Ji (Gudamalani) Review: Record Pomegranate Flowering & Fruit Set with Flower Plus & CCS-303",
    slug: "karmiramji-gudamalani-pomegranate-orchard-flower-plus-ccs-303",
    excerpt: "Watch progressive farmer Karmiram Ji and his team in Gudamalani (Barmer) showcase their flourishing pomegranate orchard powered by Flower Plus and CCS-303.",
    category: "review",
    video_url: "/assets/media/review-karmiramji-pomegranate.mp4",
    cover_image: "/assets/media/poster-karmiramji.jpg",
    farmer_name: "Karmiram Ji, Akharam Ji, Chelaram Ji & Ishwar Lal Ji",
    location: "Juni Wale Village, Gudamalani, Barmer, Rajasthan",
    crop: "Pomegranate Orchard (अनार का बगीचा)",
    product_name: "Flower Plus & CCS-303",
    rating: 5,
    author: "Chitra Agronomy Team",
    published_at: new Date().toISOString(),
    content: `## Progressive Farmer Case Study: Gudamalani, Barmer
**Growers:** Karmiram Ji, Akharam Ji, Chelaram Ji & Ishwar Lal Ji  
**Village:** Juni Wale, Gudamalani (Barmer, Rajasthan)  
**Crop:** Pomegranate (सिंदूरी अनार)  
**Products Used:** Chitra Flower Plus (Flower Booster) + CCS-303 (Crop Defense)

---

### The Problem in Barmer's Arid Climate
High daytime temperatures and arid desert winds in Western Rajasthan frequently trigger flower shedding and weak fruit knotting in pomegranate plants. When combined with sudden insect incursions, farmers often lose the vital early flush.

### Live Farmer Experience & Words
> *"नमस्कार मित्रों राम राम! आज हम हैं राजस्थान के गुड़ामालानी के जूनी वाले गांव में, जहाँ हमारे प्रगतिशील किसान करमीराम जी, अखाराम जी, चेलाराम जी और ईश्वर लाल जी का अनार का बगीचा है। बगीचे में फल और फूल दोनों बहुत ही शानदार तरीके से सेट हुए हैं। Chitra Crop Science के Flower Plus और CCS-303 दोनों प्रोडक्ट्स ने यहाँ कमाल का काम किया है। फूल गिरना पूरी तरह रुक गया और फलों की चमक और साइज बहुत ही लाजवाब है।"*

### Observed Agronomic Benefits
- **Zero Flower Drop:** Flower Plus strengthened the pedicel connection, ensuring over 90% retention of hermaphrodite flowers.
- **Uniform Fruit Sizing:** Fruitlets developed evenly across branches without deformation or pest scarring.
- **Deep Canopy Vitality:** CCS-303 protected young foliage from thrips, maintaining dark green photosynthetic vigor.`
  },
  {
    id: "review-chenaramji-honeybee",
    title: "Chenaram Ji Agro Review: Boosting Natural Pollination & Bumper Fruit Set with Welcome Honey Bee & CCS-303",
    slug: "chenaramji-review-welcome-honey-bee-pollination-booster",
    excerpt: "Chenaram Ji from Ramdev Agro Kendra explains why Welcome Honey Bee is a game-changer for attracting natural pollinators, resulting in unprecedented fruit set.",
    category: "review",
    video_url: "/assets/media/review-chenaramji-honeybee.mp4",
    cover_image: "/assets/media/poster-chenaramji.jpg",
    farmer_name: "Chenaram Ji (Ramdev Agro / Farmer-Dealer)",
    location: "Rajasthan",
    crop: "Orchard & Flowering Cash Crops",
    product_name: "Welcome Honey Bee & CCS-303",
    rating: 5,
    author: "Chitra Agronomy Team",
    published_at: new Date().toISOString(),
    content: `## Dealer & Grower Spotlight: Ramdev Agro Kendra
**Speaker:** Chenaram Ji  
**Business / Farm:** Ramdev Agro & Farmer Care, Rajasthan  
**Key Products:** Welcome Honey Bee & CCS-303  
**Impact:** 40% Increase in Natural Pollination & Fruit Setting

---

### The Secret to Higher Orchard Yield: Natural Pollinators
Cross-pollination by honey bees and native pollinators is the single most critical factor for fruit weight, seed count, and symmetry in flowering fruit crops. Excessive chemical spraying often repels bees, causing devastating yield reductions.

### Chenaram Ji's Verification & Video Statement
> *"नमस्कार किसान भाइयों! मैं चेनाराम... Chitra Crop Science का जो प्रोडक्ट आया है 'Welcome Honey Bee', जो मधुमक्खियाँ बगीचे के अंदर नहीं आती थीं, उन्हें बुलाने का काम करता है। इसका रिजल्ट इतना तगड़ा है कि आज दिन तक किसी दूसरे प्रोडक्ट का ऐसा असर देखने को नहीं मिला! मधुमक्खियों का मूवमेंट बढ़ते ही फल बनने का अनुपात बहुत तेज़ी से बढ़ जाता है। साथ ही CCS-303 ने फसलों को सुरक्षित रखा है। मैंने अपने खेतों और सैकड़ों किसानों को यह दिया है और सब बहुत खुश हैं।"*

### Key Features of Welcome Honey Bee
- **All-Natural Attractant:** Formulated with botanical extracts and food-grade bio-attractants that signal honey bees to forage in the targeted crop.
- **Enhanced Fruit Quality:** Complete pollination ensures larger, symmetrical fruits with higher brix sweetness.
- **Perfect Synergy with CCS-303:** Because CCS-303 is biologically safe, it protects crops from pests without harming the visiting bees.`
  },
  {
    id: "review-subhashji-groundnut",
    title: "Subhash Ji (Meghava) Groundnut Field Review: Bumper Crop Growth with CCS-CARB ULTRA",
    slug: "subhashji-meghava-groundnut-bumper-growth-ccs-carb-ultra",
    excerpt: "Field inspection in Meghava village: Subhash Ji and Agronomist Rinku Kumar demonstrate lush peanut canopy, heavy root nodulation, and bumper yield with CCS-CARB ULTRA.",
    category: "review",
    video_url: "/assets/media/review-subhashji-groundnut.mp4",
    cover_image: "/assets/media/poster-subhashji.jpg",
    farmer_name: "Subhash Ji (Progressive Farmer) & Rinku Kumar (Agronomist)",
    location: "Meghava Village, Rajasthan",
    crop: "Groundnut / Peanut (मूंगफली की फसल)",
    product_name: "CCS-CARB ULTRA (Organic Soil & Carbon Booster)",
    rating: 5,
    author: "Rinku Kumar (Chitra Agronomy Specialist)",
    published_at: new Date().toISOString(),
    content: `## Live Groundnut Field Inspection: Meghava Village
**Farmer:** Subhash Ji  
**Field Specialist:** Rinku Kumar (Chitra Crop Science)  
**Village:** Meghava, Rajasthan  
**Crop:** Groundnut / Peanut (मूंगफली)  
**Product:** CCS-CARB ULTRA

---

### Overcoming Soil Carbon Depletion in Sandy Soils
In the desert soils of Rajasthan, low organic carbon and micronutrient leaching often result in stunted peanut plants, pale yellow foliage, and poor gynophore (peg) penetration into the ground.

### Subhash Ji & Agronomist Dialogue
> *"नमस्कार किसान साथियों! मेरा नाम रिंकू कुमार है और मैं Chitra Crop Science से हूँ। आज हम आए हैं मगेबा (Meghava) गाँव में, जहाँ हमारे प्रगतिशील किसान सुभाष जी के मूंगफली के खेत में खड़े हैं। इनकी मूंगफली की फसल इतनी हरी-भरी और जबरदस्त है कि आसपास के सभी किसान देखकर हैरान हैं! इसका राज़ Chitra Crop Science का CCS-CARB ULTRA है, जिसने जड़ों की मजबूती और मिट्टी में सूक्ष्मजीवों की सक्रियता को कई गुना बढ़ा दिया है।"*

### Field Results Recorded
1. **Lush Canopy & High Chlorophyll:** Dark emerald leaves with zero nutrient deficiency symptoms.
2. **Dense Root System with High Nodulation:** Superior nitrogen fixation leading to healthier pod development.
3. **Heavy Pod Filling:** Maximum 2-kernel and 3-kernel sound mature pods per plant.`
  },
  {
    id: "blog-1",
    title: "Best Fertilizer for Pomegranate to Maximize Yield",
    slug: "best-fertilizer-for-pomegranate",
    excerpt: "Discover the ultimate guide to selecting and applying the right fertilizer for pomegranate orchards.",
    category: "guide",
    cover_image: "/assets/media/field1.jpeg",
    author: "Agronomy Expert",
    published_at: new Date().toISOString(),
    content: `Growing pomegranates requires a delicate balance of nutrients, particularly during the flowering and fruiting stages. The right fertilizer can significantly impact both the quality and quantity of your yield.

### Key Nutrient Requirements
Pomegranates respond exceptionally well to nitrogen, phosphorus, and potassium (NPK), but micronutrients like zinc, iron, and boron are equally critical for preventing fruit cracking.

### Recommended Fertilization Schedule
1. **Pre-flowering Stage:** Focus on phosphorus-rich fertilizers and Chitra Flower Plus to stimulate root development and flower bud formation.
2. **Fruit Set Stage:** A balanced NPK formulation and CCS-303 helps maintain fruit drop.
3. **Fruit Development:** High potassium fertilizers ensure better size, color, and sweetness.

### Why Choose Chitra's Solutions?
Our specialized micronutrient mixtures and NPK blends are formulated to meet the exact requirements of pomegranate crops, ensuring healthy plant growth and premium fruit quality.`
  },
  {
    id: "blog-2",
    title: "Top Fertilizers for Jeera (Cumin) Farming",
    slug: "best-fertilizer-for-jeera",
    excerpt: "Learn how to protect and nourish your Jeera crop for optimal spice quality and aroma.",
    category: "guide",
    cover_image: "/assets/media/field2.jpeg",
    author: "Agronomy Expert",
    published_at: new Date().toISOString(),
    content: `Jeera (cumin) is a high-value spice crop that is highly sensitive to soil nutrient deficiencies and fungal diseases. Proper fertilization is essential for healthy growth and robust essential oil content.

### Essential Nutrients for Jeera
Jeera requires a basal dose of nitrogen, phosphorus, and potassium. Sulphur is particularly important for this crop, as it enhances the pungent aroma and oil content of the seeds.

### Application Tips
- **Basal Dose:** Apply well-rotted farmyard manure along with the recommended NPK at the time of sowing.
- **Top Dressing:** Nitrogen should be applied in split doses, usually 30 days after sowing.

### Chitra's Recommendations
Use our sulphur-enhanced fertilizers and specialized bio-stimulants to protect your Jeera from blight and wilt while maximizing yield per acre.`
  },
  {
    id: "blog-3",
    title: "Effective Pesticides for Groundnut Protection",
    slug: "best-pesticide-for-groundnut",
    excerpt: "A comprehensive overview of controlling common pests in groundnut cultivation.",
    category: "guide",
    cover_image: "/assets/media/customer2.jpeg",
    author: "Plant Protection Specialist",
    published_at: new Date().toISOString(),
    content: `Groundnut is susceptible to a variety of pests, including white grubs, aphids, thrips, and leaf miners, which can drastically reduce pod yield and quality.

### Common Pests and Their Impact
- **White Grubs:** Attack the roots, causing the plant to wilt and die.
- **Aphids and Thrips:** Suck sap from leaves and transmit viral diseases.
- **Leaf Miners:** Feed on leaf tissues, reducing photosynthetic area.

### Strategic Pest Management
An integrated pest management (IPM) approach is vital. Start with seed treatment and follow up with timely foliar sprays.

### Chitra's Plant Protection Range
Our range of systemic and contact insecticides provides broad-spectrum control against these pests. Formulations like CCS-CARB ULTRA and specialized protection blends ensure long-lasting protection, keeping your groundnut crop safe from sowing to harvest.`
  }
];
