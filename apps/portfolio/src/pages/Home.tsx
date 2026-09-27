import { Link } from 'react-router-dom'
import { ArrowRight, Download, Linkedin, ShieldCheck, Network, Cloud, BrainCircuit } from 'lucide-react'
import { capabilityCards, caseStudies, experience } from '@/data/portfolio'
import { generateArchitecture, defaultArchitectureRequirements } from '@/lib/architectureLab'
import { ArchitectureGraph } from '@/components/ArchitectureGraph'

const icons = [ShieldCheck, Network, Cloud, BrainCircuit]

export function Home() {
  const teaser = generateArchitecture(defaultArchitectureRequirements)
  const teaserNodes = teaser.nodes.slice(0, 8)
  const teaserIds = new Set(teaserNodes.map(n => n.id))
  const teaserEdges = teaser.edges.filter(e => teaserIds.has(e.from) && teaserIds.has(e.to))

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="premium-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[.34em] text-[#D01920]">Build · Solve · Scale · Improve</p>
            <h1 className="max-w-4xl text-left text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Senior Software Engineer</h1>
            <p className="mt-5 text-xl font-semibold text-[#F2C94C] sm:text-2xl">.NET, Node.js, Distributed Systems & Applied AI</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B9B9B4]">I build and modernize secure, scalable enterprise software and product systems — from distributed backends and cloud platforms to AI-powered experiences.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#B9B9B4]">
              <span className="premium-chip">14+ years</span><span className="premium-chip">Mexico · Remote US/LATAM</span><span className="premium-chip">English B2</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/case-studies" className="btn-gold">View Case Studies <ArrowRight className="h-4 w-4"/></Link>
              <a href="/cv/JuanZambrano_ATS_Final.pdf" download className="btn-dark"><Download className="h-4 w-4"/> Download CV</a>
              <a href="https://www.linkedin.com/in/jagzao/" target="_blank" rel="noreferrer" className="btn-dark"><Linkedin className="h-4 w-4"/> LinkedIn</a>
            </div>
          </div>
          <div className="premium-panel p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div><p className="font-mono text-xs uppercase tracking-[.25em] text-[#D4AF37]">Architecture Lab</p><h2 className="mt-2 text-left text-xl font-bold text-white">Describe constraints → generate architecture</h2></div>
              <Link to="/architecture-lab" className="text-sm font-semibold text-[#F2C94C] hover:text-white">Try it →</Link>
            </div>
            <ArchitectureGraph nodes={teaserNodes} edges={teaserEdges}/>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-black/30 px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3">
          <span className="font-mono text-xs uppercase tracking-[.22em] text-[#D4AF37]">Trusted experience</span>
          {['EY','Chevron','Grupo Cosmic','Enterprise SaaS','Financial Systems'].map(item => <span key={item} className="text-base font-semibold text-white/80">{item}</span>)}
        </div>
      </section>

      <section className="section-shell">
        <p className="section-kicker">What I focus on</p><h2 className="section-title">Engineering with measurable impact</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {capabilityCards.map((card,index) => { const Icon = icons[index]; return <article key={card.title} className="premium-card"><Icon className="h-6 w-6 text-[#F2C94C]"/><h3 className="mt-5 text-left text-xl font-bold text-white">{card.title}</h3><p className="mt-3 text-sm leading-6 text-[#B9B9B4]">{card.description}</p></article> })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="flex items-end justify-between gap-4"><div><p className="section-kicker">Evidence</p><h2 className="section-title">Featured case studies</h2></div><Link to="/case-studies" className="hidden text-sm font-semibold text-[#F2C94C] sm:block">View all case studies →</Link></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {caseStudies.filter(c=>c.featured).slice(0,3).map(item => <Link key={item.slug} to={'/case-studies/'+item.slug} className="premium-card group"><p className="font-mono text-[11px] uppercase tracking-[.2em] text-[#D01920]">{item.group}</p><h3 className="mt-4 text-left text-2xl font-bold text-white group-hover:text-[#F2C94C]">{item.title}</h3><p className="mt-4 text-sm leading-6 text-[#B9B9B4]">{item.summary}</p><div className="mt-5 flex flex-wrap gap-2">{item.technologies.slice(0,4).map(t=><span key={t} className="tech-pill">{t}</span>)}</div></Link>)}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="premium-panel grid gap-8 p-8 lg:grid-cols-[1fr_1.1fr]">
          <div><p className="section-kicker">Technical depth</p><h2 className="text-left text-3xl font-bold text-white">Explore the Technical Arsenal</h2><p className="mt-4 max-w-xl text-[#B9B9B4]">Explore technologies as connected evidence: related stack, patterns and public projects.</p><Link to="/technical-arsenal" className="btn-gold mt-7 inline-flex">Open Technical Arsenal <ArrowRight className="h-4 w-4"/></Link></div>
          <div className="grid grid-cols-2 gap-3 text-sm">{['.NET / C#','Node.js / NestJS','React / TypeScript','Azure / SQL','RAG / Agents','Messaging / Redis'].map(x=><div key={x} className="rounded-2xl border border-[#D4AF37]/20 bg-black/50 p-4 text-white">{x}</div>)}</div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="flex items-end justify-between"><div><p className="section-kicker">Professional journey</p><h2 className="section-title">Selected experience</h2></div><Link to="/experience" className="text-sm font-semibold text-[#F2C94C]">Full experience →</Link></div>
        <div className="mt-8 divide-y divide-white/5 rounded-3xl border border-white/5 bg-black/30">
          {experience.slice(0,3).map(item => <div key={item.company} className="grid gap-2 p-6 md:grid-cols-[220px_1fr]"><div><h3 className="text-left text-lg font-bold text-white">{item.company}</h3><p className="text-sm text-[#D4AF37]">{item.role}</p></div><div><p className="text-sm text-[#7E7E78]">{item.period} · {item.mode}</p><p className="mt-2 text-[#B9B9B4]">{item.impact}</p></div></div>)}
        </div>
      </section>
    </div>
  )
}
