import { LEGAL, LEGAL_PATHS } from "@/data/legal";
import { LOCATIONS, type StoreLocation } from "@/data/locations";
import { DELIVERY_PLATFORMS, INSTAGRAM, googleMapsUrl } from "@/data/site";
import { getPublicSiteUrl } from "@/lib/site-url";

const MENU_SECTIONS = [
  { name: "Carne & Sandvișuri", description: "" },
  { name: "Burgeri", description: "Burgeri cu vită, sosuri de casă și cartofi prăjiți." },
  { name: "Salate", description: "Boluri fresh cu pastramă, anghinare sau legume." },
  { name: "Garnituri & Sosuri", description: "Cartofi prăjiți, murături și sosuri de casă." },
  { name: "Băuturi", description: "Apă, răcoritoare, limonadă și bere. + 0,50 lei SGR pe ambalaj." },
] as const;

export const SITE_NAME = "In House Pastrami & More";
export const OG_IMAGE_PATH = "/og-image.jpg";

export const PAGES = {
  home: {
    title: "In House Pastrami & More — Probabil cea mai bună pastramă din București",
    description:
      "Pastramă și pastrami de vită afumată în casă în București. Sandvișuri Reuben, burgeri și poutine. Comandă cu ridicare din Dorobanți sau Piața Rosetti.",
  },
  menu: {
    title: "Meniu pastramă București — Reuben, poutine, burgeri | In House Pastrami & More",
    description:
      "Meniul complet de pastramă București: sandviș Reuben, poutine, carne afumată, burgeri și salate. Comandă direct, ridicare din Dorobanți sau Piața Rosetti.",
  },
  checkout: {
    title: "Finalizare comandă — In House Pastrami & More",
    description: "Verifică comanda și plătește online pentru ridicare din Dorobanți sau Piața Rosetti.",
  },
  checkoutSuccess: {
    title: "Comandă confirmată — In House Pastrami & More",
    description: "Comanda ta a fost înregistrată. Te așteptăm la ridicare.",
  },
  terms: {
    title: "Termeni și condiții — In House Pastrami & More",
    description:
      "Termeni și condiții pentru comenzile cu ridicare de la In House Pastrami & More: plată, alergeni, SGR, anulare și ANPC.",
  },
  privacy: {
    title: "Politica de confidențialitate — In House Pastrami & More",
    description:
      "Cum prelucrăm numele, telefonul și datele comenzii, conform GDPR. Drepturile tale și contact ANSPDCP.",
  },
  cookies: {
    title: "Politica de cookies — In House Pastrami & More",
    description:
      "Ce stocare folosim pe site: doar date esențiale pentru coș. Fără cookie-uri de marketing sau analiză.",
  },
  admin: {
    title: "Admin meniu — In House Pastrami",
    description: "Administrare meniu.",
  },
} as const;

export interface PageHeadOptions {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}

export function absoluteUrl(path = "/", origin = getPublicSiteUrl()): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized === "/" ? "/" : normalized}`;
}

export function pageHead({ title, description, path, index = true }: PageHeadOptions) {
  const origin = getPublicSiteUrl();
  const url = absoluteUrl(path, origin);
  const image = `${origin}${OG_IMAGE_PATH}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(!index ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Shared tags for the root layout — no canonical/og:url so child routes can set their own. */
export function rootHeadDefaults() {
  const origin = getPublicSiteUrl();
  const image = `${origin}${OG_IMAGE_PATH}`;
  return {
    meta: [
      { title: PAGES.home.title },
      { name: "description", content: PAGES.home.description },
      { name: "author", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
    ],
  };
}

function postalAddress(location: StoreLocation) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    addressLocality: location.addressLocality,
    postalCode: location.postalCode,
    addressCountry: location.addressCountry,
  };
}

function openingHoursSpec(location: StoreLocation) {
  return location.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.dayOfWeek,
    opens: slot.opens,
    closes: slot.closes,
  }));
}

function sameAsLinks(): string[] {
  return [
    INSTAGRAM,
    ...DELIVERY_PLATFORMS.map((p) => p.url),
    ...LOCATIONS.map((l) => googleMapsUrl(l.mapsQuery)),
  ];
}

function restaurantNode(origin: string) {
  const primary = LOCATIONS[0];
  return {
    "@type": "Restaurant",
    "@id": `${origin}/#restaurant`,
    name: SITE_NAME,
    legalName: LEGAL.companyName,
    vatID: LEGAL.cuiDisplay,
    taxID: LEGAL.cui,
    url: origin,
    image: `${origin}${OG_IMAGE_PATH}`,
    logo: `${origin}/logo.png`,
    hasMenu: `${origin}/menu`,
    servesCuisine: ["American", "Deli", "Romanian"],
    telephone: primary.phone,
    areaServed: "București",
    address: postalAddress(primary),
    sameAs: sameAsLinks(),
  };
}

function locationNode(location: StoreLocation, origin: string) {
  return {
    "@type": "Restaurant",
    "@id": `${origin}/#${location.id}`,
    name: `${SITE_NAME} — ${location.name}`,
    parentOrganization: { "@id": `${origin}/#restaurant` },
    url: `${origin}/#visit`,
    image: `${origin}${OG_IMAGE_PATH}`,
    telephone: location.phone,
    address: postalAddress(location),
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    openingHoursSpecification: openingHoursSpec(location),
    hasMenu: `${origin}/menu`,
    servesCuisine: ["American", "Deli", "Romanian"],
    acceptsReservations: "False",
  };
}

