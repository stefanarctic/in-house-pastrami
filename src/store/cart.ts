import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/data/menu";
import { getItem } from "@/data/menu";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
}

export function lineKey(line: Pick<CartLine, "id" | "notes">): string {
  return `${line.id}::${line.notes ?? ""}`;
}

interface CartState {
  lines: CartLine[];
  add: (item: MenuItem, quantity?: number, notes?: string) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
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
          const key = lineKey({ id: item.id, notes });
          const existing = state.lines.find((l) => lineKey(l) === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                lineKey(l) === key ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity,
                notes,
              },
            ],
          };
        }),
      remove: (key) =>
        set((state) => ({ lines: state.lines.filter((l) => lineKey(l) !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => lineKey(l) !== key)
              : state.lines.map((l) => (lineKey(l) === key ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
      totalItems: () => get().lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: () => get().lines.reduce((s, l) => s + l.quantity * l.price, 0),
    }),
    {
      name: "ihp-cart",
      version: 2,
      migrate: (persisted) => {
        const state = persisted as { lines?: CartLine[] };
        if (!state.lines) return persisted;
        return {
          lines: state.lines.map((line) => {
            const item = getItem(line.id);
            return item
              ? { ...line, image: item.image, name: item.name, price: item.price }
              : line;
          }),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.lines = state.lines.map((line) => {
          const item = getItem(line.id);
          return item
            ? { ...line, image: item.image, name: item.name, price: item.price }
            : line;
        });
      },
    },
  ),
);
