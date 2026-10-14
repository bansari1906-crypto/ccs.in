import staticProductCatalog from "@/data/product-catalog.json";
import officialProductCatalog from "@/data/official-product-catalog.json";

type ProductLike = Record<string, any>;
type Filters = {
  crop?: string;
  pest?: string;
  disease?: string;
  season?: string;
  category?: string;
};

const ENTITY_ALIASES = {
  crop: {
    cotton: ["cotton", "kapas", "cottons"],
    paddy: ["paddy", "rice", "dhaan", "chawal"],
    wheat: ["wheat", "gehu", "gandum"],
    chilli: ["chilli", "mirchi", "chili", "chilies", "pepper"],
    tomato: ["tomato", "tamatar", "tomatoes"],
    grapes: ["grapes", "angoor", "grape"],
    vegetables: ["vegetable", "vegetables", "sabzi", "veg"],
    fruits: ["fruit", "fruits", "phal"],
    maize: ["maize", "corn", "makka"],
    soybean: ["soybean", "soyabean", "soy"],
    sugarcane: ["sugarcane", "cane", "ganna"],
    groundnut: ["groundnut", "peanut", "mungfali"],
    pulses: ["pulse", "pulses", "dal", "legumes"],
    potato: ["potato", "aloo"],
    brinjal: ["brinjal", "eggplant", "baingan"],
  },
  pest: {
    sucking_pest: ["sucking pest", "sucking pests", "sucking", "sap sucking"],
    larva: ["larva", "larvae", "caterpillar", "caterpillars", "worm", "worms", "armyworm", "army worm"],
    stem_borer: ["stem borer", "borer", "borers", "shoot borer"],
    white_fly: ["white fly", "whitefly", "white flies"],
    aphid: ["aphid", "aphids", "aphis"],
    thrips: ["thrips", "thrip"],
    mealybug: ["mealybug", "mealybugs"],
    mite: ["mite", "mites"],
    jassid: ["jassid", "jassids", "leafhopper", "leaf hoppers"],
    leaf_miner: ["leaf miner", "leaf miners"],
    bollworm: ["bollworm", "bollworms"],
    termite: ["termite", "termites"],
  },
  disease: {
    powdery_mildew: ["powdery mildew", "powder mildew", "powdery"],
    downy_mildew: ["downy mildew", "downy"],
    blight: ["blight", "leaf blight", "early blight", "late blight"],
    leaf_spot: ["leaf spot", "spot", "spots"],
    fungal_disease: ["fungal disease", "fungal", "fungus", "fungi"],
    root_rot: ["root rot", "rot", "rotting"],
    rust: ["rust", "rust disease"],
    anthracnose: ["anthracnose"],
    mildew: ["mildew"],
    damping_off: ["damping off", "damping-off"],
  },
  category: {
    insecticide: ["insecticide", "insect", "insects", "pest control", "pesticide"],
    fungicide: ["fungicide", "fungal", "fungus", "disease control"],
    herbicide: ["herbicide", "weed", "weeds", "weedicide"],
    fertilizer: ["fertilizer", "fertilizer product", "fertiliser", "nutrition", "nutrient", "npk", "micronutrient", "water soluble", "liquid fertilizer"],
    pgr: ["pgr", "growth", "growth regulator", "growth promoter", "bio stimulant", "biostimulant"],
  },
  season: {
    rainy: ["rainy", "monsoon", "wet"],
    summer: ["summer", "hot", "heat"],
    winter: ["winter", "cold", "cool"],
  },
} as const;

const SEASON_PROFILES = {
  rainy: {
    categories: ["fungicide", "fertilizer"],
    keywords: ["mildew", "blight", "leaf spot", "root rot", "downy", "powdery", "mancozeb", "copper"],
  },
  summer: {
    categories: ["insecticide", "pgr", "fertilizer"],
    keywords: ["thrips", "mites", "whitefly", "jassid", "sucking", "stress", "flowering", "fruiting"],
  },
  winter: {
    categories: ["fungicide", "fertilizer", "pgr"],
    keywords: ["rust", "powdery", "growth", "nutrition", "sulphur", "hexaconazole", "tebu"],
  },
} as const;

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokenize(value: unknown): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 2);
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|,|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = normalizeText(value);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    result.push(value);
  }

  return result;
}

function mergeUniqueProducts(): ProductLike[] {
  const merged: ProductLike[] = [];
  const seen = new Set<string>();

  for (const product of [...staticProductCatalog, ...officialProductCatalog] as ProductLike[]) {
    const key = normalizeText(product.slug || product.name);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(product);
  }

  return merged;
}

function getCanonicalMatches(
  text: string,
  group: Record<string, readonly string[]>,
): string[] {
  const normalizedText = normalizeText(text);
  const matches: string[] = [];

  for (const [canonical, aliases] of Object.entries(group)) {
    const found = aliases.some((alias) => normalizedText.includes(normalizeText(alias)));
    if (found) {
      matches.push(canonical);
    }
  }

  return matches;
}

