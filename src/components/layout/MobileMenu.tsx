"use client"

import Link from "next/link"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Twitch, Youtube, Instagram } from "lucide-react"
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"
import { mainNavItems } from "@/data/navigation"

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] bg-[#0a0a1f]/95 backdrop-blur-xl border-l border-white/10 p-0">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {mainNavItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.icon && <item.icon className="h-4 w-4 text-purple-400" />}
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 pl-10 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-6 py-4 border-t border-white/10 space-y-4">
            <Link
              href="/login"
              onClick={onClose}
              className="block w-full text-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Login
            </Link>
            <div className="flex items-center justify-center gap-4">
              <a href={SOCIAL_LINKS.twitch} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-purple-400 transition-colors">
                <Twitch className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-red-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
