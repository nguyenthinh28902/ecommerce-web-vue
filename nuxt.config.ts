// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'node:fs'

// Kiểm tra biến môi trường
const certKeyPath = process.env.DOCKER_CERT_KEY
const certCrtPath = process.env.DOCKER_CERT_CRT

// Hàm hỗ trợ đọc file an toàn
const readCertFile = (path: string | undefined) => {
  if (path && fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  }
  return undefined
}

const key = readCertFile(certKeyPath)
const cert = readCertFile(certCrtPath)

export default defineNuxtConfig({
  
  // 1. Đăng ký các module đã cài đặt
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  // 2. Cấu hình biến môi trường (API URL)
  runtimeConfig: {
    public: {
      apiGatewayBaseUrl: process.env.API_GATEWAY_URL || 'https://localhost:7123' // Thay đổi port này khớp với Backend của bạn
    }
  },

  // 5. Cấu hình Server (Tùy chọn port cho FE)
 devServer: {
    host: '0.0.0.0', // Cho phép truy cập qua IP hoặc domain local
    port: 3000,
    https:(key && cert) ? { key, cert } : false
  },
  ssr: true,
  // 6. Tương thích phiên bản
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true }
})