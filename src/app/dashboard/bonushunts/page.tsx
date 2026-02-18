"use client"

import { useState } from "react"
import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Save,
} from "lucide-react"
import { useDashboardLang } from "../DashboardLangContext"
import { t } from "../translations"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

const initialSessions: BonushuntSession[] = [
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

function StatusBadge({ status, lang }: { status: SessionStatus; lang: "de" | "en" }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        {t.bonushunts.live[lang]}
      </span>
    )
  }
  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-medium text-blue-400">
        {t.bonushunts.upcoming[lang]}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/60">
      {t.bonushunts.completed[lang]}
    </span>
  )
}

function ResultCell({ session }: { session: BonushuntSession }) {
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
        {isProfit ? "+" : ""}{pct.toFixed(1)}%
      </span>
    </div>
  )
}

export default function BonushuntsPage() {
  const { lang } = useDashboardLang()
  const [sessions, setSessions] = useState<BonushuntSession[]>(initialSessions)
  const [editSession, setEditSession] = useState<BonushuntSession | null>(null)
  const [deleteSession, setDeleteSession] = useState<BonushuntSession | null>(null)
  const [isNew, setIsNew] = useState(false)

  const completedSessions = sessions.filter((s) => s.status === "completed" && s.endAmount !== null)
  const liveSessions = sessions.filter((s) => s.status === "live").length
  const avgGain =
    completedSessions.length > 0
      ? completedSessions.reduce((acc, s) => acc + calcPercentage(s.startAmount, s.endAmount!), 0) / completedSessions.length
      : 0

  const stats = [
    { label: t.bonushunts.totalSessions[lang], value: sessions.length.toString(), iconBg: "bg-purple-500/10", iconText: "text-purple-400" },
    { label: t.bonushunts.liveSessions[lang], value: liveSessions.toString(), isLive: true, iconBg: "bg-emerald-500/10", iconText: "text-emerald-400" },
    { label: t.bonushunts.avgGain[lang], value: `+${avgGain.toFixed(1)}%`, iconBg: "bg-amber-500/10", iconText: "text-amber-400" },
  ]

  function openNew() {
    setIsNew(true)
    setEditSession({
      id: `new-${Date.now()}`,
      title: "",
      startAmount: 0,
      endAmount: null,
      status: "upcoming",
      slotsCount: 0,
      streamDate: new Date().toISOString().split("T")[0],
      twitchVod: null,
    })
  }

  function openEdit(session: BonushuntSession) {
    setIsNew(false)
    setEditSession({ ...session })
  }

  function saveSession() {
    if (!editSession || !editSession.title.trim()) return
    if (isNew) {
      setSessions((prev) => [...prev, editSession])
    } else {
      setSessions((prev) => prev.map((s) => (s.id === editSession.id ? editSession : s)))
    }
    setEditSession(null)
  }

  function confirmDelete() {
    if (!deleteSession) return
    setSessions((prev) => prev.filter((s) => s.id !== deleteSession.id))
    setDeleteSession(null)
  }

  function updateField<K extends keyof BonushuntSession>(key: K, value: BonushuntSession[K]) {
    if (!editSession) return
    setEditSession({ ...editSession, [key]: value })
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{t.bonushunts.title[lang]}</h1>
          <p className="mt-1 text-sm text-white/50">{t.bonushunts.subtitle[lang]}</p>
        </div>
        <Button
          onClick={openNew}
          className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-purple-400"
        >
          <Plus className="h-4 w-4" />
          {t.bonushunts.newSession[lang]}
        </Button>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-6">
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
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", stat.iconBg)}>
                <Flame className={cn("h-5 w-5", stat.iconText)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-base font-semibold text-white">{t.bonushunts.allSessions[lang]}</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/50">{t.bonushunts.sessionTitle[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.status[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.startAmount[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.result[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.slots[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.streamDate[lang]}</TableHead>
              <TableHead className="text-white/50">{t.bonushunts.twitchVod[lang]}</TableHead>
              <TableHead className="text-right text-white/50">{t.bonushunts.actions[lang]}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} className="border-white/10 transition-colors hover:bg-white/[0.03]">
                <TableCell className="font-medium text-white">{session.title}</TableCell>
                <TableCell><StatusBadge status={session.status} lang={lang} /></TableCell>
                <TableCell className="text-white/70">{formatCurrency(session.startAmount)}</TableCell>
                <TableCell><ResultCell session={session} /></TableCell>
                <TableCell className="text-white/70">
                  {session.slotsCount > 0 ? session.slotsCount : <span className="text-white/30">---</span>}
                </TableCell>
                <TableCell className="text-white/70">{formatDate(session.streamDate)}</TableCell>
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
                      onClick={() => openEdit(session)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => setDeleteSession(session)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit / New Dialog */}
      <Dialog open={!!editSession} onOpenChange={(open) => !open && setEditSession(null)}>
        <DialogContent className="border-white/10 bg-[#0d0815] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {isNew ? t.bonushunts.newSessionTitle[lang] : `${editSession?.title} ${t.bonushunts.edit[lang]}`}
            </DialogTitle>
          </DialogHeader>

          {editSession && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-white/60">{t.bonushunts.sessionTitle[lang]}</Label>
                <Input
                  value={editSession.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.startAmountLabel[lang]}</Label>
                <Input
                  type="number"
                  value={editSession.startAmount}
                  onChange={(e) => updateField("startAmount", parseFloat(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.endAmount[lang]}</Label>
                <Input
                  type="number"
                  value={editSession.endAmount ?? ""}
                  placeholder={t.bonushunts.stillOpen[lang]}
                  onChange={(e) => updateField("endAmount", e.target.value ? parseFloat(e.target.value) : null)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.status[lang]}</Label>
                <Select
                  value={editSession.status}
                  onValueChange={(v) => updateField("status", v as SessionStatus)}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1030] text-white">
                    <SelectItem value="upcoming">{t.bonushunts.upcoming[lang]}</SelectItem>
                    <SelectItem value="live">{t.bonushunts.live[lang]}</SelectItem>
                    <SelectItem value="completed">{t.bonushunts.completed[lang]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.slotsCount[lang]}</Label>
                <Input
                  type="number"
                  value={editSession.slotsCount}
                  onChange={(e) => updateField("slotsCount", parseInt(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.streamDate[lang]}</Label>
                <Input
                  type="date"
                  value={editSession.streamDate}
                  onChange={(e) => updateField("streamDate", e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/60">{t.bonushunts.twitchVodUrl[lang]}</Label>
                <Input
                  value={editSession.twitchVod ?? ""}
                  placeholder={t.bonushunts.noVod[lang]}
                  onChange={(e) => updateField("twitchVod", e.target.value || null)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="flex justify-end gap-3 sm:col-span-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditSession(null)}
                  className="text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <X className="mr-1.5 h-4 w-4" />
                  {t.bonushunts.cancel[lang]}
                </Button>
                <Button
                  onClick={saveSession}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400"
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  {t.bonushunts.save[lang]}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteSession} onOpenChange={(open) => !open && setDeleteSession(null)}>
        <DialogContent className="border-white/10 bg-[#0d0815] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">{t.bonushunts.deleteSession[lang]}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60">
            {t.bonushunts.confirmDelete[lang]}{" "}
            <strong className="text-white">{deleteSession?.title}</strong>
            {t.bonushunts.deleteWarning[lang]}
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteSession(null)}
              className="text-white/50 hover:bg-white/5 hover:text-white"
            >
              {t.bonushunts.cancel[lang]}
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-500">
              <Trash2 className="mr-1.5 h-4 w-4" />
              {t.bonushunts.delete[lang]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
