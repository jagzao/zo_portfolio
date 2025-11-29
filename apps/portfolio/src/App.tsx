import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { PageTransition } from '@/components/PageTransition'
import { CircuitReveal } from '@/components/CircuitReveal'
import { LoadingScreen } from '@/components/LoadingScreen'

// Lazy load Three.js component to reduce initial bundle (saves ~680KB)
const NeuroNoise = lazy(() => import('@/components/NeuroNoise').then(module => ({ default: module.NeuroNoise })))

// Lazy loaded pages
const Home = lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })))
const Projects = lazy(() => import('@/pages/Projects').then(module => ({ default: module.Projects })))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })))
const Experience = lazy(() => import('@/pages/Experience').then(module => ({ default: module.Experience })))
const Skills = lazy(() => import('@/pages/Skills').then(module => ({ default: module.Skills })))
const Contact = lazy(() => import('@/pages/Contact').then(module => ({ default: module.Contact })))
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  // High-performance mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = `${e.clientX}px`
      const y = `${e.clientY}px`
      document.documentElement.style.setProperty('--mouse-x', x)
      document.documentElement.style.setProperty('--mouse-y', y)
      document.body.style.setProperty('--mouse-x', x)
      document.body.style.setProperty('--mouse-y', y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background min-h-screen font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <CircuitReveal />
        {/* Global Atmosphere - Cyber-Quetzal Nebula */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Nebula Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-secondary/5 to-transparent blur-3xl" />
          {/* NeuroNoise Overlay - Lazy loaded to reduce initial bundle */}
          <Suspense fallback={<div className="absolute inset-0 bg-background/50" />}>
            <NeuroNoise opacity={0.05} speed={0.2} />
          </Suspense>
        </div>

        <Navbar />
        <LanguageSwitch />
        <main className="relative z-10">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } />
              <Route path="/projects/:slug" element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              } />
              <Route path="/experience" element={
                <PageTransition>
                  <Experience />
                </PageTransition>
              } />
              <Route path="/skills" element={
                <PageTransition>
                  <Skills />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
              <Route path="*" element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } />
            </Routes>
          </Suspense>
        </main>
        <Toaster 
          position="top-right" 
          theme="dark"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </div>
    </QueryClientProvider>
  )
}

export default App