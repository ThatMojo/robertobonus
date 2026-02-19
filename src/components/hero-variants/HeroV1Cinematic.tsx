"use client"

import { useEffect, useRef, useState } from "react"
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

const HEADLINE = "The Best Casino Bonus Deals"
const SUBTITLE = `${STREAMER_NAME} compares the best online casino bonuses for you. Exclusive deposit bonuses, free spins without wagering requirements and fair conditions. All deals personally tested and recommended.`

const features = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315]

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timeout)
  }, [inView, delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 38)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && (
        <span
          className="inline-block w-0.5 h-[0.85em] bg-purple-400 ml-0.5 align-middle"
          style={{ animation: "typewriter-cursor 0.8s step-end infinite" }}
        />
      )}
    </span>
  )
}

export default function HeroV1Cinematic() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#040208" }}
      >
        {/* Version badge */}
        <div className="hero-version-badge">Version 1 — Cinematic Spotlight</div>

        {/* Deep dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Radial spotlight centered on avatar position */}
        <div
          className="absolute pointer-events-none spotlight-glow"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, rgba(109,40,217,0.08) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Light rays */}
        {!prefersReduced &&
          RAYS.map((angle, i) => (
            <div
              key={angle}
              className="light-ray"
              style={
                {
                  "--ray-angle": `${angle}deg`,
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  animationDelay: `${i * 0.4}s`,
                  height: `${160 + (i % 3) * 40}px`,
                } as React.CSSProperties
              }
            />
          ))}

        {/* Ambient orbs */}
        <div
          className="absolute pointer-events-none rounded-full blur-[120px]"
          style={{
            top: "20%",
            left: "15%",
            width: 300,
            height: 300,
            background: "rgba(88,28,135,0.12)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full blur-[100px]"
          style={{
            bottom: "20%",
            right: "15%",
            width: 250,
            height: 250,
            background: "rgba(109,40,217,0.1)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Avatar */}
          <m.div
            className="flex-shrink-0 relative"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Spotlight cone behind avatar */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 280,
                height: 280,
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(20px)",
              }}
            />

            {/* Avatar ring */}
            <div
              className="absolute -inset-2 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(168,85,247,0.8), rgba(109,40,217,0.3), rgba(168,85,247,0.8))",
                filter: "blur(4px)",
              }}
            />
            <div className="absolute -inset-1 rounded-full bg-[#040208]" />

            <Image
              src={AVATAR_URL}
              alt={`${STREAMER_NAME} Avatar`}
              width={160}
              height={160}
              className="relative rounded-full object-cover shadow-[0_0_40px_rgba(168,85,247,0.5)]"
              priority
            />

            {/* Live badge */}
            <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-purple-700 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-[#040208] shadow-lg">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
          </m.div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <m.div
              className="inline-flex items-center gap-2 mb-6"
              initial={prefersReduced ? false : { opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium tracking-widest uppercase">
                Verified by {STREAMER_NAME}
              </span>
            </m.div>

            {/* Typewriter headline */}
            <m.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span
                className="bg-gradient-to-r from-purple-300 via-violet-200 to-purple-100 bg-clip-text text-transparent"
                style={{ textShadow: "0 0 40px rgba(168,85,247,0.3)" }}
              >
                <TypewriterText text={HEADLINE} delay={0.5} />
              </span>
            </m.h1>

            {/* Subtitle */}
            <m.p
              className="text-base sm:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {SUBTITLE}
            </m.p>

            {/* Feature badges — slide in from sides */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {features.map(({ icon: Icon, label }, i) => (
                <m.div
                  key={label}
                  className="flex items-center gap-2 border border-purple-500/20 bg-purple-900/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-300"
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }
                  }
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 1.8 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.5)" }}
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  {label}
                </m.div>
              ))}
            </div>

            {/* CTA */}
            <m.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 2.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <div className="relative">
                <a
                  href="#deals"
                  className="cta-pulse-ring relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] transition-all duration-300 hover:scale-[1.03]"
                >
                  <Gift className="w-5 h-5" />
                  Discover Bonus Deals
                </a>
              </div>
              <span className="text-sm text-gray-600">
                100% free &bull; No registration required
              </span>
            </m.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040208] to-transparent pointer-events-none" />
      </section>
    </LazyMotion>
  )
}
