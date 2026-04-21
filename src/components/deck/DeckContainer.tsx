'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'

// ─── Context ──────────────────────────────────────────────────────────────────
const DeckContext = createContext({ topIndex: 0 })
export const useDeckTop = () => useContext(DeckContext)

export const CardActiveContext = createContext(false)

// ─── Constants ────────────────────────────────────────────────────────────────
const STACK_Y = 16
const STACK_SCALE = 0.01
const STACK_VISIBLE = 3

// Layout-switch transition: tween so FLIP + animate settle at exactly the same time,
// preventing the desync "bounce" that springs cause on the back card.
const switchTransition = {
  type: 'tween' as const,
  duration: 0.48,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

// ─── Card icon configs ────────────────────────────────────────────────────────
// Index matches card order: 0=HeroCard, 1=Upfront, 2=VisitorSystem, 3=SuggestionSystem, 4=StickerCard
const CARD_ICONS: Array<{ bg: string; imgSrc?: string; icon?: React.ReactNode }> = [
  {
    // HeroCard
    bg: 'linear-gradient(135deg, #F0EDE8 0%, #E8E4DF 100%)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="8" width="12" height="1.2" rx="0.6" fill="#1A1714" opacity="0.55" />
        <rect x="5" y="10.5" width="8" height="1.2" rx="0.6" fill="#1A1714" opacity="0.3" />
        <circle cx="6" cy="6" r="0.8" fill="#1A1714" opacity="0.4" />
        <circle cx="9" cy="5.2" r="0.6" fill="#1A1714" opacity="0.25" />
        <circle cx="12" cy="6.2" r="0.7" fill="#1A1714" opacity="0.3" />
      </svg>
    ),
  },
  {
    // Upfront
    bg: '#000',
    imgSrc: '/logo-upfront.png',
  },
  {
    // Visitor System
    bg: '#000',
    imgSrc: '/logo-visitor-system.png',
  },
  {
    // Suggestion System
    bg: '#000',
    imgSrc: '/logo-suggestion-system.png',
  },
  {
    // StickerCard
    bg: 'linear-gradient(135deg, #2E3B32 0%, #1F2A22 100%)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M5 9.5C5 9.5 5.8 7.5 7 7.5C8 7.5 8.5 9 9 9C9.8 9 10 7.5 11 7.5C12.2 7.5 13 9.5 13 9.5"
          stroke="rgba(247,247,245,0.7)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="6" y1="12" x2="12" y2="12" stroke="rgba(247,247,245,0.35)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
]

// ─── Toggle icons ─────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
      <rect x="7.5" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
      <rect x="1" y="7.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
      <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="12" height="7.5" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="1" y="2.5" width="12" height="7.5" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="1" y="5.5" width="12" height="7" rx="1.5" fill="currentColor" />
    </svg>
  )
}

