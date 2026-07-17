export type DineHubOrderStatus = "pending" | "success" | "failed";

export interface DineHubOrderStatusRecord {
  status: DineHubOrderStatus;
  dinehubOrderId?: string;
  error?: string;
  updatedAt: number;
}

const STORE_KEY = "__ihp_dinehub_order_status__";
const TTL_MS = 60 * 60 * 1000;

type GlobalStore = typeof globalThis & {
  [STORE_KEY]?: Map<string, DineHubOrderStatusRecord>;
};

function getStore(): Map<string, DineHubOrderStatusRecord> {
  const g = globalThis as GlobalStore;
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = new Map();
  }
  return g[STORE_KEY];
}

function pruneExpired(store: Map<string, DineHubOrderStatusRecord>) {
  const cutoff = Date.now() - TTL_MS;
  for (const [sessionId, record] of store) {
    if (record.updatedAt < cutoff) {
      store.delete(sessionId);
    }
  }
}

export function setDineHubOrderPending(sessionId: string) {
  const store = getStore();
  pruneExpired(store);
  store.set(sessionId, {
    status: "pending",
    updatedAt: Date.now(),
  });
}

export function setDineHubOrderSuccess(sessionId: string, dinehubOrderId?: string) {
  const store = getStore();
  pruneExpired(store);
  store.set(sessionId, {
    status: "success",
    dinehubOrderId,
    updatedAt: Date.now(),
  });
}

export function setDineHubOrderFailed(sessionId: string, error: string) {
  const store = getStore();
  pruneExpired(store);
  store.set(sessionId, {
    status: "failed",
    error,
    updatedAt: Date.now(),
  });
}

export function getDineHubOrderStatus(sessionId: string): DineHubOrderStatusRecord | null {
  const store = getStore();
  pruneExpired(store);
  return store.get(sessionId) ?? null;
}
