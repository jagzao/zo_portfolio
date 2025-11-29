import { getReducedMotionPreference } from '@/lib/utils'

export function MouseSpotlight() {
  if (getReducedMotionPreference()) return null

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        // The background image that will be revealed
        backgroundImage: `url('/assets/circuits-bg-min.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        // The mask that reveals the background only at the mouse position
        // Using both standard and webkit prefixes for compatibility
        maskImage: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
        
        // Blend mode to make it look like a glowing light overlay
        mixBlendMode: 'plus-lighter',
        opacity: 0.8
      }}
    />
  )
}
