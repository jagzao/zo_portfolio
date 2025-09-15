import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { menuHover } from '@/lib/gsap'
import { getRayRenderer } from '@/lib/three'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useI18n'

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
  
  const handleMenuHover = (element: HTMLElement, isEntering: boolean, targetPosition?: string) => {
    menuHover(element, isEntering)
    
    if (isEntering && targetPosition && location.pathname === '/') {
      // Trigger ray animation only on home page
      const rayRenderer = getRayRenderer()
      if (rayRenderer) {
        const rect = element.getBoundingClientRect()
        rayRenderer.rayTo({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
    }
  }
  
  return (
    <>
      {/* Main Navigation Menu */}
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={cn(
            'corner-menu font-heading text-sm font-medium transition-all duration-300',
            item.position,
            location.pathname === item.path && 'opacity-100 text-primary'
          )}
          onMouseEnter={(e) => handleMenuHover(e.currentTarget, true, item.position)}
          onMouseLeave={(e) => handleMenuHover(e.currentTarget, false)}
          onFocus={(e) => handleMenuHover(e.currentTarget, true, item.position)}
          onBlur={(e) => handleMenuHover(e.currentTarget, false)}
        >
          <span className="relative">
            {t(item.key)}
            <span className="menu-underline absolute bottom-0 left-0 h-0.5 w-full bg-primary scale-x-0 transition-transform" />
          </span>
        </Link>
      ))}
      
      {/* Social Links - Middle Left */}
      <div className="corner-menu corner-ml flex flex-col gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[#E53935] text-[#E53935] backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-[#FF3B3B]/10 hover:shadow-[0_0_12px_rgba(255,59,59,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
              onMouseEnter={(e) => handleMenuHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleMenuHover(e.currentTarget, false)}
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