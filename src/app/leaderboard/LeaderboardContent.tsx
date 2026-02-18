"use client"

import { Trophy, Crown, Medal, Star, TrendingUp } from "lucide-react"
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

const sampleUsers = [
  { rank: 1, name: "MaxBet_King", points: 4250, wins: 18, joined: "2024-06" },
  { rank: 2, name: "SlotHunter_DE", points: 3890, wins: 15, joined: "2024-07" },
  { rank: 3, name: "CasinoRoyal99", points: 3420, wins: 12, joined: "2024-05" },
  { rank: 4, name: "LuckyLady777", points: 2980, wins: 11, joined: "2024-08" },
  { rank: 5, name: "BonusJäger", points: 2650, wins: 9, joined: "2024-07" },
  { rank: 6, name: "MerkurFan_01", points: 2340, wins: 8, joined: "2024-09" },
  { rank: 7, name: "SpinMaster_X", points: 2100, wins: 7, joined: "2024-06" },
  { rank: 8, name: "NovoExpert", points: 1870, wins: 6, joined: "2024-10" },
  { rank: 9, name: "HighRoller_DE", points: 1540, wins: 5, joined: "2024-08" },
  { rank: 10, name: "FreiSpielKing", points: 1200, wins: 4, joined: "2024-11" },
]

function formatNumber(n: number) {
  return n.toLocaleString("de-DE")
}

function formatJoined(dateStr: string) {
  const [year, month] = dateStr.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" })
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase()
}

function PodiumCard({
  user,
  position,
}: {
  user: (typeof sampleUsers)[0]
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
        isFirst ? "order-2 md:-mt-6" : position === "left" ? "order-1 md:mt-4" : "order-3 md:mt-4"
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
          <span className="text-gray-500 text-sm">Punkte</span>
        </div>

        {/* Wins */}
        <div className="mt-1 flex items-center justify-center gap-1.5">
          <Trophy className="w-4 h-4 text-purple-400/60" />
          <span className="text-gray-400 text-sm">
            {user.wins} Wins
          </span>
        </div>
      </GlassCard>
    </div>
  )
}

export default function LeaderboardContent() {
  const top3 = sampleUsers.slice(0, 3)
  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]]

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
              Rangliste
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Die aktivsten Mitglieder unserer Community. Sammle Punkte, gewinne
            Challenges und sichere dir einen Platz auf dem Podium.
          </p>
        </AnimatedSection>

        {/* Top 3 Podium */}
        <AnimatedSection delay={0.15} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
            <PodiumCard user={podiumOrder[0]} position="left" />
            <PodiumCard user={podiumOrder[1]} position="center" />
            <PodiumCard user={podiumOrder[2]} position="right" />
          </div>
        </AnimatedSection>

        {/* Full leaderboard table */}
        <AnimatedSection delay={0.3}>
          <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Komplette Rangliste
              </h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-purple-300 font-semibold">
                    Rang
                  </TableHead>
                  <TableHead className="text-purple-300 font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-purple-300 font-semibold text-right">
                    Punkte
                  </TableHead>
                  <TableHead className="text-purple-300 font-semibold text-right">
                    Wins
                  </TableHead>
                  <TableHead className="text-purple-300 font-semibold text-right hidden sm:table-cell">
                    Dabei seit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleUsers.map((user) => {
                  const isTop3 = user.rank <= 3
                  return (
                    <TableRow
                      key={user.rank}
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
                        <span className="text-gray-400">{user.wins}</span>
                      </TableCell>
                      <TableCell className="text-right hidden sm:table-cell">
                        <span className="text-gray-500 text-sm">
                          {formatJoined(user.joined)}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </GlassCard>
        </AnimatedSection>

        {/* Bottom note */}
        <AnimatedSection delay={0.4}>
          <p className="mt-8 text-center text-sm text-gray-500">
            Die Rangliste wird regelm&auml;&szlig;ig aktualisiert. Punkte
            werden durch aktive Teilnahme an Community-Events und Challenges
            vergeben.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
