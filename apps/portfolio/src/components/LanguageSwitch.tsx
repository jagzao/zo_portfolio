'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useI18n, type Language } from '@/hooks/useI18n'

export function LanguageSwitch() {
  const { language, setLanguage } = useI18n()
  const ballRef = useRef<HTMLDivElement>(null)
  const switchRef = useRef<HTMLButtonElement>(null)
  
  const handleToggle = () => {
    const newLanguage = language === 'en' ? 'es' : 'en'
    setLanguage(newLanguage)
    
    // GSAP animation with bounce effect
    if (ballRef.current) {
      gsap.to(ballRef.current, {
        x: newLanguage === 'es' ? 20 : 0,
        duration: 1.2,
        ease: "bounce.out"
      })
    }
  }
  
  useLayoutEffect(() => {
    if (ballRef.current) {
      // Set initial position
      gsap.set(ballRef.current, {
        x: language === 'es' ? 20 : 0
      })
    }
  }, [language])
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <button
        ref={switchRef}
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E53935] bg-[#0B0B0D]/80 backdrop-blur-sm transition-all duration-300 hover:bg-[#FF3B3B]/10 hover:shadow-[0_0_12px_rgba(255,59,59,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
        aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
      >
        <div className="relative w-10 h-5 bg-[#111215] rounded-full border border-[#E53935] overflow-hidden">
          <div 
            ref={ballRef}
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-[#E53935] rounded-full"
          />
        </div>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className={language === 'en' ? 'text-[#E53935]' : 'text-[#B0B0B5]'}>
            EN
          </span>
          <span className="text-[#7A1D1D]">|</span>
          <span className={language === 'es' ? 'text-[#E53935]' : 'text-[#B0B0B5]'}>
            ES
          </span>
        </div>
      </button>
    </div>
  )
}