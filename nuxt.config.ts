import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  compatibilityDate: "2025-12-14",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/styles.css"],
  nitro: { compatibilityDate: "2025-12-14" },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon","@vercel/speed-insights"],
  // @ts-ignore
  tailwindcss: {
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },
  icon: {
    serverBundle: {
      collections: ["solar"],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "iconify-icon",
    },
  },
});
