import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import djangoApi from "@/lib/djangoApi";
import type { Product as UiProduct, ProductFaq } from "@/types/product";
import staticProductCatalog from "@/data/product-catalog.json";
import { staticBlogs } from "@/data/blogs";

export interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  featured_image: string | null;
  featured_image_url?: string | null;
  cover_image?: string | null;
  video_url?: string | null;
  farmer_name?: string | null;
  location?: string | null;
  crop?: string | null;
  product_name?: string | null;
  category?: string | null;
  rating?: number | null;
  status: string;
  published_at: string | null;
  published_date?: string | null;
  created_at: string;
  author?: string;
  excerpt?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  caption: string | null;
  active: number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string | null;
  quote: string;
  rating: number;
  active: number;
  created_at: string;
}

export interface SiteSettings {
  site_title: string;
  company_name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  website_url?: string | null;
  seo_description?: string | null;
}

type BackendCategory = { id: number; name: string; description?: string | null };
type BackendProduct = {
    id: number;
    name: string;
    slug: string;
    category: number | null;
    category_name?: string;
    subcategory_name?: string;
    image?: string | null;
    short_description?: string | null;
    full_description?: string | null;
    composition?: string | null;
    benefits?: string | null;
    usage_instructions?: string | null;
    target_crops?: string | null;
    packaging_sizes?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    is_active: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
};
type BackendBlogPost = { 
  id: number; 
  title: string; 
  slug: string;
  content: string; 
  created_at: string;
  is_published: boolean;
  featured_image?: string | null;
};
type BackendGalleryItem = { id: number; image: string; title?: string | null; category?: string | null };
type BackendTestimonial = { id: number; author: string; content: string; rating: number };
type BackendSiteSettings = {
  id: number;
  website_name: string;
  contact_number: string;
  email: string;
  address: string;
  facebook_link?: string | null;
  instagram_link?: string | null;
  whatsapp_link?: string | null;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitList(value?: string | null): string[] {
  const text = (value ?? "").trim();
  if (!text) return [];
  return text
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapProduct(raw: BackendProduct & { subcategory?: string | null }): UiProduct {
    const id = String(raw.id);
    const slug = raw.slug || `${id}-${slugify(raw.name)}`;
    const category = raw.category_name || (raw as any).category || "";
    const subcategory = raw.subcategory_name || (raw as any).subcategory || category || "";
    const images = raw.image ? [raw.image] : [];
    const key_benefits = splitList(raw.benefits);
    const target_crops = splitList(raw.target_crops);

    return {
        id,
        name: raw.name,
        slug,
        price: 0,
        images,
        category,
        subcategory,
        overview: raw.short_description ?? "",
        description: raw.full_description ?? "",
        key_benefits: key_benefits.length ? key_benefits : undefined,
        usage_dosage: raw.usage_instructions ?? null,
        target_crops: target_crops.length ? target_crops : undefined,
        featured: raw.is_featured,
        stock: 0,
        composition: raw.composition,
        packaging_sizes: raw.packaging_sizes,
    };
}

export function useProducts() {
  const query = useQuery<UiProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await djangoApi.get<BackendProduct[]>("/products/");
        const data = (response.data as any).results ?? response.data;
        return (data || []).map(mapProduct);
      } catch (error) {
        console.log("Falling back to static product catalog");
        return (staticProductCatalog as any[]).map(mapProduct);
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useProduct(slug?: string) {
  const productsQuery = useProducts();
  const product = useMemo(
    () =>
      productsQuery.data.find((item) => item.slug === slug) ??
      null,
    [productsQuery.data, slug],
  );

  return {
    ...productsQuery,
    product,
  };
}

export function useCategories() {
  const query = useQuery<BackendCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await djangoApi.get<BackendCategory[]>("/categories/");
        return (response.data as any).results ?? response.data ?? [];
      } catch (error) {
        console.log("Falling back to static categories");
        return [
          { id: 1, name: "Fertilizer" },
          { id: 2, name: "Insecticide" },
          { id: 3, name: "Herbicide" },
          { id: 4, name: "Bio Stimulant" },
        ];
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useBlogPosts() {
  const query = useQuery<BlogPost[]>({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const staticMapped: BlogPost[] = staticBlogs.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        summary: null,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.cover_image,
        featured_image_url: post.cover_image,
        cover_image: post.cover_image,
        video_url: post.video_url,
        farmer_name: post.farmer_name,
        location: post.location,
        crop: post.crop,
        product_name: post.product_name,
        category: post.category,
        rating: post.rating ?? 5,
        status: "published",
        published_at: post.published_at,
        published_date: post.published_at,
        created_at: post.published_at,
        author: post.author,
      }));

      try {
        const response = await djangoApi.get<BackendBlogPost[]>("/blog/");
        const data = (response.data as any).results ?? response.data ?? [];
        const existingSlugs = new Set(staticMapped.map((p) => p.slug));
        
        const backendMapped: BlogPost[] = data
          .filter((post: any) => !existingSlugs.has(post.slug))
          .map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            summary: null,
            excerpt: post.content?.substring(0, 200),
            content: post.content,
            featured_image: post.featured_image,
            featured_image_url: post.featured_image,
            cover_image: post.featured_image,
            category: "guide",
            status: post.is_published ? "published" : "draft",
            published_at: post.created_at,
            published_date: post.created_at,
            created_at: post.created_at,
            author: "Chitra Crop Science",
          }));

        return [...staticMapped, ...backendMapped];
      } catch (error) {
        console.log("Using static blog posts with reviews");
        return staticMapped;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });


  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useGalleryItems() {
  const query = useQuery<GalleryItem[]>({
    queryKey: ["gallery_items"],
    queryFn: async () => {
      try {
        const response = await djangoApi.get<BackendGalleryItem[]>("/gallery/");
        const data = (response.data as any).results ?? response.data ?? [];
        return data.map((item) => ({
          id: item.id,
          title: item.title?.trim() || `Image ${item.id}`,
          image_url: item.image,
          caption: item.title ?? null,
          active: 1,
          created_at: "",
        }));
      } catch (error) {
        console.log("Falling back to static gallery items");
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useTestimonials() {
  const query = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const response = await djangoApi.get<BackendTestimonial[]>("/testimonials/");
        const data = (response.data as any).results ?? response.data ?? [];
        const now = new Date().toISOString();
        return data.map((item) => ({
          id: item.id,
          author: item.author,
          role: null,
          quote: item.content,
          rating: item.rating,
          active: 1,
          created_at: now,
        }));
      } catch (error) {
        console.log("Falling back to static testimonials");
        return [
          {
            id: 1,
            author: "Rajesh Patel",
            role: "Cotton Farmer, Gujarat",
            quote: "Using Chitra Crop Science's products has significantly increased my cotton yield. The insecticides and fertilizers are excellent quality.",
            rating: 5,
            active: 1,
            created_at: new Date().toISOString()
          }
        ];
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useSettings() {
  const query = useQuery<SiteSettings | null>({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const response = await djangoApi.get<BackendSiteSettings[]>("/settings/");
        const data = (response.data as any).results ?? response.data ?? [];
        const item = data?.[0];
        if (!item) return null;
        return {
          site_title: item.website_name,
          company_name: item.website_name,
          phone: item.contact_number,
          email: item.email,
          address: item.address,
        };
      } catch (error) {
        console.log("Falling back to static settings");
        return null;
      }
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
