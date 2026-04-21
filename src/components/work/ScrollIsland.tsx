'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Section { id: string; label: string }

interface ScrollIslandProps {
  sections: Section[]
  activeSection: string
  contentRef: React.RefObject<HTMLDivElement | null>
  onSelect: (id: string) => void
}

const SPRING = { type: 'spring' as const, stiffness: 420, damping: 32 }

// SVG progress ring constants
const R = 9
const C = 2 * Math.PI * R

export function ScrollIsland({ sections, activeSection, contentRef, onSelect }: ScrollIslandProps) {
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)

  // Track scroll progress
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? Math.round((scrollTop / max) * 100) : 0)
    }
    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => el.removeEventListener('scroll', update)
  }, [contentRef])

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const activeLabel = sections.find(s => s.id === activeSection)?.label ?? sections[0]?.label ?? ''
  const dashOffset = C * (1 - progress / 100)

  return (
    <div
      ref={pillRef}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* ── Section index dropdown ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={SPRING}
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              borderRadius: '14px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
              padding: '6px',
              minWidth: '180px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
            }}
          >
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => { onSelect(s.id); setOpen(false) }}
                style={{
                  background: s.id === activeSection ? 'rgba(0,0,0,0.04)' : 'none',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                  fontSize: '13px',
                  color: s.id === activeSection ? '#1A1714' : '#6B7280',
                  fontWeight: s.id === activeSection ? 500 : 400,
                  width: '100%',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main pill ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...SPRING, delay: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderRadius: '100px',
          padding: '7px 7px 7px 10px',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Progress ring */}
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
          {/* Track */}
          <circle cx="11" cy="11" r={R} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
          {/* Progress arc */}
          <motion.circle
            cx="11" cy="11" r={R}
            fill="none"
            stroke="#1A1714"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={C}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '11px 11px' }}
          />
        </svg>

        {/* Section name + chevron */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '0 6px',
            fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
            fontSize: '13px',
            color: '#1A1714',
            fontWeight: 400,
            whiteSpace: 'nowrap',
          }}
        >
          {activeLabel}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={SPRING}
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ flexShrink: 0, color: '#9CA3AF' }}
          >
            <path d="M2.5 4L6 7.5L9.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        {/* Percentage pill */}
        <div
          style={{
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '100px',
            padding: '4px 10px',
            minWidth: '46px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 400,
            }}
          >
            {progress}%
          </span>
        </div>
      </motion.div>
    </div>
  )
}
