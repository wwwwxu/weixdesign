'use client'

import {
  CaseStudyShell,
  Section,
  FullSection,
  CASE_STUDY as C,
} from '@/components/work'

// ─── Nav ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'context',     label: 'Context' },
  { id: 'discovery',  label: 'Discovery' },
  { id: 'solution',   label: 'Solution' },
  { id: 'process',    label: 'Process' },
  { id: 'designs',    label: 'Final Designs' },
  { id: 'impact',     label: 'Impact' },
  { id: 'reflection', label: 'Reflection' },
]

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

function NumberedItem({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderTop: `1px solid ${C.border}`, paddingBlock: '16px' }}>
      <div style={{
        fontFamily: C.fontMono,
        fontSize: '11px',
        fontWeight: 500,
        color: C.accent,
        letterSpacing: '0.08em',
        flexShrink: 0,
        paddingTop: '2px',
        width: '20px',
      }}>
        {number}
      </div>
      <p style={{
        fontFamily: C.fontSans,
        fontSize: '14px',
        fontWeight: 300,
        lineHeight: 1.75,
        color: C.muted,
        margin: 0,
      }}>
        {children}
      </p>
    </div>
  )
}

function PersonaCard({ role, description, pain }: { role: string; description: string; pain: string }) {
  return (
    <div style={{
      flex: 1,
      padding: '28px 24px',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{
        fontFamily: C.fontMono,
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: C.accent,
        marginBottom: '4px',
      }}>
        {role}
      </div>
      <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: C.ink, margin: 0 }}>
        {description}
      </p>
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.65, color: C.muted, margin: 0 }}>
        {pain}
      </p>
    </div>
  )
}

function FindingCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
      <div style={{
        fontFamily: C.fontMono,
        fontSize: '20px',
        fontWeight: 500,
        color: `${C.accent}55`,
        letterSpacing: '-0.02em',
        marginBottom: '12px',
      }}>
        {number}
      </div>
      <h4 style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 500, lineHeight: 1.4, color: C.ink, marginBottom: '8px' }}>
        {title}
      </h4>
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: C.muted }}>
        {body}
      </p>
    </div>
  )
}

