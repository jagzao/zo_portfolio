/**
 * Environment configuration with type-safe access to environment variables
 * @module config/env
 */

interface AppConfig {
  app: {
    name: string
    url: string
  }
  contact: {
    apiUrl: string
    resendApiKey: string
  }
  analytics: {
    cloudflareToken: string
    enabled: boolean
  }
  sentry: {
    dsn: string
    environment: string
    enabled: boolean
  }
  social: {
    github: string
    linkedin: string
    whatsapp: string
    email: string
  }
}

/**
 * Gets environment variable with fallback
 */
const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback
}

/**
 * Gets boolean environment variable
 */
const getBoolEnvVar = (key: string, fallback: boolean = false): boolean => {
  const value = import.meta.env[key]
  if (value === undefined) return fallback
  return value === 'true' || value === true
}

/**
 * Application configuration object
 * Provides centralized access to all environment variables
 */
export const config: AppConfig = {
  app: {
    name: getEnvVar('VITE_APP_NAME', 'Juan Zambrano Portfolio'),
    url: getEnvVar('VITE_APP_URL', 'https://zo-portfolio.pages.dev'),
  },
  contact: {
    apiUrl: getEnvVar('VITE_CONTACT_API_URL', 'https://api.resend.com/emails'),
    resendApiKey: getEnvVar('VITE_RESEND_API_KEY', ''),
  },
  analytics: {
    cloudflareToken: getEnvVar('VITE_CLOUDFLARE_ANALYTICS_TOKEN', ''),
    enabled: getBoolEnvVar('VITE_ENABLE_ANALYTICS', false),
  },
  sentry: {
    dsn: getEnvVar('VITE_SENTRY_DSN', ''),
    environment: getEnvVar('VITE_SENTRY_ENVIRONMENT', 'development'),
    enabled: getBoolEnvVar('VITE_ENABLE_ERROR_TRACKING', false),
  },
  social: {
    github: getEnvVar('VITE_GITHUB_URL', 'https://github.com/jagzao'),
    linkedin: getEnvVar('VITE_LINKEDIN_URL', 'https://linkedin.com/in/jagzao'),
    whatsapp: getEnvVar('VITE_WHATSAPP_NUMBER', '525549264189'),
    email: getEnvVar('VITE_EMAIL', 'jagzao@gmail.com'),
  },
}

/**
 * Validates that all required environment variables are set
 * @throws Error if required variables are missing
 */
export const validateConfig = (): void => {
  const errors: string[] = []

  // Validate required fields only in production
  if (import.meta.env.PROD) {
    if (!config.app.url) errors.push('VITE_APP_URL is required')
    if (config.sentry.enabled && !config.sentry.dsn) {
      errors.push('VITE_SENTRY_DSN is required when error tracking is enabled')
    }
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`)
  }
}

// Auto-validate on import in production
if (import.meta.env.PROD) {
  validateConfig()
}
