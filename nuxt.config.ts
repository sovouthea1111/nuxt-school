export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/styles.css"],
  nitro: { compatibilityDate: "2025-12-14" },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  tailwindcss: {
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },
  icon: {
    serverBundle: "remote",
  },
});
