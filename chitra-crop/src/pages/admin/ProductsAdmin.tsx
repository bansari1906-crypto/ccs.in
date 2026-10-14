import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Upload, Edit, Package, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProducts, saveProducts, getCategories, Product } from "@/lib/adminDataStore";

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
  const [categories, setCategories] = useState(getCategories());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    try {
      setProducts(getProducts());
    } catch (error) {
      toast.error("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        [product.name, product.slug, product.category]
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
    setIsSheetOpen(true);
  };

  const openEditSheet = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "",
      short_description: product.description || product.overview || "",
      full_description: product.description || "",
      benefits: Array.isArray(product.benefits) ? product.benefits.join(", ") : product.benefits || "",
      usage_instructions: product.application_method || "",
      target_crops: Array.isArray(product.suitable_crops) ? product.suitable_crops.join(", ") : product.suitable_crops || "",
      meta_title: product.seo_title || "",
      meta_description: product.seo_description || "",
      is_active: product.is_active,
      image: null,
    });
    setPreviewUrl(product.images && product.images.length > 0 ? product.images[0] : "");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      if (selectedProduct?.id) {
        const updatedProducts = products.map((p) =>
          p.id === selectedProduct.id
            ? { 
                ...p, 
                name: form.name, 
                slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), 
                category: form.category, 
                overview: form.short_description,
                description: form.full_description,
                benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
                application_method: form.usage_instructions,
                suitable_crops: form.target_crops.split(",").map((c) => c.trim()).filter(Boolean),
                seo_title: form.meta_title,
                seo_description: form.meta_description,
                is_active: form.is_active,
                images: form.image ? [previewUrl] : p.images
              }
            : p
        );
        saveProducts(updatedProducts);
        setProducts(updatedProducts);
        toast.success("Product updated successfully");
      } else {
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        const newProduct: Product = {
          id: newId,
          name: form.name,
          slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: form.category || "INSECTICIDE",
          overview: form.short_description,
          description: form.full_description,
          benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
          application_method: form.usage_instructions,
          suitable_crops: form.target_crops.split(",").map((c) => c.trim()).filter(Boolean),
          seo_title: form.meta_title,
          seo_description: form.meta_description,
          is_active: form.is_active,
          images: form.image ? [previewUrl] : [],
        };
        const updatedProducts = [...products, newProduct];
        saveProducts(updatedProducts);
        setProducts(updatedProducts);
        toast.success("Product created successfully");
      }

      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Unable to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveProducts(updatedProducts);
      setProducts(updatedProducts);
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const exportToCSV = () => {
    if (filteredProducts.length === 0) {
      toast.error("No products to export");
      return;
    }
    try {
      const headers = ["ID", "Name", "Slug", "Category", "Description", "Technical Name", "Uses", "Target Pests", "Suitable Crops", "Benefits", "Dosage", "Application Method", "Pack Sizes", "Composition", "Active Ingredient", "Formulation", "Special Features", "SEO Title", "SEO Description"];
      const rows = filteredProducts.map((p) => [
        p.id,
        `"${p.name.replace(/"/g, '""')}"`,
        p.slug,
        p.category,
        `"${(p.description || p.overview || '').replace(/"/g, '""')}"`,
        `"${(p.technical_name || '').replace(/"/g, '""')}"`,
        `"${(p.uses || '').replace(/"/g, '""')}"`,
        Array.isArray(p.target_pests) ? `"${p.target_pests.join(', ').replace(/"/g, '""')}"` : `"${(p.target_pests || '').replace(/"/g, '""')}"`,
        Array.isArray(p.suitable_crops) ? `"${p.suitable_crops.join(', ').replace(/"/g, '""')}"` : `"${(p.suitable_crops || '').replace(/"/g, '""')}"`,
        Array.isArray(p.benefits) ? `"${p.benefits.join(', ').replace(/"/g, '""')}"` : `"${(p.benefits || '').replace(/"/g, '""')}"`,
        `"${(p.dosage || '').replace(/"/g, '""')}"`,
        `"${(p.application_method || '').replace(/"/g, '""')}"`,
        Array.isArray(p.pack_sizes) ? `"${p.pack_sizes.join(', ').replace(/"/g, '""')}"` : `"${(p.pack_sizes || '').replace(/"/g, '""')}"`,
        `"${(p.composition || '').replace(/"/g, '""')}"`,
        `"${(p.active_ingredient || '').replace(/"/g, '""')}"`,
        `"${(p.formulation || '').replace(/"/g, '""')}"`,
        `"${(p.special_features || '').replace(/"/g, '""')}"`,
        `"${(p.seo_title || '').replace(/"/g, '""')}"`,
        `"${(p.seo_description || '').replace(/"/g, '""')}"`,
      ]);
      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `chitra_crop_products_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV exported successfully!");
    } catch (error) {
      toast.error("Failed to export CSV");
    }
  };

  const exportToJSON = () => {
    if (filteredProducts.length === 0) {
      toast.error("No products to export");
      return;
    }
    try {
      const jsonContent = JSON.stringify(filteredProducts, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `chitra_crop_products_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("JSON exported successfully!");
    } catch (error) {
      toast.error("Failed to export JSON");
    }
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Catalog</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your complete agricultural product catalog, inventory, categories, and technical information.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportToJSON}>
            <Download className="h-4 w-4 mr-2" /> Export JSON
          </Button>
          <Button size="sm" onClick={openAddSheet}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

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
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-slate-100 border flex items-center justify-center text-slate-400">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.category || "Uncategorized"}</td>
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
                    <option key={category.id} value={category.name}>
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
                  <Label htmlFor="benefits">Benefits (comma-separated)</Label>
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
                <Label htmlFor="target_crops">Target Crops (comma-separated)</Label>
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