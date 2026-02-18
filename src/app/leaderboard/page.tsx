import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import LeaderboardContent from "./LeaderboardContent"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: `Die Top-Spieler der ${SITE_NAME} Community. Sieh dir die Rangliste an und vergleiche dich mit anderen.`,
}

export default function LeaderboardPage() {
  return <LeaderboardContent />
}
