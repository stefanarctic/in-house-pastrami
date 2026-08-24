import type { Category } from "@/data/menu";

/** Firestore document shape for `menuItems/{id}` */
export interface MenuItemDoc {
  id: string;
  name: string;
  category: Category;
  /** DineHub POS Code from the menu export */
  pos?: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  ingredients: string[];
  allergens?: string[];
  tag?: string;
  kcal?: number;
  imageKey: string;
  available: boolean;
  sortOrder: number;
  updatedAt?: unknown;
}

export const MENU_ITEMS_COLLECTION = "menuItems";

export function parsePosCode(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}
