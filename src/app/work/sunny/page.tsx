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
  { id: 'analysis',    label: 'Analysis' },
  { id: 'solution',    label: 'Solution' },
  { id: 'designs',     label: 'Final Designs' },
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
      <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: C.muted, margin: 0 }}>
        {children}
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
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: C.muted, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

function PersonaCard({ name, role, description, pain }: { name: string; role: string; description: string; pain: string }) {
  return (
    <div style={{ flex: 1, padding: '28px 24px', background: C.bg, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '4px' }}>
        {name}
      </div>
      <p style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 500, lineHeight: 1.4, color: C.ink, margin: 0 }}>
        {role}
      </p>
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 400, lineHeight: 1.5, color: C.ink, margin: 0 }}>
        {description}
      </p>
      <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.65, color: C.muted, margin: 0 }}>
        {pain}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SunnyCaseStudy() {
  return (
    <CaseStudyShell
      title="Sunny"
      subtitle="Graduate Thesis · 2019–2020"
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
          UX Design · Graduate Thesis — 2019–2020
        </div>

        <h1 style={{
          fontFamily: C.fontSans,
          fontSize: 'clamp(32px, 3.8vw, 52px)',
          fontWeight: 300,
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          color: C.ink,
          maxWidth: '700px',
          margin: '0 0 40px',
        }}>
          Engaging{' '}
          <em style={{ fontStyle: 'italic', color: C.muted }}>gamification</em>{' '}
          into campus counseling for international students
        </h1>

        <dl className="cs-meta-dl" style={{ paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
          {[
            { label: 'Timeframe', value: 'Aug 2019 – Apr 2020' },
            { label: 'Role',      value: 'Researcher · UX/UI Designer' },
            { label: 'Methods',   value: 'Survey · Interview · Focus Group' },
            { label: 'Type',      value: 'Graduate Thesis' },
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
        <img src="/work/sunny/solution.png" alt="Sunny app overview" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
      </FullSection>

      {/* ── Background ────────────────────────────────────────────────────── */}
      <Section id="background" label="Background">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          A support gap that puts a vulnerable group at risk
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
          <NumberedItem number="01">
            Depression affects adolescents globally, but international students face compounding barriers — isolation, cultural distance, and language gaps make accessing mental health support especially difficult.
          </NumberedItem>
          <NumberedItem number="02">
            Campus counseling services exist, but international students rarely use them. Common blockers include fear of social stigma, perception of counseling as time-wasting, and cultural mismatches between student and counselor.
          </NumberedItem>
          <NumberedItem number="03">
            The thesis goal: design a better experience for international students with depression by integrating gamification into campus counseling — bridging the gap between students and available resources.
          </NumberedItem>
        </div>

        <div className="cs-grid-2">
          <div style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Research Questions</div>
            {[
              'What pressure sources do international students face?',
              'How do they currently cope with stress and depression?',
              'What are their perceptions of campus counseling?',
              'Where does gamification fit in this service context?',
            ].map(q => (
              <div key={q} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Mixed Methods</div>
            {[
              { method: 'Online Survey', detail: '62 Chinese international students across US, Japan, Europe' },
              { method: 'Semi-structured Interviews', detail: '8 participants — deeper exploration of lived experience' },
              { method: 'Focus Groups', detail: '8 participants — gamification perception and feature priorities' },
            ].map(({ method, detail }) => (
              <div key={method} style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '10px' }}>
                <div style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 500, color: C.ink, marginBottom: '3px' }}>{method}</div>
                <div style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.5, color: C.muted }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <Section id="discovery" label="Discovery">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Mapping the gap between students and services
        </h2>

        {/* Stats row */}
        <div className="cs-persona-row" style={{ gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          {[
            { value: '62',  label: 'Survey respondents' },
            { value: '100%', label: 'Reported depression episodes' },
            { value: '50%',  label: 'Seek support actively' },
            { value: 'Few',  label: 'Access school counseling' },
          ].map(({ value, label }, i) => (
            <div key={label} style={{ flex: 1, padding: '32px 20px', background: C.bg, display: 'flex', flexDirection: 'column', gap: '8px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: C.fontSans, fontSize: '32px', fontWeight: 300, letterSpacing: '-0.03em', color: i < 2 ? C.accent : C.ink, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.subtle }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Empathy map */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>Empathy Map</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/sunny/empathy-map.png" alt="Empathy map" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Key fears + ideas */}
        <div className="cs-grid-2" style={{ marginBottom: '32px' }}>
          <div style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Fears</div>
            {[
              'Culture and language barriers creating misunderstanding',
              'Social prejudice against depression',
              'Perception of counseling as a waste of time',
              'Loneliness and lack of emotional support',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>Opportunities</div>
            {[
              'Services must be easily accessible, low-friction to start',
              'Use existing school resources rather than building from scratch',
              'Counselors should have student background before sessions',
              'Online assessment and reservation to reduce friction',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: '7px' }} />
                <span style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gamification octagon */}
        <div>
          <MonoTag>Gamification Drivers — Octalysis</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/sunny/octagon.png" alt="Gamification octalysis framework" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>
      </Section>

      {/* ── Analysis ──────────────────────────────────────────────────────── */}
      <Section id="analysis" label="Analysis">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          Two personas, one shared need
        </h2>

        {/* Persona cards */}
        <div className="cs-persona-row" style={{ gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          <PersonaCard
            name="Jason Wang"
            role="Graduate · Design · 2nd year"
            description="Post-graduation anxiety and sporadic depression. Manages through walks and gaming. Skeptical about whether counseling is necessary for him."
            pain="Procrastination-driven anxiety, limited social connections, doesn't see himself as someone who 'needs' counseling"
          />
          <PersonaCard
            name="Jane Li"
            role="Freshman · Finance · 1st year"
            description="Previous unsuccessful counseling attempt due to cultural barriers. Difficulty forming international friendships. Seeks professional guidance but unsure where to start."
            pain="Sensitive to relationship issues, prior negative experience with counseling, feels isolated in a new country"
          />
        </div>

        {/* User journey */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>User Journey Map</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/sunny/user-map.png" alt="User journey map" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Key insights */}
        <div className="cs-grid-3">
          <FindingCard
            number="01"
            title="Online ≠ replacement"
            body="Face-to-face counseling cannot be replaced. The online layer is a bridge — it maintains mental health and prepares both student and counselor for a more effective in-person session."
          />
          <FindingCard
            number="02"
            title="Anonymity unlocks openness"
            body="Students are more willing to share in anonymous community settings. Removing identity reduces stigma and enables honest self-expression at early stages."
          />
          <FindingCard
            number="03"
            title="Gamification as motivation"
            body="Focus group participants responded positively to reward-based progress tracking and activity completion — framing mental health maintenance as achievable daily goals."
          />
        </div>
      </Section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <Section id="solution" label="Solution">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '24px', maxWidth: '560px' }}>
          A bridge between student and counselor
        </h2>
        <p style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: '520px', marginBottom: '32px' }}>
          Sunny combines online and offline services. The app handles daily mental health maintenance, self-reporting, community, and session booking — so by the time a student meets a counselor in person, both sides are already prepared.
        </p>

        {/* Service model */}
        <div style={{ marginBottom: '32px' }}>
          <MonoTag>Service Model</MonoTag>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/sunny/service-model.png" alt="Service model" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        </div>

        {/* Design guidelines */}
        <div>
          <MonoTag>Design Guidelines</MonoTag>
          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', background: C.surface }}>
            {[
              { n: '01', label: 'Safe & Tidy',      desc: 'Warm colors, icons over text, virtual characters — avoids depression stereotypes and feels approachable rather than clinical' },
              { n: '02', label: 'Low Friction',      desc: 'Short assessments with immediate feedback, intuitive onboarding, anonymous modes — minimise the effort to start' },
              { n: '03', label: 'Gamified Progress', desc: 'Achievement systems, reward-based task completion, emotion tracking with periodic visualisation — makes maintenance feel meaningful' },
              { n: '04', label: 'Counselor-Ready',   desc: 'Counselor profiles with language and nationality filters, advance messaging, student-controlled data sharing before sessions' },
            ].map(({ n, label, desc }, i) => (
              <div key={n} style={{ flex: 1, padding: '24px 20px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: C.fontMono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent }}>{n}</div>
                <div style={{ fontFamily: C.fontSans, fontSize: '14px', fontWeight: 500, color: C.ink, letterSpacing: '-0.01em' }}>{label}</div>
                <p style={{ fontFamily: C.fontSans, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: C.muted, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Final Designs ─────────────────────────────────────────────────── */}
      <Section id="designs" label="Final Designs">
        <h2 style={{ fontFamily: C.fontSans, fontSize: '28px', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.ink, marginBottom: '28px', maxWidth: '560px' }}>
          Three core flows
        </h2>

        {[
          {
            tag: 'Self Report & Home',
            flow: 'Log → Visualise → Grow',
            desc: 'Daily emotion logging builds a personal growth map. Gamified streaks and achievements make the habit sustainable.',
            bullets: [
              'Icon-based emotion check-in — quick and expressive, no lengthy forms',
              'Periodic visualisation shows emotional patterns over time',
              'Achievement system rewards consistent self-reporting',
            ],
            src: '/work/sunny/interface1.png',
            alt: 'Self report and home screen',
          },
          {
            tag: 'Book a Session',
            flow: 'Browse → Filter → Message → Book',
            desc: 'Students find a counselor who matches their language, nationality, and topic area. Advance messaging lets both sides prepare.',
            bullets: [
              'Counselor profiles with specialisations, languages, and availability',
              'Filter by nationality and topic for cultural fit',
              'Send context in advance so sessions start with understanding',
            ],
            src: '/work/sunny/interface2.png',
            alt: 'Book session screen',
          },
          {
            tag: 'Community',
            flow: 'Explore → Share → Connect',
            desc: 'Activity-based community with optional anonymous posting. Students find peers going through similar experiences without exposing their identity.',
            bullets: [
              'Activity feeds grouped by interest and campus events',
              'Anonymous mode for sensitive sharing — moderated for safety',
              'Multi-language support for non-English-speaking students',
            ],
            src: '/work/sunny/interface3.png',
            alt: 'Community screen',
          },
        ].map(({ tag, flow, desc, bullets, src, alt }) => (
          <div key={tag} className="cs-row-2" style={{ borderTop: `1px solid ${C.border}`, paddingBlock: '28px' }}>
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
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
            </div>
          </div>
        ))}
      </Section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <Section id="reflection" label="Reflection" last paddingBottom="96px">
        <div className="cs-grid-2" style={{ marginBottom: '32px' }}>
          {[
            { tag: 'Methods',   title: 'Quantitative depth was the weak point',      body: 'Relying on a single-direction survey limited the richness of quantitative insight. Future work needs a more comprehensive measurement framework — something my thesis committee rightly flagged.' },
            { tag: 'Framing',   title: 'Online as bridge, not replacement',          body: "The key insight that shifted the entire design: don't try to replace in-person counseling. Build a layer that prepares and sustains — so when students finally do meet a counselor, it's already meaningful." },
            { tag: 'Iteration', title: 'More testing was needed',                    body: 'The design moved quickly from research to prototype without sufficient iterative testing. Real user feedback at each stage would have sharpened the gamification mechanics significantly.' },
            { tag: 'Future',    title: 'AI has a natural role here',                 body: 'Integrating an AI layer for early emotional assessment, pattern recognition, and personalised activity recommendations is a clear next step — and more feasible now than when this project was completed.' },
          ].map(({ tag, title, body }) => (
            <div key={tag} style={{ padding: '28px 32px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
              <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: '10px' }}>
                {tag}
              </div>
              <h4 style={{ fontFamily: C.fontSans, fontSize: '15px', fontWeight: 500, lineHeight: 1.4, color: C.ink, marginBottom: '8px' }}>
                {title}
              </h4>
              <p style={{ fontFamily: C.fontSans, fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: C.muted, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '28px 32px', borderLeft: `3px solid ${C.accent}` }}>
          <p style={{ fontFamily: C.fontSans, fontSize: '16px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, letterSpacing: '-0.01em', color: C.ink, margin: '0 0 12px' }}>
            &quot;I hope more and more people will pay attention to this special group — and that design can be part of making that happen.&quot;
          </p>
          <div style={{ fontFamily: C.fontMono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.subtle }}>
            Graduate Thesis — Arizona State University · 2020
          </div>
        </div>
      </Section>

    </CaseStudyShell>
  )
}
