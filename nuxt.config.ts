// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      title: 'Brice Théâte - Scénariste professionnel et créateur de récits originaux',
      meta: [
        { name: 'description', content: 'Brice Théâte, scénariste professionnel spécialisé dans la création de récits originaux et l\'adaptation d\'œuvres littéraires. Découvrez mon approche créative et mes projets de scénarios.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/images/logo-brice.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/images/logo-brice.png",
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
