import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/useI18n'
import { BG } from '@/components/BG'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'
import projectsDataEn from '@/data/projects-en.json'
import projectsDataEs from '@/data/projects-es.json'

export function Projects() {
  const { t, language } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const headerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  
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
  
  // GSAP Animations
  useEffect(() => {
    if (getReducedMotionPreference()) return
    
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, {
          y: 18,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        })
      }
      
      // Filters animation
      if (filtersRef.current) {
        gsap.fromTo(filtersRef.current.children, {
          y: 10,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          delay: 0.3
        })
      }
      
      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.querySelectorAll('.project-card'), {
          y: 16,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5
        })
      }
    })
    
    return () => ctx.revert()
  }, [filteredProjects])
  
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <BG opacity={0.25} speed={0.4} />
      
      {/* Main Content */}
      <div className="relative z-10 py-20" style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
        <div className="max-w-[1280px] mx-auto">
          
          {/* Header */}
          <div ref={headerRef} className="mb-16 text-center">
            <h1 
              className="text-white font-bold mb-4"
              style={{ 
                fontFamily: 'Fira Code, monospace',
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.2
              }}
            >
              {t('projects.title')}
            </h1>
            <p 
              className="text-[#B0B0B5] max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                lineHeight: 1.5
              }}
            >
              {t('projects.description')}
            </p>
          </div>
          
          {/* Search + Filters */}
          <div ref={filtersRef} className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B5] w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('projects.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[rgba(229,57,53,0.25)] text-white placeholder-[#B0B0B5] focus:border-[#E53935] focus:outline-none focus:shadow-[0_0_10px_rgba(255,59,59,0.25)] transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              
              {/* Category Chips */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      selectedCategory === category.key
                        ? 'bg-[rgba(255,59,59,0.12)] border-[#E53935] text-white shadow-[0_2px_8px_rgba(229,57,53,0.3)]'
                        : 'bg-transparent border-[rgba(229,57,53,0.25)] text-[#D6D6D6] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935]'
                    }`}
                    style={{ 
                      fontFamily: 'Fira Code, monospace',
                      transform: selectedCategory === category.key ? 'scale(1)' : 'scale(0.98)'
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div 
            ref={cardsRef}
            className="grid gap-8"
            style={{
              gridTemplateColumns: window.innerWidth >= 1280 ? 'repeat(3, 1fr)' : 
                                  window.innerWidth >= 1024 ? 'repeat(2, 1fr)' : 
                                  '1fr'
            }}
          >
            {filteredProjects.map((project) => (
              <article 
                key={project.id} 
                className="project-card group h-full bg-[rgba(255,255,255,0.02)] border border-[rgba(229,57,53,0.20)] rounded-[14px] overflow-hidden transition-all duration-300 hover:border-[rgba(229,57,53,0.40)] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(229,57,53,0.15)]"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                {/* Header with Image/Placeholder */}
                <div className="relative h-60 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
                  <div 
                    className="text-6xl font-bold text-[#E53935] opacity-30"
                    style={{ fontFamily: 'Fira Code, monospace' }}
                  >
                    {project.title.charAt(0)}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-white border border-[rgba(229,57,53,0.25)] text-xs"
                      style={{ 
                        fontFamily: 'Fira Code, monospace',
                        backgroundColor: 'rgba(229,57,53,0.08)'
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[#B0B0B5] text-xs">{project.year}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 
                    className="text-white font-bold mb-3 line-clamp-2"
                    style={{ 
                      fontFamily: 'Fira Code, monospace',
                      fontSize: 'clamp(18px, 2vw, 20px)'
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-[#D1D1D6] mb-4 line-clamp-3"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(14px, 1.5vw, 15px)'
                    }}
                  >
                    {project.description}
                  </p>
                  
                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(project.kpis).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-[rgba(255,59,59,0.10)] border border-[rgba(255,59,59,0.25)] rounded text-[#FF3B3B] text-xs">
                        <div style={{ fontFamily: 'Fira Code, monospace' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs bg-[rgba(229,57,53,0.08)] border border-[rgba(229,57,53,0.25)] text-[#D6D6D6] hover:bg-[rgba(255,59,59,0.12)] transition-colors duration-200"
                        style={{ fontFamily: 'Fira Code, monospace' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className="px-2 py-1 rounded text-xs bg-[rgba(229,57,53,0.08)] border border-[rgba(229,57,53,0.25)] text-[#D6D6D6]"
                        style={{ fontFamily: 'Fira Code, monospace' }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 bg-[#E53935] hover:bg-[#FF3B3B] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 text-center flex items-center justify-center gap-2 h-11"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t('project.viewProject')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-[rgba(229,57,53,0.25)] text-[#E53935] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935] rounded-lg transition-all duration-300 flex items-center justify-center"
                        title="View source code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 
                className="text-white font-bold mb-4"
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(20px, 2.5vw, 24px)'
                }}
              >
                {t('projects.noResults')}
              </h3>
              <p 
                className="text-[#B0B0B5] mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t('projects.noResultsDesc')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="bg-[#E53935] hover:bg-[#FF3B3B] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}