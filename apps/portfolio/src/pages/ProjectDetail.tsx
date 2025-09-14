import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import projectsData from '@/data/projects.json'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projectsData.find(p => p.slug === slug)
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Proyecto no encontrado</h1>
          <p className="text-muted-foreground mb-8">El proyecto que buscas no existe o fue movido.</p>
          <Button asChild>
            <Link to="/projects">Volver a Proyectos</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  // Get related projects (excluding current)
  const relatedProjects = projectsData
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 2)
  
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 reveal">
          <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary">
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a proyectos
            </Link>
          </Button>
        </nav>
        
        {/* Hero Section */}
        <div className="mb-12 reveal">
          <div className="flex flex-col lg:flex-row gap-6 items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">
                  {project.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {project.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.links?.live && (
                  <Button asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver en vivo
                    </a>
                  </Button>
                )}
                
                {project.links?.github && (
                  <Button variant="outline" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Ver código
                    </a>
                  </Button>
                )}
                
                {project.links?.case_study && (
                  <Button variant="outline" asChild>
                    <a href={project.links.case_study} target="_blank" rel="noopener noreferrer">
                      Caso de estudio
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Project Meta */}
            <Card className="lg:w-80">
              <CardHeader>
                <CardTitle className="text-lg">Detalles del proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Año: {project.year}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Duración: {project.duration}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Estado: {project.status}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(project.kpis).map(([key, value]) => (
              <Card key={key}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {key.replace('_', ' ')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Project Image */}
        <div className="mb-12 reveal">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
            <div className="text-8xl font-heading text-primary/30">
              {project.title.charAt(0)}
            </div>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-12">
          {/* Context */}
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Contexto</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.context}
            </p>
          </section>
          
          <Separator />
          
          {/* Solution */}
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Solución</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </section>
          
          <Separator />
          
          {/* Results */}
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Resultados</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.results}
            </p>
          </section>
          
          <Separator />
          
          {/* Role */}
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Mi Rol</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.role}
            </p>
          </section>
          
          <Separator />
          
          {/* Technologies */}
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-6">Tecnologías Utilizadas</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm px-3 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        </div>
        
        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-8">Proyectos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Card key={relatedProject.id} className="project-card group">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-4xl font-heading text-primary/30">
                      {relatedProject.title.charAt(0)}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {relatedProject.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {relatedProject.year}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {relatedProject.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {relatedProject.description}
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/projects/${relatedProject.slug}`}>
                        Ver Proyecto
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}