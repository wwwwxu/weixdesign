'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useScrollProgress } from '@/contexts/scroll-progress'

// ─── Config ──────────────────────────────────────────────────────────────────

const SPRING = { type: 'spring' as const, stiffness: 360, damping: 28 }

const PILL: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100px',
  fontSize: '13px',
  fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
  fontWeight: 400,
  padding: '7px 16px',
  background: 'rgba(0,0,0,0.05)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

// ─── Breadcrumb map ───────────────────────────────────────────────────────────

const LABELS: Record<string, string> = {
  '/about': 'about me',
  '/playground': 'playground',
  '/work/upfront': 'upfront',
  '/work/suggestion-system': 'suggestion system',
  '/work/visitor-system': 'visitor system',
}

function getBreadcrumb(pathname: string): string | null {
  if (LABELS[pathname]) return LABELS[pathname]
  if (pathname.startsWith('/work/')) {
    return pathname.split('/').pop()?.replace(/-/g, ' ') ?? null
  }
  return null
}

// ─── Progress ring ────────────────────────────────────────────────────────────

const R = 8
const CIRC = 2 * Math.PI * R

function Ring({ progress }: { progress: number }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r={R} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
      <motion.circle
        cx="9" cy="9" r={R}
        fill="none"
        stroke="#1A1714"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        animate={{ strokeDashoffset: CIRC * (1 - progress / 100) }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '9px 9px' }}
      />
    </svg>
  )
}

// ─── Work progress pill (ring + label + dropdown + %) ────────────────────────

function WorkPill({ label }: { label: string }) {
  const { progress, sections, activeSection, scrollTo } = useScrollProgress()
  const [open, setOpen] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={pillRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {/* Section dropdown — appears below pill */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={SPRING}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.96)',
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
              zIndex: 110,
            }}
          >
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => { scrollTo(s.id); setOpen(false) }}
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

      {/* Main pill */}
      <div style={{ ...PILL, padding: '6px 6px 6px 10px', gap: '8px', cursor: 'default', position: 'relative' }}>
        <Ring progress={progress} />

        {/* Label + chevron — clickable */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: 0,
            fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
            fontSize: '13px',
            color: '#1A1714',
            fontWeight: 400,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={SPRING}
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ flexShrink: 0, color: '#9CA3AF' }}
          >
            <path d="M2.5 4L6 7.5L9.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        {/* Nested % pill */}
        <div
          style={{
            background: 'rgba(0,0,0,0.07)',
            borderRadius: '100px',
            padding: '3px 10px',
            minWidth: '44px',
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
      </div>
    </div>
  )
}

// ─── Pill types ───────────────────────────────────────────────────────────────

type PillDef =
  | { key: string; kind: 'nav' | 'back'; label: string; href?: string; color: string; back?: boolean }
  | { key: string; kind: 'page'; label: string; color: string }
  | { key: string; kind: 'work'; label: string }

function getPills(pathname: string, breadcrumb: string | null): PillDef[] {
  const isWork = pathname.startsWith('/work/')
  if (breadcrumb) {
    return [
      { key: 'back', kind: 'back', label: 'home', href: '/', color: '#9CA3AF', back: true },
      isWork
        ? { key: 'work', kind: 'work', label: breadcrumb }
        : { key: 'page', kind: 'page', label: breadcrumb, color: '#1A1714' },
    ]
  }
  return [
    { key: 'about',      kind: 'nav', label: 'About',      href: '/about',      color: '#6B7280' },
    { key: 'playground', kind: 'nav', label: 'Playground',  href: '/playground', color: '#6B7280' },
    { key: 'resume',     kind: 'nav', label: 'Resume',      href: '/resume.pdf', color: '#6B7280' },
  ]
}

function fanX(index: number, total: number) {
  const spread = total > 3 ? 26 : 32
  return (index - (total - 1) / 2) * spread
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const breadcrumb = getBreadcrumb(pathname)
  const pills = getPills(pathname, breadcrumb)
  const stateKey = pathname.startsWith('/work/') ? 'work' : (breadcrumb ? 'sub' : 'home')

  return (
    <header
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stateKey}
          exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.14, ease: 'easeIn' } }}
          style={{ display: 'flex', gap: '6px', alignItems: 'center', pointerEvents: 'auto' }}
        >
          {pills.map((pill, i) => (
            <motion.div
              key={pill.key}
              initial={{ opacity: 0, scale: 0.8, x: fanX(i, pills.length) }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ ...SPRING, delay: i * 0.045 }}
              style={{ position: 'relative' }}
            >
              {pill.kind === 'work' && <WorkPill label={pill.label} />}

              {(pill.kind === 'nav' || pill.kind === 'back') && (
                <Link
                  href={pill.href!}
                  style={{ ...PILL, color: pill.color, gap: '6px' }}
                  {...(pill.href?.endsWith('.pdf') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {pill.back && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {pill.label}
                </Link>
              )}

              {pill.kind === 'page' && (
                <span style={{ ...PILL, color: pill.color, cursor: 'default' }}>
                  {pill.label}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </header>
  )
}
