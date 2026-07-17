import type { Category } from "@/data/menu";

/** Firestore document shape for `menuItems/{id}` */
export interface MenuItemDoc {
  id: string;
  name: string;
  category: Category;
  sku?: string;
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
