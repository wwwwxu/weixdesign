'use client'

import { useState } from 'react'
import {
  CaseStudyShell,
  Section,
  CASE_STUDY as C,
} from '@/components/work'

// ─── Nav ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'v0',         label: 'V0 — Original' },
  { id: 'v1',         label: 'V1 — Systematize' },
  { id: 'v2',         label: 'V2 — Viral' },
  { id: 'v3',         label: 'V3 — Minimal' },
  { id: 'impact',     label: 'Impact' },
  { id: 'reflection', label: 'Reflection' },
]

// ─── Screen data ──────────────────────────────────────────────────────────────

interface ScreenTab {
  key: string
  label: string
  desktop: string
  mobile: string
}

const VERSION_SCREENS: Record<string, ScreenTab[]> = {
  v0: [
    { key: 'home',       label: 'Homepage',   desktop: '/work/upfront/v0/Original_HP.png',       mobile: '/work/upfront/v0/Original_HP_Mobile.png' },
    { key: 'collection', label: 'Collection', desktop: '/work/upfront/v0/Original_PLP.png',      mobile: '/work/upfront/v0/Original_PLP_Mobile.png' },
    { key: 'product',    label: 'Product',    desktop: '/work/upfront/v0/Original_PDP.png',      mobile: '/work/upfront/v0/Original_PDP_Mobile.png' },
  ],
  v1: [
    { key: 'home',       label: 'Homepage',   desktop: '/work/upfront/v1/V1_HP.png',             mobile: '/work/upfront/v1/V1_HP_mobile.png' },
    { key: 'collection', label: 'Collection', desktop: '/work/upfront/v1/V1_PLP.png',            mobile: '/work/upfront/v1/V1_PLP_mobile.png' },
    { key: 'product',    label: 'Product',    desktop: '/work/upfront/v1/V1_PDP.png',            mobile: '/work/upfront/v1/V1_PDP_mobile.png' },
  ],
  v2: [
    { key: 'home',       label: 'Homepage',   desktop: '/work/upfront/v2/V2_HP.png',             mobile: '/work/upfront/v2/V2_HP_mobile.png' },
    { key: 'collection', label: 'Collection', desktop: '/work/upfront/v2/V2_PLP.png',            mobile: '/work/upfront/v2/V2_PLP_mobile.png' },
    { key: 'product',    label: 'Product',    desktop: '/work/upfront/v2/V2_PDP.png',            mobile: '/work/upfront/v2/V2_PDP_mobile.png' },
  ],
  v3: [
    { key: 'home',       label: 'Homepage',   desktop: '/work/upfront/v3/V3_HP.png',             mobile: '/work/upfront/v3/V3_HP_mobile.png' },
    { key: 'search',     label: 'Search',     desktop: '/work/upfront/v3/V3_HP_Search.png',      mobile: '/work/upfront/v3/V3_HP_Search_mobile.png' },
    { key: 'collection', label: 'Collection', desktop: '/work/upfront/v3/V3_PLP.png',            mobile: '/work/upfront/v3/V3_PLP_mobile.png' },
    { key: 'product',    label: 'Product',    desktop: '/work/upfront/v3/V3_PDP.png',            mobile: '/work/upfront/v3/V3_PDP_mobile.png' },
  ],
}

// ─── Local sub-components ─────────────────────────────────────────────────────

function MonoTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: C.fontMono,
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color: C.accent,
      marginBottom: '10px',
    }}>
      {children}
    </div>
  )
}

interface VersionHeaderProps {
  version: string
  role: string
  title: string
  body: string
}

