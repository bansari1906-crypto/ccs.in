import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGalleryItems } from "@/hooks/usePublicData";

const Gallery = () => {
  const { data: images = [], isLoading } = useGalleryItems();

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Work</p>
        <h1 className="mt-2 text-4xl font-serif md:text-5xl">Photo Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          A glimpse into our fields, farmer interactions, and quality agricultural products.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">Loading gallery images...</div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">No gallery media available.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img) => (
            <Dialog key={img.id}>
              <DialogTrigger asChild>
                <div className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-muted shadow-soft">
                  <img
                    src={img.image_url}
                    alt={img.caption ?? "Chitra Crop Science"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">View</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none">
                <img src={img.image_url} alt={img.caption ?? "Chitra Crop Science"} className="w-full h-auto rounded-lg" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
