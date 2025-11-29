import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedLogo } from '@/components/AnimatedLogo'
import BackgroundGrid from '@/components/BackgroundGrid'
import { FadeIn } from '@/components/FadeIn'
import { initializeGSAP, createIntroTimeline, createLogoHoverTimeline, playIntro, createScrollTriggers } from '@/lib/gsap'
import { gsap } from 'gsap'
import { useTranslation } from '@/hooks/useI18n'

export function Home() {
  const initialized = useRef(false)
  const { t } = useTranslation()
  
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
    link.download = 'JuanZambrano_ATS_Final.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Interactive Gradient Logic
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Calculate percentage position
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* BG - FIRST CHILD */}
      <BackgroundGrid />
      
      
      {/* Hero Content - Single centered column, moved slightly down */}
      <FadeIn className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 pt-[calc(24px+env(safe-area-inset-top)+10vh)] pb-16">
        <div className="max-w-4xl w-full text-center space-y-8">

          {/* Logo - Top center */}
          <div className="mb-8">
            <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto">
              <AnimatedLogo size={176} />
            </div>
          </div>

          {/* H1 - Premium Brand (Sans, Extrabold, White) */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl leading-tight font-sans font-extrabold tracking-tight text-white text-center text-balance">
            {t('hero.title')}
          </h1>

          {/* H2 - Visual Impact Title (Larger, Brighter, Glowing) */}
          <h2 className="text-2xl sm:text-3xl font-mono font-extrabold tracking-widest uppercase text-amber-400 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]">
            {t('hero.subtitle')}
          </h2>

          {/* Paragraph - Mobile optimized */}
          <div className="relative z-10 p-4 rounded-xl backdrop-blur-[2px] bg-black/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] max-w-2xl mx-auto">
            <p className="text-base leading-7 text-gray-400 font-body">
              {t('hero.description')}
            </p>
          </div>
          
          {/* CTAs - Mobile full-width, desktop in row */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto items-center justify-center pt-8 mb-16">
            <Link to="/projects" className="w-full md:w-auto">
              <Button
                className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-4 text-lg font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background font-body border-none"
                aria-label="View My Work"
              >
                View My Work
              </Button>
            </Link>

            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="w-full md:w-auto border-2 border-secondary text-secondary hover:bg-secondary/10 py-4 px-8 transition-all duration-300 hover:shadow-[0_0_15px_#00E5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background font-body"
              title={t('cta.download')}
              aria-label={t('cta.download')}
            >
              <Download className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>{t('cta.download')}</span>
            </Button>
          </div>

          {/* Technology Icons - Awakening */}
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {['dotnetcore', 'react', 'vuejs', 'postgresql', 'azure', 'docker'].map((tech) => (
              <div key={tech} className="bg-white/5 border border-white/10 hover:border-amber-500/50 backdrop-blur-sm rounded-full p-3 hover:bg-white/10 transition-all duration-300 group">
                 <i className={`devicon-${tech}-plain text-3xl text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300`} title={tech} aria-hidden="true"></i>
              </div>
            ))}
          </div>
          
          {/* Screen reader text */}
          <span className="sr-only">.NET, React, Vue, PostgreSQL, Azure, Docker</span>
          
        </div>
      </FadeIn>
      
    </div>
  )
}