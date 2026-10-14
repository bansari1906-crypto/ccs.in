
import staticProductCatalog from "@/data/product-catalog.json";
import officialProductCatalog from "@/data/official-product-catalog.json";

// --- Types ---
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  images: string[];
  overview?: string;
  description?: string;
  technical_name?: string;
  uses?: string;
  target_pests?: string[];
  suitable_crops?: string[];
  benefits?: string[];
  dosage?: string;
  application_method?: string;
  pack_sizes?: string[];
  storage_instructions?: string;
  safety_precautions?: string;
  composition?: string;
  active_ingredient?: string;
  formulation?: string;
  special_features?: string;
  seo_title?: string;
  seo_description?: string;
  scientific_profile?: string;
  agronomic_benefits?: string[];
  safety_measures?: string;
  faqs?: { question: string; answer: string }[];
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  status: string;
}

export interface Lead {
  id: number;
  customer_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  state: string | null;
  product: string | null;
  message: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_name: string;
  product_name: string;
  quantity: number;
  status: string;
  tracking_number: string | null;
  shipping_notes: string | null;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  content: string;
  meta_title: string;
  meta_description: string;
  tags: string;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  customer_image: string | null;
  rating: number;
  review: string;
  is_visible: boolean;
  created_at: string;
}

export interface Customer {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  is_active: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
  created_at: string;
}

export interface AnalyticsEvent {
  id: number;
  type: "product_view" | "product_search" | "whatsapp_click";
  product_id?: number;
  product_name?: string;
  timestamp: string;
  ip?: string;
}

// --- Initialization ---
const initializeData = () => {
  // Products
  if (!localStorage.getItem("admin_products")) {
    const allProducts = [...staticProductCatalog, ...officialProductCatalog];
    const uniqueProducts: Product[] = [];
    const seenNames = new Set();
    
    allProducts.forEach((p: any, index) => {
      if (!seenNames.has(p.name.toLowerCase())) {
        seenNames.add(p.name.toLowerCase());
        uniqueProducts.push({
          id: index + 1,
          name: p.name,
          slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: p.category || "INSECTICIDE",
          images: p.images || [],
          overview: p.overview,
          description: p.description,
          technical_name: p.technicalName,
          uses: p.uses,
          target_pests: p.targetPests,
          suitable_crops: p.suitableCrops || p.target_crops,
          benefits: p.benefits || p.key_benefits,
          dosage: p.dose,
          application_method: p.applicationMethod,
          pack_sizes: p.packSizes,
          storage_instructions: p.storageInstructions,
          safety_precautions: p.safetyPrecautions,
          composition: p.composition,
          active_ingredient: p.activeIngredient,
          formulation: p.formulation,
          special_features: p.specialFeatures,
          seo_title: p.seoTitle,
          seo_description: p.seoDescription,
          scientific_profile: p.scientificProfile,
          agronomic_benefits: p.agronomicBenefits,
          safety_measures: p.safetyMeasures,
          faqs: p.faqs,
          is_active: true,
        });
      }
    });
    
    localStorage.setItem("admin_products", JSON.stringify(uniqueProducts));
  }

  // Categories
  if (!localStorage.getItem("admin_categories")) {
    const categories: Category[] = [
      { id: 1, name: "INSECTICIDE", slug: "insecticide", description: "Insect control products for all crops", icon: null, status: "active" },
      { id: 2, name: "FUNGICIDE", slug: "fungicide", description: "Fungus and disease management solutions", icon: null, status: "active" },
      { id: 3, name: "HERBICIDE", slug: "herbicide", description: "Weed control and herbicide products", icon: null, status: "active" },
      { id: 4, name: "PGR", slug: "pgr", description: "Plant growth regulators and promoters", icon: null, status: "active" },
      { id: 5, name: "FERTILIZER", slug: "fertilizer", description: "Nutrition and fertilizer products", icon: null, status: "active" },
    ];
    localStorage.setItem("admin_categories", JSON.stringify(categories));
  }

  // Leads
  if (!localStorage.getItem("admin_leads")) {
    localStorage.setItem("admin_leads", JSON.stringify([]));
  }

  // Orders
  if (!localStorage.getItem("admin_orders")) {
    localStorage.setItem("admin_orders", JSON.stringify([]));
  }

  // Blog
  if (!localStorage.getItem("admin_blog")) {
    localStorage.setItem("admin_blog", JSON.stringify([]));
  }

  // Testimonials
  if (!localStorage.getItem("admin_testimonials")) {
    localStorage.setItem("admin_testimonials", JSON.stringify([]));
  }

  // Customers
  if (!localStorage.getItem("admin_customers")) {
    localStorage.setItem("admin_customers", JSON.stringify([]));
  }

  // Analytics
  if (!localStorage.getItem("admin_analytics")) {
    localStorage.setItem("admin_analytics", JSON.stringify([]));
  }

  // Gallery
  if (!localStorage.getItem("admin_gallery")) {
    localStorage.setItem("admin_gallery", JSON.stringify([]));
  }
};

