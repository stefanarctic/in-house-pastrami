import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Instagram, Phone } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import {
  DELIVERY_PLATFORMS,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
  googleMapsUrl,
} from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20 bg-card/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-display text-xl tracking-widest text-foreground">
              IN HOUSE
              <br />
              <span className="text-primary">PASTRAMI</span> &amp; MORE
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Pastramă afumată în casă, sandvișuri Reuben și burgeri. Două locații în București.
            </p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Locații
            </h3>
            <ul className="space-y-5">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <div className="font-medium text-foreground text-sm">{loc.name}</div>
                  <a
                    href={googleMapsUrl(loc.mapsQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    {loc.address}
                  </a>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {loc.hours}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Site
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Meniu
                </Link>
              </li>
              <li>
                <a href="/#story" className="text-muted-foreground hover:text-primary transition-colors">
                  Povestea pastramei
                </a>
              </li>
              <li>
                <a href="/#visit" className="text-muted-foreground hover:text-primary transition-colors">
                  Găsește-ne
                </a>
              </li>
              <li>
                <Link to="/checkout" className="text-muted-foreground hover:text-primary transition-colors">
                  Comandă cu ridicare
                </Link>
              </li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Comandă
            </h3>
            <a
              href={`tel:${SITE_PHONE}`}
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              {SITE_PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Livrare prin platforme:
            </p>
            <ul className="mt-2 space-y-2">
              {DELIVERY_PLATFORMS.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} In House Pastrami &amp; More</span>
          <span className="font-display tracking-wider text-foreground/60">Afumat cu răbdare.</span>
        </div>
      </div>
    </footer>
  );
}
