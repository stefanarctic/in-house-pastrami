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

function isLocalHost(value: string): boolean {
  return /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(value);
}

function firstHeaderValue(request: Request, name: string): string | undefined {
  return request.headers.get(name)?.split(",")[0]?.trim() || undefined;
}

function urlFromRequest(request: Request): string | undefined {
  const origin = firstHeaderValue(request, "origin");
  if (origin) return origin.replace(/\/$/, "");

  const host =
    firstHeaderValue(request, "x-forwarded-host") ?? firstHeaderValue(request, "host");
  if (!host) return undefined;

  const proto = firstHeaderValue(request, "x-forwarded-proto") ?? (isLocalHost(host) ? "http" : "https");
  return `${proto}://${host}`.replace(/\/$/, "");
}

function urlFromVercel(): string | undefined {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) {
    return `https://${production.replace(/^https?:\/\//, "")}`.replace(/\/$/, "");
  }
  const deployment = process.env.VERCEL_URL;
  if (deployment) {
    return `https://${deployment.replace(/^https?:\/\//, "")}`.replace(/\/$/, "");
  }
  return undefined;
}

export function getSiteUrl(request?: Request): string {
  const envUrl = process.env.SITE_URL?.replace(/\/$/, "");
  const deployed = Boolean(process.env.VERCEL || process.env.NODE_ENV === "production");

  if (envUrl && !(deployed && isLocalHost(envUrl))) {
    return envUrl;
  }

  const fromRequest = request ? urlFromRequest(request) : undefined;
  if (fromRequest && !(deployed && isLocalHost(fromRequest))) {
    return fromRequest;
  }

  return urlFromVercel() ?? fromRequest ?? envUrl ?? "http://localhost:3000";
}
