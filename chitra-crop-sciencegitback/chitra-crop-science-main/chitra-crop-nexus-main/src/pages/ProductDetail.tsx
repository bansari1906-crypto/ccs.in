
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Leaf, 
  MessageSquare, 
  PhoneCall, 
  ChevronRight,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useProduct } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/usePublicData";
import { captureLead } from "@/hooks/useLeadCapture";
import { resolveAsset } from "@/lib/assetMap";
import { normalizeCategorySlug } from "@/lib/productCatalog";
import { COMPANY_CONTACT } from "@/lib/constants";

const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Please enter a message"),
});

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: products = [], product, isLoading } = useProduct(slug);
  const { data: settings } = useSettings();
  const whatsappNumber = settings?.phone?.replace(/\D/g, "") || COMPANY_CONTACT.phone.replace(/\D/g, "");
  const companyPhone = settings?.phone || COMPANY_CONTACT.phoneFormatted;

  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof inquiryFormSchema>) => {
    if (!product) return;
    await captureLead({
      name: values.name,
      phone: values.phone,
      email: values.email,
      product_name: product.name,
      inquiry_type: "Product Inquiry",
      message: values.message,
      inquiry_source: "send_inquiry",
    });
    toast.success("Inquiry sent successfully! We'll contact you soon.");
    form.reset();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/products">Back to products</Link>
        </Button>
      </div>
    );
  }

  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi Chitra Crop Science, I'd like to inquire about ${product.name}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  const specs = [
    { label: "Category", value: product.category },
    { label: "Composition", value: product.composition },
    { label: "Target Crops", value: product.target_crops?.join(", ") },
    { label: "Packaging", value: product.packaging_sizes },
    { label: "Usage Instructions", value: product.usage_dosage },
  ].filter(spec => spec.value);

  const hasAbout = product.overview || product.description || product.key_benefits?.length;

  return (
    <section className="bg-background pb-16">
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-300"
      >
        <MessageSquare className="h-7 w-7" />
      </a>

      <div className="border-b border-border bg-white py-6">
        <div className="container text-sm flex items-center gap-2 flex-wrap">
          <Link to="/" className="text-muted-foreground hover:text-green-700 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-green-700 transition-colors">Products</Link>
          {product.category && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <Link to={`/products?category=${normalizeCategorySlug(product.category)}`} className="text-muted-foreground hover:text-green-700 transition-colors">{product.category}</Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container max-w-6xl pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-white p-10 shadow-sm">
              <img 
                src={resolveAsset(product.images?.[0])} 
                alt={product.name} 
                className="h-full w-full object-contain" 
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">{product.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">{product.name}</h1>
            </div>

            {specs.length > 0 && (
              <Card className="border border-border rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-700" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {specs.map((spec, idx) => (
                      <div key={idx} className="flex items-start justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                        <span className="text-muted-foreground text-sm font-medium w-1/3">{spec.label}</span>
                        <span className="text-foreground text-sm text-right w-2/3">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button 
                className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Send Inquiry
              </Button>
              <Button 
                variant="outline" 
                className="h-12 border-green-600 text-green-700 hover:bg-green-50"
                onClick={handleWhatsApp}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="h-12 sm:col-span-2"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                <a href={`tel:${companyPhone.replace(/\D/g, "")}`}>{companyPhone}</a>
              </Button>
            </div>
          </div>
        </div>

        {hasAbout && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold mb-6">About This Product</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {product.overview && <p>{product.overview}</p>}
              {product.description && <p>{product.description}</p>}
              {product.key_benefits && product.key_benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Key Benefits</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {product.key_benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mt-16">
          <Card className="rounded-2xl border border-border bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6 rounded-t-2xl">
              <h2 className="text-2xl font-serif font-bold text-white">Send Inquiry for {product.name}</h2>
              <p className="text-green-100 mt-1">Get in touch with our team for pricing and details</p>
            </div>
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium">Email (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium">Your Inquiry *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={`Tell us about your requirements for ${product.name}`}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2 pt-2">
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={form.formState.isSubmitting}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-white p-6">
                    <img 
                      src={resolveAsset(item.images?.[0])} 
                      alt={item.name} 
                      loading="lazy" 
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">{item.category}</p>
                    <h3 className="font-serif text-lg font-semibold leading-tight">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;

