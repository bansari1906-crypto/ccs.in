import { motion, useInView, useAnimation } from "framer-motion";
import {
  Award,
  Leaf,
  Target,
  ShieldCheck,
  Users,
  Sprout,
  TrendingUp,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Share2,
  Factory,
  Zap,
  HeartHandshake,
  BookOpen,
  ChevronRight,
  Quote,
  Building2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import aboutSoil from "@/assets/about-soil.jpg";
import aboutCrops from "@/assets/about-crops.jpg";
import founderImage from "@/assets/founder-jethu-dan.png";
import { SeoSchema } from "@/components/SeoSchema";


// Section Wrapper for animations
const Section = ({ children, className = "" }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const About = () => {
  const siteUrl = "https://chitracropscience.in";
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Chitra Crop Science",
      "foundingDate": "2008",
      "description": "Indian manufacturer of crop protection, bio-stimulants, and high-yield fertilizers committed to empowering farmers under the leadership of Jethu Dan.",
      "founder": {
        "@type": "Person",
        "name": "Jethu Dan",
        "jobTitle": "Founder & Owner",
        "description": "Founder and Owner of Chitra Crop Science, leading agricultural research and field-level support for farmers across Gujarat, Rajasthan, and India since 2008."
      },
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "image": `${siteUrl}/assets/media/founder-jethu-dan.png`
    }
  };

  return (
    <>
      <SeoSchema type="AboutPage" data={aboutSchema} />
      <div className="bg-slate-50">
      {/* 1. Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-slate-900/90 z-10" />
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={aboutCrops} 
            alt="Agriculture Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-5 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6 border border-emerald-400/30 text-emerald-300">
                About Chitra Crop Science
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 tracking-tight">
                Rooted in Trust.
                <br />
                <span className="text-emerald-400">Growing India's Future.</span>
              </h1>
              <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Founded in 2008 with a simple belief — that better agricultural science makes better harvests, and better harvests empower the farmers who feed our nation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/25"
                >
                  Explore Products
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/20 transition"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Company Story Section */}
      <Section className="py-24 md:py-32 container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-xl opacity-20" />
            <img 
              src="/assets/media/TEAM.png" 
              alt="Our Team" 
              loading="lazy" 
              className="relative w-full h-auto rounded-3xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <p className="text-3xl font-bold text-emerald-700">15+</p>
              <p className="text-gray-600 text-sm">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Our Story</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              A Journey of Dedication to Farmers
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Chitra Crop Science is focused on delivering trusted agricultural solutions and quality crop products across India. What started as a vision has grown into one of India's most trusted agri-input companies.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Led by Jethu Dan, we partner with the people who feed the nation. Every formulation is tested in real conditions, refined with farmer feedback, and produced under strict quality controls.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <CheckCircle2 className="text-emerald-600" />, text: "ISO Certified" },
                { icon: <CheckCircle2 className="text-emerald-600" />, text: "CIB&RC Approved" },
                { icon: <CheckCircle2 className="text-emerald-600" />, text: "GMP Compliant" },
                { icon: <CheckCircle2 className="text-emerald-600" />, text: "Quality Assured" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  {item.icon}
                  <span className="text-gray-800 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 3. Mission, Vision, Values */}
      <Section className="py-24 md:py-32 bg-gradient-to-br from-emerald-50 via-green-50 to-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Our Core</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-lg text-gray-600">
              Guided by principles that put farmers first
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-12 w-12" />,
                color: "from-blue-500 to-blue-600",
                bg: "bg-blue-50",
                title: "Our Mission",
                desc: "Provide high-quality agricultural products that help farmers improve productivity and empower them with safe, effective, and affordable crop solutions."
              },
              {
                icon: <Leaf className="h-12 w-12" />,
                color: "from-emerald-500 to-green-600",
                bg: "bg-emerald-50",
                title: "Our Vision",
                desc: "Become a trusted agricultural brand across India through innovation and distribution excellence. A future where every field thrives sustainably."
              },
              {
                icon: <Award className="h-12 w-12" />,
                color: "from-amber-500 to-orange-600",
                bg: "bg-amber-50",
                title: "Our Values",
                desc: "Quality, Integrity, Innovation, Sustainability, and Farmer-Centricity are the pillars that guide every decision we make."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`${card.bg} rounded-3xl p-10 border border-gray-100 shadow-xl transition-all duration-300`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Why Choose Us - 6 Feature Cards */}
      <Section className="py-24 md:py-32 container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Why Choose Us</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Partner With the Best
          </h2>
          <p className="text-lg text-gray-600">
            6 compelling reasons to trust Chitra Crop Science
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck />,
              title: "Quality Assured Products",
              desc: "Every product undergoes rigorous testing to ensure effectiveness and safety for crops and farmers."
            },
            {
              icon: <Factory />,
              title: "Research Driven Solutions",
              desc: "Our formulations are based on extensive research and field trials to deliver proven results."
            },
            {
              icon: <HeartHandshake />,
              title: "Farmer First Approach",
              desc: "We prioritize farmer needs and provide solutions tailored to their specific agricultural challenges."
            },
            {
              icon: <Sprout />,
              title: "Sustainable Agriculture",
              desc: "Committed to eco-friendly products and practices that protect our environment for future generations."
            },
            {
              icon: <BookOpen />,
              title: "Expert Technical Support",
              desc: "Our team of agronomists provides personalized guidance and technical assistance to farmers."
            },
            {
              icon: <TrendingUp />,
              title: "Wide Product Portfolio",
              desc: "From fertilizers to pesticides, we offer a complete range of agricultural solutions for all crops."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-emerald-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. Achievements & Certifications */}
      <Section className="py-24 md:py-32 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Our Credentials</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-serif font-bold mb-4">
              Achievements & Certifications
            </h2>
            <p className="text-lg text-slate-300">
              A testament to our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Award />,
                  title: "ISO 9001:2015",
                  desc: "Quality management system"
                },
                {
                  icon: <Leaf />,
                  title: "ISO 14001:2015",
                  desc: "Environmental management"
                },
                {
                  icon: <ShieldCheck />,
                  title: "CIB&RC Registered",
                  desc: "Central Insecticides Board approved"
                },
                {
                  icon: <Factory />,
                  title: "GMP Certified",
                  desc: "Good Manufacturing Practices"
                }
              ].map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="text-emerald-400 mb-4">{cert.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{cert.title}</h4>
                  <p className="text-slate-400 text-sm">{cert.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <img 
                src={aboutSoil} 
                alt="Quality Assurance" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Founder & Leadership Section */}
      <Section className="py-24 md:py-32 container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 md:p-14 lg:p-16 border border-emerald-500/20 shadow-2xl">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group max-w-sm w-full">
                {/* Clean, luxury portrait without overlays */}
                <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent shadow-2xl">
                  <div className="relative overflow-hidden rounded-[1.4rem] aspect-[3/4] bg-slate-900">
                    <img
                      src={founderImage}
                      alt="Jethu Dan - Founder & Owner of Chitra Crop Science"
                      className="w-full h-full object-cover object-top transition duration-500 hover:scale-102"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Message & Vision */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm block mb-2">
                Founder's Message
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-2">
                Jethu Dan
              </h2>
              <p className="text-base sm:text-lg text-emerald-300 font-medium mb-6 flex flex-wrap items-center gap-2">
                <span>Founder & Owner, Chitra Crop Science</span>
                <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300 text-sm">Agriculture Pioneer</span>
              </p>

              {/* Clean, authentic founder statement */}
              <div className="mb-8 pl-5 border-l-2 border-emerald-500/60">
                <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                  At Chitra Crop Science, our foundation has always rested upon one core truth: Indian agriculture is the lifeblood of our nation. Every formulation we produce, every dealer partnership we foster, and every crop yield we enhance is driven by a deep personal commitment to the prosperity and dignity of the hardworking farmer. We do not just build agrochemical solutions — we build lasting relationships of trust from seed to harvest.
                </p>
              </div>

              {/* 3 Core Leadership Pillars */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-emerald-400/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Farmer First</h4>
                  <p className="text-xs text-slate-300">Formulations tested in real Indian field conditions for genuine yield growth.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-emerald-400/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 mb-2">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Quality Guaranteed</h4>
                  <p className="text-xs text-slate-300">Strict CIB&RC and ISO-certified manufacturing and batch consistency.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-emerald-400/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                    <Sprout className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Sustainable Soil</h4>
                  <p className="text-xs text-slate-300">Protecting long-term soil health for future generations of growers.</p>
                </div>
              </div>

              {/* Footer info: Signature flourish & Action */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src="/logo.png" alt="Chitra Crop Science Logo" className="h-12 w-auto bg-white/95 rounded-xl p-1.5 shadow-md" />
                  <div>
                    <span className="font-serif italic text-2xl text-emerald-300 tracking-wide block">
                      Jethu Dan
                    </span>
                    <span className="text-xs text-slate-400">Chitra Crop Science • Est. 2008</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
                  >
                    <span>Connect With Us</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7b. Corporate Headquarters Section */}
      <Section className="py-20 md:py-28 bg-white border-y border-slate-200">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
              <Building2 className="h-3.5 w-3.5 text-emerald-600" />
              Corporate Headquarters
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Our Base of Agricultural Innovation
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Operating from Titanium Square on S G Highway, Ahmedabad, our modern corporate headquarters connects agricultural research, dealer logistics, and nationwide farmer advisory services.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
              <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>B/904, Titanium Square, Thaltej Cross Road, Near BMW Showroom, S G Highway, Ahmedabad 380054</span>
            </div>
          </div>

          {/* Featured HQ Layout */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Featured Photo */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative group min-h-[380px]">
              <img
                src="/assets/media/office/office-headquarters-main.jpeg"
                alt="Chitra Crop Science Corporate Headquarters Overview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-2 w-fit">
                  Central Operations
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  Executive Suite & Corporate Operations
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">
                  Equipped with modern infrastructure and agronomy systems to coordinate field operations, dealer networks, and farmer support across India.
                </p>
              </div>
            </div>

            {/* Side Grid with other office images */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 relative group aspect-square">
                <img
                  src="/assets/media/office/office-boardroom.jpeg"
                  alt="Executive Boardroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <p className="text-white text-xs font-semibold">Executive Boardroom</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 relative group aspect-square">
                <img
                  src="/assets/media/office/office-reception.jpeg"
                  alt="Corporate Reception"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <p className="text-white text-xs font-semibold">Welcome Reception</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 relative group aspect-square">
                <img
                  src="/assets/media/office/office-cabin.jpeg"
                  alt="Founder & Director Cabin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <p className="text-white text-xs font-semibold">Director Cabin</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 relative group aspect-square">
                <img
                  src="/assets/media/office/office-lounge.jpeg"
                  alt="Executive Discussion Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <p className="text-white text-xs font-semibold">Discussion Lounge</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition"
            >
              <span>View all headquarters & facility photos in gallery</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. Call to Action */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-emerald-800 via-green-800 to-slate-900">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Partner With Chitra Crop Science
              </h2>
              <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                Join thousands of successful farmers across India. Start your journey to better harvests today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="px-10 py-4 bg-white text-emerald-800 font-bold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/products" 
                  className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-emerald-800 transition-all duration-300"
                >
                  View Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
