import { CheckCircle2, Sparkles, Gamepad2 } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"

const features = [
  "Original Merkur & Novoline slot machines",
  "Eye of Horus, Book of Ra, El Torero & more",
  "Licensed casinos with German providers",
  "Fair payout rates (RTP) as in arcades",
  "Available on desktop and mobile devices",
  "Exclusive bonuses for Merkur & Novoline casinos",
]

export default function MerkurInfoSection() {
  return (
    <section id="providers" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-violet-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side -- Text content */}
          <div>
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">
                  Merkur &amp; Novoline
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
                  Merkur &amp; Novoline
                </span>
                <br />
                <span className="text-white">Online Casinos</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                <p>
                  The popular Merkur and Novoline slot machines are back in the
                  online world. After a longer break, selected licensed online
                  casinos now offer the classics again that millions of players
                  know and love from arcades.
                </p>
                <p>
                  Whether Eye of Horus, El Torero and Blazing Star from Merkur
                  or Book of Ra, Sizzling Hot and Lucky Lady&apos;s Charm from
                  Novoline, the original titles are now playable conveniently
                  from home or on the go, with the same fair payout rates.
                </p>
                <p>
                  We have tested the best online casinos with Merkur and
                  Novoline slots for you and compiled the most attractive bonus
                  offers. This way you can quickly find a reputable casino with
                  your favourite games.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <a
                href="#deals"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-[1.02]"
              >
                View Merkur Casinos
              </a>
            </AnimatedSection>
          </div>

          {/* Right side -- Visual card */}
          <AnimatedSection delay={0.2}>
            <GlassCard className="p-8 sm:p-10" glow>
              {/* Decorative header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25">
                  <Gamepad2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Popular Slots
                  </h3>
                  <p className="text-sm text-gray-400">
                    Classics now online
                  </p>
                </div>
              </div>

              {/* Slot list */}
              <div className="space-y-3">
                {[
                  {
                    name: "Eye of Horus",
                    provider: "Merkur",
                    rtp: "96.31%",
                  },
                  {
                    name: "Book of Ra Deluxe",
                    provider: "Novoline",
                    rtp: "95.10%",
                  },
                  {
                    name: "El Torero",
                    provider: "Merkur",
                    rtp: "96.08%",
                  },
                  {
                    name: "Blazing Star",
                    provider: "Merkur",
                    rtp: "96.31%",
                  },
                  {
                    name: "Lucky Lady's Charm",
                    provider: "Novoline",
                    rtp: "95.13%",
                  },
                  {
                    name: "Sizzling Hot Deluxe",
                    provider: "Novoline",
                    rtp: "95.66%",
                  },
                ].map((slot) => (
                  <div
                    key={slot.name}
                    className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06] hover:border-purple-500/20"
                  >
                    <div>
                      <span className="text-white font-medium text-sm">
                        {slot.name}
                      </span>
                      <span className="ml-2 text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                        {slot.provider}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 font-mono">
                      {slot.rtp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <p className="mt-6 text-xs text-gray-500 text-center">
                RTP values are based on manufacturer specifications. Actual
                payouts may vary.
              </p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
