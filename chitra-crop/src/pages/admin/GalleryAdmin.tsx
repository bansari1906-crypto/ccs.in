import { useEffect, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getGallery, saveGallery, GalleryItem } from "@/lib/adminDataStore";

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const loadGallery = () => {
    setLoading(true);
    try {
      setItems(getGallery());
    } catch (error) {
      toast.error("Could not load gallery items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openAddSheet = () => {
    setTitle("");
    setCategory("");
    setFile(null);
    setPreviewUrl("");
    setIsSheetOpen(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    setSaving(true);
    try {
      const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      const newItem: GalleryItem = {
        id: newId,
        title: title,
        category: category,
        image: previewUrl,
        created_at: new Date().toISOString(),
      };
      const updatedItems = [...items, newItem];
      saveGallery(updatedItems);
      setItems(updatedItems);
      toast.success("Image uploaded successfully");
      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      const updatedItems = items.filter((item) => item.id !== id);
      saveGallery(updatedItems);
      setItems(updatedItems);
      toast.success("Image deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Gallery Management"
        description="Upload and categorize photos for events, fields, and product showcases."
        actionText="Upload Image"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm p-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading gallery...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No images in gallery.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-2xl border overflow-hidden bg-slate-50 aspect-square">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm truncate">{item.title || "Untitled"}</p>
                  <p className="text-slate-300 text-xs mt-1">{item.category}</p>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 w-8 h-8 p-0"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Upload Image</SheetTitle>
            <SheetDescription>Add a new photo to the website gallery.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="title">Image Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Events, Fields"
              />
            </div>

            <div>
              <Label htmlFor="image">Photo</Label>
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
                    required
                  />
                </label>
              </div>
              {previewUrl && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm w-full aspect-video">
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
