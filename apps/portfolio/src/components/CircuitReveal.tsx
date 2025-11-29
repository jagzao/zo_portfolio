// import { getReducedMotionPreference } from '@/lib/utils'

export function CircuitReveal() {
  // if (getReducedMotionPreference()) return null

  return (
    <div 
      className="hidden md:block pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{
        // The background image that will be revealed
        backgroundImage: `url('/assets/circuits-bg-square.webp')`,
        backgroundSize: '500px auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        
        // Golden Colorization Filter - REMOVED for original colors
        // filter: 'grayscale(100%) sepia(100%) hue-rotate(5deg) brightness(1.2) contrast(1.8) saturate(200%)',
        
        // The mask that reveals the background only at the mouse position
        // Using both standard and webkit prefixes for compatibility
        maskImage: `radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
        
        // Ensure it blends well with the dark background
        mixBlendMode: 'screen',
        opacity: 0.5,
        willChange: 'mask-image'
      }}
    />
  )
}
