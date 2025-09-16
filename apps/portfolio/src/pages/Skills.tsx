import { useTranslation } from '@/hooks/useI18n'
import { BG } from '@/components/BG'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import skillsDataEn from '@/data/skills-en.json'
import skillsDataEs from '@/data/skills-es.json'

const iconMap: Record<string, string> = {
  react: 'devicon-react-original',
  vue: 'devicon-vuejs-plain',
  vuejs: 'devicon-vuejs-plain',
  nodejs: 'devicon-nodejs-plain',
  typescript: 'devicon-typescript-plain',
  javascript: 'devicon-javascript-plain',
  html5: 'devicon-html5-plain',
  css3: 'devicon-css3-plain',
  tailwind: 'devicon-tailwindcss-plain',
  git: 'devicon-git-plain',
  nextjs: 'devicon-nextjs-plain',
  webpack: 'devicon-webpack-plain',
  vite: 'devicon-vitejs-plain',
  dotnetcore: 'devicon-dotnetcore-plain',
  dotnet: 'devicon-dot-net-plain',
  python: 'devicon-python-plain',
  express: 'devicon-express-original',
  postgresql: 'devicon-postgresql-plain',
  mongodb: 'devicon-mongodb-plain',
  redis: 'devicon-redis-plain',
  graphql: 'devicon-graphql-plain',
  docker: 'devicon-docker-plain',
  azure: 'devicon-azure-plain',
  githubactions: 'devicon-github-original',
  oracle: 'devicon-oracle-original',
  microsoftsqlserver: 'devicon-microsoftsqlserver-plain',
  vscode: 'devicon-vscode-plain',
  visualstudio: 'devicon-visualstudio-plain'
}

const getIconClass = (iconName: string) => {
  return iconMap[iconName.toLowerCase()] || 'devicon-code-plain'
}

