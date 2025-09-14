import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
})

type ContactForm = z.infer<typeof contactSchema>

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
      
      toast.success('¡Mensaje enviado!', {
        description: 'Te contactaré pronto. Gracias por tu interés.'
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
        toast.error('Por favor corrige los errores del formulario')
      } else {
        toast.error('Error al enviar el mensaje. Intenta de nuevo.')
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
            Trabajemos <span className="text-primary">Juntos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente o una oportunidad interesante? 
            Me encantaría escuchar sobre tu idea y ver cómo puedo ayudarte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="reveal">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Envía un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
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
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu.email@ejemplo.com"
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
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Cuéntame sobre tu proyecto, idea o oportunidad..."
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
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Enviar Mensaje
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
                <CardTitle className="text-2xl font-heading">Información de contacto</CardTitle>
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
                <CardTitle className="text-2xl font-heading">Sígueme</CardTitle>
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
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading font-bold mb-4">Respuesta rápida</h3>
                <p className="text-muted-foreground mb-6">
                  Típicamente respondo dentro de 24 horas. Para consultas urgentes, 
                  contáctame directamente por WhatsApp.
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full">
                    <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp Directo
                    </a>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <a href="mailto:juan@zambrano.dev">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Email
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
              <CardTitle className="text-2xl font-heading text-center">Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">¿Trabajas en proyectos remotos?</h4>
                  <p className="text-muted-foreground text-sm">
                    Sí, trabajo principalmente de forma remota y tengo experiencia 
                    colaborando con equipos distribuidos globalmente.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">¿Cuál es tu disponibilidad?</h4>
                  <p className="text-muted-foreground text-sm">
                    Actualmente estoy disponible para proyectos freelance y 
                    oportunidades full-time. Mi horario flexible permite adaptarme 
                    a diferentes zonas horarias.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">¿Qué tipo de proyectos prefieres?</h4>
                  <p className="text-muted-foreground text-sm">
                    Me especializo en aplicaciones web full-stack, especialmente 
                    con React/TypeScript y Node.js. También trabajo en proyectos 
                    de arquitectura y optimización.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">¿Ofreces consultoría técnica?</h4>
                  <p className="text-muted-foreground text-sm">
                    Sí, ofrezco servicios de consultoría para arquitectura de software, 
                    code reviews, y optimización de performance en aplicaciones existentes.
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