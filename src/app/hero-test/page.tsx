"use client"

import "./hero-test.css"
import HeroV1Cinematic from "@/components/hero-variants/HeroV1Cinematic"
import HeroV2Neon from "@/components/hero-variants/HeroV2Neon"
import HeroV3Glass from "@/components/hero-variants/HeroV3Glass"
import HeroV4Explosion from "@/components/hero-variants/HeroV4Explosion"
import HeroV5Minimal from "@/components/hero-variants/HeroV5Minimal"

const VERSIONS = [
  {
    component: HeroV1Cinematic,
    name: "Version 1",
    subtitle: "Cinematic Spotlight",
    description:
      "Radial spotlight, typewriter headline, light rays, side-sliding feature badges, pulsing CTA ring.",
  },
  {
    component: HeroV2Neon,
    name: "Version 2",
    subtitle: "Neon Cyber",
    description:
      "Glitch headline, cyberpunk grid, rotating neon rings on avatar, holographic 3D-tilt feature cards, neon flicker CTA.",
  },
  {
    component: HeroV3Glass,
    name: "Version 3",
    subtitle: "Glassmorphism Float",
    description:
      "Floating glass-orb avatar, iridescent reflections, animated mesh gradients, mouse parallax, animated wave separator.",
  },
  {
    component: HeroV4Explosion,
    name: "Version 4",
    subtitle: "Particle Explosion",
    description:
      "Burst particles from avatar, words fly in from different directions, spring-bounce badge pop-in, shake/rumble CTA emergence.",
  },
  {
    component: HeroV5Minimal,
    name: "Version 5",
    subtitle: "Minimalist Premium",
    description:
      "Ultra-clean dark, italic gradient headline, self-drawing underline, dot-separated feature line, understated outline CTA.",
  },
]

export default function HeroTestPage() {
  return (
    <main className="bg-black">
      {/* Page header */}
      <div
        className="sticky top-0 z-50 flex items-center gap-4 px-6 py-3 border-b border-white/5"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <span className="text-xs font-mono text-purple-400/80 tracking-widest uppercase">
          Hero Section Test Lab
        </span>
        <span className="text-white/10">·</span>
        <span className="text-xs text-white/30 font-mono">5 variants</span>
      </div>

      {/* Version index */}
      <nav
        className="flex flex-wrap items-center gap-2 px-6 py-4 border-b border-white/5"
        style={{ background: "rgba(0,0,0,0.6)" }}
        aria-label="Hero version navigation"
      >
        {VERSIONS.map(({ name, subtitle }, i) => (
          <a
            key={name}
            href={`#hero-v${i + 1}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:bg-white/10"
            style={{
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              color: "rgba(196,181,253,0.8)",
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc" }}
            >
              {i + 1}
            </span>
            {subtitle}
          </a>
        ))}
      </nav>

      {/* Hero sections */}
      {VERSIONS.map(({ component: Component, name, subtitle, description }, i) => (
        <section
          key={name}
          id={`hero-v${i + 1}`}
          className="relative"
          aria-label={`${name}: ${subtitle}`}
        >
          {/* Description bar above each section */}
          <div
            className="relative z-40 flex items-start gap-4 px-6 py-4 border-t border-white/5"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          >
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{
                background: "rgba(168,85,247,0.15)",
                border: "1px solid rgba(168,85,247,0.3)",
                color: "#a855f7",
              }}
            >
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-white/80">
                {name} — {subtitle}
              </p>
              <p className="text-xs text-white/35 mt-0.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <Component />
        </section>
      ))}

      {/* Footer */}
      <footer
        className="py-10 text-center border-t border-white/5"
        style={{ background: "#000" }}
      >
        <p className="text-xs text-white/20 font-mono">
          Hero Test Page — robertobonus / hero-test route
        </p>
      </footer>
    </main>
  )
}
