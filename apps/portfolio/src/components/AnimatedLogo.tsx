import { useLayoutEffect, useRef, useState, memo } from 'react'
import { gsap } from 'gsap'
import { initializeRayRenderer, cleanupRayRenderer, getRayRenderer } from '@/lib/three'
import { getReducedMotionPreference } from '@/lib/utils'

interface AnimatedLogoProps {
  size?: number
  showPhoto?: boolean
}

export const AnimatedLogo = memo(function AnimatedLogo({ size = 120, showPhoto = true }: AnimatedLogoProps) {
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
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        
        {/* Reactor Ring Effect - Removed per user request */}

        {/* Circuit Branches */}
        <svg
          ref={circuitBranchesRef}
          className="circuit-branches absolute opacity-0 scale-90 w-full h-full pointer-events-none"
          viewBox="0 0 240 240"
          style={{ 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        >
          {/* Animated circuit branches that extend outward */}
          <path
            className="circuit-line stroke-secondary/50"
            d="M 120 120 L 210 80"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line stroke-secondary/50"
            d="M 120 120 L 30 160"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line stroke-secondary/50"
            d="M 120 120 L 160 210"
            strokeDasharray="4,4"
          />
          <path
            className="circuit-line stroke-secondary/50"
            d="M 120 120 L 80 30"
            strokeDasharray="4,4"
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
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden bg-black shadow-[0_0_40px_rgba(251,191,36,0.5)] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Golden Glow Behind Container */}
              <div className="absolute inset-0 bg-primary/10 animate-pulse" />

              {/* WebP with PNG fallback for better performance */}
              <picture className="w-full h-full relative z-10">
                <source
                  srcSet="/assets/logos/logo.webp 1x, /assets/logos/logo@2x.webp 2x"
                  type="image/webp"
                />
                <img
                  src="/assets/logos/logo.png"
                  alt="Juan German Zambrano Ortega Logo"
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 179, 0, 0.3))',
                    opacity: 1,
                    display: 'block',
                    backgroundColor: '#000', // Hide checkerboard
                    borderRadius: '50%'
                  }}
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </div>
            
            {/* Back Side - Photo */}
            {showPhoto && (
              <div
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black shadow-[0_0_30px_rgba(255,179,0,0.3)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Personal photo - WebP with JPG fallback */}
                <picture className="w-full h-full relative z-10">
                  <source srcSet="/assets/logos/jag.webp" type="image/webp" />
                  <img
                    src="/assets/logos/jag.jpg"
                    alt="Juan German Zambrano Ortega"
                    className="w-full h-full object-cover hidden"
                    style={{
                      opacity: 1
                    }}
                    onLoad={(e) => {
                      // Show image and hide fallback when loaded
                      e.currentTarget.classList.remove('hidden');
                      const fallback = e.currentTarget.closest('picture')?.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'none';
                    }}
                  />
                </picture>
                {/* Fallback initials */}
                <div className="flex items-center justify-center relative z-10">
                  <span className="text-4xl font-bold text-emerald-500">JGZ</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})