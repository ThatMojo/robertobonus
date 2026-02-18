"use client"

import { useState } from "react"
import {
  Trophy,
  Calendar,
  TrendingUp,
  TrendingDown,
  Tv,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  Crosshair,
  Layers,
} from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SlotEntry = {
  name: string
  bet: number
  result: number | null
}

type BonusHunt = {
  id: string
  title: string
  startAmount: number
  endAmount: number | null
  status: "completed" | "live" | "upcoming"
  streamDate: string
  twitchVod: string | null
  slots: SlotEntry[]
}

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleHunts: BonusHunt[] = [
  {
    id: "1",
    title: "Mega Bonushunt #47",
    startAmount: 5000,
    endAmount: 12450,
    status: "completed",
    streamDate: "2024-12-15",
    twitchVod: "https://www.twitch.tv/videos/example1",
    slots: [
      { name: "Eye of Horus", bet: 2.0, result: 1240 },
      { name: "Book of Ra Deluxe", bet: 1.5, result: 890 },
      { name: "Blazing Star", bet: 1.0, result: 2100 },
      { name: "El Torero", bet: 2.0, result: 450 },
      { name: "Sizzling Hot", bet: 0.5, result: 320 },
    ],
  },
  {
    id: "2",
    title: "Sunday Hunt #46",
    startAmount: 3000,
    endAmount: 8200,
    status: "completed",
    streamDate: "2024-12-08",
    twitchVod: null,
    slots: [
      { name: "Lucky Lady's Charm", bet: 1.0, result: 2300 },
      { name: "Starburst", bet: 0.5, result: 180 },
      { name: "Big Bass Bonanza", bet: 1.0, result: 560 },
    ],
  },
  {
    id: "3",
    title: "Freitag Hunt #48",
    startAmount: 4000,
    endAmount: null,
    status: "upcoming",
    streamDate: "2024-12-20",
    twitchVod: null,
    slots: [],
  },
  {
    id: "4",
    title: "Live Hunt #49",
    startAmount: 6000,
    endAmount: null,
    status: "live",
    streamDate: "2024-12-18",
    twitchVod: null,
    slots: [
      { name: "Gates of Olympus", bet: 2.0, result: null },
      { name: "Sweet Bonanza", bet: 1.0, result: 890 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(value: number) {
  return value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function getProfit(hunt: BonusHunt): number | null {
  if (hunt.endAmount == null) return null
  return hunt.endAmount - hunt.startAmount
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: BonusHunt["status"] }) {
  if (status === "live") {
    return (
      <Badge className="gap-1.5 border-green-500/30 bg-green-500/20 text-green-400">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-green-500" />
        </span>
        Live
      </Badge>
    )
  }

  if (status === "completed") {
    return (
      <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">
        Abgeschlossen
      </Badge>
    )
  }

  return (
    <Badge className="border-white/10 bg-white/5 text-gray-400">
      Geplant
    </Badge>
  )
}

function ProfitDisplay({ hunt }: { hunt: BonusHunt }) {
  const profit = getProfit(hunt)

  if (profit == null) {
    return <span className="text-sm text-gray-400">Lauft...</span>
  }

  const isPositive = profit >= 0

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold ${
        isPositive ? "text-green-400" : "text-red-400"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="size-4" />
      ) : (
        <TrendingDown className="size-4" />
      )}
      {isPositive ? "+" : ""}
      {formatCurrency(profit)}
    </span>
  )
}

function SlotTable({ slots }: { slots: SlotEntry[] }) {
  if (slots.length === 0) {
    return (
      <p className="px-4 pb-4 text-sm text-gray-500">
        Noch keine Slots vorhanden.
      </p>
    )
  }

  return (
    <div className="px-4 pb-4">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-purple-300">#</TableHead>
            <TableHead className="text-purple-300">Slot</TableHead>
            <TableHead className="text-right text-purple-300">Einsatz</TableHead>
            <TableHead className="text-right text-purple-300">Ergebnis</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot, idx) => (
            <TableRow key={idx} className="border-white/5 hover:bg-white/5">
              <TableCell className="text-gray-500">{idx + 1}</TableCell>
              <TableCell className="font-medium text-white/90">
                {slot.name}
              </TableCell>
              <TableCell className="text-right text-gray-400">
                {formatCurrency(slot.bet)}
              </TableCell>
              <TableCell className="text-right">
                {slot.result != null ? (
                  <span
                    className={
                      slot.result >= slot.bet * 100
                        ? "font-semibold text-green-400"
                        : "text-white/80"
                    }
                  >
                    {formatCurrency(slot.result)}
                  </span>
                ) : (
                  <span className="text-gray-500">...</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function HuntCard({ hunt }: { hunt: BonusHunt }) {
  const [expanded, setExpanded] = useState(false)
  const profit = getProfit(hunt)
  const slotCount = hunt.slots.length

  return (
    <GlassCard hover className="overflow-hidden">
      {/* Card header */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-white">{hunt.title}</h3>
            <StatusBadge status={hunt.status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(hunt.streamDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {slotCount} {slotCount === 1 ? "Slot" : "Slots"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Start</span>
            <span className="text-sm font-medium text-white/90">
              {formatCurrency(hunt.startAmount)}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Ende</span>
            <span className="text-sm font-medium text-white/90">
              {hunt.endAmount != null
                ? formatCurrency(hunt.endAmount)
                : "Lauft..."}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Profit</span>
            <ProfitDisplay hunt={hunt} />
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/5 px-5 py-3">
        {hunt.twitchVod && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-purple-400 hover:text-purple-300"
            asChild
          >
            <a href={hunt.twitchVod} target="_blank" rel="noopener noreferrer">
              <Tv className="size-4" />
              Twitch VOD
            </a>
          </Button>
        )}

        {slotCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto gap-1.5 text-gray-400 hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Slots verbergen" : "Slots anzeigen"}
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        )}
      </div>

      {/* Expandable slot table */}
      {expanded && (
        <div className="border-t border-white/5">
          <SlotTable slots={hunt.slots} />
        </div>
      )}
    </GlassCard>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Crosshair className="size-10 text-purple-500/40" />
      <p className="text-gray-400">
        Keine {label} Hunts vorhanden.
      </p>
    </GlassCard>
  )
}

// ---------------------------------------------------------------------------
// Stats summary
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <GlassCard className="flex items-center gap-4 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </GlassCard>
  )
}

function StatsRow({ hunts }: { hunts: BonusHunt[] }) {
  const completed = hunts.filter((h) => h.status === "completed")
  const totalProfit = completed.reduce((sum, h) => {
    const p = getProfit(h)
    return sum + (p ?? 0)
  }, 0)
  const totalSlots = hunts.reduce((sum, h) => sum + h.slots.length, 0)
  const liveCount = hunts.filter((h) => h.status === "live").length

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        icon={<Trophy className="size-5" />}
        label="Hunts gesamt"
        value={String(hunts.length)}
      />
      <StatCard
        icon={<TrendingUp className="size-5" />}
        label="Gesamt Profit"
        value={formatCurrency(totalProfit)}
      />
      <StatCard
        icon={<Layers className="size-5" />}
        label="Slots gespielt"
        value={String(totalSlots)}
      />
      <StatCard
        icon={liveCount > 0 ? <Zap className="size-5" /> : <Clock className="size-5" />}
        label="Gerade Live"
        value={liveCount > 0 ? `${liveCount} Hunt${liveCount > 1 ? "s" : ""}` : "Offline"}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BonushuntsContent() {
  const hunts = sampleHunts

  const liveHunts = hunts.filter((h) => h.status === "live")
  const completedHunts = hunts.filter((h) => h.status === "completed")
  const upcomingHunts = hunts.filter((h) => h.status === "upcoming")

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <AnimatedSection className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Bonus
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            hunts
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Alle Bonushunt Sessions auf einen Blick. Verfolge laufende Hunts,
          schau dir vergangene Ergebnisse an oder plane den nachsten Stream.
        </p>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.1} className="mb-8">
        <StatsRow hunts={hunts} />
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.2}>
        <Tabs defaultValue="alle">
          <TabsList className="mb-6 w-full justify-start gap-1 bg-black/20 backdrop-blur-md sm:w-auto">
            <TabsTrigger value="alle">Alle</TabsTrigger>
            <TabsTrigger value="live" className="gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              Live
            </TabsTrigger>
            <TabsTrigger value="completed">Abgeschlossen</TabsTrigger>
            <TabsTrigger value="upcoming">Geplant</TabsTrigger>
          </TabsList>

          <TabsContent value="alle">
            <div className="flex flex-col gap-4">
              {hunts.length > 0 ? (
                hunts.map((hunt) => <HuntCard key={hunt.id} hunt={hunt} />)
              ) : (
                <EmptyState label="" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="live">
            <div className="flex flex-col gap-4">
              {liveHunts.length > 0 ? (
                liveHunts.map((hunt) => (
                  <HuntCard key={hunt.id} hunt={hunt} />
                ))
              ) : (
                <EmptyState label="Live" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="flex flex-col gap-4">
              {completedHunts.length > 0 ? (
                completedHunts.map((hunt) => (
                  <HuntCard key={hunt.id} hunt={hunt} />
                ))
              ) : (
                <EmptyState label="abgeschlossenen" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="flex flex-col gap-4">
              {upcomingHunts.length > 0 ? (
                upcomingHunts.map((hunt) => (
                  <HuntCard key={hunt.id} hunt={hunt} />
                ))
              ) : (
                <EmptyState label="geplanten" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedSection>
    </section>
  )
}
