import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Registrieren",
  description: `Erstelle ein Konto bei ${SITE_NAME} und werde Teil der Community.`,
}

export default function RegisterPage() {
  return <RegisterForm />
}
