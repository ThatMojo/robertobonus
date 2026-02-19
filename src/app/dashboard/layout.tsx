"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Tag,
  Users,
  Flame,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DashboardLangProvider, useDashboardLang } from "./DashboardLangContext"
import { t } from "./translations"

function SidebarContent({
  pathname,
  onNavClick,
}: {
  pathname: string
  onNavClick?: () => void
}) {
  const { lang, setLang } = useDashboardLang()

  const navItems = [
    {
      label: t.sidebar.dashboard[lang],
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: t.sidebar.deals[lang],
      href: "/dashboard/deals",
      icon: Tag,
      exact: false,
    },
    {
      label: t.sidebar.users[lang],
      href: "/dashboard/users",
      icon: Users,
      exact: false,
    },
    {
      label: t.sidebar.bonushunts[lang],
      href: "/dashboard/bonushunts",
      icon: Flame,
      exact: false,
    },
  ]

  return (
    <div className="flex h-full flex-col">
      {/* Branding */}
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <span className="text-lg font-semibold tracking-tight text-white">
          Roberto<span className="text-purple-400">bonus</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-500/10 text-purple-400"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-purple-400" : "text-white/40"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-3 py-4 space-y-2">
        {/* Language toggle */}
        <div className="flex items-center gap-1 px-3 py-1">
          <button
            type="button"
            onClick={() => setLang("de")}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-semibold transition-colors",
              lang === "de"
                ? "bg-purple-500 text-white"
                : "text-white/40 hover:text-white/70"
            )}
          >
            DE
          </button>
          <span className="text-white/20 text-xs">|</span>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-semibold transition-colors",
              lang === "en"
                ? "bg-purple-500 text-white"
                : "text-white/40 hover:text-white/70"
            )}
          >
            EN
          </button>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          onClick={onNavClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {t.sidebar.backToSite[lang]}
        </Link>
      </div>
    </div>
  )
}

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#050210]">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0d0815] lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#0d0815] transition-transform duration-200 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          pathname={pathname}
          onNavClick={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex h-16 items-center border-b border-white/10 bg-[#0d0815] px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 text-base font-semibold text-white">
            Roberto<span className="text-purple-400">bonus</span>
          </span>
          {sidebarOpen && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLangProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardLangProvider>
  )
}
