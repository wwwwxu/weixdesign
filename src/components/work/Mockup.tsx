'use client'

import { CASE_STUDY as C } from './tokens'

// ── Placeholder ───────────────────────────────────────────────────────────────

function Placeholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E8E6E2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: C.fontMono,
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(26,23,20,0.28)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Desktop ───────────────────────────────────────────────────────────────────

export function DesktopMockup({ label }: { label: string }) {
  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E4E4E1',
        background: '#F5F5F3',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          padding: '8px 12px',
          background: '#F0F0EE',
          borderBottom: '1px solid #E4E4E1',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8D8D6' }} />
          ))}
        </div>
        <div style={{ flex: 1, height: '14px', background: '#E4E4E1', borderRadius: '3px' }} />
      </div>
      {/* Viewport */}
      <div style={{ aspectRatio: '1440 / 920', overflow: 'hidden' }}>
        <Placeholder label={label} />
      </div>
    </div>
  )
}

// ── Mobile ────────────────────────────────────────────────────────────────────

export function MobileMockup({ label }: { label: string }) {
  return (
    <div
      style={{
        width: '160px',
        flexShrink: 0,
        borderRadius: '28px',
        border: '2px solid #D4D4D0',
        background: '#F5F5F3',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: '24px',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderBottom: '1px solid #F0F0EE',
        }}
      >
        <div style={{ width: '50px', height: '8px', background: '#1A1714', borderRadius: '8px', opacity: 0.08 }} />
      </div>
      <div style={{ height: '360px', overflow: 'hidden' }}>
        <Placeholder label={label} />
      </div>
    </div>
  )
}

// ── Screen pair ───────────────────────────────────────────────────────────────

export function ScreenPair({ desktopLabel, mobileLabel }: { desktopLabel: string; mobileLabel: string }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <DesktopMockup label={desktopLabel} />
      <MobileMockup label={mobileLabel} />
    </div>
  )
}
