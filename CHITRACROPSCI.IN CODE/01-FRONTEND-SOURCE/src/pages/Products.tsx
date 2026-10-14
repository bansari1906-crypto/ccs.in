
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resolveAsset } from "@/lib/assetMap";
import staticProductCatalog from "@/data/product-catalog.json";
import { COMPANY_CONTACT } from "@/lib/constants";
import { motion } from "framer-motion";
import { SeoSchema } from "@/components/SeoSchema";

// Exact category list as requested
const CATEGORIES = [
    "All Products",
    "INSECTICIDE",
    "FUNGICIDE",
    "HERBICIDE",
    "PGR",
    "FERTILIZER"
];

const Products = () => {
    const products = staticProductCatalog;
    const siteUrl = "https://chitracropscience.in";
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { categoryOrSlug } = useParams();
    const searchQuery = searchParams.get("search") || "";
    const categoryFromQuery = searchParams.get("category");
    const sortQuery = searchParams.get("sort") || "name-asc";
    const [search, setSearch] = useState(searchQuery);
    
    // Determine initial category from param or search params
    const getInitialCategory = () => {
        if (categoryOrSlug) {
            const normalizedParam = categoryOrSlug.toUpperCase();
            if (CATEGORIES.includes(normalizedParam)) {
                return normalizedParam;
            }
        }
        return categoryFromQuery || "All Products";
    };
    
    const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
    const [selectedSort, setSelectedSort] = useState(sortQuery);

    // Sync URL params to state
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setSelectedSort(searchParams.get("sort") || "name-asc");
        
        if (categoryOrSlug) {
            const normalizedParam = categoryOrSlug.toUpperCase();
            if (CATEGORIES.includes(normalizedParam)) {
                setSelectedCategory(normalizedParam);
            }
        } else if (categoryFromQuery) {
            setSelectedCategory(categoryFromQuery);
        }
    }, [searchParams, categoryOrSlug]);

    const filteredAndSorted = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== "All Products") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search
        const s = search.trim().toLowerCase();
        if (s) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(s) ||
                (p.overview ?? "").toLowerCase().includes(s) ||
                (p.category ?? "").toLowerCase().includes(s)
            );
        }

        // Sort
        if (selectedSort === "name-asc") {
            result.sort((a, b) => a.name.trim().localeCompare(b.name.trim(), undefined, { sensitivity: "base", numeric: true }));
        } else if (selectedSort === "name-desc") {
            result.sort((a, b) => b.name.trim().localeCompare(a.name.trim(), undefined, { sensitivity: "base", numeric: true }));
        }

        return result;
    }, [products, search, selectedCategory, selectedSort]);

    const collectionSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: selectedCategory === "All Products" ? "Crop Protection, Fertilizer & Bio-stimulant Products" : `${selectedCategory} Products`,
        url: `${siteUrl}/products`,
        description: "Browse insecticides, fungicides, herbicides, fertilizers, micronutrients, and bio-stimulants for Indian agriculture.",
    }), [selectedCategory]);

    const itemListSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: filteredAndSorted.length,
        itemListElement: filteredAndSorted.slice(0, 50).map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/products/${product.slug}`,
            name: product.name
        }))
    }), [filteredAndSorted]);

    // Update URL when state changes
    const updateSearchParams = (newSearch: string, newCategory: string, newSort: string) => {
        const params = new URLSearchParams();
        if (newSearch) params.set("search", newSearch);
        if (newCategory !== "All Products") params.set("category", newCategory);
        if (newSort !== "name-asc") params.set("sort", newSort);
        setSearchParams(params);
    };

    const getWhatsAppUrl = (product: any) => {
        const message = `Hi! I'm interested in ${product.name} from Chitra Crop Science.`;
        const encoded = encodeURIComponent(message);
        return `https://wa.me/918000450380?text=${encoded}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <SeoSchema type="CollectionPage" data={collectionSchema} />
            <SeoSchema type="ItemList" data={itemListSchema} />
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-900 via-green-800 to-slate-900 py-20 md:py-28">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-2 bg-emerald-600/30 backdrop-blur-sm rounded-full text-sm font-medium uppercase tracking-wider mb-6 border border-emerald-400/30">
                                Our Products
                            </span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                                Premium Crop Solutions
                            </h1>
                            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
                                High-quality agricultural products for maximum yield and sustainable farming.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="container py-16 md:py-24">
                {/* Filters Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {CATEGORIES.map((cat, i) => {
                            const isSelected = selectedCategory === cat;
                            const linkPath = cat === "All Products" ? "/products" : `/products/${cat.toLowerCase()}`;
                            return (
                                <Link
                                    key={cat}
                                    to={linkPath}
                                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${isSelected
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                                        : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                                        }`}
                                >
                                    {cat}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Search and Sort */}
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input
                                    placeholder="Search products by name, category, or description..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        updateSearchParams(e.target.value, selectedCategory, selectedSort);
                                    }}
                                    className="pl-12 bg-slate-50 border-slate-200 rounded-2xl h-14 text-base"
                                />
                            </div>
                            <select
                                value={selectedSort}
                                onChange={(e) => {
                                    setSelectedSort(e.target.value);
                                    updateSearchParams(search, selectedCategory, e.target.value);
                                }}
                                className="px-6 py-4 border border-slate-200 rounded-2xl bg-white text-base text-slate-700 h-14"
                            >
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                                <option value="default">Catalog Order</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                {filteredAndSorted.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAndSorted.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group">
                                    {/* Product Image */}
                                    <div className="relative p-8 bg-gradient-to-br from-slate-50 to-emerald-50 aspect-[4/3] flex items-center justify-center">
                                        <img
                        src={resolveAsset(product.images?.[0])}
                        alt={product.name}
                        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = resolveAsset("/src/assets/product-fertilizer.jpg");
                        }}
                      />
                                        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {product.category}
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                                            {product.overview}
                                        </p>

                                        {/* Target Crops */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(product.target_crops || product.suitableCrops || product.targetCrops || []).slice(0, 4).map((crop: string, j: number) => (
                                                <span
                                                    key={j}
                                                    className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium"
                                                >
                                                    {crop}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/products/${product.slug}`}
                                                className="flex-1"
                                            >
                                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-6 text-sm font-semibold group/btn">
                                                    <span>View Details</span>
                                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                            <a
                                                href={getWhatsAppUrl(product)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl py-6">
                                                    <MessageSquare className="w-5 h-5" />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
                        <Sparkles className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Products Found</h3>
                        <p className="text-slate-600">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
