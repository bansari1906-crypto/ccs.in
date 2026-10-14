import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import api from "@/lib/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#64748b"];

export default function AnalyticsAdmin() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/admin/dashboard/");
        setData(response.data);
      } catch (error) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-slate-500">Loading analytics...</div>;
  }

  const pieData = data.leads_by_status?.map((item: any) => ({
    name: item.status.replace("_", " ").toUpperCase(),
    value: item.count,
  })) || [];

  return (
    <section>
      <AdminPageHeader
        title="Analytics & Reports"
        description="Detailed insights into leads, inquiries, and customer trends."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Leads</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{data.total_leads}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">New Leads</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">{data.total_new_leads}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-green-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Contacted</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{data.total_contacted_leads}</p>
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
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Leads by Status</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-600 font-medium">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity (Leads)</h3>
            <div className="space-y-4">
              {data.recent_leads?.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{lead.customer_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lead.product || "General Inquiry"}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      lead.status === 'new' ? 'bg-amber-100 text-amber-800' :
                      lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {lead.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
