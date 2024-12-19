// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/supabase',
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  srcDir: 'src/',

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  },

  nitro: {
  },

  compatibilityDate: '2024-11-01'
})