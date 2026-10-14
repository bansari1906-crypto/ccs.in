
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "./components/layout/SiteLayout";
import AdminLayout from "./components/layout/AdminLayout";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import CustomersAdmin from "./pages/admin/CustomersAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import AnalyticsAdmin from "./pages/admin/AnalyticsAdmin";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import staticProductCatalog from "@/data/product-catalog.json";

const queryClient = new QueryClient();

const CATEGORIES = [
    "insecticide",
    "fungicide",
    "herbicide",
    "pgr",
    "fertilizer"
];

const CategoryOrProduct = () => {
    const { categoryOrSlug } = useParams();
    
    if (categoryOrSlug && CATEGORIES.includes(categoryOrSlug.toLowerCase())) {
        return <Products />;
    }
    
    return <ProductDetail />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categoryOrSlug" element={<CategoryOrProduct />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Navigate to="/admin/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="leads" element={<LeadsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="customers" element={<CustomersAdmin />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="analytics" element={<AnalyticsAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
