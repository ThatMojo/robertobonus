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
        shape: {
          type: "image" as const,
          options: {
            image: [
              { src: "/images/chips/chip-gold.svg", width: 64, height: 64 },
            ],
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none" as const,
          random: true,
          outModes: { default: "bounce" as const },
        },
        number: { density: { enable: false }, value: 8 },
        opacity: { value: { min: 0.15, max: 0.35 } },
        size: { value: { min: 16, max: 32 } },
        rotate: {
          value: { min: 0, max: 360 },
          animation: { enable: true, speed: 2, sync: false },
        },
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
