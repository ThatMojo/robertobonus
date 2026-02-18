import Image from "next/image"
import { Star, Sparkles, Zap, Gift } from "lucide-react"
import { AVATAR_URL, STREAMER_NAME } from "@/lib/constants"
import ParticleBackground from "@/components/shared/ParticleBackground"
import AnimatedSection from "@/components/shared/AnimatedSection"

const features = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0f0a1f] via-[#1a1030] to-[#0d0815]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left side — Avatar */}
          <AnimatedSection className="flex-shrink-0" delay={0}>
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-3 bg-purple-500/20 rounded-full blur-xl" />
              <Image
                src={AVATAR_URL}
                alt={`${STREAMER_NAME} Avatar`}
                width={140}
                height={140}
                className="relative rounded-full ring-4 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] object-cover"
                priority
              />
              {/* Live badge */}
              <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-[#0f0a1f] shadow-lg">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>
          </AnimatedSection>

          {/* Right side — Content */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatedSection delay={0.1}>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">
                  Verified by {STREAMER_NAME}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
                  The Best Casino
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
                  Bonus Deals
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed lg:mx-0 mx-auto">
                {STREAMER_NAME} compares the best online casino bonuses for you.
                Exclusive deposit bonuses, free spins without wagering
                requirements and fair conditions. All deals personally tested
                and recommended.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              {/* Feature badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:border-purple-500/30"
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                    {label}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              {/* CTA button */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="#deals"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Gift className="w-5 h-5" />
                  Discover Bonus Deals
                </a>
                <span className="text-sm text-gray-500">
                  100% free &bull; No registration required
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats bar */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "50+", label: "Casino Deals" },
              { value: "24/7", label: "Live Streams" },
              { value: "100%", label: "Exclusive" },
              { value: "10k+", label: "Community" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl px-6 py-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0815] to-transparent pointer-events-none" />
    </section>
  )
}
