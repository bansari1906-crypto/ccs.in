import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Grid,
  ImageIcon,
  Layers,
  LogOut,
  MessageSquare,
  Package,
  PackageSearch,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", to: "/admin/dashboard", icon: Grid },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Products", to: "/admin/products", icon: Package },
      { label: "Categories", to: "/admin/categories", icon: Layers },
      { label: "Orders", to: "/admin/orders", icon: PackageSearch },
      { label: "Customers", to: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Leads", to: "/admin/leads", icon: MessageSquare },
      { label: "Blog", to: "/admin/blog", icon: BookOpen },
      { label: "Gallery", to: "/admin/gallery", icon: ImageIcon },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    isActive 
      ? "bg-[#2E7D32]/10 text-[#2E7D32] shadow-sm border-l-[3px] border-[#2E7D32]" 
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`;

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-[260px] bg-slate-900 border-r border-slate-800 flex flex-col transition-transform z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
          <Link to="/admin" className="flex items-center gap-3 text-lg font-bold text-white">
            <div className="p-2 bg-[#2E7D32] rounded-lg">
              <Grid className="h-5 w-5 text-white" />
            </div>
            <span>Chitra Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 py-2 text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={getNavClass}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
