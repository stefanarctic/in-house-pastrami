import { createFileRoute } from "@tanstack/react-router";
import { getDineHubOrderStatus } from "@/lib/dinehub-order-status";

export const Route = createFileRoute("/api/checkout/order-status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionId = new URL(request.url).searchParams.get("session_id");
        if (!sessionId) {
          return Response.json({ error: "session_id lipsă." }, { status: 400 });
        }

        const record = getDineHubOrderStatus(sessionId);
        if (!record) {
          return Response.json({ status: "pending" as const });
        }

        return Response.json({
          status: record.status,
          dinehubOrderId: record.dinehubOrderId,
          error: record.error,
        });
      },
    },
  },
});
