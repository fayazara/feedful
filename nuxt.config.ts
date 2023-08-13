// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "nuxt-icon", "@nuxtjs/supabase", "@vueuse/nuxt"],
  ui: {
    icons: ["heroicons", "logos"],
  },
  colorMode: {
    preference: "light",
  },
  supabase: {
    redirect: false,
  },
});
