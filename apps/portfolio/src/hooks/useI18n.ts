import { useSyncExternalStore } from 'react'

export type Language = 'en' | 'es'
const key = 'portfolio-language'
let language: Language = typeof window !== 'undefined' && localStorage.getItem(key) === 'es' ? 'es' : 'en'
const listeners = new Set<() => void>()

function subscribe(listener:()=>void){ listeners.add(listener); return()=>listeners.delete(listener) }
function getSnapshot(){ return language }
function setLanguage(next:Language){
  language = next
  if (typeof window !== 'undefined') {
    localStorage.setItem(key,next)
    document.documentElement.lang = next
  }
  listeners.forEach(l=>l())
}

const dictionary: Record<Language,Record<string,string>> = {
  en: {
    'contact.title':'Get In Touch','contact.description':'Let’s discuss your next project','contact.workTogether':'Let’s Work Together','contact.subtitle':'Have a project or senior engineering opportunity? I’d like to hear about it.','contact.sendMessage':'Send a message','contact.name':'Name','contact.namePlaceholder':'Your full name','contact.email':'Email','contact.emailPlaceholder':'your.email@example.com','contact.message':'Message','contact.messagePlaceholder':'Tell me about the project or opportunity…','contact.send':'Send Message','contact.sending':'Sending…','contact.info':'Contact information','contact.followMe':'Follow me','contact.quickResponse':'Quick response','contact.responseTime':'I typically respond within 24 hours.','contact.whatsappDirect':'WhatsApp','contact.sendEmail':'Send Email','contact.faq':'Frequently Asked Questions','contact.faq.remote.q':'Do you work remotely?','contact.faq.remote.a':'Yes. I work remotely with distributed teams and US/LATAM time zones.','contact.faq.availability.q':'What roles are you open to?','contact.faq.availability.a':'Senior IC software engineering roles and high-impact contracting.','contact.faq.projects.q':'What is your strongest stack?','contact.faq.projects.a':'.NET/C#, Node.js/NestJS, React/TypeScript, SQL, Azure and applied AI.','contact.faq.consulting.q':'Do you offer technical consulting?','contact.faq.consulting.a':'Yes, especially architecture, backend reliability, integrations and applied AI.','contact.success':'Message sent!','contact.successDescription':'Thanks. I’ll reply soon.','contact.error':'Please correct the form errors','contact.submitError':'Error sending message. Please try again.','contact.validation.name.min':'Name must be at least 2 characters','contact.validation.email.invalid':'Please enter a valid email','contact.validation.message.min':'Message must be at least 10 characters','common.loading':'Loading…','common.error':'Error','common.tryAgain':'Try Again'
  },
  es: {
    'contact.title':'Contáctame','contact.description':'Hablemos sobre tu próximo proyecto','contact.workTogether':'Trabajemos juntos','contact.subtitle':'¿Tienes un proyecto u oportunidad senior? Me interesa conocerla.','contact.sendMessage':'Envía un mensaje','contact.name':'Nombre','contact.namePlaceholder':'Tu nombre completo','contact.email':'Email','contact.emailPlaceholder':'tu.email@ejemplo.com','contact.message':'Mensaje','contact.messagePlaceholder':'Cuéntame sobre el proyecto u oportunidad…','contact.send':'Enviar mensaje','contact.sending':'Enviando…','contact.info':'Información de contacto','contact.followMe':'Sígueme','contact.quickResponse':'Respuesta rápida','contact.responseTime':'Normalmente respondo dentro de 24 horas.','contact.whatsappDirect':'WhatsApp','contact.sendEmail':'Enviar email','contact.faq':'Preguntas frecuentes','contact.faq.remote.q':'¿Trabajas remoto?','contact.faq.remote.a':'Sí. Trabajo con equipos distribuidos y zonas horarias US/LATAM.','contact.faq.availability.q':'¿Qué roles buscas?','contact.faq.availability.a':'Roles Senior IC y contracting de alto impacto.','contact.faq.projects.q':'¿Cuál es tu stack principal?','contact.faq.projects.a':'.NET/C#, Node.js/NestJS, React/TypeScript, SQL, Azure e IA aplicada.','contact.faq.consulting.q':'¿Das consultoría técnica?','contact.faq.consulting.a':'Sí, especialmente arquitectura, confiabilidad backend, integraciones e IA aplicada.','contact.success':'¡Mensaje enviado!','contact.successDescription':'Gracias. Responderé pronto.','contact.error':'Corrige los errores del formulario','contact.submitError':'Error al enviar. Intenta de nuevo.','contact.validation.name.min':'El nombre debe tener al menos 2 caracteres','contact.validation.email.invalid':'Ingresa un email válido','contact.validation.message.min':'El mensaje debe tener al menos 10 caracteres','common.loading':'Cargando…','common.error':'Error','common.tryAgain':'Intentar nuevamente'
  }
}

export function useI18n(){
  const current = useSyncExternalStore(subscribe,getSnapshot,getSnapshot)
  return { language:current, setLanguage }
}
export function useTranslation(){
  const { language } = useI18n()
  return { language, t:(k:string)=>dictionary[language][k] ?? dictionary.en[k] ?? k }
}
