/**
 * Minimal Firestore REST client for server routes.
 *
 * Nitro v3 on Vercel cannot ship `firebase-admin` (CJS/`__dirname` in google-gax),
 * so checkout reads menu prices over HTTPS instead of the Admin SDK.
 * Menu documents are publicly readable (`allow read: if true`).
 */

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  timestampValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

interface FirestoreDocument {
  name?: string;
  fields?: Record<string, FirestoreValue>;
}

export interface FirestoreDoc {
  id: string;
  data: Record<string, unknown>;
}

function getProjectId(): string {
  const id =
    process.env.FIREBASE_ADMIN_PROJECT_ID ||
    process.env.VITE_FIREBASE_PROJECT_ID ||
    (import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined);
  if (!id) {
    throw new Error(
      "Firebase project ID is not configured. Set FIREBASE_ADMIN_PROJECT_ID or VITE_FIREBASE_PROJECT_ID.",
    );
  }
  return id;
}

function getApiKey(): string | undefined {
  return (
    process.env.VITE_FIREBASE_API_KEY ||
    (import.meta.env.VITE_FIREBASE_API_KEY as string | undefined) ||
    undefined
  );
}

function decodeValue(value: FirestoreValue | undefined): unknown {
  if (!value) return undefined;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.nullValue !== undefined) return null;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decodeValue);
  if (value.mapValue) return decodeFields(value.mapValue.fields);
  return undefined;
}

function decodeFields(fields: Record<string, FirestoreValue> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!fields) return out;
  for (const [key, value] of Object.entries(fields)) {
    out[key] = decodeValue(value);
  }
  return out;
}

function documentIdFromName(name: string | undefined, fallback: string): string {
  if (!name) return fallback;
  const parts = name.split("/");
  return decodeURIComponent(parts[parts.length - 1] || fallback);
}

function documentsUrl(collection: string, id?: string): URL {
  const projectId = getProjectId();
  const path = id
    ? `${collection}/${encodeURIComponent(id)}`
    : collection;
  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}`,
  );
  const apiKey = getApiKey();
  if (apiKey) url.searchParams.set("key", apiKey);
  return url;
}

async function firestoreGet(url: URL): Promise<Response> {
  const res = await fetch(url);
  if (res.ok || res.status === 404) return res;
  const text = await res.text();
  throw new Error(`Firestore read failed (${res.status}): ${text.slice(0, 300)}`);
}

export async function getFirestoreDocument(
  collection: string,
  id: string,
): Promise<FirestoreDoc | null> {
  const res = await firestoreGet(documentsUrl(collection, id));
  if (res.status === 404) return null;
  const json = (await res.json()) as FirestoreDocument;
  return {
    id: documentIdFromName(json.name, id),
    data: decodeFields(json.fields),
  };
}

export async function listFirestoreDocuments(collection: string): Promise<FirestoreDoc[]> {
  const items: FirestoreDoc[] = [];
  let pageToken: string | undefined;

  do {
    const url = documentsUrl(collection);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await firestoreGet(url);
    if (res.status === 404) return items;

    const json = (await res.json()) as {
      documents?: FirestoreDocument[];
      nextPageToken?: string;
    };
    for (const doc of json.documents ?? []) {
      items.push({
        id: documentIdFromName(doc.name, ""),
        data: decodeFields(doc.fields),
      });
    }
    pageToken = json.nextPageToken;
  } while (pageToken);

  return items;
}
