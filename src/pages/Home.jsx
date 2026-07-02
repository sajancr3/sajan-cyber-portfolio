import { Link } from 'react-router-dom'

const TRACKS = [
  {
    path: '/grc',
    accent: 'var(--grc)',
    accentHex: '#2563eb',
    label: 'GRC & Audit',
    title: 'Governance, Risk & Compliance',
    desc: 'NIS2 and DORA implementation, 3rd Line of Defense IT audit, IIA 4E methodology, KNF-aligned risk frameworks.',
    items: ['NIS2 Compliance Platform', 'DORA ICT Risk Platform', 'ISO 27701 Lead Auditor', 'IIA 4E Audit Findings'],
  },
  {
    path: '/iam',
    accent: 'var(--iam)',
    accentHex: '#0891b2',
    label: 'IAM',
    title: 'Identity & Access Management',
    desc: 'Microsoft Entra ID, identity lifecycle automation, access governance, AI-powered IGA with cryptographic audit trails.',
    items: ['TrustShield IGA Platform', 'Entra ID Graph API Governance', 'Joiners Movers Leavers Lifecycle', 'Ed25519 Evidence Vault'],
  },
  {
    path: '/cyber',
    accent: 'var(--cyber)',
    accentHex: '#3b5fd8',
    label: 'Engineering',
    title: 'Detection Engineering & Threat Intelligence',
    desc: 'SOC platform engineering, breach simulation, deception technology, MITRE ATT&CK validation, distributed honeypot networks.',
    items: ['SentinelForge SOC Platform', 'ControlProbe BAS (15 techniques)', 'DeceptionGrid Honeypot (6,500+ events)', 'Wazuh SIEM Integration'],
  },
  {
    path: '/writeups',
    accent: 'var(--write)',
    accentHex: '#0d9488',
    label: 'IR & SOC',
    title: 'Incident Response & SOC Operations',
    desc: 'PCAP analysis, malware triage, SOC alert handling, and threat hunting across CyberDefenders, LetsDefend, and BTLO platforms.',
    items: ['CyberDefenders PCAP Analysis', 'SOC Alert Triage (LetsDefend)', 'Log4J RCE / Emotet Response', 'BTLO Phishing IOC Extraction'],
  },
]

const CERTS_PRO = [
  {
    name: 'ISO 27701 Lead Auditor',
    issuer: 'Mastermind',
    year: '2026',
    detail: 'PIMS audit planning, GDPR control mapping, third-party PIMS reviews',
    accent: '#2563eb',
    status: 'In Progress',
  },
  {
    name: 'CICSA',
    issuer: 'Red Team Hacker Academy',
    year: '2024',
    detail: 'SIEM monitoring, IDS alert triage, incident response, SOC operations',
    accent: '#0891b2',
    status: 'Completed',
  },
]

