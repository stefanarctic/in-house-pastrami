import pastramiClassicImg from "@/assets/menu-items/PASTRAMI CLASSIC.webp";
import pastramiReubenImg from "@/assets/menu-items/pastrami reuben.webp";
import pastramiInHouseImg from "@/assets/menu-items/pastrami in house.webp";
import pulledBeefImg from "@/assets/menu-items/pulled beef.webp";
import turkeyPastramiClassicImg from "@/assets/menu-items/TURKEY PASTRAMI CLASSIC.webp";
import turkeyPastramiInHouseImg from "@/assets/menu-items/turkey pastrami in house.webp";
import homemadeSausagesClassicImg from "@/assets/menu-items/HOMEMADE SAUSAGES CLASSIC 350G.webp";
import homemadeSausagesSpicyImg from "@/assets/menu-items/HOMEMADE SAUSAGES SPICY 400G.webp";
import homemadeSausagesInHouseImg from "@/assets/menu-items/HOMEMADE SAUSAGES IN HOUSE  420G.webp";
import miciTruffleImg from "@/assets/menu-items/sandwich mici si sos de trufe.webp";
import phillyImg from "@/assets/menu-items/philly platforme.webp";
import burgerFreshImg from "@/assets/menu-items/burger fresh.webp";
import burgerInHouseImg from "@/assets/menu-items/burger-in-house.webp";
import burgerTruffleImg from "@/assets/menu-items/burger sos trufe.webp";
import burgerVeganImg from "@/assets/menu-items/burger-vegan-platforme.webp";
import pljeskavicaImg from "@/assets/menu-items/pljeskavica-fixed.webp";
import pastramiPoutineImg from "@/assets/menu-items/PASTRAMI POUTINE 300G.webp";
import turkeyPastramiPoutineImg from "@/assets/menu-items/TURKEY PASTRAMI POUTINE 300G.webp";
import pastramiSaladImg from "@/assets/menu-items/SALATA PASTRAMI 350G.webp";
import turkeyPastramiSaladImg from "@/assets/menu-items/salata turkey pastrami.webp";
import artichokeSaladImg from "@/assets/menu-items/salata anghinare platforme.webp";
import veganSaladImg from "@/assets/menu-items/salata vegana platforme.webp";
import branzaPicantaImg from "@/assets/menu-items/SOS BRANZA PICANTA 90G.webp";
import sosInHouseImg from "@/assets/menu-items/SOS IN HOUSE 60G.webp";
import sosRusescImg from "@/assets/menu-items/SOS RUSESC 60G.webp";
import cartofiPrajitiImg from "@/assets/menu-items/CARTOFI PRAJITI 150G.webp";
import cartofiUsturoiImg from "@/assets/menu-items/cartofi prajiti cu usturoi si patrunjel.webp";
import castravetiMuratiImg from "@/assets/menu-items/castraveti murati 150g.webp";
import varzaMurataImg from "@/assets/menu-items/varza murata platforme.webp";
import cartofiParmezanImg from "@/assets/menu-items/cartofi-cu-parmezan.webp";
import salataColeslawImg from "@/assets/menu-items/salata-coleslaw.webp";
import salataSfeclaRosieImg from "@/assets/menu-items/salata-sfecla-rosie.webp";
import sosTrufeImg from "@/assets/menu-items/sos-trufe.webp";
import type { MenuItemDoc } from "@/lib/menu-types";

export type Category = "carne" | "burgers" | "poutine" | "salate" | "garnituri";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  /** DineHub POS SKU; falls back to `id` when omitted */
  sku?: string;
  price: number; // in lei
  image: string;
  shortDesc: string;
  longDesc: string;
  ingredients: string[];
  allergens?: string[];
  tag?: string;
  kcal?: number;
  available?: boolean;
  sortOrder?: number;
  imageKey?: string;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: "carne",
    label: "Carne & Sandvișuri",
    blurb: "Pastramă, beef, cârnați și baghete cu maia.",
  },
  { id: "burgers", label: "Burgeri", blurb: "Burgeri cu vită, sosuri de casă și cartofi prăjiți." },
  {
    id: "poutine",
    label: "Poutine",
    blurb: "Cartofi prăjiți, sos brânzeturi și carne făcută în house.",
  },
  { id: "salate", label: "Salate", blurb: "Boluri fresh cu pastramă, anghinare sau legume." },
  {
    id: "garnituri",
    label: "Garnituri & Sosuri",
    blurb: "Cartofi prăjiți, murături și sosuri de casă.",
  },
];

