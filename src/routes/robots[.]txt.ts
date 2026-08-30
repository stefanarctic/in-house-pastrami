import { createFileRoute } from "@tanstack/react-router";
import { buildRobotsTxt } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildRobotsTxt(getSiteUrl(request)), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
