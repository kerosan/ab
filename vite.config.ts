import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        outDir: "docs",
        sourcemap: true,
        emptyOutDir: true,
    },
    server: {
        port: 3003,
    },
    preview: {
        port: 3003,
    },
});
