import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { z } from 'zod'
import { useTranslation } from '@/hooks/useI18n'

const createContactSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('contact.validation.name.min')),
  email: z.string().email(t('contact.validation.email.invalid')),
  message: z.string().min(10, t('contact.validation.message.min'))
})

type ContactForm = {
  name: string
  email: string
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jagzao@gmail.com',
    href: 'mailto:jagzao@gmail.com',
    primary: true
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+52 55 4926 4189',
    href: 'https://wa.me/525549264189',
    primary: false
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'México',
    href: null,
    primary: false
  }
]

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/jagzao',
    username: '@jagzao'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jagzao',
    username: 'Juan Zambrano'
  }
]

export function Contact() {
  const { t } = useTranslation()
  const contactSchema = createContactSchema(t)
  
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    
    try {
      // Validate form
      contactSchema.parse(form)
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(t('contact.success'), {
        description: t('contact.successDescription')
      })
      
      // Reset form
      setForm({ name: '', email: '', message: '' })
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactForm] = err.message
          }
        })
        setErrors(fieldErrors)
        toast.error(t('contact.error'))
      } else {
        toast.error(t('contact.submitError'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <h1 className="text-5xl font-heading font-bold mb-6">
            {t('contact.workTogether').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('contact.workTogether').split(' ').slice(-1)}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="reveal">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{t('contact.sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.name')} *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('contact.namePlaceholder')}
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-500 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.email')} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.message')} *
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder={t('contact.messagePlaceholder')}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={errors.message ? 'border-red-500' : ''}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 mr-3 border-2 border-current border-t-transparent rounded-full" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        {t('contact.send')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8 reveal">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{t('contact.info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  const content = (
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-border/30 hover:border-primary/50 transition-colors group">
                      <div className={`p-3 rounded-lg ${info.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  )
                  
                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>
                      {content}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
            
            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{t('contact.followMe')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-border/30 hover:border-primary/50 transition-colors group"
                    >
                      <div className="p-3 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{social.label}</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading font-bold mb-4">{t('contact.quickResponse')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.responseTime')}
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full">
                    <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" />
                      {t('contact.whatsappDirect')}
                    </a>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <a href="mailto:juan@zambrano.dev">
                      <Mail className="w-4 h-4 mr-2" />
                      {t('contact.sendEmail')}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 reveal">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">{t('contact.faq')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.faq.remote.q')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('contact.faq.remote.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.faq.availability.q')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('contact.faq.availability.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.faq.projects.q')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('contact.faq.projects.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.faq.consulting.q')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('contact.faq.consulting.a')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}