import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const PROJECTS = [
  {
    id: 'trustshield',
    label: 'TrustShield IAM AI',
    accent: '#0891b2',
    track: 'IAM Governance',
    github: 'https://github.com/sajancr3/trustshield-iam-ai',
    screenshots: [
      { file: 'trustshield-web-dashboard.png',       title: 'IAM Governance Dashboard',        desc: 'Live identity governance console running on Debian VM. Identities sourced from Microsoft Entra ID (onmicrosoft.com), MFA audit flags, dormant account detection, department risk heatmap, and top critical identities table with Draft Email and Identity 360 actions. New in v2: Privileged Access sidebar section with SoD Violations and JIT Access pages.' },
      { file: 'trustshield-identities.png',          title: 'Identity Explorer',                desc: 'All identities from Microsoft Entra ID with instant filter chips: Critical, High, Terminated, No MFA, Dormant 90d+. Each row links to the Identity 360 slide panel showing full profile, group memberships, risk findings, and manager notification draft. Live search with / shortcut.' },
      { file: 'trustshield-findings-sailpoint.png',  title: 'SailPoint ISC Findings',           desc: 'Stale entitlement findings aggregated from SailPoint ISC connector. Accounts inactive 95-200 days still holding full access. Severity-tagged finding cards with hover compliance tooltip (DORA, SOX, ISO 27001). One-click Draft Email generates a manager notification pre-filled with identity details and remediation steps.' },
      { file: 'trustshield-findings-oci.png',        title: 'Oracle Cloud IAM Findings',        desc: 'Oracle Cloud IAM findings: Privilege Accumulation (member of OracleCloudAdministrators + SecurityAdmins), Admin Without MFA (full tenancy admin, critical security gap), Unrotated API Keys (120-day-old keys). Multi-source IGA aggregation across SailPoint, OCI, and native pipeline in a single view.' },
      { file: 'trustshield-sod-violations.png',      title: 'SoD Violations — v2 New',          desc: 'New in v2: Segregation of Duties engine page. Total Violations, Critical, High, Medium KPI cards with severity filter chips. Each violation card shows the conflicting role pair, rule ID, conflict description, and remediation instruction. Engine detects Finance-Admins + Domain-Admins, HR-Admins + IT-Admins, and 4 other conflict rules.' },
      { file: 'trustshield-jit-access.png',          title: 'JIT Privileged Access — v2 New',   desc: 'New in v2: Zero Trust Just-in-Time PAM. Total Requests, Active Grants, Pending Review, Expired KPIs with status filter chips (Approved, Pending, Expired, Denied, Revoked). Active grants show remaining time countdown. All grants are time-bound — no standing privileged access. Mirrors CyberArk and BeyondTrust JIT PAM patterns.' },
      { file: 'trustshield-cli-v2.png',              title: 'TrustShield v2.0 CLI',             desc: 'CLI entrypoint (python3 start.py) on Debian ARM64 VM showing full v2.0 architecture: Identity Governance (Analyze, Explorer, Investigate, Find Problems), Privileged Access (SoD Center, JIT Manager), Reporting & AI (PDF governance report, AI advisor, evidence vault), and dual interface launch (Streamlit + Flask).' },
      { file: 'trustshield-cli-sod.png',             title: 'SoD Center + v2 Menu',             desc: 'Full v2.0 main menu alongside the SoD Center sub-menu (Run SoD Scan, View All Violations, View Violation Summary). SoD scan traverses every identity, checks against a 6-rule conflict matrix, and populates the sod_violations table read by the web interface in real time.' },
    ],
  },
  {
    id: 'sentinelforge',
    label: 'SentinelForge SOC Platform',
    accent: '#EF4444',
    track: 'Detection Engineering',
    github: 'https://github.com/sajancr3/sentinelforge-soc-platform',
    screenshots: [
      { file: 'sentinelforge-soc-dashboard-overview.png',        title: 'SOC Dashboard — Live',               desc: '60 alerts ingested, avg risk 74, Brute Force dominant tactic. MITRE ATT&CK breakdown chart and automated response log (BLOCK / ALERT / CORRELATE) all live-updating every 5 seconds.' },
      { file: 'sentinelforge-dashboard-704-alerts-205-live.png', title: '704 Alerts — 205 Live Attacks',       desc: 'Unified alert queue showing CICIDS replay (grey badge) and real-time Parrot OS attacks (red LIVE badge) in a single view. 205 live SSH brute-force events detected from 192.168.64.4.' },
      { file: 'sentinelforge-dashboard-254-live-iptables-block.png', title: 'iptables Auto-Block Triggered',  desc: '754 total alerts, 254 live attacks. Response log shows iptables BLOCK of 192.168.64.4 after threshold failures — detect-to-block loop closed in real time.' },
      { file: 'sentinelforge-parrot-hydra-rockyou-attack.png',   title: 'Parrot OS — Hydra SSH Attack',       desc: 'Attacker side: Hydra running rockyou.txt wordlist against 192.168.64.6 SSH — 14.3 million password attempts queued. Every attempt generates a LIVE alert on the Debian SOC dashboard.' },
      { file: 'sentinelforge-monitor-enrichment-block-sequence.png', title: 'Enrichment + Auto-Block Sequence', desc: 'live_monitor.py startup: AbuseIPDB enrichment enabled, 10-failure threshold set. Shows [ENRICH] query for 192.168.64.4 → 0/100, then [BLOCK] iptables DROP fired automatically.' },
      { file: 'sentinelforge-iptables-drop-autoblock.png',       title: 'iptables DROP in Terminal',          desc: 'Terminal captures the exact moment: [BLOCK 09:40:52] iptables DROP → 192.168.64.4. Live detection stream continues confirming Hydra attempts still being logged post-block.' },
      { file: 'sentinelforge-live-detection-terminal.png',       title: 'Live Detection Stream',              desc: 'live_monitor.py flooding with [LIVE] ALERT: SSH Brute Force - Failed Login from 192.168.64.4 — real-time regex parsing of /var/log/auth.log as Hydra hammers the SSH port.' },
      { file: 'sentinelforge-brute-force-flood-terminal.png',    title: 'HIGH Severity Alert Flood',          desc: '*** HIGH *** SSH Brute Force - Invalid User, Failed Password, Disconnected — all three auth.log patterns firing simultaneously as Hydra runs multi-threaded attack from Parrot OS.' },
      { file: 'sentinelforge-cicids-streamer-6000-events.png',   title: 'CICIDS2017 Replay Streamer',         desc: 'CICIDS streamer loading 6000 events from labeled attack dataset (SSH-Patator, FTP-Patator, PortScan, DDoS) into SQLite at 0.3s/event — visible behind live dashboard in background.' },
    ],
  },
  {
    id: 'dora',
    label: 'DORA ICT Risk Platform',
    accent: '#2563eb',
    track: 'GRC & Audit',
    github: 'https://github.com/sajancr3/dora-ict-risk-platform',
    screenshots: [
      { file: 'dora-executive-overview.png',   title: 'Executive Overview',      desc: 'KNF-aligned 3rd Line of Defense dashboard with active incident alert: Payment Gateway Outage affecting 145,000 clients, EUR 250,000 economic impact, Status: INVESTIGATING. Compliance scorecard, open findings summary, and DORA Art. 18 threshold breach indicator.' },
      { file: 'dora-risk-matrix.png',           title: 'Inherent Risk Matrix',    desc: 'Bubble chart scatter plot mapping ICT assets by likelihood and impact across Critical/High/Medium/Low zones. Assets plotted: Core Banking, Payment Gateway, SIEM, Customer Data Warehouse. Art. 18 domain classification with inherent risk scoring.' },
      { file: 'dora-incident-management.png',   title: 'Incident Management',     desc: 'DORA Chapter III, Articles 17-23 ICT incident page. 1 Major (Art. 19) incident — KNF report required, 145,000 clients affected. Classification Breakdown bar chart and Article 18 Criteria Triggered (critical services unavailable >=2h, payment transactions disrupted, economic impact >=EUR 100K, clients affected >=100K).' },
      { file: 'dora-audit-findings.png',        title: 'Audit Findings (IIA 4E)', desc: 'Filterable audit findings board with severity/status chips and DORA chapter selector. Three open findings: Privileged Access Reviews Overdue by 6 Months (Critical, Art. 9(4)(c)), Backup Recovery Procedures Not Tested for Core Banking System (Critical, Art. 12(1)), AWS Contract Missing DORA-Mandated Provisions (High, Art. 30). Each finding expands to full IIA 4E format.' },
      { file: 'dora-asset-registry.png',        title: 'ICT Asset Registry',      desc: 'Full asset inventory: Core Banking System, Customer Data Warehouse, Payment Gateway, Active Directory, SIEM Platform (Splunk), Employee Portal. Each asset has criticality tier, RTO/RPO targets, and third-party dependency flags. TLPT scope identification aligned to DORA Art. 26.' },
      { file: 'dora-api-swagger.png',           title: 'FastAPI Swagger UI',      desc: '14 REST endpoints for ICT risk management, incident classification, supplier assessment, and reference data. KNF-aligned FastAPI backend powering the DORA Audit Platform frontend.' },
    ],
  },
  {
    id: 'controlprobe',
    label: 'ControlProbe BAS',
    accent: '#3b5fd8',
    track: 'Engineering',
    github: 'https://github.com/sajancr3/controlprobe',
    screenshots: [
      { file: 'controlprobe-coverage-dashboard.png', title: 'Coverage Radar Dashboard',  desc: 'MITRE ATT&CK coverage radar: 61% detection rate across 9 tactics against a live Wazuh SIEM instance.' },
      { file: 'controlprobe-coverage-gaps.png',      title: 'Gap Analysis Report',        desc: 'Undetected techniques: lateral movement (T1021), exfiltration (T1048), credential access (T1003).' },
      { file: 'controlprobe-technique-results.png',  title: 'Per-Technique Results',      desc: 'Alert count, SIEM response latency, detection verdict, and MITRE tactic category per simulation run.' },
      { file: 'controlprobe-technique-table.png',    title: 'Full Technique Table',       desc: '15-technique table with MITRE IDs, Wazuh alert correlation, grade scoring, and remediation notes.' },
    ],
  },
  {
    id: 'deceptiongrid',
    label: 'DeceptionGrid Honeypot',
    accent: '#3b5fd8',
    track: 'Engineering',
    github: 'https://github.com/sajancr3/deception-grid',
    screenshots: [
      { file: 'deceptiongrid-dashboard.png',        title: 'Threat Intelligence Dashboard', desc: 'Live threat intel dashboard: real-time event feed, campaign detection, attacker geo-distribution.' },
      { file: 'deceptiongrid-live-events.png',      title: 'Live Event Stream',              desc: 'SSH brute-force sequence with Hydra tool signature detection and multi-protocol campaign correlation.' },
      { file: 'deceptiongrid-attacker-profiles.png', title: 'Attacker Profiles',             desc: 'AbuseIPDB-enriched attacker profiles with geo-location, ASN data, and sophistication scoring.' },
      { file: 'deceptiongrid-18k-events.png',       title: '6,500+ Events Captured',         desc: 'Real attack capture from SSH/HTTP/FTP honeypots tested against Hydra on Debian ARM64 lab.' },
    ],
  },
  {
    id: 'malware',
    label: 'Malware Analysis: WannaCry',
    accent: '#0d9488',
    track: 'IR & SOC',
    github: null,
    screenshots: [
      { file: 'zoo-virustotal-detection.png',      title: 'Multi-AV Detection',        desc: '71/73 engines flagging WannaCry — vendor verdicts, malware family classification, confidence scores.' },
      { file: 'zoo-virustotal-mitre-map.png',      title: 'MITRE ATT&CK Mapping',      desc: 'Technique mapping: T1486 data encryption, T1210 remote exploitation, T1059 scripting execution.' },
      { file: 'zoo-virustotal-mitre-map2.png',     title: 'Extended MITRE Coverage',   desc: 'Discovery, lateral movement, and C2 TTPs — full kill chain from EternalBlue to ransomware deployment.' },
      { file: 'zoo-virustotal-sandbox.png',        title: 'Dynamic Sandbox Analysis',  desc: 'Dropped files, registry modifications, SMB scanning, and network connection attempts under execution.' },
      { file: 'zoo-virustotal-tactics.png',        title: 'Behavioral Tactics',        desc: 'File system changes, process injection, credential access, and SMBv1 exploitation behavioral profile.' },
      { file: 'zoo-virustotal-activity.png',       title: 'Network Activity Timeline', desc: 'Propagation timeline: SMB sweeps, kill-switch DNS lookup (iuqerfsodp9...), ransom C2 beaconing.' },
      { file: 'zoo-virustotal-details.png',        title: 'Static File Metadata',      desc: 'PE structure: compilation timestamp, imphash, entropy 7.9 (packed), section and import analysis.' },
      { file: 'zoo-virustotal-verdicts.png',       title: 'Cross-Vendor Verdicts',     desc: 'Trojan.Ransom.WannaCrypt, Worm.Win32.WannaCry, Ransom.WCry — 70+ engine classification comparison.' },
      { file: 'zoo-wannacryptor-virustotal.png',   title: 'WannaCryptor Variant',      desc: 'Kill-switch domain IOC analysis and EternalBlue (MS17-010) exploit chain documentation.' },
    ],
  },
]

