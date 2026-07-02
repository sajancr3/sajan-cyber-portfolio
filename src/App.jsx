import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import GRC from './pages/GRC.jsx'
import IAM from './pages/IAM.jsx'
import HologramBg from './components/HologramBg.jsx'
import Cyber from './pages/Cyber.jsx'
import Writeups from './pages/Writeups.jsx'
import Gallery from './pages/Gallery.jsx'

const NAV = [
  { path: '/',         label: 'Home',        accent: null },
  { path: '/grc',      label: 'GRC & Audit', accent: 'var(--grc)' },
  { path: '/iam',      label: 'IAM',         accent: 'var(--iam)' },
  { path: '/cyber',    label: 'Engineering', accent: 'var(--cyber)' },
  { path: '/writeups', label: 'IR & SOC',    accent: 'var(--write)' },
  { path: '/gallery',  label: 'Gallery',     accent: '#6366f1' },
]

export default function App() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <HologramBg page={pathname} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.2s ease',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <NavLink to="/" style={{ fontWeight: 700, fontSize: '0.88rem', letterSpacing: '-0.01em', color: 'var(--text)' }}>
            Sajan CR
          </NavLink>
          <div style={{ display: 'flex', gap: 4 }}>
            {NAV.filter(n => n.path !== '/').map(n => (
              <NavLink key={n.path} to={n.path} style={({ isActive }) => ({
                padding: '6px 12px',
                borderRadius: 'var(--radius)',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                color: isActive ? n.accent || 'var(--text)' : 'var(--text2)',
                background: isActive ? (n.accent ? `${n.accent}14` : 'var(--surface2)') : 'transparent',
                transition: 'all 0.15s ease',
              })}>
                {n.label}
              </NavLink>
            ))}
          </div>
          <a
            href="mailto:crsajan98@gmail.com"
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              border: '1px solid var(--border2)',
              color: 'var(--text2)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)' }}
          >
            Contact
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 56 }}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/grc"      element={<GRC />} />
          <Route path="/iam"      element={<IAM />} />
          <Route path="/cyber"    element={<Cyber />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/gallery"  element={<Gallery />} />
        </Routes>
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--text3)',
        fontSize: '0.75rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Sajan Chakkumkattuparambil Raju · Warsaw, Poland</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="https://github.com/sajancr3" target="_blank" rel="noreferrer"
               style={{ color: 'var(--text3)', transition: 'color 0.15s' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/sajanchakkumkattuparambilraju" target="_blank" rel="noreferrer"
               style={{ color: 'var(--text3)', transition: 'color 0.15s' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
