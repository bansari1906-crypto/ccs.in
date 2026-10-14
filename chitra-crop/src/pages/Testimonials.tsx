import { Star, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTestimonials } from "@/hooks/usePublicData";

const fallbackTestimonials = [
  {
    id: 1,
    author: "Ramesh Patel",
    role: "Ahmedabad, Gujarat",
    quote: "Using Chitra Crop Science's fertilizer significantly increased my cotton yield this season. The quality of the bolls was outstanding.",
    rating: 5,
    image: "/assets/media/customer1.jpeg",
  },
  {
    id: 2,
    author: "Suresh Desai",
    role: "Rajkot, Gujarat",
    quote: "The guidance and products from Chitra have been a game changer for my groundnut farm. Highly recommend their insecticides.",
    rating: 5,
    image: "/assets/media/customer2.jpeg",
  },
  {
    id: 3,
    author: "Vikram Singh",
    role: "Bhavnagar, Gujarat",
    quote: "I was struggling with pests in my pomegranate orchard. The systemic pesticides provided rapid action and long-lasting protection.",
    rating: 5,
    image: "/assets/media/customer3.jpeg",
  },
];

const videos = [
  { id: 1, src: "/assets/media/video1.mp4", title: "Farmer Success Story - Cotton" },
  { id: 2, src: "/assets/media/video2.mp4", title: "Field Application Guide" },
  { id: 3, src: "/assets/media/video3.mp4", title: "Crop Yield Improvement" },
];

const Testimonials = () => {
  const { data: remoteTestimonials = [], isLoading } = useTestimonials();
  const testimonials = isLoading ? [] : remoteTestimonials.length > 0 ? remoteTestimonials.map((item) => ({
    id: item.id,
    author: item.author,
    role: item.role ?? "",
    quote: item.quote,
    rating: item.rating,
    image: "/assets/media/customer1.jpeg",
  })) : fallbackTestimonials;

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Success Stories</p>
        <h1 className="mt-2 text-4xl font-serif md:text-5xl">What Our Farmers Say</h1>
        <p className="mt-4 text-muted-foreground">
          Discover how Chitra Crop Science is transforming agriculture and improving yields across India through genuine feedback from our farming community.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-20">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col h-full">
            <div className="flex text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-muted-foreground italic flex-grow">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
                <img src={t.image} alt={t.author} className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{t.author}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-serif">Video Testimonials</h2>
        <p className="mt-2 text-muted-foreground">Watch real results from the fields</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((v) => (
          <Dialog key={v.id}>
            <DialogTrigger asChild>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border shadow-soft aspect-video bg-black/5 hover:shadow-md transition-shadow">
                <video src={v.src} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 ml-1 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-medium text-sm line-clamp-1">{v.title}</h4>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-border">
              <video src={v.src} controls autoPlay className="w-full max-h-[80vh]" />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
