export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-icon", "@nuxtjs/supabase", "@vueuse/nuxt", "@nuxthq/ui"],
  ui: {
    icons: ["heroicons", "logos", "lucide"],
  },
  colorMode: {
    preference: "light",
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://analytics.umami.is/script.js",
          "data-website-id": "0e36663c-ef9c-42c5-a147-7c0d993ab160",
          async: true,
        },
      ],
    },
  },
});
