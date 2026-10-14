import { Link } from "react-router-dom";
import { BookOpen, Droplets, ShieldCheck, Sun } from "lucide-react";

const KnowledgeCenter = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Knowledge Center
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Agricultural insights, product guides, and farming best practices
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: ShieldCheck,
            title: "Crop Protection",
            description: "Pest and disease management guides",
            to: "/blog/crop-protection"
          },
          {
            icon: Droplets,
            title: "Plant Nutrition",
            description: "Fertilizer and nutrient management",
            to: "/blog/plant-nutrition"
          },
          {
            icon: Sun,
            title: "Bio-Stimulants",
            description: "Organic growth and health solutions",
            to: "/blog/bio-stimulants"
          },
          {
            icon: BookOpen,
            title: "Product Guides",
            description: "How to use Chitra Crop Science products",
            to: "/blog/product-guides"
          }
        ].map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md"
          >
            <item.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCenter;
