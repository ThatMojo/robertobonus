"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { Star, Sparkles, Zap, Gift } from "lucide-react"
import { AVATAR_URL, STREAMER_NAME } from "@/lib/constants"

const features = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

function NeonCorners({ color = "#a855f7" }: { color?: string }) {
  return (
    <>
      {/* Top-left corner */}
      <svg className="absolute top-0 left-0 w-6 h-6" viewBox="0 0 24 24">
        <path
          d="M 24 2 L 2 2 L 2 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="48"
          strokeDashoffset="48"
          style={{
            animation: "neon-border-trace 1s ease forwards",
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
      </svg>
      {/* Bottom-right corner */}
      <svg className="absolute bottom-0 right-0 w-6 h-6" viewBox="0 0 24 24">
        <path
          d="M 0 22 L 22 22 L 22 0"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="48"
          strokeDashoffset="48"
          style={{
            animation: "neon-border-trace 1s ease 0.3s forwards",
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
      </svg>
    </>
  )
}

function HolographicCard({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType
  label: string
  delay: number
}) {
  return (
    <m.div
      className="relative flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer"
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.05,
        rotateY: 8,
        rotateX: -4,
        z: 20,
        transition: { duration: 0.2 },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      <NeonCorners />
      {/* Card bg */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,255,255,0.04))",
          border: "1px solid rgba(168,85,247,0.25)",
          boxShadow:
            "inset 0 0 20px rgba(168,85,247,0.05), 0 0 15px rgba(168,85,247,0.1)",
        }}
      />
      <Icon
        className="relative z-10 w-4 h-4"
        style={{
          color: "#c084fc",
          filter: "drop-shadow(0 0 6px rgba(168,85,247,0.8))",
        }}
      />
      <span
        className="relative z-10 text-purple-200 font-medium"
        style={{ textShadow: "0 0 8px rgba(168,85,247,0.5)" }}
      >
        {label}
      </span>
    </m.div>
  )
}

export default function HeroV2Neon() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#03010a" }}
      >
        {/* Version badge */}
        <div className="hero-version-badge">Version 2 — Neon Cyber</div>

        {/* Moving grid background */}
        <div
          className="cyber-grid absolute inset-0 pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />

        {/* Corner glows */}
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(0,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Avatar with rotating neon rings */}
          <m.div
            className="flex-shrink-0 relative"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer rotating ring */}
            <div
              className="absolute rotating-ring"
              style={{
                inset: -12,
                borderRadius: "50%",
                border: "2px solid transparent",
                background:
                  "conic-gradient(from 0deg, #a855f7, transparent, #06b6d4, transparent, #a855f7) border-box",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
                filter: "drop-shadow(0 0 8px rgba(168,85,247,0.8))",
                willChange: "transform",
              }}
            />
            {/* Inner rotating ring reverse */}
            <div
              className="absolute rotating-ring-reverse"
              style={{
                inset: -20,
                borderRadius: "50%",
                border: "1px solid transparent",
                background:
                  "conic-gradient(from 180deg, rgba(168,85,247,0.4), transparent, rgba(6,182,212,0.4), transparent, rgba(168,85,247,0.4)) border-box",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
                filter: "drop-shadow(0 0 4px rgba(6,182,212,0.5))",
                willChange: "transform",
              }}
            />

            {/* Hexagon clip decoration */}
            <div
              className="absolute -inset-1 rounded-full"
              style={{
                background: "rgba(168,85,247,0.15)",
                filter: "blur(8px)",
              }}
            />

            <Image
              src={AVATAR_URL}
              alt={`${STREAMER_NAME} Avatar`}
              width={150}
              height={150}
              className="relative rounded-full object-cover"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(168,85,247,0.6), 0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.2)",
              }}
              priority
            />

            {/* Live badge */}
            <span
              className="absolute -bottom-1 -right-1 flex items-center gap-1 text-white text-xs font-bold px-2.5 py-1 rounded-sm border border-purple-500/60"
              style={{
                background: "rgba(88,28,135,0.9)",
                boxShadow: "0 0 10px rgba(168,85,247,0.6)",
                textShadow: "0 0 6px rgba(168,85,247,0.8)",
              }}
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
          </m.div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <m.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-sm"
              style={{
                border: "1px solid rgba(168,85,247,0.4)",
                background: "rgba(168,85,247,0.08)",
                boxShadow:
                  "0 0 20px rgba(168,85,247,0.1), inset 0 0 20px rgba(168,85,247,0.05)",
              }}
              initial={prefersReduced ? false : { opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{
                  color: "#c084fc",
                  filter: "drop-shadow(0 0 6px rgba(168,85,247,0.9))",
                }}
              />
              <span
                className="text-sm font-medium text-purple-300"
                style={{ textShadow: "0 0 8px rgba(168,85,247,0.6)" }}
              >
                Verified by {STREAMER_NAME}
              </span>
            </m.div>

            {/* Glitch headline */}
            <m.div
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h1
                className="glitch-text text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-purple-300 neon-text"
                data-text="The Best Casino Bonus Deals"
                style={{
                  textShadow:
                    "0 0 10px rgba(168,85,247,0.8), 0 0 30px rgba(168,85,247,0.4)",
                }}
              >
                The Best Casino Bonus Deals
              </h1>
            </m.div>

            {/* Subtitle */}
            <m.p
              className="text-base sm:text-lg text-purple-900/80 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
              style={{ color: "rgba(196,181,253,0.6)" }}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {STREAMER_NAME} compares the best online casino bonuses for you.
              Exclusive deposit bonuses, free spins without wagering requirements
              and fair conditions. All deals personally tested and recommended.
            </m.p>

            {/* Holographic feature cards */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
              style={{ perspective: "1000px" }}
            >
              {features.map(({ icon, label }, i) => (
                <HolographicCard
                  key={label}
                  icon={icon}
                  label={label}
                  delay={0.9 + i * 0.12}
                />
              ))}
            </div>

            {/* CTA neon flicker */}
            <m.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#deals"
                className="neon-flicker relative inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-sm transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(88,28,135,0.9), rgba(109,40,217,0.8))",
                  border: "1px solid rgba(168,85,247,0.7)",
                  textShadow: "0 0 10px rgba(168,85,247,0.8)",
                }}
              >
                <Gift
                  className="w-5 h-5"
                  style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.9))" }}
                />
                Discover Bonus Deals
              </a>
              <span style={{ color: "rgba(168,85,247,0.4)", fontSize: "0.875rem" }}>
                100% free &bull; No registration
              </span>
            </m.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #03010a, transparent)",
          }}
        />
      </section>
    </LazyMotion>
  )
}
