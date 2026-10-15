import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Building2, Video, Users, Sprout, LayoutGrid } from "lucide-react";

// Media item definition
interface MediaItem {
  id: string;
  category: "office" | "reviews" | "fields" | "products";
  type: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
}

// Curated media collection with new Corporate Headquarters imagery
const localMedia: MediaItem[] = [
  // ── Corporate Headquarters (Titanium Square, Thaltej, Ahmedabad) ─────────
  { 
    id: "office-hq", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-headquarters-main.jpeg", 
    caption: "Corporate Headquarters - Titanium Square, Thaltej, Ahmedabad" 
  },
  { 
    id: "office-reception", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-reception.jpeg", 
    caption: "Corporate Reception & Client Welcome Desk" 
  },
  { 
    id: "office-boardroom", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-boardroom.jpeg", 
    caption: "Executive Boardroom & Strategic Conference Suite" 
  },
  { 
    id: "office-cabin", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-cabin.jpeg", 
    caption: "Founder & Director Executive Cabin" 
  },
  { 
    id: "office-workspace", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-workspace.jpeg", 
    caption: "Modern Operations Floor & Agronomy Support Workstations" 
  },
  { 
    id: "office-lounge", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-lounge.jpeg", 
    caption: "Executive Lounge & Visitor Discussion Area" 
  },
  { 
    id: "office-exec", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-executive-suite.jpeg", 
    caption: "Executive Leadership Office" 
  },
  { 
    id: "office-entrance", 
    category: "office", 
    type: "image", 
    src: "/assets/media/office/office-entrance.jpeg", 
    caption: "Corporate Headquarters Welcome Entrance" 
  },

  // ── Farmer Reviews & Testimonials ──────────────────────────────────────
  { 
    id: "review-ccs-303", 
    category: "reviews", 
    type: "video", 
    src: "/assets/media/review-ccs-303-bagoda.mp4", 
    poster: "/assets/media/poster-ccs-303-reel.jpg", 
    caption: "CCS-303 Pomegranate Orchard Review (Bagoda, Rajasthan)" 
  },
  { 
    id: "review-chenaramji", 
    category: "reviews", 
    type: "video", 
    src: "/assets/media/review-chenaramji-honeybee.mp4", 
    poster: "/assets/media/poster-chenaramji.jpg", 
    caption: "Chenaram Ji Review: Welcome Honey Bee & CCS-303" 
  },
  { 
    id: "review-subhashji", 
    category: "reviews", 
    type: "video", 
    src: "/assets/media/review-subhashji-groundnut.mp4", 
    poster: "/assets/media/poster-subhashji.jpg", 
    caption: "Subhash Ji (Meghava) Groundnut Bumper Crop Review: CCS-CARB ULTRA" 
  },
  { 
    id: "review-karmiramji", 
    category: "reviews", 
    type: "video", 
    src: "/assets/media/review-karmiramji-pomegranate.mp4", 
    poster: "/assets/media/poster-karmiramji.jpg", 
    caption: "Karmiram Ji (Gudamalani) Review: Flower Plus & CCS-303 in Pomegranate" 
  },

  // ── Field Visits & Farmer Gatherings ──────────────────────────────────
  { id: "2026-02-06-1", category: "fields", type: "image", src: "/assets/media/2026-02-06 (1).jpg", caption: "Field Demonstration & Crop Health Inspection" },
  { id: "2026-02-06-2", category: "fields", type: "image", src: "/assets/media/2026-02-06 (2).jpg", caption: "Farmer Training & Yield Optimization Workshop" },
  { id: "2026-02-06-3", category: "fields", type: "image", src: "/assets/media/2026-02-06 (3).jpg", caption: "Product Field Demonstration in Gujarat" },
  { id: "2026-02-06", category: "fields", type: "image", src: "/assets/media/2026-02-06.jpg", caption: "Field Agronomy Team Gathering" },
  { id: "DIYAMEETING", category: "fields", type: "image", src: "/assets/media/DIYAMEETING IMAGE.png", caption: "Farmer Interactive Seminar" },
  { id: "FULLMEET", category: "fields", type: "image", src: "/assets/media/FULL MEET.png", caption: "Dealer & Agronomist Annual Meet" },
  { id: "MEETING", category: "fields", type: "image", src: "/assets/media/MEETING.png", caption: "Agricultural Advisory Conference" },
  { id: "TEAM", category: "fields", type: "image", src: "/assets/media/TEAM.png", caption: "Chitra Crop Science Dedicated Field Team" },
  { id: "whatsapp1", category: "fields", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.15 (1).jpeg", caption: "Field Inspection in Gujarat" },
  { id: "whatsapp2", category: "fields", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.15.jpeg", caption: "Farmer Advisory & Soil Consultation" },
  { id: "whatsapp5", category: "fields", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.56.jpeg", caption: "Kisan Mela & Agricultural Exhibition" },
  { id: "whatsapp6", category: "fields", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.57.jpeg", caption: "Regional Agronomists Team" },
  
  // ── Products, Research & Laboratory ───────────────────────────────────
  { id: "1", category: "products", type: "image", src: "/assets/media/1.png", caption: "Chitra Crop Science Product Range" },
  { id: "AGROTRADER", category: "products", type: "image", src: "/assets/media/AGROTRADER.png", caption: "AgroTrader Distribution Network" },
  { id: "whatsapp3", category: "products", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.33.jpeg", caption: "Crop Science Formulation Display" },
  { id: "poster", category: "products", type: "image", src: "/assets/media/Green Modern Organic Fertilizer Promotion Poster Landscape.png", caption: "Organic Bio-Fertilizer Formulation Showcase" },
  { id: "PRODUCTFULLTRAY", category: "products", type: "image", src: "/assets/media/PRODUCT FULL TRAY.png", caption: "Certified Agrochemical Packaging" },
  { id: "PRODUCT1", category: "products", type: "image", src: "/assets/media/PRODUCT1.png", caption: "High-Yield Crop Nutrition Line" },
  { id: "scene2", category: "products", type: "image", src: "/assets/media/Scene 2 - Pomegranate Orchards.png", caption: "Pomegranate Orchards Cultivation" },
  { id: "scene3", category: "products", type: "image", src: "/assets/media/Scene 3 - Farmers in Fields.png", caption: "Farmers Achieving Record Harvests" },
  { id: "scene4", category: "products", type: "image", src: "/assets/media/Scene 4 - Fertilizer Application.png", caption: "Scientific Micronutrient Application" },
  { id: "scene5", category: "products", type: "image", src: "/assets/media/Scene 5 - Plant Growth.png", caption: "Vigorous Plant Root & Shoot Growth" },
  { id: "scene6", category: "products", type: "image", src: "/assets/media/Scene 6 - Laboratory.png", caption: "Quality Testing & Formulation Laboratory" },
  { id: "scene7", category: "products", type: "image", src: "/assets/media/Scene 7 - Final Shot.png", caption: "Empowering Indian Agriculture" },
  { id: "canadian", category: "products", type: "image", src: "/assets/media/canadian-digital-agriculture-revolution.jpeg", caption: "Modern Agricultural Innovation" },

  // Additional Videos
  { id: "video1", category: "reviews", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.14.mp4", caption: "Field Demonstration Footage" },
  { id: "video2", category: "products", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.32.mp4", caption: "Product Application Demonstration" },
  { id: "video3", category: "fields", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.56.mp4", caption: "Farmer Interaction Highlights" },
  { id: "hero", category: "products", type: "video", src: "/assets/media/hero.mp4", caption: "Chitra Crop Science Brand Journey" },
];

const categories = [
  { id: "all", label: "All Media", icon: LayoutGrid },
  { id: "office", label: "Corporate Office", icon: Building2 },
  { id: "reviews", label: "Farmer Reviews", icon: Video },
  { id: "fields", label: "Field Visits", icon: Users },
  { id: "products", label: "Products & Lab", icon: Sprout },
] as const;

type FilterType = (typeof categories)[number]["id"];

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const filteredMedia = selectedFilter === "all"
    ? localMedia
    : localMedia.filter((item) => item.category === selectedFilter);

  return (
    <div className="container py-12 md:py-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider mb-3">
          Visual Journey
        </span>
        <h1 className="text-4xl font-serif md:text-5xl font-bold text-foreground">
          Photo & Video Gallery
        </h1>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          Explore our new Corporate Headquarters at Titanium Square, genuine farmer crop reviews, field demonstrations, and certified agricultural research.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedFilter === cat.id;
          const count = cat.id === "all" 
            ? localMedia.length 
            : localMedia.filter((m) => m.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                  : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-background/80 text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMedia.map((media) => (
          <Dialog key={media.id}>
            <DialogTrigger asChild>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square bg-muted shadow-soft hover:shadow-xl transition-all duration-300 border border-border">
                {media.type === "image" ? (
                  <img
                    src={media.src}
                    alt={media.caption ?? "Chitra Crop Science"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <video
                      src={media.src}
                      poster={media.poster}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="h-14 w-14 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-7 w-7 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </>
                )}

                {/* Permanent subtle caption bar + full hover overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-3 pt-8 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium line-clamp-2 leading-snug drop-shadow-sm">
                    {media.caption}
                  </p>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-white text-sm font-semibold mb-2 line-clamp-3">
                    {media.caption}
                  </p>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                    {media.type === "video" ? "Watch Video" : "View Photo"}
                  </span>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl p-2 bg-slate-950/95 border border-white/10 shadow-2xl rounded-2xl text-white">
              <div className="flex flex-col items-center">
                {media.type === "image" ? (
                  <img
                    src={media.src}
                    alt={media.caption ?? "Chitra Crop Science"}
                    className="w-full max-h-[75vh] object-contain rounded-lg"
                  />
                ) : (
                  <video
                    src={media.src}
                    controls
                    autoPlay
                    className="w-full max-h-[75vh] object-contain rounded-lg bg-black"
                  />
                )}
                <div className="w-full p-4 text-center">
                  <p className="text-base font-semibold text-slate-100">
                    {media.caption}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1 uppercase tracking-wider font-mono">
                    Chitra Crop Science • Corporate Media
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
