'use client'

import { DeckProvider } from '@/context/DeckContext'
import BottomIndicator from './BottomIndicator'

export default function DeckShell({ children }: { children: React.ReactNode }) {
  return (
    <DeckProvider>
      {children}
      <BottomIndicator />
    </DeckProvider>
  )
}
