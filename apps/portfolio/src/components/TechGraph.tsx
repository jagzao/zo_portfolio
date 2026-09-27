import { technologyNodes } from '@/data/technologyGraph'

type Props = { selectedId?: string; onSelect: (id:string) => void }

export function TechGraph({ selectedId, onSelect }: Props) {
  const center = { x:450, y:280 }
  const primary = technologyNodes.filter(n=>n.core)
  const positions = new Map<string,{x:number;y:number}>()
  primary.forEach((node,i)=>{ const a=(Math.PI*2*i)/primary.length-Math.PI/2; positions.set(node.id,{x:center.x+Math.cos(a)*210,y:center.y+Math.sin(a)*170}) })
  const selected = technologyNodes.find(n=>n.id===selectedId)
  const related = new Set(selected ? [selected.id,...selected.related] : primary.map(n=>n.id))
  return <div className="overflow-auto rounded-3xl border border-[#D4AF37]/25 bg-black/70">
    <svg viewBox="0 0 900 560" className="min-w-[760px] w-full" role="img" aria-label="Interactive technology graph">
      <defs><filter id="tgGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx={center.x} cy={center.y} r="84" fill="#111114" stroke="#D4AF37" strokeWidth="2"/><text x={center.x} y={center.y-5} fill="#F7F7F5" textAnchor="middle" fontSize="18" fontWeight="700">Engineering</text><text x={center.x} y={center.y+22} fill="#D4AF37" textAnchor="middle" fontSize="14">Impact</text>
      {primary.map(node=>{const p=positions.get(node.id)!;const active=related.has(node.id);return <line key={'l'+node.id} x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke={active?'#D4AF37':'#353535'} strokeOpacity={active?0.8:0.25}/>})}
      {primary.map(node=>{const p=positions.get(node.id)!;const active=related.has(node.id);const chosen=selectedId===node.id;return <g key={node.id} role="button" tabIndex={0} onClick={()=>onSelect(node.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')onSelect(node.id)}} className="cursor-pointer"><rect x={p.x-72} y={p.y-32} width="144" height="64" rx="15" fill={chosen?'#181008':'#0B0B0D'} stroke={chosen?'#F2C94C':active?'#8f681f':'#2b2b2b'} filter={chosen?'url(#tgGlow)':undefined}/><text x={p.x} y={p.y-2} fill={active?'#F7F7F5':'#6f6f6f'} textAnchor="middle" fontSize="12" fontWeight="700">{node.label}</text><text x={p.x} y={p.y+16} fill={node.domain.includes('AI')?'#D01920':'#A9892F'} textAnchor="middle" fontSize="9">{node.domain.split(' ')[0]}</text></g>})}
    </svg>
  </div>
}
