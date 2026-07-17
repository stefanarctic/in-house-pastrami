import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fulfillOrderToDineHub } from "@/lib/fulfill-order";

const fulfillBodySchema = z.object({
  session_id: z.string().min(1),
  location_id: z.string().min(1),
});

export const Route = createFileRoute("/api/checkout/fulfill")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = fulfillBodySchema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ error: "Date invalide." }, { status: 400 });
          }

          const result = await fulfillOrderToDineHub(
            parsed.data.session_id,
            parsed.data.location_id,
          );

          if (result.status === "failed") {
            return Response.json(result, { status: 502 });
          }

          return Response.json(result);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Eroare la trimiterea comenzii.";
          console.error("[checkout/fulfill]", message);
          return Response.json({ status: "failed", error: message }, { status: 500 });
        }
      },
    },
  },
});
