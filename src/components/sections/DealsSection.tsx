"use client"

import { useState, useMemo } from "react"
import { casinos } from "@/data/casinos"
import FilterBar from "./FilterBar"
import DealCard from "./DealCard"
import AnimatedSection from "@/components/shared/AnimatedSection"

export default function DealsSection() {
  const [bonusType, setBonusType] = useState("alle")
  const [freeSpinsOnly, setFreeSpinsOnly] = useState(false)
  const [provider, setProvider] = useState("alle")
  const [minBonus, setMinBonus] = useState(100)

  const filtered = useMemo(() => {
    return casinos.filter((c) => {
      if (bonusType !== "alle" && c.bonusType !== bonusType) return false
      if (freeSpinsOnly && !c.freeSpins) return false
      if (provider === "merkur" && !c.hasMerkur) return false
      if (provider === "novoline" && !c.hasNovoline) return false
      if (c.bonusPercent < minBonus) return false
      return true
    })
  }, [bonusType, freeSpinsOnly, provider, minBonus])

  return (
    <section id="deals" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Casino Bonus Comparison
            </h2>
            <p className="mt-2 text-white/50">
              {filtered.length}{" "}
              {filtered.length === 1 ? "offer" : "offers"} found
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <FilterBar
            bonusType={bonusType}
            setBonusType={setBonusType}
            freeSpinsOnly={freeSpinsOnly}
            setFreeSpinsOnly={setFreeSpinsOnly}
            provider={provider}
            setProvider={setProvider}
            minBonus={minBonus}
            setMinBonus={setMinBonus}
          />
        </AnimatedSection>

        <div className="mt-8 space-y-4">
          {filtered.map((casino, i) => (
            <AnimatedSection key={casino.id} delay={0.05 * Math.min(i, 5)}>
              <DealCard deal={casino} />
            </AnimatedSection>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/40">
              <p className="text-lg">No offers found</p>
              <p className="mt-1 text-sm">
                Try different filter settings
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
