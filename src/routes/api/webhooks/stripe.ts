import { createFileRoute } from "@tanstack/react-router";
import type Stripe from "stripe";
import { constructStripeEvent } from "@/lib/stripe";
import { fulfillOrderToDineHub } from "@/lib/fulfill-order";

export const Route = createFileRoute("/api/webhooks/stripe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return Response.json({ error: "Missing stripe-signature." }, { status: 400 });
        }

        const body = await request.text();
        let event: Stripe.Event;
        let stripeLocationId: string;

        try {
          const verified = constructStripeEvent(body, signature);
          event = verified.event;
          stripeLocationId = verified.locationId;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Invalid signature";
          console.error("[stripe-webhook] signature error:", message);
          return Response.json({ error: message }, { status: 400 });
        }

        if (event.type !== "checkout.session.completed") {
          return Response.json({ received: true });
        }

        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") {
          return Response.json({ received: true });
        }

        const locationId = session.metadata?.locationId ?? stripeLocationId;
        const result = await fulfillOrderToDineHub(session.id, locationId);

        if (result.status === "failed") {
          console.error("[stripe-webhook] DineHub error for", session.id, result.error);
          return Response.json({ error: result.error }, { status: 500 });
        }

        console.info("[stripe-webhook] DineHub order created:", result.dinehubOrderId ?? session.id);
        return Response.json({ received: true });
      },
    },
  },
});
