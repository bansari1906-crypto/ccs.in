
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sprout, Users, PlayCircle, Star, Droplets, Wheat, Sun, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFarmer from "@/assets/hero-farmer.jpg";
import { useMemo } from "react";
import { resolveAsset } from "@/lib/assetMap";
import { useProducts } from "@/hooks/useProducts";
import { normalizeCategorySlug } from "@/lib/productCatalog";

const Home = () => {
  const { data: products = [] } = useProducts();

  const featured = useMemo(
    () => {
      const featuredProducts = products.filter((product) => product.featured);
      return (featuredProducts.length > 0 ? featuredProducts : products).slice(0, 4);
    },
    [products],
  );

  const categories = useMemo(() => {
    const map = new Map<string, { id: string; name: string; slug: string; image_url: string; description: string }>();

    products.forEach((product) => {
      if (!map.has(product.category)) {
        map.set(product.category, {
          id: product.category,
          name: product.category,
          slug: normalizeCategorySlug(product.category),
          image_url: product.images?.[0] ?? "",
          description: "",
        });
      }
    });

    return Array.from(map.values()).slice(0, 5);
  }, [products]);

  const seoSections = [
    {
      icon: ShieldCheck,
      title: "Crop Protection Solutions",
      description: "Premium pesticides, insecticides, and fungicides for complete crop protection against pests, diseases, and weeds. Trusted by farmers for cotton, pomegranate, vegetables, and more.",
      keywords: ["best pesticide for whitefly", "insecticide for cotton", "fungicide for vegetables"]
    },
    {
      icon: Droplets,
      title: "Plant Nutrition Solutions",
      description: "Complete range of fertilizers, NPK, micronutrients, and amino acid fertilizers to boost crop yield and plant health. Specially formulated for Indian soil conditions.",
      keywords: ["best fertilizer for vegetables", "amino acid fertilizer benefits", "NPK for crops"]
    },
    {
      icon: Wheat,
      title: "Soil Health Improvement",
      description: "Soil health products, bio-stimulants, and organic fertilizers to improve soil fertility, enhance microbial activity, and promote sustainable farming practices.",
      keywords: ["how to improve soil fertility", "soil health products", "organic farming"]
    },
    {
      icon: Sun,
      title: "Bio Stimulant Products",
      description: "Advanced bio-stimulants to increase plant growth, boost flowering, enhance fruit size, and improve stress tolerance in all crops.",
      keywords: ["best bio stimulant", "plant growth booster", "how to increase flowering"]
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Eco-friendly agricultural solutions, neem-based pesticides, and organic farming products for sustainable agriculture in Gujarat and Rajasthan.",
      keywords: ["organic farming benefits", "neem pesticide uses", "sustainable agriculture"]
    },
    {
      icon: Users,
      title: "Farmer Success Solutions",
      description: "Trusted by thousands of farmers across Gujarat, Rajasthan, and Maharashtra. We provide complete crop solutions with expert agronomy support.",
      keywords: ["agriculture products in Gujarat", "pesticide company in Ahmedabad", "agrochemical supplier Rajasthan"]
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroFarmer}
          alt="Farmer in a thriving green field at sunrise"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="container py-24 md:py-36 text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <Sprout className="h-3.5 w-3.5" /> Trusted by Indian Farmers
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Healthier soil. <em className="not-italic text-accent">Bigger harvests.</em> Brighter futures.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Chitra Crop Science - Your trusted partner for premium pesticides, insecticides, fertilizers, and bio-stimulants. Serving farmers in Gujarat, Rajasthan, and Maharashtra with field-tested agricultural solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-warm">
              <Link to="/products">Explore Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="container grid gap-8 py-10 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Quality Assured", desc: "Premium agrochemicals manufactured to highest standards." },
            { icon: Sprout, title: "Field-Tested", desc: "Proven solutions on real farms across Gujarat & Rajasthan." },
            { icon: Users, title: "Farmer Support", desc: "Expert agronomy advice and technical assistance." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Solutions Sections */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Solutions</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Complete Crop Solutions for Indian Farmers</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {seoSections.map((section, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <div className="flex flex-wrap gap-2">
                {section.keywords.map((keyword, i) => (
                  <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Product Categories</p>
              <h2 className="mt-1 text-3xl md:text-4xl">Our Agricultural Products</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-leaf"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white">
                  <img
                    src={resolveAsset(c.image_url)}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                  <h3 className="font-serif text-xl">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container py-20">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Featured Products</p>
          <h2 className="mt-1 text-3xl md:text-4xl">Top Selling Agricultural Products</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="aspect-square overflow-hidden bg-white p-4">
                <img src={resolveAsset(p.images?.[0])} alt={p.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-smooth group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{p.overview}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">→ Get Quote</span>
                  <span className="text-xs text-secondary group-hover:underline">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials & Videos */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Farmer Testimonials</p>
            <h2 className="mt-1 text-3xl md:text-4xl">Trusted by Farmers Across Gujarat & Rajasthan</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"Using Chitra Crop Science's products has significantly increased my cotton yield. The insecticides and fertilizers are excellent quality."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Rajesh Patel</h4>
                  <p className="text-xs text-muted-foreground">Cotton Farmer, Gujarat</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"Best pesticide for whitefly control in my chili crops. Chitra Crop Science products never disappoint. Highly recommended for all farmers."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Suresh Kumar</h4>
                  <p className="text-xs text-muted-foreground">Chili Farmer, Rajasthan</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"The bio-stimulants really helped in improving my vegetable crop yield. Great products and excellent support team."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Amit Sharma</h4>
                  <p className="text-xs text-muted-foreground">Vegetable Farmer, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

