import { Coins, Sparkles, Flag, ChartNoAxesCombined, Package, ShoppingBag, ImageIcon, type LucideIcon } from "lucide-react"

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
      { label: "Win Gallery", href: "/wins", description: "Community wins" },
      { label: "Support", href: "/support", description: "Help & Contact" },
    ],
  },
  { label: "Opening", href: "/opening", icon: Package },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Leaderboard", href: "/leaderboard", icon: ChartNoAxesCombined },
]
