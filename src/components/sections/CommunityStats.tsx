import { Users, Trophy, MessageSquare, Star } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"
import { communityStats } from "@/data/community"

const stats = [
  {
    key: "members" as const,
    label: "Members",
    icon: Users,
    value: communityStats.members,
  },
  {
    key: "wins" as const,
    label: "Wins",
    icon: Trophy,
    value: communityStats.wins,
  },
  {
    key: "comments" as const,
    label: "Comments",
    icon: MessageSquare,
    value: communityStats.comments,
  },
  {
    key: "totalPoints" as const,
    label: "Points",
    icon: Star,
    value: communityStats.totalPoints,
  },
]

function formatNumber(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n)
}

export default function CommunityStats() {
  return (
    <section className="relative py-20 sm:py-24">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Community
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              Our Community
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our growing community and share your wins, experiences and
            strategies with other players.
          </p>
        </AnimatedSection>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(({ key, label, icon: Icon, value }, index) => (
            <AnimatedSection key={key} delay={0.1 + index * 0.1}>
              <GlassCard hover className="p-6 sm:p-8 text-center group">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-4 transition-colors group-hover:bg-purple-500/20">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-purple-400 to-violet-300 bg-clip-text text-transparent mb-1">
                  {formatNumber(value)}
                </div>

                {/* Label */}
                <div className="text-sm text-gray-400 font-medium">{label}</div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
