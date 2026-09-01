import { LOCATIONS } from "@/data/locations";

export const LEGAL = {
  brand: "In House Pastrami & More",
  companyName: "IN HOUSE PASTRAMI & MORE S.R.L.",
  cui: "49137940",
  cuiDisplay: "RO49137940",
  tradeRegister: "J2023007730233",
  euid: "ROONRC.J2023007730233",
  registeredOffice:
    "Str. Mănești nr. 48, Oraș Buftea, Județul Ilfov, cod poștal 070000, România",
  email: "inhousepastrami@yahoo.com",
  lastUpdated: "2 septembrie 2026",
  lastUpdatedIso: "2026-09-02",
} as const;

export const LEGAL_PATHS = {
  terms: "/termeni-si-conditii",
  privacy: "/confidentialitate",
  cookies: "/cookies",
} as const;

export const LEGAL_PATH_LIST = Object.values(LEGAL_PATHS);

export const ANPC = {
  home: "https://anpc.ro/",
  sal: "https://anpc.ro/ce-este-sal/",
  complaints: "https://reclamatii.anpc.ro/",
} as const;

export const ANSPDCP = {
  home: "https://www.dataprotection.ro/",
} as const;

export const ALLERGENS_PDF = "/valori-nutritionale-si-alergeni.pdf";

/** POS / menu ids known to contain alcohol (18+). Non-alcoholic Grivița is excluded. */
const ALCOHOLIC_ITEM_IDS = new Set([
  "grivita-lager",
  "grivita-gold",
  "grivita-hawaiipa",
]);

export function isAlcoholicItemId(id: string): boolean {
  return ALCOHOLIC_ITEM_IDS.has(id);
}

export function cartHasAlcohol(lines: { id: string }[]): boolean {
  return lines.some((line) => isAlcoholicItemId(line.id));
}

export function isLegalPath(pathname: string): boolean {
  return (LEGAL_PATH_LIST as readonly string[]).includes(pathname);
}

export function workingPointsText(): string {
  return LOCATIONS.map((loc) => `${loc.name} — ${loc.address}, tel. ${loc.phoneDisplay}`).join(
    "; ",
  );
}
