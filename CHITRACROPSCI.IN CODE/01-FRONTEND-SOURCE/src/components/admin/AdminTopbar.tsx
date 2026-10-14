import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

const sectionTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/products": "Products",
  "/admin/categories": "Categories",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
  "/admin/leads": "Leads",
  "/admin/blog": "Blog",
  "/admin/gallery": "Gallery",
  "/admin/testimonials": "Testimonials",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

interface AdminTopbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export function AdminTopbar({ setSidebarOpen }: AdminTopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentTitle = useMemo(() => {
    return sectionTitles[location.pathname] || "Admin Panel";
  }, [location.pathname]);

  const adminUser = JSON.parse(localStorage.getItem("admin_user") || '{"name": "Admin", "email": "admin@example.com", "full_name": "Admin"}');

  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-white border-b border-slate-200 px-4 md:px-8 shadow-sm">
      {/* Left side: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#2E7D32] mb-0.5">
            Management
          </p>
          <h1 className="text-xl font-bold text-slate-900">{currentTitle}</h1>
        </div>
        {/* Mobile Title */}
        <h1 className="sm:hidden text-lg font-bold text-slate-900">{currentTitle}</h1>
      </div>

      {/* Right side: Search & User */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <Input placeholder="Search..." className="rounded-full bg-slate-50 border-slate-200 focus-visible:ring-[#2E7D32]" />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              {(adminUser.full_name || adminUser.name)?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-semibold text-slate-900">{adminUser.full_name || adminUser.name || 'Admin'}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500 hidden lg:block" />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setUserMenuOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{adminUser.full_name || adminUser.name || 'Admin'}</p>
                  <p className="text-xs text-slate-500 truncate">{adminUser.email || 'admin@example.com'}</p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
