"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

function FixedParticles() {
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
        number: { density: { enable: true }, value: 70 },
        opacity: { value: { min: 0.08, max: 0.25 } },
        size: { value: { min: 1, max: 4 } },
      },
      detectRetina: true,
    }),
    []
  )

  if (!init) return null

  return (
    <Particles
      id="tsparticles-zone"
      className="!fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      options={options}
    />
  )
}

export default function ParticleZone({ children }: { children: ReactNode }) {
  return (
    <div className="relative" style={{ zIndex: 1 }}>
      <FixedParticles />
      {children}
    </div>
  )
}
