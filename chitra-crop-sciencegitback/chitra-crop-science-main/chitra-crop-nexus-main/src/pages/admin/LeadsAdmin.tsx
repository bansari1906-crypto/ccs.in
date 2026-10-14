import { useEffect, useMemo, useState } from "react";
import { Search, Mail, Phone, MessageCircle, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Lead {
  id: number;
  customer_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  state: string | null;
  product: string | null;
  message: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "follow_up", label: "Follow-up" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [notesForm, setNotesForm] = useState("");
  const [statusForm, setStatusForm] = useState("");

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get("/leads/");
      setLeads(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Could not load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery =
        !q ||
        [lead.customer_name, lead.phone, lead.email, lead.product, lead.city]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setNotesForm(lead.notes || "");
    setStatusForm(lead.status);
    setIsSheetOpen(true);
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setUpdating(true);
    try {
      await api.patch(`/leads/${selectedLead.id}/`, {
        notes: notesForm,
        status: statusForm,
      });
      toast.success("Lead updated successfully");
      setIsSheetOpen(false);
      await loadLeads();
    } catch (error) {
      toast.error("Failed to update lead");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "destructive";
      case "contacted":
        return "secondary";
      case "follow_up":
        return "default";
      case "converted":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Leads & Inquiries"
        description="Manage customer inquiries, product requests, and lead statuses."
        actionText="Sync Inquiries"
        actionIcon={<CheckCircle className="h-4 w-4" />}
        onAction={loadLeads}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, phone, city..."
              className="pl-9 bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full md:w-auto rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product / Interest</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{lead.customer_name}</div>
                      <div className="text-xs text-slate-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.product || "General Inquiry"}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {lead.city ? `${lead.city}${lead.state ? `, ${lead.state}` : ""}` : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusColor(lead.status)}>
                        {lead.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline" onClick={() => openLeadDetails(lead)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Lead Details</SheetTitle>
            <SheetDescription>Review inquiry and manage lead status.</SheetDescription>
          </SheetHeader>
          
          {selectedLead && (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border bg-slate-50 p-4 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Customer Info</h4>
                  <p className="font-medium text-slate-900">{selectedLead.customer_name}</p>
                  <p className="text-sm text-slate-600">{selectedLead.phone}</p>
                  {selectedLead.email && <p className="text-sm text-slate-600">{selectedLead.email}</p>}
                </div>
                
                {(selectedLead.city || selectedLead.state) && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Location</h4>
                    <p className="text-sm text-slate-900">
                      {selectedLead.city} {selectedLead.state && `, ${selectedLead.state}`}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => window.open(`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`, '_blank')}>
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
                <Button className="flex-1 gap-2 bg-slate-900 hover:bg-slate-800" onClick={() => window.open(`tel:${selectedLead.phone}`, '_self')}>
                  <Phone className="h-4 w-4" /> Call
                </Button>
                {selectedLead.email && (
                  <Button variant="outline" size="icon" onClick={() => window.open(`mailto:${selectedLead.email}`, '_blank')}>
                    <Mail className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Inquiry Info</h4>
                <div className="rounded-xl border p-3 text-sm text-slate-700 bg-white">
                  <span className="font-medium">Product:</span> {selectedLead.product || "General"}
                  {selectedLead.message && (
                    <div className="mt-2 pt-2 border-t text-slate-600">
                      "{selectedLead.message}"
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" /> Admin Notes
                </h4>
                <div>
                  <Label htmlFor="status">Lead Status</Label>
                  <select
                    id="status"
                    value={statusForm}
                    onChange={(e) => setStatusForm(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    value={notesForm}
                    onChange={(e) => setNotesForm(e.target.value)}
                    placeholder="Add follow up notes here..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleUpdateLead} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={updating}>
                  {updating ? "Saving..." : "Save Lead Updates"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
