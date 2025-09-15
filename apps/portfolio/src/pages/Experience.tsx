import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/useI18n'
import experienceDataEn from '@/data/experience-en.json'
import experienceDataEs from '@/data/experience-es.json'

export function Experience() {
  const { t, language } = useTranslation()
  const experienceData = language === 'es' ? experienceDataEs : experienceDataEn
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <h1 className="text-5xl font-heading font-bold mb-6">
            {t('experience.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('experience.description')}
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`timeline-item reveal ${index === experienceData.length - 1 ? 'pb-0' : ''}`}
            >
              <Card className="relative group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Company Logo Placeholder */}
                  <div className="flex items-start gap-6 mb-4">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-heading text-primary font-bold">
                        {exp.company.split(' ').map(word => word.charAt(0)).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                        <h3 className="text-xl font-heading font-bold text-foreground">
                          {exp.position}
                        </h3>
                        <Badge variant="outline" className="w-fit">
                          {exp.type}
                        </Badge>
                      </div>
                      
                      <h4 className="text-lg text-primary mb-2">{exp.company}</h4>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3 text-foreground">{t('experience.achievements')}</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <h5 className="font-semibold mb-3 text-foreground">{t('experience.technologies')}</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Related Projects */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="pt-4 border-t border-border/30">
                      <h5 className="font-semibold mb-2 text-foreground">{t('experience.projects')}</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map((projectSlug) => (
                          <Button key={projectSlug} size="sm" variant="outline" asChild>
                            <a href={`/projects/${projectSlug}`} className="text-xs flex items-center gap-1">
                              {t('experience.viewProject')}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center reveal">
          <Card className="p-8 bg-primary/10 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-heading font-bold mb-4">
                {t('experience.cta.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('experience.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="/contact">{t('experience.cta.contact')}</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/cv/JuanZambrano_ATS_Final.pdf" target="_blank">
                    {t('experience.cta.download')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}