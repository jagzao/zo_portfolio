import { Suspense, useLayoutEffect, useRef, lazy } from 'react'
import { getReducedMotionPreference } from '@/lib/utils'
import { animateCircuitTraces } from '@/lib/gsap'
import { useCircuitSvg } from '@/hooks/useCircuitSvg'
import { gsap } from 'gsap'

// Lazy load NeuroNoise for better LCP
const NeuroNoise = lazy(() => import('./NeuroNoise').then(module => ({ default: module.NeuroNoise })))

interface BGProps {
  opacity?: number
  speed?: number
}

export function BG({ opacity = 0.3, speed = 0.5 }: BGProps) {
  const circuitRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const reducedMotion = getReducedMotionPreference()
  const { data: circuitSvg = '' } = useCircuitSvg()
  
  useLayoutEffect(() => {
    // Add circuit animation classes and trigger GSAP animations
    if (svgRef.current && !reducedMotion && circuitSvg) {
      const ctx = gsap.context(() => {
        // Add classes to SVG paths for GSAP targeting
        const paths = svgRef.current!.querySelectorAll('path')
        
        // Simply add trace class to all paths - the new animation system handles the rest
        paths.forEach((path, index) => {
          path.classList.add('trace')
          path.setAttribute('data-trace-id', index.toString())
        })
        
        // Trigger GSAP animations
        animateCircuitTraces()
      }, svgRef)
      
      return () => {
        ctx.revert()
      }
    }
  }, [reducedMotion, circuitSvg])
  
  return (
    <div 
      ref={circuitRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        background: '#0B0B0D',
        zIndex: 1,
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Single Background Layer */}
      {!reducedMotion ? (
        <Suspense fallback={
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(17, 18, 21, 0.3) 0%, rgba(11, 11, 13, 0.9) 100%)'
            }}
          />
        }>
          <NeuroNoise opacity={opacity * 0.6} speed={speed} />
        </Suspense>
      ) : (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(17, 18, 21, 0.2) 0%, rgba(11, 11, 13, 0.8) 100%)'
          }}
        />
      )}
      
      {/* Circuit SVG Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.85,
          minHeight: '100vh',
          minWidth: '100vw',
          mixBlendMode: 'screen'
        }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 1472 704"
          preserveAspectRatio="none"
          style={{
            filter: reducedMotion ? 'none' : 'drop-shadow(0 0 5px rgba(255, 59, 59, 0.6))',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {/* Circuit paths with exact styling */}
          <g 
            className="circuit-traces"
            style={{
              stroke: '#7A1D1D',
              strokeWidth: 0.8,
              fill: 'none',
              opacity: 1,
              willChange: 'opacity',
              pointerEvents: 'none'
            }}
            dangerouslySetInnerHTML={{ __html: circuitSvg }}
          />
        </svg>
      </div>
      
      {/* Subtle accent spots */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(122, 29, 29, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(122, 29, 29, 0.02) 0%, transparent 30%)
          `
        }}
      />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(11, 11, 13, 0.1) 70%, rgba(11, 11, 13, 0.3) 100%)
          `
        }}
      />
    </div>
  )
}

