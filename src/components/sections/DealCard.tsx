"use client"

import { useState } from "react"
import { Heart, Lock } from "lucide-react"
import { CasinoBonus } from "@/data/casinos"

interface DealCardProps {
  deal: CasinoBonus
  isFavorited?: boolean
  onToggleFavorite?: (dealId: string) => void
  isLoggedIn?: boolean
}

export default function DealCard({
  deal,
  isFavorited = false,
  onToggleFavorite,
  isLoggedIn = false,
}: DealCardProps) {
  const initial = deal.name.charAt(0).toUpperCase()

  // Local optimistic state so the heart reacts instantly
  const [localFavorited, setLocalFavorited] = useState(isFavorited)
  const [showLoginHint, setShowLoginHint] = useState(false)

  // Keep in sync when the parent updates the prop (e.g. after API response)
  // We use a simple derived value: parent prop wins if it changes
  const favorited = onToggleFavorite ? localFavorited : isFavorited

  function handleHeartClick(e: React.MouseEvent) {
    e.stopPropagation()

    if (!isLoggedIn) {
      setShowLoginHint(true)
      setTimeout(() => setShowLoginHint(false), 2500)
      return
    }

    setLocalFavorited((prev) => !prev)
    onToggleFavorite?.(deal.id)
  }

  // Exclusive feature disabled for now
  const showExclusiveOverlay = false

  return (
    <article
      className={`
        group relative overflow-hidden rounded-2xl border border-white/10
        bg-gradient-to-br from-[#1e1030] via-[#160d1e] to-[#0f0815]
        p-5 text-white shadow-[0_0_40px_-20px_rgba(168,85,247,0.25)] backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-[0_0_60px_-18px_rgba(168,85,247,0.45)]
        sm:p-6
      `}
    >
      {/* Hover glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-20 -z-10 opacity-0 blur-2xl transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 10%, rgba(168,85,247,0.15), transparent 70%), radial-gradient(45% 35% at 85% 20%, rgba(168,85,247,0.1), transparent 70%)",
        }}
      />

      {/* ── Heart favorite button ─────────────────────────────────── */}
      <div className="absolute top-4 right-4 z-20">
        {/* Login hint tooltip */}
        {showLoginHint && (
          <div className="absolute -top-9 right-0 whitespace-nowrap rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-white shadow-lg ring-1 ring-white/10">
            Login to save favorites
            {/* Arrow */}
            <span className="absolute -bottom-1 right-3 h-2 w-2 rotate-45 bg-zinc-800 ring-1 ring-white/10" />
          </div>
        )}
        <button
          onClick={handleHeartClick}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className={`
            flex h-8 w-8 items-center justify-center rounded-full
            transition-all duration-200
            hover:scale-110 active:scale-95
            ${favorited
              ? "bg-purple-500/20 text-purple-400"
              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
            }
          `}
        >
          <Heart
            className="h-4 w-4"
            fill={favorited ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* ── Card content (blurred when exclusive overlay is active) ── */}
      <div className={showExclusiveOverlay ? "pointer-events-none blur-[3px] select-none" : ""}>
        {/* HEADER: Rank + Logo + Name ... Badge */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Rank badge */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 text-lg font-bold text-zinc-800">
              {deal.rank}
            </div>

            {/* Casino logo */}
            <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10">
              {deal.logo && deal.logo !== "#" ? (
                <img src={deal.logo} alt={`${deal.name} logo`} width={80} height={80} loading="lazy" className="h-full w-full object-contain p-1" />
              ) : (
                <span className="text-3xl font-bold text-purple-400">{initial}</span>
              )}
            </div>

            {/* Casino name */}
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white sm:text-xl">
                {deal.name}
              </h3>
              {deal.freeSpins && (
                <span className="mt-1 inline-block rounded-lg bg-purple-500/15 px-2.5 py-1 text-xs font-semibold text-purple-300">
                  +{deal.freeSpins} Free Spins
                </span>
              )}
            </div>
          </div>

          {/* Badge — keep right padding so it doesn't collide with heart */}
          {deal.badgeText && (
            <div className="mr-10 shrink-0 rounded-xl bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 px-3 py-1.5 text-sm font-extrabold text-nowrap text-black shadow-[0_0_24px_rgba(168,85,247,0.35)]">
              {deal.badgeText}
            </div>
          )}
        </header>

        {/* STATS + FEATURES GRID */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Left: 4 stat boxes */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:col-span-7">
            {/* Bonus type + percentage (highlighted) */}
            <li className="rounded-xl border border-purple-400/30 bg-purple-400/10 p-3 ring-1 ring-white/5">
              <span className="block text-xs font-medium uppercase text-purple-400">
                {deal.bonusType === "non-sticky" ? "Non-Sticky" : "Sticky"}
              </span>
              <span className="mt-0.5 block text-lg font-semibold text-white">
                {deal.bonusPercent}%
              </span>
            </li>

            {/* Max Bonus */}
            <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <span className="block text-xs text-white/60">Max Bonus</span>
              <span className="mt-0.5 block text-lg font-semibold">
                {deal.maxBonus.toLocaleString("de-DE")}&euro;
              </span>
            </li>

            {/* Max Bet */}
            <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <span className="block text-xs text-white/60">Max Bet</span>
              <span className="mt-0.5 block text-lg font-semibold">
                {deal.maxBet}&euro;
              </span>
            </li>

            {/* Wager */}
            <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <span className="block text-xs text-white/60">Wager</span>
              <span className="mt-0.5 block text-lg font-semibold">
                {deal.wagerMultiplier}x ({deal.wagerType === "Bonus Only" ? "B" : "B+D"})
              </span>
            </li>
          </ul>

          {/* Right: Features + Promo Code */}
          <div className="flex flex-col gap-3 md:col-span-5">
            {/* Feature tags */}
            <ul className="flex flex-wrap gap-2">
              {deal.features.map((feat) => (
                <li
                  key={feat}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-white/90 ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-purple-400/10 group-hover:text-purple-400"
                >
                  {feat}
                </li>
              ))}
            </ul>

            {/* Promo code box */}
            <div className="flex items-center justify-between gap-3 rounded-xl border border-purple-400/30 bg-purple-400/10 px-3 py-2 ring-1 ring-white/5">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-purple-400">
                  Promo Code
                </p>
                <p className="truncate font-bold text-zinc-400">
                  {deal.promoCode ? (
                    <span className="font-mono text-purple-300">
                      {deal.promoCode}
                    </span>
                  ) : (
                    "No Code Required"
                  )}
                </p>
              </div>
              {deal.promoCode && (
                <button
                  onClick={() => navigator.clipboard.writeText(deal.promoCode!)}
                  className="shrink-0 rounded-lg bg-white/5 p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  title="Copy Code"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER: Verification + CTA */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-sm text-white/60 sm:text-left">
            Verified by Roberto | T&amp;Cs Apply
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            {/* Provider badges with logos */}
            <div className="flex items-center gap-2">
              {deal.hasMerkur && (
                <span className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1 ring-1 ring-amber-500/20">
                  <img src="/images/providers/merkur.png" alt="Merkur" width={20} height={15} className="object-contain" />
                  <span className="text-xs font-semibold text-amber-400">Merkur</span>
                </span>
              )}
              {deal.hasNovoline && (
                <span className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 ring-1 ring-emerald-500/20">
                  <img src="/images/providers/novoline.webp" alt="Novoline" width={50} height={10} className="object-contain" />
                </span>
              )}
            </div>

            {/* CTA Button */}
            <a
              href={deal.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 px-6 py-2.5 font-extrabold tracking-wide text-black shadow-[0_0_22px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] active:translate-y-px active:scale-[0.98] sm:w-auto sm:shrink-0"
              aria-label={`Zum Deal – ${deal.name}`}
            >
              <span className="relative z-10 flex items-center gap-2 text-black transition-transform duration-300 group-hover/btn:scale-[1.03]">
                Play Now
              </span>
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-0 transition-opacity duration-700 group-hover/btn:opacity-100">
                <span className="absolute top-0 -left-full h-full w-[40%] skew-x-12 animate-[shine_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Exclusive deal overlay (logged-out users only) ─────────── */}
      {showExclusiveOverlay && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-black/60 backdrop-blur-[2px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 ring-1 ring-purple-400/30">
            <Lock className="h-5 w-5 text-purple-300" />
          </div>
          <p className="text-sm font-semibold text-white">Exclusive Deal</p>
          <p className="text-xs text-white/60">Login to see this exclusive offer</p>
          <a
            href="/login"
            className="mt-1 rounded-xl bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 px-5 py-2 text-sm font-extrabold text-black shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            Login
          </a>
        </div>
      )}

      {/* Decorative dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 2px, transparent 3px) 0 0 / 20px 20px",
        }}
      />
    </article>
  )
}
