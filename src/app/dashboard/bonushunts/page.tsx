"use client"

import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type SessionStatus = "completed" | "live" | "upcoming"

interface BonushuntSession {
  id: string
  title: string
  startAmount: number
  endAmount: number | null
  status: SessionStatus
  slotsCount: number
  streamDate: string
  twitchVod: string | null
}

const mockSessions: BonushuntSession[] = [
  {
    id: "1",
    title: "Freitag Abend Hunt",
    startAmount: 5000,
    endAmount: 7845,
    status: "completed",
    slotsCount: 45,
    streamDate: "2024-12-20",
    twitchVod: "https://twitch.tv/videos/123",
  },
  {
    id: "2",
    title: "Silvester Special",
    startAmount: 10000,
    endAmount: 13200,
    status: "completed",
    slotsCount: 60,
    streamDate: "2024-12-31",
    twitchVod: "https://twitch.tv/videos/456",
  },
  {
    id: "3",
    title: "Neujahrs Hunt",
    startAmount: 3000,
    endAmount: 2100,
    status: "completed",
    slotsCount: 30,
    streamDate: "2025-01-02",
    twitchVod: null,
  },
  {
    id: "4",
    title: "Merkur Marathon",
    startAmount: 8000,
    endAmount: 12400,
    status: "completed",
    slotsCount: 55,
    streamDate: "2025-01-10",
    twitchVod: "https://twitch.tv/videos/789",
  },
  {
    id: "5",
    title: "Community Hunt #5",
    startAmount: 4000,
    endAmount: null,
    status: "live",
    slotsCount: 38,
    streamDate: "2025-01-15",
    twitchVod: null,
  },
  {
    id: "6",
    title: "High Roller Session",
    startAmount: 15000,
    endAmount: null,
    status: "upcoming",
    slotsCount: 0,
    streamDate: "2025-01-20",
    twitchVod: null,
  },
  {
    id: "7",
    title: "Donnerstag Hunt",
    startAmount: 2500,
    endAmount: 3800,
    status: "completed",
    slotsCount: 25,
    streamDate: "2025-01-08",
    twitchVod: "https://twitch.tv/videos/101",
  },
  {
    id: "8",
    title: "Weekend Special",
    startAmount: 6000,
    endAmount: 4500,
    status: "completed",
    slotsCount: 42,
    streamDate: "2025-01-05",
    twitchVod: "https://twitch.tv/videos/102",
  },
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function calcPercentage(start: number, end: number): number {
  return ((end - start) / start) * 100
}

function StatusBadge({ status }: { status: SessionStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Live
      </span>
    )
  }

  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-medium text-blue-400">
        Bald
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/60">
      Abgeschlossen
    </span>
  )
}

function ResultCell({
  session,
}: {
  session: BonushuntSession
}) {
  if (session.status !== "completed" || session.endAmount === null) {
    return <span className="text-white/30">---</span>
  }

  const pct = calcPercentage(session.startAmount, session.endAmount)
  const isProfit = pct >= 0

  return (
    <div className="flex flex-col gap-0.5">
      <span className={cn("text-sm font-medium", isProfit ? "text-emerald-400" : "text-red-400")}>
        {formatCurrency(session.endAmount)}
      </span>
      <span className={cn("text-xs", isProfit ? "text-emerald-400/70" : "text-red-400/70")}>
        {isProfit ? "+" : ""}
        {pct.toFixed(1)}%
      </span>
    </div>
  )
}

const totalSessions = mockSessions.length
const liveSessions = mockSessions.filter((s) => s.status === "live").length
const completedSessions = mockSessions.filter(
  (s) => s.status === "completed" && s.endAmount !== null
)
const avgGain =
  completedSessions.length > 0
    ? completedSessions.reduce(
        (acc, s) => acc + calcPercentage(s.startAmount, s.endAmount!),
        0
      ) / completedSessions.length
    : 0

const stats = [
  {
    label: "Gesamt Sessions",
    value: totalSessions.toString(),
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-400",
  },
  {
    label: "Live Sessions",
    value: liveSessions.toString(),
    isLive: true,
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
  },
  {
    label: "Durchschnitt Gewinn",
    value: `+${avgGain.toFixed(1)}%`,
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
  },
]

export default function BonushuntsPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Bonushunts verwalten
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Alle Hunt-Sessions auf einen Blick
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-purple-400"
        >
          <Plus className="h-4 w-4" />
          Neue Session
        </Button>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">{stat.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  {stat.isLive && liveSessions > 0 && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  stat.iconBg
                )}
              >
                <Flame className={cn("h-5 w-5", stat.iconText)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-base font-semibold text-white">Alle Sessions</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/50">Titel</TableHead>
              <TableHead className="text-white/50">Status</TableHead>
              <TableHead className="text-white/50">Startbetrag</TableHead>
              <TableHead className="text-white/50">Ergebnis</TableHead>
              <TableHead className="text-white/50">Slots</TableHead>
              <TableHead className="text-white/50">Stream Datum</TableHead>
              <TableHead className="text-white/50">Twitch VOD</TableHead>
              <TableHead className="text-right text-white/50">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSessions.map((session) => (
              <TableRow
                key={session.id}
                className="border-white/10 transition-colors hover:bg-white/[0.03]"
              >
                <TableCell className="font-medium text-white">
                  {session.title}
                </TableCell>
                <TableCell>
                  <StatusBadge status={session.status} />
                </TableCell>
                <TableCell className="text-white/70">
                  {formatCurrency(session.startAmount)}
                </TableCell>
                <TableCell>
                  <ResultCell session={session} />
                </TableCell>
                <TableCell className="text-white/70">
                  {session.slotsCount > 0 ? session.slotsCount : (
                    <span className="text-white/30">---</span>
                  )}
                </TableCell>
                <TableCell className="text-white/70">
                  {formatDate(session.streamDate)}
                </TableCell>
                <TableCell>
                  {session.twitchVod ? (
                    <a
                      href={session.twitchVod}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-purple-400 transition-colors hover:text-purple-300"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="text-xs">VOD</span>
                    </a>
                  ) : (
                    <span className="text-white/30">---</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Bearbeiten</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Löschen</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
