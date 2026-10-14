const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const EXCEL_PATH = "c:/Users/bansa/Downloads/chitracropscience.in/public_html_BACKUP_20260618_184057/images/Chitra_Crop_Science_Product_Catalog.xlsx";
const CATALOG_PATH = "c:/Users/bansa/Downloads/chitracropscience.in/chitra-crop/src/data/product-catalog.json";
const REPORT_PATH = "c:/Users/bansa/Downloads/chitracropscience.in/chitra-crop/product-catalog-sync-report.json";

const HIGH_LEVEL_CATEGORIES = new Set([
  "INSECTICIDE",
  "FUNGICIDE",
  "HERBICIDE",
  "PGR",
  "FERTILIZER",
]);
function cleanText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/\r/g, "")
    .replace(/ΓÇó|•|●|◦|▪/g, "-")
    .replace(/ΓÇô|–|—/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeName(value) {
  return cleanText(value)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function splitCommaList(value) {
  const text = cleanText(value);
  if (!text) {
    return [];
  }

  return text
    .split(/\s*,\s*/)
    .map((item) => cleanText(item).replace(/^-+\s*/, ""))
    .filter(Boolean);
}

function splitBulletList(value) {
  const text = cleanText(value);
  if (!text) {
    return [];
  }

  const normalized = text
    .replace(/\s+-\s+/g, "\n- ")
    .replace(/^-+\s*/, "- ");

  return normalized
    .split("\n")
    .map((line) => cleanText(line).replace(/^-+\s*/, ""))
    .filter(Boolean);
}

function parseFaqs(value) {
  const text = cleanText(value);
  if (!text) {
    return [];
  }

  const faqs = [];
  const regex = /Q\d+\s*:\s*([\s\S]*?)\nA\s*:\s*([\s\S]*?)(?=\n\s*Q\d+\s*:|$)/gi;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const question = cleanText(match[1]);
    const answer = cleanText(match[2]);
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

function inferApplicationMethod(row) {
  const combined = [
    row["Description"],
    row["Features"],
    row["Benefits"],
  ]
    .map(cleanText)
    .join(" ")
    .toUpperCase();

  if (combined.includes("DRIP") && combined.includes("FOLIAR")) {
    return "Drip irrigation or Foliar Spray";
  }
  if (combined.includes("FOLIAR SPRAY")) {
    return "Foliar Spray";
  }
  if (combined.includes("SOIL APPLICATION")) {
    return "Soil Application";
  }

  return "";
}

function inferFormulation(technicalName) {
  const text = cleanText(technicalName).toUpperCase();
  const matches = text.match(/\b(ZC|WDG|WG|WP|EC|SC|SL|SP|SG|GR|CS|FS|OD|SE|WS|ME)\b/g);
  return matches?.[matches.length - 1] || "";
}

function mapCategory(sourceCategory, currentCategory) {
  const source = cleanText(sourceCategory).toUpperCase();
  const current = cleanText(currentCategory).toUpperCase();

  if (source.includes("FERTILIZER")) {
    return "FERTILIZER";
  }
  if (source.includes("PGR")) {
    return "PGR";
  }
  if (source.includes("HERBICIDE")) {
    return HIGH_LEVEL_CATEGORIES.has(current) ? current : "HERBICIDE";
  }
  if (source.includes("INSECTICIDE") && source.includes("FUNGICIDE")) {
    return HIGH_LEVEL_CATEGORIES.has(current) ? current : "INSECTICIDE";
  }
  if (source.includes("FUNGICIDE")) {
    return "FUNGICIDE";
  }
  if (source.includes("INSECTICIDE")) {
    return "INSECTICIDE";
  }

  return current || "FERTILIZER";
}

function inferProductType(sourceCategory, mappedCategory, currentProductType) {
  const current = cleanText(currentProductType);
  if (current) {
    return current;
  }

  const source = cleanText(sourceCategory);
  if (source) {
    return source;
  }

  return mappedCategory;
}

function setIfValue(target, key, value) {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    if (value.length > 0) {
      target[key] = value;
    }
    return;
  }

  const text = cleanText(value);
  if (text) {
    target[key] = text;
  }
}

function assignTargets(target, mappedCategory, targetList) {
  if (targetList.length === 0) {
    return;
  }

  if (mappedCategory === "INSECTICIDE") {
    target.targetPests = targetList;
  } else if (mappedCategory === "FUNGICIDE") {
    target.targetDiseases = targetList;
  } else if (mappedCategory === "HERBICIDE") {
    target.targetWeeds = targetList;
  } else {
    target.uses = targetList;
  }
}

function buildMergedProduct(existing, row) {
  const sourceName = cleanText(row["Product Name"]).toUpperCase();
  const sourceCategory = cleanText(row["Category"]);
  const mappedCategory = mapCategory(sourceCategory, existing.category);
  const description = cleanText(row["Description"]);
  const technicalName = cleanText(row["Technical Name"]);
  const benefits = splitBulletList(row["Benefits"]);
  const features = splitBulletList(row["Features"]);
  const targetCrops = splitCommaList(row["Target Crops"]);
  const targetConcerns = splitCommaList(row["Target Pests/Diseases"]);
  const packSizes = splitCommaList(row["Available Pack Sizes"]);
  const faqs = parseFaqs(row["FAQ"]);
  const dosage = cleanText(row["Dosage"]);
  const applicationMethod = inferApplicationMethod(row) || cleanText(existing.applicationMethod) || cleanText(existing.application_method);
  const formulation = inferFormulation(technicalName) || cleanText(existing.formulation);

  const merged = {
    ...existing,
    name: sourceName || existing.name,
    category: mappedCategory || existing.category,
    subcategory: sourceCategory || existing.subcategory || existing.category || "",
  };

  setIfValue(merged, "technicalName", technicalName || existing.technicalName);
  setIfValue(merged, "composition", technicalName || existing.composition);
  setIfValue(merged, "activeIngredient", technicalName || existing.activeIngredient);
  setIfValue(merged, "productType", inferProductType(sourceCategory, mappedCategory, existing.productType));
  setIfValue(merged, "formulation", formulation);
  setIfValue(merged, "overview", description || existing.overview);
  setIfValue(merged, "description", description || existing.description);
  setIfValue(merged, "usage_dosage", dosage || existing.usage_dosage || existing.dose);
  setIfValue(merged, "dose", dosage || existing.dose || existing.usage_dosage);
  setIfValue(merged, "applicationMethod", applicationMethod);
  setIfValue(merged, "application_method", applicationMethod);
  setIfValue(merged, "packaging_sizes", packSizes.join(", ") || existing.packaging_sizes);
  setIfValue(merged, "seoTitle", row["SEO Title"] || existing.seoTitle);
  setIfValue(merged, "seoDescription", row["SEO Description"] || existing.seoDescription);

  if (features.length > 0) {
    merged.benefits = features;
  }
  if (benefits.length > 0) {
    merged.key_benefits = benefits;
    merged.keyBenefits = benefits;
    merged.agronomicBenefits = benefits;
  }
  if (targetCrops.length > 0) {
    merged.target_crops = targetCrops;
    merged.targetCrops = targetCrops;
    merged.suitableCrops = targetCrops;
  }
  if (packSizes.length > 0) {
    merged.packSizes = packSizes;
  }
  if (faqs.length > 0) {
    merged.faqs = faqs;
  }

  assignTargets(merged, mappedCategory, targetConcerns);

  return merged;
}

const workbook = XLSX.readFile(EXCEL_PATH);
const rows = XLSX.utils.sheet_to_json(workbook.Sheets["Product Catalog"], { defval: "" });
const existingCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));

