import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { caseStudies } from '@/data/portfolio'

export function CaseStudyDetail() {
  const { slug } = useParams()
  const item = caseStudies.find(c=>c.slug===slug)
  if (!item) return <div className="section-shell pt-32"><h1 className="section-title">Case study not found</h1><Link className="btn-gold mt-8 inline-flex" to="/case-studies">Back to Case Studies</Link></div>
  return <article className="section-shell pt-32">
    <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-white"><ArrowLeft className="h-4 w-4"/> Back to Case Studies</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><div><p className="section-kicker">{item.group}</p><h1 className="text-left text-4xl font-extrabold text-white sm:text-5xl">{item.title}</h1><p className="mt-5 text-xl leading-8 text-[#B9B9B4]">{item.summary}</p></div><div className="premium-panel p-6"><p className="text-xs uppercase tracking-[.2em] text-[#D4AF37]">My role</p><p className="mt-3 text-white">{item.role}</p>{item.live&&<a href={item.live} target="_blank" rel="noreferrer" className="btn-dark mt-5 inline-flex">Visit product <ExternalLink className="h-4 w-4"/></a>}</div></div>
    <div className="mt-12 grid gap-5 md:grid-cols-3">{[['Challenge',item.challenge],['Solution',item.solution],['Outcome',item.outcome]].map(([title,text])=><section key={title} className="premium-card"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#D01920]">{title}</p><p className="mt-4 leading-7 text-[#B9B9B4]">{text}</p></section>)}</div>
    <section className="mt-12 premium-panel p-8"><p className="section-kicker">Architecture snapshot</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{item.architecture.map((x,i)=><div key={x} className="rounded-2xl border border-[#D4AF37]/20 bg-black/50 p-4"><div className="mb-3 h-2 w-2 rounded-full bg-[#D01920]"/><p className="font-semibold text-white">{x}</p><p className="mt-2 text-xs text-[#7E7E78]">Layer {String(i+1).padStart(2,'0')}</p></div>)}</div></section>
    <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_.8fr]"><div><p className="section-kicker">Results</p><ul className="mt-4 space-y-3">{item.results.map(x=><li key={x} className="flex gap-3 text-[#B9B9B4]"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]"/>{x}</li>)}</ul></div><div><p className="section-kicker">Tech stack</p><div className="mt-4 flex flex-wrap gap-2">{item.technologies.map(t=><span key={t} className="tech-pill">{t}</span>)}</div></div></section>
  </article>
}
