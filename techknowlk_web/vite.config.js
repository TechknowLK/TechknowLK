import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/send-order-email': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/send-cart-order-email': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/save-order': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/customer': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/projects': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
