
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sprout, Users, Droplets, Wheat, Sun, Leaf, Play, Star, MapPin, Video, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SeoSchema } from "@/components/SeoSchema";
import SmartAgriAssistant from "@/components/SmartAgriAssistant";
import { motion } from "framer-motion";
import heroFarmer from "@/assets/hero-farmer.jpg";

const farmerVideoReviews = [
  {
    id: "ccs-303-bagoda",
    title: "CCS-303 in Pomegranate Orchard",
    farmer: "Field Demonstration",
    location: "Bagoda, Rajasthan",
    crop: "Pomegranate (अनार)",
    product: "CCS-303 Biological Defense",
    quote: "फूल बहुत ही शानदार सेट हुए हैं और थ्रिप्स तथा माइट्स का अटैक न के बराबर है। 100% बायोलॉजिकल सेफ फॉर्मूलेशन।",
    videoUrl: "/assets/media/review-ccs-303-bagoda.mp4",
    poster: "/assets/media/poster-ccs-303-reel.jpg",
    blogSlug: "ccs-303-pomegranate-orchard-review-bagoda-rajasthan"
  },
  {
    id: "karmiramji-gudamalani",
    title: "Record Pomegranate Flowering",
    farmer: "Karmiram Ji, Akharam Ji & Team",
    location: "Gudamalani, Barmer",
    crop: "Pomegranate Orchard",
    product: "Flower Plus & CCS-303",
    quote: "Flower Plus और CCS-303 से फूल गिरना रुका और फल बहुत तगड़ा सेट हुआ है। पूरे इलाके में बगीचा नंबर 1 है।",
    videoUrl: "/assets/media/review-karmiramji-pomegranate.mp4",
    poster: "/assets/media/poster-karmiramji.jpg",
    blogSlug: "karmiramji-gudamalani-pomegranate-orchard-flower-plus-ccs-303"
  },
  {
    id: "chenaramji-honeybee",
    title: "Natural Pollination Booster",
    farmer: "Chenaram Ji (Ramdev Agro)",
    location: "Rajasthan",
    crop: "Fruit & Cash Crops",
    product: "Welcome Honey Bee & CCS-303",
    quote: "Welcome Honey Bee से मधुमक्खियों का मूवमेंट बढ़ा और फल बनने की गति तेज हो गई। रिजल्ट बहुत जबरदस्त है।",
    videoUrl: "/assets/media/review-chenaramji-honeybee.mp4",
    poster: "/assets/media/poster-chenaramji.jpg",
    blogSlug: "chenaramji-review-welcome-honey-bee-pollination-booster"
  },
  {
    id: "subhashji-meghava",
    title: "Groundnut Bumper Harvest",
    farmer: "Subhash Ji & Rinku Kumar (Agronomist)",
    location: "Meghava, Rajasthan",
    crop: "Groundnut (मूंगफली)",
    product: "CCS-CARB ULTRA",
    quote: "मूंगफली की हरियाली, जड़ों का फैलाव और दानों का भराव CCS-CARB ULTRA की वजह से रिकॉर्ड स्तर पर हुआ।",
    videoUrl: "/assets/media/review-subhashji-groundnut.mp4",
    poster: "/assets/media/poster-subhashji.jpg",
    blogSlug: "subhashji-meghava-groundnut-bumper-growth-ccs-carb-ultra"
  }
];

