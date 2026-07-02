import ProjectCard from '../components/ProjectCard.jsx'
import WriteupCard from '../components/WriteupCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ResumeDownload from '../components/ResumeDownload.jsx'

const ACCENT = 'var(--grc)'
const HEX    = '#2563eb'

const PROJECTS = [
  {
    title: 'NIS2 Compliance Platform',
    subtitle: 'Flagship — NIS2 · KSC (Poland)',
    thumbnail: 'nis2',
    description: 'Full compliance management platform for EU Directive 2022/2555 (NIS2), aligned with the Polish KSC transposition (October 2024). Article 21 weighted maturity scorer across 10 security domains, Article 23 incident significance classifier with 24h/72h/1-month deadline tracking, Article 24 supply chain security assessments, and IIA 4E audit findings. FastAPI backend, premium Streamlit dashboard. Demo entity: Bank Cyfrowy S.A. (essential entity, banking sector). Reporting authority: CERT Polska.',
    tags: ['NIS2', 'KSC', 'FastAPI', 'Streamlit', 'SQLite', 'Pydantic', 'CERT Polska', 'IIA Standards', 'Python'],
    link: 'https://github.com/sajancr3/nis2-compliance-platform',
  },
  {
    title: 'DORA ICT Risk Assessment and Audit Platform',
    subtitle: 'Flagship — GRC',
    description: 'Full 3rd Line of Defense IT audit platform covering all five DORA domains. Article 18 auto-classification, Article 30 contractual compliance checker, Article 31 third-party criticality assessment. FastAPI backend, premium Streamlit dashboard, SQLite with WAL mode. IIA 4E format audit findings. KNF-aligned reporting deadlines.',
    tags: ['DORA', 'FastAPI', 'Streamlit', 'SQLite', 'Pydantic', 'KNF', 'IIA Standards', 'Python'],
    link: 'https://github.com/sajancr3/dora-audit-platform',
    screenshot: '/screenshots/dora-executive-overview.png',
    galleryLink: '/gallery?project=dora',
    screenshotCount: 6,
  },
  {
    title: 'RiskLens GRC',
    subtitle: 'Threat-Informed Risk Management',
    thumbnail: 'risk',
    description: 'Threat-informed GRC platform that converts raw security findings into structured business risk records. Ingests CISA Known Exploited Vulnerabilities, Nikto web assessment findings, Entra ID identity data, and AbuseIPDB threat intelligence. Applies deterministic risk scoring (likelihood, impact, control effectiveness), maps findings to ISO 27001, NIST CSF, and MITRE ATT&CK, and stores governance-ready records in a SQLite risk register.',
    tags: ['GRC', 'CISA KEV', 'AbuseIPDB', 'ISO 27001', 'NIST CSF', 'MITRE ATT&CK', 'Risk Scoring', 'Python', 'SQLite'],
    link: 'https://github.com/sajancr3/RiskLens-GRC',
  },
  {
    title: 'Security Awareness Risk Analytics',
    subtitle: 'Phishing Simulation Analysis',
    thumbnail: 'awareness',
    description: 'Phishing simulation data analysis across a 200-person organisation. Measured click rates (55%), report rates (45%), identified Finance as highest-risk department. Flagged credential harvesting as peak-risk technique. Executive KPI reporting and pivot analysis.',
    tags: ['Phishing Analysis', 'Human Risk', 'GRC', 'KPI Reporting', 'Executive Documentation'],
    link: 'https://github.com/sajancr3/security-awareness-risk-analytics',
  },
]

