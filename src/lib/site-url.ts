function isLocalHost(value: string): boolean {
  return /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(value);
}

function firstHeaderValue(request: Request, name: string): string | undefined {
  return request.headers.get(name)?.split(",")[0]?.trim() || undefined;
}

function urlFromRequest(request: Request): string | undefined {
  const origin = firstHeaderValue(request, "origin");
  if (origin) return origin.replace(/\/$/, "");

  const host = firstHeaderValue(request, "x-forwarded-host") ?? firstHeaderValue(request, "host");
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

function viteSiteUrl(): string | undefined {
  try {
    const value = import.meta.env.VITE_SITE_URL as string | undefined;
    return value?.replace(/\/$/, "") || undefined;
  } catch {
    return undefined;
  }
}

/** Public origin for client-side meta (canonical, og:url). Prefer VITE_SITE_URL. */
export function getPublicSiteUrl(): string {
  const fromVite = viteSiteUrl();
  if (fromVite) return fromVite;
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

/** Server origin for Stripe redirects, sitemap, robots, and llms.txt. */
export function getSiteUrl(request?: Request): string {
  const envUrl = process.env.SITE_URL?.replace(/\/$/, "") || viteSiteUrl();
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
