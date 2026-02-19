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
import { Star, Sparkles, Zap, Gift, ArrowRight } from "lucide-react"
import { AVATAR_URL, STREAMER_NAME } from "@/lib/constants"

const LINE_FEATURES = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

export default function HeroV5Minimal() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#07040f" }}
      >
        {/* Version badge */}
        <div className="hero-version-badge">Version 5 — Minimalist Premium</div>

        {/* Single subtle ambient orb */}
        <div
          className="orb-ambient absolute pointer-events-none rounded-full"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(88,28,135,0.08) 0%, rgba(109,40,217,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Expanding rings on avatar area */}
        {!prefersReduced && inView && (
          <>
            <div
              className="ring-expand absolute pointer-events-none rounded-full border border-purple-500/10"
              style={{
                top: "50%",
                left: "50%",
                width: 240,
                height: 240,
                transform: "translate(-50%, -50%)",
                animationDelay: "0s",
              }}
            />
            <div
              className="ring-expand absolute pointer-events-none rounded-full border border-purple-500/8"
              style={{
                top: "50%",
                left: "50%",
                width: 240,
                height: 240,
                transform: "translate(-50%, -50%)",
                animationDelay: "1s",
              }}
            />
            <div
              className="ring-expand absolute pointer-events-none rounded-full border border-purple-500/6"
              style={{
                top: "50%",
                left: "50%",
                width: 240,
                height: 240,
                transform: "translate(-50%, -50%)",
                animationDelay: "2s",
              }}
            />
          </>
        )}

        {/* Content — centered column layout */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-28 text-center">
          {/* Avatar — elegant, smaller */}
          <m.div
            className="flex justify-center mb-10"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative inline-block">
              {/* Very thin elegant ring */}
              <div
                className="absolute -inset-2 rounded-full"
                style={{
                  border: "1px solid rgba(168,85,247,0.25)",
                  boxShadow:
                    "0 0 20px rgba(168,85,247,0.1), inset 0 0 20px rgba(168,85,247,0.05)",
                }}
              />
              <div
                className="absolute -inset-4 rounded-full"
                style={{
                  border: "1px solid rgba(168,85,247,0.1)",
                }}
              />
              <Image
                src={AVATAR_URL}
                alt={`${STREAMER_NAME} Avatar`}
                width={100}
                height={100}
                className="relative rounded-full object-cover"
                style={{
                  boxShadow: "0 0 20px rgba(168,85,247,0.2)",
                }}
                priority
              />

              {/* Live badge */}
              <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-purple-900/80 text-purple-200 text-xs font-medium px-2 py-0.5 rounded-full border border-purple-500/20 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Live
              </span>
            </div>
          </m.div>

          {/* Eyebrow */}
          <m.p
            className="text-xs tracking-[0.25em] uppercase text-purple-400/60 mb-8 fade-elegant"
            style={{ animationDelay: "0.3s" }}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Verified by {STREAMER_NAME}
          </m.p>

          {/* Elegant headline with drawn underline */}
          <m.div
            className="mb-6 relative inline-block"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, rgba(233,213,255,0.9), rgba(192,132,252,0.8), rgba(168,85,247,0.9))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Best Casino
              <br />
              Bonus Deals
            </h1>

            {/* Self-drawing underline */}
            <div className="mt-3 h-px w-full relative overflow-hidden">
              <m.div
                className="absolute inset-y-0 left-0 right-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(192,132,252,0.4), transparent)",
                }}
                initial={prefersReduced ? false : { scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </m.div>

          {/* Subtitle */}
          <m.p
            className="text-base text-gray-600 max-w-lg mx-auto mb-12 leading-relaxed"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.85 }}
          >
            {STREAMER_NAME} compares the best online casino bonuses for you.
            Exclusive deposit bonuses, free spins without wagering requirements
            and fair conditions.
          </m.p>

          {/* Features as inline dot-separated text */}
          <m.div
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {LINE_FEATURES.map(({ icon: Icon, label }, i) => (
              <span key={label} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Icon className="w-3.5 h-3.5 text-purple-500/50" />
                  {label}
                </span>
                {i < LINE_FEATURES.length - 1 && (
                  <span className="text-purple-500/20 text-xs">•</span>
                )}
              </span>
            ))}
          </m.div>

          {/* CTA — understated outline button */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.35 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href="#deals"
              className="group inline-flex items-center gap-3 text-purple-300/70 font-medium px-8 py-3.5 rounded-full transition-all duration-500 hover:text-purple-200 hover:border-purple-400/40"
              style={{
                border: "1px solid rgba(168,85,247,0.2)",
                background: "transparent",
                letterSpacing: "0.02em",
              }}
            >
              Discover Bonus Deals
              <span className="arrow-bounce">
                <ArrowRight className="w-4 h-4 opacity-60" />
              </span>
            </a>

            <p className="text-xs text-gray-700 tracking-wide">
              100% free &nbsp;&bull;&nbsp; No registration required
            </p>
          </m.div>
        </div>

        {/* Very subtle bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #07040f, transparent)" }}
        />
      </section>
    </LazyMotion>
  )
}
