'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'

export interface NavSection { id: string; label: string }

interface ScrollCtx {
  progress: number
  sections: NavSection[]
  activeSection: string
  setProgress: (p: number) => void
  setSections: (s: NavSection[]) => void
  setActiveSection: (id: string) => void
  scrollTo: (id: string) => void
  registerScrollTo: (fn: (id: string) => void) => void
}

const Ctx = createContext<ScrollCtx>({
  progress: 0, sections: [], activeSection: '',
  setProgress: () => {}, setSections: () => {}, setActiveSection: () => {},
  scrollTo: () => {}, registerScrollTo: () => {},
})

export function ScrollProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [sections, setSections] = useState<NavSection[]>([])
  const [activeSection, setActiveSection] = useState('')
  const scrollToRef = useRef<((id: string) => void) | null>(null)

  const registerScrollTo = useCallback((fn: (id: string) => void) => {
    scrollToRef.current = fn
  }, [])

  const scrollTo = useCallback((id: string) => {
    scrollToRef.current?.(id)
  }, [])

  return (
    <Ctx.Provider value={{
      progress, sections, activeSection,
      setProgress, setSections, setActiveSection,
      scrollTo, registerScrollTo,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useScrollProgress = () => useContext(Ctx)
