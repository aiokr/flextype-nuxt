// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/supabase',
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  srcDir: 'src/',

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    }
  },

  nitro: {
  },

  compatibilityDate: '2024-11-01'
})