import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Download, Mail, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedLogo } from '@/components/AnimatedLogo'
import { BG } from '@/components/BG'
import { initializeGSAP, createIntroTimeline, createLogoHoverTimeline, playIntro, createScrollTriggers } from '@/lib/gsap'
import { gsap } from 'gsap'

export function Home() {
  const initialized = useRef(false)
  
  useLayoutEffect(() => {
    if (initialized.current) return
    initialized.current = true
    
    const ctx = gsap.context(() => {
      // Initialize GSAP and animations
      initializeGSAP()
      createIntroTimeline()
      createLogoHoverTimeline()
      createScrollTriggers()
    })
    
    // Play intro animation
    const timer = setTimeout(() => {
      playIntro()
    }, 300)
    
    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])
  
  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv/JuanZambrano_ATS_Final.pdf'
    link.download = 'Juan_Zambrano_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Circuit Background - FIRST CHILD */}
      <BG opacity={0.3} speed={0.5} />
      
      {/* Hero Content - Single centered column */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo - Top center */}
          <div className="mb-6">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative">
              <AnimatedLogo size={256} />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Juan German Zambrano Ortega
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#E53935] leading-tight">
              DESARROLLADOR FULL-STACK
            </h2>
            
            <p className="text-xl text-[#B0B0B5] max-w-2xl mx-auto">
              Building scalable solutions with impact.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#E53935] hover:bg-[#FF3B3B] text-white font-medium px-8 py-4 rounded-lg transition-all duration-300"
            >
              <Link to="/contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contactar
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadCV}
              className="border-2 border-[#E53935] text-[#E53935] hover:bg-[#FF3B3B]/10 font-medium px-8 py-4 rounded-lg transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar CV
            </Button>
          </div>
          
        </div>
      </div>
      
      {/* Corner Menus */}
      <Link to="/projects" className="fixed top-8 left-8 opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300 z-50">
        Proyectos destacados
      </Link>
      
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 flex flex-col gap-2 z-50">
        <a href="https://github.com/jagzaortega" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300">
          GitHub
        </a>
        <a href="https://linkedin.com/in/juanzambrano" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300">
          LinkedIn
        </a>
      </div>
      
      <Link to="/experience" className="fixed bottom-8 left-8 opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300 z-50">
        Experiencia
      </Link>
      
      <Link to="/skills" className="fixed top-8 right-8 opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300 z-50">
        Skills
      </Link>
      
      <Link to="/contact" className="fixed bottom-8 right-8 opacity-50 hover:opacity-100 text-white hover:text-[#FF3B3B] transition-all duration-300 z-50">
        Contacto
      </Link>
      
    </div>
  )
}