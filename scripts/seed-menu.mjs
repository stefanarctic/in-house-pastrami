/**
 * Seed Firestore `menuItems` from scripts/menu-seed-data.json.
 *
 * Setup (on your Firebase account — not the Cursor plugin account):
 * 1. Create a Firebase project, enable Firestore + Email/Password Auth.
 * 2. Deploy firestore.rules (update the admin email allowlist first).
 * 3. Download a service account JSON:
 *    Project settings → Service accounts → Generate new private key
 * 4. Run either:
 *      set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json
 *      npm run seed:menu
 *    or put FIREBASE_ADMIN_* in .env and run npm run seed:menu
 *
 * Env vars (alternative to GOOGLE_APPLICATION_CREDENTIALS):
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY  (PEM with \n escapes)
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, cert, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadDotEnv() {
  const envPath = resolve(root, ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function initAdmin() {
  if (getApps().length) return;

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    initializeApp({ credential: applicationDefault() });
    return;
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      "Missing credentials. Set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON path,\n" +
        "or set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.",
    );
    process.exit(1);
  }

  privateKey = privateKey.replace(/\\n/g, "\n");

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

async function main() {
  loadDotEnv();
  initAdmin();

  const seedPath = resolve(__dirname, "menu-seed-data.json");
  const items = JSON.parse(readFileSync(seedPath, "utf8"));
  if (!Array.isArray(items) || items.length === 0) {
    console.error("menu-seed-data.json is empty or invalid.");
    process.exit(1);
  }

  const db = getFirestore();
  const batchSize = 400;
  let written = 0;

  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    const batch = db.batch();
    for (const item of chunk) {
      const ref = db.collection("menuItems").doc(item.id);
      batch.set(
        ref,
        {
          ...item,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }
    await batch.commit();
    written += chunk.length;
  }

  console.log(`Seeded ${written} menuItems.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
