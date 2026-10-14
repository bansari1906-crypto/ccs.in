import { useEffect, useState } from "react";
import { ChevronDown, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";

type Order = {
  id: number;
  user_name?: string;
  product_name?: string;
  quantity: number;
  status: string;
  tracking_number?: string;
  shipping_notes?: string;
  created_at?: string;
};

const statusOptions = ["Pending", "Approved", "Shipped", "Delivered"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/");
      setOrders(response.data.results || response.data || []);
    } catch (error) {
      toast.error("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      [order.user_name, order.product_name, order.status, order.tracking_number]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  });

  const updateOrder = async (id: number, data: Partial<Order>) => {
    try {
      const response = await api.patch(`/orders/${id}/`, data);
      setOrders((current) => current.map((order) => (order.id === id ? { ...order, ...response.data } : order)));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, ...response.data } : prev);
      toast.success("Order updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const changeStatus = (order: Order, status: string) => {
    updateOrder(order.id, { status });
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Order management</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Track order flow and shipping status</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">Review invoices, update shipping details, and keep customers informed in real time.</p>
          </div>
          <Button onClick={loadOrders} className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
            <RefreshCw className="h-4 w-4" /> Refresh orders
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Order list</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_240px]">
              <Input placeholder="Search by customer, product or status" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    {['Order #', 'Customer', 'Product', 'Qty', 'Status', 'Created', 'Actions'].map((heading) => (
                      <th key={heading} className="px-4 py-4 font-medium">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y bg-white">
                  {loading ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">Loading orders...</td></tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">No orders found.</td></tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-semibold text-slate-900">#{order.id}</td>
                        <td className="px-4 py-4">{order.user_name || 'Unknown'}</td>
                        <td className="px-4 py-4">{order.product_name || 'Unlinked'}</td>
                        <td className="px-4 py-4">{order.quantity}</td>
                        <td className="px-4 py-4"><Badge variant={order.status === 'Delivered' ? 'secondary' : 'outline'}>{order.status}</Badge></td>
                        <td className="px-4 py-4 text-slate-500">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" onClick={() => setSelected(order)}>
                            <ChevronDown className="h-4 w-4" /> View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Order details</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? (
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Order #{selected.id}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{selected.product_name}</h3>
                  <p className="text-sm text-slate-600">Customer: {selected.user_name || '—'}</p>
                </div>
                <div className="grid gap-3">
                  <div>
                    <Label>Status</Label>
                    <select value={selected.status} onChange={(event) => changeStatus(selected, event.target.value)} className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Tracking number</Label>
                    <Input
                      value={selected.tracking_number || ""}
                      onChange={(event) => setSelected((current) => current ? { ...current, tracking_number: event.target.value } : current)}
                      onBlur={() => selected && updateOrder(selected.id, { tracking_number: selected.tracking_number })}
                      placeholder="Enter tracking number"
                    />
                  </div>
                  <div>
                    <Label>Shipping notes</Label>
                    <input
                      value={selected.shipping_notes || ""}
                      onChange={(event) => setSelected((current) => current ? { ...current, shipping_notes: event.target.value } : current)}
                      onBlur={() => selected && updateOrder(selected.id, { shipping_notes: selected.shipping_notes })}
                      className="mt-2 h-28 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Invoice preview</p>
                    <div className="mt-3 space-y-1 text-sm text-slate-700">
                      <p><span className="font-semibold">Product:</span> {selected.product_name}</p>
                      <p><span className="font-semibold">Quantity:</span> {selected.quantity}</p>
                      <p><span className="font-semibold">Status:</span> {selected.status}</p>
                      <p><span className="font-semibold">Tracking:</span> {selected.tracking_number || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                Select an order to view shipping details and update status.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
