"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Package, Lock, Trophy, Sparkles, Clock } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"

interface SliderItem {
  rarity: string
  label: string
  color: string
  points: number
}

const ITEM_WIDTH = 120
const ITEM_GAP = 8
const TOTAL_ITEM = ITEM_WIDTH + ITEM_GAP

const RARITY_STYLES: Record<string, { bg: string; border: string; glow: string }> = {
  common: {
    bg: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.4)",
    glow: "0 0 12px rgba(168,85,247,0.3)",
  },
  rare: {
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.5)",
    glow: "0 0 16px rgba(59,130,246,0.4)",
  },
  legendary: {
    bg: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.6)",
    glow: "0 0 24px rgba(245,158,11,0.5)",
  },
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00"
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function OpeningContent() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated" && !!session?.user

  const [canOpen, setCanOpen] = useState(false)
  const [nextOpenAt, setNextOpenAt] = useState<string | null>(null)
  const [countdown, setCountdown] = useState("")
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  // Slider state
  const [items, setItems] = useState<SliderItem[]>([])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<{
    rarity: string
    rarityLabel: string
    rarityColor: string
    pointsWon: number
    totalPoints: number
  } | null>(null)
  const [winIndex, setWinIndex] = useState(25)
  const stripRef = useRef<HTMLDivElement>(null)

  // Fetch status
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/case/open")
      const data = await res.json()
      setCanOpen(data.canOpen ?? false)
      setNextOpenAt(data.nextOpenAt ?? null)
      setPoints(data.points ?? 0)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) fetchStatus()
    else setLoading(false)
  }, [isLoggedIn, fetchStatus])

  // Countdown timer
  useEffect(() => {
    if (!nextOpenAt) {
      setCountdown("")
      return
    }
    const tick = () => {
      const diff = new Date(nextOpenAt).getTime() - Date.now()
      if (diff <= 0) {
        setCanOpen(true)
        setNextOpenAt(null)
        setCountdown("")
        return
      }
      setCountdown(formatCountdown(diff))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [nextOpenAt])

  // Open case handler
  const handleOpen = async () => {
    if (!canOpen || spinning) return
    setResult(null)
    setSpinning(true)

    try {
      const res = await fetch("/api/case/open", { method: "POST" })
      if (!res.ok) {
        setSpinning(false)
        return
      }
      const data = await res.json()
      setItems(data.items)
      setWinIndex(data.winIndex)

      // Start animation: wait for items to render, then slide
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const strip = stripRef.current
          if (!strip) return

          // Calculate target: center the winning item in the viewport
          const viewportCenter = strip.parentElement!.offsetWidth / 2
          const targetX = data.winIndex * TOTAL_ITEM + TOTAL_ITEM / 2 - viewportCenter

          strip.style.transition = "none"
          strip.style.transform = "translateX(0)"

          requestAnimationFrame(() => {
            strip.style.transition = "transform 4s cubic-bezier(0.15, 0.85, 0.3, 1)"
            strip.style.transform = `translateX(-${targetX}px)`
          })

          // After animation completes
          setTimeout(() => {
            setResult({
              rarity: data.rarity,
              rarityLabel: data.rarityLabel,
              rarityColor: data.rarityColor,
              pointsWon: data.pointsWon,
              totalPoints: data.totalPoints,
            })
            setPoints(data.totalPoints)
            setCanOpen(false)
            setNextOpenAt(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
            setSpinning(false)
          }, 4200)
        })
      })
    } catch {
      setSpinning(false)
    }
  }

  return (
    <div className="min-h-[80vh] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Free Daily Reward</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              Daily Case Opening
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Open your free case every 24 hours and win points. Common, Rare, or Legendary
              — test your luck!
            </p>
          </div>
        </AnimatedSection>

        {/* Rarity Legend */}
        <div className="flex justify-center gap-6 mb-10">
          {[
            { label: "Common", color: "#a855f7", range: "5–20 pts" },
            { label: "Rare", color: "#3b82f6", range: "25–50 pts" },
            { label: "Legendary", color: "#f59e0b", range: "75–100 pts" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}` }}
              />
              <span className="text-xs text-gray-400">
                {r.label} ({r.range})
              </span>
            </div>
          ))}
        </div>

        {/* Case Slider */}
        <div className="relative mb-8">
          {/* Center indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-0.5 h-full bg-white/80" />
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white/80" />
          </div>

          {/* Slider viewport */}
          <div
            className="relative overflow-hidden rounded-xl border border-white/10"
            style={{
              background: "rgba(5,2,16,0.8)",
              height: 140,
            }}
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #050210, transparent)" }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #050210, transparent)" }}
            />

            {/* Items strip */}
            <div
              ref={stripRef}
              className="flex items-center h-full px-4"
              style={{ gap: ITEM_GAP, willChange: "transform" }}
            >
              {items.length > 0 ? (
                items.map((item, i) => {
                  const style = RARITY_STYLES[item.rarity] || RARITY_STYLES.common
                  return (
                    <div
                      key={i}
                      className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg"
                      style={{
                        width: ITEM_WIDTH,
                        height: 110,
                        background: style.bg,
                        border: `2px solid ${style.border}`,
                        boxShadow: style.glow,
                      }}
                    >
                      <Sparkles className="w-6 h-6 mb-1" style={{ color: item.color }} />
                      <span className="text-lg font-bold text-white">+{item.points}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: item.color }}>
                        {item.label}
                      </span>
                    </div>
                  )
                })
              ) : (
                // Placeholder items
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg"
                    style={{
                      width: ITEM_WIDTH,
                      height: 110,
                      background: "rgba(168,85,247,0.05)",
                      border: "2px solid rgba(168,85,247,0.15)",
                    }}
                  >
                    <Package className="w-6 h-6 text-purple-500/30 mb-1" />
                    <span className="text-xs text-purple-500/30">???</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Result display */}
        {result && (
          <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
            <div
              className="inline-flex flex-col items-center gap-2 px-8 py-4 rounded-xl border"
              style={{
                background: RARITY_STYLES[result.rarity]?.bg,
                borderColor: RARITY_STYLES[result.rarity]?.border,
                boxShadow: RARITY_STYLES[result.rarity]?.glow,
              }}
            >
              <Trophy className="w-8 h-8" style={{ color: result.rarityColor }} />
              <span className="text-2xl font-extrabold text-white">+{result.pointsWon} Points</span>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: result.rarityColor }}
              >
                {result.rarityLabel}
              </span>
              <span className="text-xs text-gray-400">
                Total: {result.totalPoints.toLocaleString()} points
              </span>
            </div>
          </div>
        )}

        {/* Action area */}
        <div className="text-center">
          {loading ? (
            <div className="text-gray-500 text-sm">Loading...</div>
          ) : !isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Login to open your daily case</span>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Login
              </Link>
            </div>
          ) : canOpen && !spinning ? (
            <button
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-3 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, rgba(88,28,135,0.9), rgba(109,40,217,0.8))",
                border: "1px solid rgba(168,85,247,0.7)",
                boxShadow: "0 0 30px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <Package className="w-6 h-6" />
              Open Case
            </button>
          ) : spinning ? (
            <div className="text-purple-300 font-semibold text-lg animate-pulse">
              Opening...
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Next case available in</span>
              </div>
              <div
                className="text-3xl font-mono font-bold text-purple-300"
                style={{ textShadow: "0 0 15px rgba(168,85,247,0.5)" }}
              >
                {countdown}
              </div>
            </div>
          )}

          {/* Points display */}
          {isLoggedIn && (
            <div className="mt-6 text-sm text-gray-500">
              Your points: <span className="text-purple-300 font-semibold">{points.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
