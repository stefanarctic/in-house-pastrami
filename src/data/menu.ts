import pastramiClassicImg from "@/assets/menu-items/PASTRAMI CLASSIC.jpg";
import pastramiReubenImg from "@/assets/menu-items/reuben.jpg";
import pastramiInHouseImg from "@/assets/menu-items/pastrami in house.jpg";
import pulledBeefImg from "@/assets/menu-items/pulled beef.jpeg";
import turkeyPastramiClassicImg from "@/assets/menu-items/TURKEY PASTRAMI CLASSIC.jpg";
import turkeyPastramiInHouseImg from "@/assets/menu-items/turkey in house.jpeg";
import homemadeSausagesClassicImg from "@/assets/menu-items/HOMEMADE SAUSAGES CLASSIC 350G.jpg";
import homemadeSausagesSpicyImg from "@/assets/menu-items/HOMEMADE SAUSAGES SPICY 400G.jpg";
import homemadeSausagesInHouseImg from "@/assets/menu-items/HOMEMADE SAUSAGES IN HOUSE  420G.jpg";
import miciTruffleImg from "@/assets/menu-items/sandwich cu mici si sos de trufe.jpg";
import phillyImg from "@/assets/menu-items/philly.jpg";
import burgerInHouseImg from "@/assets/menu-items/burger fresh.jpg";
import burgerTruffleImg from "@/assets/menu-items/burger sos trufe.jpg";
import pljeskavicaImg from "@/assets/menu-items/pljeskavica.jpg";
import pastramiPoutineImg from "@/assets/menu-items/PASTRAMI POUTINE 300G.jpg";
import turkeyPastramiPoutineImg from "@/assets/menu-items/TURKEY PASTRAMI POUTINE 300G.jpg";
import pastramiSaladImg from "@/assets/menu-items/SALATA PASTRAMI 350G.jpg";
import artichokeSaladImg from "@/assets/menu-items/salata mix de salata cu anghinare.jpg";
import veganSaladImg from "@/assets/menu-items/salata vegana.jpg";

export type Category = "carne" | "burgers" | "poutine" | "salate";

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
];

