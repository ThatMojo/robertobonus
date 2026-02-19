"use client"

import { useRef, useMemo } from "react"
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
import { useState, useEffect } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

const features = [
  { icon: Star, label: "Exclusive Deals" },
  { icon: Zap, label: "Non-Sticky Bonus" },
  { icon: Gift, label: "Free Spins" },
  { icon: Sparkles, label: "Merkur & Novoline" },
]

const HEADLINE_WORDS = ["The", "Best", "Casino", "Bonus", "Deals"]

// Pre-generate burst particles with deterministic values
const BURST_PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2
  const radius = 80 + (i % 4) * 40
  const size = 6 + (i % 3) * 6
  return {
    id: i,
    tx: Math.cos(angle) * radius,
    ty: Math.sin(angle) * radius,
    size,
    color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#7c3aed" : "#c084fc",
    delay: (i % 5) * 0.05,
    duration: 0.8 + (i % 3) * 0.3,
  }
})

function IntenseParticles() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: false as const,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: { value: ["#a855f7", "#7c3aed", "#c084fc", "#8b5cf6"] },
        links: {
          color: "#a855f7",
          distance: 120,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none" as const,
          random: true,
          outModes: { default: "bounce" as const },
        },
        number: { density: { enable: true }, value: 60 },
        opacity: { value: { min: 0.08, max: 0.3 } },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  )

  if (!init) return null

  return (
    <Particles
      id="tsparticles-v4"
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      options={options}
    />
  )
}

export default function HeroV4Explosion() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  const wordDirections = [
    { x: -200, y: -150 },
    { x: 0, y: -200 },
    { x: 200, y: -150 },
    { x: -180, y: 150 },
    { x: 180, y: 150 },
  ]

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#050210" }}
      >
        {/* Version badge */}
        <div className="hero-version-badge">Version 4 — Particle Explosion</div>

        {/* Intense particle system */}
        {!prefersReduced && <IntenseParticles />}

        {/* Background radial burst */}
        <m.div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(88,28,135,0.2) 0%, rgba(109,40,217,0.1) 30%, transparent 60%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Avatar — burst scale in */}
          <div className="flex-shrink-0 relative">
            {/* Burst particles */}
            {!prefersReduced && inView &&
              BURST_PARTICLES.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none particle-burst"
                  style={
                    {
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      top: "50%",
                      left: "50%",
                      marginTop: -p.size / 2,
                      marginLeft: -p.size / 2,
                      "--tx-start": "0px",
                      "--ty-start": "0px",
                      "--tx-end": `${p.tx}px`,
                      "--ty-end": `${p.ty}px`,
                      "--scale-end": 0,
                      "--delay": `${p.delay}s`,
                      "--duration": `${p.duration}s`,
                      boxShadow: `0 0 6px ${p.color}`,
                      willChange: "transform, opacity",
                    } as React.CSSProperties
                  }
                />
              ))}

            {/* Outer glow ring */}
            <m.div
              className="absolute -inset-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
                filter: "blur(12px)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.6] } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            />

            <m.div
              initial={prefersReduced ? false : { scale: 0, rotate: -15 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <Image
                src={AVATAR_URL}
                alt={`${STREAMER_NAME} Avatar`}
                width={160}
                height={160}
                className="relative rounded-full object-cover ring-4 ring-purple-500/60"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(168,85,247,0.3)",
                  willChange: "transform",
                }}
                priority
              />
            </m.div>

            {/* Live badge */}
            <m.span
              className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-[#050210] shadow-lg"
              initial={prefersReduced ? false : { scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{
                delay: 0.9,
                type: "spring",
                stiffness: 300,
                damping: 12,
              }}
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </m.span>
          </div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <m.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">
                Verified by {STREAMER_NAME}
              </span>
            </m.div>

            {/* Headline — words fly in from directions */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1">
                {HEADLINE_WORDS.map((word, i) => (
                  <m.span
                    key={word + i}
                    className="inline-block bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent"
                    initial={
                      prefersReduced
                        ? false
                        : {
                            opacity: 0,
                            x: wordDirections[i].x,
                            y: wordDirections[i].y,
                            rotate: (i % 2 === 0 ? 1 : -1) * 15,
                          }
                    }
                    animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {word}
                  </m.span>
                ))}
              </span>
            </h1>

            {/* Subtitle — emerge */}
            <m.p
              className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
              initial={prefersReduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {STREAMER_NAME} compares the best online casino bonuses for you.
              Exclusive deposit bonuses, free spins without wagering requirements
              and fair conditions. All deals personally tested and recommended.
            </m.p>

            {/* Feature badges — spring bounce pop-in */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {features.map(({ icon: Icon, label }, i) => (
                <m.div
                  key={label}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300"
                  initial={prefersReduced ? false : { opacity: 0, scale: 0, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    delay: 1.3 + i * 0.12,
                    type: "spring",
                    stiffness: 280,
                    damping: 12,
                  }}
                  whileHover={{ scale: 1.08, borderColor: "rgba(168,85,247,0.5)" }}
                  style={{ willChange: "transform" }}
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  {label}
                </m.div>
              ))}
            </div>

            {/* CTA — shake/rumble emerge */}
            <m.div
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 60, scale: 0.8, filter: "blur(10px)" }
              }
              animate={
                inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}
              }
              transition={{
                delay: 1.8,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <m.a
                href="#deals"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] transition-all duration-300"
                animate={
                  inView && !prefersReduced
                    ? {
                        x: [0, -4, 4, -3, 3, -2, 2, 0],
                        transition: { delay: 2.0, duration: 0.4 },
                      }
                    : {}
                }
                whileHover={{ scale: 1.04 }}
                style={{ willChange: "transform" }}
              >
                <Gift className="w-5 h-5" />
                Discover Bonus Deals
              </m.a>
              <span className="text-sm text-gray-500">
                100% free &bull; No registration required
              </span>
            </m.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, #050210, transparent)" }}
        />
      </section>
    </LazyMotion>
  )
}
