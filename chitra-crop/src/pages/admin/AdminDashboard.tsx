import { useEffect, useState } from "react";
import { Users, Package, MessageSquare, ShoppingCart, Activity } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { RecentLeadsTable } from "@/components/admin/RecentLeadsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, getLeads, getOrders, getCustomers, getAnalytics } from "@/lib/adminDataStore";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const products = getProducts();
      const leads = getLeads();
      const orders = getOrders();
      const customers = getCustomers();
      
      setStats({
        total_products: products.length,
        total_leads: leads.length,
        total_orders: orders.length,
        total_customers: customers.length,
        recent_leads: leads.slice(-5),
        recent_orders: orders.slice(-5),
        leads_by_status: [],
        total_new_leads: 0,
        total_contacted_leads: 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E7D32] border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const chartData = stats.leads_by_status.map((item: any) => ({
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    count: item.count,
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Stats Row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard 
          title="Total Products" 
          value={stats.total_products} 
          icon={Package} 
        />
        <StatsCard 
          title="Total Customers" 
          value={stats.total_customers} 
          icon={Users} 
        />
        <StatsCard 
          title="Total Leads" 
          value={stats.total_leads} 
          icon={MessageSquare} 
        />
        <StatsCard 
          title="Total Orders" 
          value={stats.total_orders} 
          icon={ShoppingCart} 
        />
      </div>

      {/* Middle Row: Charts and Activity */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3 h-full">
        <div className="xl:col-span-2 min-h-[350px]">
          <DashboardCharts data={chartData} />
        </div>
        
        <div className="xl:col-span-1 flex flex-col h-full">
          <Card className="rounded-2xl border-0 bg-white shadow-sm flex-1">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-gray-800 text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#2E7D32]" />
                Recent Orders Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {stats.recent_orders?.length > 0 ? (
                  stats.recent_orders.map((order: any, i: number) => (
                    <div key={`order-${i}`} className="flex items-start gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#2E7D32]" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">New order for {order.product_name || 'Product'}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Qty: {order.quantity} • {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-6">No recent orders found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row: Recent Leads Table */}
      <div className="w-full">
        <RecentLeadsTable leads={stats.recent_leads} />
      </div>

    </div>
  );
}