"use client"

import {
  Tag,
  Users,
  MousePointerClick,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Aktive Deals",
    value: "15",
    icon: Tag,
    color: "purple",
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-400",
  },
  {
    label: "Registrierungen",
    value: "127",
    icon: Users,
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
  },
  {
    label: "Gesamte Klicks",
    value: "2.847",
    icon: MousePointerClick,
    color: "amber",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
  },
  {
    label: "Top Referrer",
    value: "Roberto",
    icon: Trophy,
    color: "blue",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
  },
]

const activities = [
  {
    id: 1,
    description: "Neuer Benutzer registriert: max_spieler92",
    timestamp: "vor 3 Minuten",
  },
  {
    id: 2,
    description: "Deal aktualisiert: Merkur Spiele — 100% bis 200€",
    timestamp: "vor 18 Minuten",
  },
  {
    id: 3,
    description: "Bonushunt gestartet: Woche 47 — 15 Spiele, 500€ Budget",
    timestamp: "vor 1 Stunde",
  },
  {
    id: 4,
    description: "Klick auf Affiliate-Link: Betano (Nutzer: roberto_fan)",
    timestamp: "vor 2 Stunden",
  },
  {
    id: 5,
    description: "Neuer Deal hinzugefügt: Tipico — Freispiele ohne Einzahlung",
    timestamp: "vor 5 Stunden",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">Willkommen im Admin-Bereich</p>
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
          Letzte Aktivitäten
        </h2>
        <ul className="space-y-2">
          {activities.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-4"
            >
              <p className="text-sm text-white/80">{item.description}</p>
              <span className="ml-6 shrink-0 text-xs text-white/40">
                {item.timestamp}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
