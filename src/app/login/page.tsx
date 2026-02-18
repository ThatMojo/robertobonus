import type { Metadata } from "next"
import LoginForm from "./LoginForm"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Anmelden",
  description: `Melde dich bei ${SITE_NAME} an, um exklusive Casino Bonus Deals zu entdecken.`,
}

export default function LoginPage() {
  return <LoginForm />
}
