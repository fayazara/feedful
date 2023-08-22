export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxthq/ui", "nuxt-icon", "@nuxtjs/supabase", "@vueuse/nuxt"],
  ui: {
    icons: ["heroicons", "logos", "lucide"],
  },
  colorMode: {
    preference: "light",
  },
  supabase: {
    redirect: false,
  },
});
