'use client'

import { useEffect, useRef, useState } from 'react'
import { CASE_STUDY as C } from './tokens'
import { useScrollProgress } from '@/contexts/scroll-progress'

export interface NavSection {
  id: string
  label: string
}

interface CaseStudyShellProps {
  title: string
  subtitle?: string
  sections: NavSection[]
  children: React.ReactNode
}

export function CaseStudyShell({ sections, children }: CaseStudyShellProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')
  const contentRef = useRef<HTMLDivElement>(null)
  const { setProgress, setSections, setActiveSection: ctxSetActive, registerScrollTo } = useScrollProgress()

  // Register sections + scrollTo with context on mount
  useEffect(() => {
    setSections(sections)
    registerScrollTo((id: string) => {
      contentRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => {
      setSections([])
      setProgress(0)
    }
  }, [sections, setSections, setProgress, registerScrollTo])

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
  }, [setProgress])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            ctxSetActive(entry.target.id)
          }
        }
      },
      { root: container, rootMargin: '-10% 0px -65% 0px', threshold: 0 },
    )
    sections.forEach(({ id }) => {
      const el = container.querySelector(`#${id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections, ctxSetActive])

  // Keep local activeSection in sync (for initial state)
  useEffect(() => {
    ctxSetActive(activeSection)
  }, [activeSection, ctxSetActive])

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: C.bg,
        fontFamily: C.fontSans,
      }}
    >
      <main ref={contentRef} style={{ height: '100dvh', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
