"use client"

import {
  Tag,
  Users,
  MousePointerClick,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardLang } from "./DashboardLangContext"
import { t } from "./translations"

const activities = [
  {
    id: 1,
    de: "Neuer Benutzer registriert: max_spieler92",
    en: "New user registered: max_spieler92",
    timestamp: { de: "vor 3 Minuten", en: "3 minutes ago" },
  },
  {
    id: 2,
    de: "Deal aktualisiert: Merkur Spiele — 100% bis 200€",
    en: "Deal updated: Merkur Spiele — 100% up to €200",
    timestamp: { de: "vor 18 Minuten", en: "18 minutes ago" },
  },
  {
    id: 3,
    de: "Bonushunt gestartet: Woche 47 — 15 Spiele, 500€ Budget",
    en: "Bonus hunt started: Week 47 — 15 slots, €500 budget",
    timestamp: { de: "vor 1 Stunde", en: "1 hour ago" },
  },
  {
    id: 4,
    de: "Klick auf Affiliate-Link: Betano (Nutzer: roberto_fan)",
    en: "Affiliate link click: Betano (user: roberto_fan)",
    timestamp: { de: "vor 2 Stunden", en: "2 hours ago" },
  },
  {
    id: 5,
    de: "Neuer Deal hinzugefügt: Tipico — Freispiele ohne Einzahlung",
    en: "New deal added: Tipico — Free spins no deposit",
    timestamp: { de: "vor 5 Stunden", en: "5 hours ago" },
  },
]

export default function DashboardPage() {
  const { lang } = useDashboardLang()

  const stats = [
    {
      label: t.overview.activeDeals[lang],
      value: "15",
      icon: Tag,
      iconBg: "bg-purple-500/10",
      iconText: "text-purple-400",
    },
    {
      label: t.overview.registrations[lang],
      value: "127",
      icon: Users,
      iconBg: "bg-emerald-500/10",
      iconText: "text-emerald-400",
    },
    {
      label: t.overview.totalClicks[lang],
      value: "2.847",
      icon: MousePointerClick,
      iconBg: "bg-amber-500/10",
      iconText: "text-amber-400",
    },
    {
      label: t.overview.topReferrer[lang],
      value: "Roberto",
      icon: Trophy,
      iconBg: "bg-blue-500/10",
      iconText: "text-blue-400",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">{t.overview.title[lang]}</h1>
        <p className="mt-1 text-sm text-white/50">{t.overview.welcome[lang]}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <ul className="space-y-2">
          {activities.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-4"
            >
              <p className="text-sm text-white/80">{item[lang]}</p>
              <span className="ml-6 shrink-0 text-xs text-white/40">
                {item.timestamp[lang]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
