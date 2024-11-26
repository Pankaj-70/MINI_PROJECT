import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	server: {
		strictPort: true,
		port: 5174,
		proxy: {
			"/api": "http://localhost:8000",
		},
	},
	plugins: [react()],
});
