import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";

// Define local media files
const localMedia = [
  { id: "review-ccs-303", type: "video", src: "/assets/media/review-ccs-303-bagoda.mp4", poster: "/assets/media/poster-ccs-303-reel.jpg", caption: "CCS-303 Pomegranate Orchard Review (Bagoda, Rajasthan)" },
  { id: "review-chenaramji", type: "video", src: "/assets/media/review-chenaramji-honeybee.mp4", poster: "/assets/media/poster-chenaramji.jpg", caption: "Chenaram Ji Review: Welcome Honey Bee & CCS-303" },
  { id: "review-subhashji", type: "video", src: "/assets/media/review-subhashji-groundnut.mp4", poster: "/assets/media/poster-subhashji.jpg", caption: "Subhash Ji (Meghava) Groundnut Bumper Crop Review: CCS-CARB ULTRA" },
  { id: "review-karmiramji", type: "video", src: "/assets/media/review-karmiramji-pomegranate.mp4", poster: "/assets/media/poster-karmiramji.jpg", caption: "Karmiram Ji (Gudamalani) Review: Flower Plus & CCS-303 in Pomegranate" },
  { id: "1", type: "image", src: "/assets/media/1.png", caption: "Chitra Crop Science" },
  { id: "2026-02-06-1", type: "image", src: "/assets/media/2026-02-06 (1).jpg", caption: "Field Visit" },
  { id: "2026-02-06-2", type: "image", src: "/assets/media/2026-02-06 (2).jpg", caption: "Farmers Meeting" },
  { id: "2026-02-06-3", type: "image", src: "/assets/media/2026-02-06 (3).jpg", caption: "Product Demo" },
  { id: "2026-02-06", type: "image", src: "/assets/media/2026-02-06.jpg", caption: "Team Gathering" },
  { id: "AGROTRADER", type: "image", src: "/assets/media/AGROTRADER.png", caption: "AgroTrader" },
  { id: "DIYAMEETING", type: "image", src: "/assets/media/DIYAMEETING IMAGE.png", caption: "Diya Meeting" },
  { id: "FULLMEET", type: "image", src: "/assets/media/FULL MEET.png", caption: "Full Meeting" },
  { id: "poster", type: "image", src: "/assets/media/Green Modern Organic Fertilizer Promotion Poster Landscape.png", caption: "Product Poster" },
  { id: "MEETING", type: "image", src: "/assets/media/MEETING.png", caption: "Meeting" },
  { id: "PRODUCTFULLTRAY", type: "image", src: "/assets/media/PRODUCT FULL TRAY.png", caption: "Product Tray" },
  { id: "PRODUCT1", type: "image", src: "/assets/media/PRODUCT1.png", caption: "Product 1" },
  { id: "scene2", type: "image", src: "/assets/media/Scene 2 - Pomegranate Orchards.png", caption: "Pomegranate Orchards" },
  { id: "scene3", type: "image", src: "/assets/media/Scene 3 - Farmers in Fields.png", caption: "Farmers in Fields" },
  { id: "scene4", type: "image", src: "/assets/media/Scene 4 - Fertilizer Application.png", caption: "Fertilizer Application" },
  { id: "scene5", type: "image", src: "/assets/media/Scene 5 - Plant Growth.png", caption: "Plant Growth" },
  { id: "scene6", type: "image", src: "/assets/media/Scene 6 - Laboratory.png", caption: "Laboratory" },
  { id: "scene7", type: "image", src: "/assets/media/Scene 7 - Final Shot.png", caption: "Final Shot" },
  { id: "TEAM", type: "image", src: "/assets/media/TEAM.png", caption: "Our Team" },
  { id: "whatsapp1", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.15 (1).jpeg", caption: "Field Photo" },
  { id: "whatsapp2", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.15.jpeg", caption: "Farmer Interaction" },
  { id: "whatsapp3", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.33.jpeg", caption: "Product Display" },
  { id: "whatsapp4", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.34.jpeg", caption: "Meeting Photo" },
  { id: "whatsapp5", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.56.jpeg", caption: "Event Photo" },
  { id: "whatsapp6", type: "image", src: "/assets/media/WhatsApp Image 2026-04-26 at 17.13.57.jpeg", caption: "Team Photo" },
  { id: "canadian", type: "image", src: "/assets/media/canadian-digital-agriculture-revolution.jpeg", caption: "Agriculture Revolution" },
  { id: "images2", type: "image", src: "/assets/media/images (2).png", caption: "Company Logo" },
  { id: "video1", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.14.mp4", caption: "Field Video" },
  { id: "video2", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.32.mp4", caption: "Product Demo Video" },
  { id: "video3", type: "video", src: "/assets/media/WhatsApp Video 2026-04-26 at 17.13.56.mp4", caption: "Event Video" },
  { id: "final", type: "video", src: "/assets/media/final.mp4", caption: "Final Video" },
  { id: "hero", type: "video", src: "/assets/media/hero.mp4", caption: "Hero Video" },
];

const Gallery = () => {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Work</p>
        <h1 className="mt-2 text-4xl font-serif md:text-5xl">Photo & Video Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          A glimpse into our fields, farmer interactions, and quality agricultural products.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {localMedia.map((media) => (
          <Dialog key={media.id}>
            <DialogTrigger asChild>
              <div className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-muted shadow-soft">
                {media.type === "image" ? (
                  <img
                    src={media.src}
                    alt={media.caption ?? "Chitra Crop Science"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <video
                      src={media.src}
                      poster={(media as any).poster}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/70 transition-colors">
                        <Play className="h-8 w-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">View</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none">
              {media.type === "image" ? (
                <img src={media.src} alt={media.caption ?? "Chitra Crop Science"} className="w-full h-auto rounded-lg" />
              ) : (
                <video src={media.src} controls className="w-full h-auto rounded-lg" />
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
