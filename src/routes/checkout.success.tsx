import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "@/store/cart";

const successSearchSchema = z.object({
  session_id: z.string().min(1),
  location_id: z.string().min(1),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: successSearchSchema,
  head: () => ({
    meta: [{ title: "Comandă confirmată — In House Pastrami & More" }],
  }),
  component: CheckoutSuccessPage,
});

interface SessionDetails {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  locationName: string;
  locationAddress: string;
}

interface FulfillResponse {
  status: "success" | "failed";
  dinehubOrderId?: string;
  error?: string;
}

type DineHubUiStatus = "loading" | "success" | "failed";

function CheckoutSuccessPage() {
  const { session_id, location_id } = Route.useSearch();
  const clear = useCart((s) => s.clear);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<SessionDetails | null>(null);
  const [dinehubStatus, setDinehubStatus] = useState<DineHubUiStatus>("loading");
  const [dinehubError, setDinehubError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function verifyAndFulfill() {
      try {
        const sessionRes = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(session_id)}&location_id=${encodeURIComponent(location_id)}`,
        );
        const sessionData = (await sessionRes.json()) as SessionDetails & { error?: string };

        if (!sessionRes.ok) {
          throw new Error(sessionData.error ?? "Nu am putut verifica plata.");
        }

        if (!cancelled) {
          setDetails(sessionData);
          clear();
          setLoading(false);
        }

        const fulfillRes = await fetch("/api/checkout/fulfill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id, location_id }),
        });
        const fulfillData = (await fulfillRes.json()) as FulfillResponse;

        if (cancelled) return;

        if (fulfillData.status === "success") {
          setDinehubStatus("success");
          console.info("[DineHub] Comandă trimisă cu succes.", {
            sessionId: session_id,
            dinehubOrderId: fulfillData.dinehubOrderId,
          });
          return;
        }

        const errMsg = fulfillData.error ?? "Comanda nu a putut fi trimisă în bucătărie.";
        setDinehubStatus("failed");
        setDinehubError(errMsg);
        console.error("[DineHub] Comanda NU a fost trimisă.", {
          sessionId: session_id,
          error: errMsg,
        });
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Eroare la verificare.";
          setError(message);
          setLoading(false);
          setDinehubStatus("failed");
          setDinehubError(message);
          console.error("[checkout/success]", message);
        }
      }
    }

    verifyAndFulfill();
    return () => {
      cancelled = true;
    };
  }, [session_id, location_id, clear]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-24 max-w-xl text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary mb-6" />
        <p className="text-muted-foreground">Verificăm plata…</p>
      </main>
    );
  }

  if (error || !details) {
    return (
      <main className="container mx-auto px-4 py-24 max-w-xl text-center">
        <h1 className="font-display text-4xl">Ceva nu a mers bine</h1>
        <p className="text-muted-foreground mt-4">{error ?? "Plata nu a putut fi confirmată."}</p>
        <Button asChild size="lg" className="mt-8" variant="outline">
          <Link to="/checkout">Înapoi la checkout</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24 max-w-xl text-center">
      <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/15 text-primary mb-6">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="font-display text-5xl">Comandă confirmată.</h1>
      <p className="text-muted-foreground mt-4">
        Plata a fost procesată. Ridică comanda de la{" "}
        <span className="text-foreground font-semibold">{details.locationName}</span> (
        {details.locationAddress}) — {details.pickupTime}.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Te contactăm la <span className="text-foreground">{details.customerPhone}</span> dacă e nevoie.
      </p>

      <DineHubStatusBanner status={dinehubStatus} error={dinehubError} />

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

function DineHubStatusBanner({
  status,
  error,
}: {
  status: DineHubUiStatus;
  error: string | null;
}) {
  if (status === "loading") {
    return (
      <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Trimitem comanda în bucătărie…
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
        Comanda a ajuns în bucătărie (DineHub).
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-left">
      <div className="flex items-start gap-2 text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Comanda nu a ajuns în bucătărie.</p>
          <p className="mt-1 text-destructive/90 text-xs break-words">{error}</p>
          <p className="mt-2 text-muted-foreground text-xs">
            Plata e în regulă — sună la restaurant cu detaliile comenzii.
          </p>
        </div>
      </div>
    </div>
  );
}
