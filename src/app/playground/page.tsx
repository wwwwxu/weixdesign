'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Scramble morph ───────────────────────────────────────────────────────────
// Morphs from current displayed text to new target: scrambles + interpolates length

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

function useScrambleMorph(target: string, duration = 500) {
  const [display, setDisplay] = useState('')
  const displayRef = useRef('')
  const rafRef = useRef(0)

  useEffect(() => {
    const from = displayRef.current
    const to = target
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const len = Math.round(from.length + (to.length - from.length) * p)
      const revealed = Math.floor(p * to.length)
      let s = ''
      for (let i = 0; i < len; i++) {
        if (i < revealed && i < to.length) s += to[i]
        else if (to[i] === ' ' || from[i] === ' ') s += ' '
        else s += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      displayRef.current = s
      setDisplay(s)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else { displayRef.current = to; setDisplay(to) }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

// ─── Word-by-word reveal ──────────────────────────────────────────────────────

function useWordReveal(text: string, duration = 900) {
  const [count, setCount] = useState(0)
  const words = text.split(' ')
  useEffect(() => {
    setCount(0)
    let i = 0
    const ms = duration / words.length
    const t = setInterval(() => { i++; setCount(i); if (i >= words.length) clearInterval(t) }, ms)
    return () => clearInterval(t)
  }, [text, duration, words.length])
  return words.slice(0, count).join(' ')
}

// ─── Project data ─────────────────────────────────────────────────────────────

const PROJECTS: Record<string, { name: string; img: string; href: string }> = {
  gift:  { name: 'GoGift',             img: '/playground/project-gift.png',  href: '/work/gift' },
  sunny: { name: 'Sunny',              img: '/playground/project-sunny.png', href: '/work/sunny' },
  '1':   { name: 'Freshmart',          img: '/playground/project-1.webp',    href: 'https://www.behance.net/gallery/182368189/Supermarket-Management-System-for-supermarket-owner' },
  '2':   { name: 'Room Share',         img: '/playground/project-2.webp',    href: 'https://www.behance.net/gallery/182365819/Best-Roomie-designed-for-finding-the-ideal-rommates' },
  '3':   { name: 'Embrace',            img: '/playground/project-3.webp',    href: 'https://www.behance.net/gallery/182363693/Embrace-Design-for-Left-behind-Children' },
  '4':   { name: 'Car Design',         img: '/playground/project-4.webp',    href: 'https://www.behance.net/gallery/182362623/E-S-Car-Selected-as-top-50-in-the-Car-Design-News-2016' },
  '5':   { name: 'Wash Date',          img: '/playground/project-5.webp',    href: 'https://www.behance.net/gallery/182193539/Wash-Date-sustainable-system-design-for-campus-laundry' },
  '6':   { name: 'Play A Round',       img: '/playground/project-7.webp',    href: 'https://www.behance.net/gallery/182186825/Play-A-Round-RVBGC-Playspace-Design-Project' },
  '7':   { name: 'Design in the Mall', img: '/playground/project-8.webp',    href: 'https://www.behance.net/gallery/182185155/Design-in-the-Mall-%28Qualitative-Research-Evaluation%29' },
  '8':   { name: 'Stroke Rehab',       img: '/playground/project-9.webp',    href: 'https://www.behance.net/gallery/73598953/Adjustable-device-design-for-the-recovery-of-the-stroke' },
  '9':   { name: 'Course List',        img: '/playground/project-10.png',    href: 'https://www.behance.net/gallery/52091237/Course-Listredesign-for-selective-course-system' },
}

// ─── Desktop grid positions ───────────────────────────────────────────────────

const DESKTOP: Array<{ id: string; col: number; row: number }> = [
  { id: 'gift',  col: 5, row: 1 },
  { id: '2',     col: 1, row: 2 },
  { id: 'sunny', col: 5, row: 2 },
  { id: '5',     col: 1, row: 3 },
  { id: '8',     col: 2, row: 3 },
  { id: '7',     col: 3, row: 3 },
  { id: '1',     col: 5, row: 3 },
  { id: '6',     col: 1, row: 4 },
  { id: '9',     col: 3, row: 4 },
  { id: '3',     col: 4, row: 4 },
  { id: '4',     col: 5, row: 4 },
]

// ─── Mobile grid positions ────────────────────────────────────────────────────

const MOBILE: Array<{ id: string; col: number; row: number }> = [
  { id: 'gift',  col: 1, row: 1 },
  { id: '2',     col: 1, row: 2 },
  { id: 'sunny', col: 3, row: 2 },
  { id: '7',     col: 1, row: 4 },
  { id: '5',     col: 3, row: 4 },
  { id: '1',     col: 2, row: 5 },
  { id: '4',     col: 3, row: 5 },
  { id: '6',     col: 1, row: 6 },
  { id: '8',     col: 3, row: 6 },
  { id: '9',     col: 1, row: 7 },
  { id: '3',     col: 2, row: 7 },
]

// ─── Hover overlay config ─────────────────────────────────────────────────────

type OverlayImage = { src: string; col: string; row: string; fit?: 'cover' | 'contain'; scale?: number; anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; heightFill?: boolean }

type OverlayConfig = {
  title: string
  description: string
  invertedCover: { col: string; row: string }
  images: OverlayImage[]
}

const OVERLAY_CONFIGS: Partial<Record<string, OverlayConfig>> = {
  gift: {
    title: 'Go gift',
    description: 'A company system that improves gift distribution experience',
    invertedCover: { col: '5', row: '1' },
    images: [
      { src: '/work/gift/claim.png',    col: '1 / 3', row: '1 / 5', fit: 'contain' },
      { src: '/work/gift/feedback.png', col: '4 / 6', row: '3 / 5', fit: 'contain' },
    ],
  },
  '2': {
    title: 'Best Roomie',
    description: 'Design challenge about finding the ideal roommates',
    invertedCover: { col: '1', row: '2' },
    images: [
      { src: '/work/roomie/interface.png', col: '4 / 6', row: '3 / 5', fit: 'contain' },
    ],
  },
  '9': {
    title: 'Course List',
    description: 'Redesign for selective course system',
    invertedCover: { col: '3', row: '4' },
    images: [
      { src: '/work/courselist/storyboard.png', col: '1 / 3', row: '1 / 3', fit: 'contain' },
      { src: '/work/courselist/screens.png',    col: '4 / 6', row: '2 / 4', fit: 'contain' },
    ],
  },
  '3': {
    title: 'Embrace',
    description: 'Design for "Left-behind" Children',
    invertedCover: { col: '4', row: '4' },
    images: [
      { src: '/work/embrace/diagram.png',  col: '1 / 3', row: '2 / 5', fit: 'contain' },
      { src: '/work/embrace/screens.png',  col: '4 / 6', row: '1 / 2', fit: 'contain' },
    ],
  },
  '4': {
    title: 'E-S Car',
    description: 'Selected as top 50 in the Car Design News 2016',
    invertedCover: { col: '5', row: '4' },
    images: [
      { src: '/work/car/exterior.png', col: '1 / 3', row: '1 / 3', fit: 'contain', scale: 0.9, anchor: 'top-left'    },
      { src: '/work/car/night.webp',   col: '4 / 6', row: '1 / 3', fit: 'contain', scale: 0.7, anchor: 'top-right'   },
      { src: '/work/car/interior.png', col: '2 / 4', row: '3 / 5', fit: 'contain', scale: 0.7, anchor: 'bottom-left' },
    ],
  },
  '6': {
    title: 'Play-A-Round',
    description: 'Playspace design for community children',
    invertedCover: { col: '1', row: '4' },
    images: [
      { src: '/work/playaround/scenes.png',  col: '4 / 6', row: '1 / 2', fit: 'contain' },
      { src: '/work/playaround/deliver.png', col: '4 / 6', row: '3 / 5', heightFill: true, anchor: 'bottom-right' },
    ],
  },
  '1': {
    title: 'Supermarket Management',
    description: 'System for small supermarket owner (in Chinese)',
    invertedCover: { col: '5', row: '3' },
    images: [
      { src: '/work/supermarket/app.png', col: '1 / 3', row: '3 / 5', fit: 'contain' },
    ],
  },
  '7': {
    title: 'Design Research',
    description: 'Design in the Mall (Qualitative Research Evaluation)',
    invertedCover: { col: '3', row: '3' },
    images: [],
  },
  '8': {
    title: 'SWAN Rehab',
    description: 'Adjustable device design for the recovery of the stroke patients',
    invertedCover: { col: '2', row: '3' },
    images: [
      { src: '/work/swan/table.png', col: '1 / 3', row: '1 / 3', fit: 'contain' },
      { src: '/work/swan/usage.png', col: '5 / 6', row: '1 / 4', fit: 'cover'   },
    ],
  },
  '5': {
    title: 'Wash Date',
    description: 'Sustainable system design for campus laundry',
    invertedCover: { col: '1', row: '3' },
    images: [
      { src: '/work/washdate/pavilion.png', col: '4 / 6', row: '1 / 3', fit: 'contain', scale: 0.7, anchor: 'top-right' },
      { src: '/work/washdate/app.png',      col: '3 / 6', row: '3 / 5', fit: 'contain', scale: 0.7, anchor: 'bottom-right' },
    ],
  },
  sunny: {
    title: 'Sunny',
    description: 'Engaging gamification into campus counseling for international students',
    invertedCover: { col: '5', row: '2' },
    images: [
      { src: '/work/sunny/service-model.png', col: '1 / 4', row: '1 / 3', fit: 'contain' },
      { src: '/work/sunny/octagon.png',       col: '1 / 3', row: '3 / 5', fit: 'contain' },
      { src: '/work/sunny/interface1.png',    col: '3 / 5', row: '3 / 5', fit: 'contain' },
    ],
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONO = 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace'
const SANS = 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif'

const GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gap: '16px',
  padding: '82px 40px 40px',
  height: '100%',
  boxSizing: 'border-box',
}

// ─── Hover overlay ────────────────────────────────────────────────────────────

// Description that word-reveals; key prop resets it per project
function Description({ text }: { text: string }) {
  const words = useWordReveal(text, 900)
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ fontFamily: SANS, fontSize: '13px', fontWeight: 400, color: '#6B7280', margin: 0, maxWidth: '280px', lineHeight: 1.55, textAlign: 'center' }}
    >
      {words}
    </motion.p>
  )
}

function ProjectOverlay({ id, config }: { id: string; config: OverlayConfig }) {
  const p = PROJECTS[id]
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{ position: 'fixed', inset: 0, background: '#F8F8F8', zIndex: 50, pointerEvents: 'none' }}
    >
      <div style={GRID_STYLE}>
        {/* Inverted cover */}
        <div style={{ gridColumn: config.invertedCover.col, gridRow: config.invertedCover.row, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.img} alt="" draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'invert(1)' }} />
        </div>

        {/* Project images */}
        {config.images.map((img, i) => {
          const s = img.scale ?? 1
          if (img.heightFill) {
            const justifyContent = img.anchor?.includes('right')  ? 'flex-end' : 'flex-start'
            const alignItems     = img.anchor?.includes('bottom') ? 'flex-end' : 'flex-start'
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                style={{ gridColumn: img.col, gridRow: img.row, overflow: 'visible', display: 'flex', justifyContent, alignItems }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" draggable={false}
                  style={{ height: '100%', width: 'auto', maxWidth: 'none', flexShrink: 0, display: 'block' }} />
              </motion.div>
            )
          }
          const justifyContent = img.anchor?.includes('right') ? 'flex-end' : 'flex-start'
          const alignItems = img.anchor?.includes('bottom') ? 'flex-end' : 'flex-start'
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              style={{ gridColumn: img.col, gridRow: img.row, overflow: s > 1 ? 'visible' : 'hidden', display: 'flex', justifyContent, alignItems }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" draggable={false}
                style={{ width: `${s * 100}%`, height: `${s * 100}%`, objectFit: img.fit || 'cover', display: 'block' }} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeTitle = hoveredId && OVERLAY_CONFIGS[hoveredId]
    ? OVERLAY_CONFIGS[hoveredId]!.title
    : 'Playground & Archived'
  const morphedTitle = useScrambleMorph(activeTitle, 500)
  const pageTitle = useScrambleMorph('Playground & Archived', 500) // mobile only

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleClick = (href: string) => {
    if (href.startsWith('/')) router.push(href)
    else window.open(href, '_blank', 'noopener noreferrer')
  }

  // ── Desktop ──────────────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#F8F8F8', overflow: 'hidden' }}>

        {/* Main grid */}
        <div style={GRID_STYLE}>
          {/* Title — morphs between page title and project title */}
          <div style={{
            gridColumn: '1 / 6', gridRow: '2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', position: 'relative', zIndex: 60,
          }}>
            {/* Inner wrapper: title stays at center, description grows below */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <h1 style={{ fontFamily: MONO, fontSize: 'clamp(18px, 2.2vw, 36px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#0F1117', margin: 0 }}>
                {morphedTitle}
              </h1>
              <AnimatePresence mode="wait">
                {hoveredId && OVERLAY_CONFIGS[hoveredId] && (
                  <motion.div
                    key={hoveredId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ position: 'absolute', top: '100%', marginTop: '10px', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: '280px' }}
                  >
                    <Description key={hoveredId} text={OVERLAY_CONFIGS[hoveredId]!.description} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Images */}
          {DESKTOP.map(item => {
            const p = PROJECTS[item.id]
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleClick(p.href)}
                style={{ gridColumn: item.col, gridRow: item.row, cursor: 'pointer', overflow: 'hidden' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )
          })}
        </div>

        {/* Hover overlay */}
        <AnimatePresence mode="wait">
          {hoveredId && OVERLAY_CONFIGS[hoveredId] && (
            <ProjectOverlay key={hoveredId} id={hoveredId} config={OVERLAY_CONFIGS[hoveredId]!} />
          )}
        </AnimatePresence>

      </div>
    )
  }

  // ── Mobile ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100dvh', background: '#F8F8F8', overflowY: 'auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(7, auto)',
        gap: '8px',
        padding: '80px 16px 40px',
        boxSizing: 'border-box',
      }}>

        {/* Title row 3 */}
        <div style={{ gridColumn: '1 / 4', gridRow: '3', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: MONO, fontSize: 'clamp(26px, 8vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#0F1117', margin: 0, textAlign: 'center', lineHeight: 1.1 }}>
            {pageTitle}
          </h1>
        </div>

        {/* Images */}
        {MOBILE.map(item => {
          const p = PROJECTS[item.id]
          return (
            <div key={item.id} onClick={() => handleClick(p.href)}
              style={{ gridColumn: item.col, gridRow: item.row, cursor: 'pointer', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} draggable={false}
                style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          )
        })}

      </div>
    </div>
  )
}
