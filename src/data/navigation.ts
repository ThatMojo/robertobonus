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
      { label: "Bonus Comparison", href: "/", description: "The best bonus deals" },
      { label: "Merkur Casinos", href: "/merkur-casinos", description: "Play Merkur slots online" },
    ],
  },
  {
    label: "Community",
    href: "#community",
    icon: Sparkles,
    children: [
      { label: "Leaderboard", href: "/leaderboard", description: "Top player rankings" },
      { label: "Support", href: "/support", description: "Help & Contact" },
    ],
  },
  { label: "Bonushunts", href: "/bonushunts", icon: Flag },
  { label: "Leaderboard", href: "/leaderboard", icon: ChartNoAxesCombined },
]
