import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { MENU, CATEGORIES, type MenuItem, type Category } from "@/data/menu";
import { MenuItemDialog } from "@/components/site/MenuItemDialog";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — In House Pastrami & More · Bucharest" },
      {
        name: "description",
        content:
          "Full menu: house-smoked pastrami sandwiches, smash burgers, poutine, sides and drinks. Order direct in Bucharest.",
      },
      { property: "og:title", content: "Menu — In House Pastrami & More" },
      {
        property: "og:description",
        content: "Reuben, classic pastrami, smash burgers, pastrami poutine and more. Order direct.",
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
  const { t } = useLanguage();

  const visible = useMemo(
    () => (active === "all" ? MENU : MENU.filter((m) => m.category === active)),
    [active],
  );

  const grouped = useMemo(() => {
    const groups: Record<Category, MenuItem[]> = {
      sandwiches: [],
      burgers: [],
      sides: [],
      drinks: [],
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
    toast.success(`${item.name} added`, { description: `${item.price} lei` });
  };

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-ember pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">{t("menu.heroKicker")}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-none">
            {t("menu.heroTitle1")} <span className="text-gradient-meat">{t("menu.heroTitleAccent")}</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl text-lg">
            {t("menu.heroSub")}
          </p>
        </div>
      </section>

      {/* TABS */}
      <section className="sticky top-[57px] z-30 bg-background/85 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {[{ id: "all" as const, label: t("menu.tabsAll") }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map(
            (t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                  active === t.id
                    ? "bg-primary text-primary-foreground border-primary shadow-meat"
                    : "bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {t.label}
              </button>
            ),
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-16">
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

      {/* CTA */}
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
