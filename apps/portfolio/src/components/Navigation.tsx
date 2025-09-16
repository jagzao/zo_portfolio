import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { getRayRenderer } from '@/lib/three'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useI18n'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'
import { useRef, useEffect } from 'react'

const menuItems = [
  { id: 'projects', key: 'nav.projects', path: '/projects', position: 'corner-tl' },
  { id: 'skills', key: 'nav.skills', path: '/skills', position: 'corner-tr' },
  { id: 'experience', key: 'nav.experience', path: '/experience', position: 'corner-bl' },
  { id: 'contact', key: 'nav.contact', path: '/contact', position: 'corner-br' }
]

const socialLinks = [
  { 
    id: 'github', 
    key: 'social.github', 
    href: 'https://github.com/jagzao', 
    icon: Github 
  },
  { 
    id: 'linkedin', 
    key: 'social.linkedin', 
    href: 'https://www.linkedin.com/in/jagzao/', 
    icon: Linkedin 
  },
  { 
    id: 'whatsapp', 
    key: 'social.phone', 
    href: 'https://wa.me/5255492641895', 
    icon: Phone 
  },
  { 
    id: 'email', 
    key: 'social.email', 
    href: 'mailto:jagzao@gmail.com', 
    icon: Mail 
  }
]

export function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()
  const timelineRefs = useRef<Map<string, gsap.core.Timeline>>(new Map())
  
  const createMenuHoverAnimation = (element: HTMLElement, isEntering: boolean, targetPosition?: string) => {
    const reducedMotion = getReducedMotionPreference()
    const elementId = element.dataset.menuId || Math.random().toString()
    
    // Clean up existing timeline
    const existingTl = timelineRefs.current.get(elementId)
    if (existingTl) {
      existingTl.kill()
    }
    
    if (reducedMotion && !isEntering) return
    
    const label = element.querySelector('.label') as HTMLElement
    const glowElement = element.querySelector('.glow') as HTMLElement
    const borderElement = element.querySelector('.border') as HTMLElement
    
    if (!label || !glowElement || !borderElement) return
    
    const tl = gsap.timeline()
    
    if (isEntering) {
      // Sunrise glow effect - starts from behind and grows smoothly
      if (!reducedMotion) {
        // Set initial state for sunrise effect
        gsap.set(glowElement, {
          scale: 0.6,
          opacity: 0,
          filter: "blur(8px)"
        })
        
        // Sunrise glow animation - like dawn breaking
        tl.to(glowElement, {
          opacity: 0.8,
          scale: 1.2,
          filter: "blur(4px)",
          duration: 0.6,
          ease: "power1.out"
        })
        .to(glowElement, {
          scale: 1.05,
          filter: "blur(2px)",
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.3")
        
        // Border appears more gently
        .to(borderElement, {
          opacity: 0.9,
          scale: 1,
          duration: 0.5,
          ease: "power1.out"
        }, "-=0.4")
        
        // Label animation with softer movement
        .to(label, {
          y: -1,
          letterSpacing: "0.25px",
          color: "#FFFFFF",
          duration: 0.3,
          ease: "power1.out"
        }, "-=0.3")
        
        // Element scale with subtle bounce
        .to(element, {
          scale: 1.06,
          duration: 0.4,
          ease: "back.out(1.2)"
        }, "-=0.3")
      }
      
      // Trigger ray animation
      if (targetPosition && location.pathname === '/') {
        const rayRenderer = getRayRenderer()
        if (rayRenderer) {
          const rect = element.getBoundingClientRect()
          rayRenderer.rayTo({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          })
        }
      }
    } else {
      // Sunset effect - glow fades like dusk
      if (!reducedMotion) {
        tl.to(glowElement, {
          opacity: 0.3,
          scale: 0.8,
          filter: "blur(6px)",
          duration: 0.4,
          ease: "power1.inOut"
        })
        .to(glowElement, {
          opacity: 0,
          scale: 0.6,
          filter: "blur(8px)",
          duration: 0.3,
          ease: "power2.inOut"
        }, "-=0.1")
        .to(borderElement, {
          opacity: 0,
          duration: 0.35,
          ease: "power1.inOut"
        }, "-=0.4")
        .to(label, {
          y: 0,
          letterSpacing: "0px",
          color: "inherit",
          duration: 0.25,
          ease: "power1.inOut"
        }, "-=0.35")
        .to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power1.inOut"
        }, "-=0.25")
      }
    }
    
    timelineRefs.current.set(elementId, tl)
    return tl
  }
  
  const isHomePage = location.pathname === '/'

  return (
    <>
      {/* Main Navigation Menu */}
      {isHomePage ? (
        // Corner layout for home - each menu item positioned individually
        menuItems.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.id}
              to={item.path}
              data-menu-id={item.id}
              className={cn(
                'corner-menu premium-menu fixed font-heading text-base font-medium transition-all duration-700 ease-out pointer-events-auto',
                item.position, // Use corner positions
                'px-4 py-3 min-h-[44px] rounded-xl border-0',
                isActive ? 'opacity-100 text-white' : 'opacity-80 text-white hover:opacity-100'
              )}
              style={{ 
                fontFamily: 'Fira Code, monospace',
                zIndex: 9999
              }}
              onMouseEnter={(e) => createMenuHoverAnimation(e.currentTarget, true, item.position)}
              onMouseLeave={(e) => createMenuHoverAnimation(e.currentTarget, false)}
              onFocus={(e) => createMenuHoverAnimation(e.currentTarget, true, item.position)}
              onBlur={(e) => createMenuHoverAnimation(e.currentTarget, false)}
            >
              {/* Glow Background */}
              <div 
                className="glow absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,59,59,0.35) 0%, transparent 60%)',
                  transform: 'scale(0.8)'
                }}
              />
              
              {/* Border */}
              <div 
                className="border absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                style={{
                  border: '1px solid #E53935',
                  transform: 'scale(0.98)'
                }}
              />
              
              {/* Active State Styling */}
              {isActive && (
                <>
                  <div 
                    className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,59,59,0.35) 0%, transparent 60%)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: '1px solid #E53935' }}
                  />
                </>
              )}
              
              {/* Label */}
              <span className="label relative z-10">
                {t(item.key)}
              </span>
            </Link>
          )
        })
      ) : (
        // Vertical list for other pages
        <div className="fixed top-8 right-8 pointer-events-auto" style={{ zIndex: 9999 }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.id}
                to={item.path}
                data-menu-id={item.id}
                className={cn(
                  'block mb-4 px-4 py-3 min-h-[44px] rounded-xl border-0 font-heading text-base font-medium transition-all duration-700 ease-out pointer-events-auto min-w-[140px]',
                  isActive ? 'opacity-100 text-white' : 'opacity-70 text-white hover:opacity-100'
                )}
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  position: 'relative'
                }}
                onMouseEnter={(e) => createMenuHoverAnimation(e.currentTarget, true)}
                onMouseLeave={(e) => createMenuHoverAnimation(e.currentTarget, false)}
                onFocus={(e) => createMenuHoverAnimation(e.currentTarget, true)}
                onBlur={(e) => createMenuHoverAnimation(e.currentTarget, false)}
              >
                {/* Glow Background */}
                <div 
                  className="glow absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,59,59,0.35) 0%, transparent 60%)',
                    transform: 'scale(0.8)'
                  }}
                />
                
                {/* Border */}
                <div 
                  className="border absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                  style={{
                    border: '1px solid #E53935',
                    transform: 'scale(0.98)'
                  }}
                />
                
                {/* Active State Styling */}
                {isActive && (
                  <>
                    <div 
                      className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,59,59,0.35) 0%, transparent 60%)'
                      }}
                    />
                    <div 
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ border: '1px solid #E53935' }}
                    />
                  </>
                )}
                
                {/* Label */}
                <span className="label relative z-10">
                  {t(item.key)}
                </span>
              </Link>
            )
          })}
        </div>
      )}
      
      {/* Social Links - Middle Left */}
      <div className="corner-menu corner-ml flex flex-col gap-4" style={{ zIndex: 9999 }}>
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[#E53935] text-[#E53935] backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-[#FF3B3B]/10 hover:shadow-[0_0_12px_rgba(255,59,59,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
              onMouseEnter={(e) => createMenuHoverAnimation(e.currentTarget, true)}
              onMouseLeave={(e) => createMenuHoverAnimation(e.currentTarget, false)}
              aria-label={t(social.key)}
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}
      </div>
    </>
  )
}