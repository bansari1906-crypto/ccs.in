import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Upload, Star } from "lucide-react";
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
import { getTestimonials, saveTestimonials } from "@/lib/adminDataStore";

interface Testimonial {
  id: number;
  customer_name: string;
  customer_image: string | null;
  rating: number;
  review: string;
  is_visible: boolean;
  created_at: string;
}

const defaultForm = {
  customer_name: "",
  rating: "5",
  review: "",
  is_visible: true,
  image: null as File | null,
};

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const loadTestimonials = () => {
    setLoading(true);
    try {
      setTestimonials(getTestimonials());
    } catch (error) {
      toast.error("Could not load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openAddSheet = () => {
    setSelectedTestimonial(null);
    setForm(defaultForm);
    setPreviewUrl("");
    setIsSheetOpen(true);
  };

  const openEditSheet = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setForm({
      customer_name: testimonial.customer_name,
      rating: String(testimonial.rating),
      review: testimonial.review,
      is_visible: testimonial.is_visible,
      image: null,
    });
    setPreviewUrl(testimonial.customer_image || "");
    setIsSheetOpen(true);
  };

  const handleFieldChange = (key: keyof typeof defaultForm, value: string | boolean | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFieldChange("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      let newImage = selectedTestimonial?.customer_image || null;
      if (form.image) {
        newImage = previewUrl;
      }

      if (selectedTestimonial?.id) {
        const updatedTestimonials = testimonials.map((t) =>
          t.id === selectedTestimonial.id
            ? { 
                ...t, 
                customer_name: form.customer_name,
                rating: Number(form.rating),
                review: form.review,
                is_visible: form.is_visible,
                customer_image: newImage,
              }
            : t
        );
        saveTestimonials(updatedTestimonials);
        setTestimonials(updatedTestimonials);
        toast.success("Testimonial updated");
      } else {
        const newId = testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.id)) + 1 : 1;
        const newTestimonial: Testimonial = {
          id: newId,
          customer_name: form.customer_name,
          rating: Number(form.rating),
          review: form.review,
          is_visible: form.is_visible,
          customer_image: newImage,
          created_at: new Date().toISOString(),
        };
        const updatedTestimonials = [...testimonials, newTestimonial];
        saveTestimonials(updatedTestimonials);
        setTestimonials(updatedTestimonials);
        toast.success("Testimonial added");
      }
      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      const updatedTestimonials = testimonials.filter((t) => t.id !== id);
      saveTestimonials(updatedTestimonials);
      setTestimonials(updatedTestimonials);
      toast.success("Testimonial deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Testimonials"
        description="Manage farmer reviews and feedback to build trust on your website."
        actionText="Add Testimonial"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Review</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading testimonials...
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                      {t.customer_image ? (
                        <img src={t.customer_image} className="w-10 h-10 rounded-full object-cover border" alt="" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border" />
                      )}
                      {t.customer_name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-amber-500">
                        {t.rating} <Star className="w-4 h-4 ml-1 fill-current" />
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-600">{t.review}</td>
                    <td className="px-6 py-4">
                      <Badge variant={t.is_visible ? "secondary" : "outline"}>
                        {t.is_visible ? "Visible" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditSheet(t)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(t.id)}
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
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selectedTestimonial ? "Update Testimonial" : "Add Testimonial"}</SheetTitle>
            <SheetDescription>Publish feedback from happy farmers.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input
                id="customer_name"
                value={form.customer_name}
                onChange={(e) => handleFieldChange("customer_name", e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) => handleFieldChange("rating", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="is_visible">Visibility</Label>
                <select
                  id="is_visible"
                  value={form.is_visible ? "true" : "false"}
                  onChange={(e) => handleFieldChange("is_visible", e.target.value === "true")}
                  className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="true">Visible</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="review">Review / Feedback</Label>
              <Textarea
                id="review"
                value={form.review}
                onChange={(e) => handleFieldChange("review", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Customer Photo</Label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <Upload className="h-5 w-5 text-emerald-600" />
                <label className="cursor-pointer text-sm text-slate-700">
                  <span className="font-medium text-emerald-600">Upload photo</span>
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
                <div className="mt-4 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm w-20 h-20">
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t pb-8">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Saving..." : selectedTestimonial ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}