import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Flame, ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageProvider";

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
  const { t } = useLanguage();

  if (!item) return null;

  const handleAdd = () => {
    add(item, qty, notes.trim() || undefined);
    toast.success(`${qty} × ${item.name} adăugat`, {
      description: `${(qty * item.price).toFixed(0)} lei`,
    });
    onOpenChange(false);
    setQty(1);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-2xl w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] p-0 overflow-hidden bg-card border-border/60 max-h-[min(90dvh,900px)] grid grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1 md:grid-cols-2 gap-0 rounded-2xl"
      >
        <div className="relative aspect-[16/10] sm:aspect-auto sm:h-44 md:h-auto md:min-h-full bg-muted">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          {item.tag && (
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 bg-primary text-primary-foreground rounded">
              {item.tag}
            </span>
          )}
        </div>

        <div className="flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 sm:p-5 md:p-6 flex-1 overflow-y-auto overscroll-contain min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <DialogTitle className="font-display text-2xl sm:text-3xl leading-none pr-8">
              {item.name}
            </DialogTitle>
            <div className="mt-1.5 font-display text-xl text-accent">{item.price} lei</div>

            <DialogDescription className="mt-3 text-foreground/80 text-sm leading-relaxed">
              {item.longDesc}
            </DialogDescription>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-accent mb-1.5">{t("dialog.whats")}</p>
              <ul className="text-sm text-muted-foreground space-y-0.5">
                {item.ingredients.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">·</span> {i}
                  </li>
                ))}
              </ul>
            </div>

            {(item.allergens?.length || item.kcal) && (
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
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

            <div className="mt-4">
              <label htmlFor="notes" className="text-xs uppercase tracking-widest text-accent block mb-1.5">
                {t("dialog.notes")}
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("dialog.notesPh")}
                rows={2}
                className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 sm:p-4 md:p-5 border-t border-border/40 bg-card pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-4 md:pb-5">
            <div className="flex items-center border border-border rounded-md shrink-0">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-10 grid place-items-center hover:bg-muted transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="h-11 w-10 grid place-items-center hover:bg-muted transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={handleAdd}
              size="lg"
              className="flex-1 bg-gradient-meat shadow-meat hover:opacity-95 h-11 min-w-0"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {t("cta.add")} · {(qty * item.price).toFixed(0)} lei
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