export function Skills() {
  const { t, language } = useTranslation()
  const skillsData = language === 'es' ? skillsDataEs : skillsDataEn
  const headerRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
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
      
      // Categories stagger animation
      if (categoriesRef.current) {
        gsap.fromTo(categoriesRef.current.querySelectorAll('.category-section'), {
          y: 20,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.3
        })
      }
      
      // Workflow animation
      if (workflowRef.current) {
        gsap.fromTo(workflowRef.current.querySelectorAll('.workflow-card'), {
          y: 16,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6
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
              {t('skills.title')}
            </h1>
            <p 
              className="text-[#B0B0B5] max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                lineHeight: 1.5
              }}
            >
              {t('skills.description')}
            </p>
          </div>
          
          {/* Skills Categories */}
          <div ref={categoriesRef} className="space-y-12 mb-16">
            {Object.entries(skillsData.categories).map(([categoryKey, category]) => (
              <section key={categoryKey} className="category-section">
                <div className="mb-8">
                  <h2 
                    className="text-white font-bold mb-3"
                    style={{ 
                      fontFamily: 'Fira Code, monospace',
                      fontSize: 'clamp(22px, 2.5vw, 28px)'
                    }}
                  >
                    {category.title}
                  </h2>
                  <p 
                    className="text-[#B0B0B5]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {category.description}
                  </p>
                </div>
                
                <div className="grid gap-6" style={{
                  gridTemplateColumns: window.innerWidth >= 1280 ? 'repeat(4, 1fr)' : 
                                      window.innerWidth >= 1024 ? 'repeat(3, 1fr)' : 
                                      window.innerWidth >= 768 ? 'repeat(2, 1fr)' : 
                                      '1fr'
                }}>
                  {category.skills.map((skill) => (
                    <article 
                      key={skill.name} 
                      className="skill-card group bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-6 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,59,59,0.2)]"
                      style={{ backdropFilter: 'blur(2px)' }}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[rgba(229,57,53,0.10)] border border-[rgba(229,57,53,0.25)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <i 
                            className={`${getIconClass(skill.icon)} text-white text-2xl group-hover:text-[#FF3B3B] transition-colors duration-300`}
                            style={{ filter: 'drop-shadow(0 0 6px transparent)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'drop-shadow(0 0 6px #ff3b3b)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'drop-shadow(0 0 6px transparent)'
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold mb-1" style={{ fontFamily: 'Fira Code, monospace' }}>
                            {skill.name} — {skill.level}% ({skill.years} {skill.years === 1 ? t('skills.experience.single') : t('skills.experience')})
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div 
                          className="w-full bg-[#2A2525] rounded-full h-2 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} skill level: ${skill.level}%`}
                          tabIndex={0}
                          style={{ 
                            outline: 'none'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.outline = '2px solid #FF3B3B'
                            e.currentTarget.style.outlineOffset = '2px'
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.outline = 'none'
                          }}
                        >
                          <div 
                            className="bg-[#FF3B3B] h-full rounded-full transition-all duration-500 hover:animate-pulse"
                            style={{ 
                              width: `${skill.level}%`,
                              animation: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.animation = 'pulse 2s infinite'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.animation = 'none'
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
          
          {/* Workflow Section */}
          <section ref={workflowRef} className="mb-16">
            <div className="text-center mb-12">
              <h2 
                className="text-white font-bold mb-4"
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(24px, 2.8vw, 32px)'
                }}
              >
                {skillsData.workflow.title}
              </h2>
              <p 
                className="text-[#B0B0B5]"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 1.6vw, 18px)'
                }}
              >
                {skillsData.workflow.subtitle}
              </p>
            </div>
            
            <div className="grid gap-8" style={{
              gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr'
            }}>
              {skillsData.workflow.steps.map((step) => (
                <article 
                  key={step.number} 
                  className="workflow-card group bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-6 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,59,59,0.2)]"
                  style={{ backdropFilter: 'blur(2px)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#E53935] text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ fontFamily: 'Fira Code, monospace' }}>
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Fira Code, monospace' }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-[#D1D1D6] mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 rounded text-xs bg-[rgba(229,57,53,0.08)] border border-[rgba(229,57,53,0.25)] text-[#D6D6D6] hover:bg-[rgba(255,59,59,0.12)] transition-colors duration-200"
                        style={{ fontFamily: 'Fira Code, monospace' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
          
          {/* Certifications */}
          {skillsData.certifications && skillsData.certifications.length > 0 && (
            <section className="mb-16">
              <h2 
                className="text-white font-bold mb-8 text-center"
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(22px, 2.5vw, 28px)'
                }}
              >
                {t('skills.certifications')}
              </h2>
              
              <div className="grid gap-6" style={{
                gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr'
              }}>
                {skillsData.certifications.map((cert) => (
                  <article 
                    key={cert.name} 
                    className="group bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-6 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,59,59,0.2)]"
                    style={{ backdropFilter: 'blur(2px)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Fira Code, monospace' }}>
                          {cert.name}
                        </h4>
                        <p className="text-[#B0B0B5]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {cert.issuer}
                        </p>
                      </div>
                      <span 
                        className="px-3 py-1 rounded-full text-white border border-[rgba(229,57,53,0.25)] text-xs"
                        style={{ 
                          fontFamily: 'Fira Code, monospace',
                          backgroundColor: 'rgba(229,57,53,0.08)'
                        }}
                      >
                        {cert.date}
                      </span>
                    </div>
                    
                    {cert.credential && (
                      <a
                        href={cert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E53935] hover:text-[#FF3B3B] inline-flex items-center gap-1 transition-colors duration-300"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {t('skills.viewCredential')}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
          
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
                {t('skills.workflow.cta.title')}
              </h3>
              <p 
                className="text-[#B0B0B5] mb-6"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 1.6vw, 16px)'
                }}
              >
                {t('skills.workflow.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-[#E53935] hover:bg-[#FF3B3B] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t('skills.workflow.cta.contact')}
                </a>
                <a
                  href="/projects"
                  className="border border-[rgba(229,57,53,0.25)] text-[#E53935] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935] px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t('skills.workflow.cta.projects')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}