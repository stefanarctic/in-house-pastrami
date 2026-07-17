import { getAdminFirestore } from "@/lib/firebase.admin";
import { MENU_ITEMS_COLLECTION, type MenuItemDoc } from "@/lib/menu-types";
import { menuItemFromDoc, type MenuItem } from "@/data/menu";

function parseMenuItemDoc(id: string, data: Record<string, unknown>): MenuItemDoc | null {
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

export async function getMenuItemDocById(id: string): Promise<MenuItemDoc | null> {
  const snap = await getAdminFirestore().collection(MENU_ITEMS_COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return parseMenuItemDoc(snap.id, (snap.data() ?? {}) as Record<string, unknown>);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const doc = await getMenuItemDocById(id);
  return doc ? menuItemFromDoc(doc) : null;
}

export async function listMenuItemDocs(options?: {
  availableOnly?: boolean;
}): Promise<MenuItemDoc[]> {
  const snap = await getAdminFirestore().collection(MENU_ITEMS_COLLECTION).get();
  const items: MenuItemDoc[] = [];
  for (const doc of snap.docs) {
    const parsed = parseMenuItemDoc(doc.id, doc.data() as Record<string, unknown>);
    if (!parsed) continue;
    if (options?.availableOnly && !parsed.available) continue;
    items.push(parsed);
  }
  items.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  return items;
}

export async function listMenuItems(options?: { availableOnly?: boolean }): Promise<MenuItem[]> {
  const docs = await listMenuItemDocs(options);
  return docs.map(menuItemFromDoc);
}
