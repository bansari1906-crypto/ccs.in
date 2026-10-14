import aboutCrops from "@/assets/about-crops.jpg";
import aboutSoil from "@/assets/about-soil.jpg";
import { Award, Leaf, Target } from "lucide-react";

const About = () => (
  <>
    <section className="border-b border-border/60 bg-muted/30">
      <div className="container py-16 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">About us</p>
        <h1 className="mt-2 max-w-3xl text-4xl md:text-5xl">
          Rooted in soil. Growing with India's farmers.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Chitra Crop Science was founded in 2008 with a simple belief — that better inputs make better harvests, and better harvests change lives.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <img src={aboutCrops} alt="Healthy crop leaves with morning dew" loading="lazy" width={1200} height={900} className="rounded-2xl shadow-soft" />
        <div>
          <h2 className="text-3xl md:text-4xl">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            Chitra Crop Science is focused on delivering trusted agricultural solutions and quality crop products across India. What started as a vision has grown into one of India's most trusted agri-input companies.
          </p>
          <p className="mt-3 text-muted-foreground">
            Led by Jethu Dan, we partner with the people who feed the nation. Every formulation is tested in real conditions, refined with farmer feedback, and produced under strict quality controls.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-muted/30 py-20">
      <div className="container grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <Target className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-2xl">Our mission</h3>
          <p className="mt-3 text-muted-foreground">
            Provide high-quality agricultural products that help farmers improve productivity and empower them with safe, effective, and affordable crop solutions.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <Leaf className="h-8 w-8 text-secondary" />
          <h3 className="mt-4 text-2xl">Our vision</h3>
          <p className="mt-3 text-muted-foreground">
            Become a trusted agricultural brand across India through innovation and distribution excellence. A future where every field thrives sustainably.
          </p>
        </div>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="md:order-2">
          <img src={aboutSoil} alt="Hands holding rich soil with a seedling" loading="lazy" width={1200} height={900} className="rounded-2xl shadow-soft" />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl md:text-4xl">Certifications & quality</h2>
          <ul className="mt-6 space-y-4">
            {[
              { title: "ISO 9001:2015", desc: "Quality management system" },
              { title: "ISO 14001:2015", desc: "Environmental management" },
              { title: "CIB&RC registered", desc: "Central Insecticides Board approved" },
              { title: "GMP certified facility", desc: "Good Manufacturing Practices" },
            ].map((c) => (
              <li key={c.title} className="flex items-start gap-4">
                <Award className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Leadership</p>
          <h2 className="mt-1 text-3xl md:text-4xl">Meet our Founder</h2>
        </div>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft sm:flex sm:items-center sm:gap-8">
          <div className="mb-6 flex h-32 w-32 shrink-0 items-center justify-center rounded-full gradient-warm text-4xl font-semibold text-white shadow-warm sm:mb-0 mx-auto sm:mx-0">
            JD
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-2xl">Jethu Dan</h3>
            <p className="mt-1 font-medium text-primary">Founder / Owner, Chitra Crop Science</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founder of Chitra Crop Science, focused on delivering high-quality agricultural products and helping Indian farmers increase productivity through trusted crop solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;
