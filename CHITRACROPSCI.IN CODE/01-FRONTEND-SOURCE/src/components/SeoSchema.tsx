import { useEffect } from "react";

interface SchemaProps {
  type:
    | "Organization"
    | "Product"
    | "FAQPage"
    | "AboutPage"
    | "WebSite"
    | "WebPage"
    | "CollectionPage"
    | "ItemList"
    | "BreadcrumbList";
  data: any;
}

export const SeoSchema = ({ type, data }: SchemaProps) => {
  useEffect(() => {
    const existing = document.getElementById(`schema-${type}`);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.id = `schema-${type}`;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const toRemove = document.getElementById(`schema-${type}`);
      if (toRemove) {
        toRemove.remove();
      }
    };
  }, [type, data]);

  return null;
};