const TOTAL = PROJECTS.reduce((a, p) => a + p.screenshots.length, 0)

export default function Gallery() {
  const [searchParams] = useSearchParams()
  const [filter, setFilter] = useState(() => {
    const p = searchParams.get('project')
    return p && PROJECTS.find(x => x.id === p) ? p : 'all'
  })
  const [lb, setLb] = useState(null)

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.id === filter)
  const flat = visible.flatMap(p => p.screenshots.map(s => ({ ...s, project: p })))

  const prev = () => setLb(i => Math.max(0, i - 1))
  const next = () => setLb(i => Math.min(flat.length - 1, i + 1))

  useEffect(() => {
    if (lb === null) return
    const h = e => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLb(null)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lb])

  useEffect(() => {
    document.body.style.overflow = lb !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lb])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 120px' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
          Evidence Vault
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Platform Screenshots
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7, maxWidth: 580 }}>
          Live dashboards, detection outputs, and system evidence from production-grade cybersecurity platforms built and tested in real lab environments.
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          {[
            { val: TOTAL,  label: 'Screenshots' },
            { val: PROJECTS.length, label: 'Projects' },
            { val: '4',    label: 'Tracks' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--grc)', fontFamily: 'var(--mono)', letterSpacing: '-0.03em' }}>{s.val}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 52, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
        {[{ id: 'all', label: 'All', count: TOTAL, accent: '#2563eb' }, ...PROJECTS.map(p => ({ id: p.id, label: p.label, count: p.screenshots.length, accent: p.accent }))].map(f => {
          const active = filter === f.id
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em',
              background: active ? f.accent : 'var(--surface)',
              color: active ? '#fff' : 'var(--text2)',
              border: `1px solid ${active ? f.accent : 'var(--border)'}`,
              transition: 'all 0.15s',
            }}>
              {f.label} <span style={{ opacity: 0.65 }}>({f.count})</span>
            </button>
          )
        })}
      </div>

      {/* Project sections */}
      {visible.map(project => (
        <div key={project.id} style={{ marginBottom: 72 }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 3, height: 28, background: project.accent, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{project.label}</div>
              <div style={{ fontSize: '0.62rem', color: project.accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{project.track}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{project.screenshots.length} screens</span>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" style={{
                  fontSize: '0.65rem', fontWeight: 600, color: 'var(--text3)',
                  padding: '4px 10px', borderRadius: 4,
                  border: '1px solid var(--border2)', textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12 }}>
            {project.screenshots.map(s => {
              const flatIdx = flat.findIndex(x => x.file === s.file)
              return (
                <button
                  key={s.file}
                  onClick={() => setLb(flatIdx)}
                  style={{
                    all: 'unset', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8, overflow: 'hidden',
                    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = project.accent + '55'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 0 22px ${project.accent}22, 0 8px 32px rgba(0,0,0,0.3)`
                    const ov = e.currentTarget.querySelector('.gal-overlay')
                    if (ov) ov.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    const ov = e.currentTarget.querySelector('.gal-overlay')
                    if (ov) ov.style.opacity = '0'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--surface2)' }}>
                    <img
                      src={`/screenshots/${s.file}`}
                      alt={s.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div className="gal-overlay" style={{
                      position: 'absolute', inset: 0, opacity: 0,
                      background: `linear-gradient(to top, ${project.accent}dd 0%, transparent 60%)`,
                      transition: 'opacity 0.2s',
                      display: 'flex', alignItems: 'flex-end', padding: '10px 12px',
                      pointerEvents: 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M1.5 6.5h10M8.5 3.5l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>Expand</span>
                      </div>
                    </div>
                    {/* Index badge */}
                    <div style={{
                      position: 'absolute', top: 8, right: 8,
                      background: 'rgba(3,5,15,0.7)', borderRadius: 4,
                      padding: '2px 7px', fontSize: '0.58rem', fontFamily: 'var(--mono)',
                      color: project.accent, fontWeight: 700,
                    }}>
                      {String(project.screenshots.indexOf(s) + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Caption */}
                  <div style={{ padding: '12px 14px 14px', flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', marginBottom: 5, textAlign: 'left' }}>{s.title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text3)', lineHeight: 1.55, textAlign: 'left' }}>{s.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {lb !== null && flat[lb] && (() => {
        const img = flat[lb]
        return (
          <div
            onClick={() => setLb(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(3,5,15,0.97)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 1000, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {/* Top bar */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 3, height: 14, background: img.project.accent, borderRadius: 2 }} />
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: img.project.accent }}>{img.project.label}</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{lb + 1} / {flat.length}</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{img.title}</div>
                </div>
                <button
                  onClick={() => setLb(null)}
                  style={{
                    all: 'unset', cursor: 'pointer',
                    width: 32, height: 32, borderRadius: '50%',
                    border: '1px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text3)', fontSize: '1rem', flexShrink: 0,
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text2)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
                >✕</button>
              </div>

              {/* Image */}
              <img
                src={`/screenshots/${img.file}`}
                alt={img.title}
                style={{
                  width: '100%', borderRadius: 8, display: 'block',
                  border: `1px solid ${img.project.accent}30`,
                  boxShadow: `0 0 60px ${img.project.accent}18`,
                  maxHeight: '62vh', objectFit: 'contain', background: 'var(--surface)',
                }}
              />

              {/* Bottom bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <p style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.65 }}>{img.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {[
                    { label: '← Prev', action: prev, disabled: lb === 0 },
                    { label: 'Next →', action: next, disabled: lb === flat.length - 1 },
                  ].map(btn => (
                    <button key={btn.label} onClick={btn.action} disabled={btn.disabled} style={{
                      all: 'unset',
                      cursor: btn.disabled ? 'default' : 'pointer',
                      padding: '8px 18px', borderRadius: 6,
                      border: `1px solid ${btn.disabled ? 'var(--border)' : 'var(--border2)'}`,
                      color: btn.disabled ? 'var(--text3)' : 'var(--text)',
                      fontSize: '0.78rem', fontWeight: 600,
                      transition: 'background 0.15s',
                      background: btn.disabled ? 'transparent' : 'var(--surface)',
                    }}
                    onMouseEnter={e => { if (!btn.disabled) e.currentTarget.style.background = 'var(--surface2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = btn.disabled ? 'transparent' : 'var(--surface)' }}
                    >{btn.label}</button>
                  ))}
                </div>
              </div>

              {/* Keyboard hint */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                  ← → to navigate · ESC to close · click outside to dismiss
                </span>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
