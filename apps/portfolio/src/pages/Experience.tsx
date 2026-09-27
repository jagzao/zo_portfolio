import { experience } from '@/data/portfolio'

export function Experience() {
  return <div className="section-shell pt-32">
    <p className="section-kicker">Professional journey</p><h1 className="section-title">Experience recruiters can scan quickly</h1><p className="mt-4 max-w-2xl text-[#B9B9B4]">Roles, scope and evidence first. Key information is visible without click-only novelty.</p>
    <div className="mt-12 overflow-hidden rounded-3xl border border-white/5 bg-black/30">{experience.map((item,index)=><article key={item.company} className="grid gap-5 border-b border-white/5 p-6 last:border-0 md:grid-cols-[230px_1fr] md:p-8"><div><div className="flex items-center gap-3"><span className="font-mono text-xs text-[#D4AF37]">{String(index+1).padStart(2,'0')}</span><h2 className="text-left text-xl font-bold text-white">{item.company}</h2></div><p className="mt-2 text-sm text-[#F2C94C]">{item.role}</p><p className="mt-2 text-xs text-[#7E7E78]">{item.period}<br/>{item.mode}</p></div><div><p className="leading-7 text-[#B9B9B4]">{item.impact}</p><div className="mt-5 flex flex-wrap gap-2">{item.technologies.map(t=><span key={t} className="tech-pill">{t}</span>)}</div></div></article>)}</div>
  </div>
}