function VersionHeader({ version, role, title, body }: VersionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '32px' }}>
      <div style={{
        fontFamily: C.fontSans,
        fontSize: '88px',
        fontWeight: 300,
        lineHeight: 0.85,
        letterSpacing: '-0.04em',
        color: 'rgba(26,23,20,0.055)',
        flexShrink: 0,
        userSelect: 'none',
        marginTop: '-4px',
      }}>
        {version}
      </div>
      <div>
        <MonoTag>{role}</MonoTag>
        <h3 style={{
          fontFamily: C.fontSans,
          fontSize: '26px',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: C.ink,
          marginBottom: '12px',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: C.fontSans,
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: C.muted,
          maxWidth: '480px',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

// ─── Screen carousel ──────────────────────────────────────────────────────────

function ScreenCarousel({ version }: { version: string }) {
  const tabs = VERSION_SCREENS[version]
  const [activeKey, setActiveKey] = useState(tabs[0].key)
  const active = tabs.find(t => t.key === activeKey) ?? tabs[0]

  return (
    <div>
      {/* Tab switcher */}
      <div style={{
        display: 'inline-flex',
        gap: '2px',
        background: C.border,
        padding: '3px',
        borderRadius: '8px',
        marginBottom: '16px',
      }}>
        {tabs.map(({ key, label }) => (
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

      {/* Desktop + Mobile side by side */}
      <div className="cs-video-pair">
        {/* Desktop browser frame */}
        <div style={{
          flex: 1,
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #E4E4E1',
          background: '#F5F5F3',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Browser chrome */}
          <div style={{
            padding: '8px 12px',
            background: '#F0F0EE',
            borderBottom: '1px solid #E4E4E1',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8D8D6' }} />
              ))}
            </div>
            <div style={{ flex: 1, height: '14px', background: '#E4E4E1', borderRadius: '3px' }} />
          </div>
          {/* Scrollable viewport — fixed 16:10 desktop height */}
          <div style={{ height: '580px', overflowY: 'auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active.desktop}
              src={active.desktop}
              alt={`${version} ${active.label} desktop`}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>

        {/* Mobile phone frame */}
        <div style={{
          width: '240px',
          flexShrink: 0,
          borderRadius: '36px',
          border: '2px solid #D4D4D0',
          background: '#F5F5F3',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          {/* Status bar */}
          <div style={{
            height: '26px',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderBottom: '1px solid #F0F0EE',
          }}>
            <div style={{ width: '56px', height: '8px', background: '#1A1714', borderRadius: '8px', opacity: 0.08 }} />
          </div>
          {/* Scrollable viewport — fixed 9:19.5 mobile height */}
          <div style={{ height: '520px', overflowY: 'auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active.mobile}
              src={active.mobile}
              alt={`${version} ${active.label} mobile`}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UpfrontCaseStudy() {
  return (
    <CaseStudyShell
      title="Upfront"
      subtitle="E-commerce · 2024–Present"
      sections={SECTIONS}
    >

      {/* ── Hero text ─────────────────────────────────────────────────────── */}
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
          Upfront — E-commerce — 2024–Present
        </div>

        <h1 style={{
          fontFamily: C.fontSans,
          fontSize: 'clamp(32px, 3.8vw, 52px)',
          fontWeight: 300,
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          color: C.ink,
          maxWidth: '660px',
          margin: '0 0 40px',
        }}>
          Scaling a FMCG brand from scrappy startup to{' '}
          <em style={{ fontStyle: 'italic', color: C.muted }}>600% growth</em>{' '}
          through design
        </h1>

        <dl className="cs-meta-dl" style={{ paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
          {[
            { label: 'Role',   value: 'Design Lead' },
            { label: 'Scope',  value: 'E-commerce · 3 major versions' },
            { label: 'Team',   value: '5-person design team (current)' },
            { label: 'Impact', value: '600% growth · 10M+ impressions · +2% CVR' },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle, marginBottom: '5px' }}>
                {label}
              </dt>
              <dd style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 400, color: C.ink, lineHeight: 1.4 }}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <Section id="overview" label="Overview">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '16px', maxWidth: '560px' }}>
          Three versions, three business phases, one design evolution
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '520px' }}>
          Each redesign wasn&apos;t cosmetic — it was driven by a shift in business strategy.
          I grew with the company from the only non-Dutch hire to leading a 5-person design team.
        </p>
      </Section>

      {/* ── V0 ────────────────────────────────────────────────────────────── */}
      <Section id="v0" label="V0 — Original">
        <VersionHeader
          version="V0"
          role="Inherited — Before I joined"
          title="Cluttered, inconsistent, no system"
          body="The original site had heavy UI elements, inconsistent styling, unclear hierarchy, and no reusable components. Product categories were hard to navigate."
        />
        <ScreenCarousel version="v0" />
      </Section>

      {/* ── V1 ────────────────────────────────────────────────────────────── */}
      <Section id="v1" label="V1 — Systematize">
        <VersionHeader
          version="V1"
          role="My role: Design Assistant → Website Manager"
          title="Simplify, systematize, establish credibility"
          body="I stripped back the clutter, restructured product categories, built the first reusable component library, and established direct communication with the remote dev team. This earned me the role of Website Manager — the first non-Dutch hire."
        />
        <ScreenCarousel version="v1" />
      </Section>

      {/* ── V2 ────────────────────────────────────────────────────────────── */}
      <Section id="v2" label="V2 — Viral">
        <VersionHeader
          version="V2"
          role="My role: Website Manager → UX Designer"
          title="Product-centric, concept-driven, mobile-first"
          body="Heatmap data revealed mobile-dominant usage and high interest in ingredients. I introduced the core concept: putting the back label upfront — flipping the product to show what's inside. Mobile UX was redesigned as an app-like experience with thumb-zone CTAs."
        />
        <ScreenCarousel version="v2" />

        {/* SeeSaw callout */}
        <a
          href="https://www.seesaw.website/websites/upfront"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', marginTop: '20px', padding: '32px 40px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', textAlign: 'center', textDecoration: 'none', transition: 'border-color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = C.ink)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
        >
          <p style={{ fontFamily: C.fontSans, fontSize: '17px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, letterSpacing: '-0.015em', color: C.ink, maxWidth: '480px', margin: '0 auto 8px' }}>
            This version was featured on SeeSaw and gained 10M+ impressions from design influencer attention on social media.
          </p>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle }}>
            Featured: seesaw.website/websites/upfront
          </div>
        </a>
      </Section>

      {/* ── V3 ────────────────────────────────────────────────────────────── */}
      <Section id="v3" label="V3 — Minimal">
        <VersionHeader
          version="V3"
          role="My role: UX Designer → Head of Design"
          title="Product speaks for itself"
          body="With 600% online growth, the brand no longer needed to explain its concept — it needed to get out of the way. Radical minimalism: every element earned its place. Ingredients moved to center stage."
        />

        <ScreenCarousel version="v3" />

        {/* Sketch + Animation video side by side */}
        <div className="cs-card-row" style={{ marginTop: '20px', alignItems: 'stretch' }}>
          <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/upfront/v3/V3_sketch_website.jpg"
              alt="V3 website sketch"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <video
              src="/work/upfront/v3/V3_Website_animation.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </Section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <Section id="impact" label="Impact">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: C.border,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {[
            { value: '600%', label: 'Business Growth' },
            { value: '10M+', label: 'Social Impressions' },
            { value: '+2%',  label: 'Conversion Rate' },
            { value: '3×',   label: 'Versions Shipped' },
          ].map(({ value, label }) => (
            <div key={label} style={{ padding: '36px 24px', background: C.bg, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '38px', fontWeight: 300, letterSpacing: '-0.03em', color: C.ink, lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <Section id="reflection" label="Reflection" last paddingBottom="96px">
        <div className="cs-grid-2">
          {[
            { tag: 'Strategy', title: 'Design follows business phase, not trends',     body: 'Each version solved a different strategic problem. V1: clarity. V2: brand awareness. V3: conversion efficiency.' },
            { tag: 'Data',     title: 'Heatmaps changed everything',                   body: 'Introducing heatmap analytics revealed that mobile users cared most about ingredients — reshaping the entire V2 direction.' },
            { tag: 'Growth',   title: 'From individual contributor to design leader',  body: 'I grew from design assistant to leading a 5-person team, managing design system, web, email, and ads across all channels.' },
            { tag: 'Craft',    title: 'Minimalism is earned, not imposed',             body: "V3's radical simplicity only works because V2 built the brand recognition. You can't skip the storytelling phase." },
          ].map(({ tag, title, body }) => (
            <div key={tag} style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.accent, marginBottom: '10px' }}>
                {tag}
              </div>
              <h4 style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 500, lineHeight: 1.4, color: C.ink, marginBottom: '8px' }}>
                {title}
              </h4>
              <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: C.muted }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

    </CaseStudyShell>
  )
}
