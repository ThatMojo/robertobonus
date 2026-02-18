import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Register",
  description: `Create an account at ${SITE_NAME} and become part of the community.`,
}

export default function RegisterPage() {
  return <RegisterForm />
}
