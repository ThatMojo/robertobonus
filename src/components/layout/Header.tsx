"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Twitch, LayoutDashboard, LogOut } from "lucide-react"
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"
import { mainNavItems } from "@/data/navigation"
import { cn } from "@/lib/utils"
import MobileMenu from "./MobileMenu"

function useTwitchLive() {
  const [live, setLive] = useState(false)
  const [viewers, setViewers] = useState(0)

  useEffect(() => {
    let mounted = true

    async function check() {
      try {
        const res = await fetch("/api/twitch/live")
        if (!res.ok) return
        const data = await res.json()
        if (mounted) {
          setLive(data.live)
          setViewers(data.viewers ?? 0)
        }
      } catch {
        // silently fail
      }
    }

    check()
    const interval = setInterval(check, 60_000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return { live, viewers }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"
  const { live } = useTwitchLive()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-500/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Twitch */}
            <div className="flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(90deg,theme(colors.purple.400)_0%,theme(colors.purple.400)_45%,white_50%,theme(colors.purple.400)_55%,theme(colors.purple.400)_100%)] bg-[length:200%_100%] bg-clip-text px-2 py-2 text-2xl font-extrabold tracking-wide text-transparent transition-all duration-[800ms] ease-in-out hover:bg-[position:100%_0]"
              >
                {SITE_NAME}
              </Link>

              {/* Twitch Live Indicator */}
              <a
                href={SOCIAL_LINKS.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "ml-2 inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-xs font-semibold ring-1 backdrop-blur-sm transition",
                  live
                    ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30 hover:bg-emerald-500/25"
                    : "bg-black/30 text-zinc-400 ring-white/5 hover:bg-black/40 hover:text-zinc-300"
                )}
                aria-label={live ? "Twitch live" : "Twitch offline"}
              >
                {live ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-zinc-600 shadow-inner" />
                )}
                <Twitch className={cn("h-3.5 w-3.5", live ? "text-emerald-400" : "text-zinc-400")} />
                <span className="hidden sm:inline">{live ? "Live" : "Offline"}</span>
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-purple-400"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <m.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-2 shadow-xl"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-white/40 mt-0.5">{child.description}</div>
                            )}
                          </Link>
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {session ? (
                <div className="hidden sm:flex items-center gap-2">
                  {isAdmin && (
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Abmelden
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-md border border-purple-400/40 bg-black/40 px-3 py-1.5 text-xs font-medium text-purple-100 shadow-sm transition hover:border-purple-400 hover:bg-purple-500/10 hover:text-white"
                  >
                    Einloggen
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 px-3 py-1.5 text-xs font-semibold text-black shadow-[0_0_18px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/40 transition hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(168,85,247,0.6)] active:translate-y-px"
                  >
                    Registrieren
                  </Link>
                </div>
              )}

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </LazyMotion>
  )
}