const Home = () => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; farmer: string } | null>(null);
  const siteUrl = "https://chitracropscience.in";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chitra Crop Science",
    description: "Advanced crop solutions for better growth and higher yield, including fertilizers, bio-stimulants, crop protection inputs, and farmer support for Indian agriculture.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    telephone: "+91 80004 50380",
    email: "chitracropscience22@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "BLOCK-D, 404, Signature 2 Internal Rd, Makarba, Sarkhej-Okaf, Ahmedabad, Gujarat 382210, India",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382210",
      addressCountry: "IN"
    },
    areaServed: ["IN", "Gujarat", "Rajasthan", "Maharashtra"],
    knowsAbout: [
      "Fertilizers",
      "Bio-stimulants",
      "Crop protection",
      "Insecticides",
      "Fungicides",
      "Herbicides",
      "Micronutrient fertilizers",
      "Indian agriculture"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91 80004 50380",
        email: "chitracropscience22@gmail.com",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "gu"]
      }
    ],
    sameAs: []
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chitra Crop Science",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Advanced Crop Solutions for Better Growth & Higher Yield",
    url: siteUrl,
    description: "Explore fertilizers, bio-stimulants, fungicides, herbicides, and insecticides for Indian agriculture with farmer-first technical support.",
    about: [
      "Crop protection products India",
      "Fertilizers and bio-stimulants India",
      "Advanced crop solutions",
      "Indian agriculture"
    ]
  };

  const seoFaqs = [
    {
      question: "What are the best fertilizers for cotton crops to maximize yield?",
      answer: "The best fertilizer plan for cotton usually combines balanced NPK, micronutrients like zinc and boron, and crop-stage-specific foliar nutrition. Chitra Crop Science recommends selecting fertilizer based on soil status, growth stage, and local agronomic conditions."
    },
    {
      question: "Which product is best for sucking pests in cotton?",
      answer: "Sucking pest control in cotton typically requires a crop protection product labeled for aphids, jassids, thrips, or whiteflies. The right product depends on pest pressure, crop stage, and spray timing."
    },
    {
      question: "How can I control powdery mildew in grapes?",
      answer: "Powdery mildew in grapes is usually managed with a preventive and curative fungicide program, correct spray intervals, and canopy management. Product selection should match disease stage and weather conditions."
    },
    {
      question: "What is a bio-stimulant in agriculture?",
      answer: "A bio-stimulant is an agricultural input used to improve plant vigor, nutrient uptake, stress tolerance, flowering, rooting, or overall crop performance. It supports plant processes rather than acting like a conventional pesticide."
    },
    {
      question: "How do I choose the right crop protection product for my field?",
      answer: "Choose the right product by identifying the crop, exact pest or disease, growth stage, severity level, and weather conditions. Correct diagnosis is more important than selecting a product by brand name alone."
    },
    {
      question: "What should dealers look for in an agrochemical supplier?",
      answer: "Dealers should look for product quality, a consistent catalog, technical support, timely supply, and clear product documentation. Trust, agronomy support, and delivery reliability matter as much as price."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const seoSections = [
    {
      icon: ShieldCheck,
      title: "Crop Protection Solutions",
      description: "Premium pesticides, insecticides, and fungicides for complete crop protection against pests, diseases, and weeds.",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: Droplets,
      title: "Plant Nutrition Solutions",
      description: "Complete range of fertilizers, NPK, micronutrients, and amino acid fertilizers to boost crop yield and plant health.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Wheat,
      title: "Soil Health Improvement",
      description: "Soil health products, bio-stimulants, and organic fertilizers to improve soil fertility and enhance microbial activity.",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      icon: Sun,
      title: "Bio Stimulant Products",
      description: "Advanced bio-stimulants to increase plant growth, boost flowering, enhance fruit size, and improve stress tolerance.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Eco-friendly agricultural products and organic farming solutions for sustainable agriculture.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Users,
      title: "Farmer First Support",
      description: "Trusted by thousands of farmers across Gujarat, Rajasthan, and Maharashtra with expert agronomy support.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <>
      <SeoSchema type="Organization" data={organizationSchema} />
      <SeoSchema type="WebSite" data={webSiteSchema} />
      <SeoSchema type="WebPage" data={webPageSchema} />
      <SeoSchema type="FAQPage" data={faqSchema} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <video
        src="/media/final.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-farmer.jpg"
        alt="Indian farmers using advanced crop protection, fertilizer, and bio-stimulant solutions"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
        <div className="absolute inset-0 -z-10 bg-black/60" />
        <div className="container py-24 md:py-36 text-primary-foreground text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              TRUSTED BY 5000+ FARMERS
            </span>
            <h1 className="mt-6 max-w-4xl mx-auto text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Advanced Crop Solutions for
              <span className="block text-emerald-400 mt-2">Better Growth & Higher Yield</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/85">
              Empowering Indian agriculture with high-grade fertilizers, bio-stimulants, and crop protection inputs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30">
                <Link to="/products">Explore Our Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Intent Blocks */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Search by Use Case</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Crop, Pest, Disease & Nutrition Search Paths
            </h2>
            <p className="mt-4 text-slate-600">
              Explore high-intent solution paths built for farmers, distributors, and agronomy-led crop planning.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Cotton Sucking Pests",
                description: "Find insecticide recommendations for aphids, jassids, thrips, and whiteflies in cotton.",
                href: "/products?search=cotton+sucking+pest"
              },
              {
                title: "Grape Powdery Mildew",
                description: "Browse fungicide solutions for powdery mildew and rainy-season disease management.",
                href: "/products?search=grapes+powdery+mildew"
              },
              {
                title: "Tomato Blight Control",
                description: "Discover product options for blight control and preventive disease protection in tomato.",
                href: "/products?search=tomato+blight+treatment"
              },
              {
                title: "Zinc Deficiency Correction",
                description: "Explore zinc, micronutrient, and nutrition-support products for better crop quality and yield.",
                href: "/products?search=zinc+deficiency+fertilizer"
              }
            ].map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-slate-200 bg-slate-50 py-12">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Quality Assured", desc: "Premium agrochemicals manufactured to highest standards" },
            { icon: Sprout, title: "Field-Tested", desc: "Proven solutions on real farms across Gujarat & Rajasthan" },
            { icon: Users, title: "Farmer Support", desc: "Expert agronomy advice and technical assistance" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <f.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real Farmer Video Reviews & Live Proof Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
              <Video className="w-3.5 h-3.5 text-red-600" />
              On-Ground Farmer Proof
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Real Farmer Video Reviews
            </h2>
            <p className="mt-4 text-slate-600 text-base md:text-lg">
              Listen directly to progressive growers from Rajasthan and Gujarat sharing their genuine harvest results with Chitra Crop Science formulations.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {farmerVideoReviews.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div>
                  {/* Poster / Video Thumbnail */}
                  <div className="relative aspect-[9/14] overflow-hidden bg-slate-900">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
                        <Video className="w-3 h-3" /> Reel
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-900/80 text-amber-300 backdrop-blur-md border border-white/10">
                        <Star className="w-3 h-3 fill-current text-amber-400" /> 5.0
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <button
                      onClick={() => setActiveVideo({ url: item.videoUrl, title: item.title, farmer: item.farmer })}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl transition transform group-hover/btn:scale-110">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </button>

                    {/* Bottom Info over Thumbnail */}
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                        {item.crop}
                      </span>
                      <h4 className="text-base font-bold leading-snug drop-shadow-md">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    <p className="text-xs font-semibold text-emerald-800 mb-2">
                      {item.farmer}
                    </p>

                    <p className="text-xs text-slate-600 italic line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <Link
                    to={`/blog/${item.blogSlug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => setActiveVideo({ url: item.videoUrl, title: item.title, farmer: item.farmer })}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    Watch Reel
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Reviews Button */}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg px-8">
              <Link to="/blog">
                Explore All Farmer Stories & Reviews <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Video Reel Dialog */}
        {activeVideo && (
          <Dialog open={Boolean(activeVideo)} onOpenChange={(open) => !open && setActiveVideo(null)}>
            <DialogContent className="max-w-md sm:max-w-lg p-4 bg-slate-950 border border-slate-800 text-white rounded-3xl shadow-2xl">
              <div className="mb-2">
                <h4 className="text-base font-serif font-bold text-white line-clamp-1">{activeVideo.title}</h4>
                <p className="text-xs text-emerald-400">{activeVideo.farmer}</p>
              </div>
              <div className="relative aspect-[9/16] max-h-[75vh] w-full mx-auto overflow-hidden rounded-2xl bg-black">
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


      {/* SEO Solutions Sections */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-wider text-emerald-700"
            >
              Our Solutions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
            >
              Complete Crop Solutions
            </motion.h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {seoSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${section.bg} mb-6`}>
                  <section.icon className={`h-8 w-8 ${section.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Agri AI Assistant Section */}
      <section className="py-16 md:py-24 bg-white">
        <SmartAgriAssistant />
      </section>

      {/* SEO FAQ Section */}
      <section className="py-20 md:py-24 bg-slate-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Farmer FAQ</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Popular Crop Questions Answered Clearly
            </h2>
            <p className="mt-4 text-slate-600">
              Short, direct answers for crop nutrition, pest management, fungicide planning, and dealer selection.
            </p>
          </div>
          <div className="space-y-4">
            {seoFaqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Become a Dealer or Distributor
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10">
              Join our growing network of successful partners across India. Grow your business with trusted agricultural products.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://chitracropsciencepartners.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg shadow-white/10">
                  Apply Now
                </Button>
              </a>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
