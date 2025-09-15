import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'en' | 'es'

interface I18nState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: 'portfolio-language',
    }
  )
)

interface Translations {
  en: Record<string, string>
  es: Record<string, string>
}

const translations: Translations = {
  en: {
    'hero.title': 'Juan German Zambrano Ortega',
    'hero.subtitle': 'SOFTWARE ENGINEERING',
    'hero.description': 'Experienced software engineer with 10+ years in scalable, secure fullstack development using .NET, React/Vue, and SQL. Available for freelance or contractor roles.',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'cta.contact': 'Contact',
    'cta.download': 'Download CV',
    'social.github': 'GitHub',
    'social.linkedin': 'LinkedIn',
    'social.phone': 'Phone',
    'social.email': 'Email',
    // Projects page
    'projects.title': 'My Projects',
    'projects.description': 'A selection of projects that demonstrate my full-stack development experience, from web applications to mobile solutions.',
    'projects.search': 'Search projects, technologies...',
    'projects.noResults': 'No projects found',
    'projects.noResultsDesc': 'Try different search terms or change the category.',
    'project.viewDetails': 'View Details',
    'project.viewProject': 'View Project',
    'project.viewCode': 'View Code',
    'project.viewLive': 'View Live',
    'project.technologies': 'Technologies',
    'projects.categories.all': 'All',
    'projects.categories.fullstack': 'Full Stack',
    'projects.categories.frontend': 'Frontend',
    'projects.categories.mobile': 'Mobile',
    'projects.categories.backend': 'Backend',
    // Skills page
    'skills.title': 'Technical Skills',
    'skills.description': 'Technologies and tools I work with',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Database',
    'skills.tools': 'Tools & Others',
    'skills.experience': 'years of experience',
    'skills.experience.single': 'year of experience',
    'skills.level': 'Level',
    'skills.workflow.cta.title': 'Need these skills on your team?',
    'skills.workflow.cta.description': 'I\'m available for freelance projects and full-time opportunities.',
    'skills.workflow.cta.contact': 'Let\'s work together',
    'skills.workflow.cta.projects': 'View my projects',
    'skills.certifications': 'Certifications',
    'skills.viewCredential': 'View credential',
    // Experience page
    'experience.title': 'Professional Experience',
    'experience.description': 'My journey in software development',
    'experience.present': 'Present',
    'experience.duration': 'Duration',
    'experience.achievements': 'Key Achievements:',
    'experience.technologies': 'Technologies:',
    'experience.projects': 'Related Projects:',
    'experience.viewProject': 'View project',
    'experience.cta.title': 'Interested in working with me?',
    'experience.cta.description': 'I\'m always open to new opportunities and interesting challenges.',
    'experience.cta.contact': 'Contact',
    'experience.cta.download': 'Download CV',
    // 404 page
    'notfound.title': 'Page Not Found',
    'notfound.description': 'The page you\'re looking for doesn\'t exist',
    'notfound.home': 'Go Home',
    // Contact page
    'contact.title': 'Get In Touch',
    'contact.description': 'Let\'s discuss your next project',
    'contact.workTogether': 'Let\'s Work Together',
    'contact.subtitle': 'Have a project in mind or an interesting opportunity? I\'d love to hear about your idea and see how I can help you.',
    'contact.sendMessage': 'Send a message',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your full name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project, idea or opportunity...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.info': 'Contact information',
    'contact.followMe': 'Follow me',
    'contact.quickResponse': 'Quick response',
    'contact.responseTime': 'I typically respond within 24 hours. For urgent inquiries, contact me directly via WhatsApp.',
    'contact.whatsappDirect': 'WhatsApp Direct',
    'contact.sendEmail': 'Send Email',
    'contact.faq': 'Frequently Asked Questions',
    'contact.faq.remote.q': 'Do you work on remote projects?',
    'contact.faq.remote.a': 'Yes, I work primarily remotely and have experience collaborating with globally distributed teams.',
    'contact.faq.availability.q': 'What is your availability?',
    'contact.faq.availability.a': 'I\'m currently available for freelance projects and full-time opportunities. My flexible schedule allows me to adapt to different time zones.',
    'contact.faq.projects.q': 'What type of projects do you prefer?',
    'contact.faq.projects.a': 'I specialize in full-stack web applications, especially with React/TypeScript and Node.js. I also work on architecture and optimization projects.',
    'contact.faq.consulting.q': 'Do you offer technical consulting?',
    'contact.faq.consulting.a': 'Yes, I offer consulting services for software architecture, code reviews, and performance optimization on existing applications.',
    'contact.success': 'Message sent!',
    'contact.successDescription': 'I\'ll contact you soon. Thanks for your interest.',
    'contact.error': 'Please correct the form errors',
    'contact.submitError': 'Error sending message. Please try again.',
    'contact.validation.name.min': 'Name must be at least 2 characters',
    'contact.validation.email.invalid': 'Please enter a valid email',
    'contact.validation.message.min': 'Message must be at least 10 characters',
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.tryAgain': 'Try Again',
  },
  es: {
    'hero.title': 'Juan German Zambrano Ortega',
    'hero.subtitle': 'DESARROLLADOR FULL-STACK & INGENIERÍA DE SOFTWARE',
    'hero.description': 'Ingeniero de software con más de 10 años de experiencia creando aplicaciones escalables y seguras usando .NET, React/Vue y SQL. Disponible para proyectos freelance.',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'cta.contact': 'Contactar',
    'cta.download': 'Descargar CV',
    'social.github': 'GitHub',
    'social.linkedin': 'LinkedIn',
    'social.phone': 'Teléfono',
    'social.email': 'Email',
    // Projects page
    'projects.title': 'Mis Proyectos',
    'projects.description': 'Una selección de proyectos que demuestran mi experiencia en desarrollo full-stack, desde aplicaciones web hasta soluciones móviles.',
    'projects.search': 'Buscar proyectos, tecnologías...',
    'projects.noResults': 'No se encontraron proyectos',
    'projects.noResultsDesc': 'Intenta con otros términos de búsqueda o cambia la categoría.',
    'project.viewDetails': 'Ver Detalles',
    'project.viewProject': 'Ver Proyecto',
    'project.viewCode': 'Ver Código',
    'project.viewLive': 'Ver En Vivo',
    'project.technologies': 'Tecnologías',
    'projects.categories.all': 'Todos',
    'projects.categories.fullstack': 'Full Stack',
    'projects.categories.frontend': 'Frontend',
    'projects.categories.mobile': 'Mobile',
    'projects.categories.backend': 'Backend',
    // Skills page
    'skills.title': 'Habilidades Técnicas',
    'skills.description': 'Tecnologías y herramientas con las que trabajo',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Base de Datos',
    'skills.tools': 'Herramientas y Otros',
    'skills.experience': 'años de experiencia',
    'skills.experience.single': 'año de experiencia',
    'skills.level': 'Nivel',
    'skills.workflow.cta.title': '¿Necesitas estas habilidades en tu equipo?',
    'skills.workflow.cta.description': 'Estoy disponible para proyectos freelance y oportunidades full-time.',
    'skills.workflow.cta.contact': 'Trabajemos juntos',
    'skills.workflow.cta.projects': 'Ver mis proyectos',
    'skills.certifications': 'Certificaciones',
    'skills.viewCredential': 'Ver credencial',
    // Experience page
    'experience.title': 'Experiencia Profesional',
    'experience.description': 'Mi trayectoria en desarrollo de software',
    'experience.present': 'Presente',
    'experience.duration': 'Duración',
    'experience.achievements': 'Logros Destacados:',
    'experience.technologies': 'Tecnologías:',
    'experience.projects': 'Proyectos Relacionados:',
    'experience.viewProject': 'Ver proyecto',
    'experience.cta.title': '¿Interesado en trabajar conmigo?',
    'experience.cta.description': 'Estoy siempre abierto a nuevas oportunidades y desafíos interesantes.',
    'experience.cta.contact': 'Contactar',
    'experience.cta.download': 'Descargar CV',
    // 404 page
    'notfound.title': 'Página No Encontrada',
    'notfound.description': 'La página que buscas no existe',
    'notfound.home': 'Ir al Inicio',
    // Contact page
    'contact.title': 'Contáctame',
    'contact.description': 'Hablemos sobre tu próximo proyecto',
    'contact.workTogether': 'Trabajemos Juntos',
    'contact.subtitle': '¿Tienes un proyecto en mente o una oportunidad interesante? Me encantaría escuchar sobre tu idea y ver cómo puedo ayudarte.',
    'contact.sendMessage': 'Envía un mensaje',
    'contact.name': 'Nombre',
    'contact.namePlaceholder': 'Tu nombre completo',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'tu.email@ejemplo.com',
    'contact.message': 'Mensaje',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto, idea o oportunidad...',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.info': 'Información de contacto',
    'contact.followMe': 'Sígueme',
    'contact.quickResponse': 'Respuesta rápida',
    'contact.responseTime': 'Típicamente respondo dentro de 24 horas. Para consultas urgentes, contáctame directamente por WhatsApp.',
    'contact.whatsappDirect': 'WhatsApp Directo',
    'contact.sendEmail': 'Enviar Email',
    'contact.faq': 'Preguntas Frecuentes',
    'contact.faq.remote.q': '¿Trabajas en proyectos remotos?',
    'contact.faq.remote.a': 'Sí, trabajo principalmente de forma remota y tengo experiencia colaborando con equipos distribuidos globalmente.',
    'contact.faq.availability.q': '¿Cuál es tu disponibilidad?',
    'contact.faq.availability.a': 'Actualmente estoy disponible para proyectos freelance y oportunidades full-time. Mi horario flexible permite adaptarme a diferentes zonas horarias.',
    'contact.faq.projects.q': '¿Qué tipo de proyectos prefieres?',
    'contact.faq.projects.a': 'Me especializo en aplicaciones web full-stack, especialmente con React/TypeScript y Node.js. También trabajo en proyectos de arquitectura y optimización.',
    'contact.faq.consulting.q': '¿Ofreces consultoría técnica?',
    'contact.faq.consulting.a': 'Sí, ofrezco servicios de consultoría para arquitectura de software, code reviews, y optimización de performance en aplicaciones existentes.',
    'contact.success': '¡Mensaje enviado!',
    'contact.successDescription': 'Te contactaré pronto. Gracias por tu interés.',
    'contact.error': 'Por favor corrige los errores del formulario',
    'contact.submitError': 'Error al enviar el mensaje. Intenta de nuevo.',
    'contact.validation.name.min': 'El nombre debe tener al menos 2 caracteres',
    'contact.validation.email.invalid': 'Ingresa un email válido',
    'contact.validation.message.min': 'El mensaje debe tener al menos 10 caracteres',
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.tryAgain': 'Intentar Nuevamente',
  },
}

export const useTranslation = () => {
  const { language } = useI18n()
  
  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }
  
  return { t, language }
}