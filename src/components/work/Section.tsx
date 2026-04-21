import { CASE_STUDY as C } from './tokens'

interface SectionProps {
  id?: string
  label: string
  children: React.ReactNode
  /** Remove bottom border (use on last section) */
  last?: boolean
  /** Extra vertical padding override */
  paddingBottom?: string
}

export function Section({ id, label, children, last, paddingBottom }: SectionProps) {
  return (
    <section
      id={id}
      className="cs-section"
      style={{
        padding: C.sectionPadding,
        paddingBottom: paddingBottom ?? '64px',
        borderBottom: last ? 'none' : `1px solid ${C.border}`,
      }}
    >
      <div className="cs-section-inner">
      {/* Label column */}
      <div
        className="cs-section-label"
        style={{
          flexShrink: 0,
          paddingTop: '4px',
          fontFamily: C.fontMono,
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: C.subtle,
        }}
      >
        {label}
      </div>

      {/* Content column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>
      </div>
    </section>
  )
}

/** Full-width section — no label column, content spans full width */
export function FullSection({
  id,
  children,
  last,
  padding,
}: {
  id?: string
  children: React.ReactNode
  last?: boolean
  padding?: string
}) {
  return (
    <section
      id={id}
      className="cs-section"
      style={{
        padding: padding ?? C.sectionPadding,
        borderBottom: last ? 'none' : `1px solid ${C.border}`,
      }}
    >
      {children}
    </section>
  )
}
