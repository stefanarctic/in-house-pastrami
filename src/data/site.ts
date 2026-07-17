export const INSTAGRAM = "https://www.instagram.com/pastrami.and.more/";
export const INSTAGRAM_HANDLE = "@pastrami.and.more";

export const DELIVERY_PLATFORMS = [
  {
    name: "Glovo",
    url: "https://glovoapp.com/ro/ro/bucharest/stores/in-house-pastrami-and-morebuc/",
  },
  {
    name: "Bolt Food",
    url: "https://food.bolt.eu/en/325-bucharest/p/88214-in-house-pastrami-more-dorobanti/",
  },
  {
    name: "Wolt",
    url: "https://wolt.com/en/rou/bucharest/restaurant/in-house-pastrami-more",
  },
] as const;

export function googleMapsUrl(query: string): string {
  if (query.startsWith("cid:")) {
    return `https://www.google.com/maps?cid=${query.slice(4)}&hl=ro`;
  }
  return `https://www.google.com/maps?q=${query}&hl=ro&z=17`;
}
