'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useDeck } from '@/context/DeckContext'

const CARD_EMOJIS = ['👋', '🛠️', '🌊', '☕']

export default function BottomIndicator() {
  const { activeIndex, total } = useDeck()

  if (total === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div
        className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[var(--color-border)] rounded-full px-4 py-2.5 shadow-[var(--shadow-pill)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Emoji stack */}
        <div className="flex -space-x-1.5">
          {CARD_EMOJIS.slice(0, Math.min(total, 4)).map((emoji, i) => (
            <motion.div
              key={i}
              className="w-7 h-7 rounded-full flex items-center justify-center text-base border-2 border-white bg-[var(--color-subtle)]"
              animate={{
                scale: i === activeIndex ? 1.15 : 0.85,
                opacity: i === activeIndex ? 1 : 0.45,
                zIndex: i === activeIndex ? 10 : total - i,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-[var(--color-border)]" />

        {/* Progress counter */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            className="text-xs font-semibold text-[var(--color-muted)] tabular-nums w-10 text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
          >
            {activeIndex + 1} / {total}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
