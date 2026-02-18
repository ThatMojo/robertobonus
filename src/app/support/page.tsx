import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import SupportContent from "./SupportContent"

export const metadata: Metadata = {
  title: "Support & Hilfe",
  description: `Hast du Fragen? Finde Antworten in unseren FAQ oder kontaktiere das ${SITE_NAME} Team direkt.`,
}

export default function SupportPage() {
  return <SupportContent />
}
