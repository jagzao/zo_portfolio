/**
 * Announcer Component
 *
 * Provides aria-live regions for announcing dynamic content changes
 * to screen readers. Essential for accessibility of dynamic SPAs.
 *
 * Features:
 * - Polite announcements (default)
 * - Assertive announcements for urgent messages
 * - Visually hidden but accessible to screen readers
 *
 * Usage:
 * ```tsx
 * <Announcer />
 * ```
 */

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from '@/hooks/useI18n'

export function Announcer() {
  const location = useLocation()
  const { t } = useTranslation()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Announce page changes to screen readers
    const pageNames: Record<string, string> = {
      '/': t('nav.home') || 'Home',
      '/projects': t('nav.projects') || 'Projects',
      '/skills': t('nav.skills') || 'Skills',
      '/experience': t('nav.experience') || 'Experience',
      '/contact': t('nav.contact') || 'Contact',
    }

    const pageName = pageNames[location.pathname] || 'Page'
    setAnnouncement(`Navigated to ${pageName}`)

    // Clear announcement after it's been read
    const timer = setTimeout(() => setAnnouncement(''), 1000)
    return () => clearTimeout(timer)
  }, [location.pathname, t])

  return (
    <>
      {/* Polite announcements - for non-urgent updates */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Assertive announcements - for urgent updates */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  )
}
