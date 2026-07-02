export default function SectionHeader({ label, title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 48 }}>
      {label && (
        <div style={{
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: accent, marginBottom: 10,
        }}>{label}</div>
      )}
      <h2 style={{
        fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700,
        color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2,
        marginBottom: subtitle ? 12 : 0,
      }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 560, lineHeight: 1.6 }}>{subtitle}</p>
      )}
    </div>
  )
}
