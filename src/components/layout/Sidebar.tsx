'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'HOME',  href: '#',       cn: '首頁' },
  { label: 'WORK',  href: '#work',   cn: '作品' },
  { label: 'PLAY',  href: '#play',   cn: '實驗' },
  { label: 'INFO',  href: '#info',   cn: '關於' },
]

export default function Sidebar() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[280px] border-r-2 border-[#1A1A1A] bg-[#F4F3EF] z-50 flex flex-col"
    >
      {/* ── Header ── */}
      <div className="border-b-2 border-[#1A1A1A] p-6 flex items-start gap-4">
        <div className="flex-1">
          <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#1A1A1A] leading-none uppercase">
            Wei&apos;s
          </p>
          <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#6B6B6B] leading-none uppercase mt-1">
            Design Space
          </p>
        </div>

        {/* Chinese name — vertical */}
        <div className="writing-vertical font-serif-cn text-[13px] tracking-[0.3em] text-[#1A1A1A] leading-none select-none">
          「許維」
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 pt-2">
        {navItems.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between px-6 py-4 border-b border-[#2E2E2E]/20 cursor-pointer transition-colors duration-150"
            style={{
              backgroundColor: hovered === item.label ? '#1A1A1A' : 'transparent',
              color:           hovered === item.label ? '#F4F3EF' : '#1A1A1A',
            }}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="font-sans text-[11px] font-semibold tracking-[0.25em]">
              {item.label}
            </span>
            <span
              className="font-serif-cn text-[11px] tracking-[0.15em] transition-opacity duration-150"
              style={{ opacity: hovered === item.label ? 0.7 : 0.35 }}
            >
              {item.cn}
            </span>
          </motion.a>
        ))}
      </nav>

      {/* ── Footer meta ── */}
      <div className="border-t-2 border-[#1A1A1A] p-6 space-y-1">
        <p className="font-sans text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase">
          Visual Designer
        </p>
        <p className="font-sans text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase">
          & Creative Technologist
        </p>
        <p className="font-sans text-[9px] tracking-[0.2em] text-[#AFAFAF] uppercase mt-3">
          © 2025 Wei Xu
        </p>
      </div>
    </aside>
  )
}
