import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getReducedMotionPreference } from './utils'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Timeline instances
export let tlIntro: gsap.core.Timeline
export let tlLogoHover: gsap.core.Timeline

export function initializeGSAP() {
  const reducedMotion = getReducedMotionPreference()
  
  if (reducedMotion) {
    // Set GSAP to reduced motion mode
    gsap.set('*', { duration: 0.01 })
    return
  }

  // Initialize intro timeline
  tlIntro = gsap.timeline({ paused: true })
  
  // Initialize logo hover timeline (paused by default)
  tlLogoHover = gsap.timeline({ paused: true })
  
  // Set default animation properties
  gsap.defaults({
    duration: 0.6,
    ease: "power2.out"
  })
}


// Circuit traces animation for BG component
export function animateCircuitTraces() {
  const reducedMotion = getReducedMotionPreference()
  if (reducedMotion) return
  
  // Animate circuit traces (draw effect)
  const traces = document.querySelectorAll('.trace')
  
  traces.forEach((trace, index) => {
    const pathLength = (trace as SVGPathElement).getTotalLength()
    
    gsap.set(trace, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    })
    
    gsap.to(trace, {
      strokeDashoffset: 0,
      duration: 2.5 + Math.random() * 2,
      delay: index * 0.05,
      ease: "none",
      repeat: -1,
      repeatDelay: 3 + Math.random() * 4
    })
  })
  
  // Animate circuit nodes (pulse effect)
  const nodes = document.querySelectorAll('.node')
  
  nodes.forEach((node, index) => {
    gsap.to(node, {
      opacity: 0.2,
      scale: 1.3,
      duration: 1.2 + Math.random() * 0.8,
      delay: index * 0.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })
  })
}

// Logo intro animation
export function createIntroTimeline() {
  if (!tlIntro || getReducedMotionPreference()) return
  
  tlIntro
    .from('.logo-hexagon', {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    })
    .from('.corner-menu', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2")
    .from('.hero-text', {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.2")
}

// Logo hover animation
export function createLogoHoverTimeline() {
  if (!tlLogoHover || getReducedMotionPreference()) return
  
  tlLogoHover
    .to('.logo-hexagon', {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out"
    })
    .to('.logo-photo', {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.1")
    .to('.circuit-branches', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")
    .to('.logo-glow', {
      opacity: 1,
      scale: 1.2,
      duration: 0.2,
      ease: "power2.out"
    }, "-=0.3")
}

// Menu hover animation
export function menuHover(element: HTMLElement, isEntering: boolean) {
  const reducedMotion = getReducedMotionPreference()
  if (reducedMotion) return
  
  const underline = element.querySelector('.menu-underline')
  
  if (isEntering) {
    gsap.to(element, {
      opacity: 1,
      duration: 0.15,
      ease: "power2.out"
    })
    
    if (underline) {
      gsap.fromTo(underline, 
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.3, ease: "power2.out" }
      )
    }
  } else {
    gsap.to(element, {
      opacity: 0.5,
      duration: 0.15,
      ease: "power2.out"
    })
    
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }
}

// Scroll reveal animations
export function createScrollTriggers() {
  const reducedMotion = getReducedMotionPreference()
  if (reducedMotion) return
  
  // Reveal sections on scroll
  gsap.utils.toArray('.reveal').forEach((element: any) => {
    gsap.fromTo(element, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
  })
  
  // Staggered animations for grids
  gsap.utils.toArray('.stagger-item').forEach((element: any, index) => {
    gsap.fromTo(element,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    )
  })
}

// Play intro animation
export function playIntro() {
  if (tlIntro && !getReducedMotionPreference()) {
    tlIntro.play()
  }
  
}