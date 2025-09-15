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


// Circuit traces animation for BG component with smooth organic draw
export function animateCircuitTraces() {
  const reducedMotion = getReducedMotionPreference()
  if (reducedMotion) {
    // For reduced motion, show circuits already drawn with low opacity
    const traces = document.querySelectorAll('.trace')
    traces.forEach((trace) => {
      gsap.set(trace, { opacity: 0.18 })
    })
    return
  }

  // Performance and stability settings
  gsap.ticker.lagSmoothing(500, 33)
  
  // Get logo center for radial ordering
  const logoCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  
  // Select and prepare paths (limit to 600 for performance)
  const allPaths = Array.from(document.querySelectorAll('.trace')) as SVGPathElement[]
  const limitedPaths = allPaths.slice(0, Math.min(600, allPaths.length))
  
  // Prepare and calculate path data
  interface PathData {
    element: SVGPathElement
    length: number
    center: { x: number, y: number }
    distance: number
    angle: number
  }
  
  const pathsData: PathData[] = limitedPaths.map(path => {
    const length = path.getTotalLength()
    const midPoint = path.getPointAtLength(length / 2)
    const distance = Math.sqrt(
      Math.pow(midPoint.x - logoCenter.x, 2) + 
      Math.pow(midPoint.y - logoCenter.y, 2)
    )
    const angle = Math.atan2(midPoint.y - logoCenter.y, midPoint.x - logoCenter.x)
    
    // Set initial path attributes
    path.setAttribute('vector-effect', 'non-scaling-stroke')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('stroke', '#7A1D1D')
    path.setAttribute('data-len', length.toString())
    
    // Initial draw state (hidden but ready)
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0
    })
    
    return {
      element: path,
      length,
      center: midPoint,
      distance,
      angle
    }
  })
  
  // Sort by distance (center to outside) and group by quadrants
  pathsData.sort((a, b) => a.distance - b.distance)
  
  // Create waves of 50-80 paths each
  const waveSize = 65
  const waves: PathData[][] = []
  for (let i = 0; i < pathsData.length; i += waveSize) {
    waves.push(pathsData.slice(i, i + waveSize))
  }
  
  // Main GSAP timeline for smooth drawing
  const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" },
    onComplete: () => {
      // After drawing is complete, start subtle micro-pulses
      startMicroPulses()
    }
  })
  
  // Draw each wave with organic timing
  waves.forEach((wave, waveIndex) => {
    wave.forEach((pathData, pathIndex) => {
      const path = pathData.element
      const length = pathData.length
      
      // Dynamic duration based on path length
      const baseDuration = 0.45 + length / 1200
      const duration = Math.max(0.6, Math.min(1.2, baseDuration))
      
      // Add small random variance to break uniformity
      const staggerDelay = pathIndex * 0.02 + (Math.random() - 0.5) * 0.01
      const waveDelay = waveIndex * 0.1
      
      // Draw animation
      tl.to(path, {
        strokeDashoffset: 0,
        duration: duration,
        ease: "power2.out"
      }, waveDelay + staggerDelay)
      
      // Parallel fade-in
      tl.to(path, {
        opacity: 0.22,
        duration: duration * 0.8,
        ease: "power2.out"
      }, waveDelay + staggerDelay + duration * 0.1)
    })
    
    // Organic pause between waves  
    if (waveIndex < waves.length - 1) {
      tl.set({}, {}, "+=0.08") // Add pause using empty set
    }
  })
  
  // Micro-glow system for select paths
  function startMicroPulses() {
    // Apply single filter to the group for performance
    const circuitGroup = document.querySelector('.circuit-traces')
    if (circuitGroup) {
      (circuitGroup as SVGElement).style.filter = 'drop-shadow(0 0 2px rgba(229,57,53,0.25))'
    }
    
    // Select 5-10% of paths for occasional micro-pulses
    const selectedPaths = pathsData
      .filter(() => Math.random() < 0.08)
      .slice(0, Math.max(1, Math.floor(pathsData.length * 0.08)))
    
    selectedPaths.forEach((pathData, index) => {
      const path = pathData.element
      
      // Create subtle pulse function
      function createPulse() {
        const pulseDelay = Math.random() * 4000 + 2000 // 2-6s random delay
        
        setTimeout(() => {
          gsap.to(path, {
            opacity: "+=0.1",
            stroke: "#FF3B3B",
            duration: 0.25,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              // Return to original state
              gsap.set(path, { stroke: "#7A1D1D" })
              // Schedule next pulse
              createPulse()
            }
          })
        }, pulseDelay)
      }
      
      // Start pulse cycle with random initial delay
      setTimeout(() => createPulse(), Math.random() * 3000)
    })
  }
  
  // Mobile optimization
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    // Reduce animation count and speed up for mobile
    tl.timeScale(1.5)
    const mobileWaves = waves.slice(0, Math.ceil(waves.length * 0.5))
    // Apply optimization logic here if needed
  }
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