const CERTS_FORAGE = [
  {
    name: 'Cybersecurity Analyst',
    issuer: 'Tata Consultancy Services',
    date: 'June 2026',
    detail: 'IAM strategy, identity risk mapping, solution architecture, executive advisory',
    link: 'https://www.theforage.com/simulations/tata/cybersecurity-sbda',
    certFile: '/certs 2026/Forage Certificate 1.pdf',
    accent: '#3b5fd8',
  },
  {
    name: 'Technology Risk',
    issuer: 'EY (Ernst & Young)',
    date: 'June 2026',
    detail: 'IT risk assessment, internal controls, professional skepticism, risk reporting',
    link: 'https://www.theforage.com/simulations/ey/technology-risk-ydqh',
    certFile: '/certs 2026/Forage Certificate 2.pdf',
    accent: '#2563eb',
  },
  {
    name: 'Cyber Security Analyst',
    issuer: 'Deloitte Australia',
    date: 'June 2026',
    detail: 'Log analysis, breach investigation, Python-assisted data analysis',
    link: 'https://www.theforage.com/simulations/deloitte-au/cyber-c1e3',
    certFile: null,
    accent: '#2563eb',
  },
  {
    name: 'Cyber Security Operations',
    issuer: 'Datacom',
    date: 'June 2026',
    detail: 'Cyberattack investigation, OSINT, risk assessment, client-ready reporting',
    link: 'https://www.theforage.com/simulations/datacom/cybersecurity-zm6d',
    certFile: null,
    accent: '#3b5fd8',
  },
  {
    name: 'Cyber Security Management',
    issuer: 'ANZ Bank',
    date: 'July 2025',
    detail: 'Phishing and BEC email analysis, header inspection, IOC extraction, banking-sector incident classification',
    link: 'https://www.theforage.com/simulations/anz/cybersecurity-management-szf9',
    certFile: '/certs 2026/Forage Certificate.pdf',
    accent: '#0891b2',
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '92vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
        paddingTop: 48,
      }}>
        {/* Left: text */}
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 14px', borderRadius: 20,
            background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)',
            fontSize: '0.68rem', color: '#34d399', marginBottom: 28,
            fontFamily: 'var(--mono)', letterSpacing: '0.04em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'termBlink 1.8s ease infinite' }} />
            AVAILABLE · Warsaw, Poland
          </div>

          <h1 className="shimmer-text" style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
            marginBottom: 8,
          }}>
            Sajan CR
          </h1>

          <div style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            color: 'var(--text2)', lineHeight: 1.5, marginBottom: 20,
            fontFamily: 'var(--mono)', letterSpacing: '0.01em',
          }}>
            <span style={{ color: '#2563eb' }}>GRC & Audit</span>
            <span style={{ color: 'var(--text3)' }}> · </span>
            <span style={{ color: '#0891b2' }}>IAM</span>
            <span style={{ color: 'var(--text3)' }}> · </span>
            <span style={{ color: '#3b5fd8' }}>Detection Engineering</span>
            <span style={{ color: 'var(--text3)' }}> · </span>
            <span style={{ color: '#0d9488' }}>Incident Response</span>
          </div>

          <p style={{
            fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.75,
            marginBottom: 36, maxWidth: 480,
          }}>
            M.Sc. Cybersecurity, Vistula University Warsaw (2026).
            ISO 27701 Lead Auditor. Building regulatory frameworks as executable systems. Not Word documents.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { to: '/grc',      label: 'GRC & Audit', color: '#2563eb', bg: 'rgba(37,99,235,0.1)',  border: 'rgba(37,99,235,0.3)'  },
              { to: '/iam',      label: 'IAM',         color: '#0891b2', bg: 'rgba(8,145,178,0.1)',  border: 'rgba(8,145,178,0.3)'  },
              { to: '/cyber',    label: 'Engineering', color: '#3b5fd8', bg: 'rgba(59,95,216,0.1)',  border: 'rgba(59,95,216,0.3)'  },
              { to: '/writeups', label: 'IR & SOC',    color: '#0d9488', bg: 'rgba(13,148,136,0.1)', border: 'rgba(13,148,136,0.3)' },
            ].map(btn => (
              <Link key={btn.to} to={btn.to} style={{
                padding: '9px 18px', borderRadius: 'var(--radius)',
                background: btn.bg, border: `1px solid ${btn.border}`,
                color: btn.color, fontSize: '0.8rem', fontWeight: 600,
                transition: 'all 0.2s', letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = btn.bg.replace('0.1','0.2'); e.currentTarget.style.boxShadow = `0 0 14px ${btn.color}33` }}
              onMouseLeave={e => { e.currentTarget.style.background = btn.bg; e.currentTarget.style.boxShadow = 'none' }}>
                {btn.label}
              </Link>
            ))}
            <a href="https://github.com/sajancr3" target="_blank" rel="noreferrer" style={{
              padding: '9px 18px', borderRadius: 'var(--radius)',
              border: '1px solid var(--border2)',
              color: 'var(--text2)', fontSize: '0.8rem', fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>
              GitHub
            </a>
          </div>
        </div>

        {/* Right: holographic terminal card */}
        <div className="terminal-float" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.72rem',
            background: '#03050f',
            border: '1px solid rgba(37,99,235,0.35)',
            borderRadius: 10,
            padding: '22px 26px',
            width: '100%',
            maxWidth: 430,
            boxShadow: '0 0 24px rgba(37,99,235,0.18), 0 0 60px rgba(37,99,235,0.08), inset 0 0 30px rgba(37,99,235,0.03)',
            animation: 'neonPulseBlue 3s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* scanline overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(37,99,235,0.015) 2px, rgba(37,99,235,0.015) 4px)',
              borderRadius: 10,
            }} />

            {/* title bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(37,99,235,0.15)' }}>
              {['#f43f5e','#eab308','#22c55e'].map(c => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.75 }} />
              ))}
              <span style={{ color: 'rgba(37,99,235,0.55)', marginLeft: 4, letterSpacing: '0.1em', fontSize: '0.6rem' }}>SAJAN_CR.sys</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'termBlink 1.8s ease infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '0.56rem', color: '#34d399', fontWeight: 700, letterSpacing: '0.1em' }}>ALL SYSTEMS LIVE</span>
              </div>
            </div>

            {/* ── COMPLIANCE section ── */}
            <div style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(37,99,235,0.5)', marginBottom: 10 }}>
              COMPLIANCE LAYER
            </div>
            {[
              { name: 'NIS2 Compliance',   value: '72%',    bar: 72,  barColor: '#22c55e', sub: 'Art. 21 · Bank Cyfrowy S.A.',  valueColor: '#22c55e' },
              { name: 'DORA Audit Engine', value: 'ACTIVE', bar: null,barColor: null,      sub: 'Art. 18 · 3 open findings',    valueColor: '#2563eb' },
              { name: 'IAM Governance',    value: '500',    bar: null,barColor: null,      sub: 'identities · 47 flagged',      valueColor: '#0891b2' },
            ].map(row => (
              <div key={row.name} style={{ marginBottom: 11 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(221,228,240,0.75)', fontWeight: 500 }}>{row.name}</span>
                  <span style={{ fontSize: '0.71rem', color: row.valueColor, fontWeight: 700, marginLeft: 10 }}>{row.value}</span>
                </div>
                {row.bar !== null && (
                  <div style={{ height: 2, background: 'rgba(37,99,235,0.12)', borderRadius: 2, marginBottom: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.bar}%`, background: `linear-gradient(90deg, ${row.barColor}66, ${row.barColor})`, borderRadius: 2, animation: 'barGrow 1.4s ease-out both' }} />
                  </div>
                )}
                <div style={{ fontSize: '0.57rem', color: 'rgba(107,127,168,0.7)', letterSpacing: '0.03em' }}>{row.sub}</div>
              </div>
            ))}

            {/* ── DETECTION section ── */}
            <div style={{ marginTop: 15, paddingTop: 13, borderTop: '1px solid rgba(59,95,216,0.14)' }}>
              <div style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.5)', marginBottom: 10 }}>
                DETECTION LAYER
              </div>
              {[
                { name: 'SentinelForge SOC',    value: 'LIVE',   bar: null, barColor: null,      sub: 'Suricata + MITRE ATT&CK · auto-block active', valueColor: '#34d399', pulse: true },
                { name: 'ControlProbe BAS',      value: '61%',    bar: 61,   barColor: '#eab308', sub: '15 techniques · Wazuh gap: lateral movement',  valueColor: '#eab308' },
                { name: 'DeceptionGrid',         value: '6,500+', bar: null, barColor: null,      sub: 'real attacks captured · STIX 2.1 exported',    valueColor: '#3b5fd8' },
              ].map(row => (
                <div key={row.name} style={{ marginBottom: 11 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(221,228,240,0.75)', fontWeight: 500 }}>{row.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 10 }}>
                      {row.pulse && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', flexShrink: 0, animation: 'termBlink 1.4s ease infinite' }} />}
                      <span style={{ fontSize: '0.71rem', color: row.valueColor, fontWeight: 700 }}>{row.value}</span>
                    </span>
                  </div>
                  {row.bar !== null && (
                    <div style={{ height: 2, background: 'rgba(52,211,153,0.10)', borderRadius: 2, marginBottom: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${row.bar}%`, background: `linear-gradient(90deg, ${row.barColor}66, ${row.barColor})`, borderRadius: 2, animation: 'barGrow 1.4s ease-out both' }} />
                    </div>
                  )}
                  <div style={{ fontSize: '0.57rem', color: 'rgba(107,127,168,0.7)', letterSpacing: '0.03em' }}>{row.sub}</div>
                </div>
              ))}
            </div>

            {/* Alert strip */}
            <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid rgba(37,99,235,0.12)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { badge: 'CRIT', msg: 'Lateral movement: zero Wazuh alerts detected', color: '#f43f5e' },
                { badge: 'WARN', msg: '47 privileged orphan accounts auto-flagged', color: '#eab308' },
                { badge: 'DETC', msg: 'SentinelForge: 3 active threat actors tracked', color: '#34d399' },
                { badge: 'INFO', msg: 'Ed25519 evidence vault sealed and active', color: '#60a5fa' },
              ].map(a => (
                <div key={a.badge} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{
                    fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.06em',
                    padding: '2px 5px', borderRadius: 3,
                    background: `${a.color}18`, color: a.color,
                    border: `1px solid ${a.color}30`, flexShrink: 0, marginTop: 1,
                  }}>{a.badge}</span>
                  <span style={{ fontSize: '0.63rem', color: 'rgba(221,228,240,0.6)', lineHeight: 1.45 }}>{a.msg}</span>
                </div>
              ))}
            </div>

            {/* cursor */}
            <div style={{ marginTop: 12 }}>
              <span style={{ color: 'rgba(37,99,235,0.4)', fontSize: '0.65rem' }}>&gt; </span>
              <span style={{ color: '#2563eb', animation: 'termBlink 1s step-end infinite' }}>█</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 64,
      }}>
        {[
          { value: '7',         label: 'Platforms Built',    color: '#2563eb' },
          { value: '15',        label: 'MITRE Techniques',   color: '#3b5fd8' },
          { value: 'Art.21–24', label: 'NIS2 Coverage',      color: '#2563eb' },
          { value: '6,500+',    label: 'Honeypot Events',    color: '#3b5fd8' },
          { value: '500',       label: 'Identities Governed',color: '#0891b2' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)',
            padding: '20px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, fontFamily: 'var(--mono)', letterSpacing: '-0.02em', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Open to Roles CTA ── */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border2)',
          borderRadius: 12,
          padding: '32px 36px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '3px 11px', borderRadius: 20,
              background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)',
              fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#34d399', marginBottom: 14,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
              Available now · Warsaw, Poland
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Open to entry-level cybersecurity roles
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16, maxWidth: 560 }}>
              Targeting: Junior GRC Analyst, Junior IT Auditor, Junior SOC Analyst, Junior IAM Engineer, Junior Security Consultant.
              Full-time, hybrid or onsite. Legally authorised to work in Poland. Available immediately.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'GRC & IT Audit', color: '#2563eb' },
                { label: 'IAM Engineer', color: '#0891b2' },
                { label: 'SOC / IR Analyst', color: '#0d9488' },
                { label: 'Detection Engineer', color: '#3b5fd8' },
                { label: 'Security Consultant', color: '#2563eb' },
              ].map(r => (
                <span key={r.label} style={{
                  fontSize: '0.7rem', fontWeight: 600, padding: '4px 12px',
                  borderRadius: 20, background: `${r.color}10`,
                  border: `1px solid ${r.color}30`, color: r.color,
                }}>{r.label}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 180 }}>
            <a
              href="mailto:crsajan98@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 20px', borderRadius: 7,
                background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.3)',
                color: 'var(--grc)', fontSize: '0.78rem', fontWeight: 600,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.12)'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              crsajan98@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/sajanchakkumkattuparambilraju"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 20px', borderRadius: 7,
                background: 'var(--surface2)', border: '1px solid var(--border2)',
                color: 'var(--text2)', fontSize: '0.78rem', fontWeight: 600,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4 6v4M4 4.5v.01M7 10V8c0-1 .5-2 1.5-2S10 7 10 8v2M7 6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/sajancr3"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 20px', borderRadius: 7,
                background: 'var(--surface2)', border: '1px solid var(--border2)',
                color: 'var(--text2)', fontSize: '0.78rem', fontWeight: 600,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.686 1 1 3.686 1 7c0 2.654 1.721 4.905 4.108 5.698.3.055.41-.13.41-.29v-1.02c-1.669.363-2.02-.803-2.02-.803-.273-.693-.667-.877-.667-.877-.545-.373.041-.366.041-.366.603.042.92.619.92.619.536.918 1.406.653 1.748.5.054-.389.21-.653.381-.803-1.333-.152-2.733-.667-2.733-2.966 0-.655.234-1.19.618-1.61-.062-.152-.268-.762.059-1.588 0 0 .504-.161 1.65.616A5.745 5.745 0 017 4.836c.51.002 1.022.069 1.5.202 1.145-.777 1.648-.616 1.648-.616.328.826.122 1.436.06 1.588.385.42.617.955.617 1.61 0 2.306-1.403 2.813-2.74 2.96.216.185.408.551.408 1.111v1.646c0 .161.109.348.413.289C11.28 11.904 13 9.653 13 7c0-3.314-2.686-6-6-6z" fill="currentColor"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </section>

      {/* ── Three Tracks ── */}
      <section style={{ paddingBottom: 96 }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
            Specialisations
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Four tracks, one ecosystem
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {TRACKS.map(t => (
            <Link key={t.path} to={t.path}
            className={t.label === 'GRC & Audit' ? 'holo-grc' : t.label === 'IAM' ? 'holo-iam' : t.label === 'IR & SOC' ? 'holo-ir' : 'holo-cyber'}
            style={{
              display: 'block',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '28px 28px 24px',
              transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accent, marginBottom: 12 }}>
                {t.label}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.01em' }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20 }}>
                {t.desc}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {t.items.map(item => (
                  <li key={item} style={{
                    fontSize: '0.75rem', color: 'var(--text2)',
                    padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section style={{ paddingBottom: 96, borderTop: '1px solid var(--border)', paddingTop: 72 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
          Credentials
        </div>
        <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 40 }}>
          Certifications &amp; Training
        </h2>

        {/* Professional certs */}
        <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
          Professional Certifications
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 40 }}>
          {CERTS_PRO.map(c => (
            <div key={c.name} style={{
              padding: '20px 22px',
              background: 'var(--surface)',
              border: `1px solid ${c.accent}28`,
              borderLeft: `3px solid ${c.accent}`,
              borderRadius: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.accent }}>
                  {c.issuer} · {c.year}
                </div>
                <span style={{
                  fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '2px 8px', borderRadius: 10,
                  background: c.status === 'In Progress' ? 'rgba(234,179,8,0.1)' : 'rgba(52,211,153,0.1)',
                  border: c.status === 'In Progress' ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(52,211,153,0.3)',
                  color: c.status === 'In Progress' ? '#eab308' : '#34d399',
                }}>
                  {c.status}
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{c.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', lineHeight: 1.5 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        {/* Forage virtual experience */}
        <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
          Virtual Experience Programs: Forage (Big 4 &amp; Top-Tier Firms)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
          {CERTS_FORAGE.map(c => (
            <div
              key={c.name}
              style={{
                display: 'block',
                padding: '16px 20px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent + '44'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.accent }}>
                  {c.issuer}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.55rem', color: '#34d399', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Verified</span>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginBottom: 8 }}>{c.date}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)', lineHeight: 1.5, marginBottom: 12 }}>{c.detail}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {c.certFile && (
                  <a
                    href={c.certFile}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em',
                      padding: '4px 10px', borderRadius: 4,
                      background: `${c.accent}12`, border: `1px solid ${c.accent}30`,
                      color: c.accent, textDecoration: 'none', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${c.accent}22`}
                    onMouseLeave={e => e.currentTarget.style.background = `${c.accent}12`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 1h4l2 2v6H2V1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                      <path d="M6 1v2h2M3.5 5.5h3M3.5 7h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    View Certificate
                  </a>
                )}
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.05em',
                    padding: '4px 10px', borderRadius: 4,
                    background: 'var(--surface2)', border: '1px solid var(--border2)',
                    color: 'var(--text3)', textDecoration: 'none', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 8l7-7M8 8V1H1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Forage
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Personal Bio ── */}
      <section className="scan-section" style={{ paddingBottom: 96, borderTop: '1px solid var(--border)', paddingTop: 72 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
          Personal Statement
        </div>
        <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 36 }}>
          Who actually is this person
        </h2>
        <div style={{
          background: '#03050f',
          border: '1px solid rgba(37,99,235,0.22)',
          borderRadius: 10,
          padding: '36px 40px',
          maxWidth: 820,
          boxShadow: '0 0 40px rgba(37,99,235,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #2563eb, #0891b2, #3b5fd8, transparent)',
            opacity: 0.6,
          }} />
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#2563eb',
            letterSpacing: '0.08em', marginBottom: 24, opacity: 0.7,
          }}>
            // bio.txt · last updated: June 2026
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: 20 }}>
            I write regulatory frameworks as working software because I find SharePoint folders philosophically unsatisfying.
            My M.Sc. thesis was on quantum-resistant cryptography: either a decade ahead of schedule or exactly on time,
            depending on how seriously your threat model takes NIST PQC migration timelines. My supervisors were impressed.
            The industry has not yet caught up.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: 20 }}>
            Since graduating, I have built: a <span style={{ color: '#2563eb', fontWeight: 600 }}>NIS2 compliance platform</span> (because Poland needed one and nobody had shipped it yet),
            a <span style={{ color: '#2563eb', fontWeight: 600 }}>DORA audit engine</span> with Article 18 classification logic (because KNF does not accept Word documents as evidence),
            a <span style={{ color: '#3b5fd8', fontWeight: 600 }}>breach simulation tool</span> that will tell you precisely which MITRE ATT&CK techniques your EUR 200,000 SIEM is
            blind to (answer: lateral movement and exfiltration, almost certainly), and an
            <span style={{ color: '#0891b2', fontWeight: 600 }}> identity governance platform</span> with an Ed25519-sealed cryptographic evidence vault, because "access certified
            by spreadsheet" is not a sentence I am willing to put in an audit report.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: 28 }}>
            I am currently available for entry-level positions, which is either a remarkable hiring opportunity or a structural
            failure of the Polish graduate market to correctly price domain-specific expertise. I am willing to be persuaded it
            is the former. I work best in environments where "how does this actually work" is considered a legitimate question
            and where compliance is treated as an engineering problem rather than a documentation exercise.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { label: 'NIS2 · Art. 21/23/24', color: '#2563eb' },
              { label: 'DORA · Art. 18/30/31', color: '#2563eb' },
              { label: 'ISO 27701 Lead Auditor', color: '#0891b2' },
              { label: 'IIA 4E Methodology', color: '#2563eb' },
              { label: 'MITRE ATT&CK', color: '#3b5fd8' },
              { label: 'Legally authorised · Poland', color: '#34d399' },
            ].map(tag => (
              <span key={tag.label} style={{
                fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 600,
                padding: '4px 12px', borderRadius: 4,
                background: `${tag.color}0e`, border: `1px solid ${tag.color}30`,
                color: tag.color,
              }}>{tag.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ paddingBottom: 96, borderTop: '1px solid var(--border)', paddingTop: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
              About
            </div>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 20 }}>
              Background
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75, marginBottom: 16 }}>
              M.Sc. Cybersecurity graduate from Vistula University, Warsaw (June 2026). Originally from Kerala, India.
              Legally authorised to work full-time in Poland.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75, marginBottom: 16 }}>
              My thesis focused on quantum-resistant cryptographic systems. My professional focus since has been
              on building practical implementations of regulatory frameworks, specifically DORA, ISO 27701, and
              IIA audit methodology, as working software rather than documentation.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75 }}>
              Previous experience: SOC Analyst Intern at BSH Technologies (Odisha, India, remote), Oct 2025 – Jan 2026.
              Red Team Hacker Academy SOC training programme, 2024–2025.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20 }}>
              Technical Stack
            </div>
            {[
              { label: 'Languages', items: ['Python', 'KQL', 'SQL', 'Bash', 'C/C++', 'JavaScript'] },
              { label: 'Frameworks', items: ['FastAPI', 'Streamlit', 'Flask', 'React', 'Pydantic'] },
              { label: 'Security Tools', items: ['Suricata', 'Wazuh', 'Splunk', 'Microsoft Sentinel', 'Nessus'] },
              { label: 'Identity', items: ['Microsoft Entra ID', 'Graph API', 'MSAL', 'OAuth2', 'RBAC'] },
              { label: 'GRC', items: ['DORA', 'ISO 27701', 'IIA Standards', 'MITRE ATT&CK', 'TIBER-EU'] },
            ].map(group => (
              <div key={group.label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map(item => (
                    <span key={item} style={{
                      fontSize: '0.72rem', padding: '3px 8px', borderRadius: 3,
                      background: 'var(--surface2)', border: '1px solid var(--border2)',
                      color: 'var(--text2)', fontFamily: 'var(--mono)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
