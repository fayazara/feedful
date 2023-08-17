// https://nuxt.com/docs/api/configuration/nuxt-config
import icons from "./constants/icons.json";
import splashScreens from "./constants/apple-pwa-links.json";
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxthq/ui",
    "nuxt-icon",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  ui: {
    icons: ["heroicons", "logos"],
  },
  colorMode: {
    preference: "light",
  },
  supabase: {
    redirect: false,
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, user-scalable=no",
      link: [...splashScreens],
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
  },
});
