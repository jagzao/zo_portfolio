import { useLayoutEffect, useRef, useState } from 'react'
import { tlLogoHover } from '@/lib/gsap'
import { initializeRayRenderer, cleanupRayRenderer, getRayRenderer } from '@/lib/three'
import { getReducedMotionPreference } from '@/lib/utils'

interface AnimatedLogoProps {
  size?: number
  showPhoto?: boolean
}

export function AnimatedLogo({ size = 120, showPhoto = true }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useLayoutEffect(() => {
    if (!containerRef.current) return
    
    // Initialize Three.js ray renderer
    const rayRenderer = initializeRayRenderer(containerRef.current)
    
    // Handle resize
    const handleResize = () => rayRenderer.resize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cleanupRayRenderer()
    }
  }, [])
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (tlLogoHover && !getReducedMotionPreference()) {
      tlLogoHover.play()
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (tlLogoHover && !getReducedMotionPreference()) {
      tlLogoHover.reverse()
    }
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Three.js Ray Canvas */}
      <div className="absolute inset-0 pointer-events-none z-10" />
      
      {/* Logo Container */}
      <div className="relative z-20 w-full h-full">
        {/* Red Pulsating Glow Effect */}
        <div 
          className="logo-glow absolute rounded-full opacity-30 scale-100 transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255, 59, 59, 0.2) 0%, transparent 70%)',
            width: '120%',
            height: '120%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 15px rgba(255, 59, 59, 0.3))',
            animation: 'pulse 2s ease-in-out infinite',
            zIndex: 1
          }}
          data-logo-glow="true"
        />
        
        {/* Circuit Branches */}
        <svg
          className="circuit-branches absolute opacity-0 scale-90 w-full h-full"
          viewBox="0 0 240 240"
          style={{ 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          {/* Animated circuit branches that extend outward */}
          <path
            className="circuit-line"
            d="M 120 120 L 210 80"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line"
            d="M 120 120 L 30 160"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line"
            d="M 120 120 L 160 210"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line"
            d="M 120 120 L 80 30"
            strokeDasharray="4,4"
          />
        </svg>
        
        {/* Logo Principal */}
        <div 
          className="logo-container relative flex items-center justify-center cursor-pointer w-full h-full"
        >
          {/* Tu Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/assets/logos/logo-main.png" 
              alt="Juan German Zambrano Ortega Logo"
              className="relative z-50 w-full h-full object-contain transition-all duration-300 hover:scale-105"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(255, 59, 59, 0.6))',
                opacity: 1
              }}
            />
          </div>
          
          {/* Decorative Circuit Ring */}
          <svg
            className="absolute inset-0 opacity-40 w-full h-full"
            viewBox="0 0 120 120"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E53935" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF3B3B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="accentGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A24A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C9A24A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Decorative Circuit Ring */}
            <circle 
              cx="60" 
              cy="60" 
              r="45" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="1" 
              strokeDasharray="4,4"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            />
            <circle 
              cx="60" 
              cy="60" 
              r="35" 
              fill="none" 
              stroke="#7A1D1D" 
              strokeWidth="0.5" 
              strokeDasharray="2,2"
              opacity="0.4"
            />
            {/* Accent gold rim (≤30% opacity) */}
            <circle 
              cx="60" 
              cy="60" 
              r="48" 
              fill="none" 
              stroke="url(#accentGoldGradient)" 
              strokeWidth="1" 
              opacity="0.25"
            />
          </svg>
          
          {/* Photo Overlay */}
          {showPhoto && (
            <div
              className="logo-photo absolute inset-2 rounded-full opacity-0 transition-opacity duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #E5393520, #11121520)',
                border: '1px solid rgba(229, 57, 53, 0.4)'
              }}
              data-photo-visible="false"
            >
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                JGZ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}