function DesignRow({ src, title, body, imageFirst = true }: {
  src: string
  title: string
  body: string
  imageFirst?: boolean
}) {
  const textBlock = (
    <div style={{ flex: '0 0 260px' }}>
      <h4 style={{
        fontFamily: C.fontSans,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        color: C.ink,
        marginBottom: '12px',
      }}>
        {title}
      </h4>
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: C.muted }}>
        {body}
      </p>
    </div>
  )
  const imageBlock = (
    <div style={{ flex: 1 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
      {imageFirst ? imageBlock : textBlock}
      {imageFirst ? textBlock : imageBlock}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SuggestionSystemCaseStudy() {
  return (
    <CaseStudyShell
      title="Suggestion System"
      subtitle="Internal Platform · 2022–2023"
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
          Product Design — Hesai Technology — 2022–2023
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
          A 0-to-1 internal platform that turns{' '}
          <em style={{ fontStyle: 'italic', color: C.muted }}>employee ideas</em>{' '}
          into tracked, implemented action
        </h1>

        <dl className="cs-meta-dl" style={{ paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
          {[
            { label: 'Timeframe', value: '2022–2023' },
            { label: 'Role',      value: 'Product Designer (Solo)' },
            { label: 'Scope',     value: 'Internal Platform · 0→1' },
            { label: 'Impact',    value: '234 suggestions · 65% adoption' },
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

      {/* ── Hero image ────────────────────────────────────────────────────── */}
      <FullSection padding="32px 80px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/suggestion/overview.png" alt="Suggestion system overview" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
      </FullSection>

      {/* ── Context ───────────────────────────────────────────────────────── */}
      <Section id="context" label="Context">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Good ideas existed everywhere — but had no place to go
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
          <NumberedItem number="01">
            Hesai Technology&apos;s 800+ employees had no formal channel to surface process improvements.
            Ideas were shared informally via chat, then lost or forgotten.
          </NumberedItem>
          <NumberedItem number="02">
            Management had no visibility into which suggestions were submitted, under review, or implemented —
            leading to duplicated effort and missed opportunities.
          </NumberedItem>
          <NumberedItem number="03">
            Without a system, there was no accountability. Employees stopped suggesting because
            nothing seemed to happen.
          </NumberedItem>
        </div>
      </Section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <Section id="discovery" label="Discovery">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Understanding the suggestion lifecycle
        </h2>

        {/* Persona cards */}
        <div className="cs-persona-row" style={{ gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          <PersonaCard
            role="All Employees"
            description="Submit ideas, track status"
            pain="Frustrated by the black-box — ideas submitted but no feedback received"
          />
          <PersonaCard
            role="Admins"
            description="Triage, assign, manage workflow"
            pain="No tools to manage volume; relied on spreadsheets and memory"
          />
          <PersonaCard
            role="Implementers"
            description="Execute approved suggestions"
            pain="No clear handoff — unclear scope, priority, or deadlines"
          />
        </div>

        {/* Flow diagram */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>Suggestion Flow</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/process.png" alt="Suggestion lifecycle flow" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Findings */}
        <div className="cs-grid-3">
          <FindingCard
            number="01"
            title="Transparency is the core need"
            body="Users didn't need a fancy interface — they needed to know their idea was received, reviewed, and acted on."
          />
          <FindingCard
            number="02"
            title="Admins are the bottleneck"
            body="Without clear tooling, admin workload scales linearly with submission volume. The system needed to reduce their cognitive load."
          />
          <FindingCard
            number="03"
            title="Implementers are forgotten"
            body="Existing processes skipped directly from approval to completion — implementers had no dedicated workflow."
          />
        </div>
      </Section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <Section id="solution" label="Solution">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          A platform for the full suggestion lifecycle
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '520px', marginBottom: '32px' }}>
          Three distinct interfaces — one for each role — unified under a single system.
          Every suggestion has a traceable journey from submission to resolution.
        </p>

        {/* 5-stage flow */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>Five-Stage Lifecycle</MonoTag>
          <div className="cs-stage-flow" style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', background: C.surface }}>
            {[
              { n: '01', stage: 'Submit',    desc: 'Employee fills a structured form with problem description, category, and supporting details' },
              { n: '02', stage: 'Accept',    desc: 'Admin reviews, accepts or rejects with reasoning, then assigns to the relevant department lead' },
              { n: '03', stage: 'Implement', desc: 'Department lead confirms the issue, creates an action plan, and tracks weekly progress' },
              { n: '04', stage: 'Evaluate',  desc: 'Admin reviews the implementation report and submits a completion assessment' },
              { n: '05', stage: 'Complete',  desc: 'Submitter receives the final result; suggestion is published to the company feed' },
            ].map(({ n, stage, desc }, i) => (
              <div key={n} style={{
                flex: 1,
                padding: '24px 20px',
                borderRight: i < 4 ? `1px solid ${C.border}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <div style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>{n}</div>
                <div style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 500, color: C.ink, letterSpacing: '-0.01em' }}>{stage}</div>
                <p style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plan A / B */}
        <div className="cs-grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>Plan A — Role Switching</span>
              <span style={{ fontFamily: C.fontSans, fontSize: '11px', color: '#DC2626', background: '#FEF2F2', borderRadius: '4px', padding: '2px 8px', fontWeight: 500 }}>Not chosen</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/suggestion/plan-a.png" alt="Plan A" style={{ width: '100%', borderRadius: '8px', display: 'block', border: `1px solid ${C.border}` }} />
            <p style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>Users manually switch between roles to see different views. Tested with 12 users — felt confusing and context-switching was disruptive.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>Plan B — Status-Based</span>
              <span style={{ fontFamily: C.fontSans, fontSize: '11px', color: '#16A34A', background: '#F0FDF4', borderRadius: '4px', padding: '2px 8px', fontWeight: 500 }}>Chosen</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/suggestion/plan-b.png" alt="Plan B" style={{ width: '100%', borderRadius: '8px', display: 'block', border: `1px solid ${C.border}` }} />
            <p style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>Interface adapts to the suggestion&apos;s current status. Users always see what action is relevant — no switching required. Preferred by 10 of 12 testers.</p>
          </div>
        </div>
      </Section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <Section id="process" label="Process">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '12px', maxWidth: '560px' }}>
          Two interface approaches, one clear winner
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '520px', marginBottom: '32px' }}>
          We debated between manual role-switching and a workflow-driven interface.
          Testing with 12 employees showed status-based views were more intuitive for tracking suggestion progress.
        </p>

        {/* Testing result */}
        <div style={{ display: 'flex', gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          {[
            { value: '12',    label: 'Users tested' },
            { value: '10/12', label: 'Preferred Plan B' },
            { value: '5 min', label: 'Avg. task completion (Plan B)' },
            { value: '11 min', label: 'Avg. task completion (Plan A)' },
          ].map(({ value, label }, i) => (
            <div key={label} style={{ flex: 1, padding: '32px 20px', background: C.bg, display: 'flex', flexDirection: 'column', gap: '8px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '32px', fontWeight: 300, letterSpacing: '-0.03em', color: i === 1 ? C.accent : C.ink, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Feature matrix */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: C.bg }}>
            {['Feature', 'All Employees', 'Admin Team', 'Department Leads'].map((h, i) => (
              <div key={h} style={{ flex: i === 0 ? '0 0 160px' : 1, padding: '12px 20px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>
                {h}
              </div>
            ))}
          </div>
          {[
            { feature: 'Submit',  cols: ['Structured form with category & attachments', '—', '—'] },
            { feature: 'Track',   cols: ['Real-time status, timeline, notifications', 'All submissions dashboard', 'Assigned tasks view'] },
            { feature: 'Review',  cols: ['—', 'Accept / reject with reasoning', 'Completion report + score'] },
            { feature: 'Execute', cols: ['—', 'Assign to department, forward out-of-scope', 'Action plan, weekly updates'] },
          ].map(({ feature, cols }) => (
            <div key={feature} style={{ display: 'flex', borderTop: `1px solid ${C.border}`, background: C.surface }}>
              <div style={{ flex: '0 0 160px', padding: '14px 20px', borderRight: `1px solid ${C.border}`, fontFamily: C.fontSans, fontSize: '13px', fontWeight: 500, color: C.ink }}>{feature}</div>
              {cols.map((col, i) => (
                <div key={i} style={{ flex: 1, padding: '14px 20px', borderRight: i < 2 ? `1px solid ${C.border}` : 'none', fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.5, color: col === '—' ? C.subtle : C.muted }}>{col}</div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Final Designs ─────────────────────────────────────────────────── */}
      <Section id="designs" label="Final Designs">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '28px', maxWidth: '560px' }}>
          Three roles, three purpose-built views
        </h2>

        {/* All Employees */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>All Employees</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Browse → Submit → Track → Celebrate</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            A public feed surfaces implemented suggestions for company-wide learning. Every employee can see their idea move from submission to resolution.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Public feed showing evaluated and implemented suggestions',
              'Personal dashboard for tracking each suggestion\'s live status',
              'Category-based browsing to reduce duplicate submissions',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/screen-homepage.png" alt="Employee homepage" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Submitters */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Submitters</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Describe → Categorize → Submit → Monitor</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            A structured form captures the problem, proposed improvement, and supporting details. After submission, real-time status updates replace the previous black box.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Guided form with problem description, category, and evidence fields',
              'Live status tracking from submission through implementation',
              'Notification when suggestion is accepted, rejected, or completed',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/screen-new-suggestion.png" alt="New suggestion form" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Admins */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Admins</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Review → Accept / Reject → Assign → Evaluate</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            Admins see only their department's queue. Every decision is documented — rejections require reasoning, acceptances trigger automatic assignment.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Department-scoped queue to prevent cross-team confusion',
              'One-tap accept with implementer assignment, or reject with required reason',
              'Out-of-scope suggestions can be forwarded to the correct department',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/screen-accept.png" alt="Admin review screen" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Implementers */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Implementers</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Confirm → Plan → Update weekly → Submit report</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 12px' }}>
            Assigned implementers get a dedicated workflow that didn't exist before — a structured handoff with scope, timeline, and a weekly check-in cadence.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              'Issue confirmation step with the original submitter',
              'Action plan with milestone tracking and weekly progress updates',
              'Completion report submitted for admin evaluation before marking done',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/screen-implement.png" alt="Implementation screen" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Suggestion Center */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Suggestion Center</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '28px', color: C.ink, marginBottom: '14px' }}>Company-wide overview & analytics</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 24px' }}>
            Leadership gets aggregate visibility — submission volume, implementation rates, and department breakdown — without touching individual entries.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/suggestion/screen-center.png" alt="Suggestion center overview" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>
      </Section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <Section id="impact" label="Impact">
        <div className="cs-persona-row" style={{
          gap: '1px',
          background: C.border,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          {[
            { value: '234',  label: 'Suggestions Submitted' },
            { value: '152',  label: 'Implemented' },
            { value: '65%',  label: 'Employee Adoption' },
            { value: '500+', label: 'Hours Saved / Month' },
          ].map(({ value, label }) => (
            <div key={label} style={{ flex: 1, padding: '40px 20px', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '38px', fontWeight: 300, letterSpacing: '-0.03em', color: C.ink, lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '28px 32px', borderLeft: `3px solid ${C.accent}` }}>
          <p style={{ fontFamily: C.fontSans, fontSize: '16px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, letterSpacing: '-0.01em', color: C.ink, margin: '0 0 12px' }}>
            &quot;The platform replaced what used to be a black box. Now every employee can see their idea move through the system — from submission to implementation.&quot;
          </p>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.subtle }}>
            Internal feedback — Operations team · Sep 2023
          </div>
        </div>
      </Section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <Section id="reflection" label="Reflection" last paddingBottom="96px">
        <div className="cs-grid-2" style={{ marginBottom: '32px' }}>
          {[
            { tag: 'Scope',    title: 'Start with the admin, not the employee',  body: 'The admin experience determines the system\'s health. A well-designed triage flow prevented the bottleneck that killed the previous informal process.' },
            { tag: 'Trust',    title: 'Transparency builds participation',         body: 'The #1 driver of engagement was status visibility. Once employees could see their ideas move, submission rates increased consistently.' },
            { tag: 'Research', title: 'Three roles, three mental models',          body: 'What admins needed (volume at a glance) was the opposite of what submitters needed (personal context and detail). Splitting the views was the right call.' },
            { tag: 'Craft',    title: 'Simplicity at scale is a design problem',   body: "With 500+ employees on day one, information architecture mattered more than visual polish. The list-first design held up under real load." },
          ].map(({ tag, title, body }) => (
            <div key={tag} style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>
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
