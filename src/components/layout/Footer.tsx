import Link from "next/link"
import { Twitch, Youtube, Instagram, Heart } from "lucide-react"
import { SITE_NAME, SOCIAL_LINKS, STREAMER_NAME } from "@/lib/constants"

const footerLinks = {
  casino: [
    { label: "Bonus Vergleich", href: "/" },
    { label: "Merkur Casinos", href: "/merkur-casinos" },
    { label: "Bonushunts", href: "/bonushunts" },
  ],
  community: [
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Support", href: "/support" },
    { label: "Login", href: "/login" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
}

const socialLinks = [
  { icon: Twitch, href: SOCIAL_LINKS.twitch, label: "Twitch", hoverColor: "hover:text-purple-400" },
  { icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube", hoverColor: "hover:text-red-400" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram", hoverColor: "hover:text-pink-400" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                R
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-white/40 mb-4 max-w-xs">
              Die besten Casino Bonusangebote, kuratiert von {STREAMER_NAME}. Finde exklusive Deals mit den besten Konditionen.
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

          {/* Casino Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Casino</h3>
            <ul className="space-y-2">
              {footerLinks.casino.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Rechtliches</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-purple-500" /> by {STREAMER_NAME}
          </p>
        </div>

        {/* Responsible gambling disclaimer */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <p className="text-xs text-white/25 text-center leading-relaxed">
            18+ | Glücksspiel kann süchtig machen. Bitte spiele verantwortungsvoll. Hilfe findest du bei der BZgA unter 0800 1 37 27 00 (kostenlos). Alle genannten Bonusangebote unterliegen den jeweiligen AGB der Anbieter.
          </p>
        </div>
      </div>
    </footer>
  )
}
