import type { MenuItem } from "@/data/menu";

export type UpsellKind = "side" | "sauce" | "drink";

export interface UpsellOffer {
  kind: UpsellKind;
  kicker: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const COPY: Record<UpsellKind, Pick<UpsellOffer, "kicker" | "title" | "subtitle">> = {
  side: {
    kicker: "Carnea e gata. Farfuria, nu încă.",
    title: "O garnitură pe lângă?",
    subtitle: "Cartofi, coleslaw sau murături — alege ce pui lângă carne.",
  },
  sauce: {
    kicker: "Garnitura cere sos.",
    title: "Un sos de casă?",
    subtitle: "In House, rusesc, trufe sau brânză picantă.",
  },
  drink: {
    kicker: "Și ceva de băut.",
    title: "Ce bei la masă?",
    subtitle: "Limonadă, Pepsi, apă sau o Grivița rece.",
  },
};

export function isExtraMeat(item: Pick<MenuItem, "id">): boolean {
  return item.id.startsWith("extra-");
}

export function isMeat(item: Pick<MenuItem, "id" | "category">): boolean {
  return (item.category === "carne" || item.category === "burgers") && !isExtraMeat(item);
}

export function isSauce(item: Pick<MenuItem, "id" | "category" | "name">): boolean {
  if (item.category !== "garnituri") return false;
  if (item.id.startsWith("sos-") || item.id === "branza-picanta") return true;
  return item.name.toLowerCase().startsWith("sos");
}

export function isSide(item: Pick<MenuItem, "id" | "category" | "name">): boolean {
  if (item.category !== "garnituri") return false;
  if (isSauce(item) || isExtraMeat(item)) return false;
  return true;
}

export function isDrink(item: Pick<MenuItem, "category">): boolean {
  return item.category === "bauturi";
}

function availableOf(
  menu: MenuItem[],
  cartIds: Set<string>,
  predicate: (item: MenuItem) => boolean,
): MenuItem[] {
  return menu
    .filter((item) => item.available !== false && predicate(item) && !cartIds.has(item.id))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function offer(kind: UpsellKind, items: MenuItem[]): UpsellOffer | null {
  if (!items.length) return null;
  return { kind, items, ...COPY[kind] };
}

/**
 * Sequential cart upsell:
 * 1. meat without a side → sides
 * 2. side without a sauce → sauces
 * 3. meat without a drink → drinks
 */
export function getCartUpsell(
  menu: MenuItem[],
  cartIds: Set<string>,
  skipped: ReadonlySet<UpsellKind>,
): UpsellOffer | null {
  const inCart = menu.filter((item) => cartIds.has(item.id));
  const hasMeat = inCart.some(isMeat);
  const hasSide = inCart.some(isSide);
  const hasSauce = inCart.some(isSauce);
  const hasDrink = inCart.some(isDrink);

  if (hasMeat && !hasSide && !skipped.has("side")) {
    const next = offer("side", availableOf(menu, cartIds, isSide));
    if (next) return next;
  }

  if (hasSide && !hasSauce && !skipped.has("sauce")) {
    const next = offer("sauce", availableOf(menu, cartIds, isSauce));
    if (next) return next;
  }

  if (hasMeat && !hasDrink && !skipped.has("drink")) {
    const next = offer("drink", availableOf(menu, cartIds, isDrink));
    if (next) return next;
  }

  return null;
}

export function shouldStartUpsell(added: Pick<MenuItem, "id" | "category" | "name">): boolean {
  return isMeat(added) || isSide(added);
}
