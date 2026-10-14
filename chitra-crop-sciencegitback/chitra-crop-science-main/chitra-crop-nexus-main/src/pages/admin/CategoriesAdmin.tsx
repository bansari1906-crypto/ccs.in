import { useEffect, useState } from "react";
import { Plus, Trash2, Upload, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  slug: string;
  description: string;
  icon?: string;
  status: string;
}

const defaultForm = {
  name: "",
  slug: "",
  description: "",
  image: null as File | null,
};

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories/");
      setCategories(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Unable to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddSheet = () => {
    setSelectedCategory(null);
    setForm(defaultForm);
    setPreviewUrl("");
    setIsSheetOpen(true);
  };

  const openEditSheet = (category: Category) => {
    setSelectedCategory(category);
    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      image: null,
    });
    setPreviewUrl(category.icon || "");
    setIsSheetOpen(true);
  };

  const handleFieldChange = (key: keyof typeof defaultForm, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFieldChange("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      if (form.image) {
        formData.append("icon", form.image);
      }

      if (selectedCategory?.id) {
        await api.patch(`/categories/${selectedCategory.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category updated successfully");
      } else {
        await api.post("/categories/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category created successfully");
      }

      setIsSheetOpen(false);
      await loadCategories();
    } catch (error) {
      toast.error("Unable to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}/`);
      toast.success("Category deleted");
      await loadCategories();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Category Management"
        description="Organize categories with images. Create collections and keep your catalog structure organized."
        actionText="New category"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto bg-slate-50">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Category Name</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{category.name}</td>
                    <td className="px-6 py-4 text-slate-600">{category.slug || "—"}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                      {category.description || "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditSheet(category)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(category.id)}
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
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{selectedCategory ? "Update category" : "Create new category"}</SheetTitle>
            <SheetDescription>
              {selectedCategory
                ? "Update the details for this category."
                : "Fill out the information below to add a new category."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
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
                  placeholder="category-slug"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="image">Category Image/Icon</Label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Upload className="h-5 w-5 text-emerald-600" />
                  <label className="cursor-pointer text-sm text-slate-700">
                    <span className="font-medium text-emerald-600">Upload image</span>
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
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Saving..." : selectedCategory ? "Update category" : "Create category"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
