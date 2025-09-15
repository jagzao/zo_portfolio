import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Experience } from '@/pages/Experience'
import { Skills } from '@/pages/Skills'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'
import { Navigation } from '@/components/Navigation'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { PageTransition } from '@/components/PageTransition'

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
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <LanguageSwitch />
        <main>
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