// ─── Deck Indicator ───────────────────────────────────────────────────────────
function DeckIndicator({
  order,
  n,
  isGridView,
  onToggleGrid,
  onSelectCard,
}: {
  order: number[]
  n: number
  isGridView: boolean
  onToggleGrid: () => void
  onSelectCard: (i: number) => void
}) {
  const topIdx = order[0]

  // Track navigation direction for counter slot animation
  const prevTopIdx = useRef(topIdx)
  const dir = useRef(1) // 1 = forward, -1 = backward
  if (topIdx !== prevTopIdx.current) {
    dir.current = topIdx > prevTopIdx.current ? 1 : -1
    prevTopIdx.current = topIdx
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        padding: isGridView ? '6px' : '6px 6px 6px 16px',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '100px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        zIndex: 200,
        userSelect: 'none',
        transition: 'padding 0.25s ease',
      }}
    >
      <AnimatePresence mode="popLayout">
        {/* Counter — collapses to width:0 when switching to grid. overflow:hidden needed here. */}
        {!isGridView && (
          <motion.div
            key="counter"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '12px',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Slot-machine counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                color: '#B0A898',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '18px', overflow: 'hidden' }}>
                <AnimatePresence mode="popLayout" custom={dir.current}>
                  <motion.span
                    key={topIdx}
                    custom={dir.current}
                    initial={{ y: dir.current * 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: dir.current * -14, opacity: 0 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: 'absolute', textAlign: 'center', width: '100%' }}
                  >
                    {topIdx + 1}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>of {n}</span>
            </div>

            {/* Divider between counter and thumbs */}
            <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.08)', flexShrink: 0 }} />
          </motion.div>
        )}

        {/* Thumbs — separate from overflow container so box-shadow ring is never clipped */}
        {!isGridView && (
          <motion.div
            key="thumbs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '4px 0' }}
          >
            {Array.from({ length: n }, (_, i) => {
              const cfg = CARD_ICONS[i] ?? CARD_ICONS[0]
              const isActive = order[0] === i
              return (
                <motion.div
                  key={i}
                  animate={{ width: isActive ? 36 : 30, height: isActive ? 36 : 30 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onClick={() => onSelectCard(i)}
                  title={`Card ${i + 1}`}
                  style={{
                    borderRadius: '50%',
                    marginRight: i < n - 1 ? -8 : 0,
                    zIndex: isActive ? n + 1 : n - i,
                    cursor: 'pointer',
                    flexShrink: 0,
                    position: 'relative',
                    // Ring lives on the outer wrapper — no overflow:hidden here, so it's always a full circle
                    boxShadow: isActive ? '0 0 0 1.5px #9CA3AF, 0 3px 10px rgba(0,0,0,0.12)' : 'none',
                    transition: 'box-shadow 0.22s ease',
                  }}
                >
                  {/* Inner div: clips image + provides white gap */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(255,255,255,0.95)',
                      background: cfg.imgSrc ? '#FFFFFF' : cfg.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {cfg.imgSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cfg.imgSrc} alt="" style={{ width: '85%', height: '85%', objectFit: 'contain', display: 'block' }} />
                    ) : (
                      cfg.icon
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider before grid toggle (only in stack mode) */}
      <AnimatePresence>
        {!isGridView && (
          <motion.div
            key="divider"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 1 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22 }}
            style={{ height: '20px', background: 'rgba(0,0,0,0.08)', flexShrink: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Grid toggle */}
      <motion.button
        onClick={onToggleGrid}
        whileTap={{ scale: 0.88, transition: { duration: 0.1 } }}
        aria-label={isGridView ? 'Switch to stack view' : 'Switch to grid view'}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isGridView ? '#1A1714' : 'rgba(26,23,20,0.07)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGridView ? '#F7F7F5' : '#8C7E6E',
          transition: 'background 0.2s ease, color 0.2s ease',
          flexShrink: 0,
        }}
      >
        {isGridView ? <StackIcon /> : <GridIcon />}
      </motion.button>
    </motion.div>
  )
}

// ─── Scroll cursor ────────────────────────────────────────────────────────────
function ScrollCursor({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px'
        ref.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#C8D97A',
        borderRadius: '100px',
        padding: '8px 14px 8px 12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 2.5V10.5M6.5 10.5L3 7M6.5 10.5L10 7" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{
        fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        color: '#1A1714',
        whiteSpace: 'nowrap',
      }}>
        Scroll down
      </span>
    </div>
  )
}

// ─── Deck Container ───────────────────────────────────────────────────────────
export default function DeckContainer({ children }: { children: React.ReactNode }) {
  const cards = React.Children.toArray(children) as React.ReactElement[]
  const n = cards.length

  const [order, setOrder] = useState<number[]>(Array.from({ length: n }, (_, i) => i))
  const [leaving, setLeaving] = useState<number | null>(null)
  const [snapSet, setSnapSet] = useState<Set<number>>(new Set())
  const [isGridView, setIsGridView] = useState(false)
  const [cursorActive, setCursorActive] = useState(false)
  const [badgeHovered, setBadgeHovered] = useState(false)
  const [retreatingState, setRetreatingState] = useState<{ cardIdx: number; phase: 'set' | 'animate' } | null>(null)
  const locked = useRef(false)

  useEffect(() => {
    const handler = (e: Event) => setBadgeHovered((e as CustomEvent<boolean>).detail)
    window.addEventListener('badge-hover', handler)
    return () => window.removeEventListener('badge-hover', handler)
  }, [])

  const advance = useCallback(() => {
    if (isGridView || leaving !== null || locked.current) return
    locked.current = true

    const top = order[0]
    setLeaving(top)

    setTimeout(() => {
      setOrder(prev => {
        const [first, ...rest] = prev
        return [...rest, first]
      })
      setSnapSet(prev => new Set([...prev, top]))
      setLeaving(null)

      setTimeout(() => {
        setSnapSet(prev => {
          const next = new Set(prev)
          next.delete(top)
          return next
        })
        locked.current = false
      }, 80)
    }, 580)
  }, [order, leaving, isGridView])

  const retreat = useCallback(() => {
    if (isGridView || leaving !== null || locked.current) return
    locked.current = true

    const last = order[order.length - 1]

    // Phase 1: instantly place the incoming card at the fly-away position
    setRetreatingState({ cardIdx: last, phase: 'set' })

    // Phase 2: after framer-motion has processed the snap, animate it back in
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setRetreatingState({ cardIdx: last, phase: 'animate' })
      setOrder(prev => {
        const l = prev[prev.length - 1]
        return [l, ...prev.slice(0, -1)]
      })
    }))

    setTimeout(() => {
      setRetreatingState(null)
      locked.current = false
    }, 700)
  }, [order, leaving, isGridView])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isGridView) return
      if (e.deltaY > 15)  advance()
      if (e.deltaY < -15) retreat()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [advance, retreat, isGridView])

  const touchY = useRef<number | null>(null)
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      if (touchY.current === null) return
      const diff = touchY.current - e.changedTouches[0].clientY
      if (!isGridView) {
        if (diff > 60)  advance()
        if (diff < -60) retreat()
      }
      touchY.current = null
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [advance, retreat, isGridView])

  const mouseY = useRef<number | null>(null)
  useEffect(() => {
    const onDown = (e: MouseEvent) => { mouseY.current = e.clientY }
    const onUp = (e: MouseEvent) => {
      if (mouseY.current === null) return
      const diff = mouseY.current - e.clientY
      if (!isGridView) {
        if (diff > 60)  advance()
        if (diff < -60) retreat()
      }
      mouseY.current = null
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [advance, retreat, isGridView])

  const selectCard = useCallback((cardIdx: number) => {
    setOrder(prev => [cardIdx, ...prev.filter(i => i !== cardIdx)])
    setIsGridView(false)
  }, [])

  const renderOrder = [...order].reverse()

  return (
    <DeckContext.Provider value={{ topIndex: order[0] }}>
      <LayoutGroup id="deck">

        {/* ── Frosted backdrop (grid only) ─────────────────────────────── */}
        <AnimatePresence>
          {isGridView && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(247,247,245,0.9)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                zIndex: 40,
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Stack view ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {!isGridView && (
            <motion.div
              key="stack"
              initial={false}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              {renderOrder.map(cardIdx => {
                const pos = order.indexOf(cardIdx)
                const isLeaving   = leaving === cardIdx
                const isSnapping  = snapSet.has(cardIdx)
                const isRetSet    = retreatingState?.cardIdx === cardIdx && retreatingState.phase === 'set'
                const isRetAnim   = retreatingState?.cardIdx === cardIdx && retreatingState.phase === 'animate'

                return (
                  <motion.div
                    key={cardIdx}
                    layoutId={`card-${cardIdx}`}
                    initial={false}
                    animate={
                      isRetSet
                        ? { y: -500, x: 300, rotate: 30, scale: 1, opacity: 0 }
                        : isRetAnim
                        ? { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }
                        : isLeaving
                        ? { y: -500, x: 300, rotate: 30, scale: 1, opacity: 0 }
                        : {
                            y: pos * STACK_Y,
                            x: 0,
                            rotate: 0,
                            scale: 1 - pos * STACK_SCALE,
                            opacity: isSnapping ? 0 : pos < STACK_VISIBLE ? 1 : 0,
                          }
                    }
                    transition={
                      isRetSet
                        ? { duration: 0 }
                        : isRetAnim
                        ? { duration: 0.55, ease: [0.55, 1, 0.45, 1] }
                        : isLeaving
                        ? { duration: 0.55, ease: [0.55, 0, 0.45, 0] }
                        : isSnapping
                        ? { duration: 0 }
                        : switchTransition
                    }
                    onMouseEnter={() => pos === 0 && setCursorActive(true)}
                    onMouseLeave={() => pos === 0 && setCursorActive(false)}
                    style={{
                      position: 'absolute',
                      zIndex: (isRetSet || isRetAnim) ? 20 : 10 - pos,
                      transformOrigin: 'center center',
                      pointerEvents: pos === 0 ? 'auto' : 'none',
                      cursor: pos === 0 ? 'none' : 'default',
                      userSelect: 'none',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <CardActiveContext.Provider value={pos === 0}>
                      {cards[cardIdx]}
                    </CardActiveContext.Provider>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Grid view ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isGridView && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'fixed',
                inset: 0,
                paddingTop: '80px',
                paddingBottom: '120px',
                overflowY: 'auto',
                zIndex: 50,
              }}
            >
              <div className="deck-grid">
                {Array.from({ length: n }, (_, i) => i).map(cardIdx => (
                  /*
                   * Clip slot: overflow:hidden so the full-size card
                   * at scale(0.5) doesn't spill outside the cell.
                   * display:flex centers the card inside the slot.
                   */
                  <div
                    key={cardIdx}
                    onClick={() => selectCard(cardIdx)}
                    style={{
                      height: '308px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      position: 'relative',
                      // Base shadow always present — no value change = no pop
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/*
                     * The layoutId lives on this motion.div.
                     * In grid mode  → scale: 0.5  (half-size thumbnail)
                     * In stack mode → scale: 1 - pos * STACK_SCALE (full / stacked)
                     *
                     * Critically: the card content inside NEVER changes layout.
                     * Only the outer transform changes — so there is zero reflow
                     * during the FLIP animation. This is the key to smoothness.
                     */}
                    <motion.div
                      layoutId={`card-${cardIdx}`}
                      initial={false}
                      animate={{ scale: 0.5, y: 0, x: 0, rotate: 0, opacity: 1 }}
                      transition={switchTransition}
                      style={{
                        transformOrigin: 'center center',
                        flexShrink: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <CardActiveContext.Provider value={false}>
                        {cards[cardIdx]}
                      </CardActiveContext.Provider>
                    </motion.div>

                    {/* Active highlight — always in DOM, opacity animates to avoid mount/unmount pop */}
                    <motion.div
                      animate={{ opacity: order[0] === cardIdx ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '12px',
                        boxShadow: '0 0 0 2.5px rgba(26,23,20,0.28), 0 4px 20px rgba(0,0,0,0.08)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </LayoutGroup>

      <DeckIndicator
        order={order}
        n={n}
        isGridView={isGridView}
        onToggleGrid={() => setIsGridView(v => !v)}
        onSelectCard={selectCard}
      />

      <ScrollCursor visible={cursorActive && !isGridView && !badgeHovered} />
    </DeckContext.Provider>
  )
}
