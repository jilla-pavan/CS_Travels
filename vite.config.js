import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),

    /**
     * Build-time image transformation — this project's replacement for
     * next/image, which isn't available on Vite.
     *
     * Import an image with a preset and it emits optimised derivatives:
     *
     *   import hero from "./hero.jpg?preset=hero"
     *
     * The `picture` output gives a srcset per format, which <Picture> in
     * components/ui/Image.jsx feeds into a real <picture> element so the browser
     * picks AVIF where it can and falls back on its own.
     *
     * This is what takes the existing ~11MB of PNGs down to a few hundred KB.
     */
    imagetools({
      defaultDirectives: (url) => {
        const preset = url.searchParams.get("preset");

        if (preset === "hero") {
          /* Widths chosen for real breakpoints, not round numbers: phones at 2x,
             tablet, desktop, and a 2x desktop cap. */
          return new URLSearchParams({
            w: "768;1280;1920;2560",
            format: "avif;webp;jpg",
            as: "picture",
          });
        }

        if (preset === "card") {
          return new URLSearchParams({
            w: "400;640;900",
            format: "avif;webp;jpg",
            as: "picture",
          });
        }

        if (preset === "scene") {
          /* The four background photographs are 1408×768 at source. Emitting
             1920 or 2560 would upscale — more bytes for a softer image. Capped
             at native width, and JPEG rather than PNG for the fallback: these
             are photographs with no transparency, where PNG is roughly 10×
             the size for no benefit. */
          return new URLSearchParams({
            w: "640;960;1408",
            format: "avif;webp;jpg",
            quality: "72",
            as: "picture",
          });
        }

        if (preset === "logo") {
          /* PNG fallback rather than JPEG — the mark has transparency, and a
             JPEG fallback would composite it onto white. Takes the source
             1.6MB PNG down to a few KB at the sizes actually rendered. */
          return new URLSearchParams({
            w: "96;192;288",
            format: "avif;webp;png",
            as: "picture",
          });
        }

        if (preset === "thumb") {
          return new URLSearchParams({
            w: "200;400",
            format: "avif;webp;jpg",
            as: "picture",
          });
        }

        return new URLSearchParams();
      },
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    /* Surfaces regressions against the brief's 200KB gzipped budget rather than
       letting the bundle drift unnoticed. Vite reports gzip sizes on build. */
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        /**
         * Manual chunking keeps heavy libraries out of the entry bundle.
         * three/R3F in particular must never land in the initial payload — the
         * 3D scenes are dynamically imported and only mount on intersection.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/three|@react-three/.test(id)) return "three";
          if (/gsap/.test(id)) return "gsap";
          if (/framer-motion/.test(id)) return "motion";
          if (/react-dom|react-router/.test(id)) return "react";
          return undefined;
        },
      },
    },
  },
});
