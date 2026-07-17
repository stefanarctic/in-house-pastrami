import { createFileRoute } from "@tanstack/react-router";
import { getStripe, getSiteUrl } from "@/lib/stripe";
import {
  checkoutRequestSchema,
  validateCheckoutRequest,
  buildStripeLineItems,
} from "@/lib/order";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = checkoutRequestSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { error: "Date invalide.", details: parsed.error.flatten() },
              { status: 400 },
            );
          }

          const order = await validateCheckoutRequest(parsed.data);
          const stripe = getStripe(order.locationId);
          const siteUrl = getSiteUrl();

          const session = await stripe.checkout.sessions.create({
            mode: "payment",
            currency: "ron",
            line_items: buildStripeLineItems(order.lines),
            metadata: {
              locationId: order.locationId,
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              pickupTime: order.pickupTime,
              orderNotes: order.orderNotes ?? "",
            },
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&location_id=${order.locationId}`,
            cancel_url: `${siteUrl}/checkout`,
          });

          if (!session.url) {
            return Response.json({ error: "Nu am putut crea sesiunea de plată." }, { status: 500 });
          }

          return Response.json({ url: session.url });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Eroare la checkout.";
          console.error("[checkout]", message);
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
