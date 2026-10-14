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

// Helper to normalize filenames
const normalizeFilename = (filename: string) => {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '-');
};

export const resolveAsset = (path?: string | null): string => {
  if (!path) {
    return productFertilizer;
  }

  // Check static map first
  if (map[path]) {
    return map[path];
  }

  // Extract filename
  let filename = path.split('/').pop() || '';
  const normalized = normalizeFilename(filename);

  // Possible directories in order of priority
  const directories = [
    '/images/products',
    '/assets/products',
    '/assets/media/products'
  ];

  // Possible extensions
  const extensions = ['.jpeg', '.jpg', '.png', '.webp'];

  // First try the exact filename as given
  for (const dir of directories) {
    if (path.startsWith(dir)) {
      return path;
    }
  }

  // If path is just a filename, try all combinations
  for (const dir of directories) {
    // Try with original filename
    if (filename.includes('.')) {
      return `${dir}/${filename}`;
    }

    // Try normalized filename
    for (const ext of extensions) {
      const testPath = `${dir}/${normalized}${ext}`;
      // We'll return the first one we think might exist
      return testPath;
    }
  }

  // Fallback if all fails
  return productFertilizer;
};
