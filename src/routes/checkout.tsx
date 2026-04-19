import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, MapPin, Phone, Clock, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — In House Pastrami & More" },
      { name: "description", content: "Review your order and check out for pickup or delivery in Bucharest." },
      { property: "og:title", content: "Checkout — In House Pastrami & More" },
      { property: "og:description", content: "Order direct. Skip the platforms." },
    ],
  }),
  component: CheckoutPage,
});

type Mode = "pickup" | "delivery";

function CheckoutPage() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());

  const [mode, setMode] = useState<Mode>("pickup");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    time: "asap",
    notes: "",
  });

  const deliveryFee = mode === "delivery" ? 12 : 0;
  const total = subtotal + deliveryFee;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!form.name || !form.phone) {
      toast.error("We need your name and phone number.");
      return;
    }
    if (mode === "delivery" && !form.address) {
      toast.error("Please add a delivery address.");
      return;
    }
    setSubmitted(true);
    clear();
    toast.success("Order placed!", { description: "We'll call you to confirm." });
  };

  if (submitted) {
    return (
      <main className="container mx-auto px-4 py-24 max-w-xl text-center">
        <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/15 text-primary mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="font-display text-5xl">Order received.</h1>
        <p className="text-muted-foreground mt-4">
          We'll call <span className="text-foreground font-semibold">{form.phone}</span> in a minute to confirm
          your {mode === "pickup" ? "pickup" : "delivery"}. Thanks for ordering direct.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-gradient-meat shadow-meat">
            <Link to="/menu">Order more</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Back home</Link>
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
        <h1 className="font-display text-5xl">Your cart is empty.</h1>
        <p className="text-muted-foreground mt-4">
          Pick something from the menu — we recommend the Reuben.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-gradient-meat shadow-meat"
          onClick={() => navigate({ to: "/menu" })}
        >
          See the menu
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 md:py-16">
      <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to menu
      </Link>

      <h1 className="font-display text-5xl md:text-6xl leading-none mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-10">Order direct. Faster, fresher, no platform fees.</p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* LEFT — Cart + Form */}
        <div className="space-y-8">
          {/* CART */}
          <section>
            <h2 className="font-display text-2xl mb-4">Your order</h2>
            <ul className="rounded-2xl border border-border/60 bg-card/40 divide-y divide-border/60 overflow-hidden">
              {lines.map((line) => (
                <li key={line.id} className="p-4 flex gap-4 items-center">
                  <img src={line.image} alt={line.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl truncate">{line.name}</div>
                    {line.notes && <div className="text-xs text-muted-foreground">Note: {line.notes}</div>}
                    <div className="text-sm text-accent font-display">{line.price} lei</div>
                  </div>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-muted"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-muted"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="w-20 text-right font-display text-lg">{line.quantity * line.price} lei</div>
                  <button
                    onClick={() => remove(line.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Mode toggle */}
            <div>
              <h2 className="font-display text-2xl mb-4">How do you want it?</h2>
              <div className="grid grid-cols-2 gap-3">
                {(["pickup", "delivery"] as Mode[]).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMode(m)}
                    className={`p-5 rounded-xl border text-left transition-colors ${
                      mode === m
                        ? "border-primary bg-primary/10 shadow-meat"
                        : "border-border/60 bg-card/40 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-display text-xl">
                      {m === "pickup" ? <MapPin className="h-5 w-5 text-primary" /> : <Clock className="h-5 w-5 text-primary" />}
                      {m === "pickup" ? "Pickup" : "Delivery"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {m === "pickup" ? "Ready in ~15 min · Speranței 1" : "30–45 min · 12 lei in central Bucharest"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Your details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                    placeholder="07xx xxx xxx"
                  />
                </Field>
              </div>
              {mode === "delivery" && (
                <Field label="Delivery address" required>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="input"
                    placeholder="Street, number, apartment, intercom code…"
                  />
                </Field>
              )}
              <Field label="When">
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="input"
                >
                  <option value="asap">As soon as possible</option>
                  <option value="30">In 30 minutes</option>
                  <option value="60">In 1 hour</option>
                  <option value="later">Later — call me</option>
                </select>
              </Field>
              <Field label="Notes (optional)">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input resize-none"
                  placeholder="Allergies, ring twice, leave at door…"
                />
              </Field>
            </div>

            {/* Submit (mobile shows in summary card) */}
            <Button
              type="submit"
              size="lg"
              className="w-full lg:hidden bg-gradient-meat shadow-meat h-14 text-base"
            >
              Place order · {total} lei
            </Button>
          </form>
        </div>

        {/* RIGHT — Summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4">
            <h2 className="font-display text-2xl">Summary</h2>
            <Row label="Subtotal" value={`${subtotal} lei`} />
            <Row label={mode === "pickup" ? "Pickup" : "Delivery fee"} value={deliveryFee ? `${deliveryFee} lei` : "Free"} />
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
              Place order
            </Button>
            <p className="text-xs text-muted-foreground flex items-center gap-2 pt-2">
              <Phone className="h-3.5 w-3.5" /> We'll call to confirm before preparing your order.
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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
