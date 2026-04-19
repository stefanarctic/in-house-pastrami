import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/data/menu";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
}

interface CartState {
  lines: CartLine[];
  add: (item: MenuItem, quantity?: number, notes?: string) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (item, quantity = 1, notes) =>
        set((state) => {
          const existing = state.lines.find((l) => l.id === item.id && (l.notes ?? "") === (notes ?? ""));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              { id: item.id, name: item.name, price: item.price, image: item.image, quantity, notes },
            ],
          };
        }),
      remove: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== id)
              : state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
      totalItems: () => get().lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: () => get().lines.reduce((s, l) => s + l.quantity * l.price, 0),
    }),
    { name: "ihp-cart" },
  ),
);
