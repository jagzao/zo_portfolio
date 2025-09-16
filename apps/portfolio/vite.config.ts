import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false, // Disable sourcemaps in production to reduce bundle size
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap'],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority'],
          'utils': ['clsx', 'tailwind-merge', 'sonner', 'zod']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})