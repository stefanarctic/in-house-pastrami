import { getLocation } from "@/data/locations";
import { getLocationSecrets } from "@/lib/location-secrets";
import {
  buildOrderComments,
  formatRonAmount,
  normalizePhone,
  parseLocationAddress,
  splitCustomerName,
  type ValidatedOrder,
} from "@/lib/order";

export interface DineHubOrderPayload {
  apiuser: string;
  apipass: string;
  restaurant: string;
  order_id: string;
  prenume: string;
  nume: string;
  customer_phone: string;
  payment_method: string;
  total_factura: string;
  item_name: string;
  item_sku: string;
  quantity: string;
  item_price_with_tax: string;
  comentarii: string;
  localitate_cli: string;
  strada: string;
}

export function buildDineHubPayload(orderId: string, order: ValidatedOrder): DineHubOrderPayload {
  const location = getLocation(order.locationId);
  const secrets = getLocationSecrets(order.locationId);
  const { prenume, nume } = splitCustomerName(order.customerName);
  const { strada, localitate } = parseLocationAddress(location?.address ?? "București");

  return {
    apiuser: secrets.dinehubApiUser,
    apipass: secrets.dinehubApiPass,
    restaurant: secrets.dinehubRestaurantId,
    order_id: orderId,
    prenume,
    nume,
    customer_phone: normalizePhone(order.customerPhone),
    payment_method: "card",
    total_factura: formatRonAmount(order.subtotalRon),
    item_name: order.lines.map((line) => line.name).join(","),
    item_sku: order.lines.map((line) => line.sku).join(","),
    quantity: order.lines.map((line) => String(line.quantity)).join(","),
    item_price_with_tax: order.lines.map((line) => formatRonAmount(line.unitPriceRon)).join(","),
    comentarii: buildOrderComments(order),
    localitate_cli: localitate,
    strada,
  };
}

export interface DineHubResponse {
  success: boolean;
  order_id?: string;
  message?: string;
  error?: string;
}

export async function submitOrderToDineHub(
  payload: DineHubOrderPayload,
  locationId: string,
): Promise<DineHubResponse> {
  const { dinehubApiUrl } = getLocationSecrets(locationId);

  const response = await fetch(dinehubApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body: DineHubResponse;
  try {
    body = (await response.json()) as DineHubResponse;
  } catch {
    throw new Error(`DineHub returned invalid JSON (HTTP ${response.status})`);
  }

  if (!response.ok || !body.success) {
    const message = body.error ?? body.message ?? `HTTP ${response.status}`;
    throw new Error(`DineHub order failed: ${message}`);
  }

  return body;
}
