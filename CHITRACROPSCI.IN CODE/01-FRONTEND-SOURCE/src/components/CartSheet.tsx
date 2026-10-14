import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { resolveAsset } from "@/lib/assetMap";

export function CartSheet() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const total = getCartTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded border bg-muted">
                      {item.image ? (
                        <img
                          src={resolveAsset(item.image)}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="line-clamp-1 font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Button asChild className="w-full gradient-leaf" size="lg">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
