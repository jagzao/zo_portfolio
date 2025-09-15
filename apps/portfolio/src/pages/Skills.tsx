import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useTranslation } from '@/hooks/useI18n'
import skillsDataEn from '@/data/skills-en.json'
import skillsDataEs from '@/data/skills-es.json'

export function Skills() {
  const { t, language } = useTranslation()
  const skillsData = language === 'es' ? skillsDataEs : skillsDataEn
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <h1 className="text-5xl font-heading font-bold mb-6">
            {t('skills.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('skills.description')}
          </p>
        </div>
        
        {/* Skills Categories */}
        <div className="space-y-12 mb-16">
          {Object.entries(skillsData.categories).map(([categoryKey, category]) => (
            <section key={categoryKey} className="reveal">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold mb-3">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.skills.map((skill) => (
                  <Card key={skill.name} className="stagger-item group hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {skill.years} {skill.years === 1 ? t('skills.experience.single') : t('skills.experience')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('skills.level')}</span>
                          <span className="font-semibold">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
        
        {/* Workflow Section */}
        <section className="reveal mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              {skillsData.workflow.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {skillsData.workflow.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.workflow.steps.map((step) => (
              <Card key={step.number} className="stagger-item group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-heading font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Certifications */}
        {skillsData.certifications && skillsData.certifications.length > 0 && (
          <section className="reveal">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              {t('skills.certifications')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.certifications.map((cert) => (
                <Card key={cert.name} className="group hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {cert.date}
                      </Badge>
                    </div>
                    
                    {cert.credential && (
                      <a
                        href={cert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {t('skills.viewCredential')}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {/* Call to Action */}
        <div className="mt-16 text-center reveal">
          <Card className="p-8 bg-primary/10 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-heading font-bold mb-4">
                {t('skills.workflow.cta.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('skills.workflow.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('skills.workflow.cta.contact')}
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {t('skills.workflow.cta.projects')}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}