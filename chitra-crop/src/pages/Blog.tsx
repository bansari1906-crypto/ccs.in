import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Play, MapPin, Sparkles, CheckCircle2, Video, BookOpen, AlertCircle, RefreshCw, Film } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBlogPosts } from "@/hooks/usePublicData";
import { SeoSchema } from "@/components/SeoSchema";

const Blog = () => {
  const { data: posts = [], isLoading, isError, refetch } = useBlogPosts();
  const [filter, setFilter] = useState<"all" | "reviews" | "animated" | "guides">("all");
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; farmer?: string } | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    document.title = "Farmer Reviews & Agronomy Blog | Chitra Crop Science";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Read research-backed agronomy guides, watch verified farmer video testimonials, and view 3D animated agricultural explainers from Chitra Crop Science."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://chitracropscience.in/blog");
  }, []);

  const animatedCount = posts.filter((p) => p.category === "animated" || p.category === "animation").length;
  const reviewCount = posts.filter((p) => (Boolean(p.video_url) || p.category === "review") && p.category !== "animated" && p.category !== "animation").length;
  const guideCount = posts.filter((p) => !p.video_url && p.category !== "review" && p.category !== "animated" && p.category !== "animation").length;

  const filteredPosts = posts.filter((p) => {
    const isAnimated = p.category === "animated" || p.category === "animation";
    const isReview = (Boolean(p.video_url) || p.category === "review") && !isAnimated;

    if (filter === "animated") return isAnimated;
    if (filter === "reviews") return isReview;
    if (filter === "guides") return !isReview && !isAnimated;
    return true; // All Articles shows everything!
  });

  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Farmer Reviews & Agronomy Blog - Chitra Crop Science",
    "description": "Field trials, farmer video reviews, 3D animated explainers, and crop protection agronomy guides.",
    "url": "https://chitracropscience.in/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredPosts.slice(0, 10).map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://chitracropscience.in/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };

  return (
    <>
      <SeoSchema type="CollectionPage" data={blogListingSchema} />
      <section className="container py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            Field Trials, Animations & Farmer Proof
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight">
            Farmer Reviews & Agronomy Blog
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Watch real video testimonials from progressive farmers across Rajasthan and Gujarat, explore 3D animated agricultural explainers, and read research-backed crop protection guides.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
                filter === "all"
                  ? "bg-emerald-700 text-white shadow-emerald-700/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              All Articles ({posts.length})
            </button>
            <button
              onClick={() => setFilter("reviews")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
                filter === "reviews"
                  ? "bg-emerald-700 text-white shadow-emerald-700/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Video className="w-4 h-4 text-red-500" />
              Farmer Video Reviews ({reviewCount})
            </button>
            <button
              onClick={() => setFilter("animated")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
                filter === "animated"
                  ? "bg-purple-700 text-white shadow-purple-700/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Film className="w-4 h-4 text-purple-600" />
              Animated Videos ({animatedCount})
            </button>
            <button
              onClick={() => setFilter("guides")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
                filter === "guides"
                  ? "bg-emerald-700 text-white shadow-emerald-700/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Agronomy Guides ({guideCount})
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="rounded-3xl border border-dashed border-emerald-200 p-16 text-center text-slate-600 bg-emerald-50/40 max-w-2xl mx-auto">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-slate-800">Loading farmer reviews & case studies...</p>
            <p className="text-sm text-slate-500 mt-1">Fetching the latest research and field demonstrations</p>
          </div>
        ) : isError ? (
          /* Error State */
          <div className="rounded-3xl border border-rose-200 p-12 text-center text-slate-700 bg-rose-50/50 max-w-xl mx-auto shadow-sm">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-900 mb-1">Could Not Load Articles</h3>
            <p className="text-sm text-slate-600 mb-6">There was an issue fetching the latest posts. Please try again.</p>
            <Button
              onClick={() => refetch()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-6 font-semibold"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center text-slate-600 max-w-xl mx-auto bg-slate-50/50">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-800 mb-1">No articles found in this section</h3>
            <p className="text-sm text-slate-500 mb-6">There are currently no articles under this filter.</p>
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
              className="rounded-full border-slate-300 hover:bg-white"
            >
              View All Articles ({posts.length})
            </Button>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {filteredPosts.map((post) => {
              const isCarbUltra = (post.title || "").toUpperCase().includes("CCS-CARB ULTRA") || (post.title || "").toUpperCase().includes("ORGANIC CARBON");
              const rawImg = post.featured_image || post.cover_image || post.featured_image_url;
              const fallbackImg = isCarbUltra
                ? "/assets/media/ccs-carb-ultra.png"
                : (post.title || "").toUpperCase().includes("POTASH")
                ? "/assets/media/poster-ccs-potash-animation.jpg"
                : "/assets/media/field1.jpeg";

              const imageSrc = !brokenImages[post.id]
                ? (rawImg && rawImg.trim() && !rawImg.includes("null") && !rawImg.includes("undefined") ? rawImg : fallbackImg)
                : fallbackImg;

              const postVideoUrl = post.video_url || (isCarbUltra ? "/assets/media/anim-ccs-carb.mp4" : undefined);
              const isVideo = Boolean(postVideoUrl);
              const isAnimated = post.category === "animated" || post.category === "animation" || isCarbUltra;
              const postSlug = post.slug || (isCarbUltra ? "ccs-carb-ultra-organic-carbon-soil-health" : `article-${post.id}`);

              return (
                <Card
                  key={post.id}
                  className="group overflow-hidden h-full border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 rounded-3xl bg-white flex flex-col justify-between"
                >
                  <div>
                    {/* Media Image / Video Poster */}
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        src={imageSrc}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={() => {
                          setBrokenImages((prev) => ({ ...prev, [post.id]: true }));
                        }}
                      />

                      {/* Category Badge Overlay on Media */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        {isAnimated ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-700 text-white shadow-lg">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            Animated Video
                          </span>
                        ) : isVideo ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg">
                            <Video className="w-3.5 h-3.5" />
                            Video Review
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-lg">
                            <BookOpen className="w-3.5 h-3.5" />
                            Agronomy Guide
                          </span>
                        )}

                        {post.product_name && (
                          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-emerald-300 backdrop-blur-md border border-white/20">
                            {post.product_name.split("(")[0].trim()}
                          </span>
                        )}
                      </div>

                      {/* Play Button Overlay for Video Posts */}
                      {isVideo && postVideoUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveVideo({
                              url: postVideoUrl,
                              title: post.title,
                              farmer: post.farmer_name || undefined,
                            });
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/40 transition-colors group/btn"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl transition transform group-hover/btn:scale-110">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </div>
                        </button>
                      )}
                    </div>

                    <CardContent className="p-6 md:p-8">
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {isAnimated ? (
                          <Badge variant="secondary" className="bg-purple-50 text-purple-900 border border-purple-200">
                            <Sparkles className="w-3 h-3 mr-1 text-purple-600" />
                            3D Animation
                          </Badge>
                        ) : null}

                        {post.location && (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200">
                            <MapPin className="w-3 h-3 mr-1 text-emerald-600" />
                            {post.location}
                          </Badge>
                        )}
                        {post.crop && (
                          <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50/50">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                            {post.crop}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-slate-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.published_date || post.published_at || post.created_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        <Link to={`/blog/${postSlug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Farmer / Presenter / Author */}
                      {post.farmer_name && (
                        <p className="text-xs font-semibold text-emerald-800 mb-2">
                          Presenter: <span className="text-slate-700 font-normal">{post.farmer_name}</span>
                        </p>
                      )}

                      {/* Excerpt */}
                      <p className="text-slate-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
                        {post.excerpt || post.summary || post.content?.substring(0, 180)}
                      </p>

                      {/* Tags chips */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </div>

                  <CardFooter className="p-6 md:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                    <Button asChild variant="ghost" className="pl-0 text-emerald-700 hover:text-emerald-800 hover:bg-transparent font-semibold">
                      <Link to={`/blog/${postSlug}`}>
                        {isAnimated ? "Watch Animation & Read Guide →" : isVideo ? "Watch Video & Read Report →" : "Read Full Article →"}
                      </Link>
                    </Button>

                    {isVideo && postVideoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setActiveVideo({
                            url: postVideoUrl,
                            title: post.title,
                            farmer: post.farmer_name || undefined,
                          })
                        }
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-full text-xs font-semibold"
                      >
                        <Play className="w-3 h-3 mr-1 fill-current" />
                        Quick Play
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Video Modal Player */}
        {activeVideo && (
          <Dialog open={Boolean(activeVideo)} onOpenChange={(open) => !open && setActiveVideo(null)}>
            <DialogContent className="max-w-2xl p-4 bg-slate-950 border border-slate-800 text-white rounded-3xl shadow-2xl">
              <div className="mb-3">
                <h4 className="text-lg font-serif font-bold text-white line-clamp-1">{activeVideo.title}</h4>
                {activeVideo.farmer && <p className="text-xs text-emerald-400 mt-0.5">{activeVideo.farmer}</p>}
              </div>
              <div className="relative aspect-[9/16] max-h-[75vh] w-full mx-auto overflow-hidden rounded-2xl bg-black shadow-inner">
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </section>
    </>
  );
};

export default Blog;
