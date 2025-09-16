import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useTranslation } from '@/hooks/useI18n'
import { BG } from '@/components/BG'
import { gsap } from 'gsap'
import { getReducedMotionPreference } from '@/lib/utils'

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
    value: 'Texcoco, México',
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
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      
      // Form animation
      if (formRef.current) {
        gsap.fromTo(formRef.current, {
          x: -20,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3
        })
      }
      
      // Info animation
      if (infoRef.current) {
        gsap.fromTo(infoRef.current.children, {
          x: 20,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4
        })
      }
      
      // FAQ animation
      if (faqRef.current) {
        gsap.fromTo(faqRef.current, {
          y: 20,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.7
        })
      }
    })
    
    return () => ctx.revert()
  }, [])
  
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
    <div className="min-h-screen relative">
      {/* Background */}
      <BG opacity={0.25} speed={0.4} />
      
      {/* Main Content */}
      <div className="relative z-10 pt-[calc(80px+env(safe-area-inset-top))] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
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
              {t('contact.workTogether').split(' ').slice(0, -1).join(' ')} <span className="text-[#E53935]">{t('contact.workTogether').split(' ').slice(-1)}</span>
            </h1>
            <p 
              className="text-[#B0B0B5] max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                lineHeight: 1.5
              }}
            >
              {t('contact.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div ref={formRef}>
              <article 
                className="bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-8 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:shadow-[0_0_12px_rgba(255,59,59,0.15)]"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <h2 
                  className="text-white font-bold mb-6"
                  style={{ 
                    fontFamily: 'Fira Code, monospace',
                    fontSize: 'clamp(20px, 2.2vw, 24px)'
                  }}
                >
                  {t('contact.sendMessage')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-white font-medium mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t('contact.name')} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t('contact.namePlaceholder')}
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-md bg-[#0B0B0D] border text-white placeholder-[#8B8B90] transition-all duration-300 min-h-[48px] ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#2A2222] focus:border-[#FF3B3B] focus:ring-2 focus:ring-[#FF3B3B] focus:ring-opacity-25'
                      }`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none'
                      }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-white font-medium mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t('contact.email')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-md bg-[#0B0B0D] border text-white placeholder-[#8B8B90] transition-all duration-300 min-h-[48px] ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#2A2222] focus:border-[#FF3B3B] focus:ring-2 focus:ring-[#FF3B3B] focus:ring-opacity-25'
                      }`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none'
                      }}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-white font-medium mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder={t('contact.messagePlaceholder')}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`w-full px-4 py-3 rounded-md bg-[#0B0B0D] border text-white placeholder-[#8B8B90] transition-all duration-300 resize-none ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#2A2222] focus:border-[#FF3B3B] focus:ring-2 focus:ring-[#FF3B3B] focus:ring-opacity-25'
                      }`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none'
                      }}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-[#E53935] hover:bg-[#FF3B3B] disabled:bg-[#666] text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#FF3B3B] focus:ring-offset-2 focus:ring-offset-[#1A1717]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('contact.send')}
                      </>
                    )}
                  </button>
                </form>
              </article>
            </div>
            
            {/* Contact Info */}
            <div ref={infoRef} className="space-y-8">
              {/* Contact Methods */}
              <article 
                className="bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-8 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:shadow-[0_0_12px_rgba(255,59,59,0.15)]"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <h2 
                  className="text-white font-bold mb-6"
                  style={{ 
                    fontFamily: 'Fira Code, monospace',
                    fontSize: 'clamp(20px, 2.2vw, 24px)'
                  }}
                >
                  {t('contact.info')}
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    const content = (
                      <div className="flex items-center gap-4 p-4 rounded-lg border border-[#2A2222] hover:border-[rgba(255,59,59,0.40)] transition-all duration-300 group">
                        <div className={`p-3 rounded-lg transition-all duration-300 ${
                          info.primary 
                            ? 'bg-[#E53935] text-white' 
                            : 'bg-[rgba(229,57,53,0.10)] border border-[rgba(229,57,53,0.25)] text-white group-hover:bg-[#E53935]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-medium" style={{ fontFamily: 'Fira Code, monospace' }}>
                            {info.label}
                          </p>
                          <p className="text-[#B0B0B5] group-hover:text-[#E53935] transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                </div>
              </article>
              
              {/* Social Links */}
              <article 
                className="bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-8 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:shadow-[0_0_12px_rgba(255,59,59,0.15)]"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <h2 
                  className="text-white font-bold mb-6"
                  style={{ 
                    fontFamily: 'Fira Code, monospace',
                    fontSize: 'clamp(20px, 2.2vw, 24px)'
                  }}
                >
                  {t('contact.followMe')}
                </h2>
                
                <div className="space-y-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg border border-[#2A2222] hover:border-[rgba(255,59,59,0.40)] transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-lg bg-[rgba(229,57,53,0.10)] border border-[rgba(229,57,53,0.25)] text-white group-hover:bg-[#E53935] transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-medium" style={{ fontFamily: 'Fira Code, monospace' }}>
                            {social.label}
                          </p>
                          <p className="text-[#B0B0B5] group-hover:text-[#E53935] transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {social.username}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </article>
              
              {/* Quick Actions */}
              <article 
                className="bg-[rgba(229,57,53,0.08)] border border-[rgba(229,57,53,0.25)] rounded-[14px] p-8"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <h3 
                  className="text-white font-bold mb-4"
                  style={{ 
                    fontFamily: 'Fira Code, monospace',
                    fontSize: 'clamp(16px, 1.8vw, 18px)'
                  }}
                >
                  {t('contact.quickResponse')}
                </h3>
                <p className="text-[#B0B0B5] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {t('contact.responseTime')}
                </p>
                
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/525549264189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#E53935] hover:bg-[#FF3B3B] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Phone className="w-4 h-4" />
                    {t('contact.whatsappDirect')}
                  </a>
                  
                  <a
                    href="mailto:jagzao@gmail.com"
                    className="w-full border border-[rgba(229,57,53,0.25)] text-[#E53935] hover:bg-[rgba(255,59,59,0.08)] hover:border-[#E53935] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Mail className="w-4 h-4" />
                    {t('contact.sendEmail')}
                  </a>
                </div>
              </article>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div ref={faqRef} className="mt-16">
            <article 
              className="bg-[#1A1717] border border-[#2A2222] rounded-[14px] p-8 transition-all duration-300 hover:border-[rgba(255,59,59,0.40)] hover:shadow-[0_0_12px_rgba(255,59,59,0.15)]"
              style={{ backdropFilter: 'blur(2px)' }}
            >
              <h2 
                className="text-white font-bold mb-8 text-center"
                style={{ 
                  fontFamily: 'Fira Code, monospace',
                  fontSize: 'clamp(20px, 2.2vw, 24px)'
                }}
              >
                {t('contact.faq')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Fira Code, monospace' }}>
                    {t('contact.faq.remote.q')}
                  </h4>
                  <p className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    {t('contact.faq.remote.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Fira Code, monospace' }}>
                    {t('contact.faq.availability.q')}
                  </h4>
                  <p className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    {t('contact.faq.availability.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Fira Code, monospace' }}>
                    {t('contact.faq.projects.q')}
                  </h4>
                  <p className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    {t('contact.faq.projects.a')}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Fira Code, monospace' }}>
                    {t('contact.faq.consulting.q')}
                  </h4>
                  <p className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    {t('contact.faq.consulting.a')}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}