'use client'

import { useRef, useState, useEffect } from 'react'

// ─── Scramble hook ─────────────────────────────────────────────────────────────
const POOL = 'abcdefghijklmnopqrstuvwxyz'

function rand() {
  return POOL[Math.floor(Math.random() * POOL.length)]
}

function useAutoScramble(text: string) {
  const [display, setDisplay] = useState(() => text.split('').map(() => rand()).join(''))
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    let startTime: number | null = null
    let lastFlip = 0
    const HOLD = 150
    const RESOLVE = 850

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime

      if (elapsed < HOLD) {
        if (now - lastFlip > 67) {
          lastFlip = now
          setDisplay(text.split('').map(() => rand()).join(''))
        }
        raf.current = requestAnimationFrame(tick)
        return
      }

      const t = Math.min((elapsed - HOLD) / RESOLVE, 1)
      const resolved = Math.floor(t * text.length)

      if (now - lastFlip > 67 || resolved > 0) {
        lastFlip = now
        setDisplay(
          text.split('').map((ch, i) => (i < resolved ? ch : rand())).join('')
        )
      }

      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== undefined) cancelAnimationFrame(raf.current)
    }
  }, [text])

  return display
}

// ─── Hero Card ─────────────────────────────────────────────────────────────────
export default function HeroCard() {
  const entropy = useAutoScramble('entropy')

  return (
    <div
      style={{
        width: 'min(898px, calc(100vw - 80px))',
        minHeight: '528px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '48px',
      }}
    >
      {/* ── Top bar: centered name + role ───────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#0F1117',
          }}
        >
          Wei Xu
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
          }}
        >
          Product Designer · Builder
        </span>
      </div>

      {/* ── Center quote: 2 lines, two-tone ─────────────────────────────── */}
      <p
        style={{
          fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          textAlign: 'center',
          margin: 0,
        }}
      >
        {/* Line 1 */}
        <span>
          <span style={{ color: '#BEBEBE' }}>Countering </span>
          {/* Fixed-width wrapper so scramble never shifts layout */}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ visibility: 'hidden', color: '#0F1117' }}>entropy</span>
            <span style={{ position: 'absolute', left: 0, top: 0, color: '#0F1117', whiteSpace: 'nowrap' }}>
              {entropy}
            </span>
          </span>
        </span>
        <br />
        {/* Line 2 */}
        <span>
          <span style={{ color: '#BEBEBE' }}>through </span>
          <span style={{ color: '#0F1117' }}>intentional design</span>
        </span>
      </p>

      {/* ── Bottom: centered, stacked ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6B7280',
          }}
        >
          Currently @Upfront
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
          }}
        >
          Previously @Hesai Technology
        </span>
      </div>
    </div>
  )
}
