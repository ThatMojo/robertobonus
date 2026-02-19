import type { Metadata } from "next"
import { ShoppingBag } from "lucide-react"
import ComingSoon from "@/components/shared/ComingSoon"

export const metadata: Metadata = {
  title: "Points Shop",
  description: "Spend your earned points on exclusive rewards. Coming soon!",
}

export default function ShopPage() {
  return (
    <ComingSoon
      title="Points Shop"
      description="Spend your hard-earned points on exclusive rewards, merch, and bonus deals. The shop is being stocked — check back soon!"
      icon={<ShoppingBag className="w-8 h-8 text-purple-400" />}
    />
  )
}
