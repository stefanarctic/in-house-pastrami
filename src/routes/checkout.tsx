import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  MapPin,
  Phone,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { LOCATIONS, getLocation } from "@/data/locations";
import { getItem } from "@/data/menu";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizare comandă — In House Pastrami & More" },
      {
        name: "description",
        content: "Verifică comanda și finalizează pentru ridicare din Dorobanți sau Piața Rosetti.",
      },
      { property: "og:title", content: "Finalizare comandă — In House Pastrami & More" },
      { property: "og:description", content: "Comandă direct. Sari peste platforme." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());

  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "asap",
    notes: "",
  });

  const location = getLocation(locationId)!;
  const total = subtotal;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) {
      toast.error("Coșul tău e gol.");
      return;
    }
    if (!form.name || !form.phone) {
      toast.error("Avem nevoie de numele și numărul tău de telefon.");
      return;
    }
    setSubmitted(true);
    clear();
    toast.success("Comandă plasată!", { description: "Te sunăm să confirmăm." });
  };

  if (submitted) {
    return (
      <main className="container mx-auto px-4 py-24 max-w-xl text-center">
        <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/15 text-primary mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="font-display text-5xl">Comandă primită.</h1>
        <p className="text-muted-foreground mt-4">
          Te sunăm la <span className="text-foreground font-semibold">{form.phone}</span> într-un
          minut ca să confirmăm ridicarea de la{" "}
          <span className="text-foreground font-semibold">{location.name}</span> (
          {location.address}). Mulțumim că ai comandat direct.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-gradient-meat shadow-meat">
            <Link to="/menu">Mai comandă</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Înapoi acasă</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!lines.length) {
    return (
      <main className="container mx-auto px-4 py-24 max-w-xl text-center">
        <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-muted text-muted-foreground mb-6">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-display text-5xl">Coșul tău e gol.</h1>
        <p className="text-muted-foreground mt-4">
          Alege ceva din meniu — îți recomandăm Reuben-ul.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-gradient-meat shadow-meat"
          onClick={() => navigate({ to: "/menu" })}
        >
          Vezi meniul
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 md:py-16 pb-28 md:pb-16">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 md:mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Înapoi la meniu
      </Link>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none mb-2">
        Finalizare
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-6 md:mb-10">
        Comandă direct. Mai rapid, mai proaspăt, fără comisioane de platformă.
      </p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* LEFT — Cart + Form */}
        <div className="space-y-8">
          {/* CART */}
          <section>
            <h2 className="font-display text-2xl mb-4">Comanda ta</h2>
            <ul className="rounded-2xl border border-border/60 bg-card/40 divide-y divide-border/60 overflow-hidden">
              {lines.map((line) => {
                const image = getItem(line.id)?.image ?? line.image;
                return (
                <li
                  key={line.id}
                  className="p-3 sm:p-4 grid grid-cols-[auto_1fr_auto] sm:flex gap-3 sm:gap-4 sm:items-center"
                >
                  <img
                    src={image}
                    alt={line.name}
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover row-span-2"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base sm:text-xl truncate">{line.name}</div>
                    {line.notes && (
                      <div className="text-xs text-muted-foreground truncate">
                        Notă: {line.notes}
                      </div>
                    )}
                    <div className="text-sm text-accent font-display">{line.price} lei</div>
                  </div>
                  <button
                    onClick={() => remove(line.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start sm:order-last p-1"
                    aria-label="Șterge"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:contents">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        className="h-8 w-8 grid place-items-center hover:bg-muted"
                        aria-label="Scade"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                      <button
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        className="h-8 w-8 grid place-items-center hover:bg-muted"
                        aria-label="Crește"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="sm:w-20 text-right font-display text-base sm:text-lg">
                      {line.quantity * line.price} lei
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          </section>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Location picker */}
            <div>
              <h2 className="font-display text-2xl mb-1">De unde ridici?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Comenzile de pe site sunt doar cu ridicare.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {LOCATIONS.map((loc) => (
                  <button
                    type="button"
                    key={loc.id}
                    onClick={() => setLocationId(loc.id)}
                    className={`p-3 sm:p-5 rounded-xl border text-left transition-colors min-w-0 ${
                      locationId === loc.id
                        ? "border-primary bg-primary/10 shadow-meat"
                        : "border-border/60 bg-card/40 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-display text-base sm:text-xl">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                      <span className="truncate">{loc.name}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">
                      Gata în {loc.pickupEta} · {loc.address}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Datele tale</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nume" required>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Numele tău"
                  />
                </Field>
                <Field label="Telefon" required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                    placeholder="07xx xxx xxx"
                  />
                </Field>
              </div>
              <Field label="Când">
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="input"
                >
                  <option value="asap">Cât mai repede</option>
                  <option value="30">În 30 de minute</option>
                  <option value="60">Într-o oră</option>
                  <option value="later">Mai târziu — sună-mă</option>
                </select>
              </Field>
              <Field label="Observații (opțional)">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input resize-none"
                  placeholder="Alergii, sună de două ori…"
                />
              </Field>
            </div>

            {/* Submit (mobile shows in summary card) */}
            <Button
              type="submit"
              size="lg"
              className="w-full lg:hidden bg-gradient-meat shadow-meat h-14 text-base"
            >
              Plasează comanda · {total} lei
            </Button>
          </form>
        </div>

        {/* RIGHT — Summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4">
            <h2 className="font-display text-2xl">Sumar</h2>
            <Row label="Subtotal" value={`${subtotal} lei`} />
            <Row label="Ridicare" value="Gratis" />
            <div className="rounded-lg bg-muted/40 px-3 py-2.5 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-muted-foreground text-xs">{location.address}</div>
                </div>
              </div>
            </div>
            <div className="h-px bg-border/60" />
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">Total</span>
              <span className="font-display text-3xl text-accent">{total} lei</span>
            </div>
            <Button
              type="submit"
              size="lg"
              onClick={onSubmit}
              className="hidden lg:flex w-full bg-gradient-meat shadow-meat h-14 text-base"
            >
              Plasează comanda
            </Button>
            <p className="text-xs text-muted-foreground flex items-center gap-2 pt-2">
              <Phone className="h-3.5 w-3.5" /> Te sunăm să confirmăm înainte să pregătim comanda.
            </p>
          </div>
        </aside>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-input);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-ring);
          box-shadow: 0 0 0 1px var(--color-ring);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-accent block mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
