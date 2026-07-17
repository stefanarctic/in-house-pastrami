import Stripe from "stripe";
import { getAllLocationIds, getLocationSecrets } from "@/lib/location-secrets";

const stripeClients = new Map<string, Stripe>();

export function getStripe(locationId: string): Stripe {
  let client = stripeClients.get(locationId);
  if (!client) {
    const { stripeSecretKey } = getLocationSecrets(locationId);
    client = new Stripe(stripeSecretKey);
    stripeClients.set(locationId, client);
  }
  return client;
}

export function constructStripeEvent(
  body: string,
  signature: string,
): { event: Stripe.Event; locationId: string } {
  for (const locationId of getAllLocationIds()) {
    try {
      const { stripeWebhookSecret } = getLocationSecrets(locationId);
      const stripe = getStripe(locationId);
      const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
      return { event, locationId };
    } catch {
      // try next location's webhook secret
    }
  }
  throw new Error("Invalid Stripe webhook signature");
}

export function getSiteUrl(): string {
  const url = process.env.SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}
