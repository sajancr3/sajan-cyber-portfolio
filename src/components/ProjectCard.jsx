import { Link } from 'react-router-dom'
import ProjectThumbnail from './ProjectThumbnail.jsx'

export default function ProjectCard({ title, subtitle, description, tags, link, accent, screenshot, galleryLink, screenshotCount, thumbnail }) {
  return (
    <div
      style={{
        display: 'block',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent || 'var(--border2)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 0 18px ${accent || '#2563eb'}30, 0 0 40px ${accent || '#2563eb'}12`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail / screenshot slot */}
      {screenshot ? (
        <img src={screenshot} alt={title}
             style={{ width: '100%', height: 180, objectFit: 'cover', borderBottom: '1px solid var(--border)', display: 'block' }} />
      ) : thumbnail ? (
        <div style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
          <ProjectThumbnail type={thumbnail} accent={accent} height={180}/>
        </div>
      ) : (
        <div style={{
          height: 140, borderBottom: '1px solid var(--border)',
          background: `linear-gradient(135deg, var(--surface2) 0%, ${accent}0a 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: `1px solid ${accent}33`, background: `${accent}10`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 16, height: 16, borderRadius: 2, background: accent, opacity: 0.6 }} />
          </div>
        </div>
      )}

      <div style={{ padding: '20px 22px 22px' }}>
        {subtitle && (
          <div style={{
            fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: accent, marginBottom: 6,
          }}>{subtitle}</div>
        )}
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>
          {description}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: galleryLink || link ? 14 : 0 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em',
              padding: '3px 8px', borderRadius: 3,
              background: `${accent}10`, color: accent,
              border: `1px solid ${accent}22`,
            }}>{tag}</span>
          ))}
        </div>
        {(galleryLink || link) && (
          <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            {link && (
              <a href={link} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em',
                padding: '5px 12px', borderRadius: 4,
                background: `${accent}12`, border: `1px solid ${accent}30`,
                color: accent, textDecoration: 'none', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${accent}22`}
              onMouseLeave={e => e.currentTarget.style.background = `${accent}12`}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 9V1H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                GitHub
              </a>
            )}
            {galleryLink && (
              <Link to={galleryLink} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em',
                padding: '5px 12px', borderRadius: 4,
                background: 'var(--surface2)', border: '1px solid var(--border2)',
                color: 'var(--text2)', textDecoration: 'none', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = `${accent}44` }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                  <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                  <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                  <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                </svg>
                Screenshots {screenshotCount ? `(${screenshotCount})` : ''}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
