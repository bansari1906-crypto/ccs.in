import { useState } from "react";
import { Mail, MapPin, Phone, Send, ExternalLink } from "lucide-react";
import { z } from "zod";
import { captureLead } from "@/hooks/useLeadCapture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSettings } from "@/hooks/usePublicData";
import { 
  COMPANY_LOCATION, 
  COMPANY_CONTACT, 
  generateMapsOpenUrl,
  generateMapsDirectionsUrl 
} from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Invalid email").max(254),
  phone: z.string().trim().max(20),
  subject: z.string().trim().max(200),
  message: z.string().trim().min(1, "Message required").max(4000),
});

const Contact = () => {
  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // ── Contact form submit ─────────────────────────────────────────────────
  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const d = parsed.data;

    await captureLead({
      name: d.name,
      email: d.email,
      phone: d.phone || undefined,
      inquiry_type: d.subject || "General Support",
      message: d.message,
      inquiry_source: "contact_form",
    });

    setSubmitting(false);
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const { data: settings } = useSettings();
  // Use settings from backend if available, fallback to constants
  const contactAddress = settings?.address ?? COMPANY_LOCATION.fullAddress;
  const contactPhone = settings?.phone ?? COMPANY_CONTACT.phoneFormatted;
  const contactEmail = settings?.email ?? COMPANY_CONTACT.email;

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Get in touch</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold">Contact us</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Questions about products or bulk orders? We'd love to hear from you. Reach out to our team and let's grow together.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* Left Column: Contact Info */}
        <div className="space-y-6 flex flex-col">
          {/* Contact Card */}
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/80 p-6 md:p-8 shadow-soft hover:shadow-md transition-shadow flex-grow">
            {/* Headquarters Photo */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-border shadow-sm group">
              <img
                src="/assets/media/office/office-headquarters-main.jpeg"
                alt="Chitra Crop Science Corporate Headquarters at Titanium Square"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-slate-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                    Corporate Headquarters
                  </span>
                  <p className="text-white text-sm font-semibold mt-1.5">
                    Titanium Square, S G Highway, Ahmedabad
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-semibold">Reach us directly</h3>
            <ul className="mt-6 space-y-5">
              {/* Address */}
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground mb-1">Office Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">{contactAddress}</p>
                </div>
              </li>
              
              {/* Phone */}
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Phone</p>
                  <a 
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`} 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {contactPhone}
                  </a>
                </div>
              </li>
              
              {/* Email */}
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Email</p>
                  <a 
                    href={`mailto:${contactEmail}`} 
                    className="text-sm font-medium text-primary hover:underline break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button 
                asChild 
                variant="default"
                className="gradient-leaf text-primary-foreground hover:opacity-90 flex-1"
              >
                <a href={generateMapsDirectionsUrl()} target="_blank" rel="noreferrer">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="flex-1"
              >
                <a href={generateMapsOpenUrl()} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Maps
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <form onSubmit={submitContact} className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/80 p-6 md:p-8 lg:p-10 shadow-soft">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold">Send a message</h3>
          <p className="mt-2 text-sm text-muted-foreground">We'll respond within 24 hours</p>
          
          <div className="mt-8 space-y-5">
            {/* Name and Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold">Full name *</Label>
                <Input 
                  id="name" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  required 
                  maxLength={120} 
                  className="mt-2 bg-background/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  required 
                  maxLength={254} 
                  className="mt-2 bg-background/50"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone and Inquiry Type */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">Phone</Label>
                <Input 
                  id="phone" 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  maxLength={20} 
                  className="mt-2 bg-background/50"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-semibold">Inquiry Type *</Label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select an option...</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Bulk Orders">Bulk Orders</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
              <Textarea 
                id="message" 
                rows={6} 
                value={form.message} 
                onChange={(e) => setForm({ ...form, message: e.target.value })} 
                required 
                maxLength={4000} 
                className="mt-2 bg-background/50 resize-none"
                placeholder="Tell us more about your inquiry..."
              />
              <p className="mt-1 text-xs text-muted-foreground">{form.message.length}/4000 characters</p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              disabled={submitting} 
              className="w-full gradient-leaf text-primary-foreground hover:opacity-90 font-semibold mt-8"
            >
              <Send className="mr-2 h-4 w-4" />
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </div>
        </form>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 grid gap-6 rounded-3xl border border-border bg-muted/50 p-6 md:p-8 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Business Hours</h4>
          <p className="text-sm text-muted-foreground">Monday - Saturday</p>
          <p className="text-sm font-medium text-foreground">10:00 AM - 7:00 PM IST</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
          <p className="text-sm text-muted-foreground">We typically respond within</p>
          <p className="text-sm font-medium text-foreground">24 business hours</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Quick Support</h4>
          <p className="text-sm text-muted-foreground">For immediate help, contact us via</p>
          <a 
            href={COMPANY_CONTACT.whatsappLink} 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
