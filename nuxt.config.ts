import icons from "./constants/icons.json";
import splashScreens from "./constants/apple-pwa-links.json";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@nuxthq/ui",
    "@vite-pwa/nuxt",
  ],
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
      viewport: "width=device-width, initial-scale=1, user-scalable=no",
      link: [...splashScreens],
      script: [
        {
          src: "https://analytics.umami.is/script.js",
          "data-website-id": "0e36663c-ef9c-42c5-a147-7c0d993ab160",
          async: true,
        },
      ],
    },
  },
  pwa: {
    manifest: {
      name: "Feedful",
      short_name: "Feedful",
      description: "News for the curious",
      icons,
      display: "standalone",
      orientation: "portrait",
      theme_color: "#ffffff",
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,

      type: "module",
    },
  },
});
