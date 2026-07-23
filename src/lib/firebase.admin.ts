import { createRequire } from "node:module";
import type { App, ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let db: Firestore | undefined;

type AdminAppModule = typeof import("firebase-admin/app");
type AdminFirestoreModule = typeof import("firebase-admin/firestore");

function loadAdminApp(): AdminAppModule {
  // CommonJS require keeps `__dirname` working. Nitro's ESM rewrite of google-gax
  // crashes on Vercel: ReferenceError: __dirname is not defined in ES module scope.
  const require = createRequire(import.meta.url);
  return require("firebase-admin/app") as AdminAppModule;
}

function loadAdminFirestore(): AdminFirestoreModule {
  const require = createRequire(import.meta.url);
  return require("firebase-admin/firestore") as AdminFirestoreModule;
}

function getAdminCredentials(): ServiceAccount {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.",
    );
  }

  privateKey = privateKey.replace(/\\n/g, "\n");

  return { projectId, clientEmail, privateKey };
}

export function getFirebaseAdminApp(): App {
  if (app) return app;
  const { initializeApp, getApps, cert } = loadAdminApp();
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  app = initializeApp({
    credential: cert(getAdminCredentials()),
  });
  return app;
}

export function getAdminFirestore(): Firestore {
  if (!db) {
    getFirebaseAdminApp();
    db = loadAdminFirestore().getFirestore();
  }
  return db;
}
