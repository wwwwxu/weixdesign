'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Badge data ────────────────────────────────────────────────────────────────

const BADGES = [
  {
    id: 'guitar',
    src: '/badges/guitar.png',
    alt: 'Electric guitar',
    name: '🎸 Eternal Setlist',
    fact: "My band's first gig got \"postponed indefinitely\" by COVID. We're still waiting for the venue to call back.",
  },
  {
    id: 'cat',
    src: '/badges/cat.png',
    alt: 'Pixel cat',
    name: '🐱 奶油 / Crème',
    fact: "My cat is 5 years old — tiny face, maximum body. He's built like a dumpling and has the energy of a decorative pillow.",
  },
  {
    id: 'australia',
    src: '/badges/australia.png',
    alt: 'Australia map',
    name: '🦘 Six Months Down Under',
    fact: 'I did a working holiday in Australia. Survived. Thrived. Had 3 summers in one year.',
  },
  {
    id: 'redhair',
    src: '/badges/redhair.png',
    alt: 'Pixel portrait',
    name: '💇 The Red Era',
    fact: 'Once upon a time I shaved it short and dyed it all red. No regrets.',
  },
  {
    id: 'bike',
    src: '/badges/bike.png',
    alt: 'Bicycle',
    name: '🚴 Bike Traveller',
    fact: "I cycle. A lot. Like, an amount. My bike has seen more of the world than most people's cars.",
  },
  {
    id: 'pepper',
    src: '/badges/pepper.png',
    alt: 'Chili pepper',
    name: '🌶️ Chilli Hometown',
    fact: "I'm from a region famous for its spicy food. I cannot eat spicy food. My hometown has not forgiven me.",
  },
]

const MONO = 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace'
const SANS = 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif'

// ── Component ─────────────────────────────────────────────────────────────────

export default function StickerCard() {
  const [unlocked, setUnlocked] = useState<number[]>([])
  const [newest,   setNewest]   = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const COLS = isMobile ? 2 : 3

  useEffect(() => {
    const stored = localStorage.getItem('badge_count')
    const prevCount = stored ? parseInt(stored, 10) : 0
    const count = Math.min(prevCount + 1, BADGES.length)
    localStorage.setItem('badge_count', String(count))
    const unlockedList = Array.from({ length: count }, (_, i) => i)
    setUnlocked(unlockedList)
    setNewest(unlockedList[unlockedList.length - 1])
    setTimeout(() => setRevealed(true), 250)
  }, [])

  const allUnlocked = unlocked.length === BADGES.length

  return (
    <div
      style={{
        width: 'min(898px, calc(100vw - 80px))',
        height: '528px',
        borderRadius: '12px',
        background: '#D4E8B0',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)',
        padding: '32px clamp(32px, 4vw, 52px) 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <p style={{
          fontFamily: SANS,
          fontSize: 'clamp(22px, 3vw, 30px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'rgba(26,23,20,0.82)',
          margin: 0,
        }}>
          Thanks for stopping by :)
        </p>
        <p style={{
          fontFamily: SANS,
          fontSize: '14px',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: 'rgba(26,23,20,0.38)',
          margin: 0,
        }}>
          Here are some fun facts about me!
        </p>
      </div>

      {/* ── Sticker grid ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: '14px 28px',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          {BADGES.map((b, i) => {
            const isUnlocked = unlocked.includes(i)
            const isNewest   = i === newest

            return (
              <div
                key={b.id}
                style={{
                  width: '90px',
                  height: '90px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'visible',
                  zIndex: hovered === i ? 10 : 1,
                }}
                onMouseEnter={() => {
                  if (!isMobile && isUnlocked) {
                    setHovered(i)
                    window.dispatchEvent(new CustomEvent('badge-hover', { detail: true }))
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHovered(null)
                    window.dispatchEvent(new CustomEvent('badge-hover', { detail: false }))
                  }
                }}
                onClick={() => {
                  if (isMobile && isUnlocked) {
                    setHovered(hovered === i ? null : i)
                  }
                }}
              >
                {isUnlocked ? (
                  /* ── Unlocked: sticker style ─────────────────────── */
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, rotate: isNewest ? [0, -4, 3, 0] : 0 }}
                    transition={isNewest
                      ? { duration: 0.55, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                      : { duration: 0.4, delay: 0.1 + unlocked.indexOf(i) * 0.06, ease: [0.34, 1.56, 0.64, 1] }
                    }
                    whileHover={{ scale: 1.08, rotate: 2, transition: { duration: 0.2 } }}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: hovered === i
                        ? '0 0 0 3px #FFFFFF, 0 6px 20px rgba(0,0,0,0.25)'
                        : 'none',
                      cursor: 'default',
                      filter: hovered !== null && hovered !== i ? 'brightness(0.65)' : 'none',
                      transition: 'filter 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.src}
                      alt={b.alt}
                      width={76}
                      height={76}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', imageRendering: 'pixelated' }}
                    />
                  </motion.div>
                ) : (
                  /* ── Locked: tiny dot ────────────────────────────── */
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(26,23,20,0.15)',
                  }} />
                )}

                {/* ── Tooltip ──────────────────────────────────────── */}
                <AnimatePresence>
                  {hovered === i && isUnlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: isMobile ? 'fixed' : 'absolute',
                        ...(isMobile
                          ? { top: 'calc(50vh - 70px)', left: 'calc(50vw - 110px)' }
                          : { bottom: 'calc(100% + 10px)', left: 'calc(50% - 110px)' }
                        ),
                        width: '220px',
                        height: '140px',
                        background: 'rgba(255,255,255,0.68)',
                        backdropFilter: 'blur(20px) saturate(1.8)',
                        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                        borderRadius: '16px',
                        border: '0.5px solid rgba(255,255,255,0.8)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                        padding: '14px 16px',
                        zIndex: 20,
                        pointerEvents: 'none',
                        textAlign: 'left',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <p style={{
                        fontFamily: SANS,
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#1A1714',
                        margin: '0 0 6px',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {b.name}
                      </p>
                      <p style={{
                        fontFamily: SANS,
                        fontWeight: 400,
                        fontSize: '13px',
                        color: '#4B5563',
                        margin: 0,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'normal',
                        lineHeight: 1.5,
                      }}>
                        {b.fact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Footer hint ──────────────────────────────────────────────────── */}
      {!allUnlocked && revealed && (
        <p style={{
          fontFamily: SANS,
          fontSize: '13px',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: 'rgba(26,23,20,0.28)',
          textAlign: 'center',
          margin: 0,
        }}>
          Come back again for another one.
        </p>
      )}
    </div>
  )
}
