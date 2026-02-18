import { Megaphone } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"

export default function NewsBanner() {
  return (
    <AnimatedSection>
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-purple-600/20 border-y border-purple-500/20">
        {/* Subtle animated shimmer overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(168,85,247,0.06)_50%,transparent_100%)] animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {/* Icon with pulse ring */}
            <span className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
              <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Megaphone className="w-4 h-4 text-purple-400" />
              </span>
            </span>

            {/* Label + Text */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span className="inline-flex items-center bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-purple-500/30">
                New
              </span>
              <p className="text-sm sm:text-base text-gray-200 font-medium text-center sm:text-left">
                Merkur &amp; Novoline Slots now available at selected casinos
              </p>
            </div>

            {/* CTA link */}
            <a
              href="#deals"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex-shrink-0"
            >
              View Casinos
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
