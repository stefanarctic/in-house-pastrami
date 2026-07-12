export const SITE_PHONE = "+40771770128";
export const SITE_PHONE_DISPLAY = "0771 770 128";
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
  return `https://www.google.com/maps?q=${query}`;
}
