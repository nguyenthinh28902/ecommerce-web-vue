// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public'
    }
  },
  // 1. Đăng ký các module đã cài đặt
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  // 2. Cấu hình biến môi trường (API URL)
  runtimeConfig: {
    public: {
      apiGatewayBaseUrl: 'https://localhost:7123' // Thay đổi port này khớp với Backend của bạn
    }
  },

  // 5. Cấu hình Server (Tùy chọn port cho FE)
  devServer: {
    port: 3000
  },

  // 6. Tương thích phiên bản
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true }
})