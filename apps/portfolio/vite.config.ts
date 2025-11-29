import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      workbox: {
        // Enhanced caching strategies for better performance
        runtimeCaching: [
          // Cache Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Google Fonts webfonts
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache images
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache CSS/JS chunks
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Devicon CDN
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // Optimize precaching
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024 // 3MB max file size
      },
      manifest: {
        name: 'Juan German Zambrano Ortega - Portfolio',
        short_name: 'JGZ Portfolio',
        description: 'Portfolio personal de Juan German Zambrano Ortega - Full Stack Developer',
        theme_color: '#FF3B3B',
        background_color: '#0B0B0D',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
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
          // Three.js vendor chunk (large library, separate for better caching)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],

          // Animation libraries
          'animation': ['gsap'],

          // Core React vendor chunk
          'vendor': ['react', 'react-dom', 'react-router-dom'],

          // State management and data fetching
          'query': ['@tanstack/react-query'],

          // Radix UI components (only used ones)
          'radix': [
            '@radix-ui/react-separator',
            '@radix-ui/react-slot'
          ],

          // UI utilities
          'ui': ['lucide-react', 'class-variance-authority', 'sonner'],

          // General utilities
          'utils': ['clsx', 'tailwind-merge', 'zod']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})