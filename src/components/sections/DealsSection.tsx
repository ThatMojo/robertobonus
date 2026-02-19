"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
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
  const [visibleCount, setVisibleCount] = useState(10)
  const loadMoreRef = useRef<HTMLDivElement>(null)

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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(10)
  }, [bonusType, freeSpinsOnly, provider, minBonus, showFavoritesOnly])

  // Infinite scroll — load 5 more when sentinel enters viewport
  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 5)
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Top 10 casinos only, sorted by rank
  const filtered = useMemo(() => {
    return casinos
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10)
  }, [])

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

        {/* FilterBar + Favorites disabled for now */}

        <div className="mt-8 space-y-4">
          {filtered.slice(0, visibleCount).map((casino) => (
            <AnimatedSection key={casino.id} delay={0}>
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

          {/* Infinite scroll sentinel */}
          {filtered.length > visibleCount && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-400/30 border-t-purple-400" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
