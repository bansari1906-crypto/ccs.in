import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Edit, Trash2, Plus, Upload, ExternalLink, Video, BookOpen, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getBlogPosts, saveBlogPosts, BlogPost } from "@/lib/adminDataStore";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const defaultForm = {
  title: "",
  slug: "",
  category: "guide",
  content: "",
  excerpt: "",
  meta_title: "",
  meta_description: "",
  tags: "",
  is_published: true,
  image_url: "",
  video_url: "",
  farmer_name: "",
  location: "",
  crop: "",
  product_name: "",
  author: "Chitra Crop Science",
};

export default function BlogAdmin() {
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [autoSlug, setAutoSlug] = useState(true);

  const loadPosts = () => {
    setLoading(true);
    try {
      const items = getBlogPosts();
      setPosts(items);
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
      const matchesSearch =
        !q ||
        [p.title, p.tags, p.slug, p.product_name, p.farmer_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);

      if (!matchesSearch) return false;

      if (categoryFilter === "animated") {
        return p.category === "animated" || p.category === "animation";
      }
      if (categoryFilter === "reviews") {
        return (Boolean(p.video_url) || p.category === "review") && p.category !== "animated" && p.category !== "animation";
      }
      if (categoryFilter === "guides") {
        return !p.video_url && p.category !== "review" && p.category !== "animated" && p.category !== "animation";
      }
      return true;
    });
  }, [posts, search, categoryFilter]);

  const openAddSheet = () => {
    setSelectedPost(null);
    setForm(defaultForm);
    setPreviewUrl("");
    setAutoSlug(true);
    setIsSheetOpen(true);
  };

  const openEditSheet = (post: BlogPost) => {
    setSelectedPost(post);
    const img = post.featured_image || post.cover_image || post.featured_image_url || "";
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category || (post.video_url ? "review" : "guide"),
      content: post.content,
      excerpt: post.excerpt || "",
      meta_title: post.meta_title || post.title || "",
      meta_description: post.meta_description || post.excerpt || "",
      tags: post.tags || "",
      is_published: post.is_published !== undefined ? post.is_published : post.status !== "draft",
      image_url: img.startsWith("data:") ? "" : img,
      video_url: post.video_url || "",
      farmer_name: post.farmer_name || "",
      location: post.location || "",
      crop: post.crop || "",
      product_name: post.product_name || "",
      author: post.author || "Chitra Crop Science",
    });
    setPreviewUrl(img);
    setAutoSlug(false);
    setIsSheetOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
      meta_title: prev.meta_title ? prev.meta_title : val,
    }));
  };

  const handleFieldChange = (key: keyof typeof defaultForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Convert uploaded image to Base64 data URL so it permanently survives page refresh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.warning("Large image file (>2MB). Consider using an image URL or optimizing the file.");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      setForm((prev) => ({ ...prev, image_url: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (val: string) => {
    setForm((prev) => ({ ...prev, image_url: val }));
    setPreviewUrl(val);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter an article title");
      return;
    }
    const finalSlug = slugify(form.slug || form.title);
    if (!finalSlug) {
      toast.error("Invalid slug");
      return;
    }

    setSaving(true);
    try {
      const finalImage = previewUrl || form.image_url || "/assets/media/field1.jpeg";
      const finalExcerpt = form.excerpt.trim() || form.content.substring(0, 180);
      const now = new Date().toISOString();

      let updatedPosts: BlogPost[];

      if (selectedPost) {
        updatedPosts = posts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                title: form.title.trim(),
                slug: finalSlug,
                category: form.category || (form.video_url ? "review" : "guide"),
                content: form.content,
                excerpt: finalExcerpt,
                meta_title: form.meta_title || form.title.trim(),
                meta_description: form.meta_description || finalExcerpt,
                tags: form.tags,
                is_published: form.is_published,
                status: form.is_published ? "published" : "draft",
                featured_image: finalImage,
                featured_image_url: finalImage,
                cover_image: finalImage,
                video_url: form.video_url.trim() || null,
                farmer_name: form.farmer_name.trim() || null,
                location: form.location.trim() || null,
                crop: form.crop.trim() || null,
                product_name: form.product_name.trim() || null,
                author: form.author.trim() || "Chitra Crop Science",
                updated_at: now,
              }
            : post
        );
        toast.success("Post updated successfully");
      } else {
        const numericIds = posts
          .map((p) => (typeof p.id === "number" ? p.id : parseInt(String(p.id).replace(/\D/g, ""), 10)))
          .filter((n) => !isNaN(n));
        const newId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : posts.length + 1;

        const newPost: BlogPost = {
          id: newId,
          title: form.title.trim(),
          slug: finalSlug,
          category: form.category || (form.video_url ? "review" : "guide"),
          content: form.content,
          excerpt: finalExcerpt,
          meta_title: form.meta_title || form.title.trim(),
          meta_description: form.meta_description || finalExcerpt,
          tags: form.tags,
          is_published: form.is_published,
          status: form.is_published ? "published" : "draft",
          featured_image: finalImage,
          featured_image_url: finalImage,
          cover_image: finalImage,
          video_url: form.video_url.trim() || null,
          farmer_name: form.farmer_name.trim() || null,
          location: form.location.trim() || null,
          crop: form.crop.trim() || null,
          product_name: form.product_name.trim() || null,
          author: form.author.trim() || "Chitra Crop Science",
          created_at: now,
          published_at: form.is_published ? now : undefined,
          published_date: form.is_published ? now : undefined,
        };

        updatedPosts = [newPost, ...posts];
        toast.success("Post created and published successfully");
      }

      saveBlogPosts(updatedPosts);
      setPosts(updatedPosts);
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
      setIsSheetOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const updatedPosts = posts.filter((post) => post.id !== id);
      saveBlogPosts(updatedPosts);
      setPosts(updatedPosts);
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const updatedStatus = !post.is_published;
    const updatedPosts = posts.map((p) =>
      p.id === post.id
        ? {
            ...p,
            is_published: updatedStatus,
            status: updatedStatus ? "published" : "draft",
            published_at: updatedStatus ? (p.published_at || new Date().toISOString()) : p.published_at,
          }
        : p
    );
    saveBlogPosts(updatedPosts);
    setPosts(updatedPosts);
    queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    toast.success(`Post marked as ${updatedStatus ? "Published" : "Draft"}`);
  };

  return (
    <section>
      <AdminPageHeader
        title="Blog & Articles"
        description="Manage your agricultural insights, research guides, and farmer video reviews."
        actionText="Write Post"
        actionIcon={<Plus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tag, slug, crop..."
              className="pl-9 bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option value="all">All Categories ({posts.length})</option>
              <option value="guides">Agronomy Guides</option>
              <option value="reviews">Farmer Video Reviews</option>
              <option value="animated">Animated Videos</option>
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Article Title & Details</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Loading posts...
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    <p className="text-base font-medium">No blog posts found</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Write Post" to publish an article.</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const isVideo = Boolean(post.video_url) || post.category === "review";
                  return (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 line-clamp-1">{post.title}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <code className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-emerald-800">
                            /blog/{post.slug}
                          </code>
                          {post.product_name && (
                            <span className="text-slate-600 font-medium">• {post.product_name}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post.category === "animated" || post.category === "animation" ? (
                          <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200 text-xs">
                            <Sparkles className="w-3 h-3 mr-1 text-purple-600" /> Animated Video
                          </Badge>
                        ) : isVideo ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            <Video className="w-3 h-3 mr-1" /> Video Review
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-xs">
                            <BookOpen className="w-3 h-3 mr-1" /> Agronomy Guide
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          title="Click to toggle status"
                          className="cursor-pointer"
                        >
                          <Badge variant={post.is_published ? "secondary" : "outline"} className={post.is_published ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "text-amber-700 bg-amber-50 border-amber-200"}>
                            {post.is_published ? "Published" : "Draft"}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-[150px] truncate">
                        {post.tags || "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                        {new Date(post.published_date || post.published_at || post.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        {post.is_published && (
                          <Button size="sm" variant="ghost" asChild className="text-emerald-700 hover:bg-emerald-50">
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" /> View
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => openEditSheet(post)}>
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Write / Edit Post Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{selectedPost ? "Update Post" : "Write New Article"}</SheetTitle>
            <SheetDescription>
              Create or edit blog articles and farmer field reviews. Published posts are displayed immediately on /blog.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="font-semibold text-slate-800">
                  Post Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. CCS-CARB ULTRA: The Importance of Organic Carbon..."
                  required
                  className="mt-1 font-medium"
                />
              </div>

              <div>
                <Label htmlFor="slug" className="font-semibold text-slate-800">
                  URL Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    handleFieldChange("slug", e.target.value);
                  }}
                  placeholder="e.g. ccs-carb-ultra-organic-carbon-soil-health"
                  required
                  className="mt-1"
                />
                <p className="text-[11px] text-slate-500 mt-1">Live URL: /blog/{form.slug || "slug"}</p>
              </div>

              <div>
                <Label htmlFor="category" className="font-semibold text-slate-800">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                >
                  <option value="guide">Agronomy Guide (Default)</option>
                  <option value="animated">Animated Video</option>
                  <option value="review">Farmer Video Review</option>
                </select>
              </div>

              <div>
                <Label htmlFor="is_published" className="font-semibold text-slate-800">Publishing Status</Label>
                <select
                  id="is_published"
                  value={form.is_published ? "true" : "false"}
                  onChange={(e) => handleFieldChange("is_published", e.target.value === "true")}
                  className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 font-medium"
                >
                  <option value="true">Published (Visible on Website)</option>
                  <option value="false">Draft (Hidden from Public)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="tags" className="font-semibold text-slate-800">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => handleFieldChange("tags", e.target.value)}
                  placeholder="Organic Carbon, Soil Health, CCS-CARB"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt" className="font-semibold text-slate-800">Excerpt / Short Summary</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => handleFieldChange("excerpt", e.target.value)}
                placeholder="Brief 1-2 sentence overview shown in blog cards..."
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content" className="font-semibold text-slate-800">
                Article Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => handleFieldChange("content", e.target.value)}
                rows={9}
                placeholder="Write full article body with paragraphs, headers, and bullet points..."
                required
                className="mt-1 font-mono text-sm"
              />
            </div>

            {/* Optional Farmer Review Metadata */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-slate-900 text-sm">Farmer Review & Product Details (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product_name">Featured Product</Label>
                  <Input
                    id="product_name"
                    value={form.product_name}
                    onChange={(e) => handleFieldChange("product_name", e.target.value)}
                    placeholder="e.g. CCS-CARB ULTRA"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="crop">Target Crop</Label>
                  <Input
                    id="crop"
                    value={form.crop}
                    onChange={(e) => handleFieldChange("crop", e.target.value)}
                    placeholder="e.g. Groundnut, Pomegranate, Cotton"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="farmer_name">Farmer / Author Name</Label>
                  <Input
                    id="farmer_name"
                    value={form.farmer_name}
                    onChange={(e) => handleFieldChange("farmer_name", e.target.value)}
                    placeholder="e.g. Subhash Ji / Chitra Agronomy Team"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                    placeholder="e.g. Meghava, Rajasthan"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="video_url">Video URL (For Video Reviews)</Label>
                  <Input
                    id="video_url"
                    value={form.video_url}
                    onChange={(e) => handleFieldChange("video_url", e.target.value)}
                    placeholder="e.g. /assets/media/review-ccs-303-bagoda.mp4"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* SEO & Media */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-slate-900 text-sm">SEO Metadata & Featured Image</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="meta_title">SEO Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={form.meta_title}
                    onChange={(e) => handleFieldChange("meta_title", e.target.value)}
                    placeholder="Title for search engines..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">SEO Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={form.meta_description}
                    onChange={(e) => handleFieldChange("meta_description", e.target.value)}
                    rows={2}
                    placeholder="Brief description for search engines and social shares..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Featured Image URL or Upload</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    id="image_url"
                    value={form.image_url}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="Image URL, e.g. /assets/media/field1.jpeg"
                    className="bg-white"
                  />
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Upload className="h-5 w-5 text-emerald-600" />
                  <label className="cursor-pointer text-sm text-slate-700">
                    <span className="font-semibold text-emerald-700 hover:underline">Upload image file</span>
                    <span className="text-slate-500 text-xs ml-2">(Auto-saved permanently)</span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {previewUrl && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm w-full h-44 relative">
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setForm((prev) => ({ ...prev, image_url: "" }));
                      }}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 text-xs hover:bg-black/80"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t pb-8">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-semibold" disabled={saving}>
                {saving ? "Saving..." : selectedPost ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
