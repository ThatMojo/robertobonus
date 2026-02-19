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
import { Star, Sparkles, Zap, Gift, Youtube, Instagram } from "lucide-react"
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

export default function HeroSection() {
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
        className="relative min-h-[85vh] flex items-center overflow-hidden"
      >
        {/* V4: Background radial burst */}
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
            zIndex: 1,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Avatar with V2 neon rings + V4 burst + V3 float */}
          <div className="flex-shrink-0 relative float-slow">
            {/* V4: Burst particles */}
            {!prefersReduced &&
              inView &&
              BURST_PARTICLES.map((p) => (
                <div
                  key={p.id}
                  className="particle-burst pointer-events-none"
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
                    } as React.CSSProperties
                  }
                />
              ))}

            {/* V2: Outer rotating neon ring */}
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
            {/* V2: Inner rotating ring (reverse) */}
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

            {/* V4: Outer glow ring */}
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

            {/* V4: Avatar spring scale-in */}
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

            {/* V4: Headline — words fly in from directions */}
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

            {/* V4: Subtitle — blur emerge */}
            <m.p
              className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 40, filter: "blur(8px)" }
              }
              animate={
                inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {STREAMER_NAME} compares the best online casino bonuses for you.
              Exclusive deposit bonuses, free spins without wagering requirements
              and fair conditions. All deals personally tested and recommended.
            </m.p>

            {/* V2: Holographic feature cards with neon corners */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
              style={{ perspective: "1000px" }}
            >
              {features.map(({ icon, label }, i) => (
                <HolographicCard
                  key={label}
                  icon={icon}
                  label={label}
                  delay={1.3 + i * 0.12}
                />
              ))}
            </div>

            {/* V2-style CTA — neon flicker + V4 emerge */}
            <m.div
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 60, scale: 0.8, filter: "blur(10px)" }
              }
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : {}
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
                className="neon-flicker relative inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
                animate={
                  inView && !prefersReduced
                    ? {
                        x: [0, -4, 4, -3, 3, -2, 2, 0],
                        transition: { delay: 2.0, duration: 0.4 },
                      }
                    : {}
                }
                whileHover={{ scale: 1.04 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(88,28,135,0.9), rgba(109,40,217,0.8))",
                  border: "1px solid rgba(168,85,247,0.7)",
                  textShadow: "0 0 10px rgba(168,85,247,0.8)",
                  willChange: "transform",
                }}
              >
                <Gift
                  className="w-5 h-5"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(168,85,247,0.9))",
                  }}
                />
                Discover Bonus Deals
              </m.a>
              <div className="flex items-center gap-4">
                <a href="https://www.youtube.com/@RobertoVsTheWorld" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-red-400 transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/robertovstheworld/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-pink-400 transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </m.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #050210, transparent)",
          }}
        />
      </section>
    </LazyMotion>
  )
}
