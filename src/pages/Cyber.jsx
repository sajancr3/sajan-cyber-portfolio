import ProjectCard from '../components/ProjectCard.jsx'
import WriteupCard from '../components/WriteupCard.jsx'
import ResumeDownload from '../components/ResumeDownload.jsx'

const ACCENT = 'var(--cyber)'
const HEX    = '#3b5fd8'

const PROJECTS = [
  {
    title: 'SentinelForge SOC Platform',
    subtitle: 'Flagship — Detection Engineering',
    description: 'Real-time SOC detection and response platform. Ingests Suricata IDS alerts and Linux auth logs, runs a detection engine mapped to MITRE ATT&CK, scores cumulative risk, deduplicates alerts, and executes automated response decisions including iptables auto-block. Lab-tested against real Nmap recon, SSH brute-force, and Suricata alert events. Flask dashboard with live event feed.',
    tags: ['Suricata', 'MITRE ATT&CK', 'Python', 'Flask', 'iptables', 'IDS', 'Detection Engineering', 'SOC'],
    link: 'https://github.com/sajancr3/sentinelforge-soc-platform',
    thumbnail: 'soc',
  },
  {
    title: 'ControlProbe — Breach and Attack Simulation',
    subtitle: 'BAS Platform',
    description: 'Breach and attack simulation platform running 15 real MITRE ATT&CK techniques across 9 tactics. Polls Wazuh SIEM via REST API for alert responses, enriches attacker IPs with AbuseIPDB, produces A-D coverage scoring, gap analysis (which controls fail), historical JSON reports, and a live radar chart dashboard. Commercial equivalent: Cymulate, AttackIQ — costing $50K-$200K/year.',
    tags: ['MITRE ATT&CK', 'Wazuh', 'FastAPI', 'Docker', 'AbuseIPDB', 'BAS', 'Detection Validation', 'Chart.js'],
    link: 'https://github.com/sajancr3/controlprobe',
    screenshot: '/screenshots/controlprobe-coverage-dashboard.png',
    galleryLink: '/gallery?project=controlprobe',
    screenshotCount: 4,
  },
  {
    title: 'DeceptionGrid — Distributed Honeypot Network',
    subtitle: 'Threat Intelligence',
    description: 'Distributed SSH/HTTP/FTP honeypot network running in Docker. Captures real attacks, profiles attackers with AbuseIPDB enrichment, detects multi-protocol campaigns, scores attacker sophistication, and exports STIX 2.1 CTI bundles for MISP/OpenCTI/QRadar integration. Lab-tested: 6,500+ captured events from real Hydra brute-force attacks on Debian ARM64.',
    tags: ['Python', 'Paramiko', 'STIX 2.1', 'Docker', 'AbuseIPDB', 'CTI', 'FastAPI', 'Honeypot', 'SQLite'],
    link: 'https://github.com/sajancr3/deception-grid',
    screenshot: '/screenshots/deceptiongrid-attacker-profiles.png',
    galleryLink: '/gallery?project=deceptiongrid',
    screenshotCount: 4,
  },
  {
    title: 'IP Routing and Policy Enforcement Lab',
    subtitle: 'Network Engineering',
    description: 'API-driven network policy enforcement system built on Linux networking primitives. Spring Boot REST API controls iptables firewall rules inside Linux network namespaces in real time. Supports single and multi-hop (2-router) topologies, ICMP and TCP filtering, and logs every policy action to MySQL for traceability. Validated with tcpdump packet capture.',
    tags: ['Spring Boot', 'Java 17', 'iptables', 'Linux Namespaces', 'MySQL', 'Docker', 'Network Security', 'Swagger'],
    link: 'https://github.com/sajancr3/ip-routing-filter-lab',
    thumbnail: 'network',
  },
  {
    title: 'NVMe Storage Stack Simulator',
    subtitle: 'Systems Engineering — C/C++',
    description: 'Linux NVMe firmware and host-side simulator using POSIX shared memory queues. Implements IDENTIFY, READ, and WRITE NVMe commands with full submission/completion queue semantics. Includes fault injection engine and IOPS/latency benchmarking harness. Demonstrates deep systems-level knowledge relevant to embedded security and hardware security modules.',
    tags: ['C', 'C++', 'NVMe', 'Linux', 'Shared Memory', 'Fault Injection', 'Systems Programming', 'Performance'],
    link: 'https://github.com/sajancr3/nvme-storage-stack-simulator',
    thumbnail: 'storage',
  },
  {
    title: 'Quantum-Resistant Cryptography',
    subtitle: 'M.Sc. Thesis — Vistula University (2026)',
    description: 'Master\'s thesis research on post-quantum cryptographic systems. Implementation and comparative analysis of quantum-resistant algorithms. SHA3-512 and Ed25519 patterns from this research are now used in the TrustShield evidence vault and the DORA platform cryptographic sealing layer.',
    tags: ['Post-Quantum Cryptography', 'SHA3-512', 'Ed25519', 'Python', 'Cryptography', 'M.Sc. Research'],
    link: 'https://github.com/sajancr3',
    thumbnail: 'crypto',
  },
]

