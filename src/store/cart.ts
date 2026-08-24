import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/data/menu";
import { resolveMenuImage } from "@/data/menu";
import { sgrTotalRon } from "@/lib/sgr";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
  sgr?: boolean;
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
  syncFromMenu: (items: MenuItem[]) => void;
  totalItems: () => number;
  itemsSubtotal: () => number;
  sgrTotal: () => number;
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
                image: item.image || resolveMenuImage(item.imageKey, item.id),
                quantity,
                notes,
                sgr: item.sgr === true,
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
      syncFromMenu: (items) =>
        set((state) => {
          const byId = new Map(items.map((item) => [item.id, item]));
          return {
            lines: state.lines.flatMap((line) => {
              const item = byId.get(line.id);
              if (!item) return [line];
              if (item.available === false) return [];
              return [
                {
                  ...line,
                  name: item.name,
                  price: item.price,
                  image: item.image || resolveMenuImage(item.imageKey, item.id),
                  sgr: item.sgr === true,
                },
              ];
            }),
          };
        }),
      totalItems: () => get().lines.reduce((s, l) => s + l.quantity, 0),
      itemsSubtotal: () => get().lines.reduce((s, l) => s + l.quantity * l.price, 0),
      sgrTotal: () => sgrTotalRon(get().lines),
      subtotal: () => {
        const state = get();
        return Math.round((state.itemsSubtotal() + state.sgrTotal()) * 100) / 100;
      },
    }),
    {
      name: "ihp-cart",
      version: 4,
      migrate: (persisted) => {
        const state = persisted as { lines?: CartLine[] };
        if (!state.lines) return persisted;
        return {
          lines: state.lines.map((line) => ({
            ...line,
            image: line.image || resolveMenuImage(undefined, line.id),
          })),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.lines = state.lines.map((line) => ({
          ...line,
          image: line.image || resolveMenuImage(undefined, line.id),
        }));
      },
    },
  ),
);
