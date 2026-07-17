import { createFileRoute } from "@tanstack/react-router";
import { getStripe } from "@/lib/stripe";
import { getAllLocationIds } from "@/lib/location-secrets";
import { getLocation } from "@/data/locations";
import { pickupTimeLabel } from "@/lib/order";

export const Route = createFileRoute("/api/checkout/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const sessionId = params.get("session_id");
        const locationId = params.get("location_id");

        if (!sessionId) {
          return Response.json({ error: "session_id lipsă." }, { status: 400 });
        }

        try {
          const session = await retrievePaidSession(sessionId, locationId ?? undefined);
          const metadata = session.metadata ?? {};
          const resolvedLocationId = metadata.locationId ?? locationId ?? "";
          const location = resolvedLocationId ? getLocation(resolvedLocationId) : undefined;

          return Response.json({
            paid: true,
            sessionId: session.id,
            customerName: metadata.customerName ?? "",
            customerPhone: metadata.customerPhone ?? "",
            pickupTime: pickupTimeLabel(metadata.pickupTime ?? "asap"),
            locationName: location?.name ?? "",
            locationAddress: location?.address ?? "",
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Sesiune invalidă.";
          console.error("[checkout/session]", message);
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});

async function retrievePaidSession(sessionId: string, locationId?: string) {
  const locationIds = locationId ? [locationId] : getAllLocationIds();

  for (const id of locationIds) {
    try {
      const session = await getStripe(id).checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        return session;
      }
    } catch {
      // try next Stripe account
    }
  }

  throw new Error("Plata nu a fost finalizată sau sesiunea nu a fost găsită.");
}
