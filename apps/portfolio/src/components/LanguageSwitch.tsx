import { useEffect } from 'react'
import { useI18n } from '@/hooks/useI18n'

export function LanguageSwitch() {
  const { language,setLanguage } = useI18n()
  useEffect(()=>{ document.documentElement.lang=language },[language])
  const next = language === 'en' ? 'es' : 'en'
  return <button
    type="button"
    onClick={()=>setLanguage(next)}
    className="fixed bottom-5 right-5 z-40 rounded-full border border-[#D4AF37]/30 bg-[#0B0B0D]/90 px-3 py-2 font-mono text-xs text-[#B9B9B4] shadow-[0_0_18px_rgba(212,175,55,.08)] backdrop-blur hover:border-[#D4AF37] hover:text-white"
    aria-label={`Switch to ${next === 'es' ? 'Spanish' : 'English'}`}
  >
    <span className={language==='en'?'text-[#F2C94C]':''}>EN</span>
    <span className="mx-1.5 text-[#D01920]">/</span>
    <span className={language==='es'?'text-[#F2C94C]':''}>ES</span>
  </button>
}
