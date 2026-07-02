import { useState } from 'react'

export default function WriteupCard({ title, category, difficulty, platform, date, summary, findings, tools, link, accent }) {
  const [open, setOpen] = useState(false)

  const diffColor = {
    Easy:   '#34d399',
    Medium: '#fbbf24',
    Hard:   '#f43f5e',
    'N/A':  'var(--text3)',
  }[difficulty] || accent

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${accent}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: accent,
              padding: '2px 7px', borderRadius: 3,
              background: `${accent}10`, border: `1px solid ${accent}22`,
            }}>{category}</span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: diffColor,
            }}>{difficulty}</span>
            {platform && (
              <span style={{ fontSize: '0.65rem', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{platform}</span>
            )}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {date && <span style={{ fontSize: '0.7rem', color: 'var(--text3)', whiteSpace: 'nowrap', fontFamily: 'var(--mono)' }}>{date}</span>}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ color: 'var(--text3)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div style={{ padding: '0 22px 22px', borderTop: '1px solid var(--border)' }}>
          <div style={{ paddingTop: 18 }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>
              Summary
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: 18 }}>{summary}</p>

            {findings && findings.length > 0 && (
              <>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
                  Key Findings
                </div>
                <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                  {findings.map((f, i) => (
                    <li key={i} style={{
                      fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5,
                      padding: '6px 0', borderBottom: '1px solid var(--border)',
                      display: 'flex', gap: 10,
                    }}>
                      <span style={{ color: accent, flexShrink: 0, fontFamily: 'var(--mono)', fontSize: '0.7rem', marginTop: 2 }}>→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tools && tools.length > 0 && (
              <>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
                  Tools Used
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: link ? 18 : 0 }}>
                  {tools.map(t => (
                    <span key={t} style={{
                      fontSize: '0.65rem', fontWeight: 500,
                      padding: '3px 8px', borderRadius: 3,
                      background: 'var(--surface2)', color: 'var(--text2)',
                      border: '1px solid var(--border2)',
                      fontFamily: 'var(--mono)',
                    }}>{t}</span>
                  ))}
                </div>
              </>
            )}

            {link && (
              <a href={link} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.75rem', fontWeight: 600, color: accent,
                marginTop: 4,
              }}>
                Read full writeup
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
