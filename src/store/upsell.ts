import { create } from "zustand";
import type { UpsellKind } from "@/lib/upsell";

interface UpsellState {
  open: boolean;
  skipped: UpsellKind[];
  start: (delayMs?: number) => void;
  skip: (kind: UpsellKind) => void;
  close: () => void;
}

let startTimer: ReturnType<typeof setTimeout> | undefined;

export const useUpsell = create<UpsellState>((set) => ({
  open: false,
  skipped: [],
  start: (delayMs = 0) => {
    if (startTimer) clearTimeout(startTimer);
    const open = () => set({ open: true, skipped: [] });
    if (delayMs > 0) startTimer = setTimeout(open, delayMs);
    else open();
  },
  skip: (kind) =>
    set((state) =>
      state.skipped.includes(kind) ? state : { skipped: [...state.skipped, kind] },
    ),
  close: () => {
    if (startTimer) clearTimeout(startTimer);
    set({ open: false, skipped: [] });
  },
}));
