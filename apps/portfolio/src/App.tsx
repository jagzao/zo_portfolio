import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Navigation } from '@/components/Navigation'
import { MobileNav } from '@/components/MobileNav'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { PageTransition } from '@/components/PageTransition'
import { Analytics } from '@/components/Analytics'
import { SkipLink } from '@/components/SkipLink'
import { Announcer } from '@/components/Announcer'

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const Projects = lazy(() => import('@/pages/Projects').then(m => ({ default: m.Projects })))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })))
const Experience = lazy(() => import('@/pages/Experience').then(m => ({ default: m.Experience })))
const Skills = lazy(() => import('@/pages/Skills').then(m => ({ default: m.Skills })))
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))
const Privacy = lazy(() => import('@/pages/Privacy').then(m => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Terms').then(m => ({ default: m.Terms })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkipLink />
      <Announcer />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation className="hidden sm:block" />
        <MobileNav />
        <LanguageSwitch />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/privacy" element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              } />
              <Route path="/terms" element={
                <PageTransition>
                  <Terms />
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
        <Analytics />
      </div>
    </QueryClientProvider>
  )
}

export default App