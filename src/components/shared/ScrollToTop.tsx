"use client"

import { useState, useEffect } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible && (
          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-purple-600/80 backdrop-blur-md border border-purple-400/30 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-purple-500/90 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
