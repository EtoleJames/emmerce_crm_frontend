import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["@mdi/js"], // Ensure the dependency is pre-bundled
  },
  server: {
    port: 3000,
  },
});
