import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

/**
 * Optimized Image Component
 * Features:
 * - Lazy loading by default
 * - WebP support with fallback
 * - Blur placeholder
 * - Intersection Observer for performance
 * - Responsive sizing
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/project.jpg"
 *   alt="Project screenshot"
 *   width={800}
 *   height={600}
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate WebP source if original is not WebP
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.webp')) return originalSrc
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }

  // Fallback image for errors
  const fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%23111215\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'monospace\' font-size=\'18\' fill=\'%237A1D1D\'%3EImage not available%3C/text%3E%3C/svg%3E'

  const webpSrc = getWebPSrc(src)
  const shouldLoad = isInView || priority

  return (
    <picture className={cn('block overflow-hidden', className)}>
      {/* WebP source for modern browsers */}
      {shouldLoad && !hasError && src !== webpSrc && (
        <source srcSet={webpSrc} type="image/webp" />
      )}

      <img
        ref={imgRef}
        src={hasError ? fallbackSrc : shouldLoad ? src : ''}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          'w-full h-full object-cover',
          className
        )}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1A1717] to-[#0B0B0D] animate-pulse"
          style={{
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
        />
      )}
    </picture>
  )
}

/**
 * Background image component with lazy loading
 */
interface BackgroundImageProps {
  src: string
  alt?: string
  className?: string
  children?: React.ReactNode
  overlay?: boolean
}

export function BackgroundImage({
  src,
  alt = '',
  className,
  children,
  overlay = true,
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bgImage, setBgImage] = useState<string>('')

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setBgImage(src)
      setIsLoaded(true)
    }
  }, [src])

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      role="img"
      aria-label={alt}
    >
      {/* Background image */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        }}
      />

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90" />
      )}

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1717] to-[#0B0B0D] animate-pulse" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
