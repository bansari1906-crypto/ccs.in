
import staticProductCatalog from "@/data/product-catalog.json";
import officialProductCatalog from "@/data/official-product-catalog.json";
import { staticBlogs } from "@/data/blogs";

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
  id: number | string;
  title: string;
  slug: string;
  featured_image: string | null;
  featured_image_url?: string | null;
  cover_image?: string | null;
  content: string;
  excerpt?: string;
  category?: string;
  video_url?: string | null;
  farmer_name?: string | null;
  location?: string | null;
  crop?: string | null;
  product_name?: string | null;
  rating?: number;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  is_published: boolean;
  status?: string;
  created_at: string;
  published_at?: string;
  published_date?: string;
  author?: string;
}

export const DEFAULT_BLOG_POSTS: BlogPost[] = staticBlogs.map((b, index) => {
  const publishedDate = b.published_at || new Date().toISOString();
  const isPub = b.is_published !== false;
  return {
    id: b.id || index + 1,
    title: b.title,
    slug: b.slug,
    content: b.content,
    excerpt: b.excerpt || b.content?.substring(0, 180) || "",
    featured_image: b.cover_image || null,
    featured_image_url: b.cover_image || null,
    cover_image: b.cover_image || null,
    video_url: b.video_url || null,
    farmer_name: b.farmer_name || null,
    location: b.location || null,
    crop: b.crop || null,
    product_name: b.product_name || null,
    category: b.category || (b.video_url ? "review" : "guide"),
    rating: b.rating ?? 5,
    tags: b.tags || "",
    meta_title: b.meta_title || b.title,
    meta_description: b.meta_description || b.excerpt || "",
    is_published: isPub,
    status: isPub ? "published" : "draft",
    created_at: publishedDate,
    published_at: publishedDate,
    published_date: publishedDate,
    author: b.author || "Chitra Crop Science",
  };
});

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
  const storedBlogRaw = localStorage.getItem("admin_blog");
  if (!storedBlogRaw) {
    localStorage.setItem("admin_blog", JSON.stringify(DEFAULT_BLOG_POSTS));
  } else {
    try {
      const existing: BlogPost[] = JSON.parse(storedBlogRaw);
      if (!Array.isArray(existing) || existing.length === 0) {
        localStorage.setItem("admin_blog", JSON.stringify(DEFAULT_BLOG_POSTS));
      } else {
        const existingSlugs = new Set(existing.map((p) => (p.slug || "").toLowerCase()));
        const missingDefaults = DEFAULT_BLOG_POSTS.filter(
          (p) => !existingSlugs.has((p.slug || "").toLowerCase())
        );
        if (missingDefaults.length > 0) {
          const merged = [...missingDefaults, ...existing];
          localStorage.setItem("admin_blog", JSON.stringify(merged));
        }
      }
    } catch {
      localStorage.setItem("admin_blog", JSON.stringify(DEFAULT_BLOG_POSTS));
    }
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
  try {
    const raw = localStorage.getItem("admin_blog");
    if (!raw) {
      localStorage.setItem("admin_blog", JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }
    const parsed: any[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem("admin_blog", JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }
    // Ensure newly featured animated video is prioritized at index 0
    const animIdx = parsed.findIndex(
      (p) => p.slug === "ccs-potash-animation-balanced-nutrition-crop-growth"
    );
    if (animIdx > 0) {
      const [animPost] = parsed.splice(animIdx, 1);
      parsed.unshift(animPost);
      try {
        localStorage.setItem("admin_blog", JSON.stringify(parsed));
      } catch {
        // ignore quota issues
      }
    }
    return parsed.map((p, idx) => {
      const isPub = p.is_published !== undefined ? Boolean(p.is_published) : p.status !== "draft";
      const isCarb = (p.title || "").toUpperCase().includes("CCS-CARB ULTRA") || (p.title || "").toUpperCase().includes("ORGANIC CARBON");
      const cat = p.category || (isCarb ? "animated" : p.video_url ? "review" : "guide");
      
      let img = p.featured_image || p.cover_image || p.featured_image_url || null;
      if (!img || img === "null" || img === "undefined" || img === "") {
        if (isCarb) img = "/assets/media/ccs-carb-ultra.png";
        else if ((p.title || "").toUpperCase().includes("POTASH")) img = "/assets/media/poster-ccs-potash-animation.jpg";
        else img = "/assets/media/field1.jpeg";
      }

      const vid = p.video_url || (isCarb ? "/assets/media/anim-ccs-carb.mp4" : null);
      const postSlug = p.slug || (isCarb ? "ccs-carb-ultra-organic-carbon-soil-health" : `article-${p.id ?? idx + 1}`);
      const createdDate = p.created_at || p.published_at || new Date().toISOString();

      return {
        id: p.id ?? idx + 1,
        title: p.title || "Untitled Article",
        slug: postSlug,
        content: p.content || "",
        excerpt: p.excerpt || (p.content ? p.content.substring(0, 180) : ""),
        category: cat,
        featured_image: img,
        featured_image_url: img,
        cover_image: img,
        video_url: vid,
        farmer_name: p.farmer_name || null,
        location: p.location || null,
        crop: p.crop || null,
        product_name: p.product_name || null,
        rating: p.rating ?? 5,
        tags: p.tags || "",
        meta_title: p.meta_title || p.title || "",
        meta_description: p.meta_description || p.excerpt || "",
        is_published: isPub,
        status: isPub ? "published" : "draft",
        created_at: createdDate,
        published_at: p.published_at || createdDate,
        published_date: p.published_date || p.published_at || createdDate,
        author: p.author || "Chitra Crop Science",
      };
    });
  } catch (e) {
    console.error("Error reading admin_blog:", e);
    return DEFAULT_BLOG_POSTS;
  }
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem("admin_blog", JSON.stringify(posts));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("blog_posts_updated", { detail: posts }));
    window.dispatchEvent(new Event("storage"));
  }
};

export const getPublishedBlogPosts = (): BlogPost[] => {
  return getBlogPosts().filter((p) => p.is_published && p.status !== "draft");
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  if (!slug) return null;
  const normSlug = slug.toLowerCase().trim();
  const allPosts = getBlogPosts();
  return allPosts.find((p) => (p.slug || "").toLowerCase().trim() === normSlug) || null;
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
