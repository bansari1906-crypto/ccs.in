
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resolveAsset } from "@/lib/assetMap";
import { normalizeCategorySlug } from "@/lib/productCatalog";
import { useProducts } from "@/hooks/useProducts";

const PAGE_SIZE = 12;

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const activeCategory = params.get("category") ?? "";
  
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats).map(name => ({ id: name, name, slug: normalizeCategorySlug(name) }));
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) {
      result = result.filter(p => normalizeCategorySlug(p.category) === activeCategory);
    }
    const s = search.trim().toLowerCase();
    if (s) {
      result = result.filter((p) => p.name.toLowerCase().includes(s) || (p.overview ?? "").toLowerCase().includes(s) || (p.category ?? "").toLowerCase().includes(s));
    }
    return result;
  }, [products, search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [search, activeCategory]);

  return (
    <section className="container py-12 md:py-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-green-700">Our Products</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold">Agricultural Products</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground text-lg">
          Complete range of premium pesticides, insecticides, fertilizers, and bio-stimulants for farmers in Gujarat and Rajasthan.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products by name, category or benefit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="lg"
            variant={!activeCategory ? "default" : "outline"}
            onClick={() => setParams({})}
            className={!activeCategory ? "bg-green-700 hover:bg-green-800" : ""}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              size="lg"
              variant={activeCategory === c.slug ? "default" : "outline"}
              onClick={() => setParams({ category: c.slug })}
              className={activeCategory === c.slug ? "bg-green-700 hover:bg-green-800" : ""}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
          Loading products...
        </div>
      ) : pageItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
          No products match your filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden bg-white p-6 flex items-center justify-center">
                <img src={resolveAsset(p.images?.[0])} alt={p.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-6 border-t border-border">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">{p.category}</p>
                <h3 className="font-serif text-xl font-semibold leading-tight mb-3">{p.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground flex-1 mb-4">{p.overview}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-green-700 flex items-center gap-1">
                    → Get Quote
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3">
          <Button variant="outline" size="lg" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="text-base text-muted-foreground font-medium">Page {page} of {totalPages}</span>
          <Button variant="outline" size="lg" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </section>
  );
};

export default Products;

