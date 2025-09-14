import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { menuHover } from '@/lib/gsap'
import { getRayRenderer } from '@/lib/three'
import { cn } from '@/lib/utils'

const menuItems = [
  { id: 'projects', label: 'Proyectos', path: '/projects', position: 'corner-tl' },
  { id: 'skills', label: 'Skills', path: '/skills', position: 'corner-tr' },
  { id: 'experience', label: 'Experiencia', path: '/experience', position: 'corner-bl' },
  { id: 'contact', label: 'Contacto', path: '/contact', position: 'corner-br' }
]

const socialLinks = [
  { 
    id: 'github', 
    label: 'GitHub', 
    href: 'https://github.com/jagzao', 
    icon: Github 
  },
  { 
    id: 'linkedin', 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/jagzao', 
    icon: Linkedin 
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp', 
    href: 'https://wa.me/525549264189', 
    icon: Phone 
  },
  { 
    id: 'email', 
    label: 'Email', 
    href: 'mailto:juan@zambrano.dev', 
    icon: Mail 
  }
]

export function Navigation() {
  const location = useLocation()
  
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
            {item.label}
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
              className="p-2 rounded-lg border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10"
              onMouseEnter={(e) => handleMenuHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleMenuHover(e.currentTarget, false)}
              aria-label={social.label}
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}
      </div>
    </>
  )
}