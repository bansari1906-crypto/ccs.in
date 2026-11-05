import { Link, useParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { ArrowLeft, MapPin, CheckCircle2, Video, Phone, ShieldCheck, Sparkles, User, Calendar, Tag, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SeoSchema } from "@/components/SeoSchema";
import { useBlogPosts } from "@/hooks/usePublicData";

function renderFormattedContent(content: string) {
  if (!content) return null;

  // Split content by double newlines into blocks
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-6 text-slate-800 leading-relaxed text-base sm:text-lg">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Level 2 Heading
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }

        // Level 3 Heading
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 mt-6 mb-3">
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          );
        }

        // Level 4 Heading
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="font-sans text-lg font-bold text-slate-900 mt-4 mb-2">
              {trimmed.replace(/^####\s+/, "")}
            </h4>
          );
        }

        // Divider
        if (trimmed === "---") {
          return <hr key={idx} className="my-8 border-slate-200" />;
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          const quoteLines = trimmed.split("\n").map((line) => line.replace(/^>\s*/, "")).join(" ");
          return (
            <blockquote key={idx} className="border-l-4 border-emerald-600 bg-emerald-50/60 p-4 sm:p-6 rounded-r-2xl italic text-slate-800 my-6 shadow-sm">
              <p className="text-base sm:text-lg">{quoteLines.replace(/["*]/g, "")}</p>
            </blockquote>
          );
        }

        // Unordered list
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const listItems = trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-700 my-4">
              {listItems.map((item, itemIdx) => {
                const text = item.replace(/^[-*]\s+/, "");
                return <li key={itemIdx} className="pl-1">{formatInline(text)}</li>;
              })}
            </ul>
          );
        }

        // Ordered list
        if (/^\d+\.\s/.test(trimmed)) {
          const listItems = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={idx} className="list-decimal pl-6 space-y-2 text-slate-700 my-4">
              {listItems.map((item, itemIdx) => {
                const text = item.replace(/^\d+\.\s+/, "");
                return <li key={itemIdx} className="pl-1">{formatInline(text)}</li>;
              })}
            </ol>
          );
        }

        // Regular paragraph with inline formatting
        return (
          <p key={idx} className="text-slate-700 leading-relaxed">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function formatInline(text: string): React.ReactNode {
  // Simple bold and italic replacement
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="italic text-slate-800">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: posts = [], isLoading } = useBlogPosts();

  const post = useMemo(() => {
    if (!slug) return null;
    let decoded = slug;
    try {
      decoded = decodeURIComponent(slug);
    } catch {}
    const norm = decoded.toLowerCase().trim();
    const cleanNorm = norm.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return (
      posts.find((item) => {
        const itemSlug = (item.slug || "").toLowerCase().trim();
        const cleanItemSlug = itemSlug.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const itemTitle = (item.title || "").toLowerCase().trim();
        const itemTitleSlug = itemTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        // Direct slug match
        if (itemSlug === norm || cleanItemSlug === cleanNorm) return true;
        // Title slug match
        if (itemTitleSlug === cleanNorm) return true;
        // CCS-CARB ULTRA special matching
        if (cleanNorm.includes("ccs-carb-ultra") || cleanNorm.includes("organic-carbon")) {
          if (
            cleanItemSlug.includes("ccs-carb-ultra") ||
            itemTitle.includes("ccs-carb ultra") ||
            itemTitle.includes("ccs-carb-ultra") ||
            itemTitle.includes("organic carbon")
          ) {
            return true;
          }
        }
        // CCS POTASH special matching
        if (cleanNorm.includes("potash")) {
          if (cleanItemSlug.includes("potash") || itemTitle.includes("potash")) {
            return true;
          }
        }
        // Substring / prefix match
        if (cleanItemSlug.startsWith(cleanNorm) || cleanNorm.startsWith(cleanItemSlug)) return true;
        // ID match
        if (String(item.id).toLowerCase() === norm) return true;

        return false;
      }) ?? null
    );
  }, [posts, slug]);

  const siteUrl = "https://chitracropscience.in";
  const postUrl = `${siteUrl}/blog/${slug}`;

  const postImage = useMemo(() => {
    if (!post) return null;
    const raw = post.featured_image || post.cover_image || post.featured_image_url;
    if (raw && raw.trim() && !raw.includes("null") && !raw.includes("undefined")) {
      return raw;
    }
    const t = (post.title || "").toUpperCase();
    if (t.includes("CCS-CARB ULTRA") || t.includes("CARB ULTRA")) {
      return "/assets/media/ccs-carb-ultra.png";
    }
    if (t.includes("POTASH")) {
      return "/assets/media/poster-ccs-potash-animation.jpg";
    }
    return "/assets/media/field1.jpeg";
  }, [post]);

  const postVideo = useMemo(() => {
    if (!post) return null;
    if (post.video_url && post.video_url.trim()) return post.video_url;
    const t = (post.title || "").toUpperCase();
    if (t.includes("CCS-CARB ULTRA") || t.includes("CARB ULTRA")) {
      return "/assets/media/anim-ccs-carb.mp4";
    }
    return null;
  }, [post]);

  const postContent = useMemo(() => {
    if (!post) return "";
    if (post.content && post.content.trim().length > 100) {
      return post.content;
    }
    const t = (post.title || "").toUpperCase();
    if (t.includes("CCS-CARB ULTRA") || t.includes("ORGANIC CARBON")) {
      return (
        (post.content ? post.content + "\n\n---\n\n" : "") +
        `## The Foundation of Soil Fertility: Why Organic Carbon Matters

Soil organic carbon (SOC) is the fundamental backbone of soil health and agricultural productivity. Decades of intensive chemical cultivation, excessive tillage, and prolonged summer heat across regions like Rajasthan, Gujarat, Haryana, and Maharashtra have severely depleted soil carbon levels—often dropping below the critical threshold of 0.5%.

When organic carbon drops, soil loses its sponge-like ability to hold moisture. Beneficial fungi, mycorrhizae, and nitrogen-fixing bacteria diminish, fertilizer inputs get locked in insoluble salts, and plants suffer stunted root systems with poor yield.

---

### What is CCS-CARB ULTRA?

**CCS-CARB ULTRA** is Chitra Crop Science's cutting-edge bio-stimulant and organic soil conditioner. Formulated with high-grade organic carbon, humic substances, fulvic fractions, and bioactive plant metabolites, CCS-CARB ULTRA restores the biological life force of agricultural land.

#### Key Functions of CCS-CARB ULTRA:
1. **Accelerates Microbial Proliferation:** Provides an immediate, metabolically available carbon source for beneficial soil bacteria, Trichoderma, and mycorrhizal networks.
2. **Improves Cation Exchange Capacity (CEC):** Chelation of vital micronutrients (Zinc, Iron, Boron, Copper) and macronutrients (Phosphorus, Potassium), preventing nutrient lockout.
3. **Enhances Water Retention:** Transforms compacted, sandy, or saline soils into fertile, crumbly loam that retains moisture 30-40% longer between irrigations.
4. **Stimulates Vigorous Root Architecture:** Triggers primary and secondary root elongation, enabling deeper moisture penetration and heavy nutrient absorption.

---

### Field Results & Agronomic Benefits

- **Groundnut & Pulses:** Dramatically increases root nodulation and nitrogen-fixing colonies, leading to uniform pod filling.
- **Pomegranate, Citrus & Orchards:** Prevents fruit drop, improves fruit brix and color intensity by ensuring balanced micronutrient uptake.
- **Cumin (Jeera) & Spices:** Strengthens root crowns against soil-borne damping-off and root wilt diseases.
- **Cotton & Wheat:** Promotes rapid early vegetative vigor, thicker stalks, and higher boll/grain density.

---

### Recommended Application & Dosage

- **Drip Irrigation / Fertigation:** 1.0 to 2.0 Liters per acre dissolved in water tank. Repeat every 25–30 days during active vegetative and fruit-development phases.
- **Soil Drenching:** 2.5 ml to 3.0 ml per liter of clean water around the root root-zone canopy.
- **Broadcasting with Fertilizer:** Mix 1–2 Liters of CCS-CARB ULTRA with well-rotted farmyard manure (FYM) or compost per acre at sowing or first top dressing.`
      );
    }
    return post.content || post.excerpt || "";
  }, [post]);

  // Manage SEO document title, meta tags, and canonical URL
  useEffect(() => {
    if (!post) return;

    const pageTitle = `${post.meta_title || post.title} | Chitra Crop Science`;
    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    const descriptionText = post.meta_description || post.excerpt || post.content?.substring(0, 160) || "";
    metaDesc.setAttribute("content", descriptionText);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", postUrl);
  }, [post, postUrl]);

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.meta_description || post.excerpt || post.content?.substring(0, 200),
        "image": postImage ? (postImage.startsWith("http") ? postImage : `${siteUrl}${postImage}`) : `${siteUrl}/assets/media/field1.jpeg`,
        "datePublished": post.published_date || post.published_at || post.created_at,
        "dateModified": post.published_date || post.published_at || post.created_at,
        "keywords": post.tags || undefined,
        "author": {
          "@type": "Person",
          "name": post.farmer_name || post.author || "Chitra Crop Science",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Chitra Crop Science",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/logo.png`,
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": postUrl,
        },
      }
    : null;

  const videoSchema = postVideo
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": post.title,
        "description": post.meta_description || post.excerpt || post.title,
        "thumbnailUrl": [postImage ? (postImage.startsWith("http") ? postImage : `${siteUrl}${postImage}`) : `${siteUrl}/assets/media/field1.jpeg`],
        "uploadDate": post.published_date || post.published_at || new Date().toISOString(),
        "contentUrl": postVideo.startsWith("http") ? postVideo : `${siteUrl}${postVideo}`,
        "embedUrl": postUrl,
        "publisher": {
          "@type": "Organization",
          "name": "Chitra Crop Science",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/logo.png`,
          },
        },
      }
    : null;

  const breadcrumbSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Farmer Reviews & Blog",
            "item": `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": postUrl,
          },
        ],
      }
    : null;

  if (isLoading) {
    return (
      <div className="container py-24 text-center text-slate-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-slate-700">Loading agronomy article & field review...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-24 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 mb-6">
          The requested article or review is either currently in draft status or has been moved.
        </p>
        <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-6">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Articles
          </Link>
        </Button>
      </div>
    );
  }

  const tagsList = Array.isArray(post.tags)
    ? (post.tags as string[]).map((t) => String(t).trim().replace(/^#+/, "")).filter(Boolean)
    : typeof post.tags === "string"
    ? post.tags
        .split(",")
        .map((t) => t.trim().replace(/^#+/, ""))
        .filter(Boolean)
    : [];

  return (
    <>
      {articleSchema && <SeoSchema type="WebPage" data={articleSchema} />}
      {videoSchema && <SeoSchema type="ItemList" data={videoSchema} />}
      {breadcrumbSchema && <SeoSchema type="BreadcrumbList" data={breadcrumbSchema} />}

      <article className="container max-w-4xl py-12 md:py-16 px-4 sm:px-6">
        {/* Back navigation */}
        <Button asChild variant="ghost" size="sm" className="mb-8 text-emerald-800 hover:bg-emerald-50 rounded-full">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Articles & Reviews
          </Link>
        </Button>

        {/* Header Badges */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.category === "animated" || post.category === "animation" ? (
              <Badge className="bg-purple-700 text-white font-bold uppercase tracking-wider text-xs shadow-sm">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" /> Official 3D Animation
              </Badge>
            ) : post.video_url ? (
              <Badge className="bg-red-600 text-white font-bold uppercase tracking-wider text-xs">
                <Video className="w-3.5 h-3.5 mr-1" /> Verified Video Review
              </Badge>
            ) : (
              <Badge className="bg-emerald-700 text-white font-semibold text-xs">
                <BookOpen className="w-3.5 h-3.5 mr-1" /> Agronomy Guide
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

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* Author, Date & Tag Metadata */}
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
          </div>
        </div>

        {/* Video Player Section if Video Exists */}
        {postVideo ? (
          <div className="mb-12 overflow-hidden rounded-3xl bg-slate-950 p-4 sm:p-6 shadow-2xl border border-slate-800">
            <div className="mb-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {post.category === "animated" || post.category === "animation" || postVideo.includes("anim-") ? "Official 3D Animated Video" : "Official Farmer Field Video"}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-medium">
                {post.category === "animated" || post.category === "animation" || postVideo.includes("anim-") ? "Chitra Crop Science Animation Studio" : "Chitra Crop Science Field Network"}
              </span>
            </div>

            <div className="relative aspect-[9/16] max-h-[70vh] w-full mx-auto overflow-hidden rounded-2xl bg-black shadow-inner">
              <video
                src={postVideo}
                poster={postImage || undefined}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">
              {post.category === "animated" || post.category === "animation" || postVideo.includes("anim-")
                ? "3D animation created by Chitra Crop Science. Tap play to watch the complete video."
                : "Recorded on-site with verified farmers. Tap play to listen to real crop results and experience."}
            </p>
          </div>
        ) : postImage ? (
          /* Featured Image */
          <div className="mb-10 overflow-hidden rounded-3xl shadow-xl max-h-[500px]">
            <img
              src={postImage}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover max-h-[480px]"
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("display", "none");
              }}
            />
          </div>
        ) : null}

        {/* Farmer & Product Quick Info Card */}
        {post.product_name && (
          <div className="mb-10 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Product Featured in This Guide
              </span>
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
        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-700 leading-relaxed mb-10">
          {renderFormattedContent(postContent)}
        </div>

        {/* Article Tags Section */}
        {tagsList.length > 0 && (
          <div className="border-t border-slate-200 pt-6 mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Related Topic Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm"
                >
                  #{tag.replace(/^#+/, "")}
                </span>
              ))}
            </div>
          </div>
        )}

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