initializeData();

// --- Helpers ---
const getNextId = (items: { id: number }[]) => {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
};

// --- Product Functions ---
export const getProducts = (): Product[] => {
  return JSON.parse(localStorage.getItem("admin_products") || "[]");
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem("admin_products", JSON.stringify(products));
};

// --- Category Functions ---
export const getCategories = (): Category[] => {
  return JSON.parse(localStorage.getItem("admin_categories") || "[]");
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem("admin_categories", JSON.stringify(categories));
};

// --- Lead Functions ---
export const getLeads = (): Lead[] => {
  return JSON.parse(localStorage.getItem("admin_leads") || "[]");
};

export const saveLeads = (leads: Lead[]) => {
  localStorage.setItem("admin_leads", JSON.stringify(leads));
};

export const addLead = (lead: Omit<Lead, "id" | "created_at">) => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: getNextId(leads),
    created_at: new Date().toISOString(),
  };
  saveLeads([...leads, newLead]);
  return newLead;
};

// --- Order Functions ---
export const getOrders = (): Order[] => {
  return JSON.parse(localStorage.getItem("admin_orders") || "[]");
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem("admin_orders", JSON.stringify(orders));
};

// --- Blog Functions ---
export const getBlogPosts = (): BlogPost[] => {
  return JSON.parse(localStorage.getItem("admin_blog") || "[]");
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem("admin_blog", JSON.stringify(posts));
};

// --- Testimonial Functions ---
export const getTestimonials = (): Testimonial[] => {
  return JSON.parse(localStorage.getItem("admin_testimonials") || "[]");
};

export const saveTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem("admin_testimonials", JSON.stringify(testimonials));
};

// --- Customer Functions ---
export const getCustomers = (): Customer[] => {
  return JSON.parse(localStorage.getItem("admin_customers") || "[]");
};

export const saveCustomers = (customers: Customer[]) => {
  localStorage.setItem("admin_customers", JSON.stringify(customers));
};

// --- Analytics Functions ---
export const getAnalytics = (): AnalyticsEvent[] => {
  return JSON.parse(localStorage.getItem("admin_analytics") || "[]");
};

export const saveAnalytics = (events: AnalyticsEvent[]) => {
  localStorage.setItem("admin_analytics", JSON.stringify(events));
};

export const trackAnalytics = (event: Omit<AnalyticsEvent, "id" | "timestamp">) => {
  const events = getAnalytics();
  const newEvent: AnalyticsEvent = {
    ...event,
    id: getNextId(events),
    timestamp: new Date().toISOString(),
  };
  saveAnalytics([...events, newEvent]);
  return newEvent;
};

// --- Gallery Functions ---
export const getGallery = (): GalleryItem[] => {
  return JSON.parse(localStorage.getItem("admin_gallery") || "[]");
};

export const saveGallery = (items: GalleryItem[]) => {
  localStorage.setItem("admin_gallery", JSON.stringify(items));
};
