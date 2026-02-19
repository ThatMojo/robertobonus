"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Bell, Gift, Star, Tv, PartyPopper, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  link: string | null
  createdAt: string
}

function typeIcon(type: string) {
  switch (type) {
    case "points_earned":
      return <Gift className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
    case "new_deal":
      return <Star className="h-3.5 w-3.5 text-purple-400 shrink-0" />
    case "stream_live":
      return <Tv className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
    case "welcome":
      return <PartyPopper className="h-3.5 w-3.5 text-blue-400 shrink-0" />
    default:
      return <Bell className="h-3.5 w-3.5 text-white/40 shrink-0" />
  }
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" })
      if (!res.ok) return
      const data = await res.json() as { notifications: Notification[]; unreadCount: number }
      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
    } catch {
      // silently fail
    }
  }, [])

  // Initial fetch + polling every 30s
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 60_000)
    return () => clearInterval(interval)
  }, [fetchNotifications])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  async function markOne(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
    setUnreadCount((c) => Math.max(0, c - 1))
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  }

  async function markAll() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setUnreadCount(0)
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    })
  }

  function handleNotificationClick(n: Notification) {
    if (!n.isRead) markOne(n.id)
    if (n.link) {
      setOpen(false)
      router.push(n.link)
    }
  }

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/70 transition hover:bg-white/5 hover:text-white"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white ring-2 ring-black/60">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl shadow-black/40 z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-semibold text-white">Notifications</span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAll}
                  className="text-xs text-purple-400 hover:text-purple-300 transition"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white transition"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-white/30">
                <Bell className="h-6 w-6" />
                <span className="text-sm">No notifications yet</span>
              </div>
            ) : (
              <ul>
                {notifications.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => handleNotificationClick(n)}
                      className={cn(
                        "w-full text-left px-4 py-3 flex items-start gap-3 border-b border-white/5 transition-colors last:border-0",
                        !n.isRead
                          ? "bg-purple-500/10 hover:bg-purple-500/15"
                          : "hover:bg-white/5"
                      )}
                    >
                      {/* Type icon */}
                      <span className="mt-0.5">{typeIcon(n.type)}</span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "text-xs font-semibold truncate",
                              n.isRead ? "text-white/60" : "text-white"
                            )}
                          >
                            {n.title}
                          </span>
                          <span className="text-[10px] text-white/30 shrink-0">
                            {relativeTime(n.createdAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/50 line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {!n.isRead && (
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
