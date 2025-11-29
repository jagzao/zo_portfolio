import { AnimatedLogo } from '@/components/AnimatedLogo'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24">
          <AnimatedLogo size={96} />
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
        </div>
      </div>
    </div>
  )
}
