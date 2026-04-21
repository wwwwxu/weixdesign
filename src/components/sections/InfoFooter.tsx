'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const skills = [
  'Brand Identity', 'Motion Design', 'UI / UX Design',
  'Editorial & Print', 'Creative Direction', 'Design Systems',
]

const contacts = [
  { label: 'Email',    value: 'hello@weixu.design',  href: 'mailto:hello@weixu.design' },
  { label: 'Behance',  value: 'behance.net/weixu',   href: '#' },
  { label: 'LinkedIn', value: 'linkedin.com/in/weixu', href: '#' },
  { label: 'Instagram', value: '@weixu.design',      href: '#' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
})

export default function InfoFooter() {
  return (
    <section id="info" className="bg-[#1A1A1A] text-[#F4F3EF]">

      {/* ── Top divider row ── */}
      <div className="border-b border-[#F4F3EF]/10 px-10 py-5 flex items-center justify-between">
        <motion.div
          className="writing-vertical font-serif-cn text-[13px] tracking-[0.5em] text-[#F4F3EF]/60 leading-none"
          {...fadeUp(0)}
        >
          「簡介」
        </motion.div>
        <motion.span
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#F4F3EF]/30"
          {...fadeUp(0.1)}
        >
          About — Index 03
        </motion.span>
      </div>

      {/* ── Main content ── */}
      <div className="px-10 py-16 grid grid-cols-12 gap-px">

        {/* Bio column */}
        <div className="col-span-7 pr-12 space-y-8">
          <motion.h2
            className="font-sans text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F4F3EF]"
            {...fadeUp(0.1)}
          >
            Designing at the edge
            <br />
            of culture and code.
          </motion.h2>

          <motion.p
            className="font-sans text-[13px] leading-[1.9] text-[#F4F3EF]/60 max-w-md"
            {...fadeUp(0.2)}
          >
            I&apos;m Wei Xu (許維) — a visual designer and creative technologist with a passion
            for work that carries cultural weight. From brand systems to motion and interface
            design, I bring a rigorous editorial eye to everything I touch.
          </motion.p>

          <motion.p
            className="font-serif-cn text-[13px] leading-[2.2] text-[#F4F3EF]/35 tracking-[0.1em]"
            {...fadeUp(0.25)}
          >
            「以設計為語言，以文化為根基。」
          </motion.p>

          {/* Skills list */}
          <motion.div
            className="pt-4 border-t border-[#F4F3EF]/10 space-y-2"
            {...fadeUp(0.3)}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#F4F3EF]/30 mb-3">
              Disciplines
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#F4F3EF]/60 border border-[#F4F3EF]/20 px-3 py-1.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact column */}
        <div className="col-span-5 pl-8 border-l border-[#F4F3EF]/10">
          <motion.p
            className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#F4F3EF]/30 mb-8"
            {...fadeUp(0.15)}
          >
            Contact & Links
          </motion.p>

          <div className="space-y-0">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                className="group flex items-center justify-between py-4 border-b border-[#F4F3EF]/10 hover:border-[#F4F3EF]/30 transition-colors duration-200"
                {...fadeUp(0.2 + i * 0.07)}
              >
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F4F3EF]/40 group-hover:text-[#F4F3EF]/60 transition-colors duration-200">
                  {c.label}
                </span>
                <span className="font-sans text-[12px] text-[#F4F3EF]/70 group-hover:text-[#F4F3EF] transition-colors duration-200">
                  {c.value} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12"
            {...fadeUp(0.5)}
          >
            <p className="font-sans text-[11px] leading-relaxed text-[#F4F3EF]/40 mb-4">
              Open to full-time roles, freelance projects,
              and interesting collaborations.
            </p>
            <a
              href="mailto:hello@weixu.design"
              className="inline-block font-sans text-[11px] font-semibold tracking-[0.25em] uppercase bg-[#F4F3EF] text-[#1A1A1A] px-6 py-3 hover:bg-[#F4F3EF]/80 transition-colors duration-200"
            >
              Let&apos;s Talk →
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="border-t border-[#F4F3EF]/10 px-10 py-5 flex items-center justify-between">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#F4F3EF]/25">
          Wei Xu · 許維 · Visual Designer
        </span>
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#F4F3EF]/25">
          © 2025 — All Rights Reserved
        </span>
      </div>
    </section>
  )
}
