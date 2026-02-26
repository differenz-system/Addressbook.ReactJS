import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let outDir = "build";

  if (mode === "development") {
    outDir = "dist-dev";
  } else if (mode === "uat") {
    outDir = "dist-uat";
  } else if (mode === "production") {
    outDir = "dist-prod";
  }

  return {
    plugins: [react()],

    server: {
      watch: {
        awaitWriteFinish: true,
      },
      port: 3000,
      host: true,
    },

    resolve: {
      alias: {
        "@": "/src/",
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },

    build: {
      outDir: outDir,
      chunkSizeWarningLimit: 1600,
      sourcemap: mode !== "production",
    },
  };
});
