import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft, MapPin, CheckCircle2, Star, Video, Play, Phone, ShieldCheck, Sparkles, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SeoSchema } from "@/components/SeoSchema";
import { useBlogPosts } from "@/hooks/usePublicData";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: posts = [], isLoading } = useBlogPosts();
  const post = useMemo(
    () => posts.find((item) => item.slug === slug) ?? null,
    [posts, slug],
  );

  const siteUrl = "https://chitracropscience.in";
  const postUrl = `${siteUrl}/blog/${slug}`;

  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content?.substring(0, 200),
    "image": post.cover_image ? `${siteUrl}${post.cover_image}` : `${siteUrl}/logo.png`,
    "datePublished": post.published_date || post.published_at || post.created_at,
    "dateModified": post.published_date || post.published_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.farmer_name || post.author || "Chitra Crop Science"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chitra Crop Science",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    }
  } : null;

  const videoSchema = post?.video_url ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": post.title,
    "description": post.excerpt || post.title,
    "thumbnailUrl": [post.cover_image ? `${siteUrl}${post.cover_image}` : `${siteUrl}/logo.png`],
    "uploadDate": post.published_date || post.published_at || new Date().toISOString(),
    "contentUrl": `${siteUrl}${post.video_url}`,
    "embedUrl": postUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Chitra Crop Science",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  } : null;

  const breadcrumbSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog & Reviews",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  } : null;

  if (isLoading) {
    return (
      <div className="container py-24 text-center text-slate-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700 mx-auto mb-4"></div>
        <p>Loading field review & case study...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-24 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 mb-6">The article or review you are looking for is no longer available.</p>
        <Button asChild className="bg-emerald-700 hover:bg-emerald-800 rounded-full px-6">
          <Link to="/blog">Back to All Articles</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {articleSchema && <SeoSchema type="WebPage" data={articleSchema} />}
      {videoSchema && <SeoSchema type="ItemList" data={videoSchema} />}
      {breadcrumbSchema && <SeoSchema type="BreadcrumbList" data={breadcrumbSchema} />}
      <article className="container max-w-4xl py-12 md:py-16">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-8 text-emerald-800 hover:bg-emerald-50 rounded-full">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles & reviews
        </Link>
      </Button>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.video_url && (
            <Badge className="bg-red-600 text-white font-bold uppercase tracking-wider text-xs">
              <Video className="w-3.5 h-3.5 mr-1" /> Verified Video Review
            </Badge>
          )}
          {post.location && (
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-900 border border-emerald-200">
              <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              {post.location}
            </Badge>
          )}
          {post.crop && (
            <Badge variant="outline" className="border-emerald-300 text-emerald-800 bg-emerald-50/40">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              {post.crop}
            </Badge>
          )}
          {post.product_name && (
            <Badge variant="outline" className="border-amber-300 text-amber-900 bg-amber-50">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-600" />
              {post.product_name}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600 border-b border-slate-200 pb-6">
          <span className="flex items-center gap-1.5 font-medium text-emerald-800">
            <User className="w-4 h-4" />
            {post.farmer_name || post.author || "Chitra Crop Science"}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {new Date(post.published_date || post.published_at || post.created_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.rating && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-4 h-4 fill-current text-amber-400" /> 5.0 Farmer Rating
              </span>
            </>
          )}
        </div>
      </div>

      {/* Video Player Section if Video Exists */}
      {post.video_url ? (
        <div className="mb-12 overflow-hidden rounded-3xl bg-slate-950 p-4 sm:p-6 shadow-2xl border border-slate-800">
          <div className="mb-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Official Farmer Field Video
              </span>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Chitra Crop Science Field Network</span>
          </div>
          
          <div className="relative aspect-[9/16] max-h-[70vh] w-full mx-auto overflow-hidden rounded-2xl bg-black shadow-inner">
            <video
              src={post.video_url}
              poster={post.cover_image || post.featured_image_url || undefined}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            Recorded on-site with verified farmers. Tap play to listen to real crop results and experience.
          </p>
        </div>
      ) : post.cover_image || post.featured_image_url ? (
        <div className="mb-10 overflow-hidden rounded-3xl shadow-xl">
          <img
            src={post.cover_image || post.featured_image_url || ""}
            alt={post.title}
            loading="lazy"
            className="aspect-video w-full object-cover"
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("display", "none");
            }}
          />
        </div>
      ) : null}

      {/* Farmer & Product Quick Info Card */}
      {post.product_name && (
        <div className="mb-10 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Product Featured in This Field Review</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{post.product_name}</h3>
            {post.crop && <p className="text-sm text-slate-600 mt-0.5">Recommended for {post.crop} & high-value cash crops.</p>}
          </div>
          <div className="flex gap-2.5">
            <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-semibold">
              <Link to="/products">View Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-emerald-400 text-emerald-800 hover:bg-emerald-100 rounded-full font-semibold">
              <Link to="/contact">Enquire</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="prose prose-slate lg:prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
        <div className="whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-14 rounded-3xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-8 md:p-12 text-center shadow-xl">
        <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Want Similar High-Yield Results on Your Farm?
        </h3>
        <p className="text-emerald-100 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          Get in touch with our certified agronomists for customized dosage recommendations, crop protection schedules, and dealer locations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-lg">
            <Link to="/contact">
              <Phone className="w-4 h-4 mr-2" /> Contact Agronomy Team
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full">
            <Link to="/products">Browse All Solutions</Link>
          </Button>
        </div>
      </div>
    </article>
    </>
  );
};

export default BlogDetail;