function normalizeProductCategories(product: ProductLike): string[] {
  const rawCategory = normalizeText(
    [product.category, product.subcategory, product.productType].filter(Boolean).join(" "),
  );
  const categories = new Set<string>();

  if (rawCategory.includes("insect")) categories.add("insecticide");
  if (rawCategory.includes("fung")) categories.add("fungicide");
  if (rawCategory.includes("herb") || rawCategory.includes("weed")) categories.add("herbicide");
  if (
    rawCategory.includes("fert") ||
    rawCategory.includes("npk") ||
    rawCategory.includes("micronutrient") ||
    rawCategory.includes("water soluble") ||
    rawCategory.includes("liquid fertilizer")
  ) {
    categories.add("fertilizer");
  }
  if (
    rawCategory.includes("pgr") ||
    rawCategory.includes("growth") ||
    rawCategory.includes("bio stimulant") ||
    rawCategory.includes("biostimulant")
  ) {
    categories.add("pgr");
  }

  if (categories.size === 0 && rawCategory) {
    categories.add(rawCategory);
  }

  return Array.from(categories);
}

function productContainsAlias(values: string[], aliases: readonly string[]): boolean {
  const normalizedValues = values.map((value) => normalizeText(value));
  return aliases.some((alias) => {
    const normalizedAlias = normalizeText(alias);
    return normalizedValues.some(
      (value) => value.includes(normalizedAlias) || normalizedAlias.includes(value),
    );
  });
}

function buildProductSearchFields(product: ProductLike) {
  const crops = uniqueStrings([
    ...asArray(product.suitableCrops),
    ...asArray(product.target_crops),
    ...asArray(product.targetCrops),
  ]);
  const pests = uniqueStrings(asArray(product.targetPests));
  const diseases = uniqueStrings(asArray(product.targetDiseases));
  const weeds = uniqueStrings(asArray(product.targetWeeds));
  const uses = uniqueStrings(asArray(product.uses));
  const benefits = uniqueStrings([
    ...asArray(product.benefits),
    ...asArray(product.key_benefits),
    ...asArray(product.keyBenefits),
    ...asArray(product.agronomicBenefits),
  ]);
  const faqs = Array.isArray(product.faqs)
    ? product.faqs.flatMap((faq: any) => [
        String(faq?.question ?? ""),
        String(faq?.answer ?? ""),
      ])
    : [];

  const fieldValues = uniqueStrings([
    product.name,
    product.category,
    product.subcategory,
    product.productType,
    product.technicalName,
    product.composition,
    product.activeIngredient,
    product.formulation,
    product.overview,
    product.description,
    product.scientificOverview,
    product.seoTitle,
    product.seoDescription,
    product.usage_dosage,
    product.dose,
    product.applicationMethod,
    product.application_method,
    product.packaging_sizes,
    product.storageInstructions,
    product.storage_instructions,
    product.safety_precautions,
    ...crops,
    ...pests,
    ...diseases,
    ...weeds,
    ...uses,
    ...benefits,
    ...faqs,
  ].filter(Boolean).map(String));

  return {
    product,
    categories: normalizeProductCategories(product),
    crops,
    pests,
    diseases,
    weeds,
    uses,
    benefits,
    searchText: normalizeText(fieldValues.join(" ")),
    tokens: new Set(tokenize(fieldValues.join(" "))),
  };
}

const allProducts = mergeUniqueProducts();
const indexedProducts = allProducts.map(buildProductSearchFields);

function extractIntent(query: string, filters: Filters = {}) {
  const fullText = [
    query,
    filters.crop,
    filters.pest,
    filters.disease,
    filters.season,
    filters.category,
  ]
    .filter(Boolean)
    .join(" ");

  const crops = new Set<string>([
    ...getCanonicalMatches(fullText, ENTITY_ALIASES.crop),
    ...getCanonicalMatches(filters.crop || "", ENTITY_ALIASES.crop),
  ]);
  const pests = new Set<string>([
    ...getCanonicalMatches(fullText, ENTITY_ALIASES.pest),
    ...getCanonicalMatches(filters.pest || "", ENTITY_ALIASES.pest),
  ]);
  const diseases = new Set<string>([
    ...getCanonicalMatches(fullText, ENTITY_ALIASES.disease),
    ...getCanonicalMatches(filters.disease || "", ENTITY_ALIASES.disease),
  ]);
  const categories = new Set<string>([
    ...getCanonicalMatches(fullText, ENTITY_ALIASES.category),
    ...getCanonicalMatches(filters.category || "", ENTITY_ALIASES.category),
  ]);
  const seasons = new Set<string>([
    ...getCanonicalMatches(fullText, ENTITY_ALIASES.season),
    ...getCanonicalMatches(filters.season || "", ENTITY_ALIASES.season),
  ]);

  return { crops, pests, diseases, categories, seasons };
}

function overlapScore(queryTokens: string[], productTokens: Set<string>): number {
  let score = 0;
  for (const token of queryTokens) {
    if (productTokens.has(token)) {
      score += token.length > 5 ? 12 : 8;
    }
  }
  return score;
}

