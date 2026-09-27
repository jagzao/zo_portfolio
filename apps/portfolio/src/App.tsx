import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { SkipLink } from '@/components/SkipLink'
import { LoadingScreen } from '@/components/LoadingScreen'

const Home = lazy(() => import('@/pages/Home').then(m => ({ default:m.Home })))
const CaseStudies = lazy(() => import('@/pages/CaseStudies').then(m => ({ default:m.CaseStudies })))
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail').then(m => ({ default:m.CaseStudyDetail })))
const Experience = lazy(() => import('@/pages/Experience').then(m => ({ default:m.Experience })))
const TechnicalArsenal = lazy(() => import('@/pages/TechnicalArsenal').then(m => ({ default:m.TechnicalArsenal })))
const ArchitectureLab = lazy(() => import('@/pages/ArchitectureLab').then(m => ({ default:m.ArchitectureLab })))
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default:m.Contact })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default:m.NotFound })))

const queryClient = new QueryClient({ defaultOptions:{ queries:{ staleTime:300000, gcTime:600000 } } })

export default function App() {
  return <QueryClientProvider client={queryClient}>
    <div className="min-h-screen bg-[#050505] text-white">
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/technical-arsenal" element={<TechnicalArsenal />} />
            <Route path="/architecture-lab" element={<ArchitectureLab />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Navigate to="/case-studies" replace />} />
            <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
            <Route path="/skills" element={<Navigate to="/technical-arsenal" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position="top-right" theme="dark" />
    </div>
  </QueryClientProvider>
}

function LegacyProjectRedirect() {
  const slug = window.location.pathname.split('/').pop()
  return <Navigate to={`/case-studies/${slug ?? ''}`} replace />
}
