import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ro" | "en";

type Dict = Record<string, { ro: string; en: string }>;

const DICT: Dict = {
  "nav.menu": { ro: "Meniu", en: "Menu" },
  "nav.pastrami": { ro: "Pastrama Noastră", en: "Our Pastrami" },
  "nav.visit": { ro: "Vizitează-ne", en: "Visit" },
  "cta.orderNow": { ro: "Comandă Acum", en: "Order Now" },
  "cta.seeMenu": { ro: "Vezi Meniul", en: "See the Menu" },
  "cta.seeFullMenu": { ro: "Vezi tot meniul", en: "See full menu" },
  "cta.startOrder": { ro: "Începe comanda", en: "Start your order" },
  "cta.callOrder": { ro: "Sună pentru comandă", en: "Call to Order" },
  "cta.checkout": { ro: "Mergi la finalizare", en: "Go to checkout" },
  "cta.add": { ro: "Adaugă", en: "Add" },

  "hero.badge": { ro: "Afumată în casă · București", en: "Smoked in-house · Bucharest" },
  "hero.title1": { ro: "Probabil cea mai", en: "Probably the" },
  "hero.titleAccent": { ro: "bună pastramă", en: "best pastrami" },
  "hero.title2": { ro: "din București.", en: "in Bucharest." },
  "hero.sub": {
    ro: "Piept de vită maturat zile întregi. Afumat lent. Feliat la comandă. Fără scurtături, fără compromisuri.",
    en: "Brisket cured for days. Smoked low and slow. Hand-sliced to order. No shortcuts, no compromises.",
  },
  "hero.reviews": { ro: "1.000+ recenzii pe aplicații de livrare", en: "1.000+ reviews on delivery apps" },

  "menu.tabsAll": { ro: "Toate", en: "All" },
  "menu.heroKicker": { ro: "Meniul Complet", en: "The Full Menu" },
  "menu.heroTitle1": { ro: "Alege-ți", en: "Pick your" },
  "menu.heroTitleAccent": { ro: "arma.", en: "weapon." },
  "menu.heroSub": {
    ro: "Apasă pe orice produs pentru detalii, alergeni și instrucțiuni speciale. Adaugă pe parcurs.",
    en: "Tap any item for full details, allergens and special instructions. Add as you go.",
  },
  "menu.readyTitle": { ro: "Gata de mâncat?", en: "Ready to eat?" },
  "menu.readySub": {
    ro: "Verifică comanda și finalizează — ridicare sau livrare.",
    en: "Review your order and check out — pickup or delivery.",
  },

  "dialog.whats": { ro: "Ce conține", en: "What's in it" },
  "dialog.notes": { ro: "Instrucțiuni speciale", en: "Special instructions" },
  "dialog.notesPh": { ro: "Fără murături, muștar în plus…", en: "No pickles, extra mustard…" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "ro" || saved === "en") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // ignore
    }
  };

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => DICT[key]?.[lang] ?? String(key),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
