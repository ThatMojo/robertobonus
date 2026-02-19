import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import OpeningContent from "./OpeningContent"

export const metadata: Metadata = {
  title: "Daily Case Opening",
  description: `Open your free daily case and win points on ${SITE_NAME}. Common, Rare, and Legendary rewards every 24 hours.`,
}

export default function OpeningPage() {
  return <OpeningContent />
}
