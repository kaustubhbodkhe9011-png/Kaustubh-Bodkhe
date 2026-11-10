import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // When building in GitHub Actions, use repo subpath; otherwise use relative path for local/Vercel
  base: process.env.GITHUB_ACTIONS ? "/Kaustubh-Bodkhe/" : "./",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Keep chunk names readable
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
