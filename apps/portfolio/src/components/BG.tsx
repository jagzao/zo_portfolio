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
        paths.forEach((path, index) => {
          path.classList.add('trace')
          path.setAttribute('data-trace-id', index.toString())
          
          // Add nodes at path endpoints (every 20th path to avoid overcrowding)
          if (index % 20 === 0) {
            const pathLength = path.getTotalLength()
            const endPoint = path.getPointAtLength(pathLength)
            
            // Create node element with red glow
            const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            node.setAttribute('cx', endPoint.x.toString())
            node.setAttribute('cy', endPoint.y.toString())
            node.setAttribute('r', '2')
            node.setAttribute('fill', '#FF3B3B')
            node.setAttribute('opacity', '0.4')
            node.setAttribute('filter', 'drop-shadow(0 0 4px rgba(255, 59, 59, 0.6))')
            node.classList.add('node')
            node.setAttribute('data-node-id', index.toString())
            
            svgRef.current?.appendChild(node)
          }
        })
        
        // Trigger GSAP animations
        animateCircuitTraces()
      }, svgRef)
      
      return () => {
        // Cleanup: remove added nodes
        if (svgRef.current) {
          const nodes = svgRef.current.querySelectorAll('.node')
          nodes.forEach(node => node.remove())
        }
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
        zIndex: -10
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
          opacity: 0.3
        }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full object-cover"
          viewBox="0 0 1472 704"
          preserveAspectRatio="xMidYMid slice"
          style={{
            filter: reducedMotion ? 'none' : 'drop-shadow(0 0 3px rgba(255, 59, 59, 0.4))'
          }}
        >
          {/* Circuit paths with exact styling */}
          <g 
            className="circuit-traces"
            style={{
              stroke: '#7A1D1D',
              strokeWidth: 1,
              fill: 'none',
              opacity: 0.4
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
    </div>
  )
}

