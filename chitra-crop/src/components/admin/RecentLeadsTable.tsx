import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface RecentLeadsTableProps {
  leads: any[];
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-red-100 text-red-700 hover:bg-red-200';
      case 'contacted': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'qualified': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'converted': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'lost': return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      default: return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
    }
  };

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <CardHeader className="border-b border-slate-100 pb-4 bg-white">
        <CardTitle className="text-gray-800 text-lg font-bold">Recent Leads</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-600 h-10 py-2 whitespace-nowrap">Name</TableHead>
              <TableHead className="font-semibold text-slate-600 h-10 py-2 whitespace-nowrap">Contact</TableHead>
              <TableHead className="font-semibold text-slate-600 h-10 py-2 whitespace-nowrap">Product</TableHead>
              <TableHead className="font-semibold text-slate-600 h-10 py-2 whitespace-nowrap">Status</TableHead>
              <TableHead className="font-semibold text-slate-600 h-10 py-2 whitespace-nowrap">Date</TableHead>
              <TableHead className="font-semibold text-slate-600 h-10 py-2 text-right whitespace-nowrap">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No recent leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead: any) => (
                <TableRow key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900 py-3">{lead.name}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700">{lead.phone}</span>
                      {lead.email && <span className="text-xs text-slate-500">{lead.email}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 py-3">{lead.product || 'General'}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="secondary" className={`${getStatusColor(lead.status)} border-0 rounded-full font-medium shadow-none`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm py-3">
                    {new Date(lead.created_at || lead.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-[#2E7D32] border-[#2E7D32]/20 hover:bg-[#2E7D32]/10 h-8 px-3"
                      onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\s+/g, '')}?text=Hi%20${lead.name},%20thank%20you%20for%20your%20inquiry%20about%20${lead.product || 'our products'}.`, '_blank')}
                    >
                      <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                      WhatsApp
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
