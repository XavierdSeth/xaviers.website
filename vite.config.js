import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

// Custom domain (xaviers.website) → keep "/"
// Project Pages (username.github.io/repo/) → set base: "/repo-name/"
export default defineConfig({
  base: "/",
  plugins: [react(), cloudflare()],
});