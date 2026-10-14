import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardChartsProps {
  data: any[];
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="rounded-2xl border-0 bg-white shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-800 text-lg font-bold">Leads by Status</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-[300px] w-full pt-4 flex items-center justify-center">
          <p className="text-sm text-slate-500 text-center">No analytics data available yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-800 text-lg font-bold">Leads by Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="status" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#2E7D32" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
