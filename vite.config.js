import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyRequest, request) => {
            proxyRequest.setHeader("X-Forwarded-Host", request.headers.host ?? "");
          });
        },
      },
    },
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== "true",
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },
}));
