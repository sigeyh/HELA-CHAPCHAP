import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hakika Pro Loans',
        short_name: 'Hakika Pro',
        description: 'Premium instant credit lines',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api/payhero': {
        target: 'https://backend.payhero.co.ke',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/payhero/, '/api/v2'),
      },
    },
  },
})
