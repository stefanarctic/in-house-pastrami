import { createFileRoute } from "@tanstack/react-router";
import { buildLlmsFullTxt } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildLlmsFullTxt(getSiteUrl(request)), {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
