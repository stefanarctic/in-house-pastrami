import { useLanguage, type Lang } from "@/i18n/LanguageProvider";

export function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  const item = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      className={`px-2 py-1 text-xs uppercase tracking-widest rounded-md cursor-pointer transition-colors ${
        lang === l
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
      aria-pressed={lang === l}
      aria-label={`Switch language to ${label}`}
    >
      {label}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-0.5 border border-border/60 rounded-md p-0.5">
      {item("ro", "RO")}
      {item("en", "EN")}
    </div>
  );
}
