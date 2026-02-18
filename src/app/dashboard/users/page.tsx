"use client"

import { useState, useMemo } from "react"
import {
  Users,
  Search,
  Trophy,
  GitBranch,
  TrendingUp,
  ChevronDown,
  Edit2,
  ShieldCheck,
} from "lucide-react"
import { useDashboardLang } from "../DashboardLangContext"
import { t } from "../translations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Role = "ADMIN" | "USER"

interface User {
  id: string
  name: string
  email: string
  role: Role
  points: number
  referralCode: string
  referrals: number
  joinedAt: string
}

// ─────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────

const mockUsers: User[] = [
  {
    id: "1",
    name: "Roberto",
    email: "roberto@example.com",
    role: "ADMIN",
    points: 5200,
    referralCode: "ROBERTO2024",
    referrals: 24,
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "MaxMustermann",
    email: "max@example.com",
    role: "USER",
    points: 1850,
    referralCode: "MAX123",
    referrals: 8,
    joinedAt: "2024-03-22",
  },
  {
    id: "3",
    name: "LauraGaming",
    email: "laura@example.com",
    role: "USER",
    points: 3100,
    referralCode: "LAURA99",
    referrals: 15,
    joinedAt: "2024-02-10",
  },
  {
    id: "4",
    name: "CasinoKing",
    email: "king@example.com",
    role: "USER",
    points: 920,
    referralCode: "KING777",
    referrals: 3,
    joinedAt: "2024-05-01",
  },
  {
    id: "5",
    name: "BonusHunter",
    email: "hunter@example.com",
    role: "USER",
    points: 2400,
    referralCode: "HUNT100",
    referrals: 11,
    joinedAt: "2024-04-18",
  },
  {
    id: "6",
    name: "SpinMaster",
    email: "spin@example.com",
    role: "USER",
    points: 680,
    referralCode: "SPIN88",
    referrals: 2,
    joinedAt: "2024-06-05",
  },
  {
    id: "7",
    name: "LuckyDice",
    email: "lucky@example.com",
    role: "USER",
    points: 1200,
    referralCode: "LUCKY7",
    referrals: 6,
    joinedAt: "2024-03-30",
  },
  {
    id: "8",
    name: "SlotFan",
    email: "slots@example.com",
    role: "USER",
    points: 450,
    referralCode: "SLOTS22",
    referrals: 1,
    joinedAt: "2024-07-12",
  },
]

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatPoints(n: number): string {
  return n.toLocaleString("de-DE")
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function RoleBadge({ role }: { role: Role }) {
  if (role === "ADMIN") {
    return (
      <Badge className="border-0 bg-purple-500/15 text-purple-400 hover:bg-purple-500/20">
        <ShieldCheck className="mr-1 h-3 w-3" />
        Admin
      </Badge>
    )
  }
  return (
    <Badge className="border-0 bg-white/10 text-white/60 hover:bg-white/15">
      User
    </Badge>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center gap-2 text-white/50">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-sm text-white/40">{sub}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

export default function UsersPage() {
  const { lang } = useDashboardLang()
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return mockUsers
    return mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }, [search])

  const sortedByReferrals = useMemo(
    () => [...mockUsers].sort((a, b) => b.referrals - a.referrals),
    []
  )

  const totalReferrals = mockUsers.reduce((acc, u) => acc + u.referrals, 0)
  const topReferrer = sortedByReferrals[0]
  const avgReferrals = (totalReferrals / mockUsers.length).toFixed(2)

  return (
    <div className="min-h-full p-6 lg:p-8">
      {/* ── Page header ─────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {t.users.title[lang]}
            </h1>
            <p className="text-sm text-white/40">
              {mockUsers.length} {t.users.totalUsers[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────── */}
      <Tabs defaultValue="users">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="h-9 w-fit border border-white/10 bg-white/[0.03] p-1">
            <TabsTrigger
              value="users"
              className="h-7 px-4 text-sm text-white/50 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-400 data-[state=active]:shadow-none"
            >
              {t.users.allUsers[lang]}
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="h-7 px-4 text-sm text-white/50 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-400 data-[state=active]:shadow-none"
            >
              {t.users.referrals[lang]}
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder={t.users.searchPlaceholder[lang]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 border-white/10 bg-white/[0.03] pl-9 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-0"
            />
          </div>
        </div>

        {/* ── USERS TAB ───────────────────────────── */}
        <TabsContent value="users">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.user[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.role[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.points[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.referralCode[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.referrals[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.joinedAt[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.roleAction[lang]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-white/30"
                    >
                      {t.users.noUsersFound[lang]}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-white/10 transition-colors hover:bg-white/5"
                    >
                      {/* Benutzer */}
                      <TableCell className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </TableCell>

                      {/* Rolle */}
                      <TableCell className="px-4 py-3">
                        <RoleBadge role={user.role} />
                      </TableCell>

                      {/* Punkte */}
                      <TableCell className="px-4 py-3 text-right text-sm font-medium text-white">
                        {formatPoints(user.points)}
                      </TableCell>

                      {/* Referral Code */}
                      <TableCell className="px-4 py-3">
                        <span className="font-mono text-sm text-purple-400">
                          {user.referralCode}
                        </span>
                      </TableCell>

                      {/* Referrals */}
                      <TableCell className="px-4 py-3 text-right text-sm text-white/70">
                        {user.referrals}
                      </TableCell>

                      {/* Beigetreten */}
                      <TableCell className="px-4 py-3 text-sm text-white/50">
                        {formatDate(user.joinedAt)}
                      </TableCell>

                      {/* Aktionen */}
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className="h-7 gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 text-xs text-white/60 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {t.users.roleAction[lang]}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 text-xs text-white/60 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                          >
                            <Edit2 className="h-3 w-3" />
                            {t.users.pointsAction[lang]}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filtered.length > 0 && (
            <p className="mt-3 text-right text-xs text-white/30">
              {filtered.length} {t.users.countOf[lang]} {mockUsers.length} {t.users.usersLabel[lang]}
            </p>
          )}
        </TabsContent>

        {/* ── REFERRALS TAB ───────────────────────── */}
        <TabsContent value="referrals">
          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={GitBranch}
              label={t.users.totalReferrals[lang]}
              value={totalReferrals}
              sub={t.users.acrossAllUsers[lang]}
            />
            <StatCard
              icon={Trophy}
              label={t.users.topReferrers[lang]}
              value={topReferrer.name}
              sub={`${topReferrer.referrals} ${t.users.referrals[lang]}`}
            />
            <StatCard
              icon={TrendingUp}
              label={t.users.average[lang]}
              value={avgReferrals}
              sub={t.users.perUser[lang]}
            />
          </div>

          {/* Referral ranking table */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-5 py-3">
              <h2 className="text-sm font-medium text-white/70">
                {t.users.rankingByReferrals[lang]}
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-16 px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.rank[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.user[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.referralCode[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.referralCount[lang]}
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.users.points[lang]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedByReferrals.map((user, index) => {
                  const rank = index + 1
                  const isTopThree = rank <= 3

                  return (
                    <TableRow
                      key={user.id}
                      className="relative border-white/10 transition-colors hover:bg-white/5"
                      style={
                        isTopThree
                          ? {
                              boxShadow: "inset 3px 0 0 0 rgba(168,85,247,0.5)",
                            }
                          : undefined
                      }
                    >
                      {/* Rang */}
                      <TableCell className="px-4 py-3">
                        <span
                          className={
                            rank === 1
                              ? "text-sm font-bold text-purple-400"
                              : rank === 2
                                ? "text-sm font-semibold text-white/70"
                                : rank === 3
                                  ? "text-sm font-semibold text-white/50"
                                  : "text-sm text-white/30"
                          }
                        >
                          {rank === 1
                            ? "1."
                            : rank === 2
                              ? "2."
                              : rank === 3
                                ? "3."
                                : `${rank}.`}
                        </span>
                      </TableCell>

                      {/* Benutzer */}
                      <TableCell className="px-4 py-3">
                        <div>
                          <p
                            className={
                              isTopThree
                                ? "text-sm font-medium text-white"
                                : "text-sm text-white/80"
                            }
                          >
                            {user.name}
                          </p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </TableCell>

                      {/* Referral Code */}
                      <TableCell className="px-4 py-3">
                        <span className="font-mono text-sm text-purple-400">
                          {user.referralCode}
                        </span>
                      </TableCell>

                      {/* Anzahl Referrals */}
                      <TableCell className="px-4 py-3 text-right">
                        <span
                          className={
                            isTopThree
                              ? "text-sm font-semibold text-white"
                              : "text-sm text-white/60"
                          }
                        >
                          {user.referrals}
                        </span>
                      </TableCell>

                      {/* Punkte */}
                      <TableCell className="px-4 py-3 text-right text-sm text-white/50">
                        {formatPoints(user.points)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
