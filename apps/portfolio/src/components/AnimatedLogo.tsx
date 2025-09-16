import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { initializeRayRenderer, cleanupRayRenderer, getRayRenderer } from '@/lib/three'
import { getReducedMotionPreference } from '@/lib/utils'

interface AnimatedLogoProps {
  size?: number
  showPhoto?: boolean
}

export function AnimatedLogo({ size = 120, showPhoto = true }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const flipCardRef = useRef<HTMLDivElement>(null)
  const circuitBranchesRef = useRef<SVGSVGElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [flipAnimation, setFlipAnimation] = useState<gsap.core.Tween | null>(null)
  const [hoverTimeline, setHoverTimeline] = useState<gsap.core.Timeline | null>(null)
  const autoFlipTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  useLayoutEffect(() => {
    if (!containerRef.current || !flipCardRef.current) return
    
    // Initialize Three.js ray renderer
    const rayRenderer = initializeRayRenderer(containerRef.current)
    
    // Create flip animation with GSAP
    const flipTween = gsap.to(flipCardRef.current, {
      duration: 0.7,
      rotationY: '+=180',
      ease: 'power2.inOut',
      paused: true
    })
    
    // Create hover timeline for circuit branches and logo scaling
    const tl = gsap.timeline({ paused: true })
    
    if (circuitBranchesRef.current) {
      tl.to(circuitBranchesRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
    }
    
    if (logoContainerRef.current) {
      tl.to(logoContainerRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2')
    }
    
    setFlipAnimation(flipTween)
    setHoverTimeline(tl)
    
    // Auto flip every 20 seconds (doubled from 10)
    const startAutoFlip = () => {
      if (autoFlipTimerRef.current) {
        clearInterval(autoFlipTimerRef.current)
      }
      
      autoFlipTimerRef.current = setInterval(() => {
        if (!getReducedMotionPreference()) {
          // Quick flip and back
          flipTween.play().then(() => {
            setTimeout(() => {
              flipTween.reverse()
            }, 4000) // Show photo for 4 seconds (doubled)
          })
        }
      }, 20000) // Every 20 seconds (doubled)
    }
    
    startAutoFlip()
    
    // Handle resize
    const handleResize = () => rayRenderer.resize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (autoFlipTimerRef.current) {
        clearInterval(autoFlipTimerRef.current)
      }
      cleanupRayRenderer()
      flipTween.kill()
      tl.kill()
    }
  }, [])
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (getReducedMotionPreference()) return
    
    // Play hover animations
    if (hoverTimeline) {
      hoverTimeline.play()
    }
    
    // Start flip animation
    if (flipAnimation) {
      flipAnimation.play()
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (getReducedMotionPreference()) return
    
    // Reverse hover animations
    if (hoverTimeline) {
      hoverTimeline.reverse()
    }
    
    // Reverse flip animation
    if (flipAnimation) {
      flipAnimation.reverse()
    }
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Three.js Ray Canvas - Below logo */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 5,
          background: 'transparent'
        }} 
      />
      
      {/* Logo Container */}
      <div className="relative z-20 w-full h-full">
        
        {/* Circuit Branches */}
        <svg
          ref={circuitBranchesRef}
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
        
        {/* Decorative Circuit Ring - Behind Logo */}
        <svg
          className="absolute inset-0 opacity-40 w-full h-full"
          viewBox="0 0 120 120"
          style={{ zIndex: 1 }}
        >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E53935" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF3B3B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="accentRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A1D1D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7A1D1D" stopOpacity="0.1" />
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
              opacity="0.4"
            />
            {/* Accent red rim (≤30% opacity) */}
            <circle 
              cx="60" 
              cy="60" 
              r="48" 
              fill="none" 
              stroke="url(#accentRedGradient)" 
              strokeWidth="1" 
              opacity="0.25"
            />
          </svg>
        
        {/* Flip Card Logo - Above all decorative elements */}
        <div 
          ref={logoContainerRef}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          style={{ 
            zIndex: 50,
            perspective: '1000px'
          }}
        >
          <div
            ref={flipCardRef}
            className="relative w-40 h-40"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front Side - Logo */}
            <div
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <img 
                src="/assets/logos/logo.png" 
                alt="Juan German Zambrano Ortega Logo"
                className="w-full h-full object-contain"
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(255, 59, 59, 0.8)) drop-shadow(0 0 40px rgba(255, 59, 59, 0.4))',
                  opacity: 1,
                  display: 'block'
                }}
                onLoad={() => {
                  // Logo loaded successfully
                }}
                onError={() => {
                  // Logo failed to load
                }}
              />
            </div>
            
            {/* Back Side - Photo */}
            {showPhoto && (
              <div
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #E5393520, #11121520)',
                  border: '2px solid rgba(229, 57, 53, 0.6)'
                }}
              >
                {/* Personal photo - will show if available */}
                <img 
                  src="/assets/logos/jag.jpg" 
                  alt="Juan German Zambrano Ortega"
                  className="w-full h-full object-cover hidden"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(255, 59, 59, 0.6))',
                    opacity: 1
                  }}
                  onLoad={(e) => {
                    // Show image and hide fallback when loaded
                    e.currentTarget.classList.remove('hidden');
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'none';
                  }}
                  onError={() => {
                    // Personal photo not found, showing initials fallback
                  }}
                />
                {/* Fallback initials */}
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">JGZ</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}