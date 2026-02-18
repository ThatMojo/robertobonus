"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2, X, Save } from "lucide-react"
import { casinos, type CasinoBonus } from "@/data/casinos"
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

type DealWithActive = CasinoBonus & { isActive: boolean }

function makeDeals(): DealWithActive[] {
  return casinos.map((c) => ({ ...c, isActive: true }))
}

export default function DealsPage() {
  const [search, setSearch] = useState("")
  const [deals, setDeals] = useState<DealWithActive[]>(makeDeals)
  const [editDeal, setEditDeal] = useState<DealWithActive | null>(null)
  const [deleteDeal, setDeleteDeal] = useState<DealWithActive | null>(null)
  const [isNew, setIsNew] = useState(false)

  const filtered = deals.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  function toggleDeal(id: string) {
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    )
  }

  function openNew() {
    setIsNew(true)
    setEditDeal({
      id: `new-${Date.now()}`,
      rank: deals.length + 1,
      name: "",
      slug: "",
      logo: "",
      bonusPercent: 100,
      bonusType: "non-sticky",
      maxBonus: 500,
      maxBet: 5,
      freeSpins: null,
      wagerMultiplier: 35,
      wagerType: "Nur Bonus",
      features: [],
      promoCode: null,
      affiliateUrl: "#",
      hasMerkur: false,
      hasNovoline: false,
      isExclusive: false,
      badgeText: null,
      isActive: true,
    })
  }

  function openEdit(deal: DealWithActive) {
    setIsNew(false)
    setEditDeal({ ...deal })
  }

  function saveDeal() {
    if (!editDeal || !editDeal.name.trim()) return
    const slug = editDeal.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    const updated = { ...editDeal, slug }

    if (isNew) {
      setDeals((prev) => [...prev, updated])
    } else {
      setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
    }
    setEditDeal(null)
  }

  function confirmDelete() {
    if (!deleteDeal) return
    setDeals((prev) => prev.filter((d) => d.id !== deleteDeal.id))
    setDeleteDeal(null)
  }

  function updateField<K extends keyof DealWithActive>(key: K, value: DealWithActive[K]) {
    if (!editDeal) return
    setEditDeal({ ...editDeal, [key]: value })
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
        <Button
          onClick={openNew}
          className="w-fit bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-900/30 hover:from-purple-500 hover:to-purple-400"
        >
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
              <TableHead className="w-12 text-xs font-semibold uppercase tracking-wider text-white/50">#</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Casino</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Bonus</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Max. Bonus</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Wager</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Promo Code</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">Status</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-white/50">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((deal) => (
              <TableRow
                key={deal.id}
                className="border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                <TableCell className="py-3.5 font-medium text-white/40">{deal.rank}</TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-sm font-bold text-purple-300">
                      {deal.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-white">{deal.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{deal.bonusPercent}%</span>
                    <Badge
                      className={
                        deal.bonusType === "non-sticky"
                          ? "border-0 bg-emerald-500/15 text-emerald-400"
                          : "border-0 bg-amber-500/15 text-amber-400"
                      }
                    >
                      {deal.bonusType === "non-sticky" ? "Non-Sticky" : "Sticky"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-white/80">
                  {deal.maxBonus.toLocaleString("de-DE")} &euro;
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{deal.wagerMultiplier}x</span>
                    <span className="text-xs text-white/40">{deal.wagerType}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  {deal.promoCode ? (
                    <code className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-xs font-mono font-medium text-purple-300">
                      {deal.promoCode}
                    </code>
                  ) : (
                    <span className="text-white/25">---</span>
                  )}
                </TableCell>
                <TableCell className="py-3.5">
                  <Switch
                    checked={deal.isActive}
                    onCheckedChange={() => toggleDeal(deal.id)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </TableCell>
                <TableCell className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/40 hover:bg-white/5 hover:text-white"
                      aria-label={`${deal.name} bearbeiten`}
                      onClick={() => openEdit(deal)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`${deal.name} löschen`}
                      onClick={() => setDeleteDeal(deal)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={8} className="py-12 text-center text-sm text-white/30">
                  Keine Deals gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-xs text-white/30">{deals.length} Deals insgesamt</p>

      {/* Edit / New Dialog */}
      <Dialog open={!!editDeal} onOpenChange={(open) => !open && setEditDeal(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0d0815] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {isNew ? "Neuer Deal" : `${editDeal?.name} bearbeiten`}
            </DialogTitle>
          </DialogHeader>

          {editDeal && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Name</Label>
                <Input
                  value={editDeal.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Rank */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Rang</Label>
                <Input
                  type="number"
                  value={editDeal.rank}
                  onChange={(e) => updateField("rank", parseInt(e.target.value) || 1)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Bonus Percent */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Bonus %</Label>
                <Input
                  type="number"
                  value={editDeal.bonusPercent}
                  onChange={(e) => updateField("bonusPercent", parseInt(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Bonus Type */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Bonus Typ</Label>
                <Select
                  value={editDeal.bonusType}
                  onValueChange={(v) => updateField("bonusType", v as "sticky" | "non-sticky")}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1030] text-white">
                    <SelectItem value="non-sticky">Non-Sticky</SelectItem>
                    <SelectItem value="sticky">Sticky</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Max Bonus */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Max. Bonus (EUR)</Label>
                <Input
                  type="number"
                  value={editDeal.maxBonus}
                  onChange={(e) => updateField("maxBonus", parseInt(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Max Bet */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Max. Einsatz (EUR)</Label>
                <Input
                  type="number"
                  value={editDeal.maxBet}
                  onChange={(e) => updateField("maxBet", parseInt(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Wager Multiplier */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Wager (x)</Label>
                <Input
                  type="number"
                  value={editDeal.wagerMultiplier}
                  onChange={(e) => updateField("wagerMultiplier", parseInt(e.target.value) || 0)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Wager Type */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Wager Typ</Label>
                <Select
                  value={editDeal.wagerType}
                  onValueChange={(v) => updateField("wagerType", v)}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1030] text-white">
                    <SelectItem value="Nur Bonus">Nur Bonus</SelectItem>
                    <SelectItem value="Bonus + Einzahlung">Bonus + Einzahlung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Free Spins */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Freispiele</Label>
                <Input
                  type="number"
                  value={editDeal.freeSpins ?? ""}
                  placeholder="Keine"
                  onChange={(e) => updateField("freeSpins", e.target.value ? parseInt(e.target.value) : null)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Promo Code */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Promo Code</Label>
                <Input
                  value={editDeal.promoCode ?? ""}
                  placeholder="Kein Code"
                  onChange={(e) => updateField("promoCode", e.target.value || null)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Affiliate URL */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-white/60">Affiliate URL</Label>
                <Input
                  value={editDeal.affiliateUrl}
                  onChange={(e) => updateField("affiliateUrl", e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Badge Text */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Badge Text</Label>
                <Input
                  value={editDeal.badgeText ?? ""}
                  placeholder="z.B. Exklusiv"
                  onChange={(e) => updateField("badgeText", e.target.value || null)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Features (comma separated) */}
              <div className="space-y-1.5">
                <Label className="text-white/60">Features (Komma-getrennt)</Label>
                <Input
                  value={editDeal.features.join(", ")}
                  onChange={(e) => updateField("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Switch
                    checked={editDeal.hasMerkur}
                    onCheckedChange={(v) => updateField("hasMerkur", v)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                  Merkur
                </label>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Switch
                    checked={editDeal.hasNovoline}
                    onCheckedChange={(v) => updateField("hasNovoline", v)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                  Novoline
                </label>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Switch
                    checked={editDeal.isExclusive}
                    onCheckedChange={(v) => updateField("isExclusive", v)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                  Exklusiv
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 sm:col-span-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditDeal(null)}
                  className="text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Abbrechen
                </Button>
                <Button
                  onClick={saveDeal}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400"
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  Speichern
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDeal} onOpenChange={(open) => !open && setDeleteDeal(null)}>
        <DialogContent className="border-white/10 bg-[#0d0815] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Deal löschen
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60">
            Bist du sicher, dass du <strong className="text-white">{deleteDeal?.name}</strong> löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteDeal(null)}
              className="text-white/50 hover:bg-white/5 hover:text-white"
            >
              Abbrechen
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Löschen
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
