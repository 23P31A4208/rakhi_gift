import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain Vite + React config — no TypeScript, no SSR, no Lovable plugins.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/rakhi_gift/',
});
