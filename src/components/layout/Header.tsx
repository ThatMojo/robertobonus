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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-shadow">
                R
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </Link>

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
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 px-3 py-1.5 text-sm font-medium text-purple-300 hover:bg-purple-600/30 hover:text-purple-200 transition-all"
              >
                <Twitch className="h-4 w-4" />
                <span>Live</span>
              </a>

              {session ? (
                <div className="hidden sm:flex items-center gap-2">
                  {isAdmin && (
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Abmelden
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
                >
                  Anmelden
                </Link>
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