function scoreIndexedProduct(
  indexed: ReturnType<typeof buildProductSearchFields>,
  query: string,
  filters: Filters,
  intent: ReturnType<typeof extractIntent>,
): number {
  const queryText = normalizeText(query);
  const queryTokens = tokenize(query);
  const nameText = normalizeText(indexed.product.name);
  let score = 0;

  if (!queryText) {
    return 0;
  }

  if (queryText === nameText) {
    score += 220;
  } else if (nameText.includes(queryText) || queryText.includes(nameText)) {
    score += 140;
  }

  score += overlapScore(queryTokens, indexed.tokens);

  const cropAliases = ENTITY_ALIASES.crop as Record<string, readonly string[]>;
  const pestAliases = ENTITY_ALIASES.pest as Record<string, readonly string[]>;
  const diseaseAliases = ENTITY_ALIASES.disease as Record<string, readonly string[]>;

  for (const crop of intent.crops) {
    if (productContainsAlias(indexed.crops, cropAliases[crop] || [])) {
      score += 95;
    } else if (indexed.searchText.includes(crop.replace(/_/g, " "))) {
      score += 50;
    }
  }

  for (const pest of intent.pests) {
    if (
      productContainsAlias(indexed.pests, pestAliases[pest] || []) ||
      indexed.searchText.includes(pest.replace(/_/g, " "))
    ) {
      score += 110;
    }
  }

  for (const disease of intent.diseases) {
    if (
      productContainsAlias(indexed.diseases, diseaseAliases[disease] || []) ||
      indexed.searchText.includes(disease.replace(/_/g, " "))
    ) {
      score += 110;
    }
  }

  for (const category of intent.categories) {
    if (indexed.categories.includes(category)) {
      score += 85;
    }
  }

  for (const season of intent.seasons) {
    const profile = SEASON_PROFILES[season as keyof typeof SEASON_PROFILES];
    if (!profile) continue;

    if (profile.categories.some((category) => indexed.categories.includes(category))) {
      score += 40;
    }
    if (profile.keywords.some((keyword) => indexed.searchText.includes(normalizeText(keyword)))) {
      score += 25;
    }
  }

  if (filters.crop && intent.crops.size === 0 && indexed.searchText.includes(normalizeText(filters.crop))) {
    score += 60;
  }
  if (filters.pest && intent.pests.size === 0 && indexed.searchText.includes(normalizeText(filters.pest))) {
    score += 65;
  }
  if (filters.disease && intent.diseases.size === 0 && indexed.searchText.includes(normalizeText(filters.disease))) {
    score += 65;
  }

  if (
    intent.categories.size === 0 &&
    /pest|insect|bug|larva|whitefly|aphid|thrips/.test(queryText) &&
    indexed.categories.includes("insecticide")
  ) {
    score += 50;
  }
  if (
    intent.categories.size === 0 &&
    /disease|fung|mildew|blight|rot|rust|spot/.test(queryText) &&
    indexed.categories.includes("fungicide")
  ) {
    score += 50;
  }
  if (
    intent.categories.size === 0 &&
    /weed|weeds/.test(queryText) &&
    indexed.categories.includes("herbicide")
  ) {
    score += 50;
  }
  if (
    intent.categories.size === 0 &&
    /fert|nutri|npk|micro|deficiency/.test(queryText) &&
    indexed.categories.includes("fertilizer")
  ) {
    score += 50;
  }
  if (
    intent.categories.size === 0 &&
    /growth|flower|fruit|stress|vigour|vigor/.test(queryText) &&
    indexed.categories.includes("pgr")
  ) {
    score += 45;
  }

  return score;
}

function createExplanation(productsCount: number, intent: ReturnType<typeof extractIntent>): string {
  if (productsCount === 0) {
    return "Sorry, I could not find a strong product match from the current catalog. Try adding crop, pest, disease, or season details.";
  }

  const parts: string[] = [];
  if (intent.crops.size) parts.push(`crop: ${Array.from(intent.crops).join(", ").replace(/_/g, " ")}`);
  if (intent.pests.size) parts.push(`pest: ${Array.from(intent.pests).join(", ").replace(/_/g, " ")}`);
  if (intent.diseases.size) parts.push(`disease: ${Array.from(intent.diseases).join(", ").replace(/_/g, " ")}`);
  if (intent.seasons.size) parts.push(`season: ${Array.from(intent.seasons).join(", ").replace(/_/g, " ")}`);
  if (intent.categories.size) parts.push(`type: ${Array.from(intent.categories).join(", ")}`);

  if (parts.length === 0) {
    return `Here are the top ${productsCount} best-matching products from the full catalog data.`;
  }

  return `Here are the top ${productsCount} recommended products based on ${parts.join(" | ")}.`;
}

function searchAndRecommendProducts(query: string, filters: Filters = {}) {
  const intent = extractIntent(query, filters);
  const scoredProducts = indexedProducts
    .map((indexed) => ({
      product: indexed.product,
      score: scoreIndexedProduct(indexed, query, filters, intent),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || String(a.product.name).localeCompare(String(b.product.name)));

  const products = scoredProducts.slice(0, 5).map((entry) => entry.product);
  const explanation = createExplanation(products.length, intent);

  return { products, explanation };
}

export { searchAndRecommendProducts, allProducts };
