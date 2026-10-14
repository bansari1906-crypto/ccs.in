import { useEffect, useMemo, useState } from "react";
import { Search, Edit, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  content: string;
  meta_title: string;
  meta_description: string;
  tags: string;
  is_published: boolean;
  created_at: string;
}

const defaultForm = {
  title: "",
  slug: "",
  content: "",
  meta_title: "",
  meta_description: "",
  tags: "",
  is_published: false,
  image: null as File | null,
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/blog/");
      setPosts(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Could not load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      return (
        !q ||
        [p.title, p.tags]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [posts, search]);

  const openAddSheet = () => {
    setSelectedPost(null);
    setForm(defaultForm);
    setPreviewUrl("");
    setIsSheetOpen(true);
  };

  const openEditSheet = (post: BlogPost) => {
    setSelectedPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      tags: post.tags || "",
      is_published: post.is_published,
      image: null,
    });
    setPreviewUrl(post.featured_image || "");
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

  const handleSubmit = async (event: React.FormEvent) => {
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
        formData.append("featured_image", form.image);
      }

      if (selectedPost?.id) {
        await api.patch(`/blog/${selectedPost.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post updated");
      } else {
        await api.post("/blog/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post created");
      }
      setIsSheetOpen(false);
      await loadPosts();
    } catch (error) {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await api.delete(`/blog/${id}/`);
      toast.success("Post deleted");
      await loadPosts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Blog & Articles"
        description="Manage your agricultural insights, news, and crop management articles."
        actionText="Write Post"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="pl-9 bg-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading posts...
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No posts found.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{post.title}</td>
                    <td className="px-6 py-4">
                      <Badge variant={post.is_published ? "secondary" : "outline"}>
                        {post.is_published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{post.tags || "—"}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditSheet(post)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(post.id)}
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
            <SheetTitle>{selectedPost ? "Update Post" : "Write Post"}</SheetTitle>
            <SheetDescription>Create or edit a blog article.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => handleFieldChange("slug", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => handleFieldChange("tags", e.target.value)}
                  placeholder="agriculture, tips"
                />
              </div>
              <div>
                <Label htmlFor="is_published">Status</Label>
                <select
                  id="is_published"
                  value={form.is_published ? "true" : "false"}
                  onChange={(e) => handleFieldChange("is_published", e.target.value === "true")}
                  className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => handleFieldChange("content", e.target.value)}
                rows={10}
                required
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-slate-900">SEO & Media</h3>
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

              <div>
                <Label htmlFor="image">Featured Image</Label>
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
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm w-full h-48">
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t pb-8">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Saving..." : selectedPost ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