/** Local WebP assets keyed by Firestore `imageKey` (usually the item id). */
export const MENU_IMAGES: Record<string, string> = {
  "pastrami-classic": pastramiClassicImg,
  "pastrami-reuben": pastramiReubenImg,
  "pastrami-in-house": pastramiInHouseImg,
  "pulled-beef": pulledBeefImg,
  "turkey-pastrami-classic": turkeyPastramiClassicImg,
  "turkey-pastrami-in-house": turkeyPastramiInHouseImg,
  "homemade-classic-sausages": homemadeSausagesClassicImg,
  "homemade-spicy-sausages": homemadeSausagesSpicyImg,
  "homemade-sausages-in-house": homemadeSausagesInHouseImg,
  "mici-truffle-sandwich": miciTruffleImg,
  "philly-cheesesteak": phillyImg,
  "burger-fresh": burgerFreshImg,
  "burger-in-house": burgerInHouseImg,
  "burger-truffle": burgerTruffleImg,
  "burger-vegan": burgerVeganImg,
  pljeskavica: pljeskavicaImg,
  "pastrami-poutine": pastramiPoutineImg,
  "turkey-pastrami-poutine": turkeyPastramiPoutineImg,
  "salata-pastrami": pastramiSaladImg,
  "salata-turkey-pastrami": turkeyPastramiSaladImg,
  "mix-salata-anghinare": artichokeSaladImg,
  "salata-vegana": veganSaladImg,
  "branza-picanta": branzaPicantaImg,
  "sos-in-house": sosInHouseImg,
  "sos-rusesc": sosRusescImg,
  "cartofi-prajiti": cartofiPrajitiImg,
  "cartofi-usturoi-patrunjel": cartofiUsturoiImg,
  "castraveti-murati": castravetiMuratiImg,
  "varza-murata": varzaMurataImg,
  "cartofi-parmezan": cartofiParmezanImg,
  "salata-coleslaw": salataColeslawImg,
  "salata-sfecla-rosie": salataSfeclaRosieImg,
  "sos-trufe": sosTrufeImg,
};

export function resolveMenuImage(imageKey: string | undefined, id: string): string {
  return MENU_IMAGES[imageKey ?? id] ?? MENU_IMAGES[id] ?? "";
}

/** Card + mobile-dialog image framing. Default: cover + center. */
export type MenuImageFrame = {
  fit?: "cover" | "contain";
  /** CSS object-position, e.g. "50% 70%" */
  position?: string;
};

/**
 * Per-item framing for menu card thumbnails and mobile dialog.
 * Always fill the frame (cover); position nudges the product into center.
 */
export const MENU_IMAGE_FRAME: Record<string, MenuImageFrame> = {
  // Tall stacks — bias toward top so skewer/bread aren't clipped
  "pastrami-reuben": { fit: "cover", position: "50% 34%" },
  "pastrami-in-house": { fit: "cover", position: "50% 36%" },
  "turkey-pastrami-classic": { fit: "cover", position: "50% 38%" },
  pljeskavica: { fit: "cover", position: "50% 38%" },
  "homemade-sausages-in-house": { fit: "cover", position: "50% 42%" },
  "branza-picanta": { fit: "cover", position: "50% 68%" },
  "sos-in-house": { fit: "cover", position: "50% 68%" },
  "sos-rusesc": { fit: "cover", position: "50% 68%" },
  "sos-trufe": { fit: "cover", position: "50% 50%" },
  "pastrami-poutine": { fit: "cover", position: "50% 50%" },
  "turkey-pastrami-poutine": { fit: "cover", position: "50% 50%" },
  "salata-pastrami": { fit: "cover", position: "50% 50%" },

  // Subject low / off-center — cover + bias toward the food
  "pulled-beef": { fit: "cover", position: "55% 70%" },
  "turkey-pastrami-in-house": { fit: "cover", position: "50% 72%" },
  "philly-cheesesteak": { fit: "cover", position: "50% 68%" },
  "homemade-spicy-sausages": { fit: "cover", position: "50% 45%" },
  "mici-truffle-sandwich": { fit: "cover", position: "62% 78%" },
  "cartofi-usturoi-patrunjel": { fit: "cover", position: "50% 50%" },
  "cartofi-parmezan": { fit: "cover", position: "50% 50%" },
  "cartofi-prajiti": { fit: "cover", position: "50% 50%" },
  "salata-vegana": { fit: "cover", position: "50% 68%" },
  "mix-salata-anghinare": { fit: "cover", position: "50% 42%" },
  "salata-sfecla-rosie": { fit: "cover", position: "50% 55%" },

  // Landscape heroes
  "pastrami-classic": { fit: "cover", position: "58% 48%" },
  "homemade-classic-sausages": { fit: "cover", position: "50% 52%" },
  "burger-fresh": { fit: "cover", position: "65% 55%" },
  "burger-in-house": { fit: "cover", position: "62% 60%" },
  "burger-truffle": { fit: "cover", position: "65% 55%" },
  "burger-vegan": { fit: "cover", position: "62% 55%" },
  "salata-turkey-pastrami": { fit: "cover", position: "50% 55%" },
  "castraveti-murati": { fit: "cover", position: "50% 50%" },
  "varza-murata": { fit: "cover", position: "50% 50%" },
  "salata-coleslaw": { fit: "cover", position: "50% 50%" },
};

export function resolveMenuImageFrame(imageKey: string | undefined, id: string): Required<MenuImageFrame> {
  const key = imageKey ?? id;
  const frame = MENU_IMAGE_FRAME[key] ?? MENU_IMAGE_FRAME[id] ?? {};
  return {
    fit: frame.fit ?? "cover",
    position: frame.position ?? "50% 50%",
  };
}

export function menuItemFromDoc(doc: MenuItemDoc): MenuItem {
  return {
    id: doc.id,
    name: doc.name,
    category: doc.category,
    sku: doc.sku,
    price: doc.price,
    image: resolveMenuImage(doc.imageKey, doc.id),
    shortDesc: doc.shortDesc,
    longDesc: doc.longDesc,
    ingredients: doc.ingredients ?? [],
    allergens: doc.allergens,
    tag: doc.tag,
    kcal: doc.kcal,
    available: doc.available,
    sortOrder: doc.sortOrder,
    imageKey: doc.imageKey ?? doc.id,
  };
}
