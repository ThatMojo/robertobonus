"use client"

interface FilterBarProps {
  bonusType: string
  setBonusType: (v: string) => void
  freeSpinsOnly: boolean
  setFreeSpinsOnly: (v: boolean) => void
  provider: string
  setProvider: (v: string) => void
  minBonus: number
  setMinBonus: (v: number) => void
}

function SegmentButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200
        ${
          active
            ? "border-purple-500/50 bg-purple-500/20 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
        }
      `}
    >
      {label}
    </button>
  )
}

export default function FilterBar({
  bonusType,
  setBonusType,
  freeSpinsOnly,
  setFreeSpinsOnly,
  provider,
  setProvider,
  minBonus,
  setMinBonus,
}: FilterBarProps) {
  const sliderPercent = ((minBonus - 100) / (400 - 100)) * 100

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-md sm:p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Bonus Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/50">
            Bonus Typ
          </label>
          <div className="flex gap-1.5">
            {[
              { label: "Alle", value: "alle" },
              { label: "Non-Sticky", value: "non-sticky" },
              { label: "Sticky", value: "sticky" },
            ].map((opt) => (
              <SegmentButton
                key={opt.value}
                label={opt.label}
                active={bonusType === opt.value}
                onClick={() => setBonusType(opt.value)}
              />
            ))}
          </div>
        </div>

        {/* Freispiele Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/50">
            Freispiele
          </label>
          <button
            type="button"
            onClick={() => setFreeSpinsOnly(!freeSpinsOnly)}
            className="flex items-center gap-3"
          >
            <div
              className={`
                relative h-6 w-11 rounded-full transition-colors duration-200
                ${freeSpinsOnly ? "bg-purple-500" : "bg-white/10"}
              `}
            >
              <div
                className={`
                  absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200
                  ${freeSpinsOnly ? "translate-x-[22px]" : "translate-x-0.5"}
                `}
              />
            </div>
            <span
              className={`text-sm transition-colors duration-200 ${
                freeSpinsOnly ? "text-purple-300" : "text-white/50"
              }`}
            >
              Nur mit Freispielen
            </span>
          </button>
        </div>

        {/* Provider */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/50">
            Spiele-Hersteller
          </label>
          <div className="flex gap-1.5">
            {[
              { label: "Alle", value: "alle" },
              { label: "Merkur", value: "merkur" },
              { label: "Novoline", value: "novoline" },
            ].map((opt) => (
              <SegmentButton
                key={opt.value}
                label={opt.label}
                active={provider === opt.value}
                onClick={() => setProvider(opt.value)}
              />
            ))}
          </div>
        </div>

        {/* Min Bonus Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/50">
            Min. Bonus
          </label>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">100%</span>
              <span className="text-sm font-semibold text-purple-300">
                {minBonus}%
              </span>
              <span className="text-xs text-white/40">400%</span>
            </div>
            <input
              type="range"
              min={100}
              max={400}
              step={10}
              value={minBonus}
              onChange={(e) => setMinBonus(Number(e.target.value))}
              className="range-baller w-full cursor-pointer"
              style={{ "--pct": `${sliderPercent}%` } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
