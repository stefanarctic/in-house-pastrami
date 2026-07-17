import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import { CATEGORIES, type MenuItem, type Category } from "@/data/menu";
import { MenuItemDialog } from "@/components/site/MenuItemDialog";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useMenuItems } from "@/hooks/useMenuItems";
import { isFirebaseClientConfigured } from "@/lib/firebase-web";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Meniu — In House Pastrami & More · București" },
      {
        name: "description",
        content:
          "Meniul complet: pastramă făcută în house, burgeri, poutine, salate și sandvișuri cu carne. Comandă direct în București.",
      },
      { property: "og:title", content: "Meniu — In House Pastrami & More" },
      {
        property: "og:description",
        content:
          "Pastrami Classic, Reuben, burgeri cu sos de trufe, poutine cu pastramă și multe altele. Comandă direct.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [open, setOpen] = useState(false);
  const add = useCart((s) => s.add);
  const syncFromMenu = useCart((s) => s.syncFromMenu);
  const { t } = useLanguage();
  const { data: menu = [], isLoading, isError, error } = useMenuItems({ availableOnly: true });

  useEffect(() => {
    if (menu.length) syncFromMenu(menu);
  }, [menu, syncFromMenu]);

  const visible = useMemo(
    () => (active === "all" ? menu : menu.filter((m) => m.category === active)),
    [active, menu],
  );

  const grouped = useMemo(() => {
    const groups: Record<Category, MenuItem[]> = {
      carne: [],
      burgers: [],
      poutine: [],
      salate: [],
      garnituri: [],
    };
    visible.forEach((m) => groups[m.category].push(m));
    return groups;
  }, [visible]);

  const openItem = (item: MenuItem) => {
    setSelected(item);
    setOpen(true);
  };

  const quickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    add(item, 1);
    toast.success(`${item.name} adăugat`, { description: `${item.price} lei` });
  };

  return (
    <main className="overflow-x-hidden">
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-ember pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">{t("menu.heroKicker")}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-none">
            {t("menu.heroTitle1")}{" "}
            <span className="text-gradient-meat">{t("menu.heroTitleAccent")}</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl text-lg">{t("menu.heroSub")}</p>
        </div>
      </section>

      <section className="sticky top-[57px] z-30 bg-background/85 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {[
            { id: "all" as const, label: t("menu.tabsAll") },
            ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                active === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-meat"
                  : "bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-16">
          {!isFirebaseClientConfigured() && (
            <p className="text-destructive text-sm">
              Firebase nu este configurat. Adaugă variabilele VITE_FIREBASE_* în .env.
            </p>
          )}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Se încarcă meniul…
            </div>
          )}
          {isError && (
            <p className="text-destructive text-sm">
              Nu am putut încărca meniul
              {error instanceof Error ? `: ${error.message}` : "."}
            </p>
          )}
          {!isLoading && !isError && menu.length === 0 && isFirebaseClientConfigured() && (
            <p className="text-muted-foreground text-sm">
              Meniul este gol. Rulează <code className="text-foreground">npm run seed:menu</code>{" "}
              după ce configurezi Firebase.
            </p>
          )}
          {CATEGORIES.map((cat) => {
            const items = grouped[cat.id];
            if (!items.length) return null;
            return (
              <div key={cat.id} id={cat.id}>
                <div className="mb-6">
                  <h2 className="font-display text-3xl md:text-5xl leading-none">{cat.label}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{cat.blurb}</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openItem(item)}
                      className="group text-left flex flex-col rounded-2xl bg-card/60 border border-border/60 hover:border-primary/60 transition-all overflow-hidden"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start gap-2">
                          <h3 className="font-display text-2xl flex-1">{item.name}</h3>
                          {item.tag && (
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-primary/15 text-primary rounded">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 flex-1">{item.shortDesc}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-display text-2xl text-accent">{item.price} lei</span>
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => quickAdd(e, item)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                quickAdd(e as unknown as React.MouseEvent, item);
                              }
                            }}
                            className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-gradient-meat text-primary-foreground text-xs uppercase tracking-widest shadow-meat hover:opacity-95"
                          >
                            <Plus className="h-3.5 w-3.5" /> {t("cta.add")}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">{t("menu.readyTitle")}</h3>
            <p className="text-muted-foreground mt-1">{t("menu.readySub")}</p>
          </div>
          <Button asChild size="lg" className="bg-gradient-meat shadow-meat hover:opacity-95 h-12 px-7">
            <Link to="/checkout">
              {t("cta.checkout")} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <MenuItemDialog item={selected} open={open} onOpenChange={setOpen} />
    </main>
  );
}
