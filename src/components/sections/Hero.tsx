'use client'

import { motion, type Transition } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE } satisfies Transition,
})

export default function Hero() {
  return (
    <section className="min-h-screen border-b-2 border-[#1A1A1A] relative flex flex-col">

      {/* ── Top bar ── */}
      <div className="border-b border-[#2E2E2E]/30 flex items-center justify-between px-10 py-4">
        <motion.span
          className="font-sans text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase"
          {...fadeUp(0.2)}
        >
          Est. Shanghai — Now Global
        </motion.span>
        <motion.span
          className="font-sans text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase"
          {...fadeUp(0.25)}
        >
          Portfolio 2025 / Vol. I
        </motion.span>
      </div>

      {/* ── Main headline area ── */}
      <div className="flex-1 flex flex-col justify-between px-10 pt-16 pb-12">

        {/* Index number */}
        <motion.div
          className="self-end font-sans text-[120px] font-bold leading-none text-[#1A1A1A]/[0.06] select-none"
          {...fadeUp(0.1)}
        >
          01
        </motion.div>

        <div className="space-y-6 -mt-16">
          {/* Role tag */}
          <motion.div
            className="inline-flex items-center gap-3 border border-[#2E2E2E] px-3 py-1.5"
            {...fadeUp(0.3)}
          >
            <span className="w-1.5 h-1.5 bg-[#1A1A1A] inline-block" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]">
              Available for projects
            </span>
          </motion.div>

          {/* Primary headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-sans text-[clamp(44px,5.5vw,72px)] font-bold leading-[1.0] tracking-[-0.03em] text-[#1A1A1A] uppercase"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            >
              Visual Designer
              <br />
              <span className="text-[#2E2E2E]/40">& Creative</span>
              <br />
              Technologist.
            </motion.h1>
          </div>
        </div>

        {/* ── Lower bar: editorial text + Chinese identity ── */}
        <div className="flex items-end justify-between mt-16 pt-8 border-t border-[#2E2E2E]/30">

          <div className="max-w-sm space-y-4">
            <motion.p
              className="font-sans text-[13px] leading-[1.8] text-[#6B6B6B]"
              {...fadeUp(0.6)}
            >
              Crafting identities, interfaces, and experiences that
              live at the intersection of cultural memory and digital
              precision. Based everywhere, rooted somewhere.
            </motion.p>
            <motion.div
              className="flex items-center gap-6"
              {...fadeUp(0.7)}
            >
              <a
                href="#work"
                className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-0.5 hover:text-[#6B6B6B] hover:border-[#6B6B6B] transition-colors duration-200"
              >
                View Work →
              </a>
              <a
                href="#info"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                About Me
              </a>
            </motion.div>
          </div>

          {/* Chinese identity block */}
          <motion.div
            className="flex items-end gap-4"
            {...fadeUp(0.65)}
          >
            <div className="writing-vertical font-serif-cn text-[13px] tracking-[0.4em] text-[#1A1A1A]/50 leading-none">
              「設計師 · 許維」
            </div>
            <div className="space-y-1 text-right">
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#AFAFAF]">Wei Xu</p>
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#AFAFAF]">許維</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
