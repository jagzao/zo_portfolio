import type { ArchitectureEdge, ArchitectureNode } from '@/lib/architectureLab'

const layerOrder: ArchitectureNode['layer'][] = ['Client','Edge','Services','Async','Data','AI','Observability']

type Props = {
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
  selectedId?: string
  onSelect?: (id: string) => void
}

export function ArchitectureGraph({ nodes, edges, selectedId, onSelect }: Props) {
  const groups = layerOrder
    .map(layer => ({ layer, items: nodes.filter(node => node.layer === layer) }))
    .filter(group => group.items.length > 0)

  const positions = new Map<string, { x:number; y:number }>()
  groups.forEach((group, col) => {
    group.items.forEach((node, row) => {
      positions.set(node.id, { x: 70 + col * 180, y: 100 + row * 120 })
    })
  })

  const width = Math.max(760, 180 * Math.max(groups.length, 4))
  const height = Math.max(420, 160 + Math.max(...groups.map(g => g.items.length), 1) * 120)

  return (
    <div className="overflow-auto rounded-3xl border border-[#D4AF37]/30 bg-black/70 shadow-[0_0_35px_rgba(212,175,55,.08)]">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] w-full" role="img" aria-label="Generated software architecture diagram">
        <defs>
          <linearGradient id="goldEdge" x1="0" x2="1"><stop stopColor="#8f681f"/><stop offset="1" stopColor="#f2c94c"/></linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <marker id="arrowSync" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#D4AF37"/></marker>
          <marker id="arrowAsync" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#D01920"/></marker>
        </defs>

        {groups.map((group, col) => (
          <g key={group.layer}>
            <text x={70 + col * 180} y={42} fill="#D4AF37" fontSize="12" fontFamily="Fira Code, monospace">{group.layer.toUpperCase()}</text>
            <line x1={70 + col*180} x2={70 + col*180 + 130} y1={52} y2={52} stroke="#D4AF37" strokeOpacity=".24"/>
          </g>
        ))}

        {edges.map((edge, index) => {
          const a = positions.get(edge.from)
          const b = positions.get(edge.to)
          if (!a || !b) return null
          const color = edge.kind === 'async' ? '#D01920' : edge.kind === 'observe' ? '#7E7E78' : '#D4AF37'
          const dash = edge.kind === 'async' || edge.kind === 'observe' ? '7 6' : undefined
          return (
            <path
              key={`${edge.from}-${edge.to}-${index}`}
              d={`M ${a.x+130} ${a.y+35} C ${a.x+155} ${a.y+35}, ${b.x-25} ${b.y+35}, ${b.x} ${b.y+35}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeDasharray={dash}
              strokeOpacity=".72"
              markerEnd={edge.kind === 'async' ? 'url(#arrowAsync)' : 'url(#arrowSync)'}
            />
          )
        })}

        {nodes.map(node => {
          const p = positions.get(node.id)!
          const selected = selectedId === node.id
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect?.(node.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect?.(node.id) }}
              className="cursor-pointer outline-none"
            >
              <rect
                x={p.x} y={p.y} width="130" height="70" rx="14"
                fill={selected ? '#171108' : '#0B0B0D'}
                stroke={selected ? '#F2C94C' : '#4d3d18'}
                strokeWidth={selected ? 2.5 : 1.2}
                filter={selected ? 'url(#softGlow)' : undefined}
              />
              <circle cx={p.x+16} cy={p.y+17} r="5" fill={node.layer === 'AI' ? '#D01920' : '#D4AF37'} />
              <text x={p.x+28} y={p.y+21} fill="#F7F7F5" fontSize="11" fontWeight="700">{node.label.slice(0,22)}</text>
              <text x={p.x+14} y={p.y+44} fill="#B9B9B4" fontSize="9.5">{node.tech?.slice(0,28) || node.layer}</text>
              <text x={p.x+14} y={p.y+59} fill="#7E7E78" fontSize="8.5">why? click node</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
