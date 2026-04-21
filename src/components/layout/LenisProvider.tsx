'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactLenis } from '@studio-freight/react-lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
      }}
    >
      {children as any}
    </ReactLenis>
  )
}