export const MENU: MenuItem[] = [
  // CARNE & SANDVIȘURI
  {
    id: "pastrami-classic",
    name: "Pastrami Classic",
    category: "carne",
    price: 66,
    image: pastramiClassicImg,
    shortDesc: "Pastramă de vită, muștar, pâine cu maia și castraveți murați.",
    longDesc:
      "Porție generoasă de pastramă de vită făcută în house, servită cu muștar, pâine cu maia și castraveți murați. Simplu, direct, clasic.",
    ingredients: ["Pastramă de vită", "Muștar", "Pâine cu maia", "Castraveți murați"],
    allergens: ["Gluten", "Muștar"],
    tag: "Bestseller",
  },
  {
    id: "pastrami-reuben",
    name: "Pastrami Reuben",
    category: "carne",
    price: 72,
    image: pastramiReubenImg,
    shortDesc: "Pastramă de vită, sos rusesc, sos brânzeturi și varză murată.",
    longDesc:
      "Pastramă de vită stivuită pe pâine cu maia, cu sos rusesc, sos de brânzeturi, varză murată și castraveți murați.",
    ingredients: [
      "Pastramă de vită",
      "Sos rusesc",
      "Sos brânzeturi",
      "Varză murată",
      "Pâine cu maia",
      "Castraveți murați",
    ],
    allergens: ["Gluten", "Lactate", "Ou", "Muștar"],
    tag: "Bestseller",
  },
  {
    id: "pastrami-in-house",
    name: "Pastrami In House",
    category: "carne",
    price: 70,
    image: pastramiInHouseImg,
    shortDesc: "Pastramă de vită cu sos In House, varză albă, morcov și praz.",
    longDesc:
      "Varianta casei cu pastramă de vită, sos In House, varză albă, morcov, praz, dressing, pâine cu maia și castraveți murați.",
    ingredients: [
      "Pastramă de vită",
      "Sos In House",
      "Varză albă",
      "Morcov",
      "Praz",
      "Dressing",
      "Pâine cu maia",
      "Castraveți murați",
    ],
    allergens: ["Gluten", "Ou"],
    tag: "In house",
  },
  {
    id: "pulled-beef",
    name: "Pulled Beef",
    category: "carne",
    price: 64,
    image: pulledBeefImg,
    shortDesc: "Carne de vită, pâine cu maia, sos și salată de sfeclă roșie.",
    longDesc:
      "Pulled beef fraged, servit în pâine cu maia, cu sos, salată de sfeclă roșie și castraveți murați.",
    ingredients: [
      "Carne de vită",
      "Pâine cu maia",
      "Sos",
      "Salată sfeclă roșie",
      "Castraveți murați",
    ],
    allergens: ["Gluten"],
  },
  {
    id: "turkey-pastrami-classic",
    name: "Turkey Pastrami Classic",
    category: "carne",
    price: 58,
    image: turkeyPastramiClassicImg,
    shortDesc: "Pastramă de curcan, muștar, pâine cu maia și castraveți murați.",
    longDesc:
      "Pastramă de curcan în varianta clasică, cu muștar, pâine cu maia și castraveți murați.",
    ingredients: ["Pastramă de curcan", "Muștar", "Pâine cu maia", "Castraveți murați"],
    allergens: ["Gluten", "Muștar"],
  },
  {
    id: "turkey-pastrami-in-house",
    name: "Turkey Pastrami In House",
    category: "carne",
    price: 62,
    image: turkeyPastramiInHouseImg,
    shortDesc: "Pastramă de curcan cu sos In House și sos brânzeturi.",
    longDesc:
      "Pastramă de curcan în pâine cu maia, cu sos In House, sos brânzeturi și castraveți murați.",
    ingredients: [
      "Pastramă de curcan",
      "Pâine cu maia",
      "Sos In House",
      "Sos brânzeturi",
      "Castraveți murați",
    ],
    allergens: ["Gluten", "Lactate", "Ou"],
  },
  {
    id: "homemade-classic-sausages",
    name: "Homemade Classic Sausages",
    category: "carne",
    price: 50,
    image: homemadeSausagesClassicImg,
    shortDesc: "Cârnați de porc și vită afumați, muștar și baghetă cu maia.",
    longDesc: "Cârnați de porc și vită afumați în house, serviți cu muștar și baghetă cu maia.",
    ingredients: ["Cârnați de porc și vită afumați", "Muștar", "Baghetă cu maia"],
    allergens: ["Gluten", "Muștar"],
  },
  {
    id: "homemade-spicy-sausages",
    name: "Homemade Spicy Sausages",
    category: "carne",
    price: 54,
    image: homemadeSausagesSpicyImg,
    shortDesc: "Cârnați afumați, brânză picantă și baghetă cu maia.",
    longDesc: "Cârnați de porc și vită afumați, serviți cu brânză picantă și baghetă cu maia.",
    ingredients: ["Cârnați de porc și vită afumați", "Brânză picantă", "Baghetă cu maia"],
    allergens: ["Gluten", "Lactate"],
    tag: "Picant",
  },
  {
    id: "homemade-sausages-in-house",
    name: "Homemade Sausages In House",
    category: "carne",
    price: 54,
    image: homemadeSausagesInHouseImg,
    shortDesc: "Cârnați afumați cu sos In House, sos brânzeturi și baghetă cu maia.",
    longDesc:
      "Cârnați de porc și vită afumați, serviți cu sos In House, sos brânzeturi și baghetă cu maia.",
    ingredients: [
      "Cârnați de porc și vită afumați",
      "Sos In House",
      "Sos brânzeturi",
      "Baghetă cu maia",
    ],
    allergens: ["Gluten", "Lactate", "Ou"],
  },
  {
    id: "mici-truffle-sandwich",
    name: "Sandwich cu Mici și Sos de Trufe",
    category: "carne",
    price: 54,
    image: miciTruffleImg,
    shortDesc: "Carne de vită, sos de trufe și baghetă cu maia.",
    longDesc: "Sandwich cu mici din carne de vită, sos de trufe și baghetă cu maia.",
    ingredients: ["Carne de vită", "Sos trufe", "Baghetă cu maia"],
    allergens: ["Gluten", "Ou"],
  },
  {
    id: "philly-cheesesteak",
    name: "Philly Cheesesteak",
    category: "carne",
    price: 78,
    image: phillyImg,
    shortDesc: "Carne de vită, cheddar, ardei kapia, ceapă și maioneză.",
    longDesc:
      "Carne de vită cu cheddar, ardei kapia, ceapă, maioneză, ciabatta și castraveți murați.",
    ingredients: [
      "Carne de vită",
      "Cheddar",
      "Ardei kapia",
      "Ceapă",
      "Maioneză",
      "Ciabatta",
      "Castraveți murați",
    ],
    allergens: ["Gluten", "Lactate", "Ou"],
    tag: "Popular",
  },

  // BURGERI
  {
    id: "burger-in-house",
    name: "Burger In House cu Cartofi Prăjiți",
    category: "burgers",
    price: 58,
    image: burgerInHouseImg,
    shortDesc: "Carne de vită, chilli, salată, sos In House, sos roșii și brânzeturi.",
    longDesc:
      "Burger cu carne de vită, chilli, salată, sos In House, sos roșii, sos brânzeturi și cartofi prăjiți.",
    ingredients: [
      "Carne de vită",
      "Chilli",
      "Salată",
      "Sos In House",
      "Sos roșii",
      "Sos brânzeturi",
      "Cartofi prăjiți",
    ],
    allergens: ["Gluten", "Lactate", "Ou"],
    tag: "In house",
  },
  {
    id: "burger-truffle",
    name: "Burger cu Sos de Trufe și Cartofi Prăjiți",
    category: "burgers",
    price: 62,
    image: burgerTruffleImg,
    shortDesc: "Carne de vită, bacon, brânză cu mucegai, salată și sos de trufe.",
    longDesc:
      "Burger cu carne de vită, bacon, brânză cu mucegai, salată, roșii, sos de trufe și cartofi prăjiți.",
    ingredients: [
      "Carne de vită",
      "Bacon",
      "Brânză cu mucegai",
      "Salată",
      "Roșii",
      "Sos de trufe",
      "Cartofi prăjiți",
    ],
    allergens: ["Gluten", "Lactate", "Ou"],
    tag: "Showcase",
  },
  {
    id: "burger-fresh",
    name: "Burger Fresh cu Cartofi Prăjiți",
    category: "burgers",
    price: 56,
    image: burgerInHouseImg,
    shortDesc: "Carne de vită, chilli, salată, castraveți, roșii, ceapă și sos.",
    longDesc:
      "Burger fresh cu carne de vită, chilli, salată, castraveți, roșii, ceapă, sos, cartofi prăjiți și salată.",
    ingredients: [
      "Carne de vită",
      "Chilli",
      "Salată",
      "Castraveți",
      "Roșii",
      "Ceapă",
      "Sos",
      "Cartofi prăjiți",
    ],
    allergens: ["Gluten", "Ou"],
  },
  {
    id: "pljeskavica",
    name: "Pljeskavica",
    category: "burgers",
    price: 52,
    image: pljeskavicaImg,
    shortDesc: "Carne de vită, sos In House, varză albă și chilli.",
    longDesc: "Pljeskavica cu carne de vită, sos In House, varză albă și chilli.",
    ingredients: ["Carne de vită", "Sos In House", "Varză albă", "Chilli"],
    allergens: ["Gluten", "Ou"],
  },

  // POUTINE
  {
    id: "pastrami-poutine",
    name: "Pastrami Poutine",
    category: "poutine",
    price: 58,
    image: pastramiPoutineImg,
    shortDesc: "Pastramă de vită, cartofi prăjiți, sos brânzeturi și caș de vacă.",
    longDesc:
      "Pastramă de vită peste cartofi prăjiți, cu sos brânzeturi, caș de vacă și castraveți murați.",
    ingredients: [
      "Pastramă de vită",
      "Cartofi prăjiți",
      "Sos brânzeturi",
      "Caș de vacă",
      "Castraveți murați",
    ],
    allergens: ["Lactate"],
    tag: "Popular",
  },
  {
    id: "turkey-pastrami-poutine",
    name: "Turkey Pastrami Poutine",
    category: "poutine",
    price: 56,
    image: turkeyPastramiPoutineImg,
    shortDesc: "Pastramă de curcan, cartofi prăjiți, sos brânzeturi și caș de vacă.",
    longDesc:
      "Pastramă de curcan peste cartofi prăjiți, cu sos brânzeturi, castraveți murați și caș de vacă.",
    ingredients: [
      "Pastramă de curcan",
      "Cartofi prăjiți",
      "Sos brânzeturi",
      "Castraveți murați",
      "Caș de vacă",
    ],
    allergens: ["Lactate"],
  },

  // SALATE
  {
    id: "salata-pastrami",
    name: "Salată Pastrami",
    category: "salate",
    price: 40,
    image: pastramiSaladImg,
    shortDesc: "Salată iceberg, castraveți, roșii cherry, pătrunjel și pastramă de vită.",
    longDesc:
      "Salată cu iceberg, castraveți, roșii cherry, pătrunjel, pastramă de vită și dressing.",
    ingredients: [
      "Salată iceberg",
      "Castraveți",
      "Roșii cherry",
      "Pătrunjel",
      "Pastramă de vită",
      "Dressing",
    ],
  },
  {
    id: "mix-salata-anghinare",
    name: "Mix de Salată cu Anghinare",
    category: "salate",
    price: 46,
    image: artichokeSaladImg,
    shortDesc: "Mix de salată, anghinare, avocado, roșii uscate în ulei și dressing.",
    longDesc: "Mix de salată cu anghinare, avocado, roșii uscate în ulei și dressing.",
    ingredients: ["Mix de salată", "Anghinare", "Avocado", "Roșii uscate în ulei", "Dressing"],
  },
  {
    id: "salata-vegana",
    name: "Salată Vegană",
    category: "salate",
    price: 38,
    image: veganSaladImg,
    shortDesc: "Ardei gras, castraveți, rucola, roșii, morcov, miez de nucă și dressing.",
    longDesc:
      "Salată vegană cu ardei gras, castraveți, rucola, roșii, morcov, miez de nucă și dressing.",
    ingredients: [
      "Ardei gras",
      "Castraveți",
      "Rucola",
      "Roșii",
      "Morcov",
      "Miez de nucă",
      "Dressing",
    ],
    allergens: ["Nuci"],
  },
];

export const getItem = (id: string) => MENU.find((m) => m.id === id);
