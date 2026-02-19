"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react"
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"
import { mainNavItems } from "@/data/navigation"
import { cn } from "@/lib/utils"
import MobileMenu from "./MobileMenu"
import NotificationBell from "@/components/shared/NotificationBell"
import KickIcon from "@/components/icons/KickIcon"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"

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
            {/* Left: Logo + Kick */}
            <div className="flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(90deg,theme(colors.purple.400)_0%,theme(colors.purple.400)_45%,white_50%,theme(colors.purple.400)_55%,theme(colors.purple.400)_100%)] bg-[length:200%_100%] bg-clip-text px-2 py-2 text-2xl font-extrabold tracking-wide text-transparent transition-all duration-[800ms] ease-in-out hover:bg-[position:100%_0]"
              >
                {SITE_NAME}
              </Link>

              {/* Kick badge moved to right side */}
            </div>

            {/* Desktop Nav — disabled for now */}
            <nav className="hidden items-center gap-1">
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
            <div className="flex items-center gap-3">
              {/* Kick badge */}
              <a
                href={SOCIAL_LINKS.kick}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-5 py-2 text-emerald-400 ring-1 ring-emerald-500/30 backdrop-blur-sm transition hover:bg-emerald-500/25 hover:text-emerald-300"
                aria-label="Kick"
              >
                <KickIcon className="h-6 w-6" />
                <span className="text-base font-bold">Kick</span>
              </a>

              {/* Menu + Login disabled for now
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              */}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </LazyMotion>
  )
}
