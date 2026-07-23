import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Flame,
  Timer,
  Beef,
  ArrowRight,
  Instagram,
  ShoppingBag,
} from "lucide-react";
import heroImg from "@/assets/hero-pastrami.webp";
import logo from "@/assets/logo.png";
import seasoningImg from "@/assets/seasoning.webp";
import smokingImg from "@/assets/smoking.webp";
import slicingImg from "@/assets/slicing.webp";
import galReuben from "@/assets/menu-items/pastrami reuben.webp";
import galPhilly from "@/assets/menu-items/philly platforme.webp";
import galPastramiHouse from "@/assets/menu-items/pastrami in house.webp";
import galPoutine from "@/assets/menu-items/PASTRAMI POUTINE 300G.webp";
import galBurgerTrufe from "@/assets/menu-items/burger sos trufe.webp";
import galSausages from "@/assets/menu-items/HOMEMADE SAUSAGES IN HOUSE  420G.webp";
import galPulled from "@/assets/menu-items/pulled beef.webp";
import galSalata from "@/assets/menu-items/SALATA PASTRAMI 350G.webp";
import { type MenuItem } from "@/data/menu";
import { LOCATIONS, mapsEmbedUrl } from "@/data/locations";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GalleryBento } from "@/components/site/GalleryBento";
import { useMenuItems } from "@/hooks/useMenuItems";

export const Route = createFileRoute("/")({
  component: Index,
});

const GLOVO = "https://glovoapp.com/ro/ro/bucharest/stores/in-house-pastrami-and-morebuc/";
const BOLT = "https://food.bolt.eu/en/325-bucharest/p/88214-in-house-pastrami-more-dorobanti/";
const WOLT = "https://wolt.com/en/rou/bucharest/restaurant/in-house-pastrami-more";
const INSTAGRAM = "https://www.instagram.com/pastrami.and.more/";
const SHOWCASE_IDS = [
  "pastrami-reuben",
  "burger-truffle",
  "philly-cheesesteak",
  "pastrami-poutine",
];

