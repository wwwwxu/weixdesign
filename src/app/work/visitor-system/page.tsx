'use client'

import { useState } from 'react'
import {
  CaseStudyShell,
  Section,
  FullSection,
  DesktopMockup,
  CASE_STUDY as C,
} from '@/components/work'

// ─── Nav ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'background',   label: 'Background' },
  { id: 'research',     label: 'Research' },
  { id: 'problems',     label: 'Problems' },
  { id: 'hmw',          label: 'How Might We' },
  { id: 'ideation',     label: 'Ideation' },
  { id: 'solution',     label: 'Solution' },
  { id: 'happy-paths',  label: 'Happy Paths' },
  { id: 'ship',         label: 'Ship & Iterate' },
  { id: 'impact',       label: 'Impact' },
  { id: 'reflection',   label: 'Reflection' },
]

// ─── Local sub-components ─────────────────────────────────────────────────────

function ImgPlaceholder({ label, aspectRatio = '16 / 7', src }: { label: string; aspectRatio?: string; src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={label} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
    )
  }
  return (
    <div style={{
      width: '100%',
      aspectRatio,
      backgroundColor: '#E8E6E2',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: C.fontMono,
        fontSize: '11px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        color: 'rgba(26,23,20,0.28)',
      }}>
        {label}
      </span>
    </div>
  )
}

function NumberedItem({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderTop: `1px solid ${C.border}`, paddingBlock: '16px' }}>
      <div style={{ fontFamily: C.fontMono, fontSize: '11px', fontWeight: 500, color: C.accent, flexShrink: 0, paddingTop: '2px', minWidth: '20px' }}>
        {n}
      </div>
      <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>
        {children}
      </p>
    </div>
  )
}

// ─── Video frame helpers ───────────────────────────────────────────────────────

function DesktopVideo({ src, imgSrc }: { src?: string; imgSrc?: string }) {
  return (
    <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid #E4E4E1', background: '#F5F5F3', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 12px', background: '#F0F0EE', borderBottom: '1px solid #E4E4E1', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8D8D6' }} />)}
        </div>
        <div style={{ flex: 1, height: '14px', background: '#E4E4E1', borderRadius: '3px' }} />
      </div>
      <div style={{ height: '520px', overflowY: 'auto' }}>
        {src
          ? <video key={src} autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}><source src={src} type="video/mp4" /></video>
          // eslint-disable-next-line @next/next/no-img-element
          : <img src={imgSrc} alt="" style={{ width: '100%', display: 'block' }} />
        }
      </div>
    </div>
  )
}

