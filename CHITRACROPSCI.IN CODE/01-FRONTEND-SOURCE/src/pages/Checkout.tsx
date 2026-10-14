import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function Checkout() {
  const { items, getCartTotal } = useCartStore();

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl">Checkout</h1>
            <p className="text-sm text-muted-foreground">Order summary is visible below. Final order processing is handled directly by our team.</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-primary/5 p-5 text-sm text-muted-foreground">
          To complete your order, please contact our team through the inquiry buttons on product pages or use the contact page. This keeps tomorrow's launch simple with the new MySQL backend.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="gradient-leaf text-primary-foreground hover:opacity-90">
            <Link to="/contact">Contact Sales Team</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
