import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins:[
    react(),
    VitePWA({
      registerType:'autoUpdate',
      includeAssets:[
        'assets/logos/favicon.ico',
        'assets/logos/apple-touch-icon.png',
        'assets/logos/android-chrome-192x192.png'
      ],
      manifest:{
        name:'Juan Zambrano — Senior Software Engineer',
        short_name:'Juan Zambrano',
        description:'Senior Software Engineer — .NET, Node.js, Distributed Systems & Applied AI',
        theme_color:'#050505',
        background_color:'#050505',
        display:'standalone',
        start_url:'/',
        scope:'/',
        icons:[
          { src:'/assets/logos/android-chrome-192x192.png', sizes:'192x192', type:'image/png' },
          { src:'/assets/logos/logo.webp', sizes:'any', type:'image/webp', purpose:'any maskable' }
        ]
      },
      workbox:{
        globPatterns:['**/*.{js,css,html,ico,png,svg,webp,jpg,pdf}'],
        maximumFileSizeToCacheInBytes:3*1024*1024,
        runtimeCaching:[
          {
            urlPattern:/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler:'CacheFirst',
            options:{ cacheName:'fonts', expiration:{maxEntries:20,maxAgeSeconds:31536000}, cacheableResponse:{statuses:[0,200]} }
          }
        ]
      }
    })
  ],
  resolve:{ alias:{ '@':path.resolve(__dirname,'./src') } },
  build:{
    sourcemap:false,
    minify:'esbuild',
    chunkSizeWarningLimit:1000,
    rollupOptions:{ output:{ manualChunks:{
      vendor:['react','react-dom','react-router-dom'],
      query:['@tanstack/react-query'],
      animation:['gsap'],
      three:['three','@react-three/fiber','@react-three/drei'],
      ui:['lucide-react','sonner','class-variance-authority'],
      utils:['clsx','tailwind-merge','zod']
    }}}
  },
  server:{ port:3000, open:true }
})
