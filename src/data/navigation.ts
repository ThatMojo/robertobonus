import { Coins, Shield, HelpCircle, type LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
  children?: { label: string; href: string; description?: string }[]
}

export const mainNavItems: NavItem[] = [
  {
    label: "Casinos",
    href: "#deals",
    icon: Coins,
  },
  {
    label: "Providers",
    href: "#providers",
    icon: Shield,
  },
  {
    label: "FAQ",
    href: "#faq",
    icon: HelpCircle,
  },
]

// Disabled pages — re-enable later:
// { label: "Community", href: "#community", icon: Sparkles, children: [
//   { label: "Leaderboard", href: "/leaderboard", description: "Top player rankings" },
//   { label: "Win Gallery", href: "/wins", description: "Community wins" },
//   { label: "Support", href: "/support", description: "Help & Contact" },
// ]},
// { label: "Opening", href: "/opening", icon: Package },
// { label: "Shop", href: "/shop", icon: ShoppingBag },
// { label: "Leaderboard", href: "/leaderboard", icon: ChartNoAxesCombined },
