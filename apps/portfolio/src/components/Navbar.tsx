import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from '@/hooks/useI18n'
import { Menu, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadCV = () => {
    window.open('/cv/JuanZambrano_ATS_Final.pdf', '_blank');
  };

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-black/30 backdrop-blur-md',
        isScrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <picture>
              <source srcSet="/assets/logos/android-chrome-192x192.webp" type="image/webp" />
              <img
                src="/assets/logos/android-chrome-192x192.png"
                alt="JGZO Logo"
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </picture>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors font-heading uppercase tracking-wider",
                  location.pathname === link.href 
                    ? "text-primary" 
                    : "text-muted hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="hidden md:flex border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase"
              onClick={handleDownloadCV}
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F1110] border-b border-emerald-900/30 p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-medium py-2 block font-heading",
                  location.pathname === link.href 
                    ? "text-primary" 
                    : "text-gray-300 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase"
              onClick={handleDownloadCV}
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
