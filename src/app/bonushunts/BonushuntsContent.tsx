"use client"

import { SOCIAL_LINKS } from "@/lib/constants"

// Change this to Roberto's CasinoElements username once the account is created
const CASINO_ELEMENTS_USERNAME = "robertovstheworld"

export default function BonushuntsContent() {
  return (
    <div className="relative min-h-screen w-full">
      {/* CasinoElements Bonushunt Embed */}
      <iframe
        src={`https://casinoelements.com/c/${CASINO_ELEMENTS_USERNAME}/bonushunt/latest`}
        className="h-[calc(100vh-4rem)] w-full border-0"
        allow="fullscreen"
        title="Bonus Hunt Tracker"
      />

      {/* Fallback info bar at bottom */}
      <div className="border-t border-white/10 bg-black/40 px-4 py-3 text-center text-sm text-white/50 backdrop-blur-sm">
        Bonus Hunt powered by{" "}
        <a
          href="https://casinoelements.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          CasinoElements
        </a>
        {" "} | Watch live on{" "}
        <a
          href={SOCIAL_LINKS.twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Twitch
        </a>
      </div>
    </div>
  )
}
