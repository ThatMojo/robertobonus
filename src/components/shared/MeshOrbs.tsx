"use client"

import type { ReactNode } from "react"

export default function MeshOrbs({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="mesh-1 absolute pointer-events-none rounded-full blur-[80px]"
        style={{
          top: "5%",
          left: "-5%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(88,28,135,0.35) 0%, rgba(109,40,217,0.15) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="mesh-2 absolute pointer-events-none rounded-full blur-[80px]"
        style={{
          top: "40%",
          right: "-5%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(59,7,100,0.4) 0%, rgba(126,34,206,0.18) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="mesh-3 absolute pointer-events-none rounded-full blur-[60px]"
        style={{
          bottom: "5%",
          left: "10%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
