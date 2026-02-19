"use client"

import { useState, useEffect } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { ShieldCheck, AlertTriangle } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const STORAGE_KEY = "robertobonus-age-verified"

export default function AgeVerificationModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    if (!verified) {
      setShow(true)
      document.body.style.overflow = "hidden"
    }
  }, [])

  function handleConfirm() {
    localStorage.setItem(STORAGE_KEY, "true")
    setShow(false)
    document.body.style.overflow = ""
  }

  function handleDeny() {
    window.location.href = "https://www.google.com"
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {show && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0a1e]/95 backdrop-blur-xl p-8 text-center shadow-2xl shadow-purple-500/10"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                <ShieldCheck className="h-8 w-8 text-purple-400" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Age Verification
              </h2>
              <p className="text-sm text-white/50 mb-6">
                {SITE_NAME} is intended for persons aged 18 and over only. Please confirm your age to continue.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleDeny}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white/80 transition-all"
                >
                  Under 18
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
                >
                  I am 18+
                </button>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10 p-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500/60 mt-0.5 shrink-0" />
                <p className="text-xs text-white/30 text-left">
                  Gambling can be addictive. For help visit www.begambleaware.org
                </p>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
