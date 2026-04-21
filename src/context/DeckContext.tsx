'use client'

import { createContext, useContext, useState } from 'react'

interface DeckContextType {
  activeIndex: number
  total: number
  setActiveIndex: (i: number) => void
  setTotal: (n: number) => void
}

const DeckContext = createContext<DeckContextType>({
  activeIndex: 0,
  total: 0,
  setActiveIndex: () => {},
  setTotal: () => {},
})

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <DeckContext.Provider value={{ activeIndex, total, setActiveIndex, setTotal }}>
      {children}
    </DeckContext.Provider>
  )
}

export const useDeck = () => useContext(DeckContext)