const catalogIndexesByName = new Map();
existingCatalog.forEach((product, index) => {
  const key = normalizeName(product.name);
  if (!catalogIndexesByName.has(key)) {
    catalogIndexesByName.set(key, []);
  }
  catalogIndexesByName.get(key).push(index);
});

const unmatchedSourceProducts = [];
const matchedSourceProducts = [];
const updatedRecordIds = new Set();

for (const row of rows) {
  const sourceName = cleanText(row["Product Name"]);
  const normalizedSourceName = normalizeName(sourceName);
  const lookupKey = normalizedSourceName;
  const indexes = catalogIndexesByName.get(lookupKey);

  if (!indexes || indexes.length === 0) {
    unmatchedSourceProducts.push(sourceName);
    continue;
  }

  matchedSourceProducts.push({
    sourceName,
    matchedTo: existingCatalog[indexes[0]].name,
    recordsUpdated: indexes.length,
  });

  for (const index of indexes) {
    const recordId = existingCatalog[index].id || `${existingCatalog[index].slug || existingCatalog[index].name}-${index}`;
    existingCatalog[index] = buildMergedProduct(existingCatalog[index], row);
    updatedRecordIds.add(recordId);
  }
}

existingCatalog.sort((a, b) =>
  String(a.name || "").localeCompare(String(b.name || ""), undefined, {
    sensitivity: "base",
    numeric: true,
  }),
);

fs.writeFileSync(CATALOG_PATH, `${JSON.stringify(existingCatalog, null, 2)}\n`, "utf8");

const untouchedCatalogProducts = existingCatalog
  .filter((product, index) => {
    const recordId = product.id || `${product.slug || product.name}-${index}`;
    return !updatedRecordIds.has(recordId);
  })
  .map((product) => product.name);

const report = {
  excelPath: EXCEL_PATH,
  catalogPath: CATALOG_PATH,
  sourceRowCount: rows.length,
  catalogRecordCount: existingCatalog.length,
  sourceProductsProcessed: matchedSourceProducts.length,
  catalogRecordsUpdated: updatedRecordIds.size,
  unmatchedSourceProducts,
  untouchedCatalogProducts,
  matchedSourceProducts,
};

fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Processed ${matchedSourceProducts.length} source products.`);
console.log(`Updated ${updatedRecordIds.size} catalog records.`);
console.log(`Unmatched source products: ${unmatchedSourceProducts.length}`);
console.log(`Report written to ${path.basename(REPORT_PATH)}`);
