"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "de" | "en"

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "de",
  setLang: () => {},
})

export function DashboardLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de")
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useDashboardLang() {
  return useContext(LangContext)
}
