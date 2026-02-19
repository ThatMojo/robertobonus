"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState, useCallback } from "react"
import { Gift, Check, X } from "lucide-react"

export default function DailyBonusBanner() {
  const { data: session } = useSession()
  const [visible, setVisible] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/points/daily")
      if (!res.ok) return
      const data = await res.json()
      // Only show banner if not yet claimed today
      if (!data.claimed) {
        setVisible(true)
      }
    } catch {
      // Silently fail — don't show banner
    }
  }, [])

  useEffect(() => {
    if (session?.user) {
      checkStatus()
    }
  }, [session, checkStatus])

  const handleClaim = async () => {
    setClaiming(true)
    try {
      const res = await fetch("/api/points/daily", { method: "POST" })
      const data = await res.json()

      if (data.success || data.claimed) {
        setClaimed(true)
        // Auto-hide after 3 seconds
        setTimeout(() => setVisible(false), 3000)
      }
    } catch {
      // Silently fail
    } finally {
      setClaiming(false)
    }
  }

  if (!visible || !session?.user) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-4 shadow-[0_0_30px_rgba(168,85,247,0.2)] max-w-xs">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {claimed ? (
          <div className="flex items-center gap-3 pr-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/20">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-400">Claimed! +50 points</p>
              <p className="text-xs text-white/50">Come back tomorrow for more</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 pr-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
              <Gift className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Daily Bonus</p>
              <p className="text-xs text-white/50">Claim your daily 50 points!</p>
            </div>
            <button
              onClick={handleClaim}
              disabled={claiming}
              className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {claiming ? "..." : "Claim"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
