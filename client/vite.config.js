import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production backend URL — baked into the build at compile time
const BACKEND_URL = 'https://raaz-e-bharat-1.onrender.com';

export default defineConfig({
  plugins: [react()],
  define: {
    // Makes __BACKEND_URL__ available as a compile-time constant in all source files
    __BACKEND_URL__: JSON.stringify(
      process.env.VITE_API_URL || BACKEND_URL
    ),
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

