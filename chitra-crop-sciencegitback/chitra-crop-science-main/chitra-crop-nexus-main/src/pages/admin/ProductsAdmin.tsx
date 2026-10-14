import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Upload, Edit, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Category {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  image: string;
}

interface Product {
  id: number;
  category: number | null;
  category_name?: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  benefits: string;
  usage_instructions: string;
  target_crops: string;
  image: string | null;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  gallery_images?: ProductImage[];
}

const defaultForm = {
  name: "",
  slug: "",
  category: "",
  short_description: "",
  full_description: "",
  benefits: "",
  usage_instructions: "",
  target_crops: "",
  meta_title: "",
  meta_description: "",
  is_active: true,
  image: null as File | null,
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products/");
      setProducts(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories/");
      setCategories(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        [product.name, product.slug, product.category_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active" ? product.is_active : !product.is_active);
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const openAddSheet = () => {
    setSelectedProduct(null);
    setForm(defaultForm);
    setPreviewUrl("");
    setGalleryFiles([]);
    setIsSheetOpen(true);
  };

  const openEditSheet = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category ? String(product.category) : "",
      short_description: product.short_description || "",
      full_description: product.full_description || "",
      benefits: product.benefits || "",
      usage_instructions: product.usage_instructions || "",
      target_crops: product.target_crops || "",
      meta_title: product.meta_title || "",
      meta_description: product.meta_description || "",
      is_active: product.is_active,
      image: null,
    });
    setPreviewUrl(product.image || "");
    setGalleryFiles([]);
    setIsSheetOpen(true);
  };

  const handleFieldChange = (key: string, value: string | boolean | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFieldChange("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setGalleryFiles(Array.from(event.target.files));
    }
  };

  const uploadGalleryImages = async (productId: number) => {
    if (galleryFiles.length === 0) return;
    try {
      await Promise.all(
        galleryFiles.map((file) => {
          const formData = new FormData();
          formData.append("product", String(productId));
          formData.append("image", file);
          return api.post("/product-images/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );
      toast.success("Gallery images uploaded");
    } catch (error) {
      toast.error("Gallery image upload failed");
    }
  };

  const handleDeleteGalleryImage = async (imageId: number) => {
    if (!window.confirm("Remove this gallery image?")) return;
    try {
      await api.delete(`/product-images/${imageId}/`);
      toast.success("Image removed");
      await loadProducts();
      // Update selected product state
      setSelectedProduct((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          gallery_images: prev.gallery_images?.filter((img) => img.id !== imageId),
        };
      });
    } catch (error) {
      toast.error("Could not remove image");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== "image") {
          formData.append(key, typeof value === "boolean" ? String(value) : value);
        }
      });
      if (form.image) {
        formData.append("image", form.image);
      }
      if (!form.category) {
        formData.delete("category");
      }

      let response;
      if (selectedProduct?.id) {
        response = await api.patch(`/products/${selectedProduct.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        response = await api.post("/products/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }

      const savedProduct = response.data;
      if (galleryFiles.length > 0 && savedProduct?.id) {
        await uploadGalleryImages(savedProduct.id);
      }

      setIsSheetOpen(false);
      await loadProducts();
    } catch (error) {
      toast.error("Unable to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}/`);
      toast.success("Product deleted");
      await loadProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Product Catalog"
        description="Manage your complete agricultural product catalog, inventory, categories, and technical information."
        actionText="Add Product"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-col md:flex-row gap-4 items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="md:max-w-md bg-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full md:w-auto rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-slate-100 border flex items-center justify-center text-slate-400">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.category_name || "Uncategorized"}</td>
                    <td className="px-6 py-4">
                      <Badge variant={product.is_active ? "secondary" : "outline"}>
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditSheet(product)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{selectedProduct ? "Update product" : "Create new product"}</SheetTitle>
            <SheetDescription>
              {selectedProduct
                ? "Update product details below."
                : "Add a new product to the catalog."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => handleFieldChange("slug", e.target.value)}
                  placeholder="product-slug"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="is_active">Status</Label>
                <select
                  id="is_active"
                  value={form.is_active ? "true" : "false"}
                  onChange={(e) => handleFieldChange("is_active", e.target.value === "true")}
                  className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={form.short_description}
                  onChange={(e) => handleFieldChange("short_description", e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="full_description">Full Description</Label>
                <Textarea
                  id="full_description"
                  value={form.full_description}
                  onChange={(e) => handleFieldChange("full_description", e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    value={form.benefits}
                    onChange={(e) => handleFieldChange("benefits", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="usage_instructions">Usage Instructions</Label>
                  <Textarea
                    id="usage_instructions"
                    value={form.usage_instructions}
                    onChange={(e) => handleFieldChange("usage_instructions", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="target_crops">Target Crops</Label>
                <Input
                  id="target_crops"
                  value={form.target_crops}
                  onChange={(e) => handleFieldChange("target_crops", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-slate-900">SEO Meta Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={form.meta_title}
                    onChange={(e) => handleFieldChange("meta_title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={form.meta_description}
                    onChange={(e) => handleFieldChange("meta_description", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-slate-900">Product Images</h3>
              <div>
                <Label htmlFor="image">Primary Image</Label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Upload className="h-5 w-5 text-emerald-600" />
                  <label className="cursor-pointer text-sm text-slate-700">
                    <span className="font-medium text-emerald-600">Upload primary image</span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {previewUrl && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm w-32 h-32">
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="gallery">Gallery Images (Multiple)</Label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Upload className="h-5 w-5 text-emerald-600" />
                  <label className="cursor-pointer text-sm text-slate-700">
                    <span className="font-medium text-emerald-600">Upload gallery images</span>
                    <input
                      type="file"
                      id="gallery"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                    />
                  </label>
                </div>
                {galleryFiles.length > 0 && (
                  <p className="text-sm text-slate-500 mt-2">{galleryFiles.length} files selected</p>
                )}

                {selectedProduct?.gallery_images && selectedProduct.gallery_images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {selectedProduct.gallery_images.map((img) => (
                      <div key={img.id} className="relative group rounded-xl border overflow-hidden w-full h-24">
                        <img src={img.image} className="w-full h-full object-cover" alt="gallery" />
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryImage(img.id)}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t pb-8">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Saving..." : selectedProduct ? "Update product" : "Create product"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
