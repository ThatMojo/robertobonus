import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function GlassCard({ children, className, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md",
        hover && "transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_22px_rgba(168,85,247,0.2)]",
        glow && "shadow-[0_0_22px_rgba(168,85,247,0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}
