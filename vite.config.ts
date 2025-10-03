import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 1. 💡 React and Router Core
          "react-core": [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
          ],
          // 2. 💡 Data & State Management
          "data-state": ["@tanstack/react-query", "zustand", "axios"],

          // 3. 💡 UI Vendors
          "ui-vendors": [
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
