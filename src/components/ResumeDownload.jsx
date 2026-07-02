import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

/**
 * ResumeDownload
 *
 * Props:
 *   track       — "GRC & Audit" | "IAM" | "Cybersecurity"
 *   filename    — PDF filename inside /public/resumes/
 *   accent      — CSS color string
 *   highlights  — string[]
 */
export default function ResumeDownload({ track, filename, accent, highlights = [] }) {
  const [open, setOpen]           = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [downloaded, setDownloaded]       = useState(false)
  const [pdfError, setPdfError]           = useState(false)

  const pdfUrl = `/resumes/${filename}`

  // Sticky button appears after 300px scroll
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setPdfError(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  const onKey = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false)
  }, [])
  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  const handleDownload = () => {
    const link    = document.createElement('a')
    link.href     = pdfUrl
    link.download = filename
    link.click()
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  return (
    <>
      {/* ── Inline banner ──────────────────────────────── */}
      <div style={{
        background: `${accent}08`,
        border: `1px solid ${accent}28`,
        borderRadius: 8,
        padding: '20px 24px',
        marginBottom: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: accent, marginBottom: 6,
          }}>
            Tailored Resume — {track}
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: highlights.length ? 10 : 0 }}>
            Optimised for {track} roles.
          </div>
          {highlights.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 18px', marginTop: 8 }}>
              {highlights.map(h => (
                <span key={h} style={{
                  fontSize: '0.72rem', color: 'var(--text2)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 6,
            background: `${accent}12`,
            border: `1px solid ${accent}35`,
            color: accent,
            fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${accent}22`; e.currentTarget.style.borderColor = `${accent}55` }}
          onMouseLeave={e => { e.currentTarget.style.background = `${accent}12`; e.currentTarget.style.borderColor = `${accent}35` }}
        >
          <EyeIcon accent={accent} />
          View Resume
        </button>
      </div>

      {/* ── Sticky floating button ──────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 28, right: 28, zIndex: 200,
        transform: stickyVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        opacity: stickyVisible ? 1 : 0,
        pointerEvents: stickyVisible ? 'auto' : 'none',
        transition: 'transform 0.25s ease, opacity 0.25s ease',
      }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '11px 22px', borderRadius: 40,
            background: 'var(--surface2)',
            border: `1px solid ${accent}45`,
            color: accent,
            fontSize: '0.78rem', fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${accent}18`,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${accent}14`
            e.currentTarget.style.boxShadow = `0 4px 28px rgba(0,0,0,0.6), 0 0 0 1px ${accent}35`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--surface2)'
            e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${accent}18`
          }}
        >
          <EyeIcon accent={accent} />
          {track} Resume
        </button>
      </div>

      {/* ── Modal ──────────────────────────────────────── */}
      {open && createPortal(
        <div
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(3,6,18,0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.18s ease',
          }}
        >
          <style>{`
            @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            borderRadius: 10,
            width: '100%', maxWidth: 860,
            maxHeight: '92vh',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            animation: 'slideUp 0.22s ease',
          }}>

            {/* Modal header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: accent,
                }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                    Sajan Chakkumkattuparambil Raju
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text2)', marginTop: 2, letterSpacing: '0.04em' }}>
                    {track} Resume · {filename}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Download button */}
                <button
                  onClick={handleDownload}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 16px', borderRadius: 5,
                    background: downloaded ? 'rgba(52,211,153,0.1)' : `${accent}12`,
                    border: `1px solid ${downloaded ? 'rgba(52,211,153,0.3)' : `${accent}35`}`,
                    color: downloaded ? '#34d399' : accent,
                    fontSize: '0.75rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => { if (!downloaded) e.currentTarget.style.background = `${accent}22` }}
                  onMouseLeave={e => { if (!downloaded) e.currentTarget.style.background = `${accent}12` }}
                >
                  {downloaded ? <CheckIcon /> : <DownloadIcon accent={accent} />}
                  {downloaded ? 'Saved' : 'Download PDF'}
                </button>

                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 5,
                    background: 'none',
                    border: '1px solid var(--border2)',
                    color: 'var(--text2)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)' }}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div style={{ flex: 1, overflow: 'hidden', background: '#1a1a2e', position: 'relative' }}>
              {pdfError ? (
                <div style={{
                  height: '100%', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 16,
                  padding: 40,
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text2)', textAlign: 'center', lineHeight: 1.6, maxWidth: 360 }}>
                    The resume PDF is not yet uploaded to the server.
                    <br /><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                      Place <strong style={{ color: 'var(--text2)' }}>{filename}</strong> in<br />
                      <strong style={{ color: accent }}>/public/resumes/</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleDownload}
                    style={{
                      padding: '9px 20px', borderRadius: 5,
                      background: `${accent}12`, border: `1px solid ${accent}35`,
                      color: accent, fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Try download anyway
                  </button>
                </div>
              ) : (
                <iframe
                  src={pdfUrl}
                  title={`${track} Resume — Sajan CR`}
                  onError={() => setPdfError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 540,
                    border: 'none',
                    display: 'block',
                  }}
                />
              )}
            </div>

            {/* Modal footer */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>
                Press Esc or click outside to close
              </div>
              <a
                href="mailto:crsajan98@gmail.com"
                style={{
                  fontSize: '0.72rem', fontWeight: 600, color: accent,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}
              >
                crsajan98@gmail.com
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// ── Icons ─────────────────────────────────────────────────────

function EyeIcon({ accent }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: accent }}>
      <path d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function DownloadIcon({ accent }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: accent }}>
      <path d="M6.5 1v7.5M4 6l2.5 2.5L9 6M2 11h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: '#34d399' }}>
      <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: 'currentColor' }}>
      <path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
