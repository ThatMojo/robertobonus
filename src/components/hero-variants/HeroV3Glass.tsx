"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Star, Sparkles, Zap, Gift } from "lucide-react"
import { AVATAR_URL, STREAMER_NAME } from "@/lib/constants"

const features = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

function GlassFeatureCard({
  icon: Icon,
  label,
  delay,
  floatClass,
}: {
  icon: React.ElementType
  label: string
  delay: number
  floatClass: string
}) {
  return (
    <m.div
      className={`glass-card ${floatClass} flex items-center gap-3 px-5 py-3 rounded-2xl cursor-pointer`}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.06,
        background: "rgba(255,255,255,0.08)",
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: "rgba(168,85,247,0.15)",
          border: "1px solid rgba(168,85,247,0.3)",
        }}
      >
        <Icon className="w-4 h-4 text-purple-300" />
      </div>
      <span className="text-sm font-medium text-white/80">{label}</span>
    </m.div>
  )
}

function WaveSeparator() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-20"
        style={{ display: "block" }}
      >
        <path
          d="M0,40 C200,70 400,10 600,40 C800,70 1000,10 1200,40 L1200,80 L0,80 Z"
          fill="rgba(10,4,30,0.8)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,40 C200,70 400,10 600,40 C800,70 1000,10 1200,40 L1200,80 L0,80 Z;
              M0,50 C200,20 400,65 600,45 C800,25 1000,65 1200,50 L1200,80 L0,80 Z;
              M0,35 C200,65 400,20 600,50 C800,65 1000,20 1200,40 L1200,80 L0,80 Z;
              M0,40 C200,70 400,10 600,40 C800,70 1000,10 1200,40 L1200,80 L0,80 Z
            "
          />
        </path>
      </svg>
    </div>
  )
}

export default function HeroV3Glass() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReduced) return
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX.set(((e.clientX - cx) / rect.width) * 18)
      mouseY.set(((e.clientY - cy) / rect.height) * 12)
    },
    [mouseX, mouseY, prefersReduced]
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el || prefersReduced) return
    el.addEventListener("mousemove", handleMouseMove)
    return () => el.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove, prefersReduced])

  const floatClasses = ["float-slow", "float-medium", "float-fast", "float-slow"]

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#070314" }}
      >
        {/* Version badge */}
        <div className="hero-version-badge">Version 3 — Glassmorphism Float</div>

        {/* Animated mesh gradient orbs */}
        <div
          className="mesh-1 absolute pointer-events-none rounded-full blur-[80px]"
          style={{
            top: "10%",
            left: "5%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(88,28,135,0.35) 0%, rgba(109,40,217,0.15) 50%, transparent 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="mesh-2 absolute pointer-events-none rounded-full blur-[80px]"
          style={{
            bottom: "5%",
            right: "0%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(59,7,100,0.4) 0%, rgba(126,34,206,0.2) 50%, transparent 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="mesh-3 absolute pointer-events-none rounded-full blur-[60px]"
          style={{
            top: "40%",
            right: "20%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />

        {/* Content with parallax */}
        <m.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24"
          style={
            prefersReduced
              ? {}
              : { x: springX, y: springY, willChange: "transform" }
          }
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Glass orb with floating avatar */}
            <m.div
              className="flex-shrink-0 relative float-slow"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.6, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform" }}
            >
              {/* Iridescent orb behind */}
              <div
                className="absolute rounded-full iridescent"
                style={{
                  inset: -20,
                  filter: "blur(16px)",
                  opacity: 0.6,
                  willChange: "background-position",
                }}
              />
              {/* Glass sphere */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: -8,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.4)",
                }}
              />

              <Image
                src={AVATAR_URL}
                alt={`${STREAMER_NAME} Avatar`}
                width={155}
                height={155}
                className="relative rounded-full object-cover"
                style={{
                  boxShadow: "0 0 40px rgba(168,85,247,0.3)",
                }}
                priority
              />

              {/* Live badge */}
              <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-purple-700/90 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-[#070314] shadow-lg backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </m.div>

            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow glass pill */}
              <m.div
                className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6"
                initial={prefersReduced ? false : { opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200 font-medium">
                  Verified by {STREAMER_NAME}
                </span>
              </m.div>

              {/* Headline */}
              <m.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                <span
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, #e9d5ff, #c084fc, #a855f7, #ddd6fe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 20px rgba(168,85,247,0.3))",
                  }}
                >
                  The Best Casino
                  <br />
                  Bonus Deals
                </span>
              </m.h1>

              {/* Subtitle */}
              <m.p
                className="text-base sm:text-lg text-purple-200/50 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                {STREAMER_NAME} compares the best online casino bonuses for you.
                Exclusive deposit bonuses, free spins without wagering requirements
                and fair conditions. All deals personally tested and recommended.
              </m.p>

              {/* Glass feature cards */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {features.map(({ icon, label }, i) => (
                  <GlassFeatureCard
                    key={label}
                    icon={icon}
                    label={label}
                    delay={0.7 + i * 0.1}
                    floatClass={floatClasses[i]}
                  />
                ))}
              </div>

              {/* CTA glass button */}
              <m.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#deals"
                  className="group relative inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(109,40,217,0.4))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(168,85,247,0.4)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(168,85,247,0.2)",
                  }}
                >
                  <Gift className="w-5 h-5 text-purple-200" />
                  Discover Bonus Deals
                </a>
                <span className="text-sm text-purple-300/40">
                  100% free &bull; No registration required
                </span>
              </m.div>
            </div>
          </div>
        </m.div>

        {/* Wave separator at bottom */}
        <WaveSeparator />
      </section>
    </LazyMotion>
  )
}
