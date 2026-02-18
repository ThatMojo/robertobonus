"use client"

import { CasinoBonus } from "@/data/casinos"

interface DealCardProps {
  deal: CasinoBonus
}

export default function DealCard({ deal }: DealCardProps) {
  const initial = deal.name.charAt(0).toUpperCase()

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

      {/* HEADER: Rank + Logo + Name ... Badge */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Rank badge */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 text-lg font-bold text-zinc-800">
            {deal.rank}
          </div>

          {/* Casino logo */}
          <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-xl bg-black/30 ring-1 ring-white/10">
            <span className="text-3xl font-bold text-purple-400">
              {initial}
            </span>
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

        {/* Badge */}
        {deal.badgeText && (
          <div className="shrink-0 rounded-xl bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 px-3 py-1.5 text-sm font-extrabold text-nowrap text-black shadow-[0_0_24px_rgba(168,85,247,0.35)]">
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

          {/* Max Einsatz */}
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
          {/* Provider badges */}
          <div className="flex items-center gap-2">
            {deal.hasMerkur && (
              <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/20">
                Merkur
              </span>
            )}
            {deal.hasNovoline && (
              <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                Novoline
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
