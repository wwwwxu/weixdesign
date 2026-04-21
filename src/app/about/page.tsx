const EXPERIENCE = [
  { org: 'Upfront', role: 'Head of Design', period: '2024 – Present' },
  { org: 'Hesai Technology', role: 'Product Designer', period: '2021 – 2023' },
]

const EDUCATION = [
  { org: 'Arizona State University', role: 'M.S. in Design', period: '2018 – 2020' },
  { org: 'Dalian University of Technology', role: 'B.E. in Industrial Design', period: '2013' },
]

const PHILOSOPHY = [
  { quote: 'Entropy is the default.\nDesign is the act of resistance.', num: '01' },
  { quote: 'Design is clear thinking visualized.', num: '02' },
  { quote: 'Progressive disclosure of complexity (start simple and the user opts in for complexity).', num: '03' },
  { quote: 'Make it useful, then usable, then beautiful.', num: '04' },
]

const INTERESTS = [
  'Working out in the gym',
  'Knitting as a form of meditation',
  'Studying Japanese — slowly, stubbornly',
  'Cataloguing cafés with good light',
]

function ResumeRow({ org, role, period }: { org: string; role: string; period: string }) {
  return (
    <div>
      <div style={{ height: '1px', background: '#E2DDD5' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBlock: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
              fontSize: '15px',
              letterSpacing: '-0.01em',
              lineHeight: '18px',
              color: '#343434',
            }}
          >
            {org}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
              fontSize: '15px',
              letterSpacing: '-0.01em',
              lineHeight: '18px',
              color: '#9CA3AF',
            }}
          >
            {' /'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
              fontSize: '15px',
              letterSpacing: '-0.01em',
              lineHeight: '18px',
              color: '#6B7280',
            }}
          >
            {role}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            lineHeight: '14px',
            color: '#9CA3AF',
            flexShrink: 0,
            paddingLeft: '24px',
            whiteSpace: 'nowrap',
          }}
        >
          {period}
        </span>
      </div>
    </div>
  )
}

function ResumeSection({ label, rows }: { label: string; rows: typeof EXPERIENCE }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
      <div
        style={{
          fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#9CA3AF',
          marginBottom: '16px',
        }}
      >
        {label}
      </div>
      {rows.map(r => (
        <ResumeRow key={r.org} {...r} />
      ))}
      <div style={{ height: '1px', background: '#E2DDD5' }} />
    </div>
  )
}

export default function AboutPage() {
  return (
    /* Scrollable container that bypasses body overflow:hidden */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        background: '#F8F8F8',
      }}
    >
      <div className="about-page">
        {/* ── Two-column top section ─────────────────────────────── */}
        <div className="about-top">
          {/* Left: bio */}
          <div className="about-col">
            <p
              style={{
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: 'clamp(44px, 4vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: '#1A1714',
                margin: '0 0 48px',
              }}
            >
              I&apos;m a designer, fixing complexity and bringing clarity.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.75,
                color: '#53514F',
                margin: '0 0 16px',
                maxWidth: '637px',
              }}
            >
              My name is 薇 (Wei). In Chinese it normally means roses, but I prefer its other
              meaning: wild grass, the kind that grows anywhere and refuses to quit.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.75,
                color: 'rgba(26,23,20,0.75)',
                margin: '0 0 16px',
                maxWidth: '637px',
              }}
            >
              I&apos;ve always believed that honesty is the most valuable thing a person can bring
              to their work. It&apos;s also why I fell in love with design. Design starts with
              people, sits at the intersection of disciplines, and at its best, creates real
              business value, not just good experiences. Over the years I&apos;ve learned to pull
              problems apart patiently and systematically until the right solution feels almost
              obvious.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.75,
                color: 'rgba(26,23,20,0.75)',
                margin: '0 0 12px',
              }}
            >
              Outside of design, I&apos;m:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '4px', marginBottom: '24px' }}>
              {INTERESTS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: '16px' }}>•</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      lineHeight: '18px',
                      color: 'rgba(26,23,20,0.75)',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.75,
                color: 'rgba(26,23,20,0.75)',
                margin: 0,
              }}
            >
              Find me on{' '}
              <a href="https://www.linkedin.com/in/weixu95/" target="_blank" rel="noopener noreferrer" style={{ color: '#343434', textDecoration: 'underline', textUnderlineOffset: '3px' }}>LinkedIn</a>
              ,{' '}
              <a href="https://www.behance.net/vivixu95" target="_blank" rel="noopener noreferrer" style={{ color: '#343434', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Behance</a>
              , or{' '}
              <a href="mailto:weixu8@asu.edu" style={{ color: '#343434', textDecoration: 'underline', textUnderlineOffset: '3px' }}>email me</a>
              . I&apos;d love to meet you.
            </p>
          </div>

          {/* Right: experience + education */}
          <div className="about-col-right">
            <ResumeSection label="Experience" rows={EXPERIENCE} />
            <ResumeSection label="Education" rows={EDUCATION} />
          </div>
        </div>

        {/* ── Philosophy section ─────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBlock: '80px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
              fontSize: '36px',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: '44px',
              color: '#141412',
              textAlign: 'center',
              margin: '0 0 52px',
            }}
          >
            My design philosophy
          </h2>

          <div className="about-philosophy-grid">
            {PHILOSOPHY.map(({ quote, num }) => (
              <div
                key={num}
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.03) 0px 4px 12px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '140px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-geist, "Geist"), ui-sans-serif, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.6,
                    color: '#1A1A18',
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {quote}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    lineHeight: '12px',
                    color: '#BEBEBA',
                    marginTop: '20px',
                  }}
                >
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
