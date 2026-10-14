export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  bulk_price?: number | null;
  images: string[];
  category: string;
  subcategory?: string | null;
  overview?: string | null;
  description?: string | null;
  composition?: string | null;
  packaging_sizes?: string | null;
  key_benefits?: string[];
  usage_dosage?: string | null;
  target_crops?: string[];
  application_method?: string | null;
  safety_precautions?: string | null;
  storage_instructions?: string | null;
  faqs?: ProductFaq[];
  related_products?: string[];
  featured?: boolean;
  stock?: number;
  sort_order?: number | null;
}

export const OFFICIAL_PRODUCT_SLUGS = [
  "laskar",
  "kill-71",
  "chitrazine",
  "jorawar",
  "krantikari",
  "kargil-75",
  "vandan",
  "fungastin",
  "feuradon-3g",
  "attack-20",
  "attack-505",
  "chitra-coc",
  "cymo-plus",
  "chitgor",
  "benzo-fire",
] as const;

export const OFFICIAL_PRODUCT_SLUG_SET = new Set<string>(OFFICIAL_PRODUCT_SLUGS);
