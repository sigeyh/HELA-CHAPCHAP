import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/payhero': {
        target: 'https://api.payhero.co.ke',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/payhero/, '/v1'),
      },
    },
  },
})
