import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowUpRight } from 'lucide-react'
import { caseStudies, type CaseCategory } from '@/data/portfolio'

const filters: Array<'All'|CaseCategory> = ['All','Enterprise','SaaS','AI','Backend','Frontend','Mobile']

export function CaseStudies() {
  const [filter,setFilter] = useState<(typeof filters)[number]>('All')
  const [query,setQuery] = useState('')
  const visible = useMemo(() => caseStudies.filter(item => {
    const matchesFilter = filter === 'All' || item.categories.includes(filter as CaseCategory)
    return matchesFilter && [item.title,item.summary,item.problem,...item.technologies].join(' ').toLowerCase().includes(query.toLowerCase())
  }),[filter,query])
  return <div className="section-shell pt-32">
    <p className="section-kicker">Real work. Real systems.</p><h1 className="section-title">Case Studies</h1><p className="mt-4 max-w-2xl text-[#B9B9B4]">Enterprise platforms, distributed systems and products I built from idea to production.</p>
    <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full max-w-md"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E7E78]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies…" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-white outline-none focus:border-[#D4AF37]"/></label>
      <div className="flex flex-wrap gap-2">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={filter===x?'filter-chip-active':'filter-chip'}>{x}</button>)}</div>
    </div>
    {(['Enterprise Work','Products I Built'] as const).map(group => {
      const items = visible.filter(item=>item.group===group); if(!items.length) return null
      return <section key={group} className="mt-14"><div className="mb-5 flex items-center justify-between"><h2 className="text-left text-2xl font-bold text-white">{group}</h2><span className="font-mono text-xs text-[#7E7E78]">{items.length} case{items.length===1?'':'s'}</span></div>
        <div className="grid gap-5 md:grid-cols-2">{items.map(item=><Link key={item.slug} to={'/case-studies/'+item.slug} className="premium-card group"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[11px] uppercase tracking-[.18em] text-[#D01920]">{item.categories.join(' · ')}</p><h3 className="mt-3 text-left text-2xl font-bold text-white group-hover:text-[#F2C94C]">{item.title}</h3></div><ArrowUpRight className="h-5 w-5 text-[#D4AF37]"/></div><p className="mt-4 text-[#B9B9B4]">{item.summary}</p><p className="mt-5 text-sm text-white/85"><span className="text-[#D4AF37]">Problem:</span> {item.problem}</p><p className="mt-2 text-sm text-white/85"><span className="text-[#D4AF37]">Outcome:</span> {item.outcome}</p><div className="mt-5 flex flex-wrap gap-2">{item.technologies.slice(0,6).map(t=><span key={t} className="tech-pill">{t}</span>)}</div></Link>)}</div>
      </section>
    })}
  </div>
}
