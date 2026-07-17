import { z } from "zod";
import type Stripe from "stripe";
import { getItem } from "@/data/menu";
import { getLocation } from "@/data/locations";

export const checkoutLineSchema = z.object({
  id: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
  notes: z.string().max(500).optional(),
});

export const checkoutRequestSchema = z.object({
  lines: z.array(checkoutLineSchema).min(1),
  locationId: z.string().min(1),
  customer: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(6).max(30),
    pickupTime: z.enum(["asap", "30", "60", "later"]),
    notes: z.string().max(1000).optional(),
  }),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

export interface ValidatedOrderLine {
  menuItemId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPriceRon: number;
  notes?: string;
}

export interface ValidatedOrder {
  lines: ValidatedOrderLine[];
  locationId: string;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  orderNotes?: string;
  subtotalRon: number;
}

const PICKUP_TIME_LABELS: Record<string, string> = {
  asap: "Cât mai repede",
  "30": "În 30 de minute",
  "60": "Într-o oră",
  later: "Mai târziu — sună-mă",
};

export function pickupTimeLabel(value: string): string {
  return PICKUP_TIME_LABELS[value] ?? value;
}

export function validateCheckoutRequest(body: CheckoutRequest): ValidatedOrder {
  const location = getLocation(body.locationId);
  if (!location) {
    throw new Error("Locația selectată nu este validă.");
  }

  const lines: ValidatedOrderLine[] = body.lines.map((line) => {
    const item = getItem(line.id);
    if (!item) {
      throw new Error(`Produs necunoscut: ${line.id}`);
    }
    return {
      menuItemId: item.id,
      sku: item.sku ?? item.id,
      name: item.name,
      quantity: line.quantity,
      unitPriceRon: item.price,
      notes: line.notes?.trim() || undefined,
    };
  });

  const subtotalRon = lines.reduce((sum, line) => sum + line.quantity * line.unitPriceRon, 0);

  return {
    lines,
    locationId: body.locationId,
    customerName: body.customer.name.trim(),
    customerPhone: body.customer.phone.trim(),
    pickupTime: body.customer.pickupTime,
    orderNotes: body.customer.notes?.trim() || undefined,
    subtotalRon,
  };
}

export function formatRonAmount(amount: number): string {
  return amount.toFixed(2);
}

export function splitCustomerName(fullName: string): { prenume: string; nume: string } {
  const trimmed = fullName.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) {
    return { prenume: trimmed, nume: trimmed };
  }
  return {
    prenume: trimmed.slice(0, space),
    nume: trimmed.slice(space + 1).trim() || trimmed.slice(0, space),
  };
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("+")) {
    return digits;
  }
  if (digits.startsWith("00")) {
    return `+${digits.slice(2)}`;
  }
  if (digits.startsWith("0")) {
    return `+4${digits}`;
  }
  return `+${digits}`;
}

export function parseLocationAddress(address: string): { strada: string; localitate: string } {
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    return {
      strada: parts[0],
      localitate: parts[parts.length - 1],
    };
  }
  return { strada: address, localitate: "București" };
}

export function buildStripeLineItems(
  lines: ValidatedOrderLine[],
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return lines.map((line) => ({
    quantity: line.quantity,
    price_data: {
      currency: "ron",
      unit_amount: Math.round(line.unitPriceRon * 100),
      product_data: {
        name: line.name,
        description: line.notes ? `Notă: ${line.notes}` : undefined,
        metadata: {
          menuItemId: line.menuItemId,
          lineNotes: line.notes ?? "",
        },
      },
    },
  }));
}

export function orderFromStripeSession(
  session: Stripe.Checkout.Session,
  lineItems: Stripe.LineItem[],
): ValidatedOrder {
  const metadata = session.metadata ?? {};
  const locationId = metadata.locationId ?? "";
  const customerName = metadata.customerName ?? "";
  const customerPhone = metadata.customerPhone ?? "";
  const pickupTime = metadata.pickupTime ?? "asap";
  const orderNotes = metadata.orderNotes || undefined;

  const lines: ValidatedOrderLine[] = lineItems.map((item) => {
    const product = item.price?.product;
    const productMeta =
      product && typeof product !== "string" && !product.deleted
        ? (product.metadata ?? {})
        : {};
    const menuItemId = productMeta.menuItemId ?? "unknown";
    const menuItem = getItem(menuItemId);
    const unitPriceRon = (item.price?.unit_amount ?? 0) / 100;
    const lineNotesFromMeta = productMeta.lineNotes || undefined;
    const productDescription =
      product && typeof product !== "string" && !product.deleted
        ? product.description
        : undefined;
    const notesFromDesc =
      productDescription?.startsWith("Notă: ")
        ? productDescription.slice("Notă: ".length)
        : lineNotesFromMeta;
    const name =
      product && typeof product !== "string" && !product.deleted
        ? product.name
        : (menuItem?.name ?? "Item");

    return {
      menuItemId,
      sku: menuItem?.sku ?? menuItemId,
      name,
      quantity: item.quantity ?? 1,
      unitPriceRon,
      notes: notesFromDesc || undefined,
    };
  });

  const subtotalRon =
    session.amount_total != null ? session.amount_total / 100 : lines.reduce(
      (sum, line) => sum + line.quantity * line.unitPriceRon,
      0,
    );

  return {
    lines,
    locationId,
    customerName,
    customerPhone,
    pickupTime,
    orderNotes,
    subtotalRon,
  };
}

export function buildOrderComments(order: ValidatedOrder): string {
  const location = getLocation(order.locationId);
  const parts: string[] = [];

  if (location) {
    parts.push(`Ridicare: ${location.name} (${location.address})`);
  }
  parts.push(`Timp: ${pickupTimeLabel(order.pickupTime)}`);

  if (order.orderNotes) {
    parts.push(`Observații: ${order.orderNotes}`);
  }

  for (const line of order.lines) {
    if (line.notes) {
      parts.push(`${line.name}: ${line.notes}`);
    }
  }

  return parts.join(" · ");
}
