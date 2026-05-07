import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
