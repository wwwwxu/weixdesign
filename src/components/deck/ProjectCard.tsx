'use client'

import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { CardActiveContext } from './DeckContainer'

const VIDEO_DURATION = 5 // seconds to play before looping

const SANS = 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif'
const MONO = 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function VideoPlayer({ src }: { src: string }) {
  const isActive = useContext(CardActiveContext)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      onTimeUpdate={e => {
        if (e.currentTarget.currentTime >= VIDEO_DURATION) {
          e.currentTarget.currentTime = 0
        }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top',
      }}
    />
  )
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  year: string
  cardNumber: string
  videoSrc?: string
  imageSrc?: string
  imageBg?: string
  href?: string
  logoSrc?: string
}

interface ProjectCardProps {
  project: Project
}

// Prototype mockup — placeholder app window matching Paper design
function PrototypeMockup() {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '8px',
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          padding: '10px 14px',
          background: '#F5F5F3',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#E8E8E8', '#E8E8E8', '#E8E8E8'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: '20px',
            background: '#EBEBEB',
            borderRadius: '4px',
            marginLeft: '8px',
          }}
        />
      </div>

      {/* App content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Toolbar row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '72px', height: '22px', background: '#EBEBEB', borderRadius: '4px' }} />
          <div
            style={{
              flex: 1,
              height: '22px',
              background: '#F5F5F3',
              borderRadius: '4px',
              border: '1px solid #E8E8E8',
            }}
          />
        </div>
        {/* Tag pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#E2E2E2', '#EBEBEB', '#EBEBEB', '#EBEBEB'].map((c, i) => (
            <div key={i} style={{ width: i === 0 ? 48 : 68, height: '18px', background: c, borderRadius: '100px' }} />
          ))}
        </div>
        {/* Section label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '10px', background: '#DCDCDC', borderRadius: '3px' }} />
          <div style={{ width: '40px', height: '10px', background: '#E8E8E8', borderRadius: '3px' }} />
        </div>
        {/* Card grid */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            'rgba(160,185,220,0.35)',
            'rgba(160,185,220,0.25)',
            'rgba(160,200,175,0.25)',
            'rgba(160,185,220,0.2)',
          ].map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: '#F9F9F9',
                border: '1px solid #EEEEEE',
                borderRadius: '6px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ width: '100%', height: '36px', background: c, borderRadius: '4px' }} />
              <div style={{ width: '70%', height: '8px', background: '#E2E2E2', borderRadius: '3px' }} />
              <div style={{ width: '50%', height: '8px', background: '#EBEBEB', borderRadius: '3px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ project, dark = false }: { project: Project; dark?: boolean }) {
  const isMobile = useIsMobile()
  const textColor = dark ? 'rgba(247,247,245,0.95)' : '#1A1714'
  const mutedColor = dark ? 'rgba(247,247,245,0.5)' : '#6B6B6B'
  const tagBorder = dark ? 'rgba(247,247,245,0.2)' : '#DDD8D0'
  const tagColor = dark ? 'rgba(247,247,245,0.65)' : '#8C7E6E'
  const numColor = dark ? 'rgba(247,247,245,0.35)' : '#B0A898'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      {/* Left: icon + title + desc */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: dark ? 'rgba(255,255,255,0.12)' : '#1A1714',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {project.logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.logoSrc} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: dark ? 'brightness(0) invert(1)' : 'none' }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="4" width="5" height="5" rx="1" fill="#F7F7F5" opacity="0.9" />
              <rect x="11" y="4" width="5" height="5" rx="1" fill="#F7F7F5" opacity="0.5" />
              <rect x="4" y="11" width="5" height="5" rx="1" fill="#F7F7F5" opacity="0.5" />
              <rect x="11" y="11" width="5" height="5" rx="1" fill="#F7F7F5" opacity="0.3" />
            </svg>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: SANS,
              fontSize: '17px',
              fontWeight: 500,
              color: textColor,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily: SANS,
              fontSize: '13px',
              fontWeight: 300,
              color: mutedColor,
              lineHeight: 1.5,
              maxWidth: '340px',
            }}
          >
            {project.subtitle}
          </span>
        </div>
      </div>

      {/* Right: card number + tags — hidden on mobile */}
      <div style={{ display: isMobile ? 'none' : 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: '11px',
            fontWeight: 500,
            color: numColor,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {project.cardNumber}
        </span>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 500,
                color: tagColor,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                border: `1px solid ${tagBorder}`,
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project }: ProjectCardProps) {

  if (project.videoSrc) {
    // ── Video-thumbnail layout ──────────────────────────────────────────────
    const card = (
      <div
        style={{
          width: 'min(898px, calc(100vw - 80px))',
          minHeight: '528px',
          borderRadius: '16px',
          background: '#0D0D0C',
          boxShadow: 'rgba(163,161,159,0.05) 0px 4px 20px, rgba(26,23,20,0.1) 0px 2px 8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <VideoPlayer src={project.videoSrc} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, transparent, rgba(10,10,9,0.92))',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 'clamp(20px, 3vw, 32px)',
          }}
        >
          <InfoRow project={project} dark />
        </div>
      </div>
    )
    return project.href ? (
      <Link href={project.href} style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </Link>
    ) : card
  }

  // ── Static image layout ───────────────────────────────────────────────────
  if (project.imageSrc) {
    const bgColor = project.imageBg ?? '#F5F5F5'
    const card = (
      <div
        style={{
          width: 'min(898px, calc(100vw - 80px))',
          height: '528px',
          borderRadius: '16px',
          background: bgColor,
          boxShadow: 'rgba(163,161,159,0.05) 0px 4px 20px, rgba(26,23,20,0.06) 0px 2px 8px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageSrc}
          alt={project.title}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            background: `linear-gradient(to bottom, transparent, ${bgColor})`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 'clamp(20px, 3vw, 32px)',
          }}
        >
          <InfoRow project={project} />
        </div>
      </div>
    )
    return project.href ? (
      <Link href={project.href} style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </Link>
    ) : card
  }

  // ── Mockup layout (default) ───────────────────────────────────────────────
  const card = (
    <div
      style={{
        width: 'min(898px, calc(100vw - 80px))',
        minHeight: '528px',
        borderRadius: '16px',
        background: 'linear-gradient(0deg, oklch(100% 0 0 / 1) 80%, oklch(96.3% 0.001 220) 100%)',
        boxShadow: 'rgba(163,161,159,0.05) 0px 4px 20px, rgba(26,23,20,0.06) 0px 2px 8px',
        padding: 'clamp(24px, 3vw, 36px) clamp(24px, 3vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PrototypeMockup />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '100px',
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, oklch(100% 0 0 / 0.9))',
          pointerEvents: 'none',
        }}
      />
      <InfoRow project={project} />
    </div>
  )
  return project.href ? (
    <Link href={project.href} style={{ textDecoration: 'none', display: 'block' }}>
      {card}
    </Link>
  ) : card
}
