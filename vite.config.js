import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (xaviers.website) → keep "/"
// Project Pages (username.github.io/repo/) → set base: "/repo-name/"
export default defineConfig({
  base: "/",
  plugins: [react()],
});
