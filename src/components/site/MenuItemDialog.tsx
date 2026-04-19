import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Flame, ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export function MenuItemDialog({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const add = useCart((s) => s.add);

  if (!item) return null;

  const handleAdd = () => {
    add(item, qty, notes.trim() || undefined);
    toast.success(`${qty} × ${item.name} added`, {
      description: `${(qty * item.price).toFixed(0)} lei`,
    });
    onOpenChange(false);
    setQty(1);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border/60 max-h-[90vh] grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2 gap-0">
          <div className="relative h-48 md:h-auto bg-muted">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            {item.tag && (
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest px-2 py-1 bg-primary text-primary-foreground rounded">
                {item.tag}
              </span>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col overflow-y-auto min-h-0">
            <DialogTitle className="font-display text-3xl md:text-4xl leading-none">
              {item.name}
            </DialogTitle>
            <div className="mt-2 font-display text-2xl text-accent">{item.price} lei</div>

            <DialogDescription className="mt-4 text-foreground/80 text-base leading-relaxed">
              {item.longDesc}
            </DialogDescription>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest text-accent mb-2">What's in it</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {item.ingredients.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">·</span> {i}
                  </li>
                ))}
              </ul>
            </div>

            {(item.allergens?.length || item.kcal) && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {item.kcal && (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1">
                    <Flame className="h-3 w-3" /> {item.kcal} kcal
                  </span>
                )}
                {item.allergens?.map((a) => (
                  <span key={a} className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {a}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="notes" className="text-xs uppercase tracking-widest text-accent block mb-2">
                Special instructions
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="No pickles, extra mustard…"
                rows={2}
                className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-md">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 grid place-items-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-10 w-10 grid place-items-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={handleAdd}
                size="lg"
                className="flex-1 bg-gradient-meat shadow-meat hover:opacity-95 h-12"
              >
                <ShoppingBag className="h-4 w-4" />
                Add {qty > 1 ? `${qty} ` : ""}· {(qty * item.price).toFixed(0)} lei
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
