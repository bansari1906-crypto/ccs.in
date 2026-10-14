// Maps DB-stored asset paths to imported Vite asset URLs
import heroFarmer from "@/assets/hero-farmer.jpg";
import aboutCrops from "@/assets/about-crops.jpg";
import aboutSoil from "@/assets/about-soil.jpg";
import productFertilizer from "@/assets/product-fertilizer.jpg";
import productPesticide from "@/assets/product-pesticide.jpg";
import productHerbicide from "@/assets/product-herbicide.jpg";
import productGrowth from "@/assets/product-growth.jpg";
import productProtection from "@/assets/product-protection.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const DJANGO_MEDIA_URL = import.meta.env.VITE_DJANGO_MEDIA_URL || 'http://127.0.0.1:8000';

const map: Record<string, string> = {
  "/src/assets/hero-farmer.jpg": heroFarmer,
  "/src/assets/about-crops.jpg": aboutCrops,
  "/src/assets/about-soil.jpg": aboutSoil,
  "/src/assets/product-fertilizer.jpg": productFertilizer,
  "/src/assets/product-pesticide.jpg": productPesticide,
  "/src/assets/product-herbicide.jpg": productHerbicide,
  "/src/assets/product-growth.jpg": productGrowth,
  "/src/assets/product-protection.jpg": productProtection,
  "/src/assets/blog-1.jpg": blog1,
  "/src/assets/blog-2.jpg": blog2,
  "/src/assets/blog-3.jpg": blog3,
};

export const resolveAsset = (path?: string | null): string => {
  if (!path) return productFertilizer;
  if (path.startsWith('/media/')) {
    return `${DJANGO_MEDIA_URL}${path}`;
  }
  if (path.startsWith('media/')) {
    return `${DJANGO_MEDIA_URL}/${path}`;
  }
  if (path.startsWith('products/')) {
    return `${DJANGO_MEDIA_URL}/media/${path}`;
  }
  return map[path] ?? path;
};
