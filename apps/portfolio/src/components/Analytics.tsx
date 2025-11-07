import { useEffect } from 'react'
import { config } from '@/config'

/**
 * Cloudflare Web Analytics component
 * Loads Cloudflare's privacy-first analytics script when enabled
 *
 * @see https://developers.cloudflare.com/analytics/web-analytics/
 */
export function Analytics() {
  useEffect(() => {
    // Only load analytics if enabled and token is provided
    if (!config.analytics.enabled || !config.analytics.cloudflareToken) {
      return
    }

    // Check if script is already loaded
    if (document.querySelector('[data-cfasync="false"][src*="cloudflareinsights.com"]')) {
      return
    }

    // Create and inject Cloudflare analytics script
    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-cfasync', 'false')
    script.src = `https://static.cloudflareinsights.com/beacon.min.js`
    script.setAttribute('data-cf-beacon', JSON.stringify({
      token: config.analytics.cloudflareToken
    }))

    document.body.appendChild(script)

    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
