import { buildDineHubPayload, submitOrderToDineHub } from "@/lib/dinehub";
import {
  getDineHubOrderStatus,
  setDineHubOrderFailed,
  setDineHubOrderPending,
  setDineHubOrderSuccess,
} from "@/lib/dinehub-order-status";
import { orderFromStripeSession } from "@/lib/order";
import { getStripe } from "@/lib/stripe";

export interface FulfillOrderResult {
  status: "success" | "failed";
  dinehubOrderId?: string;
  error?: string;
}

export async function fulfillOrderToDineHub(
  sessionId: string,
  locationId: string,
): Promise<FulfillOrderResult> {
  const existing = getDineHubOrderStatus(sessionId);
  if (existing?.status === "success") {
    return {
      status: "success",
      dinehubOrderId: existing.dinehubOrderId,
    };
  }

  setDineHubOrderPending(sessionId);

  try {
    const stripe = getStripe(locationId);
    const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (fullSession.payment_status !== "paid") {
      throw new Error("Plata nu a fost finalizată.");
    }

    const lineItems = fullSession.line_items?.data ?? [];
    const order = orderFromStripeSession(fullSession, lineItems);
    const payload = buildDineHubPayload(sessionId, order);
    const result = await submitOrderToDineHub(payload, locationId);
    const dinehubOrderId = result.order_id ?? sessionId;

    setDineHubOrderSuccess(sessionId, dinehubOrderId);
    return { status: "success", dinehubOrderId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "DineHub submission failed";
    setDineHubOrderFailed(sessionId, message);
    return { status: "failed", error: message };
  }
}
