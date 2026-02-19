"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

function BackgroundParticles() {
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
      fpsLimit: 30,
      particles: {
        color: { value: ["#a855f7", "#7c3aed", "#c084fc"] },
        links: {
          color: "#a855f7",
          distance: 160,
          enable: true,
          opacity: 0.06,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none" as const,
          random: true,
          outModes: { default: "out" as const },
        },
        number: { density: { enable: true }, value: 20 },
        opacity: { value: { min: 0.05, max: 0.15 } },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  )

  if (!init) return null

  return (
    <Particles
      id="tsparticles-bg"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      options={options}
    />
  )
}

export default function BackgroundEffects({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {/* Mesh gradient orbs — spread across entire page */}
      <div
        className="mesh-1 absolute pointer-events-none rounded-full blur-[100px]"
        style={{
          top: "5%",
          left: "-5%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(88,28,135,0.35) 0%, rgba(109,40,217,0.15) 50%, transparent 70%)",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      <div
        className="mesh-2 absolute pointer-events-none rounded-full blur-[100px]"
        style={{
          top: "30%",
          right: "-5%",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(59,7,100,0.4) 0%, rgba(126,34,206,0.18) 50%, transparent 70%)",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      <div
        className="mesh-3 absolute pointer-events-none rounded-full blur-[80px]"
        style={{
          top: "60%",
          left: "10%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {/* Particles */}
      <BackgroundParticles />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
