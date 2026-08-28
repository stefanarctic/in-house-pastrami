import type { MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";
import { useUpsell } from "@/store/upsell";
import { useMenuItems } from "@/hooks/useMenuItems";
import { getCartUpsell, shouldStartUpsell } from "@/lib/upsell";
import { formatLei, SGR_AMOUNT_RON } from "@/lib/sgr";
import { toast } from "sonner";

export function useAddToCart() {
  const add = useCart((s) => s.add);
  const startUpsell = useUpsell((s) => s.start);
  const { data: menu = [] } = useMenuItems({ availableOnly: true });

  return (item: MenuItem, quantity = 1, notes?: string, opts?: { upsellDelayMs?: number }) => {
    add(item, quantity, notes);
    toast.success(`${quantity > 1 ? `${quantity} × ` : ""}${item.name} adăugat`, {
      description: `${formatLei(quantity * (item.price + (item.sgr ? SGR_AMOUNT_RON : 0)))} lei`,
    });

    if (!shouldStartUpsell(item) || !menu.length) return;

    const cartIds = new Set(useCart.getState().lines.map((line) => line.id));
    if (!getCartUpsell(menu, cartIds, new Set())) return;

    startUpsell(opts?.upsellDelayMs ?? 0);
  };
}
