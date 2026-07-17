import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase-web";
import { MENU_ITEMS_COLLECTION, type MenuItemDoc } from "@/lib/menu-types";
import { menuItemFromDoc, type MenuItem } from "@/data/menu";

function parseMenuItemDoc(id: string, data: DocumentData): MenuItemDoc | null {
  if (
    typeof data.name !== "string" ||
    typeof data.category !== "string" ||
    typeof data.price !== "number"
  ) {
    return null;
  }

  return {
    id,
    name: data.name,
    category: data.category as MenuItemDoc["category"],
    sku: typeof data.sku === "string" ? data.sku : undefined,
    price: data.price,
    shortDesc: typeof data.shortDesc === "string" ? data.shortDesc : "",
    longDesc: typeof data.longDesc === "string" ? data.longDesc : "",
    ingredients: Array.isArray(data.ingredients) ? data.ingredients.map(String) : [],
    allergens: Array.isArray(data.allergens) ? data.allergens.map(String) : undefined,
    tag: typeof data.tag === "string" ? data.tag : undefined,
    kcal: typeof data.kcal === "number" ? data.kcal : undefined,
    imageKey: typeof data.imageKey === "string" ? data.imageKey : id,
    available: data.available !== false,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
    updatedAt: data.updatedAt,
  };
}

export async function fetchMenuItemsClient(options?: {
  availableOnly?: boolean;
}): Promise<MenuItem[]> {
  const q = query(
    collection(getClientFirestore(), MENU_ITEMS_COLLECTION),
    orderBy("sortOrder", "asc"),
  );
  const snap = await getDocs(q);
  const items: MenuItem[] = [];
  for (const d of snap.docs) {
    const parsed = parseMenuItemDoc(d.id, d.data());
    if (!parsed) continue;
    if (options?.availableOnly && !parsed.available) continue;
    items.push(menuItemFromDoc(parsed));
  }
  return items;
}

export async function fetchMenuItemDocsClient(): Promise<MenuItemDoc[]> {
  const q = query(
    collection(getClientFirestore(), MENU_ITEMS_COLLECTION),
    orderBy("sortOrder", "asc"),
  );
  const snap = await getDocs(q);
  const items: MenuItemDoc[] = [];
  for (const d of snap.docs) {
    const parsed = parseMenuItemDoc(d.id, d.data());
    if (parsed) items.push(parsed);
  }
  return items;
}

export async function fetchMenuItemDocClient(id: string): Promise<MenuItemDoc | null> {
  const snap = await getDoc(doc(getClientFirestore(), MENU_ITEMS_COLLECTION, id));
  if (!snap.exists()) return null;
  return parseMenuItemDoc(snap.id, snap.data());
}

export async function saveMenuItemDoc(item: MenuItemDoc): Promise<void> {
  const { updatedAt: _ignored, ...rest } = item;
  await setDoc(
    doc(getClientFirestore(), MENU_ITEMS_COLLECTION, item.id),
    {
      ...rest,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
