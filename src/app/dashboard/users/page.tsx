"use client"

import { useEffect, useState, useMemo } from "react"
import {
  Users,
  Search,
  Trophy,
  GitBranch,
  TrendingUp,
  Edit2,
  ShieldCheck,
  ChevronDown,
  KeyRound,
  UserPlus,
} from "lucide-react"
import { useDashboardLang } from "../DashboardLangContext"
import { t } from "../translations"
import { getUsers, updateUserRole, updateUserPoints, resetUserPassword, createUser } from "../actions/users"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Role = "ADMIN" | "USER"

interface UserData {
  id: string
  name: string | null
  email: string
  role: Role
  points: number
  referralCode: string
  referredBy: string | null
  createdAt: Date
  _count: { referrals: number }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(date: Date, lang: "de" | "en"): string {
  return new Date(date).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
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
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // Points dialog
  const [pointsDialogOpen, setPointsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [pointsInput, setPointsInput] = useState("")
  const [saving, setSaving] = useState(false)

  // Password reset dialog
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [passwordUser, setPasswordUser] = useState<UserData | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Create user dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createName, setCreateName] = useState("")
  const [createEmail, setCreateEmail] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [createRole, setCreateRole] = useState<Role>("USER")
  const [createSaving, setCreateSaving] = useState(false)
  const [createError, setCreateError] = useState("")

  // Load users from DB
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data as UserData[])
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return users
    return users.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )
  }, [search, users])

  const sortedByReferrals = useMemo(
    () => [...users].sort((a, b) => b._count.referrals - a._count.referrals),
    [users]
  )

  const totalReferrals = users.reduce((acc, u) => acc + u._count.referrals, 0)
  const topReferrer = sortedByReferrals[0]
  const avgReferrals = users.length > 0
    ? (totalReferrals / users.length).toFixed(2)
    : "0"

  // ── Role change handler ──
  async function handleRoleChange(user: UserData, newRole: Role) {
    const result = await updateUserRole(user.id, newRole)
    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      )
    }
  }

  // ── Points dialog handlers ──
  function openPointsDialog(user: UserData) {
    setEditingUser(user)
    setPointsInput(String(user.points))
    setPointsDialogOpen(true)
  }

  async function savePoints() {
    if (!editingUser) return
    const parsed = parseInt(pointsInput)
    if (isNaN(parsed) || parsed < 0) return
    setSaving(true)
    const result = await updateUserPoints(editingUser.id, parsed)
    if (result.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, points: parsed } : u
        )
      )
      setPointsDialogOpen(false)
    }
    setSaving(false)
  }

  // ── Password reset handlers ──
  function openPasswordDialog(user: UserData) {
    setPasswordUser(user)
    setNewPassword("")
    setPasswordSuccess(false)
    setPasswordError("")
    setPasswordDialogOpen(true)
  }

  async function savePassword() {
    if (!passwordUser) return
    if (newPassword.length < 8) {
      setPasswordError(t.users.passwordMinLength[lang])
      return
    }
    setPasswordSaving(true)
    setPasswordError("")
    const result = await resetUserPassword(passwordUser.id, newPassword)
    if (result.success) {
      setPasswordSuccess(true)
      setTimeout(() => setPasswordDialogOpen(false), 1200)
    } else {
      setPasswordError(result.error || "Failed")
    }
    setPasswordSaving(false)
  }

  // ── Create user handlers ──
  async function handleCreateUser() {
    setCreateError("")
    if (!createEmail || !createPassword) {
      setCreateError("Email and password are required")
      return
    }
    if (createPassword.length < 8) {
      setCreateError(t.users.passwordMinLength[lang])
      return
    }
    setCreateSaving(true)
    const result = await createUser({
      name: createName,
      email: createEmail,
      password: createPassword,
      role: createRole,
    })
    if (result.success) {
      // Reload users
      const data = await getUsers()
      setUsers(data as UserData[])
      setCreateDialogOpen(false)
      setCreateName("")
      setCreateEmail("")
      setCreatePassword("")
      setCreateRole("USER")
    } else {
      setCreateError(result.error || "Failed")
    }
    setCreateSaving(false)
  }

  return (
    <div className="min-h-full p-6 lg:p-8">
      {/* ── Page header ─────────────────────────── */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {t.users.title[lang]}
            </h1>
            <p className="text-sm text-white/40">
              {loading ? "..." : users.length} {t.users.totalUsers[lang]}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setCreateError("")
            setCreateDialogOpen(true)
          }}
          className="gap-2 bg-purple-600 text-white hover:bg-purple-500"
        >
          <UserPlus className="h-4 w-4" />
          {t.users.createUser[lang]}
        </Button>
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
                    {lang === "de" ? "Aktionen" : "Actions"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <TableRow key={i} className="border-white/10">
                      <TableCell colSpan={7} className="px-4 py-4">
                        <div className="h-6 animate-pulse rounded bg-white/5" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
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
                      <TableCell className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name || "—"}
                          </p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3">
                        <RoleBadge role={user.role} />
                      </TableCell>

                      <TableCell className="px-4 py-3 text-right text-sm font-medium text-white">
                        {formatPoints(user.points)}
                      </TableCell>

                      <TableCell className="px-4 py-3">
                        <span className="font-mono text-sm text-purple-400">
                          {user.referralCode}
                        </span>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-right text-sm text-white/70">
                        {user._count.referrals}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-sm text-white/50">
                        {formatDate(user.createdAt, lang)}
                      </TableCell>

                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                className="h-7 gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 text-xs text-white/60 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                              >
                                <ShieldCheck className="h-3 w-3" />
                                {t.users.roleAction[lang]}
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="border-white/10 bg-[#1a1030]"
                            >
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user, "USER")}
                                className={`text-sm ${user.role === "USER" ? "text-purple-400" : "text-white/70"} hover:bg-white/10 focus:bg-white/10 focus:text-white`}
                              >
                                User
                                {user.role === "USER" && " ✓"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user, "ADMIN")}
                                className={`text-sm ${user.role === "ADMIN" ? "text-purple-400" : "text-white/70"} hover:bg-white/10 focus:bg-white/10 focus:text-white`}
                              >
                                Admin
                                {user.role === "ADMIN" && " ✓"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Points button */}
                          <Button
                            size="sm"
                            onClick={() => openPointsDialog(user)}
                            className="h-7 gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 text-xs text-white/60 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                          >
                            <Edit2 className="h-3 w-3" />
                            {t.users.pointsAction[lang]}
                          </Button>

                          {/* Password reset button */}
                          <Button
                            size="sm"
                            onClick={() => openPasswordDialog(user)}
                            className="h-7 gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 text-xs text-white/60 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                          >
                            <KeyRound className="h-3 w-3" />
                            {t.users.passwordReset[lang]}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!loading && filtered.length > 0 && (
            <p className="mt-3 text-right text-xs text-white/30">
              {filtered.length} {t.users.countOf[lang]} {users.length}{" "}
              {t.users.usersLabel[lang]}
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
              value={loading ? "..." : totalReferrals}
              sub={t.users.acrossAllUsers[lang]}
            />
            <StatCard
              icon={Trophy}
              label={t.users.topReferrers[lang]}
              value={loading ? "..." : topReferrer?.name || topReferrer?.email || "—"}
              sub={topReferrer ? `${topReferrer._count.referrals} ${t.users.referrals[lang]}` : ""}
            />
            <StatCard
              icon={TrendingUp}
              label={t.users.average[lang]}
              value={loading ? "..." : avgReferrals}
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
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <TableRow key={i} className="border-white/10">
                      <TableCell colSpan={5} className="px-4 py-4">
                        <div className="h-6 animate-pulse rounded bg-white/5" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  sortedByReferrals.map((user, index) => {
                    const rank = index + 1
                    const isTopThree = rank <= 3

                    return (
                      <TableRow
                        key={user.id}
                        className="relative border-white/10 transition-colors hover:bg-white/5"
                        style={
                          isTopThree
                            ? {
                                boxShadow:
                                  "inset 3px 0 0 0 rgba(168,85,247,0.5)",
                              }
                            : undefined
                        }
                      >
                        <TableCell className="px-4 py-3">
                          <span
                            className={
                              rank === 1
                                ? "text-sm font-bold text-purple-400"
                                : rank <= 3
                                  ? "text-sm font-semibold text-white/70"
                                  : "text-sm text-white/30"
                            }
                          >
                            {rank}.
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div>
                            <p
                              className={
                                isTopThree
                                  ? "text-sm font-medium text-white"
                                  : "text-sm text-white/80"
                              }
                            >
                              {user.name || "—"}
                            </p>
                            <p className="text-xs text-white/40">
                              {user.email}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <span className="font-mono text-sm text-purple-400">
                            {user.referralCode}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right">
                          <span
                            className={
                              isTopThree
                                ? "text-sm font-semibold text-white"
                                : "text-sm text-white/60"
                            }
                          >
                            {user._count.referrals}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right text-sm text-white/50">
                          {formatPoints(user.points)}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Points Dialog ─────────────────────────── */}
      <Dialog open={pointsDialogOpen} onOpenChange={setPointsDialogOpen}>
        <DialogContent className="border-white/10 bg-[#1a1030] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {t.users.pointsAction[lang]}
              {editingUser && (
                <span className="ml-2 text-sm font-normal text-white/50">
                  — {editingUser.name || editingUser.email}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-white/70">{t.users.points[lang]}</Label>
              <Input
                type="number"
                min={0}
                value={pointsInput}
                onChange={(e) => setPointsInput(e.target.value)}
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setPointsDialogOpen(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {t.deals.cancel[lang]}
            </Button>
            <Button
              onClick={savePoints}
              disabled={saving}
              className="bg-purple-600 text-white hover:bg-purple-500"
            >
              {saving
                ? "..."
                : t.deals.save[lang]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Password Reset Dialog ─────────────────── */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="border-white/10 bg-[#1a1030] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {t.users.resetPassword[lang]}
              {passwordUser && (
                <span className="ml-2 text-sm font-normal text-white/50">
                  — {passwordUser.name || passwordUser.email}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-white/70">{t.users.newPassword[lang]}</Label>
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.users.passwordMinLength[lang]}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-400">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-emerald-400">
                {lang === "de" ? "Passwort erfolgreich geändert!" : "Password changed successfully!"}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setPasswordDialogOpen(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {t.deals.cancel[lang]}
            </Button>
            <Button
              onClick={savePassword}
              disabled={passwordSaving || passwordSuccess}
              className="bg-amber-600 text-white hover:bg-amber-500"
            >
              {passwordSaving ? "..." : t.users.resetPassword[lang]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Create User Dialog ────────────────────── */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="border-white/10 bg-[#1a1030] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {t.users.createUserTitle[lang]}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-white/70">{t.users.name[lang]}</Label>
              <Input
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Roberto"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">{t.users.emailAddress[lang]}</Label>
              <Input
                type="email"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
                placeholder="user@example.com"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">{t.users.password[lang]}</Label>
              <Input
                type="text"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder={t.users.passwordMinLength[lang]}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">{t.users.selectRole[lang]}</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setCreateRole("USER")}
                  className={`flex-1 ${
                    createRole === "USER"
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  User
                </Button>
                <Button
                  type="button"
                  onClick={() => setCreateRole("ADMIN")}
                  className={`flex-1 ${
                    createRole === "ADMIN"
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                  Admin
                </Button>
              </div>
            </div>

            {createError && (
              <p className="text-sm text-red-400">{createError}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {t.deals.cancel[lang]}
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={createSaving}
              className="bg-purple-600 text-white hover:bg-purple-500"
            >
              {createSaving ? "..." : t.users.createUser[lang]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