const FAQ_ITEMS = [
  {
    question: "Ce este In House Pastrami & More?",
    answer:
      "In House Pastrami & More este un restaurant din București, deschis în 2021, specializat în pastramă de vită afumată în casă, sandvișuri Reuben, burgeri și poutine.",
  },
  {
    question: "Unde sunt locațiile din București?",
    answer:
      "Avem două locații: Dorobanți, Calea Dorobanți 61, și Piața Rosetti, Strada Speranței 1.",
  },
  {
    question: "Care este programul?",
    answer:
      "Dorobanți: luni–sâmbătă 11:00–22:00, duminică 11:00–21:00. Piața Rosetti: luni 11:00–21:00, marți–duminică 11:00–22:00.",
  },
  {
    question: "Cum comand pastramă în București?",
    answer:
      "Comanzi direct pe site pentru ridicare din Dorobanți sau Piața Rosetti, în aproximativ 15 minute. Livrăm și prin Glovo, Bolt Food și Wolt.",
  },
  {
    question: "Ce este special la pastrama in-house?",
    answer:
      "Pastrama (pastrami) de vită este maturată zile întregi, afumată lent și feliată la comandă. Nu este fast food — este un meșteșug.",
  },
  {
    question: "Ce găsesc în meniu?",
    answer:
      "Pastramă de vită și curcan, sandviș Reuben, poutine, burgeri (inclusiv cu sos de trufe), salate, garnituri și băuturi.",
  },
] as const;

function faqNode(origin: string) {
  return {
    "@type": "FAQPage",
    "@id": `${origin}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function restaurantGraphJsonLd(origin = getPublicSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@graph": [restaurantNode(origin), ...LOCATIONS.map((l) => locationNode(l, origin)), faqNode(origin)],
  };
}

export function menuJsonLd(origin = getPublicSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${origin}/menu#menu`,
    name: `Meniu ${SITE_NAME}`,
    url: `${origin}/menu`,
    hasMenuSection: MENU_SECTIONS.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.description || undefined,
    })),
    mainEntityOfPage: `${origin}/menu`,
  };
}

function locationMarkdown(location: StoreLocation): string {
  const hours = location.hours.replace("\n", "; ");
  return `- **${location.name}** — ${location.address}. Tel: ${location.phoneDisplay} (${location.phone}). Program: ${hours}. Ridicare ~15 min.`;
}

export function buildLlmsTxt(origin = getPublicSiteUrl()): string {
  return `# ${SITE_NAME}

> Restaurant de pastramă / pastrami afumată în casă în București. Sandvișuri Reuben, burgeri și poutine. Două locații: Dorobanți și Piața Rosetti.

${SITE_NAME} (est. 2021) prepară pastramă de vită maturată, afumată lent și feliată la comandă.

## Locații

${LOCATIONS.map(locationMarkdown).join("\n")}

## Specialități

- Pastramă de vită (Pastrami Classic, Pastrami Reuben, Pastrami In House)
- Poutine cu pastramă
- Burgeri, inclusiv cu sos de trufe
- Carne afumată și sandvișuri

## Comandă

- Direct pe site: ${origin}/menu — ridicare din Dorobanți sau Piața Rosetti
- Livrare: Glovo, Bolt Food, Wolt
- Instagram: ${INSTAGRAM}

## Pagini

- [Acasă](${origin}/): ${PAGES.home.description}
- [Meniu](${origin}/menu): ${PAGES.menu.description}
- [Termeni și condiții](${origin}${LEGAL_PATHS.terms})
- [Confidențialitate](${origin}${LEGAL_PATHS.privacy})
- [Cookies](${origin}${LEGAL_PATHS.cookies})
`;
}

export function buildLlmsFullTxt(origin = getPublicSiteUrl()): string {
  const categories = MENU_SECTIONS.map((c) => `- ${c.name}${c.description ? ` — ${c.description}` : ""}`).join(
    "\n",
  );
  const delivery = DELIVERY_PLATFORMS.map((p) => `- ${p.name}: ${p.url}`).join("\n");

  return `${buildLlmsTxt(origin).trim()}

## Poveste

Din 2021, doi prieteni au pornit de la pastrami — pastrama de vită dusă peste ocean de imigranții români la sfârșitul secolului XIX. După luni de încercări pe brisket, au ajuns la rețeta actuală. Pastrama adevărată nu e fast food: piepturi de vită la saramură zile întregi, rub de piper și mirodenii, afumare lentă, feliată la comandă.

Căutări frecvente: pastramă București, pastrami București, pastramă Dorobanți, pastramă Piața Rosetti, sandviș Reuben București, poutine București, carne afumată București.

## Categorii meniu

${categories}

## Livrare și social

${delivery}
- Instagram: ${INSTAGRAM}

## FAQ

${FAQ_ITEMS.map((item) => `**${item.question}**\n${item.answer}`).join("\n\n")}
`;
}

export const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "meta-externalagent",
] as const;

export function buildRobotsTxt(origin = getPublicSiteUrl()): string {
  const disallow = ["Disallow: /admin", "Disallow: /checkout", "Disallow: /api"].join("\n");
  const aiGroups = AI_CRAWLERS.map(
    (agent) => `User-agent: ${agent}\nAllow: /\n${disallow}`,
  ).join("\n\n");

  return `User-agent: *
Allow: /
${disallow}

${aiGroups}

Sitemap: ${origin}/sitemap.xml
# LLM context: ${origin}/llms.txt
`;
}

export function buildSitemapXml(origin = getPublicSiteUrl()): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${origin}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${origin}/menu`, priority: "0.8", changefreq: "weekly" },
    { loc: `${origin}${LEGAL_PATHS.terms}`, priority: "0.3", changefreq: "yearly" },
    { loc: `${origin}${LEGAL_PATHS.privacy}`, priority: "0.3", changefreq: "yearly" },
    { loc: `${origin}${LEGAL_PATHS.cookies}`, priority: "0.3", changefreq: "yearly" },
  ];

  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}
