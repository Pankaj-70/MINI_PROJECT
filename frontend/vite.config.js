import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    strictPort: true,
    port: 5173,
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react()],
});
