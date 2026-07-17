import { LOCATIONS } from "@/data/locations";

/** Env var suffix per location id */
const LOCATION_ENV_SUFFIX: Record<string, string> = {
  dorobanti: "DOROBANTI",
  "piata-rosetti": "PIATA_ROSETTI",
};

export interface LocationSecrets {
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  dinehubApiUrl: string;
  dinehubApiUser: string;
  dinehubApiPass: string;
  dinehubRestaurantId: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function getLocationEnvSuffix(locationId: string): string {
  const suffix = LOCATION_ENV_SUFFIX[locationId];
  if (!suffix) {
    throw new Error(`Locație necunoscută: ${locationId}`);
  }
  return suffix;
}

export function getLocationSecrets(locationId: string): LocationSecrets {
  const suffix = getLocationEnvSuffix(locationId);

  return {
    stripeSecretKey: requireEnv(`STRIPE_${suffix}_SECRET_KEY`),
    stripeWebhookSecret: requireEnv(`STRIPE_${suffix}_WEBHOOK_SECRET`),
    dinehubApiUrl: process.env.DINEHUB_API_URL ?? requireEnv("DINEHUB_API_URL"),
    dinehubApiUser: requireEnv(`DINEHUB_${suffix}_API_USER`),
    dinehubApiPass: requireEnv(`DINEHUB_${suffix}_API_PASS`),
    dinehubRestaurantId: requireEnv(`DINEHUB_${suffix}_RESTAURANT_ID`),
  };
}

export function getAllLocationIds(): string[] {
  return LOCATIONS.map((l) => l.id);
}
