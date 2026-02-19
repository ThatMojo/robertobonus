import Link from "next/link"
import { Youtube, Instagram, Heart } from "lucide-react"
import { SITE_NAME, SOCIAL_LINKS, STREAMER_NAME } from "@/lib/constants"
import KickIcon from "@/components/icons/KickIcon"

const socialLinks = [
  { icon: KickIcon, href: SOCIAL_LINKS.kick, label: "Kick", hoverColor: "hover:text-emerald-400" },
  { icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube", hoverColor: "hover:text-red-400" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram", hoverColor: "hover:text-pink-400" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Brand */}
        <div className="flex flex-col items-center text-center gap-4">
          <Link href="/" className="inline-flex items-center">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </Link>
          <p className="text-sm text-white/40 max-w-md">
            The best casino bonus deals, curated by {STREAMER_NAME}. Find the best conditions.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/30 ${social.hoverColor} transition-colors`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-purple-500" /> by {STREAMER_NAME}
          </p>
        </div>

        {/* Responsible gambling disclaimer */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <p className="text-xs text-white/25 text-center leading-relaxed">
            18+ | Gambling can be addictive. Please gamble responsibly. For help visit www.begambleaware.org.
          </p>
        </div>
      </div>
    </footer>
  )
}
