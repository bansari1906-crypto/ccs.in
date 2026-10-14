import { useEffect, useMemo, useState } from "react";
import { Search, Edit, Trash2, UserPlus } from "lucide-react";
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

interface Customer {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  is_active: boolean;
  created_at: string;
}

const defaultForm = {
  full_name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  is_active: true,
};

export default function CustomersAdmin() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/customers/");
      setCustomers(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Could not load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers.filter((c) => {
      return (
        !q ||
        [c.full_name, c.phone, c.email, c.city, c.state]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [customers, search]);

  const openAddSheet = () => {
    setSelectedCustomer(null);
    setForm(defaultForm);
    setIsSheetOpen(true);
  };

  const openEditSheet = (customer: Customer) => {
    setSelectedCustomer(customer);
    setForm({
      full_name: customer.full_name,
      phone: customer.phone,
      email: customer.email || "",
      address: customer.address || "",
      city: customer.city || "",
      state: customer.state || "",
      is_active: customer.is_active,
    });
    setIsSheetOpen(true);
  };

  const handleFieldChange = (key: keyof typeof defaultForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (selectedCustomer?.id) {
        await api.patch(`/customers/${selectedCustomer.id}/`, form);
        toast.success("Customer updated");
      } else {
        await api.post("/customers/", form);
        toast.success("Customer created");
      }
      setIsSheetOpen(false);
      await loadCustomers();
    } catch (error) {
      toast.error("Failed to save customer");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}/`);
      toast.success("Customer deleted");
      await loadCustomers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Customer Directory"
        description="Manage your registered customers and their contact information."
        actionText="Add Customer"
        actionIcon={<UserPlus className="h-4 w-4" />}
        onAction={openAddSheet}
      />

      <Card className="rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers by name, phone, or location..."
              className="pl-9 bg-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading customers...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{customer.full_name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{customer.phone}</div>
                      <div className="text-xs text-slate-500">{customer.email || "—"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {customer.city ? `${customer.city}${customer.state ? `, ${customer.state}` : ""}` : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={customer.is_active ? "secondary" : "outline"}>
                        {customer.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditSheet(customer)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
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
            <SheetTitle>{selectedCustomer ? "Update Customer" : "Add New Customer"}</SheetTitle>
            <SheetDescription>Enter the customer's contact details.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={form.full_name}
                onChange={(e) => handleFieldChange("full_name", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="is_active">Status</Label>
                <select
                  id="is_active"
                  value={form.is_active ? "true" : "false"}
                  onChange={(e) => handleFieldChange("is_active", e.target.value === "true")}
                  className="mt-2 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={form.state}
                  onChange={(e) => handleFieldChange("state", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                {saving ? "Saving..." : selectedCustomer ? "Update Customer" : "Create Customer"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
