import ProjectCard from '../components/ProjectCard.jsx'
import WriteupCard from '../components/WriteupCard.jsx'
import ResumeDownload from '../components/ResumeDownload.jsx'

const ACCENT = 'var(--iam)'
const HEX    = '#0891b2'

const PROJECTS = [
  {
    title: 'TrustShield IAM AI',
    subtitle: 'Flagship — IAM Governance + Privileged Access',
    thumbnail: 'trustshield',
    description: 'Enterprise-grade Identity Governance and Administration platform with AI-powered decision layer. Full IGA pipeline: identity fabric, quality scoring, risk scoring, access review engine, decision engine, and Ed25519-sealed evidence vault. New in v2: Segregation of Duties (SoD) engine detecting conflicting role pairs (Finance-Admins + Domain-Admins), Just-in-Time Privileged Access Management with auto-revoke (Zero Trust, no standing access), and ISO 27701-aligned PDF governance audit report generator. Streamlit dashboard with SoD and JIT panels. Ollama LLM for natural-language remediation recommendations.',
    tags: ['Python', 'SoD Engine', 'JIT PAM', 'Zero Trust', 'Ollama', 'Ed25519', 'SHA3-512', 'fpdf2', 'ISO 27701', 'Streamlit', 'Docker', 'SQLite'],
    link: 'https://github.com/sajancr3/trustshield-iam-ai',
  },
  {
    title: 'Entra ID Identity Governance Platform',
    subtitle: 'Production-Inspired IGA',
    thumbnail: 'entra',
    description: 'Full production-inspired IGA platform integrating with Microsoft Entra ID via Graph API and MSAL. Identity lifecycle automation: provisioning, bulk CSV onboarding, manager approval workflows, offboarding. Access management: RBAC group assignment, security group management, access revocation. Governance: dormant account detection, orphan account detection, privileged access reviews. Generates audit evidence and Power BI datasets.',
    tags: ['Microsoft Entra ID', 'Graph API', 'MSAL', 'OAuth2', 'Python', 'RBAC', 'JML', 'Pandas'],
    link: 'https://github.com/sajancr3/entra-id-identity-governance-platform',
  },
  {
    title: 'IAM AI Risk Analyzer',
    subtitle: 'AI-Assisted Identity Risk',
    thumbnail: 'iam-risk',
    description: 'AI-powered identity risk analysis engine. Ingests identity datasets, applies risk classification logic, and surfaces access anomalies and governance gaps with AI-assisted prioritisation. Python-based with structured data pipeline and modular source architecture.',
    tags: ['Python', 'IAM', 'AI Risk Scoring', 'Identity Analytics', 'Access Governance'],
    link: 'https://github.com/sajancr3/iam-ai-risk-analyzer',
  },
  {
    title: 'JML Hybrid IAM System',
    subtitle: 'Identity Lifecycle Simulation',
    thumbnail: 'jml',
    description: 'Joiner-Mover-Leaver lifecycle simulation with cross-system access comparison. Compares expected vs actual access rights, detects unauthorized access, identifies missing entitlements, and produces audit-ready evidence reports. Role-Based Access Control validation with Docker Compose deployment.',
    tags: ['Python', 'JML', 'RBAC', 'Access Validation', 'Audit Evidence', 'Docker', 'HTML Dashboard'],
    link: 'https://github.com/sajancr3/jml-hybrid',
  },
]

