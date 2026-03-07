import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImagemin({
      pngquant: {
        quality: [0.6, 0.8],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'p5': ['p5'],
          'three': ['three'],
          'lottie': ['lottie-react'],
        }
      }
    },
    // Use esbuild for faster minification
    minify: 'esbuild',
    // Target modern browsers for smaller output
    target: 'esnext',
    // Report gzip size for optimization tracking
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})
