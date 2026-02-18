import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/constants"
import SupportContent from "./SupportContent"

export const metadata: Metadata = {
  title: "Support & Help",
  description: `Have questions? Find answers in our FAQ or contact the ${SITE_NAME} team directly.`,
}

export default function SupportPage() {
  return <SupportContent />
}
