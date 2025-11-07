/**
 * SkipLink Component
 *
 * Provides a keyboard-accessible skip link for users to bypass navigation
 * and jump directly to main content. This is critical for accessibility.
 *
 * Features:
 * - Only visible when focused (keyboard navigation)
 * - High contrast for visibility
 * - Positioned at top of page
 * - WCAG 2.1 Level AA compliant
 */

import { useTranslation } from '@/hooks/useI18n'

export function SkipLink() {
  const { t } = useTranslation()

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4 focus:z-50
        focus:px-4 focus:py-2
        focus:bg-primary focus:text-primary-foreground
        focus:rounded-md
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        font-medium
        transition-all
      "
    >
      {t('a11y.skipToContent') || 'Skip to main content'}
    </a>
  )
}
