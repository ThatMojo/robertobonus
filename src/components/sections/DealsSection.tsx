"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Heart } from "lucide-react"
import { casinos } from "@/data/casinos"
import FilterBar from "./FilterBar"
import DealCard from "./DealCard"
import AnimatedSection from "@/components/shared/AnimatedSection"

export default function DealsSection() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated" && !!session?.user

  // ── Filter state ────────────────────────────────────────────────
  const [bonusType, setBonusType] = useState("alle")
  const [freeSpinsOnly, setFreeSpinsOnly] = useState(false)
  const [provider, setProvider] = useState("alle")
  const [minBonus, setMinBonus] = useState(100)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // ── Favorites state ─────────────────────────────────────────────
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  // Fetch favorites from API once session is ready
  useEffect(() => {
    if (!isLoggedIn) {
      setFavoriteIds(new Set())
      return
    }

    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites")
        if (!res.ok) return
        const data = await res.json() as { favoriteIds: string[] }
        setFavoriteIds(new Set(data.favoriteIds))
      } catch {
        // silently ignore — non-critical feature
      }
    }

    fetchFavorites()
  }, [isLoggedIn])

  // Toggle favorite: optimistic local update + background API call
  const handleToggleFavorite = useCallback(async (dealId: string) => {
    // Optimistic update
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(dealId)) {
        next.delete(dealId)
      } else {
        next.add(dealId)
      }
      return next
    })

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId }),
      })

      if (!res.ok) {
        // Revert optimistic update on failure
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          if (next.has(dealId)) {
            next.delete(dealId)
          } else {
            next.add(dealId)
          }
          return next
        })
      }
    } catch {
      // Revert on network error
      setFavoriteIds((prev) => {
        const next = new Set(prev)
        if (next.has(dealId)) {
          next.delete(dealId)
        } else {
          next.add(dealId)
        }
        return next
      })
    }
  }, [])

  // ── Filtered list ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return casinos.filter((c) => {
      if (bonusType !== "alle" && c.bonusType !== bonusType) return false
      if (freeSpinsOnly && !c.freeSpins) return false
      if (provider === "merkur" && !c.hasMerkur) return false
      if (provider === "novoline" && !c.hasNovoline) return false
      if (c.bonusPercent < minBonus) return false
      if (showFavoritesOnly && !favoriteIds.has(c.id)) return false
      return true
    })
  }, [bonusType, freeSpinsOnly, provider, minBonus, showFavoritesOnly, favoriteIds])

  return (
    <section id="deals" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Casino Bonus Comparison
            </h2>
            <p className="mt-2 text-white/50">
              {filtered.length}{" "}
              {filtered.length === 1 ? "offer" : "offers"} found
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex-1">
              <FilterBar
                bonusType={bonusType}
                setBonusType={setBonusType}
                freeSpinsOnly={freeSpinsOnly}
                setFreeSpinsOnly={setFreeSpinsOnly}
                provider={provider}
                setProvider={setProvider}
                minBonus={minBonus}
                setMinBonus={setMinBonus}
              />
            </div>

            {/* Favorites filter toggle — only shown when logged in */}
            {isLoggedIn && (
              <button
                onClick={() => setShowFavoritesOnly((prev) => !prev)}
                aria-pressed={showFavoritesOnly}
                className={`
                  flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
                  ring-1 transition-all duration-200
                  ${showFavoritesOnly
                    ? "bg-purple-500/20 text-purple-300 ring-purple-400/40"
                    : "bg-white/5 text-white/60 ring-white/10 hover:bg-white/10 hover:text-white/80"
                  }
                `}
              >
                <Heart
                  className="h-4 w-4"
                  fill={showFavoritesOnly ? "currentColor" : "none"}
                  strokeWidth={2}
                />
                Favorites
                {favoriteIds.size > 0 && (
                  <span
                    className={`
                      ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold
                      ${showFavoritesOnly ? "bg-purple-400/30 text-purple-200" : "bg-white/10 text-white/50"}
                    `}
                  >
                    {favoriteIds.size}
                  </span>
                )}
              </button>
            )}
          </div>
        </AnimatedSection>

        <div className="mt-8 space-y-4">
          {filtered.map((casino, i) => (
            <AnimatedSection key={casino.id} delay={0.05 * Math.min(i, 5)}>
              <DealCard
                deal={casino}
                isFavorited={favoriteIds.has(casino.id)}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn={isLoggedIn}
              />
            </AnimatedSection>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/40">
              <p className="text-lg">
                {showFavoritesOnly ? "No favorites saved yet" : "No offers found"}
              </p>
              <p className="mt-1 text-sm">
                {showFavoritesOnly
                  ? "Click the heart on any deal to save it here"
                  : "Try different filter settings"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
