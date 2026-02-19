import type { Metadata } from "next"
import { Flag } from "lucide-react"
import ComingSoon from "@/components/shared/ComingSoon"

export const metadata: Metadata = {
  title: "Bonushunts",
  description: "Bonus Hunt sessions are coming soon. Follow live hunts, results, and highlights.",
}

export default function BonushuntsPage() {
  return (
    <ComingSoon
      title="Bonus Hunts"
      description="Live bonus hunt sessions, results, and highlights are coming soon. Follow Roberto's stream to catch the action live!"
      icon={<Flag className="w-8 h-8 text-purple-400" />}
    />
  )
}
