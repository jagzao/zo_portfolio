import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { useTranslation } from '@/hooks/useI18n'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'

const menuItems = [
  { id: 'projects', key: 'nav.projects', path: '/projects' },
  { id: 'skills', key: 'nav.skills', path: '/skills' },
  { id: 'experience', key: 'nav.experience', path: '/experience' },
  { id: 'contact', key: 'nav.contact', path: '/contact' }
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  const drawerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const reducedMotion = getReducedMotionPreference()

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus first link when opened
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openDrawer = () => {
    setIsOpen(true)

    if (!reducedMotion && drawerRef.current && backdropRef.current) {
      gsap.set(drawerRef.current, { x: '100%', opacity: 0.9 })
      gsap.set(backdropRef.current, { opacity: 0 })

      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(drawerRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.4)'
      })
    }
  }

  const closeDrawer = () => {
    if (!reducedMotion && drawerRef.current && backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })

      gsap.to(drawerRef.current, {
        x: '100%',
        opacity: 0.9,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setIsOpen(false)
      })
    } else {
      setIsOpen(false)
    }

    // Return focus to button
    setTimeout(() => {
      buttonRef.current?.focus()
    }, 100)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDrawer()
    }
  }

  const handleLinkClick = () => {
    closeDrawer()
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={openDrawer}
        className="fixed top-[calc(env(safe-area-inset-top)+12px)] right-[calc(env(safe-area-inset-right)+12px)] sm:hidden z-nav w-11 h-11 bg-[#1A1717] border border-[#2A2222] rounded-lg flex items-center justify-center text-white hover:border-[#FF3B3B] hover:shadow-[0_0_8px_rgba(255,59,59,0.3)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1717]"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-hidden="true"
        >
          {/* Drawer */}
          <div
            ref={drawerRef}
            className="fixed right-0 top-0 h-full bg-[#1A1717] border-l border-[#2A2222] z-nav shadow-xl"
            style={{ width: 'min(88vw, 360px)' }}
            role="dialog"
            aria-modal="true"
            id="mobile-drawer"
          >
            <div className="flex flex-col h-full px-5 pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]">

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Fira Code, monospace' }}>
                  Menu
                </h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 text-[#B0B0B5] hover:text-[#FF3B3B] transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1">
                <ul className="space-y-6">
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path
                    return (
                      <li key={item.id}>
                        <Link
                          ref={index === 0 ? firstLinkRef : undefined}
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 border-b border-transparent hover:border-[#E53935]/40 hover:shadow-[0_0_8px_rgba(255,59,59,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] ${
                            isActive
                              ? 'text-[#FF3B3B] bg-[rgba(255,59,59,0.08)] border-[#E53935]/40'
                              : 'text-white hover:text-[#FF3B3B]'
                          }`}
                          style={{
                            fontFamily: 'Fira Code, monospace',
                            minHeight: '44px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          role="menuitem"
                        >
                          {t(item.key)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-[#2A2222]">
                <h3 className="text-sm font-medium text-[#B0B0B5] mb-4" style={{ fontFamily: 'Fira Code, monospace' }}>
                  {t('contact.followMe')}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#313235] border border-[#E53935]/25 rounded-lg text-[#E53935] hover:bg-[#FF3B3B]/10 hover:border-[#E53935] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B]"
                        style={{ minHeight: '44px', minWidth: '44px' }}
                        aria-label={t(social.key)}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Language Toggle */}
              <div className="mt-6 pt-4 border-t border-[#2A2222]">
                <button
                  className="w-full py-3 px-4 bg-[rgba(255,59,59,0.08)] border border-[#E53935]/25 rounded-lg text-[#E53935] hover:bg-[rgba(255,59,59,0.12)] hover:border-[#E53935] transition-all duration-300 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B]"
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    minHeight: '44px'
                  }}
                >
                  🌐 ES / EN
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-[#B0B0B5]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  © 2025 jagzao
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}