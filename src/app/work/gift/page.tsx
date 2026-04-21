'use client'

import {
  CaseStudyShell,
  Section,
  FullSection,
  CASE_STUDY as C,
} from '@/components/work'

// ─── Nav ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'background',  label: 'Background' },
  { id: 'discovery',   label: 'Discovery' },
  { id: 'solution',    label: 'Solution' },
  { id: 'testing',     label: 'Testing' },
  { id: 'designs',     label: 'Final Designs' },
  { id: 'impact',      label: 'Impact' },
  { id: 'reflection',  label: 'Reflection' },
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GoGiftCaseStudy() {
  return (
    <CaseStudyShell
      title="GoGift"
      subtitle="Internal Tool · 2022"
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
          Product Design · UX/UI Design — 2022
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
          A company system that improves{' '}
          <em style={{ fontStyle: 'italic', color: C.muted }}>gift distribution</em>{' '}
          experience
        </h1>

        <dl className="cs-meta-dl" style={{ paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
          {[
            { label: 'Timeframe', value: 'May – Sep 2022' },
            { label: 'Role',      value: 'Product Designer · UX/UI' },
            { label: 'Scope',     value: 'Internal Tool · Mobile + Web' },
            { label: 'Impact',    value: '960 users · 92.3% satisfaction' },
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

      {/* ── Background ────────────────────────────────────────────────────── */}
      <Section id="background" label="Background">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Holiday gifting was a logistics nightmare
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
          <NumberedItem number="01">
            The company distributed fixed physical gifts to 960+ employees across major holidays — Spring Festival, Mid-Autumn, and others. HR coordinated everything manually through spreadsheets and chat.
          </NumberedItem>
          <NumberedItem number="02">
            Employees had no choice in what they received. Gift preferences varied widely across regions, ages, and household situations — a one-size-fits-all approach left many gifts unused or unwanted.
          </NumberedItem>
          <NumberedItem number="03">
            Delivery tracking was fragmented. Remote employees, especially, had no visibility into when their gifts would arrive — or whether they had been sent at all.
          </NumberedItem>
        </div>
      </Section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <Section id="discovery" label="Discovery">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Four roles, four different frustrations
        </h2>

        {/* Persona cards */}
        <div className="cs-persona-row" style={{ gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          <PersonaCard
            role="Amelia · HR Admin"
            description="Manages the full gift campaign"
            pain="Spends weeks coordinating orders, tracking delivery status, and resolving complaints manually"
          />
          <PersonaCard
            role="James · Remote Employee"
            description="Receives gifts by mail"
            pain="No way to confirm when or whether a gift was sent — often discovers issues only after the holiday"
          />
          <PersonaCard
            role="Susan · Office Employee"
            description="Picks up gifts in-person"
            pain="Fixed selection means she always ends up with something she can't use — would prefer a choice"
          />
          <PersonaCard
            role="Rachel · Department Manager"
            description="Oversees team logistics"
            pain="Fielding complaints from reports about missing or wrong gifts, but has no system to investigate"
          />
        </div>

        {/* Findings */}
        <div className="cs-grid-3">
          <FindingCard
            number="01"
            title="Choice is the core ask"
            body="Employees didn't need premium gifts — they wanted a say. Even a small selection felt significantly more respectful than a fixed item."
          />
          <FindingCard
            number="02"
            title="Visibility reduces anxiety"
            body="Remote employees were most dissatisfied — not because gifts were late, but because they had no way to know if anything was coming at all."
          />
          <FindingCard
            number="03"
            title="HR is the hidden bottleneck"
            body="Manual coordination scaled poorly. The process worked for 100 people; at 900+ it was breaking down entirely with no tooling to help."
          />
        </div>
      </Section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <Section id="solution" label="Solution">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          A digital gifting platform with end-to-end tracking
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '520px', marginBottom: '32px' }}>
          GoGift replaces the manual process with a self-service flow. Employees claim their preferred gift, track delivery in real time, and submit feedback — all in one place. HR manages everything from a single dashboard.
        </p>

        {/* Process flow */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>Distribution Flow</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/gift/process.png" alt="GoGift distribution process" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* 3-stage flow */}
        <div>
          <MonoTag>Three-Stage Employee Journey</MonoTag>
          <div className="cs-stage-flow" style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', background: C.surface }}>
            {[
              { n: '01', stage: 'Claim',    desc: 'Employee browses available gift options and claims their preferred item within the campaign window' },
              { n: '02', stage: 'Receive',  desc: 'Real-time delivery tracking with estimated arrival date and courier handoff confirmation' },
              { n: '03', stage: 'Feedback', desc: "After receiving, employees rate their experience and leave a note — feeding back into next season's gift selection" },
            ].map(({ n, stage, desc }, i) => (
              <div key={n} style={{
                flex: 1,
                padding: '24px 20px',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
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
      </Section>

      {/* ── Testing ───────────────────────────────────────────────────────── */}
      <Section id="testing" label="Testing">

        {/* Left: merged text + 2×2 stats / Right: video */}
        <div className="cs-row-2" style={{ marginBottom: '32px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '16px' }}>
              Three rounds, three clear signals
            </h2>
            <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, marginBottom: '32px' }}>
              We tested with 12 employees across office and remote contexts, focusing on the claim flow, delivery status page, and feedback form. After research, I created the first version of the interaction flow and ran a requirements review with the development team — this helped us quickly adjust the logic to make it more feasible and grounded in technical constraints.
            </p>

            {/* Stats 2×2 grid */}
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
                { value: '12',   label: 'Users tested' },
                { value: '3',    label: 'Rounds of testing' },
                { value: '< 3m', label: 'Avg. task time' },
                { value: '100%', label: 'Completion rate' },
              ].map(({ value, label }) => (
                <div key={label} style={{ padding: '24px 20px', background: C.bg, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontFamily: C.fontSans, fontSize: '30px', fontWeight: 300, letterSpacing: '-0.03em', color: C.ink, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: C.fontMono, fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div style={{ flex: '0 0 240px' }}>
            <video
              src="/work/gift/demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            />
          </div>
        </div>

        <MonoTag>Key Findings</MonoTag>
        <div className="cs-grid-3">
          <FindingCard
            number="01"
            title="Gift preview mattered most"
            body="Users spent the most time on the gift selection screen — clear product images and descriptions were essential. A placeholder image caused significant hesitation."
          />
          <FindingCard
            number="02"
            title="Delivery page needed a timeline"
            body="A single status badge wasn't enough. Users wanted a step-by-step timeline showing where in transit the package was — similar to what they expected from consumer apps."
          />
          <FindingCard
            number="03"
            title="Feedback form needed to feel optional"
            body="Users were more likely to complete the feedback form when it was framed as a contribution to next year's selection, not a required satisfaction survey."
          />
        </div>
      </Section>

      {/* ── Final Designs ─────────────────────────────────────────────────── */}
      <Section id="designs" label="Final Designs">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '28px', maxWidth: '560px' }}>
          Three screens, one coherent flow
        </h2>

        {[
          {
            tag: 'Claim',
            flow: 'Browse → Select → Confirm → Done',
            desc: 'Employees see all available gift options with photos and descriptions. After selecting, they confirm their choice and receive an immediate confirmation. The window closes at campaign end.',
            bullets: [
              'Grid layout with product image, name, and a short description per option',
              'One-tap selection with a confirm modal to prevent accidental claims',
              'Campaign countdown timer so employees know how long they have to choose',
            ],
            src: '/work/gift/claim.png',
            alt: 'Gift claim screen',
          },
          {
            tag: 'Receive',
            flow: 'Dispatched → In Transit → Out for Delivery → Delivered',
            desc: 'A real-time tracking view replaces the previous silence. Employees see exactly where their gift is — and remote employees are no longer left wondering whether anything was sent.',
            bullets: [
              'Step-by-step delivery timeline with timestamps at each stage',
              'Estimated arrival date pulled from courier API',
              'Push notification when status changes to "out for delivery"',
            ],
            src: '/work/gift/receive.png',
            alt: 'Delivery tracking screen',
          },
          {
            tag: 'Feedback',
            flow: 'Rate → Comment → Submit → Done',
            desc: "After delivery, employees are invited — not required — to leave feedback. The framing emphasises that their input shapes next season's selection, which increased response rates significantly during pilot.",
            bullets: [
              'Five-star rating with optional freeform comment',
              'Framed as "help us pick better gifts next time" to feel like contribution, not obligation',
              'HR dashboard aggregates ratings and comments per gift category',
            ],
            src: '/work/gift/feedback.png',
            alt: 'Feedback screen',
          },
        ].map(({ tag, flow, desc, bullets, src, alt }) => (
          <div key={tag} className="cs-row-2" style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>{tag}</div>
              <div style={{ fontFamily: C.fontSans, fontSize: '20px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '26px', color: C.ink, marginBottom: '14px' }}>{flow}</div>
              <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, margin: '0 0 12px' }}>{desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {bullets.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                    <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Image */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
            </div>
          </div>
        ))}

        {/* Admin dashboard — wide web UI, full width */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Admin Dashboard</div>
          <div style={{ fontFamily: C.fontSans, fontSize: '20px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '26px', color: C.ink, marginBottom: '14px' }}>Set up campaign → Monitor → Resolve</div>
          <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '480px', margin: '0 0 24px' }}>
            HR sets campaign parameters, manages the gift catalogue, and monitors claim and delivery progress — all from a web dashboard. Edge cases like failed deliveries can be actioned directly without leaving the platform.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/gift/admin-dashboard.png" alt="Admin dashboard" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
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
            { value: '960',   label: 'Employees using the platform' },
            { value: '92.3%', label: 'Overall satisfaction' },
            { value: '68%',   label: 'Feedback form completion' },
            { value: '↓ 80%', label: 'HR coordination hours' },
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

        {/* In-use images */}
        <div className="cs-grid-2" style={{ marginBottom: '32px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/gift/inuse1.png" alt="GoGift in use" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/gift/inuse2.png" alt="GoGift in use" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '28px 32px', borderLeft: `3px solid ${C.accent}` }}>
          <p style={{ fontFamily: C.fontSans, fontSize: '16px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, letterSpacing: '-0.01em', color: C.ink, margin: '0 0 12px' }}>
            &quot;We used to spend three weeks on gift season logistics. This year it took three days. And for the first time, nobody complained about what they got.&quot;
          </p>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.subtle }}>
            Internal feedback — HR team · Sep 2022
          </div>
        </div>
      </Section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <Section id="reflection" label="Reflection" last paddingBottom="96px">
        <div className="cs-grid-2" style={{ marginBottom: '32px' }}>
          {[
            { tag: 'Scope',    title: 'Small choices have outsized impact',     body: 'Giving employees a choice from even a small catalogue — three or four options — transformed how the programme felt. Autonomy mattered more than the gift itself.' },
            { tag: 'Research', title: 'Remote vs. in-office are different users', body: 'Office employees cared most about choice; remote employees cared most about tracking. The same screen had to serve both well, which required careful hierarchy decisions.' },
            { tag: 'Process',  title: 'Framing drives behaviour',               body: 'The feedback form had a 22% completion rate when labelled "Satisfaction Survey." It jumped to 68% when reframed as helping pick next year\'s gifts. Wording is a design decision.' },
            { tag: 'Systems',  title: 'HR tooling is the foundation',           body: 'A great employee experience is impossible without a capable admin layer. The time we invested in the HR dashboard paid off in reduced support requests and faster issue resolution.' },
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
