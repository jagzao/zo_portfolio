import { ReactNode, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getReducedMotionPreference } from '@/lib/utils'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const reducedMotion = getReducedMotionPreference()

  useLayoutEffect(() => {
    if (reducedMotion || !elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top bottom-=50px',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay, duration, reducedMotion])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
