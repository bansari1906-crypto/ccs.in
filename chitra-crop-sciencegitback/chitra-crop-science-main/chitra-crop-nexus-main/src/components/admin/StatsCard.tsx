import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-[#F6F8F7] rounded-xl group-hover:bg-[#2E7D32]/10 transition-colors">
            <Icon className="h-6 w-6 text-[#2E7D32]" />
          </div>
          {trend && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
