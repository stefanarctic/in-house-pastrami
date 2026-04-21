import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyOrder } from "@/components/site/StickyOrder";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageProvider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "In House Pastrami & More — Probably the best pastrami in Bucharest" },
      { name: "description", content: "House-smoked beef pastrami, Reuben sandwiches, burgers & poutine in Bucharest. Order direct from Strada Speranței 1." },
      { name: "author", content: "In House Pastrami & More" },
      { name: "keywords", content: "pastrami bucharest, best sandwich bucharest, reuben sandwich bucharest, smoked meat bucharest" },
      { property: "og:title", content: "In House Pastrami & More — Probably the best pastrami in Bucharest" },
      { property: "og:description", content: "House-smoked beef pastrami, Reuben sandwiches, burgers & poutine in Bucharest. Order direct from Strada Speranței 1." },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "In House Pastrami & More — Probably the best pastrami in Bucharest" },
      { name: "twitter:description", content: "House-smoked beef pastrami, Reuben sandwiches, burgers & poutine in Bucharest. Order direct from Strada Speranței 1." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c6aae3e2-ee0b-400c-ae3f-1ea2ab790014/id-preview-eaa72689--b10611d1-2651-414a-afa3-3bb8d762e470.lovable.app-1776597365992.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c6aae3e2-ee0b-400c-ae3f-1ea2ab790014/id-preview-eaa72689--b10611d1-2651-414a-afa3-3bb8d762e470.lovable.app-1776597365992.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Header />
      <Outlet />
      <Footer />
      <StickyOrder />
      <Toaster richColors position="top-center" />
    </LanguageProvider>
  );
}
