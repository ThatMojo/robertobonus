"use client"

import { useEffect, useState } from "react"
import { Trophy, Crown, Medal, Star, TrendingUp, Users } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getLeaderboard, type LeaderboardUser } from "./actions"

function formatNumber(n: number) {
  return n.toLocaleString("de-DE")
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase()
}

function SkeletonPodiumCard({ isCenter }: { isCenter?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center ${
        isCenter ? "order-2 md:-mt-6" : "order-1 md:mt-4"
      }`}
    >
      <GlassCard className="relative p-6 sm:p-8 text-center w-full animate-pulse">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="h-6 w-8 rounded-full bg-white/10" />
        </div>
        <div
          className={`mx-auto rounded-full bg-white/10 ${
            isCenter ? "w-20 h-20 mb-6" : "w-16 h-16 mb-4"
          }`}
        />
        <div className="h-4 w-24 mx-auto bg-white/10 rounded mb-3" />
        <div className="h-4 w-16 mx-auto bg-white/10 rounded mb-2" />
        <div className="h-3 w-12 mx-auto bg-white/10 rounded" />
      </GlassCard>
    </div>
  )
}

function PodiumCard({
  user,
  position,
}: {
  user: LeaderboardUser
  position: "left" | "center" | "right"
}) {
  const isFirst = position === "center"
  const rankLabel = user.rank === 1 ? "1." : user.rank === 2 ? "2." : "3."

  const rankColors = {
    1: "from-purple-400 to-violet-300",
    2: "from-gray-300 to-gray-400",
    3: "from-amber-600 to-amber-500",
  } as const

  const avatarBg = {
    1: "bg-gradient-to-br from-purple-500 to-violet-400",
    2: "bg-gradient-to-br from-gray-400 to-gray-500",
    3: "bg-gradient-to-br from-amber-600 to-amber-500",
  } as const

  const rank = user.rank as 1 | 2 | 3

  return (
    <div
      className={`flex flex-col items-center ${
        isFirst
          ? "order-2 md:-mt-6"
          : position === "left"
          ? "order-1 md:mt-4"
          : "order-3 md:mt-4"
      }`}
    >
      <GlassCard
        className={`relative p-6 sm:p-8 text-center w-full ${
          isFirst ? "border-purple-500/30" : ""
        }`}
        glow={isFirst}
        hover
      >
        {/* Rank badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            className={`bg-gradient-to-r ${rankColors[rank]} text-black font-bold text-sm px-3 py-1`}
          >
            {rankLabel}
          </Badge>
        </div>

        {/* Crown for rank 1 */}
        {isFirst && (
          <div className="flex justify-center mb-2">
            <Crown className="w-7 h-7 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          </div>
        )}

        {/* Avatar */}
        <div
          className={`mx-auto flex items-center justify-center rounded-full font-bold text-white ${
            avatarBg[rank]
          } ${isFirst ? "w-20 h-20 text-2xl" : "w-16 h-16 text-xl"} ${
            isFirst ? "shadow-[0_0_24px_rgba(168,85,247,0.4)]" : ""
          }`}
        >
          {getInitial(user.name)}
        </div>

        {/* Name */}
        <h3
          className={`mt-4 font-bold text-white ${
            isFirst ? "text-lg sm:text-xl" : "text-base sm:text-lg"
          }`}
        >
          {user.name}
        </h3>

        {/* Points */}
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Star className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-semibold text-lg">
            {formatNumber(user.points)}
          </span>
          <span className="text-gray-500 text-sm">Points</span>
        </div>

        {/* Referrals */}
        <div className="mt-1 flex items-center justify-center gap-1.5">
          <Users className="w-4 h-4 text-purple-400/60" />
          <span className="text-gray-400 text-sm">
            {user.referralCount} Referrals
          </span>
        </div>
      </GlassCard>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
        <Trophy className="w-8 h-8 text-purple-400/50" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No rankings yet</h3>
      <p className="text-gray-400 max-w-sm">
        No rankings yet. Be the first to earn points!
      </p>
    </div>
  )
}

export default function LeaderboardContent() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard()
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  const top3 = users.slice(0, 3)
  // Podium order: 2nd (left), 1st (center), 3rd (right)
  const podiumOrder: [LeaderboardUser | undefined, LeaderboardUser | undefined, LeaderboardUser | undefined] = [
    top3[1],
    top3[0],
    top3[2],
  ]

  const hasData = users.length > 0

  return (
    <section className="relative py-20 sm:py-24">
      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Rankings
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The most active members of our community. Earn points, win
            challenges, and secure your spot on the podium.
          </p>
        </AnimatedSection>

        {loading ? (
          <>
            {/* Skeleton podium */}
            <AnimatedSection delay={0.15} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
                <SkeletonPodiumCard />
                <SkeletonPodiumCard isCenter />
                <SkeletonPodiumCard />
              </div>
            </AnimatedSection>

            {/* Skeleton table */}
            <AnimatedSection delay={0.3}>
              <GlassCard className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Full Rankings
                  </h2>
                </div>
                <div className="space-y-3 animate-pulse">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-12 rounded-lg bg-white/5" />
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </>
        ) : !hasData ? (
          <AnimatedSection delay={0.15}>
            <GlassCard className="p-8">
              <EmptyState />
            </GlassCard>
          </AnimatedSection>
        ) : (
          <>
            {/* Top 3 Podium */}
            <AnimatedSection delay={0.15} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
                {podiumOrder[0] && (
                  <PodiumCard user={podiumOrder[0]} position="left" />
                )}
                {podiumOrder[1] && (
                  <PodiumCard user={podiumOrder[1]} position="center" />
                )}
                {podiumOrder[2] && (
                  <PodiumCard user={podiumOrder[2]} position="right" />
                )}
              </div>
            </AnimatedSection>

            {/* Full leaderboard table */}
            <AnimatedSection delay={0.3}>
              <GlassCard className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Full Rankings
                  </h2>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-purple-300 font-semibold">
                        Rank
                      </TableHead>
                      <TableHead className="text-purple-300 font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="text-purple-300 font-semibold text-right">
                        Points
                      </TableHead>
                      <TableHead className="text-purple-300 font-semibold text-right">
                        Referrals
                      </TableHead>
                      <TableHead className="text-purple-300 font-semibold text-right hidden sm:table-cell">
                        Member Since
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
                      const isTop3 = user.rank <= 3
                      return (
                        <TableRow
                          key={user.id}
                          className={`border-white/5 transition-colors ${
                            isTop3
                              ? "bg-purple-500/5 hover:bg-purple-500/10"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {user.rank === 1 && (
                                <Crown className="w-4 h-4 text-purple-400" />
                              )}
                              {user.rank === 2 && (
                                <Medal className="w-4 h-4 text-gray-400" />
                              )}
                              {user.rank === 3 && (
                                <Medal className="w-4 h-4 text-amber-500" />
                              )}
                              <span
                                className={`font-bold ${
                                  isTop3 ? "text-purple-300" : "text-gray-400"
                                }`}
                              >
                                {user.rank}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                  user.rank === 1
                                    ? "bg-gradient-to-br from-purple-500 to-violet-400"
                                    : user.rank === 2
                                    ? "bg-gradient-to-br from-gray-400 to-gray-500"
                                    : user.rank === 3
                                    ? "bg-gradient-to-br from-amber-600 to-amber-500"
                                    : "bg-white/10"
                                }`}
                              >
                                {getInitial(user.name)}
                              </div>
                              <span
                                className={`font-medium ${
                                  isTop3 ? "text-white" : "text-gray-300"
                                }`}
                              >
                                {user.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`font-semibold ${
                                isTop3 ? "text-purple-300" : "text-gray-400"
                              }`}
                            >
                              {formatNumber(user.points)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-gray-400">
                              {user.referralCount}
                            </span>
                          </TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
                            <span className="text-gray-500 text-sm">
                              {formatDate(user.createdAt)}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </GlassCard>
            </AnimatedSection>
          </>
        )}

        {/* Bottom note */}
        <AnimatedSection delay={0.4}>
          <p className="mt-8 text-center text-sm text-gray-500">
            The leaderboard is updated regularly. Points are awarded through
            active participation in community events and challenges.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
