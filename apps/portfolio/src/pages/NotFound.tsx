import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function NotFound() {
  const handleGoBack = () => {
    window.history.back()
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <Card className="max-w-2xl w-full text-center">
        <CardContent className="p-12">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="text-8xl font-heading font-bold text-primary mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-4">
              Página no encontrada
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Lo sentimos, la página que buscas no existe o fue movida.
            </p>
            <p className="text-muted-foreground">
              Verifica la URL o usa la navegación para encontrar lo que necesitas.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Volver al inicio
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" onClick={handleGoBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Página anterior
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="border-t border-border/30 pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              O explora estas secciones:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/projects">Proyectos</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/experience">Experiencia</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/skills">Skills</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contact">Contacto</Link>
              </Button>
            </div>
          </div>
          
          {/* Easter Egg */}
          <div className="mt-8 pt-8 border-t border-border/30">
            <div className="text-xs text-muted-foreground/50 font-mono">
              Error 404: Reality.exe has stopped working
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Background Circuit Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-[-1]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          className="w-full h-full"
        >
          <defs>
            <pattern id="circuit-404" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0 20h40M20 0v40M10 10h20v20h-20z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-404)" />
        </svg>
      </div>
    </div>
  )
}