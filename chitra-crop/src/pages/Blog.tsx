import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Play, MapPin, Sparkles, CheckCircle2, Star, Video, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useBlogPosts } from "@/hooks/usePublicData";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [filter, setFilter] = useState<"all" | "reviews" | "guides">("all");
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; farmer?: string } | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string | number, boolean>>({});

  const filteredPosts = posts.filter((p) => {
    if (filter === "reviews") return Boolean(p.video_url);
    if (filter === "guides") return !p.video_url;
    return true;
  });

  const reviewCount = posts.filter((p) => p.video_url).length;

  return (
    <section className="container py-12 md:py-20 max-w-7xl mx-auto">
      {/* Header & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          Field Trials & Farmer Proof
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight">
          Farmer Reviews & Agronomy Blog
        </h1>
        <p className="mt-4 text-slate-600 text-lg leading-relaxed">
          Watch real video testimonials from progressive farmers across Rajasthan and Gujarat, and read research-backed crop protection guides.
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
            onClick={() => setFilter("guides")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
              filter === "guides"
                ? "bg-emerald-700 text-white shadow-emerald-700/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Agronomy Guides
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 p-20 text-center text-slate-500 bg-emerald-50/30">
          <p className="text-lg font-medium">Loading farmer reviews & case studies...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 p-20 text-center text-slate-500">
          No articles found for this filter.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden h-full border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 rounded-3xl bg-white flex flex-col justify-between"
            >
              <div>
                {/* Media Image / Video Poster */}
                {!brokenImages[post.id] && (post.featured_image_url || post.cover_image || post.video_url) ? (
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={post.featured_image_url || post.cover_image || "/assets/media/field1.jpeg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={() => {
                        setBrokenImages((prev) => ({ ...prev, [post.id]: true }));
                      }}
                    />
                    
                    {/* Video Badge Overlay */}
                    {post.video_url && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg">
                          <Video className="w-3.5 h-3.5" />
                          Video Review
                        </span>
                        {post.product_name && (
                          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-emerald-300 backdrop-blur-md border border-white/20">
                            {post.product_name.split("(")[0].trim()}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Play Button Overlay for Video Posts */}
                    {post.video_url && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveVideo({
                            url: post.video_url!,
                            title: post.title,
                            farmer: post.farmer_name || undefined
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
                ) : null}

                <CardContent className="p-6 md:p-8">
                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
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
                      {new Date(post.published_date || post.published_at || post.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Farmer / Author */}
                  {post.farmer_name && (
                    <p className="text-xs font-semibold text-emerald-800 mb-2">
                      Farmer: <span className="text-slate-700 font-normal">{post.farmer_name}</span>
                    </p>
                  )}

                  {/* Excerpt */}
                  <p className="text-slate-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
                    {post.excerpt || post.content?.substring(0, 180)}
                  </p>
                </CardContent>
              </div>

              <CardFooter className="p-6 md:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <Button asChild variant="ghost" className="pl-0 text-emerald-700 hover:text-emerald-800 hover:bg-transparent font-semibold">
                  <Link to={`/blog/${post.slug}`}>
                    {post.video_url ? "Watch Video & Read Report →" : "Read Full Article →"}
                  </Link>
                </Button>

                {post.video_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveVideo({
                      url: post.video_url!,
                      title: post.title,
                      farmer: post.farmer_name || undefined
                    })}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-full text-xs font-semibold"
                  >
                    <Play className="w-3 h-3 mr-1 fill-current" />
                    Quick Play
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
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
  );
};

export default Blog;
