import type { Metadata } from "next"
import LoginForm from "./LoginForm"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to ${SITE_NAME} to discover exclusive casino bonus deals.`,
}

export default function LoginPage() {
  return <LoginForm />
}