const WRITEUPS = [
  {
    title: 'SSH Brute-Force Campaign — DeceptionGrid Capture and Analysis',
    category: 'Threat Investigation',
    difficulty: 'Medium',
    platform: 'DeceptionGrid Lab',
    date: 'May 2026',
    summary: 'Full analysis of a Hydra-based SSH brute-force campaign captured by the DeceptionGrid honeypot on a Debian ARM64 node. 6,500+ events captured over 4 hours. Attacker profiled using AbuseIPDB enrichment, campaign timeline reconstructed, STIX 2.1 CTI bundle produced for OpenCTI ingestion. MITRE ATT&CK technique T1110.001 (Brute Force: Password Guessing).',
    findings: [
      'Attack source: 3 distinct IPs across 2 ASNs — coordinated campaign, not opportunistic scanning',
      'Credential pattern: wordlist-based with common defaults (admin, root, test, pi) — automated Hydra with no credential intelligence',
      'Peak rate: 847 attempts/minute sustained for 22 minutes before rate limiting kicked in',
      'STIX 2.1 bundle: threat-actor, attack-pattern, indicator, observed-data objects exported and ingested into OpenCTI',
      'AbuseIPDB confidence score: 2 of 3 IPs had 95%+ abuse confidence — previously reported for SSH scanning',
    ],
    tools: ['DeceptionGrid', 'Paramiko', 'AbuseIPDB', 'STIX 2.1', 'OpenCTI', 'Hydra (attacker tool)', 'Python'],
  },
  {
    title: 'MITRE ATT&CK Coverage Gap Analysis — Wazuh SIEM Validation',
    category: 'Detection Engineering',
    difficulty: 'Hard',
    platform: 'ControlProbe Lab',
    date: 'Apr 2026',
    summary: 'ControlProbe BAS run against a Wazuh SIEM instance covering 15 techniques across Initial Access, Execution, Persistence, Privilege Escalation, Defence Evasion, Credential Access, Discovery, Lateral Movement, and Exfiltration. Coverage scored at C (61%). Key gap: lateral movement and exfiltration techniques generated zero alerts — Wazuh out-of-box rules insufficient for these tactic categories.',
    findings: [
      'Initial Access and Execution: 90% detection rate — Wazuh default rules cover common techniques well',
      'Privilege Escalation (T1548): detected via PAM logs but alert threshold too high — 3 false-negative incidents',
      'Lateral Movement (T1021.002 — SMB): zero detection — Wazuh has no default SMB lateral movement rules',
      'Exfiltration (T1048): zero detection — data exfiltration via HTTPS to external IP generated no alerts',
      'Overall coverage grade: C (61/100). Recommendation: custom KQL/Sigma rules for lateral movement and exfiltration gaps',
    ],
    tools: ['ControlProbe', 'Wazuh REST API', 'AbuseIPDB', 'MITRE ATT&CK Navigator', 'Python', 'FastAPI'],
  },
  {
    title: 'Nmap Recon Detection — SentinelForge Lab Walkthrough',
    category: 'SOC Analysis',
    difficulty: 'Easy',
    platform: 'SentinelForge Lab',
    date: 'Mar 2026',
    summary: 'End-to-end walkthrough of detecting, correlating, and responding to an Nmap network reconnaissance scan in the SentinelForge SOC lab. Covers how Suricata IDS generates ET SCAN alerts, how SentinelForge ingests and deduplicates them, maps to MITRE ATT&CK T1046 (Network Service Discovery), scores cumulative risk, and triggers an iptables block response.',
    findings: [
      'Suricata rule ET SCAN Nmap Scripting Engine fired 847 times in 3 minutes — all from attacker VM 192.168.1.100',
      'SentinelForge deduplication engine collapsed 847 events into 1 correlated incident with cumulative risk score 72/100',
      'MITRE ATT&CK mapping: T1046 Network Service Discovery, Tactic: Discovery',
      'Automated response triggered at risk threshold 70: iptables DROP rule applied to 192.168.1.100 on all ports',
      'Total time from first packet to auto-block: 4 minutes 12 seconds',
    ],
    tools: ['SentinelForge', 'Suricata IDS', 'iptables', 'Python', 'MITRE ATT&CK', 'Flask'],
  },
]

export default function Cyber() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 96px' }}>

      <div style={{ marginBottom: 64 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
          Cybersecurity
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Detection, Defense & Threat Intelligence
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 580, lineHeight: 1.7 }}>
          SOC engineering, breach and attack simulation, deception technology, MITRE ATT&CK,
          CTI, honeypot networks, quantum-resistant cryptography.
        </p>

        {/* Project chain narrative */}
        <div style={{
          marginTop: 28, padding: '14px 18px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, maxWidth: 680,
        }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            The defensive ecosystem
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'var(--mono)' }}>
            DeceptionGrid (capture attacker TTPs)
            <span style={{ color: 'var(--text3)' }}> → </span>
            ControlProbe (test if controls detect those TTPs)
            <span style={{ color: 'var(--text3)' }}> → </span>
            SentinelForge (detect real attacks in production)
            <span style={{ color: 'var(--text3)' }}> → </span>
            TrustShield (govern identity access)
          </div>
        </div>
      </div>

      <ResumeDownload
        track="Cybersecurity"
        filename="Sajan_Cybersecurity_v3.pdf"
        accent={HEX}
        highlights={[
          'SentinelForge SOC Platform — MITRE ATT&CK',
          'ControlProbe Breach & Attack Simulation',
          'DeceptionGrid Honeypot — STIX 2.1 CTI',
          'Quantum-Resistant Cryptography (M.Sc. Thesis)',
          'Suricata IDS, Wazuh, AbuseIPDB',
        ]}
      />

      <section style={{ marginBottom: 80 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Projects
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} accent={HEX} />)}
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingTop: 56 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            Lab Investigations & Writeups
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>
            Real detections, real lab traffic, real attacker behaviour.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {WRITEUPS.map(w => <WriteupCard key={w.title} {...w} accent={HEX} />)}
        </div>
      </section>

    </div>
  )
}
