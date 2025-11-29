import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
  stack: string[]
}

interface CircuitTimelineProps {
  items: ExperienceItem[]
}

export function CircuitTimeline({ items }: CircuitTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Animate the central line
      gsap.fromTo(lineRef.current, 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center+=100',
            end: 'bottom center',
            scrub: 0.5,
          }
        }
      )

      // Animate items
      const items = containerRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item, index) => {
        const isLeft = index % 2 === 0
        
        gsap.fromTo(item,
          { 
            opacity: 0,
            x: isLeft ? -50 : 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-20 px-4">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2">
        <div 
          ref={lineRef}
          className="w-full bg-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
        />
      </div>

      <div className="space-y-12 md:space-y-24">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0
          return (
            <div 
              key={item.id}
              className={cn(
                "timeline-item relative flex flex-col md:flex-row gap-8",
                isLeft ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black border-2 border-amber-500 rounded-full -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />

              {/* Circuit Connector (Desktop only) */}
              <div 
                className={cn(
                  "hidden md:block absolute top-3.5 h-[2px] w-8 bg-amber-500",
                  isLeft ? "right-1/2 mr-2" : "left-1/2 ml-2"
                )}
              />

              {/* Content Spacer */}
              <div className="flex-1 hidden md:block" />

              {/* Content Card */}
              <div className="flex-1 pl-12 md:pl-0">
                <div className="bg-[#080808]/80 backdrop-blur-sm border-t border-amber-500/50 border-x border-b border-white/5 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight font-sans">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/30">
                      {item.period}
                    </span>
                  </div>
                  
                  <div className="text-amber-400 font-semibold mb-4">
                    {item.company}
                  </div>

                  <p className="text-gray-300 mb-6 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs font-mono text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/10 hover:border-amber-500 hover:text-amber-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
