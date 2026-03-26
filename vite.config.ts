import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import electronRenderer from "vite-plugin-electron-renderer";
import path from "path";

export default defineConfig(({ command }) => {
  const isElectron = process.env.npm_lifecycle_event?.includes("electron");

  return {
    plugins: [
      react(),
      ...(isElectron
        ? [
            electron([
              {
                entry: "electron/main.ts",
              },
              {
                entry: "electron/preload.ts",
                onstart(args) {
                  args.reload();
                },
              },
            ]),
            electronRenderer(),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
