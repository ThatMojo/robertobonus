"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Mail, Lock, User, Gift, Chrome, MessageCircle, Tv } from "lucide-react"
import ParticleBackground from "@/components/shared/ParticleBackground"
import GlassCard from "@/components/shared/GlassCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referralCode }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "An error occurred.")
        return
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Registration succeeded but auto-login failed, redirect to login
        router.push("/login")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/" })
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <ParticleBackground />

      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8">
            {/* Logo / Site Name */}
            <div className="text-center mb-8">
              <m.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              >
                {SITE_NAME}
              </m.h1>
              <p className="text-sm text-white/50 mt-2">
                Create your account
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </m.div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/70">
                  <User className="size-4" />
                  Username
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">
                  <Mail className="size-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/70">
                  <Lock className="size-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/70">
                  <Lock className="size-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode" className="text-white/70">
                  <Gift className="size-4" />
                  Referral Code
                </Label>
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="Optional: your referrer's code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
                <p className="text-xs text-white/30">
                  Optional: your referrer&apos;s code
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full h-11 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold",
                  "hover:from-purple-500 hover:to-purple-400 transition-all duration-300",
                  "shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative my-6 flex items-center gap-4">
              <Separator className="flex-1 bg-white/10" />
              <span className="text-xs text-white/40 uppercase tracking-wider">
                or
              </span>
              <Separator className="flex-1 bg-white/10" />
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth("google")}
                className="w-full h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Chrome className="size-5" />
                Sign up with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth("discord")}
                className="w-full h-11 border-white/10 bg-white/5 text-white hover:bg-[#5865F2]/20 hover:border-[#5865F2]/30 hover:text-white"
              >
                <MessageCircle className="size-5" />
                Sign up with Discord
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth("twitch")}
                className="w-full h-11 border-white/10 bg-white/5 text-white hover:bg-[#9146FF]/20 hover:border-[#9146FF]/30 hover:text-white"
              >
                <Tv className="size-5" />
                Sign up with Twitch
              </Button>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </GlassCard>
        </m.div>
      </LazyMotion>
    </div>
  )
}
