import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { TechGraph } from '@/components/TechGraph'
import { caseStudies } from '@/data/portfolio'
import { techDomains, technologyNodes, type TechDomain } from '@/data/technologyGraph'

export function TechnicalArsenal() {
  const [selectedId,setSelectedId] = useState('dotnet')
  const [domain,setDomain] = useState<TechDomain|'All'>('All')
  const [query,setQuery] = useState('')
  const selected = technologyNodes.find(n=>n.id===selectedId) ?? technologyNodes[0]
  const related = technologyNodes.filter(n=>selected.related.includes(n.id))
  const projects = caseStudies.filter(c=>selected.projects.includes(c.slug))
  const filtered = useMemo(()=>technologyNodes.filter(n => (domain==='All'||n.domain===domain) && n.label.toLowerCase().includes(query.toLowerCase())),[domain,query])
  return <div className="section-shell pt-32">
    <p className="section-kicker">Technical Arsenal</p><h1 className="section-title">Technology as connected evidence</h1><p className="mt-4 max-w-3xl text-[#B9B9B4]">Explore what I use, how technologies relate, and where they show up in real systems. .NET and Node.js are both first-class backend stacks.</p>
    <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><label className="relative block max-w-md"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E7E78]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search technology…" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-white outline-none focus:border-[#D4AF37]"/></label><div className="flex flex-wrap gap-2"><button onClick={()=>setDomain('All')} className={domain==='All'?'filter-chip-active':'filter-chip'}>All</button>{techDomains.map(d=><button key={d} onClick={()=>setDomain(d)} className={domain===d?'filter-chip-active':'filter-chip'}>{d}</button>)}</div></div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]"><TechGraph selectedId={selectedId} onSelect={setSelectedId}/><aside className="premium-panel p-6"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#D01920]">{selected.domain}</p><h2 className="mt-3 text-left text-3xl font-bold text-white">{selected.label}</h2><p className="mt-4 leading-7 text-[#B9B9B4]">{selected.evidence}</p><h3 className="mt-7 text-left text-sm font-semibold uppercase tracking-[.18em] text-[#D4AF37]">Related technology</h3><div className="mt-3 flex flex-wrap gap-2">{related.map(x=><button key={x.id} onClick={()=>setSelectedId(x.id)} className="tech-pill hover:border-[#D4AF37]">{x.label}</button>)}</div><h3 className="mt-7 text-left text-sm font-semibold uppercase tracking-[.18em] text-[#D4AF37]">Public evidence</h3><div className="mt-3 space-y-3">{projects.length?projects.map(p=><LinkLike key={p.slug} href={'/case-studies/'+p.slug}>{p.title}</LinkLike>):<p className="text-sm text-[#7E7E78]">Evidence is described in experience/pattern context rather than tied to a public case study.</p>}</div></aside></div>
    <section className="mt-10 premium-panel p-6"><h2 className="text-left text-xl font-bold text-white">Accessible technology list</h2><div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(n=><button key={n.id} onClick={()=>setSelectedId(n.id)} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-left hover:border-[#D4AF37]/40"><span className="text-white">{n.label}</span><span className="text-[10px] text-[#7E7E78]">{n.core?'CORE':'SUPPORT'}</span></button>)}</div></section>
  </div>
}
function LinkLike({href,children}:{href:string;children:React.ReactNode}){ return <a href={href} className="block rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-white hover:border-[#D4AF37]/40">{children}</a> }
