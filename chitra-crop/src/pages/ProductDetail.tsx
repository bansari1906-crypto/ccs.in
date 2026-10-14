
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageSquare, ArrowLeft, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoSchema } from "@/components/SeoSchema";
import staticProductCatalog from "@/data/product-catalog.json";
import { resolveAsset } from "@/lib/assetMap";

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
};

const ProductDetail = () => {
  const params = useParams();
  const slug = params.slug || params.categoryOrSlug;
  const products = staticProductCatalog;
  const siteUrl = "https://chitracropscience.in";
  const product = useMemo(
    () => products.find((p: any) => p.slug === slug) || null,
    [products, slug]
  );
  
  // Find related products (same category)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p: any) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);
  
  const [activeTab, setActiveTab] = useState("profile");
  
  const whatsappNumber = "918000450380";
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
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
  
  const targetCrops = toArray(product.suitableCrops || product.target_crops || product.targetCrops);
  const targetPests = toArray(product.targetPests);
  const targetDiseases = toArray(product.targetDiseases);
  const targetWeeds = toArray(product.targetWeeds);
  const packSizes = toArray(product.packSizes || product.packaging_sizes);
  const targetUses = toArray(product.uses);
  const benefitItems = toArray(
    Array.isArray(product.key_benefits) && product.key_benefits.length > 0
      ? product.key_benefits
      : product.benefits,
  );
  const featureItems = toArray(product.benefits);
  const keyBenefitItems = toArray(product.key_benefits);
  const safetyMeasures = toArray((product as any).safetyMeasures);
  const productUrl = `${siteUrl}/products/${product.slug}`;
  
  // Create schema data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.overview,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Chitra Crop Science"
    },
    sku: product.id,
    url: productUrl,
    image: [resolveAsset(product.images?.[0]) || `${siteUrl}/logo.png`],
    additionalProperty: [
      product.technicalName ? { "@type": "PropertyValue", name: "Technical Name", value: product.technicalName } : null,
      product.composition ? { "@type": "PropertyValue", name: "Composition", value: product.composition } : null,
      product.formulation ? { "@type": "PropertyValue", name: "Formulation", value: product.formulation } : null,
      targetCrops.length > 0 ? { "@type": "PropertyValue", name: "Target Crops", value: targetCrops.join(", ") } : null,
      targetPests.length > 0 ? { "@type": "PropertyValue", name: "Target Pests", value: targetPests.join(", ") } : null,
      targetDiseases.length > 0 ? { "@type": "PropertyValue", name: "Target Diseases", value: targetDiseases.join(", ") } : null,
      targetWeeds.length > 0 ? { "@type": "PropertyValue", name: "Target Weeds", value: targetWeeds.join(", ") } : null,
      (product.dose || product.usage_dosage) ? { "@type": "PropertyValue", name: "Dosage", value: product.dose || product.usage_dosage } : null,
      (product.applicationMethod || product.application_method) ? { "@type": "PropertyValue", name: "Application Method", value: product.applicationMethod || product.application_method } : null,
      packSizes.length > 0 ? { "@type": "PropertyValue", name: "Pack Sizes", value: packSizes.join(", ") } : null,
      (product.storageInstructions || product.storage_instructions) ? { "@type": "PropertyValue", name: "Storage Instructions", value: product.storageInstructions || product.storage_instructions } : null,
    ].filter(Boolean)
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (product.faqs || []).map((faq: any) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl
      }
    ]
  };
  
  return (
    <>
      <SeoSchema type="Product" data={productSchema} />
      <SeoSchema type="FAQPage" data={faqSchema} />
      <SeoSchema type="BreadcrumbList" data={breadcrumbSchema} />
    <section className="bg-slate-50 min-h-screen pb-16">
      <div className="container py-8">
        {/* Breadcrumb & back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-sm gap-2 text-slate-600 hover:text-emerald-700">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Products Catalog
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="border border-slate-200 rounded-lg p-4 md:p-8 w-full max-w-md">
                <img 
                      src={resolveAsset(product.images?.[0])} 
                      alt={product.name} 
                      className="w-full h-auto object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = resolveAsset("/src/assets/product-fertilizer.jpg");
                      }}
                    />
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 text-sm text-slate-500 mb-3">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md font-semibold">ADVANCED</span>
                <Link 
                  to={`/products/${product.category?.toLowerCase()}`} 
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md hover:bg-slate-200 transition-colors font-semibold"
                >
                  {product.category?.toUpperCase() || "PRODUCT"}
                </Link>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                {product.overview || product.description}
              </p>
              
              {/* Quick Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.technicalName && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Technical Name</p>
                    <p className="text-sm font-semibold text-slate-800">{product.technicalName}</p>
                  </div>
                )}
                {product.composition && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Composition</p>
                    <p className="text-sm font-semibold text-slate-800">{product.composition}</p>
                  </div>
                )}
                {product.formulation && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Formulation</p>
                    <p className="text-sm font-semibold text-slate-800">{product.formulation}</p>
                  </div>
                )}
                {product.productType && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Product Type</p>
                    <p className="text-sm font-semibold text-slate-800">{product.productType}</p>
                  </div>
                )}
              </div>
              
              {/* Target Pests/Diseases/Weeds */}
              {targetPests.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Target Pests</h4>
                  <div className="flex flex-wrap gap-2">
                    {targetPests.map((pest: string, i: number) => (
                      <span key={i} className="text-sm border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 font-medium">{pest}</span>
                    ))}
                  </div>
                </div>
              )}
              {targetDiseases.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Target Diseases</h4>
                  <div className="flex flex-wrap gap-2">
                    {targetDiseases.map((disease: string, i: number) => (
                      <span key={i} className="text-sm border border-blue-200 bg-blue-50 text-blue-700 rounded-full px-4 py-2 font-medium">{disease}</span>
                    ))}
                  </div>
                </div>
              )}
              {targetWeeds.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Target Weeds</h4>
                  <div className="flex flex-wrap gap-2">
                    {targetWeeds.map((weed: string, i: number) => (
                      <span key={i} className="text-sm border border-orange-200 bg-orange-50 text-orange-700 rounded-full px-4 py-2 font-medium">{weed}</span>
                    ))}
                  </div>
                </div>
              )}
              {targetUses.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Target Uses</h4>
                  <div className="flex flex-wrap gap-2">
                    {targetUses.map((item: string, i: number) => (
                      <span key={i} className="text-sm border border-violet-200 bg-violet-50 text-violet-700 rounded-full px-4 py-2 font-medium">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Target Crops */}
              {targetCrops.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Target Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {targetCrops.map((crop: string, i: number) => (
                      <span key={i} className="text-sm border border-green-200 bg-green-50 text-green-700 rounded-full px-4 py-2 font-medium">{crop}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Pack Sizes */}
              {packSizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Packaging & Pack Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {packSizes.map((size: string, i: number) => (
                      <span key={i} className="text-sm border border-slate-300 bg-slate-50 text-slate-700 rounded-full px-4 py-2 font-medium">{size}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Dosage */}
              {product.dose || product.usage_dosage ? (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-sm font-bold text-amber-700 uppercase mb-2">Dosage</h4>
                  <p className="text-sm text-amber-900 font-medium">{product.dose || product.usage_dosage}</p>
                </div>
              ) : null}
              
              {/* Description */}
              {product.description && product.description !== product.overview && (
                <div className="mb-6 bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Description</h4>
                  <p className="text-sm text-slate-800">{product.description}</p>
                </div>
              )}
              
              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 uppercase mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  {benefitItems.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-2">
                {[
                  { id: "application", label: "APPLICATION GUIDELINES" },
                  { id: "specifications", label: "SPECIFICATIONS" },
                  { id: "faq", label: "FAQ" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 px-3 text-sm font-semibold uppercase tracking-wider transition-colors rounded-t-md ${
                      activeTab === tab.id 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="mb-6">
                {activeTab === "application" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 uppercase">Application Guidelines</h3>
                    <div className="text-base text-slate-700 space-y-3">
                      <p className="bg-slate-50 p-3 rounded-md"><strong>Dose:</strong> {product.dose || product.usage_dosage || "As per crop and pest"}</p>
                      <p className="bg-slate-50 p-3 rounded-md"><strong>Method:</strong> {product.applicationMethod || product.application_method || "Foliar spray or drench"}</p>
                    </div>
                  </div>
                )}
                {activeTab === "specifications" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 uppercase">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.technicalName && <div className="bg-slate-50 p-3 rounded-md"><p className="text-sm"><strong>Technical Name:</strong> {product.technicalName}</p></div>}
                      {product.composition && <div className="bg-slate-50 p-3 rounded-md"><p className="text-sm"><strong>Composition:</strong> {product.composition}</p></div>}
                      {product.formulation && <div className="bg-slate-50 p-3 rounded-md"><p className="text-sm"><strong>Formulation:</strong> {product.formulation}</p></div>}
                      {product.activeIngredient && <div className="bg-slate-50 p-3 rounded-md"><p className="text-sm"><strong>Active Ingredient:</strong> {product.activeIngredient}</p></div>}
                      {product.productType && <div className="bg-slate-50 p-3 rounded-md"><p className="text-sm"><strong>Product Type:</strong> {product.productType}</p></div>}
                    </div>
                  </div>
                )}
                {activeTab === "faq" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 uppercase">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {product.faqs && product.faqs.length > 0 ? (
                        product.faqs.map((faq: any, i: number) => (
                          <details key={i} className="text-base bg-slate-50 p-3 rounded-md">
                            <summary className="font-semibold text-slate-800 cursor-pointer">{faq.question}</summary>
                            <p className="text-slate-700 mt-2">{faq.answer}</p>
                          </details>
                        ))
                      ) : (
                        <>
                          <details className="text-base bg-slate-50 p-3 rounded-md">
                            <summary className="font-semibold text-slate-800 cursor-pointer">What is {product.name}?</summary>
                            <p className="text-slate-700 mt-2">{product.name} is a {product.category} from Chitra Crop Science for crop health.</p>
                          </details>
                          <details className="text-base bg-slate-50 p-3 rounded-md">
                            <summary className="font-semibold text-slate-800 cursor-pointer">How to use {product.name}?</summary>
                            <p className="text-slate-700 mt-2">{product.applicationMethod || product.application_method || "Follow recommended dosage and method"}</p>
                          </details>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Chitra Crop Science, I'd like to inquire about ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold py-6">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Get WhatsApp Inquiry
                  </Button>
                </a>
                <a href="/brochure.pdf" download="Chitra_Crop_Science_Brochure.pdf">
                  <Button variant="outline" className="w-full text-base font-semibold border-slate-300 py-6">
                    <Download className="h-5 w-5 mr-2" />
                    Download Product Brochure
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              Related Products
              <ArrowRight className="h-6 w-6 text-emerald-600" />
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p: any) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="group">
                  <div className="bg-white rounded-lg border border-slate-200 p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={resolveAsset(p.images?.[0])} 
                        alt={p.name} 
                        className="w-32 h-32 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = resolveAsset("/src/assets/product-fertilizer.jpg");
                        }}
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-sm text-slate-500">{p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Features / Benefits */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              Product Formulation Features
            </h3>
            <ul className="space-y-3 text-base text-slate-700">
              {featureItems.length > 0 ? (
                featureItems.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))
              ) : keyBenefitItems.length > 0 ? (
                keyBenefitItems.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>High-quality formulation</span>
                </li>
              )}
            </ul>
          </div>
          
          {/* Agronomic Advantages */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              Agronomic Advantages & Benefits
            </h3>
            <ul className="space-y-3 text-base text-slate-700">
              {product.agronomicBenefits && product.agronomicBenefits.length > 0 ? (
                product.agronomicBenefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Enhanced uptake and translocation across different crops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Ensures crop protection with minimal environmental footprint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Leaves no harmful residues on treated produce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Compatible with tank mixes & multiple inputs</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Footer small info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center gap-2">
              <span className="h-6 w-6 rounded-full border border-red-200 flex items-center justify-center text-sm font-bold text-red-600">!</span>
              SAFETY HANDLING MEASURES
            </h3>
            <ul className="text-base text-slate-700 space-y-2">
              {safetyMeasures.length > 0 ? (
                safetyMeasures.map((measure: string, i: number) => (
                  <li key={i}>• {measure}</li>
                ))
              ) : product.safety_precautions ? (
                <li>{product.safety_precautions}</li>
              ) : (
                <>
                  <li>• Wear safety glasses and protective gloves before application</li>
                  <li>• Keep away from food & animal feed</li>
                  <li>• Do not mix with strong acid & bleach</li>
                  <li>• Wash hands with soap after use</li>
                  <li>• Store in a cool, dry and well-ventilated place; away from direct sunlight</li>
                </>
              )}
            </ul>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              STORAGE & DISPOSAL
            </h3>
            <p className="text-base text-slate-700">
              {product.storageInstructions || product.storage_instructions || "Store in original containers in cool, dry, well-ventilated areas away from food, feed, seeds and from children & pets."}
            </p>
            <p className="text-sm text-slate-600 mt-3">
              Disposal: Follow local disposal regulations
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ProductDetail;