const WRITEUPS = [
  {
    title: 'DORA Article 18 Incident Classification — Worked Example',
    category: 'GRC Audit Writeup',
    difficulty: 'N/A',
    platform: 'Original Research',
    date: 'Jun 2026',
    summary: 'Step-by-step walkthrough of classifying a real payment gateway outage under DORA Article 18 and the EBA/EIOPA/ESMA Joint RTS on major ICT incident reporting. Demonstrates how each of the nine classification criteria maps to observable incident data, and produces an initial report template per Article 19 for submission to KNF within the 4-hour deadline.',
    findings: [
      'Payment gateway outage affecting 145,000 clients triggered three Article 18 criteria simultaneously: clients >= 100,000, economic impact >= EUR 100,000, and payment transactions disrupted',
      'The 4-hour initial report deadline begins at the moment of major classification, not at detection — a common compliance misunderstanding',
      'Cross-border spread is the single most frequently misapplied criterion: it applies to geographic spread of impact, not the location of the affected entity',
      'EBA RTS Article 2(2) defines "critical services" narrowly — the gateway outage qualified because card transactions are classified as payment services under PSD2',
    ],
    tools: ['DORA Art. 18', 'EBA/EIOPA/ESMA Joint RTS', 'Python (classification logic)', 'SQLite'],
  },
  {
    title: 'Article 30 Contractual Compliance Audit — AWS Master Service Agreement',
    category: 'GRC Audit Writeup',
    difficulty: 'N/A',
    platform: 'Original Research',
    date: 'Jun 2026',
    summary: 'Third-party contractual compliance review of the AWS MSA against all 11 mandatory provisions of DORA Article 30. Identifies three missing provisions, quantifies the regulatory exposure, and produces a remediation recommendation consistent with IIA 4E format.',
    findings: [
      'Missing: audit rights for the competent authority (KNF) — AWS standard MSA does not grant supervisory access',
      'Missing: sub-outsourcing approval requirement — AWS sub-contracts to its own regional infrastructure without explicit financial-entity approval',
      'Missing: DORA compliance clause — the contract predates DORA\'s entry into force and has not been updated',
      'Article 30(3) requires renegotiation within a reasonable period — KNF guidance suggests 6 months from January 2025 for existing contracts',
    ],
    tools: ['DORA Art. 30', 'KNF Supervisory Guidelines', 'Python (checklist engine)'],
  },
  {
    title: 'ISO 27701 PIMS Implementation Gap Analysis — Scope and Control Mapping',
    category: 'GRC Audit Writeup',
    difficulty: 'N/A',
    platform: 'ISO 27701 Study',
    date: 'May 2026',
    summary: 'A structured gap analysis against ISO 27701:2019 controls for a hypothetical financial data processor. Maps PIMS-specific controls (Annex A and B) against GDPR obligations and identifies priority remediation areas. Produced as study material during ISO 27701 Lead Auditor certification preparation.',
    findings: [
      'Privacy information management scope definition (Clause 4.1) is frequently under-documented — most organisations define ISMS scope but fail to separately define the PIMS scope for PII processing activities',
      'Clause 7.2.1 (conditions for collection and processing) requires documented legal bases per processing activity — mapping to GDPR Article 6 and Article 9 for special categories',
      'Third-party PII processor agreements (Clause 6.12) are the most common gap in financial institutions — contract templates rarely include the 10 ISO 27701 required elements',
    ],
    tools: ['ISO 27701:2019', 'ISO 27001:2022', 'GDPR Articles 6, 9, 28', 'Mastermind courseware'],
  },
]

export default function GRC() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 96px' }}>

      {/* Page header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
          GRC & Audit
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Governance, Risk & Compliance
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 580, lineHeight: 1.7 }}>
          3rd Line of Defense IT audit methodology. DORA implementation. ISO 27701 Lead Auditor.
          IIA Global Internal Audit Standards. KNF supervisory alignment.
        </p>
      </div>

      {/* Resume download */}
      <ResumeDownload
        track="GRC & Audit"
        filename="Sajan_GRC_Audit_v3.pdf"
        accent={HEX}
        highlights={[
          'NIS2 Compliance Platform — Art. 21/23/24',
          'DORA ICT Risk Assessment Platform',
          'ISO 27701 Lead Auditor',
          'IIA 4E Audit Methodology — CERT Polska / KNF Aligned',
          '3rd Line of Defense',
        ]}
      />

      {/* Projects */}
      <section style={{ marginBottom: 80 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Projects
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} accent={HEX} />)}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ marginBottom: 80, borderTop: '1px solid var(--border)', paddingTop: 56 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Certifications
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            { name: 'ISO 27701 Lead Auditor', issuer: 'Mastermind', year: '2026', note: 'Privacy Information Management Systems — GDPR aligned', hex: '#2563eb' },
            { name: 'CICSA', issuer: 'Red Team Hacker Academy', year: '2024', note: 'Certified Information and Cybersecurity Analyst', hex: '#0891b2' },
            { name: 'ANZ Cybersecurity Virtual Experience', issuer: 'Forage', year: '2024', note: 'Security awareness, phishing investigation, threat analysis', hex: '#3b5fd8' },
          ].map(c => (
            <div key={c.name} style={{
              padding: '18px 22px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: `3px solid ${c.hex}`, borderRadius: 8, maxWidth: 300,
            }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 6 }}>
                {c.issuer} · {c.year}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{c.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)', lineHeight: 1.5 }}>{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit Writeups */}
      <section style={{ borderTop: '1px solid var(--border)', paddingTop: 56 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            Audit Writeups
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>
            Original research applying DORA and ISO 27701 regulatory text to real audit scenarios.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {WRITEUPS.map(w => <WriteupCard key={w.title} {...w} accent={HEX} />)}
        </div>
      </section>

    </div>
  )
}
