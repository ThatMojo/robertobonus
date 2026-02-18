import { Coins, Sparkles, Flag, ChartNoAxesCombined, type LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
  children?: { label: string; href: string; description?: string }[]
}

export const mainNavItems: NavItem[] = [
  {
    label: "Casino",
    href: "#deals",
    icon: Coins,
    children: [
      { label: "Bonus Vergleich", href: "/", description: "Die besten Bonusangebote" },
      { label: "Merkur Casinos", href: "/merkur-casinos", description: "Merkur Slots online spielen" },
    ],
  },
  {
    label: "Community",
    href: "#community",
    icon: Sparkles,
    children: [
      { label: "Leaderboard", href: "/leaderboard", description: "Top Spieler Rangliste" },
      { label: "Support", href: "/support", description: "Hilfe & Kontakt" },
    ],
  },
  { label: "Bonushunts", href: "/bonushunts", icon: Flag },
  { label: "Leaderboard", href: "/leaderboard", icon: ChartNoAxesCombined },
]
