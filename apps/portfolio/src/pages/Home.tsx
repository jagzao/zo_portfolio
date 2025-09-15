import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedLogo } from '@/components/AnimatedLogo'
import { BG } from '@/components/BG'
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
    link.download = 'Juan_Zambrano_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BG - FIRST CHILD */}
      <BG opacity={0.3} speed={0.5} />
      
      
      {/* Hero Content - Single centered column */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl w-full text-center space-y-8">
          
          {/* Logo - Top center */}
          <div className="mb-8">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 mx-auto">
              <AnimatedLogo size={176} />
            </div>
          </div>
          
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-normal" style={{ fontFamily: 'Fira Code, monospace' }}>
            {t('hero.title')}
          </h1>
          
          {/* H2 */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#E53935] leading-tight tracking-normal" style={{ fontFamily: 'Fira Code, monospace' }}>
            {t('hero.subtitle')}
          </h2>
          
          {/* Paragraph */}
          <p className="text-xl text-[#B0B0B5] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', maxWidth: '720px' }}>
            {t('hero.description')}
          </p>
          
          {/* CTAs - Visible and centered */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/contact">
              <Button 
                className="bg-[#E53935] hover:bg-[#FF3B3B] text-white px-8 py-4 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('cta.contact')}
              </Button>
            </Link>
            
            <Button 
              onClick={handleDownloadCV}
              variant="outline"
              className="border-2 border-[#E53935] text-[#E53935] hover:bg-[#FF3B3B]/10 w-14 h-14 p-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
              title={t('cta.download')}
            >
              <Download className="w-6 h-6 text-[#FF3B3B]" />
            </Button>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}