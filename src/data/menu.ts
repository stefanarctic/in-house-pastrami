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
  { id: "sandwiches", label: "Pastrami Sandwiches", blurb: "Stacked high. Sliced to order." },
  { id: "burgers", label: "Burgers", blurb: "Smashed, dripping, double-stacked." },
  { id: "sides", label: "Sides", blurb: "Built to keep up with the meat." },
  { id: "drinks", label: "Drinks", blurb: "Cold things to wash it all down." },
];

export const MENU: MenuItem[] = [
  // SANDWICHES
  {
    id: "reuben",
    name: "The Reuben",
    category: "sandwiches",
    price: 42,
    image: reubenImg,
    shortDesc: "House pastrami, swiss, sauerkraut, russian dressing on grilled rye.",
    longDesc:
      "Our flagship. House-cured beef brisket smoked low and slow, hand-sliced to order, piled on toasted dark rye with melted Swiss, tangy sauerkraut and a creamy russian dressing. The sandwich that built our reputation.",
    ingredients: ["House pastrami (180g)", "Swiss cheese", "Sauerkraut", "Russian dressing", "Grilled rye bread"],
    allergens: ["Gluten", "Dairy", "Mustard", "Egg"],
    tag: "Bestseller",
    kcal: 820,
  },
  {
    id: "classic",
    name: "Classic Pastrami",
    category: "sandwiches",
    price: 38,
    image: classicImg,
    shortDesc: "Stacked high on rye with mustard and a pickle. The way it should be.",
    longDesc:
      "No fuss, no distractions. Just hand-sliced house pastrami stacked high on warm rye with sharp mustard and a crunchy pickle on the side. The way New York would do it.",
    ingredients: ["House pastrami (200g)", "Yellow mustard", "Rye bread", "Pickle"],
    allergens: ["Gluten", "Mustard"],
    tag: "Bestseller",
    kcal: 720,
  },
  {
    id: "pastrami-melt",
    name: "Pastrami Melt",
    category: "sandwiches",
    price: 40,
    image: reubenImg,
    shortDesc: "Pastrami, melted cheddar, caramelized onions on sourdough.",
    longDesc:
      "Sliced pastrami pressed between sourdough with sharp melted cheddar and slow-caramelized onions. Crispy outside, gooey inside.",
    ingredients: ["House pastrami (160g)", "Aged cheddar", "Caramelized onions", "Sourdough"],
    allergens: ["Gluten", "Dairy"],
    kcal: 760,
  },
  {
    id: "spicy-pastrami",
    name: "Spicy Pastrami",
    category: "sandwiches",
    price: 41,
    image: classicImg,
    shortDesc: "Pastrami, pepper jack, jalapeños, chipotle mayo on rye.",
    longDesc:
      "For the ones who like a kick. House pastrami with melted pepper jack, fresh jalapeños and a smoky chipotle mayo on toasted rye.",
    ingredients: ["House pastrami (160g)", "Pepper jack", "Jalapeños", "Chipotle mayo", "Rye"],
    allergens: ["Gluten", "Dairy", "Egg"],
    kcal: 790,
  },

  // BURGERS
  {
    id: "smash",
    name: "Smash Burger",
    category: "burgers",
    price: 39,
    image: burgerImg,
    shortDesc: "Double smashed beef, american cheese, caramelized onion, house sauce.",
    longDesc:
      "Two smashed beef patties with crispy lacy edges, melted american cheese, caramelized onion and our house sauce on a toasted brioche bun.",
    ingredients: ["2× smashed beef patty (90g)", "American cheese", "Caramelized onion", "House sauce", "Brioche bun"],
    allergens: ["Gluten", "Dairy", "Egg"],
    tag: "Popular",
    kcal: 880,
  },
  {
    id: "pastrami-burger",
    name: "Pastrami Burger",
    category: "burgers",
    price: 45,
    image: burgerImg,
    shortDesc: "Smash burger topped with shredded house pastrami and melted swiss.",
    longDesc:
      "The collision you didn't know you needed. Our smash burger crowned with a generous heap of shredded house pastrami, melted swiss and russian dressing.",
    ingredients: ["2× smashed beef patty", "House pastrami (80g)", "Swiss cheese", "Russian dressing", "Brioche bun"],
    allergens: ["Gluten", "Dairy", "Egg", "Mustard"],
    tag: "Chef's pick",
    kcal: 1020,
  },
  {
    id: "cheeseburger",
    name: "Classic Cheeseburger",
    category: "burgers",
    price: 34,
    image: burgerImg,
    shortDesc: "Single smash, american cheese, pickles, ketchup, mustard.",
    longDesc:
      "The blueprint. One smashed patty, american cheese, pickles, ketchup and mustard on a toasted brioche bun.",
    ingredients: ["Smashed beef patty (120g)", "American cheese", "Pickles", "Ketchup", "Mustard", "Brioche bun"],
    allergens: ["Gluten", "Dairy", "Mustard"],
    kcal: 620,
  },

  // SIDES
  {
    id: "poutine",
    name: "Pastrami Poutine",
    category: "sides",
    price: 34,
    image: poutineImg,
    shortDesc: "Crispy fries, gravy, cheese curds, topped with shredded pastrami.",
    longDesc:
      "Hand-cut fries smothered in beef gravy and squeaky cheese curds, topped with hot shredded house pastrami. Sharing is optional.",
    ingredients: ["Hand-cut fries", "Beef gravy", "Cheese curds", "House pastrami (80g)"],
    allergens: ["Gluten", "Dairy"],
    tag: "Popular",
    kcal: 740,
  },
  {
    id: "fries",
    name: "Hand-Cut Fries",
    category: "sides",
    price: 16,
    image: poutineImg,
    shortDesc: "Twice-cooked, crispy outside, fluffy inside. Sea salt.",
    longDesc: "Fresh-cut potatoes, twice-cooked for maximum crisp. Finished with sea salt.",
    ingredients: ["Potato", "Sunflower oil", "Sea salt"],
    kcal: 380,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "sides",
    price: 24,
    image: poutineImg,
    shortDesc: "Fries, cheddar sauce, crispy onion, smoked mayo.",
    longDesc: "Hand-cut fries drowned in cheddar sauce, topped with crispy fried onions and a drizzle of smoked mayo.",
    ingredients: ["Hand-cut fries", "Cheddar sauce", "Fried onions", "Smoked mayo"],
    allergens: ["Gluten", "Dairy", "Egg"],
    kcal: 560,
  },
  {
    id: "slaw",
    name: "House Slaw",
    category: "sides",
    price: 12,
    image: poutineImg,
    shortDesc: "Crunchy cabbage, carrot, apple cider dressing.",
    longDesc: "Shredded cabbage and carrot tossed in a tangy apple cider dressing. The perfect counter to all that meat.",
    ingredients: ["Cabbage", "Carrot", "Apple cider dressing"],
    kcal: 180,
  },
  {
    id: "pickles",
    name: "Pickle Plate",
    category: "sides",
    price: 10,
    image: poutineImg,
    shortDesc: "House-pickled cucumbers, peppers, onions.",
    longDesc: "A small plate of our house pickles — cucumbers, peppers and onions. Cuts through anything.",
    ingredients: ["Cucumber", "Pepper", "Onion", "Vinegar brine"],
    kcal: 60,
  },

  // DRINKS
  {
    id: "craft-cola",
    name: "Craft Cola",
    category: "drinks",
    price: 14,
    image: poutineImg,
    shortDesc: "Local craft cola, glass bottle.",
    longDesc: "A small-batch craft cola made locally. Less sweet, more spice.",
    ingredients: ["Cane sugar", "Spices", "Citrus", "Carbonated water"],
    kcal: 140,
  },
  {
    id: "lemonade",
    name: "Homemade Lemonade",
    category: "drinks",
    price: 16,
    image: poutineImg,
    shortDesc: "Fresh lemon, mint, a touch of honey.",
    longDesc: "Squeezed daily. Fresh lemon juice, muddled mint and a touch of honey.",
    ingredients: ["Lemon", "Mint", "Honey", "Sparkling water"],
    kcal: 120,
  },
  {
    id: "iced-tea",
    name: "Smoked Iced Tea",
    category: "drinks",
    price: 12,
    image: poutineImg,
    shortDesc: "Black tea, lightly smoked, lemon.",
    longDesc: "Black tea brewed cold with a hint of smoke and a slice of lemon. Refreshing, slightly mysterious.",
    ingredients: ["Black tea", "Lemon", "Cane sugar"],
    kcal: 80,
  },
  {
    id: "craft-beer",
    name: "Craft Beer",
    category: "drinks",
    price: 18,
    image: poutineImg,
    shortDesc: "Local IPA on tap. 0.33L.",
    longDesc: "A rotating local IPA on tap. Hoppy, cold, exactly what you want with a Reuben.",
    ingredients: ["Water", "Malted barley", "Hops", "Yeast"],
    allergens: ["Gluten"],
    kcal: 180,
  },
  {
    id: "water",
    name: "Still Water",
    category: "drinks",
    price: 8,
    image: poutineImg,
    shortDesc: "0.5L glass bottle.",
    longDesc: "Still mineral water. 0.5L glass bottle.",
    ingredients: ["Mineral water"],
    kcal: 0,
  },
];

export const getItem = (id: string) => MENU.find((m) => m.id === id);
