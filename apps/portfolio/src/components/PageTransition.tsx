import { useEffect, useRef, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const isInitialMount = useRef(true)

  // Route mapping for slide directions
  const routeOrder = ['/', '/projects', '/skills', '/experience', '/contact']
  const currentIndex = routeOrder.indexOf(location.pathname)
  const previousIndexRef = useRef(currentIndex)

  useEffect(() => {
    const reducedMotion = getReducedMotionPreference()
    
    if (!containerRef.current || reducedMotion) {
      // For reduced motion, just ensure visibility
      if (containerRef.current) {
        gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0, scale: 1 })
      }
      return
    }

    // Skip animation on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    // Clean up previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const container = containerRef.current
    const previousIndex = previousIndexRef.current
    
    // Determine slide direction
    let slideDirection = 'right' // default
    
    if (currentIndex !== -1 && previousIndex !== -1) {
      if (currentIndex > previousIndex) {
        slideDirection = 'left' // sliding to next page
      } else if (currentIndex < previousIndex) {
        slideDirection = 'right' // sliding to previous page
      }
    }

    // Special handling for direct navigation (e.g., menu clicks)
    const isDirectNavigation = Math.abs(currentIndex - previousIndex) > 1

    // Create GSAP timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onStart: () => {
        // Prevent scroll during transition
        document.body.style.overflow = 'hidden'
      },
      onComplete: () => {
        // Restore scroll
        document.body.style.overflow = ''
        // Update previous index
        previousIndexRef.current = currentIndex
      }
    })

    // Entry animation based on transition type
    if (isDirectNavigation || currentIndex === -1 || previousIndex === -1) {
      // Ultra smooth pop effect for direct navigation
      tl.fromTo(container, 
        { 
          opacity: 0,
          scale: 0.94,
          y: 15,
          filter: "blur(6px)"
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power1.out"
        }
      )
      // Extended breathing effect
      .to(container, {
        scale: 1.005,
        duration: 0.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      }, "-=0.4")
    } else {
      // Ultra smooth slide effect for sequential navigation
      const slideDistance = window.innerWidth * 0.06 // Even more reduced slide distance
      const slideX = slideDirection === 'left' ? slideDistance : -slideDistance
      
      tl.fromTo(container,
        {
          opacity: 0,
          x: slideX,
          scale: 0.97,
          filter: "blur(4px)"
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power1.out"
        }
      )
      // Extended gentle settling motion
      .to(container, {
        x: slideDirection === 'left' ? -1 : 1,
        duration: 0.4,
        ease: "power1.inOut"
      }, "-=0.3")
      .to(container, {
        x: 0,
        duration: 0.5,
        ease: "power1.out"
      })
    }

    // Stagger child elements if they have the stagger class
    const staggerElements = container.querySelectorAll('.stagger-item')
    if (staggerElements.length > 0) {
      tl.fromTo(staggerElements,
        {
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        },
        "-=0.2"
      )
    }

    timelineRef.current = tl

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      document.body.style.overflow = ''
    }
  }, [location.pathname, currentIndex])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`page-transition ${className}`}
      style={{
        opacity: 0, // Start invisible, GSAP will animate
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  )
}

// HOC for automatic page transition wrapping
export function withPageTransition<T extends object>(
  Component: React.ComponentType<T>,
  transitionClassName?: string
) {
  return function WrappedComponent(props: T) {
    return (
      <PageTransition className={transitionClassName}>
        <Component {...props} />
      </PageTransition>
    )
  }
}