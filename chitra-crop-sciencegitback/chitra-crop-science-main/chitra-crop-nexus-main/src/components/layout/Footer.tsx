
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSettings } from "@/hooks/usePublicData";
import { COMPANY_LOCATION, COMPANY_CONTACT, COMPANY_SOCIAL } from "@/lib/constants";
import { normalizeCategorySlug } from "@/lib/productCatalog";

const Footer = () => {
  const { data: settings } = useSettings();
  const companyName = settings?.company_name ?? COMPANY_CONTACT.companyName;
  const address = settings?.address ?? COMPANY_LOCATION.fullAddress;
  const phone = settings?.phone ?? COMPANY_CONTACT.phoneFormatted;
  const email = settings?.email ?? COMPANY_CONTACT.email;

  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/40">
    <div className="container grid gap-10 py-14 md:grid-cols-5">
      <div className="md:col-span-1">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.png" alt="Chitra Crop Science Logo" className="h-10 w-auto" />
          <span className="font-serif text-lg">Chitra Crop Science</span>
        </Link>
        <p className="mt-4 text-sm font-medium text-primary">
          Rooted in Science, Grown with Trust
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Agricultural Products Manufacturing & Distribution Company.
        </p>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/about" className="hover:text-primary">About us</Link></li>
          <li><Link to="/products" className="hover:text-primary">Products</Link></li>
          <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Categories</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to={`/products?category=${normalizeCategorySlug("Fertilizer")}`} className="hover:text-primary">Fertilizers</Link></li>
          <li><Link to={`/products?category=${normalizeCategorySlug("Insecticide")}`} className="hover:text-primary">Insecticides</Link></li>
          <li><Link to={`/products?category=${normalizeCategorySlug("Herbicide")}`} className="hover:text-primary">Herbicides</Link></li>
          <li><Link to={`/products?category=${normalizeCategorySlug("Bio Stimulant")}`} className="hover:text-primary">Bio Stimulants</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {address}</li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-primary">{phone}</a></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> <a href={`mailto:${email}`} className="hover:text-primary">{email}</a></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Social</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href={COMPANY_CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a></li>
          <li><a href={COMPANY_SOCIAL.instagram} target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a></li>
          <li><a href={COMPANY_SOCIAL.facebook} target="_blank" rel="noreferrer" className="hover:text-primary">Facebook</a></li>
          <li><a href={COMPANY_SOCIAL.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a></li>
          <li><a href={COMPANY_SOCIAL.indiamart} target="_blank" rel="noreferrer" className="hover:text-primary">IndiaMART</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Chitra Crop Science. All rights reserved.
      </div>
    </div>
  </footer>
);
};

export default Footer;

