import { getFirestoreDocument, listFirestoreDocuments } from "@/lib/firestore-rest";
import { MENU_ITEMS_COLLECTION, parsePosCode, type MenuItemDoc } from "@/lib/menu-types";
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
    pos: parsePosCode(data.pos) ?? parsePosCode(data.sku),
    price: data.price,
    weightGrams: typeof data.weightGrams === "number" ? data.weightGrams : undefined,
    shortDesc: typeof data.shortDesc === "string" ? data.shortDesc : "",
    longDesc: typeof data.longDesc === "string" ? data.longDesc : "",
    ingredients: Array.isArray(data.ingredients) ? data.ingredients.map(String) : [],
    allergens: Array.isArray(data.allergens) ? data.allergens.map(String) : undefined,
    tag: typeof data.tag === "string" ? data.tag : undefined,
    kcal: typeof data.kcal === "number" ? data.kcal : undefined,
    imageKey: typeof data.imageKey === "string" ? data.imageKey : id,
    available: data.available !== false,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
    sgr: data.sgr === true,
    updatedAt: data.updatedAt,
  };
}

export async function getMenuItemDocById(id: string): Promise<MenuItemDoc | null> {
  const doc = await getFirestoreDocument(MENU_ITEMS_COLLECTION, id);
  if (!doc) return null;
  return parseMenuItemDoc(doc.id, doc.data);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const doc = await getMenuItemDocById(id);
  return doc ? menuItemFromDoc(doc) : null;
}

export async function listMenuItemDocs(options?: {
  availableOnly?: boolean;
}): Promise<MenuItemDoc[]> {
  const docs = await listFirestoreDocuments(MENU_ITEMS_COLLECTION);
  const items: MenuItemDoc[] = [];
  for (const doc of docs) {
    const parsed = parseMenuItemDoc(doc.id, doc.data);
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
