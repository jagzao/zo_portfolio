import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  ['Case Studies','/case-studies'],
  ['Experience','/experience'],
  ['Technical Arsenal','/technical-arsenal'],
  ['Architecture Lab','/architecture-lab'],
  ['Contact','/contact']
] as const

export function Navbar() {
  const [scrolled,setScrolled] = useState(false)
  const [open,setOpen] = useState(false)
  const location = useLocation()
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>24); window.addEventListener('scroll',fn); return()=>window.removeEventListener('scroll',fn)},[])
  useEffect(()=>setOpen(false),[location.pathname])
  return <nav aria-label="Primary navigation" className={cn('fixed inset-x-0 top-0 z-50 border-b transition-all',scrolled?'border-white/10 bg-[#050505]/92 py-3 backdrop-blur-xl':'border-transparent bg-gradient-to-b from-black/80 to-transparent py-5')}>
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-3" aria-label="Juan Zambrano home">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#D4AF37]/50 bg-black text-sm font-extrabold text-[#F2C94C] shadow-[0_0_22px_rgba(212,175,55,.12)]">JZ</span>
        <span className="hidden text-sm font-semibold text-white sm:block">Juan Zambrano</span>
      </Link>
      <div className="hidden items-center gap-6 lg:flex">
        {navLinks.map(([name,href])=><Link key={href} to={href} className={cn('text-sm transition-colors',location.pathname.startsWith(href)?'text-[#F2C94C]':'text-[#B9B9B4] hover:text-white')}>{name}</Link>)}
        <a href="/cv/JuanZambrano_ATS_Final.pdf" className="btn-dark px-4 py-2 text-xs"><FileText className="h-4 w-4"/> Resume</a>
      </div>
      <button className="rounded-lg border border-white/10 p-2 text-white lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<div className="mx-4 mt-3 rounded-2xl border border-[#D4AF37]/20 bg-[#0B0B0D] p-4 lg:hidden">{navLinks.map(([name,href])=><Link key={href} to={href} className="block rounded-lg px-3 py-3 text-[#B9B9B4] hover:bg-white/5 hover:text-white">{name}</Link>)}<a href="/cv/JuanZambrano_ATS_Final.pdf" className="mt-2 block rounded-lg px-3 py-3 text-[#F2C94C]">Download CV</a></div>}
  </nav>
}
