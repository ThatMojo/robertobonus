"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Plus, Search, Pencil, Trash2, X, Save, Upload, ImageIcon } from "lucide-react"
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
import { useDashboardLang } from "../DashboardLangContext"
import { t } from "../translations"

type DealWithActive = CasinoBonus & { isActive: boolean }

function makeDeals(): DealWithActive[] {
  return casinos.map((c) => ({ ...c, isActive: true }))
}

// ─────────────────────────────────────────────
// Image Upload Component
// ─────────────────────────────────────────────

function ImageUpload({
  value,
  onChange,
  lang,
}: {
  value: string
  onChange: (url: string) => void
  lang: "de" | "en"
}) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(async (file: File) => {
    setError("")
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Upload failed")
      } else {
        onChange(data.url)
      }
    } catch {
      setError(lang === "de" ? "Upload fehlgeschlagen" : "Upload failed")
    } finally {
      setUploading(false)
    }
  }, [onChange, lang])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragging(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const hasImage = value && value !== "#" && value !== ""

  return (
    <div className="space-y-2">
      <Label className="text-white/60">
        {lang === "de" ? "Logo / Bild" : "Logo / Image"}
      </Label>

      {/* Preview + Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative flex cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed transition-all duration-200
          ${dragging
            ? "border-purple-400 bg-purple-500/10"
            : "border-white/15 bg-white/[0.03] hover:border-purple-500/40 hover:bg-white/[0.05]"
          }
          ${hasImage ? "p-3" : "px-6 py-8"}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
            <p className="text-sm text-white/50">
              {lang === "de" ? "Wird hochgeladen..." : "Uploading..."}
            </p>
          </div>
        ) : hasImage ? (
          <div className="flex w-full items-center gap-4">
            {/* Image preview */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src={value}
                alt="Deal logo"
                fill
                className="object-contain p-1"
                unoptimized
              />
            </div>

            {/* Info + actions */}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-white/70">{value}</p>
              <p className="mt-0.5 text-xs text-white/40">
                {lang === "de" ? "Klicken oder Bild hierher ziehen zum Ändern" : "Click or drag image here to change"}
              </p>
            </div>

            {/* Remove button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Upload className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white/70">
              {lang === "de" ? "Bild hochladen" : "Upload image"}
            </p>
            <p className="mt-1 text-xs text-white/40">
              {lang === "de"
                ? "Ziehe ein Bild hierher oder klicke zum Auswählen"
                : "Drag & drop an image here or click to browse"}
            </p>
            <p className="mt-2 text-xs text-white/25">
              PNG, JPG, WebP, SVG, GIF — max 5MB
            </p>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* URL fallback input */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/30">
          {lang === "de" ? "oder URL eingeben" : "or enter URL"}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/logo.png"
        className="border-white/10 bg-white/5 text-sm text-white placeholder:text-white/25"
      />

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function DealsPage() {
  const { lang } = useDashboardLang()
  const [search, setSearch] = useState("")
  const [deals, setDeals] = useState<DealWithActive[]>(makeDeals)
  const [editDeal, setEditDeal] = useState<DealWithActive | null>(null)
  const [deleteDeal, setDeleteDeal] = useState<DealWithActive | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [rankInput, setRankInput] = useState("")
  const [formError, setFormError] = useState("")

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
    setFormError("")
    setRankInput(String(deals.length + 1))
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
    setFormError("")
    setRankInput(String(deal.rank))
    setEditDeal({ ...deal })
  }

  function saveDeal() {
    if (!editDeal) return
    setFormError("")

    if (!editDeal.name.trim()) {
      setFormError("Please enter a name.")
      return
    }

    const parsedRank = parseInt(rankInput)
    if (!rankInput.trim() || isNaN(parsedRank) || parsedRank < 1) {
      setFormError("Please enter a valid rank number.")
      return
    }

    const slug = editDeal.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    const updated = { ...editDeal, rank: parsedRank, slug }

    if (isNew) {
      setDeals((prev) => [...prev, updated])
    } else {
      setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
    }
    setEditDeal(null)
    setFormError("")
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
            {t.deals.title[lang]}
          </h1>
          <p className="mt-1 text-sm text-white/40">
            {t.deals.subtitle[lang]}
          </p>
        </div>
        <Button
          onClick={openNew}
          className="w-fit bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-900/30 hover:from-purple-500 hover:to-purple-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t.deals.newDeal[lang]}
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <Input
          placeholder={t.deals.searchPlaceholder[lang]}
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
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.casino[lang]}</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.bonus[lang]}</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.maxBonus[lang]}</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.wager[lang]}</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.promoCode[lang]}</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.status[lang]}</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-white/50">{t.deals.actions[lang]}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((deal) => {
              const hasLogo = deal.logo && deal.logo !== "#" && deal.logo !== ""
              return (
                <TableRow
                  key={deal.id}
                  className="border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  <TableCell className="py-3.5 font-medium text-white/40">{deal.rank}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      {hasLogo ? (
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                          <Image
                            src={deal.logo}
                            alt={deal.name}
                            fill
                            className="object-contain p-0.5"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-sm font-bold text-purple-300">
                          {deal.name.charAt(0).toUpperCase()}
                        </div>
                      )}
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
                        aria-label={`${deal.name} ${t.deals.edit[lang]}`}
                        onClick={() => openEdit(deal)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`${deal.name} ${t.deals.delete[lang]}`}
                        onClick={() => setDeleteDeal(deal)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={8} className="py-12 text-center text-sm text-white/30">
                  {t.deals.noDeals[lang]}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-xs text-white/30">{deals.length} {t.deals.totalDeals[lang]}</p>

      {/* Edit / New Dialog */}
      <Dialog open={!!editDeal} onOpenChange={(open) => !open && setEditDeal(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0d0815] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {isNew ? t.deals.newDeal[lang] : `${editDeal?.name} ${t.deals.edit[lang]}`}
            </DialogTitle>
          </DialogHeader>

          {editDeal && (
            <div className="mt-4 space-y-5">
              {/* ── Image Upload ── */}
              <ImageUpload
                value={editDeal.logo}
                onChange={(url) => updateField("logo", url)}
                lang={lang}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.name[lang]}</Label>
                  <Input
                    value={editDeal.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Rank */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.rank[lang]}</Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={rankInput}
                    onChange={(e) => setRankInput(e.target.value)}
                    placeholder=""
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Bonus Percent */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.bonusPercent[lang]}</Label>
                  <Input
                    type="number"
                    value={editDeal.bonusPercent}
                    onChange={(e) => updateField("bonusPercent", parseInt(e.target.value) || 0)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Bonus Type */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.bonusType[lang]}</Label>
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
                  <Label className="text-white/60">{t.deals.maxBonusEur[lang]}</Label>
                  <Input
                    type="number"
                    value={editDeal.maxBonus}
                    onChange={(e) => updateField("maxBonus", parseInt(e.target.value) || 0)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Max Bet */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.maxBet[lang]}</Label>
                  <Input
                    type="number"
                    value={editDeal.maxBet}
                    onChange={(e) => updateField("maxBet", parseInt(e.target.value) || 0)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Wager Multiplier */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.wagerMultiplier[lang]}</Label>
                  <Input
                    type="number"
                    value={editDeal.wagerMultiplier}
                    onChange={(e) => updateField("wagerMultiplier", parseInt(e.target.value) || 0)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Wager Type */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.wagerType[lang]}</Label>
                  <Select
                    value={editDeal.wagerType}
                    onValueChange={(v) => updateField("wagerType", v)}
                  >
                    <SelectTrigger className="border-white/10 bg-white/5 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#1a1030] text-white">
                      <SelectItem value="Nur Bonus">{t.deals.bonusOnly[lang]}</SelectItem>
                      <SelectItem value="Bonus + Einzahlung">{t.deals.bonusDeposit[lang]}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Free Spins */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.freeSpins[lang]}</Label>
                  <Input
                    type="number"
                    value={editDeal.freeSpins ?? ""}
                    placeholder={t.deals.noFreeSpins[lang]}
                    onChange={(e) => updateField("freeSpins", e.target.value ? parseInt(e.target.value) : null)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Promo Code */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.promoCode[lang]}</Label>
                  <Input
                    value={editDeal.promoCode ?? ""}
                    placeholder={t.deals.noCode[lang]}
                    onChange={(e) => updateField("promoCode", e.target.value || null)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Affiliate URL */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-white/60">{t.deals.affiliateUrl[lang]}</Label>
                  <Input
                    value={editDeal.affiliateUrl}
                    onChange={(e) => updateField("affiliateUrl", e.target.value)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Badge Text */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.badgeText[lang]}</Label>
                  <Input
                    value={editDeal.badgeText ?? ""}
                    placeholder={t.deals.egExclusive[lang]}
                    onChange={(e) => updateField("badgeText", e.target.value || null)}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </div>

                {/* Features (comma separated) */}
                <div className="space-y-1.5">
                  <Label className="text-white/60">{t.deals.features[lang]}</Label>
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
                    {t.deals.merkur[lang]}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <Switch
                      checked={editDeal.hasNovoline}
                      onCheckedChange={(v) => updateField("hasNovoline", v)}
                      className="data-[state=checked]:bg-purple-500"
                    />
                    {t.deals.novoline[lang]}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <Switch
                      checked={editDeal.isExclusive}
                      onCheckedChange={(v) => updateField("isExclusive", v)}
                      className="data-[state=checked]:bg-purple-500"
                    />
                    {t.deals.exclusive[lang]}
                  </label>
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                  {formError}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setEditDeal(null)}
                  className="text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <X className="mr-1.5 h-4 w-4" />
                  {t.deals.cancel[lang]}
                </Button>
                <Button
                  onClick={saveDeal}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400"
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  {t.deals.save[lang]}
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
              {t.deals.deleteDeal[lang]}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60">
            {t.deals.confirmDelete[lang]}{" "}
            <strong className="text-white">{deleteDeal?.name}</strong>{" "}
            {t.deals.deleteWarning[lang]}
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteDeal(null)}
              className="text-white/50 hover:bg-white/5 hover:text-white"
            >
              {t.deals.cancel[lang]}
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              {t.deals.delete[lang]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
