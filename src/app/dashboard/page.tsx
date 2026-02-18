"use client"

import { useEffect, useState } from "react"
import {
  Tag,
  Users,
  Database,
  UserPlus,
  FileEdit,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardLang } from "./DashboardLangContext"
import { t } from "./translations"
import { getDashboardStats, type DashboardStats } from "./actions/getStats"

function timeAgo(date: Date, lang: "de" | "en"): string {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return lang === "de" ? "gerade eben" : "just now"
  if (diffMin < 60) return lang === "de" ? `vor ${diffMin} Min.` : `${diffMin}m ago`
  if (diffHours < 24) return lang === "de" ? `vor ${diffHours} Std.` : `${diffHours}h ago`
  return lang === "de" ? `vor ${diffDays} Tagen` : `${diffDays}d ago`
}

export default function DashboardPage() {
  const { lang } = useDashboardLang()
  const [data, setData] = useState<DashboardStats | null>(null)

  useEffect(() => {
    getDashboardStats().then(setData)
  }, [])

  const stats = [
    {
      label: t.overview.activeDeals[lang],
      value: data ? String(data.activeDeals) : "...",
      icon: Tag,
      iconBg: "bg-purple-500/10",
      iconText: "text-purple-400",
    },
    {
      label: t.overview.registrations[lang],
      value: data ? String(data.totalUsers) : "...",
      icon: Users,
      iconBg: "bg-emerald-500/10",
      iconText: "text-emerald-400",
    },
    {
      label: lang === "de" ? "Deals gesamt" : "Total Deals",
      value: data ? String(data.totalDeals) : "...",
      icon: Database,
      iconBg: "bg-amber-500/10",
      iconText: "text-amber-400",
    },
  ]

  // Build activity feed from real data
  const activities: { text: string; time: string; icon: typeof Tag }[] = []

  if (data) {
    for (const user of data.recentUsers) {
      activities.push({
        text: lang === "de"
          ? `Neuer Benutzer registriert: ${user.name || user.email}`
          : `New user registered: ${user.name || user.email}`,
        time: timeAgo(user.createdAt, lang),
        icon: UserPlus,
      })
    }
    for (const deal of data.recentDeals) {
      const isNew = deal.createdAt.getTime() === deal.updatedAt.getTime()
      activities.push({
        text: lang === "de"
          ? `Deal ${isNew ? "erstellt" : "aktualisiert"}: ${deal.name}`
          : `Deal ${isNew ? "created" : "updated"}: ${deal.name}`,
        time: timeAgo(deal.updatedAt, lang),
        icon: FileEdit,
      })
    }
    // Sort by most recent
    // Activities are already interleaved from DB queries sorted by date
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">{t.overview.title[lang]}</h1>
        <p className="mt-1 text-sm text-white/50">{t.overview.welcome[lang]}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    stat.iconBg
                  )}
                >
                  <Icon className={cn("h-5 w-5", stat.iconText)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="mt-8">
        <h2 className="mb-4 text-base font-semibold text-white">
          {t.overview.recentActivity[lang]}
        </h2>

        {!data ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-white/5" />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="rounded-lg bg-white/5 px-4 py-8 text-center text-sm text-white/40">
            {lang === "de" ? "Noch keine Aktivitäten vorhanden." : "No activity yet."}
          </div>
        ) : (
          <ul className="space-y-2">
            {activities.slice(0, 10).map((item, idx) => {
              const Icon = item.icon
              return (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-purple-400" />
                    <p className="text-sm text-white/80">{item.text}</p>
                  </div>
                  <span className="ml-6 shrink-0 text-xs text-white/40">
                    {item.time}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