function MobileVideo({ src, imgSrc }: { src?: string; imgSrc?: string }) {
  return (
    <div style={{ width: '220px', flexShrink: 0, borderRadius: '32px', border: '2px solid #D4D4D0', background: '#F5F5F3', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ height: '26px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderBottom: '1px solid #F0F0EE' }}>
        <div style={{ width: '56px', height: '8px', background: '#1A1714', borderRadius: '8px', opacity: 0.08 }} />
      </div>
      <div style={{ height: '480px', overflowY: 'auto' }}>
        {src
          ? <video key={src} autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}><source src={src} type="video/mp4" /></video>
          // eslint-disable-next-line @next/next/no-img-element
          : <img src={imgSrc} alt="" style={{ width: '100%', display: 'block' }} />
        }
      </div>
    </div>
  )
}

// ─── Staff tab carousel ───────────────────────────────────────────────────────

const STAFF_TABS = [
  {
    key: 'submission',
    label: 'Submission',
    desktop: '/work/visitor/staff-submit-desktop.mp4',
    mobile: '/work/visitor/staff-submit-mobile.mp4',
  },
  {
    key: 'manage',
    label: 'Manage Information',
    desktop: '/work/visitor/staff-manage-desktop.mp4',
    mobile: '/work/visitor/staff-manage-mobile.mp4',
  },
]

function StaffTabCarousel() {
  const [activeKey, setActiveKey] = useState('submission')
  const active = STAFF_TABS.find(t => t.key === activeKey) ?? STAFF_TABS[0]

  return (
    <div>
      <div style={{ display: 'inline-flex', gap: '2px', background: C.border, padding: '3px', borderRadius: '8px', marginBottom: '16px' }}>
        {STAFF_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveKey(key)}
            style={{
              padding: '6px 18px',
              borderRadius: '6px',
              border: 'none',
              background: activeKey === key ? C.surface : 'transparent',
              color: activeKey === key ? C.ink : C.muted,
              fontFamily: C.fontSans,
              fontSize: '13px',
              fontWeight: activeKey === key ? 500 : 400,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
              boxShadow: activeKey === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="cs-video-pair">
        <DesktopVideo src={active.desktop} />
        <MobileVideo src={active.mobile} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VisitorSystemCaseStudy() {
  return (
    <CaseStudyShell
      title="Visitor System"
      subtitle="Internal Platform · 2021–2022"
      sections={SECTIONS}
    >

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="work-hero" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          fontFamily: C.fontMono,
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.subtle,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, display: 'inline-block', flexShrink: 0 }} />
          Product Design — Hesai Technology — 2021–2022
        </div>

        <h1 style={{
          fontFamily: C.fontSans,
          fontSize: 'clamp(32px, 3.8vw, 52px)',
          fontWeight: 300,
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          color: C.ink,
          maxWidth: '680px',
          margin: '0 0 16px',
        }}>
          Visitor System
        </h1>

        <p style={{
          fontFamily: C.fontSans,
          fontSize: '17px',
          fontWeight: 300,
          lineHeight: 1.65,
          color: C.muted,
          maxWidth: '560px',
          margin: '0 0 40px',
        }}>
          An all-in-one system that delivers a fresh experience for both visitors and employees — shifting from paper-based chaos to a unified digital platform serving 4,800+ annual visitors across 4 locations.
        </p>

        <dl className="cs-meta-dl" style={{ paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
          {[
            { label: 'Timeframe',    value: 'May 2021 – Oct 2022' },
            { label: 'Role',         value: 'Product Designer & PM' },
            { label: 'Team',         value: '1 PM, 2+ Engineers, 1 Designer' },
            { label: 'Scope',        value: '0-to-1, End-to-end' },
            { label: 'Deliverables', value: '4 platforms, 150+ interfaces' },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle, marginBottom: '5px' }}>{label}</dt>
              <dd style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 400, color: C.ink, lineHeight: 1.4 }}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Hero image ────────────────────────────────────────────────────── */}
      <FullSection padding="32px 80px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/visitor/image-1.png" alt="Visitor system overview" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
      </FullSection>

      {/* ── Background ────────────────────────────────────────────────────── */}
      <Section id="background" label="Background">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '16px', maxWidth: '560px' }}>
          Hesai was at a stage of rapid growth. Their visitor process still ran on paper.
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '500px', marginBottom: '8px' }}>
          100+ visitors per day at 4 locations. But the check-in process was entirely paper-based — creating security risks, communication gaps, and a poor first impression at a company preparing for its NYSE IPO.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <NumberedItem n="01">
            Invitation process required initiating multiple approvals through the OA system — area access, meals, and gifts each required separate flows with no unified tracking
          </NumberedItem>
          <NumberedItem n="02">
            Paper-based front desk registration posed information security risks and created no audit trail as Hesai prepared for its NYSE listing
          </NumberedItem>
          <NumberedItem n="03">
            Complex information synchronization between staff and front desk — communicated verbally or via chat, leading to constant last-minute scrambles
          </NumberedItem>
          <NumberedItem n="04">
            Zero formal welcome experience for visitors — no brand touchpoint, no feedback channel, no before or after-care
          </NumberedItem>
        </div>
      </Section>

      {/* ── Research ──────────────────────────────────────────────────────── */}
      <Section id="research" label="Research">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '16px' }}>
          Clarify with users
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '500px', marginBottom: '24px' }}>
          I interviewed different parties to understand the full visitor journey from every angle — employees, admin staff, and visitors alike.
        </p>
        <div className="cs-row-2">
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: 0, flexGrow: 1, flexShrink: 1 }}>
            {[
              { n: '6', label: 'Co-workers in Sales & HR departments' },
              { n: '4', label: 'Administrative staffs at 4 locations' },
              { n: '2', label: 'Visitors with recent experience' },
            ].map(({ n, label }) => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif', fontSize: '56px', letterSpacing: '-0.04em', lineHeight: 1, color: C.ink, fontStyle: 'italic' }}>
                  {n}
                </div>
                <div style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: '16px', color: C.muted, marginTop: '6px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ flexBasis: 0, flexGrow: 1, flexShrink: 1 }}>
            <ImgPlaceholder label="Image 2" aspectRatio="4 / 3" src="/work/visitor/image-2.png" />
          </div>
        </div>
      </Section>

      {/* ── Problems ──────────────────────────────────────────────────────── */}
      <Section id="problems" label="Problems">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px' }}>
          Define the problems
        </h2>
        <div className="cs-card-row">
          {[
            {
              tag: 'Efficiency — Inviters',
              stats: [{ v: '5+', l: 'working days' }, { v: '3×3', l: 'approvals' }, { v: '5+', l: 'people' }],
              body: 'The invitation process required initiating multiple separate approvals across the OA system. Staff had to track each one manually.',
            },
            {
              tag: 'Confidentiality — Admin',
              stats: [{ v: '1×', l: 'Paper form was lost. A visitor didn\'t leave after the visit.' }],
              body: 'As the company prepared for its IPO, these security risks became completely unacceptable with zero audit trail.',
            },
            {
              tag: 'Company Culture — Visitors',
              stats: [{ v: '0', l: 'Before/after-care for visitors. No welcome, no feedback.' }],
              body: "No formal welcome, no feedback channel. The first impression didn't match the company's ambition or IPO-readiness.",
            },
          ].map(({ tag, stats, body }) => (
            <div key={tag} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px' }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#DC2626' }}>
                {tag}
              </div>
              <div style={{ display: 'flex', gap: '16px', paddingBlock: '8px' }}>
                {stats.map(({ v, l }) => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif', fontSize: stats.length > 1 ? '30px' : '40px', letterSpacing: '-0.03em', lineHeight: 1, color: C.ink, fontStyle: 'italic' }}>
                      {v}
                    </div>
                    <div style={{ fontFamily: C.fontSans, fontSize: stats.length > 1 ? '11px' : '12px', lineHeight: '14px', color: C.subtle }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How Might We ──────────────────────────────────────────────────── */}
      <Section id="hmw" label="How Might We">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px' }}>
          Turn three pain points into design opportunities
        </h2>
        <div className="cs-card-row">
          {[
            { tag: 'Efficiency',       q: 'Build an integrated system for all visit-related approvals?',              hint: 'Red zone + Gift + Dining → One unified invitation form' },
            { tag: 'Confidentiality',  q: 'Store information and track visitor status in one place?',                 hint: 'Paper forms → Digital dashboard with full audit trail' },
            { tag: 'Company Culture',  q: 'Deliver information and gather feedback before and after visits?',         hint: 'Nothing → Visitor mini-app with company content & feedback' },
          ].map(({ tag, q, hint }) => (
            <div key={tag} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px 24px' }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>
                {tag}
              </div>
              <p style={{ fontFamily: C.fontSans, fontSize: '18px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.35, color: C.ink, margin: 0 }}>
                {q}
              </p>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>
                  {hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Ideation ──────────────────────────────────────────────────────── */}
      <Section id="ideation" label="Ideation">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '12px' }}>
          Let engineers join the table
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '500px', marginBottom: '24px' }}>
          We explored three different approaches before landing on the right one. Each rejection taught us something about what users actually needed.
        </p>
        <div className="cs-card-row" style={{ marginBottom: '16px' }}>
          {[
            { title: 'Calendar-based wireframes', emoji: '🙅', label: 'Image 3', src: '/work/visitor/image-3.png', body: 'Too rigid. Visits don\'t follow calendar logic — they follow approval logic. Wrong mental model from the start.' },
            { title: 'One-step form',              emoji: '🫣', label: 'Image 4', src: '/work/visitor/image-4.png', body: 'Too overwhelming. All fields on one page caused high error rates in testing. Cognitive overload for busy employees.' },
            { title: 'Detailed information page',  emoji: '🤯', label: 'Image 5', src: '/work/visitor/image-5.png', body: 'Too complex. Information density made it impossible to scan quickly when managing multiple visitors simultaneously.' },
          ].map(({ title, emoji, label, src, body }) => (
            <div key={title} style={{ flex: 1, background: '#FDFBF7', border: '1px solid #FECACA', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FEF2F2', borderBottom: '1px solid #FECACA', padding: '14px 20px' }}>
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 600, color: C.ink }}>{title}</span>
                <span style={{ fontSize: '18px' }}>{emoji}</span>
              </div>
              <div style={{ padding: '20px' }}>
                {src
                  ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={src} alt={label} style={{ width: '100%', borderRadius: '6px', display: 'block', marginBottom: '12px' }} />
                  : <div style={{ width: '100%', aspectRatio: '4 / 3', backgroundColor: '#E8E6E2', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <span style={{ fontFamily: C.fontMono, fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(26,23,20,0.28)', textAlign: 'center' }}>{label}</span>
                    </div>
                }
                <p style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Winner */}
        <div style={{ background: C.surface, borderLeft: `3px solid ${C.accent}`, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>
            The winner — Progressive Disclosure
          </div>
          <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 600, lineHeight: 1.4, color: C.ink }}>
            Split the invitation into staged panels
          </div>
          <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>
            There are already too many forms in the OA system. Instead of adding another long one, I split the invitation flow into three focused panels: today's visits, a step-by-step invitation form, and future visit tracking. Each step reveals only what's needed — reducing errors and making the experience feel light instead of burdensome.
          </p>
        </div>
      </Section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <Section id="solution" label="Solution">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '12px' }}>
          One system, four touchpoints
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '500px', marginBottom: '24px' }}>
          Rather than building a single app, I designed a platform that meets each user where they already are — mapping each role to their natural tool and context.
        </p>
        <div className="cs-card-row" style={{ marginBottom: '24px' }}>
          {[
            {
              bg: '#EEF4FF', stroke: '#2563EB', role: 'Employees', title: 'Feishu Web & Mobile',
              desc: 'Invite visitors, track approvals, manage records',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 3v18"/></svg>,
            },
            {
              bg: '#EEF4FF', stroke: '#2563EB', role: 'Administrative', title: 'Feishu Admin View',
              desc: 'Approve requests, prepare, view visitor data',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><path d="M9 14l2 2 4-4"/></svg>,
            },
            {
              bg: '#F0FDF4', stroke: '#16A34A', role: 'Visitors', title: 'WeChat Mini-Program',
              desc: 'QR check-in, company info, leave feedback',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
            },
            {
              bg: 'rgba(196,97,58,0.07)', stroke: C.accent, role: 'Front Desk', title: 'Android Tablet Kiosk',
              desc: 'Instant QR scanning, walk-in registration',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4613A" strokeWidth="1.5"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 11h16"/><circle cx="12" cy="16" r="1"/></svg>,
            },
          ].map(({ bg, role, title, desc, icon }) => (
            <div key={role} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', flexShrink: 0 }}>
                {icon}
              </div>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle, marginBottom: '6px', textAlign: 'center' }}>{role}</div>
              <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 600, lineHeight: '18px', color: C.ink, marginBottom: '6px', textAlign: 'center' }}>{title}</div>
              <div style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.5, color: C.muted, textAlign: 'center' }}>{desc}</div>
            </div>
          ))}
        </div>
        <ImgPlaceholder label="Image 6" aspectRatio="16 / 9" src="/work/visitor/image-6.jpg" />
      </Section>

      {/* ── Happy Paths ───────────────────────────────────────────────────── */}
      <Section id="happy-paths" label="Happy Paths">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '28px' }}>
          Three users, three journeys
        </h2>

        {/* Inviters */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>For Staff</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Input → Submit → Track → Confirm departure</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            All approvals (red zone, dining, gifts) now run in parallel through one form instead of three separate OA flows.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Five-stage invitation flow (basic info → area access → meals → gifts → confirm)',
              'System auto-initiates approval and sends SMS to visitor after approval',
              'Real-time modification and tracking of visitor records',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          <StaffTabCarousel />
        </div>

        {/* Administrative */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>For Administrative</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Review → Approve → Check data</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            Admin staff get a unified dashboard to review upcoming visits, approve access, and view real-time statistics across all 4 locations.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Unified visit calendar with upcoming and in-progress requests',
              'One-tap approval for dining reservations and restricted area access',
              'Real-time visitor statistics dashboard across all 4 locations',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          <div className="cs-video-pair">
            <DesktopVideo src="/work/visitor/admin-desktop.mp4" />
            <MobileVideo imgSrc="/work/visitor/admin-mobile.png" />
          </div>
        </div>

        {/* Visitors */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>For Visitors</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>SMS → Mini-app → Front desk → QR scan → Checked in</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            Visitors arrive prepared — they&apos;ve seen the company profile, know where to go, and check in with a single QR scan. No paperwork, no waiting.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'WeChat Mini-Program — no app installation required',
              'Company culture content and facility information delivered before arrival',
              'Single QR scan check-in at front desk kiosk, post-visit feedback collection',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          <div className="cs-video-pair">
            <DesktopVideo imgSrc="/work/visitor/visitor-frontdesk.png" />
            <MobileVideo src="/work/visitor/visitor-miniapp.mp4" />
          </div>
        </div>
      </Section>

      {/* ── Ship & Iterate ────────────────────────────────────────────────── */}
      <Section id="ship" label="Ship & Iterate">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px' }}>
          Training, testing, iterating
        </h2>
        <div className="cs-card-row" style={{ marginBottom: '24px' }}>
          {[
            { title: 'Training',          body: 'Created user manuals and video tutorials. Held 2 workshops for Sales and HR departments to ensure confident adoption from day one.' },
            { title: '6 iterative releases', body: '20+ functional modifications across 6 releases. Standardized approval flows and added privacy policy in collaboration with the Legal team.' },
            { title: 'Mobile expansion',  body: 'Launched desktop first, collected real usage feedback, then designed and shipped the mobile Feishu version in September 2022.' },
          ].map(({ title, body }) => (
            <div key={title} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '24px' }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 600, lineHeight: '18px', color: C.ink, marginBottom: '8px' }}>{title}</div>
              <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <Section id="impact" label="Impact">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '12px' }}>
          By the numbers
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '500px', marginBottom: '28px' }}>
          The system launched in October 2021 and went through 6 iterative releases, including a mobile expansion in September 2022. It completely replaced the paper-based process.
        </p>

        {/* Metrics row */}
        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
          {[
            { v: '78%',   l: 'Reduced invitation time', accent: false },
            { v: '60%',   l: 'Reduced approval time',   accent: false },
            { v: '417',   l: 'Internal Users',           accent: false },
            { v: '2,776', l: 'Visit Requests',           accent: false },
            { v: '4,810', l: 'Total Visitors',           accent: false },
            { v: '4.6',   l: 'Visitor Satisfaction',     accent: true  },
          ].map(({ v, l, accent }, i) => (
            <div key={v} style={{
              flex: 1,
              padding: '28px 20px',
              borderRight: i < 5 ? `1px solid ${C.border}` : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '36px', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, color: accent ? C.accent : C.ink }}>{v}</div>
              <div style={{ fontFamily: C.fontSans, fontSize: '12px', lineHeight: '16px', color: C.subtle }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Timeline pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '28px' }}>
          {['Launched Oct 21, 2021', 'Mobile Sep 12, 2022', '6 releases', '20+ iterations', '150+ interfaces'].map(label => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, opacity: 0.5, flexShrink: 0 }} />
              <span style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, lineHeight: '12px', color: C.subtle }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div style={{ background: C.surface, borderLeft: `3px solid ${C.accent}`, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '28px 32px' }}>
          <p style={{ fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif', fontSize: '16px', letterSpacing: '-0.01em', lineHeight: 1.6, color: C.ink, margin: '0 0 12px' }}>
            "The system reduced manual check-in errors to near zero and gave us a verifiable audit trail — critical as we prepared for our NYSE listing."
          </p>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.subtle }}>
            Internal feedback — Operations team
          </div>
        </div>
      </Section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <Section id="reflection" label="Reflection" last paddingBottom="96px">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '26px', fontWeight: 300, lineHeight: 1.35, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px' }}>
          What I learned from my first 0→1 product
        </h2>
        <div className="cs-card-row" style={{ marginBottom: '24px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { tag: 'Understand users',      title: 'Develop tailored solutions for each role',          body: 'Each role had fundamentally different needs. The same system needed to feel simple for visitors and powerful for admins. One product, four distinct experiences designed from the ground up.' },
              { tag: 'Cross-dept complexity', title: 'Parallel approval flows demand tight state mapping', body: 'A single visitor invitation could trigger up to five parallel approval chains. I worked closely with engineering to map every possible state, running 60+ test scenarios before launch to surface edge cases.' },
            ].map(({ tag, title, body }) => (
              <div key={tag} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>{tag}</div>
                <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 600, lineHeight: 1.4, color: C.ink }}>{title}</div>
                <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { tag: 'Be agile',             title: 'Phased delivery beats big-bang launches',          body: 'We launched desktop first, learned from real usage, then adapted for mobile. The second release was significantly smoother because we had real-world signal instead of assumptions.' },
              { tag: 'Manage expectations',  title: 'Designing for the org, not just the user',         body: 'Enterprise design means navigating organizational dynamics. Getting buy-in from security, IT, and operations was as critical as the interface design itself. Facilitation is a core design skill.' },
            ].map(({ tag, title, body }) => (
              <div key={tag} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>{tag}</div>
                <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 600, lineHeight: 1.4, color: C.ink }}>{title}</div>
                <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Closing quote */}
        <div style={{ borderLeft: `2px solid ${C.border}`, paddingBlock: '24px', paddingInline: '28px' }}>
          <p style={{ fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif', fontSize: '15px', letterSpacing: '-0.01em', lineHeight: 1.6, color: C.muted, margin: 0 }}>
            "The experience fundamentally changed how I approach collaboration, communication, and the long game of shipping software."
          </p>
        </div>
      </Section>

    </CaseStudyShell>
  )
}
