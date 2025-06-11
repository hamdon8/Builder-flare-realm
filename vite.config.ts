import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Builder-flare-realm/', // ⚠️ ضروري مطابق لاسم المستودع
  plugins: [react()],
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Configure base path for GitHub Pages deployment
  base: mode === "production" ? "/ai-disassembly-design-system/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ["react", "react-dom", "react-router-dom"],
          // Three.js and related libraries (split to smaller chunks)
          "three-core": ["three"],
          "three-react": ["@react-three/fiber", "@react-three/drei"],
          // UI libraries
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          // Icon library
          icons: ["lucide-react"],
          // Utility libraries
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
    // Set a higher limit for chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging if needed
    sourcemap: false,
    // Optimize for production
    minify: "esbuild",
    target: "es2020",
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
  },
}));
