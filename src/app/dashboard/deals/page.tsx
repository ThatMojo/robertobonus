"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { casinos } from "@/data/casinos"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function DealsPage() {
  const [search, setSearch] = useState("")
  const [activeDeals, setActiveDeals] = useState<Record<string, boolean>>(
    Object.fromEntries(casinos.map((c) => [c.id, true]))
  )

  const filtered = casinos.filter((casino) =>
    casino.name.toLowerCase().includes(search.toLowerCase())
  )

  function toggleDeal(id: string) {
    setActiveDeals((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Deals verwalten
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Verwalte und konfiguriere alle Casino-Deals
          </p>
        </div>
        <Button className="w-fit bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-900/30 hover:from-purple-500 hover:to-purple-400">
          <Plus className="mr-2 h-4 w-4" />
          Neuer Deal
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <Input
          placeholder="Deals durchsuchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-white/10 bg-white/[0.04] pl-9 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-0"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-xs font-semibold uppercase tracking-wider text-white/50">
                #
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Casino
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Bonus
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Max. Bonus
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Wager
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Promo Code
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Status
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-white/50">
                Aktionen
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((casino) => (
              <TableRow
                key={casino.id}
                className="border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                {/* Rank */}
                <TableCell className="py-3.5 font-medium text-white/40">
                  {casino.rank}
                </TableCell>

                {/* Casino */}
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-sm font-bold text-purple-300">
                      {casino.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-white">{casino.name}</span>
                  </div>
                </TableCell>

                {/* Bonus */}
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {casino.bonusPercent}%
                    </span>
                    <Badge
                      className={
                        casino.bonusType === "non-sticky"
                          ? "border-0 bg-emerald-500/15 text-emerald-400"
                          : "border-0 bg-amber-500/15 text-amber-400"
                      }
                    >
                      {casino.bonusType === "non-sticky"
                        ? "Non-Sticky"
                        : "Sticky"}
                    </Badge>
                  </div>
                </TableCell>

                {/* Max Bonus */}
                <TableCell className="py-3.5 text-white/80">
                  {casino.maxBonus.toLocaleString("de-DE")} €
                </TableCell>

                {/* Wager */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">
                      {casino.wagerMultiplier}x
                    </span>
                    <span className="text-xs text-white/40">
                      {casino.wagerType}
                    </span>
                  </div>
                </TableCell>

                {/* Promo Code */}
                <TableCell className="py-3.5">
                  {casino.promoCode ? (
                    <code className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-xs font-mono font-medium text-purple-300">
                      {casino.promoCode}
                    </code>
                  ) : (
                    <span className="text-white/25">---</span>
                  )}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3.5">
                  <Switch
                    checked={activeDeals[casino.id] ?? true}
                    onCheckedChange={() => toggleDeal(casino.id)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/40 hover:bg-white/5 hover:text-white"
                      aria-label={`${casino.name} bearbeiten`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`${casino.name} löschen`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-sm text-white/30"
                >
                  Keine Deals gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer count */}
      <p className="mt-4 text-xs text-white/30">
        {casinos.length} Deals insgesamt
      </p>
    </div>
  )
}
