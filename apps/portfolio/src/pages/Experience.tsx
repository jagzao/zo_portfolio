import { MapPin, Calendar, ExternalLink, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/useI18n'
import { BG } from '@/components/BG'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import experienceDataEn from '@/data/experience-en.json'
import experienceDataEs from '@/data/experience-es.json'

export function Experience() {
  const { t, language } = useTranslation()
  const experienceData = language === 'es' ? experienceDataEs : experienceDataEn
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
      
      // Timeline stagger animation
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current.querySelectorAll('.experience-card'), {
          y: 20,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.4
        })
      }
      
      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, {
          y: 15,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.8
        })
      }
    })
    
    return () => ctx.revert()
  }, [])

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv/JuanZambrano_ATS_Final.pdf'
    link.download = 'Juan_Zambrano_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <BG opacity={0.25} speed={0.4} />
      
      {/* Main Content */}
      <div className="relative z-10 pt-[calc(80px+env(safe-area-inset-top))] pb-20 px-4 sm:px-6 lg:px-8">
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
              {t('experience.title')}
            </h1>
            <p 
              className="text-[#B0B0B5] max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                lineHeight: 1.5
              }}
            >
              {t('experience.description')}
            </p>
          </div>
          
          {/* Timeline */}
          <div ref={timelineRef} className="relative max-w-4xl mx-auto space-y-6">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative pl-8 ${index !== experienceData.length - 1 ? 'border-l border-[#2A2222] pb-6' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-1.5 top-2 w-3 h-3 bg-[#E53935] rounded-full" />
                
                {/* Experience Card */}
                <article 
                  className="bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-6 group hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,59,59,0.15)] hover:border-[rgba(255,59,59,0.25)] transition-all duration-300"
                  style={{ backdropFilter: 'blur(2px)' }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-4">
                    {/* Company Icon */}
                    <div className="w-16 h-16 bg-[rgba(229,57,53,0.10)] border border-[rgba(229,57,53,0.25)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span 
                        className="text-xl font-bold text-[#FF3B3B]"
                        style={{ fontFamily: 'Fira Code, monospace' }}
                      >
                        {exp.company.split(' ').map(word => word.charAt(0)).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Position & Type */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                        <h3 
                          className="text-white font-bold"
                          style={{ 
                            fontFamily: 'Fira Code, monospace',
                            fontSize: 'clamp(18px, 2vw, 20px)'
                          }}
                        >
                          {exp.position}
                        </h3>
                        <span 
                          className="px-3 py-1 rounded-full text-white border border-[rgba(229,57,53,0.25)] text-xs w-fit"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: 'rgba(229,57,53,0.08)'
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      
                      {/* Company */}
                      <h4 
                        className="text-[#E53935] mb-2"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 'clamp(16px, 1.8vw, 18px)'
                        }}
                      >
                        {exp.company}
                      </h4>
                      
                      {/* Duration & Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-[#B0B0B5] mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p 
                    className="text-[#D1D1D6] mb-6 leading-relaxed"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(14px, 1.5vw, 15px)'
                    }}
                  >
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 
                      className="text-white font-semibold mb-3"
                      style={{ fontFamily: 'Fira Code, monospace' }}
                    >
                      {t('experience.achievements')}
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-[#D1D1D6]">
                          <div className="w-2 h-2 rounded-full bg-[#E53935] mt-2 flex-shrink-0" />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <h5 
                      className="text-white font-semibold mb-3"
                      style={{ fontFamily: 'Fira Code, monospace' }}
                    >
                      {t('experience.technologies')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs bg-[rgba(229,57,53,0.08)] border border-[rgba(229,57,53,0.25)] text-[#D6D6D6] hover:bg-[rgba(255,59,59,0.12)] transition-colors duration-200"
                          style={{ fontFamily: 'Fira Code, monospace' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Related Projects */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="pt-4 border-t border-[#2A2222]">
                      <h5 
                        className="text-white font-semibold mb-2"
                        style={{ fontFamily: 'Fira Code, monospace' }}
                      >
                        {t('experience.projects')}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map((projectSlug) => (
                          <Link
                            key={projectSlug}
                            to={`/projects/${projectSlug}`}
                            className="px-3 py-1 rounded text-xs border border-[rgba(229,57,53,0.25)] text-[#E53935] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935] transition-all duration-300 flex items-center gap-1"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {t('experience.viewProject')}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div ref={ctaRef} className="mt-16 text-center">
            <div 
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(229,57,53,0.20)] rounded-[14px] p-8 max-w-2xl mx-auto"
              style={{ backdropFilter: 'blur(2px)' }}
            >
              <h3 
                className="text-white font-bold mb-4"
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(20px, 2.5vw, 24px)'
                }}
              >
                {t('experience.cta.title')}
              </h3>
              <p 
                className="text-[#B0B0B5] mb-6"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 1.6vw, 16px)'
                }}
              >
                {t('experience.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-[#E53935] hover:bg-[#FF3B3B] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Mail className="w-4 h-4" />
                  {t('experience.cta.contact')}
                </Link>
                <button
                  onClick={handleDownloadCV}
                  className="border border-[rgba(229,57,53,0.25)] text-[#E53935] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Download className="w-4 h-4" />
                  {t('experience.cta.download')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}