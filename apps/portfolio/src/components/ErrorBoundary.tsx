import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree
 * Logs error information and displays a fallback UI
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = (): void => {
    window.location.href = '/'
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI provided by parent
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
            </div>

            {/* Error Title */}
            <div className="space-y-4">
              <h1
                className="text-white font-bold"
                style={{
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: 1.2
                }}
              >
                Oops! Something went wrong
              </h1>
              <p
                className="text-muted-foreground max-w-lg mx-auto"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 1.8vw, 18px)',
                  lineHeight: 1.6
                }}
              >
                We're sorry for the inconvenience. An unexpected error has occurred.
                Please try refreshing the page or return to the home page.
              </p>
            </div>

            {/* Error Details (only in development) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-card border border-border rounded-lg p-6 mt-8">
                <summary
                  className="cursor-pointer text-primary font-medium mb-4 hover:text-primary/80 transition-colors"
                  style={{ fontFamily: 'Fira Code, monospace' }}
                >
                  Error Details (Development Only)
                </summary>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                      Error Message:
                    </h3>
                    <pre className="text-xs text-destructive bg-destructive/5 p-3 rounded overflow-x-auto">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                        Component Stack:
                      </h3>
                      <pre className="text-xs text-muted-foreground bg-muted/30 p-3 rounded overflow-x-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={this.handleReset}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="w-full sm:w-auto border-2 border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary px-8 py-4 text-lg font-medium transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </div>

            {/* Support Info */}
            <div className="pt-8 border-t border-border">
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                If this problem persists, please contact{' '}
                <a
                  href="mailto:jagzao@gmail.com"
                  className="text-primary hover:text-primary/80 underline transition-colors"
                >
                  jagzao@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based wrapper for functional error handling
 * Use this to programmatically reset error boundaries
 */
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return setError
}
