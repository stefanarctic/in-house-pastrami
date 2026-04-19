import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Clock, Flame, Timer, Beef, ArrowRight, Instagram } from "lucide-react";
import heroImg from "@/assets/hero-pastrami.jpg";
import seasoningImg from "@/assets/seasoning.jpg";
import smokingImg from "@/assets/smoking.jpg";
import slicingImg from "@/assets/slicing.jpg";
import classicImg from "@/assets/menu-classic.jpg";
import reubenImg from "@/assets/menu-reuben.jpg";
import burgerImg from "@/assets/menu-burger.jpg";
import poutineImg from "@/assets/menu-poutine.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "tel:+40000000000";
const GLOVO = "https://glovoapp.com/ro/ro/bucharest/stores/in-house-pastrami-and-morebuc/";
const BOLT = "https://food.bolt.eu/en/325-bucharest/p/88214-in-house-pastrami-more-dorobanti/";
const WOLT = "https://wolt.com/en/rou/bucharest/restaurant/in-house-pastrami-more";
const INSTAGRAM = "https://www.instagram.com/pastrami.and.more/";

function Index() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="House-smoked Reuben pastrami sandwich, Bucharest" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative container mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs uppercase tracking-widest mb-6">
              <Flame className="h-3.5 w-3.5" /> Smoked in-house · Bucharest
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tight">
              Probably the <span className="text-gradient-meat">best pastrami</span> in Bucharest.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Brisket cured for days. Smoked low and slow. Hand-sliced to order. No shortcuts, no compromises.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-meat shadow-meat text-base h-12 px-7 hover:opacity-95">
                <a href="#order">Order Now <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 border-foreground/20 hover:bg-foreground/5">
                <a href="#menu">See the Menu</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                <span className="ml-1 text-foreground font-semibold">4.8</span>
              </div>
              <span>·</span>
              <span>1.000+ reviews on delivery apps</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SOCIAL PROOF */}
      <section className="border-y border-border/40 bg-card/40 py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee font-display tracking-widest text-2xl text-muted-foreground/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>★ 4.8 ON GLOVO</span><span className="text-primary">●</span>
              <span>HOUSE-SMOKED PASTRAMI</span><span className="text-primary">●</span>
              <span>★ 4.9 ON BOLT FOOD</span><span className="text-primary">●</span>
              <span>SLICED TO ORDER</span><span className="text-primary">●</span>
              <span>★ 5.0 ON WOLT</span><span className="text-primary">●</span>
              <span>STRADA SPERANȚEI 1</span><span className="text-primary">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT STORY */}
      <section id="story" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-ember pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">The Process</p>
            <h2 className="font-display text-5xl md:text-7xl leading-none">
              7 days of work.<br />
              <span className="text-gradient-meat">One perfect bite.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg">
              Real pastrami isn't fast food. It's a craft. We cure whole beef briskets for days, rub them with cracked black pepper and coriander, then smoke them until the bark is dark and the meat melts.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { img: seasoningImg, icon: Beef, step: "01", title: "Cured & Rubbed", text: "Whole briskets brined for days, then crusted in a pepper & spice rub." },
              { img: smokingImg, icon: Flame, step: "02", title: "Smoked Low & Slow", text: "Hours over wood smoke until the bark is black and the inside turns ruby pink." },
              { img: slicingImg, icon: Timer, step: "03", title: "Sliced To Order", text: "Never pre-cut. Every slice is hand-cut the moment you order it." },
            ].map((s) => (
              <div key={s.step} className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-deep">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={1280} height={1280} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
                  <div className="flex items-center gap-3 text-accent text-xs uppercase tracking-widest">
                    <s.icon className="h-4 w-4" /> Step {s.step}
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
      <section id="menu" className="py-24 md:py-32 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">The Menu</p>
              <h2 className="font-display text-5xl md:text-7xl leading-none">Built around the meat.</h2>
            </div>
            <Button asChild size="lg" className="bg-gradient-meat shadow-meat hover:opacity-95">
              <a href="#order">Order Now</a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { img: reubenImg, name: "The Reuben", tag: "Bestseller", desc: "House pastrami, melted swiss, sauerkraut, russian dressing on grilled rye.", price: "42 lei" },
              { img: classicImg, name: "Classic Pastrami", tag: "Bestseller", desc: "Stacked high on rye with mustard and a pickle. The way it should be.", price: "38 lei" },
              { img: burgerImg, name: "Smash Burger", desc: "Double smashed beef, american cheese, caramelized onion, house sauce.", price: "39 lei" },
              { img: poutineImg, name: "Pastrami Poutine", desc: "Crispy fries, gravy, cheese curds, topped with shredded pastrami.", price: "34 lei" },
            ].map((item) => (
              <article key={item.name} className="group flex gap-5 p-5 rounded-2xl bg-background/60 border border-border/60 hover:border-primary/60 transition-colors">
                <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
                  <img src={item.img} alt={item.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl md:text-3xl">{item.name}</h3>
                    {item.tag && <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-primary/15 text-primary rounded">{item.tag}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 flex-1">{item.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-2xl text-accent">{item.price}</span>
                    <a href="#order" className="text-xs uppercase tracking-widest text-primary hover:underline">Add to order →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Word on the street</p>
          <h2 className="font-display text-4xl md:text-6xl mb-12 max-w-3xl">People don't shut up about it.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "The Reuben here ruined every other sandwich for me. Genuinely the best pastrami in the city.", a: "Andrei M." },
              { q: "You can taste the smoke. You can taste the time. Worth every leu.", a: "Ioana D." },
              { q: "I've had pastrami in NYC. This holds up. Not joking.", a: "Mihai R." },
            ].map((t) => (
              <div key={t.a} className="p-7 rounded-2xl border border-border/60 bg-card/60">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
                <p className="mt-5 text-sm text-muted-foreground">— {t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER DIRECT */}
      <section id="order" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-meat opacity-90" />
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.25 }} />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-xs text-primary-foreground/80 mb-4">Order Direct</p>
          <h2 className="font-display text-5xl md:text-7xl text-primary-foreground leading-none">
            Skip the apps.<br />Order straight from us.
          </h2>
          <p className="mt-5 text-primary-foreground/90 text-lg">
            Faster pickup. No platform delays. Same pastrami, fresher in your hands.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 h-14 px-8 text-base font-semibold">
              <a href={PHONE}><Phone className="mr-2 h-5 w-5" /> Call to Order</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#visit"><MapPin className="mr-2 h-5 w-5" /> Pickup at Speranței 1</a>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-4">Or use a delivery app</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: "Glovo", url: GLOVO },
                { name: "Bolt Food", url: BOLT },
                { name: "Wolt", url: WOLT },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-background/15 hover:bg-background/25 text-primary-foreground text-sm border border-primary-foreground/20 transition-colors">
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Come Eat</p>
            <h2 className="font-display text-5xl md:text-6xl leading-none mb-8">Find us.</h2>
            <ul className="space-y-5 text-lg">
              <li className="flex gap-4"><MapPin className="h-6 w-6 text-primary shrink-0" /> Strada Speranței 1, București</li>
              <li className="flex gap-4"><Clock className="h-6 w-6 text-primary shrink-0" /> Mon–Sun · 12:00 – 22:00</li>
              <li className="flex gap-4"><Phone className="h-6 w-6 text-primary shrink-0" /> Call ahead for pickup</li>
              <li className="flex gap-4"><Instagram className="h-6 w-6 text-primary shrink-0" />
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-primary">@pastrami.and.more</a>
              </li>
            </ul>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 shadow-deep">
            <iframe
              title="In House Pastrami & More — Strada Speranței 1, București"
              src="https://www.google.com/maps?q=Strada+Speran%C8%9Bei+1,+Bucure%C8%99ti&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