function Index() {
  const { t } = useLanguage();
  const { data: menu = [] } = useMenuItems({ availableOnly: true });
  const showcaseItems = SHOWCASE_IDS.map((id) => menu.find((item) => item.id === id)).filter(
    (item): item is MenuItem => Boolean(item),
  );

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[88svh] md:min-h-[92vh] flex items-end md:items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Sandviș Reuben cu pastramă afumată în casă, București"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-[center_30%] md:object-center"
          />
          {/* Mobile: bottom fade for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40 md:hidden" />
          {/* Desktop: side + edge fades */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative container mx-auto px-4 pt-20 pb-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
              <Flame className="h-3.5 w-3.5 shrink-0" /> {t("hero.badge")}
            </div>
            <h1 className="font-display text-[2.75rem] leading-[0.92] sm:text-6xl md:text-8xl md:leading-[0.9] tracking-tight">
              {t("hero.title1")} <span className="text-gradient-meat">{t("hero.titleAccent")}</span>{" "}
              {t("hero.title2")}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-md">
              {t("hero.sub")}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-meat shadow-meat text-base h-12 px-7 hover:opacity-95 w-full sm:w-auto"
              >
                <Link to="/menu">
                  {t("cta.orderNow")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 border-foreground/20 hover:bg-foreground/5 w-full sm:w-auto"
              >
                <Link to="/menu">{t("cta.seeMenu")}</Link>
              </Button>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
                <span className="ml-1 text-foreground font-semibold">4.8</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <span>{t("hero.reviews")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SOCIAL PROOF */}
      <section className="border-y border-border/40 bg-card/40 py-5 overflow-hidden">
        <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-marquee font-display tracking-widest text-lg sm:text-2xl text-muted-foreground/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-8 sm:gap-12 shrink-0">
              <span>★ 4.8 PE GLOVO</span>
              <span className="text-primary">●</span>
              <span>PASTRAMĂ AFUMATĂ ÎN CASĂ</span>
              <span className="text-primary">●</span>
              <span>★ 4.9 PE BOLT FOOD</span>
              <span className="text-primary">●</span>
              <span>FELIATĂ LA COMANDĂ</span>
              <span className="text-primary">●</span>
              <span>★ 5.0 PE WOLT</span>
              <span className="text-primary">●</span>
              <span>DOROBANȚI &amp; PIAȚA ROSETTI</span>
              <span className="text-primary">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / OUR STORY */}
      <section id="about" className="relative py-14 md:py-20 overflow-hidden bg-background border-y border-border/40">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto font-hand text-center text-foreground">
            <img
              src={logo}
              alt="In House Pastrami & More"
              width={88}
              height={88}
              className="mx-auto mb-5 h-16 w-16 md:h-20 md:w-20 rounded-full shadow-meat"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-none mb-1">
              Descoperă povestea
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-none text-accent mb-6">
              Pastrami &amp; more
            </h2>
            <div className="space-y-4 text-lg sm:text-xl md:text-2xl leading-snug text-foreground/90">
              <p>
                Călătoria a doi prieteni în lumea gusturilor autentice. Am plecat de la pastrami,
                renumita pastramă de vită dusă peste ocean de evreii români la sfârșitul secolului
                XIX-lea, iar după luni de încercări și sute de kilograme de Brisket gătite, am
                ajuns la rețeta actuală.
              </p>
              <p>
                Am îmbogățit meniul cu preparate surprinzătoare și, pentru a vă oferi o experiență
                culinară de neuitat, suntem tot timpul în căutare de gusturi noi.
              </p>
              <p className="text-accent">
                Vă așteptăm să ne bucurăm împreună de această călătorie!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT STORY */}
      <section id="story" className="relative py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-ember pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Procesul</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">
              7 zile de muncă.
              <br />
              <span className="text-gradient-meat">O singură îmbucătură perfectă.</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-muted-foreground text-base sm:text-lg">
              Pastramă adevărată, nu e fast food. E un meșteșug. Maturăm piepturi întregi de vită
              zile întregi, le ungem cu piper negru spart și coriandru, apoi le afumăm până când
              crusta e închisă la culoare și carnea se topește.
            </p>
          </div>

          <div className="mt-10 sm:mt-16 grid md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                img: seasoningImg,
                icon: Beef,
                step: "01",
                title: "Maturat & Condimentat",
                text: "Piepturi întregi puse la saramură zile întregi, apoi învelite într-un rub de piper și mirodenii.",
              },
              {
                img: smokingImg,
                icon: Flame,
                step: "02",
                title: "Afumat Lent",
                text: "Ore întregi în fumul de lemn, până când crusta e neagră și interiorul devine roz-rubiniu.",
              },
              {
                img: slicingImg,
                icon: Timer,
                step: "03",
                title: "Feliat la Comandă",
                text: "Niciodată pre-tăiat. Fiecare felie e tăiată manual chiar în momentul comenzii.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-deep"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1280}
                    height={1280}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
                  <div className="flex items-center gap-3 text-accent text-xs uppercase tracking-widest">
                    <s.icon className="h-4 w-4" /> Pasul {s.step}
                  </div>
                  <h3 className="font-display text-2xl mt-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-16 sm:py-24 md:py-32 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-start sm:items-end justify-between flex-col sm:flex-row flex-wrap gap-4 mb-8 sm:mb-12">
            <div>
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Meniul</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">
                Construit în jurul pastramei.
              </h2>
            </div>
            <Button asChild size="lg" className="bg-gradient-meat shadow-meat hover:opacity-95 w-full sm:w-auto">
              <Link to="/menu">
                Vezi tot meniul <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {showcaseItems.map((item) => (
              <article
                key={item.name}
                className="group flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-background/60 border border-border/60 hover:border-primary/60 transition-colors"
              >
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl">{item.name}</h3>
                    {item.tag && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-primary/15 text-primary rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 flex-1">{item.shortDesc}</p>
                  <div className="flex items-center justify-between gap-2 mt-3 flex-wrap">
                    <span className="font-display text-xl sm:text-2xl text-accent">
                      {item.price} lei
                    </span>
                    <Link
                      to="/menu"
                      className="text-xs uppercase tracking-widest text-primary hover:underline whitespace-nowrap"
                    >
                      Adaugă →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 sm:py-24 md:py-32 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-start sm:items-end justify-between flex-col sm:flex-row flex-wrap gap-4 mb-8 sm:mb-12">
            <div className="max-w-2xl">
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Galerie</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">
                Vezi cu <span className="text-gradient-meat">ochii tăi.</span>
              </h2>
              <p className="mt-4 sm:mt-5 text-muted-foreground text-base sm:text-lg">
                Crustă neagră, miez roz-rubiniu, fum, unt topit pe pâine prăjită. Fără filtre,
                fără efecte. Doar carne adevărată.
              </p>
            </div>
            <Button asChild variant="outline" className="border-foreground/20 hover:bg-foreground/5 w-full sm:w-auto">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <Instagram className="mr-1 h-4 w-4" /> @pastrami.and.more
              </a>
            </Button>
          </div>

          <GalleryBento
            images={[
              { src: galPastramiHouse, alt: "Pastramă feliată la comandă", caption: "Pastrami In House" },
              { src: galReuben, alt: "Sandviș Reuben cu pastramă afumată", caption: "Reuben cu pastramă" },
              { src: galPoutine, alt: "Pastrami Poutine cu sos brun", caption: "Pastrami Poutine" },
              { src: galBurgerTrufe, alt: "Burger cu sos de trufe", caption: "Burger cu trufe" },
              { src: galSausages, alt: "Cârnați făcuți în casă", caption: "Cârnați In House" },
              { src: galSalata, alt: "Salată cu pastramă", caption: "Salată Pastrami" },
            ]}
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Vorba de pe stradă</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 max-w-3xl">
            Lumea nu mai tace despre el.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                q: "Reuben-ul de aici mi-a stricat orice alt sandviș. Sincer, cea mai bună pastramă din oraș.",
                a: "Andrei M.",
              },
              { q: "Simți fumul. Simți timpul. Merită fiecare leu.", a: "Ioana D." },
              {
                q: "Am mâncat pastramă în NYC. Asta se ridică la nivel. Nu glumesc.",
                a: "Mihai R.",
              },
            ].map((t) => (
              <div key={t.a} className="p-7 rounded-2xl border border-border/60 bg-card/60">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
                <p className="mt-5 text-sm text-muted-foreground">— {t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER DIRECT */}
      <section id="order" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-meat opacity-90" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
            opacity: 0.25,
          }}
        />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-xs text-primary-foreground/80 mb-4">
            Comandă Direct
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-none">
            Sari peste aplicații.
            <br />
            Comandă direct de la noi.
          </h2>
          <p className="mt-5 text-primary-foreground/90 text-base sm:text-lg">
            Ridicare mai rapidă. Fără întârzieri de platformă. Aceeași pastramă, mai proaspătă în
            mâinile tale.
          </p>
          <div className="mt-8 sm:mt-9 flex flex-col items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 h-14 px-8 text-base font-semibold w-full sm:w-auto"
            >
              <Link to="/menu">
                <ShoppingBag className="mr-2 h-5 w-5" /> Începe comanda
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              {LOCATIONS.map((loc) => (
                <Button
                  key={loc.id}
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-4 sm:px-6 text-sm sm:text-base border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
                >
                  <a href={`tel:${loc.phone}`} className="min-w-0">
                    <Phone className="mr-2 h-5 w-5 shrink-0" />
                    <span className="truncate">
                      {loc.shortName}: {loc.phoneDisplay}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-4">
              Sau folosește o aplicație de livrare
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: "Glovo", url: GLOVO },
                { name: "Bolt Food", url: BOLT },
                { name: "Wolt", url: WOLT },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-background/15 hover:bg-background/25 text-primary-foreground text-sm border border-primary-foreground/20 transition-colors"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Vino să mănânci</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none mb-8 sm:mb-12">
            Găsește-ne.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-4">{loc.name}</h3>
                  <ul className="space-y-4 text-base sm:text-lg">
                    <li className="flex gap-3 sm:gap-4">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 mt-0.5" />
                      <span className="min-w-0 break-words">{loc.address}</span>
                    </li>
                    <li className="flex gap-3 sm:gap-4">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{loc.hours}</span>
                    </li>
                    <li className="flex gap-3 sm:gap-4">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                      <a href={`tel:${loc.phone}`} className="hover:text-primary">
                        {loc.phoneDisplay}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 shadow-deep">
                  <iframe
                    title={`In House Pastrami & More — ${loc.address}`}
                    src={mapsEmbedUrl(loc.mapsQuery)}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-lg">
            <li className="flex gap-4">
              <Instagram className="h-6 w-6 text-primary shrink-0" />
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-primary">
                @pastrami.and.more
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
