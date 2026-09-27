import { useMemo, useState } from 'react'
import { ArchitectureGraph } from '@/components/ArchitectureGraph'
import { defaultArchitectureRequirements, generateArchitecture, inferRequirementsFromText, type ArchitectureRequirements } from '@/lib/architectureLab'

const labels: Record<string,string> = { saas:'Multi-tenant SaaS', enterprise:'Enterprise app', integration:'Event-driven integration', financial:'High-audit financial', rag:'RAG application', media:'Local-first media intelligence' }

export function ArchitectureLab() {
  const [requirements,setRequirements] = useState<ArchitectureRequirements>(defaultArchitectureRequirements)
  const [problem,setProblem] = useState('A multi-tenant SaaS with enterprise authentication, async reminders, RAG-powered support and high availability.')
  const [selectedId,setSelectedId] = useState<string>()
  const result = useMemo(()=>generateArchitecture(requirements),[requirements])
  const selected = result.nodes.find(n=>n.id===selectedId)
  const set = <K extends keyof ArchitectureRequirements>(key:K,value:ArchitectureRequirements[K]) => setRequirements(prev=>({...prev,[key]:value}))
  const interpret = () => setRequirements(inferRequirementsFromText(problem, requirements))

  return <div className="section-shell pt-32">
    <p className="section-kicker">Architecture Lab · zero-LLM core</p>
    <h1 className="section-title">Describe your problem. Generate a professional architecture.</h1>
    <p className="mt-4 max-w-3xl text-[#B9B9B4]">Free text is interpreted with deterministic rules, then the same architecture engine builds the graph. No model call is required and no LLM decides the architecture.</p>

    <section className="premium-panel mt-8 p-6">
      <label htmlFor="problem" className="mb-2 block text-xs font-semibold uppercase tracking-[.16em] text-[#D4AF37]">Describe your problem</label>
      <textarea id="problem" rows={4} value={problem} onChange={e=>setProblem(e.target.value)} className="lab-input resize-y" placeholder="Example: Build a multi-tenant booking SaaS in Node.js with SSO, queues, PostgreSQL and RAG support."/>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={interpret} className="btn-gold">Generate from description</button>
        <span className="font-mono text-[11px] text-[#7E7E78]">deterministic parser · $0 · no external provider</span>
      </div>
    </section>

    <div className="mt-6 grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
      <aside className="premium-panel p-6">
        <h2 className="text-left text-xl font-bold text-white">Detected / guided constraints</h2>
        <p className="mt-2 text-xs leading-5 text-[#7E7E78]">Fine-tune any detected constraint and the graph updates immediately.</p>
        <div className="mt-6 grid gap-5">
          <Field label="Use case"><select value={requirements.useCase} onChange={e=>set('useCase',e.target.value as ArchitectureRequirements['useCase'])} className="lab-input">{Object.entries(labels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></Field>
          <Field label="Backend preference"><select value={requirements.backendPreference} onChange={e=>set('backendPreference',e.target.value as ArchitectureRequirements['backendPreference'])} className="lab-input"><option value="dotnet">.NET / C#</option><option value="node">Node.js / NestJS</option><option value="hybrid">Hybrid by workload</option><option value="agnostic">Agnostic</option></select></Field>
          <div className="grid grid-cols-2 gap-4"><Field label="Scale"><select value={requirements.scale} onChange={e=>set('scale',e.target.value as ArchitectureRequirements['scale'])} className="lab-input"><option>small</option><option>medium</option><option>high</option></select></Field><Field label="Tenancy"><select value={requirements.tenancy} onChange={e=>set('tenancy',e.target.value as ArchitectureRequirements['tenancy'])} className="lab-input"><option value="single">single</option><option value="multi">multi</option></select></Field></div>
          <div className="grid grid-cols-2 gap-4"><Field label="Auth"><select value={requirements.auth} onChange={e=>set('auth',e.target.value as ArchitectureRequirements['auth'])} className="lab-input"><option value="basic">basic</option><option value="enterprise">enterprise</option></select></Field><Field label="Audit"><select value={requirements.auditLevel} onChange={e=>set('auditLevel',e.target.value as ArchitectureRequirements['auditLevel'])} className="lab-input"><option>low</option><option>medium</option><option>high</option></select></Field></div>
          <div className="grid grid-cols-2 gap-4"><Field label="AI"><select value={requirements.ai} onChange={e=>set('ai',e.target.value as ArchitectureRequirements['ai'])} className="lab-input"><option>none</option><option>rag</option><option>agent</option><option>multimodal</option></select></Field><Field label="Deployment"><select value={requirements.deployment} onChange={e=>set('deployment',e.target.value as ArchitectureRequirements['deployment'])} className="lab-input"><option value="cloud">cloud</option><option value="hybrid">hybrid</option><option value="localFirst">local-first</option></select></Field></div>
          <div className="grid grid-cols-2 gap-3"><Toggle label="Async processing" value={requirements.asyncProcessing} onChange={v=>set('asyncProcessing',v)}/><Toggle label="Real-time" value={requirements.realtime} onChange={v=>set('realtime',v)}/><Toggle label="High availability" value={requirements.availability==='high'} onChange={v=>set('availability',v?'high':'standard')}/></div>
        </div>
        <div className="mt-6 rounded-xl border border-[#D4AF37]/20 bg-black/40 p-4 font-mono text-xs text-[#B9B9B4]"><div>catalog: {result.metadata.catalogVersion}</div><div>rules: {result.metadata.rulesVersion}</div><div className="mt-1 text-[#F2C94C]">hash: {result.metadata.deterministicHash}</div></div>
      </aside>

      <div>
        <ArchitectureGraph nodes={result.nodes} edges={result.edges} selectedId={selectedId} onSelect={setSelectedId}/>
        {selected&&<div className="mt-4 rounded-2xl border border-[#D4AF37]/25 bg-[#0B0B0D] p-5"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#D01920]">Why this exists</p><h3 className="mt-2 text-left text-xl font-bold text-white">{selected.label}</h3><p className="mt-2 text-[#B9B9B4]">{selected.reason}</p>{selected.tech&&<p className="mt-3 text-sm text-[#D4AF37]">{selected.tech}</p>}</div>}
      </div>
    </div>

    <div className="mt-8 grid gap-5 lg:grid-cols-3"><Info title="Why this architecture" items={result.decisions.length?result.decisions:['Core services stay explicit and minimal.']}/><Info title="Trade-offs" items={result.tradeoffs.length?result.tradeoffs:['Current constraints do not require additional complexity.']}/><Info title="Risks" items={result.risks.length?result.risks:['Validate operational assumptions before production scale.']}/></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2"><TextCard title="Simpler alternative" text={result.simplerAlternative}/><TextCard title="Enterprise alternative" text={result.enterpriseAlternative}/></div>
  </div>
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label><span className="mb-2 block text-xs font-semibold uppercase tracking-[.15em] text-[#D4AF37]">{label}</span>{children}</label>}
function Toggle({label,value,onChange}:{label:string;value:boolean;onChange:(v:boolean)=>void}){return <button type="button" onClick={()=>onChange(!value)} className={value?'toggle-active':'toggle'} aria-pressed={value}>{label}</button>}
function Info({title,items}:{title:string;items:string[]}){return <section className="premium-card"><h2 className="text-left text-xl font-bold text-white">{title}</h2><ul className="mt-4 space-y-3">{items.map(x=><li key={x} className="text-sm leading-6 text-[#B9B9B4]">• {x}</li>)}</ul></section>}
function TextCard({title,text}:{title:string;text:string}){return <section className="premium-card"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#D01920]">{title}</p><p className="mt-4 leading-7 text-[#B9B9B4]">{text}</p></section>}
