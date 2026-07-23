import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Keep firebase-admin as native CJS in the serverless output (needed with createRequire).
const FIREBASE_ADMIN_TRACE = [
  "firebase-admin*",
  "@google-cloud/firestore*",
  "google-gax*",
  "@grpc/grpc-js*",
  "protobufjs*",
];

export default defineConfig({
  ssr: {
    external: [
      "firebase-admin",
      "firebase-admin/app",
      "firebase-admin/firestore",
      "@google-cloud/firestore",
      "google-gax",
      "@grpc/grpc-js",
      "protobufjs",
    ],
  },
  plugins: [
    tanstackStart(),
    nitro({
      traceDeps: FIREBASE_ADMIN_TRACE,
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
