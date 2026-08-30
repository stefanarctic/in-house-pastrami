import { createFileRoute } from "@tanstack/react-router";
import { buildSitemapXml } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildSitemapXml(getSiteUrl(request)), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
