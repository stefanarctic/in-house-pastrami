import reubenImg from "@/assets/menu-reuben.jpg";
import classicImg from "@/assets/menu-classic.jpg";
import burgerImg from "@/assets/menu-burger.jpg";
import poutineImg from "@/assets/menu-poutine.jpg";

export type Category = "sandwiches" | "burgers" | "sides" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number; // in lei
  image: string;
  shortDesc: string;
  longDesc: string;
  ingredients: string[];
  allergens?: string[];
  tag?: string;
  kcal?: number;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "sandwiches", label: "Sandvișuri cu Pastramă", blurb: "Stivuite generos. Feliate la comandă." },
  { id: "burgers", label: "Burgeri", blurb: "Smash, suculenți, dublu stivuiți." },
  { id: "sides", label: "Garnituri", blurb: "Construite să țină pasul cu carnea." },
  { id: "drinks", label: "Băuturi", blurb: "Reci, ca să dai totul pe gât." },
];

export const MENU: MenuItem[] = [
  // SANDVIȘURI
  {
    id: "reuben",
    name: "The Reuben",
    category: "sandwiches",
    price: 42,
    image: reubenImg,
    shortDesc: "Pastramă de casă, swiss, varză murată, dressing russian pe pâine de secară prăjită.",
    longDesc:
      "Vedeta noastră. Piept de vită maturat în casă, afumat lent, feliat la comandă, stivuit pe pâine de secară prăjită cu Swiss topit, varză murată acrișoară și un dressing russian cremos. Sandvișul care ne-a făcut numele.",
    ingredients: ["Pastramă de casă (180g)", "Cașcaval Swiss", "Varză murată", "Dressing russian", "Pâine de secară prăjită"],
    allergens: ["Gluten", "Lactate", "Muștar", "Ou"],
    tag: "Bestseller",
    kcal: 820,
  },
  {
    id: "classic",
    name: "Pastramă Clasică",
    category: "sandwiches",
    price: 38,
    image: classicImg,
    shortDesc: "Stivuită generos pe secară, cu muștar și un castravecior. Așa cum trebuie.",
    longDesc:
      "Fără fițe, fără distrageri. Doar pastramă de casă feliată, stivuită pe pâine caldă de secară, cu muștar iute și un castravecior crocant alături. Stilul New York autentic.",
    ingredients: ["Pastramă de casă (200g)", "Muștar galben", "Pâine de secară", "Castravecior murat"],
    allergens: ["Gluten", "Muștar"],
    tag: "Bestseller",
    kcal: 720,
  },
  {
    id: "pastrami-melt",
    name: "Pastrami Melt",
    category: "sandwiches",
    price: 40,
    image: reubenImg,
    shortDesc: "Pastramă, cheddar topit, ceapă caramelizată pe sourdough.",
    longDesc:
      "Pastramă feliată presată între felii de sourdough, cu cheddar matur topit și ceapă caramelizată lent. Crocant pe afară, moale și untos pe dinăuntru.",
    ingredients: ["Pastramă de casă (160g)", "Cheddar matur", "Ceapă caramelizată", "Sourdough"],
    allergens: ["Gluten", "Lactate"],
    kcal: 760,
  },
  {
    id: "spicy-pastrami",
    name: "Pastramă Picantă",
    category: "sandwiches",
    price: 41,
    image: classicImg,
    shortDesc: "Pastramă, pepper jack, jalapeños, maioneză chipotle pe secară.",
    longDesc:
      "Pentru cei cărora le place piperată. Pastramă de casă cu pepper jack topit, jalapeños proaspeți și maioneză afumată chipotle pe pâine de secară prăjită.",
    ingredients: ["Pastramă de casă (160g)", "Pepper jack", "Jalapeños", "Maioneză chipotle", "Pâine de secară"],
    allergens: ["Gluten", "Lactate", "Ou"],
    kcal: 790,
  },

  // BURGERI
  {
    id: "smash",
    name: "Smash Burger",
    category: "burgers",
    price: 39,
    image: burgerImg,
    shortDesc: "Două chiftele smash, cașcaval american, ceapă caramelizată, sos de casă.",
    longDesc:
      "Două chiftele de vită smash, cu margini crocante dantelate, cașcaval american topit, ceapă caramelizată și sosul nostru de casă pe chiflă brioșă prăjită.",
    ingredients: ["2× chiftea smash de vită (90g)", "Cașcaval american", "Ceapă caramelizată", "Sos de casă", "Chiflă brioșă"],
    allergens: ["Gluten", "Lactate", "Ou"],
    tag: "Popular",
    kcal: 880,
  },
  {
    id: "pastrami-burger",
    name: "Pastrami Burger",
    category: "burgers",
    price: 45,
    image: burgerImg,
    shortDesc: "Smash burger acoperit cu pastramă de casă mărunțită și swiss topit.",
    longDesc:
      "Combinația pe care n-o știai necesară. Smash burger-ul nostru, încununat cu o porție generoasă de pastramă de casă mărunțită, cașcaval Swiss topit și dressing russian.",
    ingredients: ["2× chiftea smash de vită", "Pastramă de casă (80g)", "Cașcaval Swiss", "Dressing russian", "Chiflă brioșă"],
    allergens: ["Gluten", "Lactate", "Ou", "Muștar"],
    tag: "Recomandarea bucătarului",
    kcal: 1020,
  },
  {
    id: "cheeseburger",
    name: "Cheeseburger Clasic",
    category: "burgers",
    price: 34,
    image: burgerImg,
    shortDesc: "Smash simplu, cașcaval american, castraveciori, ketchup, muștar.",
    longDesc:
      "Rețeta de bază. O chiftea smash, cașcaval american, castraveciori murați, ketchup și muștar pe chiflă brioșă prăjită.",
    ingredients: ["Chiftea smash de vită (120g)", "Cașcaval american", "Castraveciori murați", "Ketchup", "Muștar", "Chiflă brioșă"],
    allergens: ["Gluten", "Lactate", "Muștar"],
    kcal: 620,
  },

  // GARNITURI
  {
    id: "poutine",
    name: "Poutine cu Pastramă",
    category: "sides",
    price: 34,
    image: poutineImg,
    shortDesc: "Cartofi crocanți, sos de carne, cheese curds, acoperiți cu pastramă mărunțită.",
    longDesc:
      "Cartofi tăiați manual, înecați în sos de vită și cheese curds care scârțâie, acoperiți cu pastramă de casă caldă, mărunțită. E opțional să împarți.",
    ingredients: ["Cartofi tăiați manual", "Sos de vită", "Cheese curds", "Pastramă de casă (80g)"],
    allergens: ["Gluten", "Lactate"],
    tag: "Popular",
    kcal: 740,
  },
  {
    id: "fries",
    name: "Cartofi Tăiați Manual",
    category: "sides",
    price: 16,
    image: poutineImg,
    shortDesc: "Prăjiți de două ori, crocanți pe afară, pufoși pe dinăuntru. Sare de mare.",
    longDesc: "Cartofi proaspăt tăiați, prăjiți de două ori pentru maxim de crocant. Finisați cu sare de mare.",
    ingredients: ["Cartof", "Ulei de floarea-soarelui", "Sare de mare"],
    kcal: 380,
  },
  {
    id: "loaded-fries",
    name: "Cartofi Loaded",
    category: "sides",
    price: 24,
    image: poutineImg,
    shortDesc: "Cartofi, sos de cheddar, ceapă crocantă, maioneză afumată.",
    longDesc: "Cartofi tăiați manual înecați în sos de cheddar, acoperiți cu ceapă prăjită crocantă și un strop de maioneză afumată.",
    ingredients: ["Cartofi tăiați manual", "Sos de cheddar", "Ceapă prăjită", "Maioneză afumată"],
    allergens: ["Gluten", "Lactate", "Ou"],
    kcal: 560,
  },
  {
    id: "slaw",
    name: "Salată de Varză a Casei",
    category: "sides",
    price: 12,
    image: poutineImg,
    shortDesc: "Varză crocantă, morcov, dressing cu cidru de mere.",
    longDesc: "Varză și morcov rase, amestecate într-un dressing acrișor cu cidru de mere. Contrabalansul perfect pentru toată carnea.",
    ingredients: ["Varză", "Morcov", "Dressing cu cidru de mere"],
    kcal: 180,
  },
  {
    id: "pickles",
    name: "Platou de Murături",
    category: "sides",
    price: 10,
    image: poutineImg,
    shortDesc: "Castraveți, ardei și ceapă murate în casă.",
    longDesc: "Un platou mic cu murăturile noastre de casă — castraveți, ardei și ceapă. Taie orice.",
    ingredients: ["Castravete", "Ardei", "Ceapă", "Saramură cu oțet"],
    kcal: 60,
  },

  // BĂUTURI
  {
    id: "craft-cola",
    name: "Cola Artizanală",
    category: "drinks",
    price: 14,
    image: poutineImg,
    shortDesc: "Cola artizanală locală, sticlă.",
    longDesc: "O cola artizanală în lot mic, făcută local. Mai puțin dulce, mai mult condimentată.",
    ingredients: ["Zahăr de trestie", "Condimente", "Citrice", "Apă carbogazoasă"],
    kcal: 140,
  },
  {
    id: "lemonade",
    name: "Limonadă de Casă",
    category: "drinks",
    price: 16,
    image: poutineImg,
    shortDesc: "Lămâie proaspătă, mentă, un strop de miere.",
    longDesc: "Stoarsă zilnic. Suc de lămâie proaspăt, mentă pisată și un strop de miere.",
    ingredients: ["Lămâie", "Mentă", "Miere", "Apă minerală"],
    kcal: 120,
  },
  {
    id: "iced-tea",
    name: "Ceai Rece Afumat",
    category: "drinks",
    price: 12,
    image: poutineImg,
    shortDesc: "Ceai negru, ușor afumat, lămâie.",
    longDesc: "Ceai negru infuzat la rece, cu o notă afumată și o felie de lămâie. Răcoritor, ușor misterios.",
    ingredients: ["Ceai negru", "Lămâie", "Zahăr de trestie"],
    kcal: 80,
  },
  {
    id: "craft-beer",
    name: "Bere Artizanală",
    category: "drinks",
    price: 18,
    image: poutineImg,
    shortDesc: "IPA local la halbă. 0,33L.",
    longDesc: "Un IPA local rotativ, la halbă. Hop, rece, exact ce-ți trebuie cu un Reuben.",
    ingredients: ["Apă", "Malț de orz", "Hamei", "Drojdie"],
    allergens: ["Gluten"],
    kcal: 180,
  },
  {
    id: "water",
    name: "Apă Plată",
    category: "drinks",
    price: 8,
    image: poutineImg,
    shortDesc: "Sticlă de 0,5L.",
    longDesc: "Apă minerală plată. Sticlă de 0,5L.",
    ingredients: ["Apă minerală"],
    kcal: 0,
  },
];

export const getItem = (id: string) => MENU.find((m) => m.id === id);
