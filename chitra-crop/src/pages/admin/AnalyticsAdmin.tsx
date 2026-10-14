import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getProducts, getLeads, getOrders, getCustomers } from "@/lib/adminDataStore";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#64748b"];

export default function AnalyticsAdmin() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const products = getProducts();
      const leads = getLeads();
      const orders = getOrders();
      const customers = getCustomers();

      // Calculate category-wise product count
      const categoryCounts: Record<string, number> = {};
      products.forEach((p) => {
        const cat = p.category || "Uncategorized";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      const pieData = Object.entries(categoryCounts).map(([name, count]) => ({
        name: name.toUpperCase(),
        value: count,
      }));

      setData({
        total_products: products.length,
        total_leads: leads.length,
        total_orders: orders.length,
        total_customers: customers.length,
        total_new_leads: 0,
        total_contacted_leads: 0,
        recent_leads: leads.slice(-5),
        pie_data: pieData,
      });
    } catch (error) {
      console.error("Failed to load analytics", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-slate-500">Loading analytics...</div>;
  }

  return (
    <section>
      <AdminPageHeader
        title="Analytics & Reports"
        description="Detailed insights into products, leads, and customer trends."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Products</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{data.total_products}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Leads</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">{data.total_leads}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{data.total_orders}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Customers</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{data.total_customers}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Products by Category</h3>
            <div className="h-[300px] w-full">
              {data.pie_data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.pie_data}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.pie_data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  No category data available
                </div>
              )}
            </div>
            {data.pie_data.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {data.pie_data.map((entry: any, index: number) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-slate-600 font-medium">{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Leads</h3>
            <div className="space-y-4">
              {data.recent_leads?.length > 0 ? (
                data.recent_leads.map((lead: any) => (
                  <div key={lead.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{lead.customer_name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{lead.product || "General Inquiry"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-6">No recent leads found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}