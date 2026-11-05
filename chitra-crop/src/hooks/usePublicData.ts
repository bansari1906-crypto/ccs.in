import { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import djangoApi from "@/lib/djangoApi";
import type { Product as UiProduct } from "@/types/product";
import staticProductCatalog from "@/data/product-catalog.json";
import { staticBlogs } from "@/data/blogs";
import { getBlogPosts, BlogPost as AdminBlogPost } from "@/lib/adminDataStore";

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
  is_published?: boolean;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
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
  category?: string | null;
  tags?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
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
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    };

    window.addEventListener("blog_posts_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("blog_posts_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [queryClient]);

  const query = useQuery<BlogPost[]>({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      // 1. Fetch from unified adminDataStore
      const adminStorePosts: AdminBlogPost[] = getBlogPosts();

      // 2. Try fetching from backend API if active
      let backendPosts: BackendBlogPost[] = [];
      try {
        const response = await djangoApi.get<BackendBlogPost[]>("/blog/");
        backendPosts = (response.data as any).results ?? response.data ?? [];
      } catch {
        // Fallback to local admin store if backend is not running
      }

      // Merge backend posts if any exist
      const existingSlugs = new Set(adminStorePosts.map((p) => (p.slug || "").toLowerCase()));
      const additionalFromBackend: BlogPost[] = backendPosts
        .filter((post) => !existingSlugs.has((post.slug || "").toLowerCase()))
        .map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          summary: null,
          excerpt: post.content?.substring(0, 180) || "",
          content: post.content,
          featured_image: post.featured_image || null,
          featured_image_url: post.featured_image || null,
          cover_image: post.featured_image || null,
          category: post.category || "guide",
          status: post.is_published ? "published" : "draft",
          is_published: Boolean(post.is_published),
          tags: post.tags || "",
          meta_title: post.meta_title || post.title,
          meta_description: post.meta_description || post.content?.substring(0, 180) || "",
          published_at: post.created_at,
          published_date: post.created_at,
          created_at: post.created_at,
          author: "Chitra Crop Science",
        }));

      const allMerged = [...adminStorePosts, ...additionalFromBackend];

      // 3. Exclude Draft posts from the public website!
      const publishedPosts = allMerged.filter((post) => {
        const isPub = post.is_published !== undefined ? post.is_published : post.status !== "draft";
        return isPub && post.status !== "draft";
      });

      // 4. Normalize images, categories, and dates
      return publishedPosts.map((post) => {
        const image = post.featured_image || post.cover_image || post.featured_image_url || null;
        return {
          ...post,
          summary: post.excerpt || post.content?.substring(0, 180) || null,
          excerpt: post.excerpt || post.content?.substring(0, 180) || "",
          category: post.category || (post.video_url ? "review" : "guide"),
          featured_image: image,
          featured_image_url: post.featured_image_url || image,
          cover_image: post.cover_image || image,
        };
      });
    },
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useBlogPost(slug?: string) {
  const blogPostsQuery = useBlogPosts();
  const post = useMemo(() => {
    if (!slug) return null;
    const norm = slug.toLowerCase().trim();
    return blogPostsQuery.data.find((item) => (item.slug || "").toLowerCase().trim() === norm) ?? null;
  }, [blogPostsQuery.data, slug]);

  return {
    ...blogPostsQuery,
    post,
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
