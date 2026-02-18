import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import LeaderboardContent from "./LeaderboardContent"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: `The top players of the ${SITE_NAME} community. Check the rankings and compare yourself with others.`,
}

export default function LeaderboardPage() {
  return <LeaderboardContent />
}
