import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import BonushuntsContent from "./BonushuntsContent"

export const metadata: Metadata = {
  title: "Bonushunts",
  description: `Alle Bonushunt Sessions von ${SITE_NAME}. Verfolge Live Hunts, Ergebnisse und Highlights.`,
}

export default function BonushuntsPage() {
  return <BonushuntsContent />
}
