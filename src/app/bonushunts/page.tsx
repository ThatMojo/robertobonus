import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import BonushuntsContent from "./BonushuntsContent"

export const metadata: Metadata = {
  title: "Bonushunts",
  description: `All Bonus Hunt Sessions from ${SITE_NAME}. Follow live hunts, results, and highlights.`,
}

export default function BonushuntsPage() {
  return <BonushuntsContent />
}
