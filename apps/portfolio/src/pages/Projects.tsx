import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ExternalLink, Github } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/useI18n'
import projectsDataEn from '@/data/projects-en.json'
import projectsDataEs from '@/data/projects-es.json'

export function Projects() {
  const { t, language } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = [
    { key: 'all', label: t('projects.categories.all') },
    { key: 'fullstack', label: t('projects.categories.fullstack') },
    { key: 'frontend', label: t('projects.categories.frontend') },
    { key: 'mobile', label: t('projects.categories.mobile') },
    { key: 'backend', label: t('projects.categories.backend') }
  ]
  
  const projectsData = language === 'es' ? projectsDataEs : projectsDataEn
  
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, projectsData])
  
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6 reveal">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto reveal">
            {t('projects.description')}
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-12 reveal">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('projects.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-muted-foreground mr-2" />
              {categories.map((category) => (
                <Button
                  key={category.key}
                  size="sm"
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className="text-sm"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={project.id} className="project-card stagger-item group h-full">
              {/* Project Image */}
              <div className="aspect-video bg-card border border-primary/20 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl font-heading text-primary/30">
                  {project.title.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="sm" asChild className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Link to={`/projects/${project.slug}`}>
                      {t('project.viewDetails')}
                    </Link>
                  </Button>
                  {project.links?.live && (
                    <Button size="sm" variant="outline" asChild className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                
                <CardTitle className="text-xl line-clamp-2">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  {Object.entries(project.kpis).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-card-foreground/5 rounded">
                      <div className="font-mono text-primary">{value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to={`/projects/${project.slug}`}>
                      {t('project.viewProject')}
                    </Link>
                  </Button>
                  {project.links?.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 reveal">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading mb-2">{t('projects.noResults')}</h3>
            <p className="text-muted-foreground">
              {t('projects.noResultsDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}