const WRITEUPS = [
  {
    title: 'Privileged Access Review — 47 Orphaned Accounts in Active Directory',
    category: 'IAM Investigation',
    difficulty: 'N/A',
    platform: 'DORA Platform Demo',
    date: 'Jun 2026',
    summary: 'Root cause analysis and remediation plan for a finding surfaced by the DORA ICT Risk Assessment platform: 47 active privileged accounts in Active Directory could not be matched to current employees. The access review process had been broken for 18 months following an HR system migration. Documents the full IIA 4E audit finding and remediation sequence.',
    findings: [
      'Privileged access review frequency: required annually under DORA Article 9(4)(c), last completed 18 months prior',
      'Root cause: HR-AD integration broke during HRIS migration; manual comparison process was not formally assigned to a new owner',
      '47 unmatched accounts represent potential orphan accounts — access may belong to former employees or departed contractors',
      'Immediate risk: any one of 47 accounts could be used for insider threat or external compromise if credentials were previously shared',
      'Remediation sequence: emergency access review within 14 days, disable all 47 unmatched accounts pending verification, fix HR-AD integration with documented ownership',
    ],
    tools: ['Active Directory', 'PowerShell', 'Python (Entra ID platform)', 'IIA 4E format', 'DORA Art. 9(4)(c)'],
  },
  {
    title: 'Joiners Movers Leavers Lifecycle Automation — Design and Implementation',
    category: 'IAM Writeup',
    difficulty: 'N/A',
    platform: 'TrustShield Platform',
    date: 'May 2026',
    summary: 'Design document and implementation walkthrough for a JML (Joiners, Movers, Leavers) automation pipeline built on the Entra ID Identity Governance Platform. Covers provisioning triggers, approval workflows, access revocation on offboarding, and the evidence trail required for audit purposes under IIA and DORA Article 9.',
    findings: [
      'Joiner provisioning: automated from HR CSV trigger → manager approval → Entra ID account creation → RBAC group assignment → welcome email within 4 hours',
      'Mover workflow: role change in HRIS triggers access delta calculation → removes groups no longer applicable → adds new role groups → generates audit log entry',
      'Leaver offboarding: termination date trigger → immediate account disable → 30-day token revocation → access report for manager sign-off → evidence vault seal',
      'Orphan detection runs daily: cross-references active Entra accounts against HR active employee list — any delta triggers review queue',
    ],
    tools: ['Microsoft Entra ID', 'Graph API', 'MSAL', 'Python', 'Pandas', 'OAuth2'],
  },
]

export default function IAM() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 96px' }}>

      <div style={{ marginBottom: 64 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
          IAM
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Identity & Access Management
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 580, lineHeight: 1.7 }}>
          Microsoft Entra ID, identity lifecycle automation, AI-powered governance, cryptographic audit trails,
          RBAC, JML, orphan account detection, privileged access reviews.
        </p>
      </div>

      <ResumeDownload
        track="IAM"
        filename="Sajan_IAM_v3.pdf"
        accent={HEX}
        highlights={[
          'Microsoft Entra ID & Graph API',
          'TrustShield AI-Powered IGA',
          'Joiner / Mover / Leaver Automation',
          'Ed25519 Cryptographic Evidence Vault',
          'Privileged Access Review & Orphan Detection',
        ]}
      />

      <section style={{ marginBottom: 80 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Projects
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} accent={HEX} />)}
        </div>
      </section>

      {/* IAM concepts reference */}
      <section style={{ marginBottom: 80, borderTop: '1px solid var(--border)', paddingTop: 56 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Capabilities
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { label: 'Identity Lifecycle', items: ['Joiner automation', 'Mover workflows', 'Leaver offboarding', 'Bulk CSV provisioning'] },
            { label: 'Access Governance', items: ['Periodic access reviews', 'Orphan account detection', 'Dormant account flagging', 'Privileged access reviews'] },
            { label: 'Privileged Access', items: ['SoD conflict detection', 'JIT access grants', 'Auto-revoke on expiry', 'Zero Trust no-standing-access'] },
            { label: 'Integration', items: ['Microsoft Graph API', 'MSAL / OAuth2', 'RBAC group management', 'Power BI dataset export'] },
            { label: 'Audit & Evidence', items: ['Ed25519 sealed logs', 'SHA3-512 hashing', 'ISO 27701 PDF reports', 'Tamper-evident audit trail'] },
          ].map(group => (
            <div key={group.label} style={{
              padding: '18px 20px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 8,
            }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>
                {group.label}
              </div>
              {group.items.map(item => (
                <div key={item} style={{ fontSize: '0.78rem', color: 'var(--text2)', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: HEX, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingTop: 56 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            IAM Investigations & Writeups
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>
            Real-world IAM scenario analysis and implementation walkthroughs.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {WRITEUPS.map(w => <WriteupCard key={w.title} {...w} accent={HEX} />)}
        </div>
      </section>

    </div>
  )
}
