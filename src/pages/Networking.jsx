import ProjectCard from '../components/ProjectCard.jsx'

const ACCENT = 'var(--network)'
const HEX    = '#7c5cff'

const PROJECTS = [
  {
    title: 'NetProbe — Protocol Test Automation & Fault Triage',
    subtitle: 'Test Automation Engineering',
    description: 'Robot Framework and Python test automation framework covering TCP, HTTP, and DNS protocol correctness, wired into a GitHub Actions regression suite verified at 9 of 9 tests passing. Fault-injection module wraps Linux tc netem with named degraded-link profiles (light fade, congested edge, severe outage), and an automated triage step bundles logs, traces, and a classified root-cause hypothesis on every failure. Includes a routed 3-container Docker lab (client, router, server).',
    tags: ['Python', 'Robot Framework', 'Linux tc netem', 'Docker Compose', 'GitHub Actions', 'Test Automation', 'Fault Injection'],
    link: 'https://github.com/sajancr3/netprobe',
    thumbnail: 'netprobe',
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
    title: 'telesignal-sctp — Kernel SCTP Multi-Stream Signaling',
    subtitle: 'Telecom Transport Protocol',
    description: 'Real SCTP (RFC 4960) client/server built directly against the Linux kernel SCTP socket API, the transport every 3GPP signaling interface (S1AP, NGAP, M3UA) runs over. Negotiates real multi-stream associations via SCTP_INITMSG, selects outbound streams by hand-packing sctp_sndrcvinfo ancillary data (no pysctp binding was available in the build environment), and verifies stream delivery, heartbeat round trips, and a TLV signaling codec. 10 of 10 Robot Framework tests passing against a live kernel SCTP association.',
    tags: ['Python', 'SCTP (RFC 4960)', 'Robot Framework', 'Kernel Socket API', 'Multi-Streaming', 'GitHub Actions'],
    link: 'https://github.com/sajancr3/telesignal-sctp',
    thumbnail: 'sctp',
  },
  {
    title: 'gtp-tunnel-toolkit — GTP-U Header Codec & Tunnel',
    subtitle: 'Telecom User-Plane Protocol',
    description: 'GTPv1-U (3GPP TS 29.281) header encoder/decoder and UDP tunnel endpoints, the exact encapsulation carrying user-plane IP traffic between eNodeB/gNodeB and SGW/UPF in LTE and 5G. Implements the mandatory header, optional sequence-number field, and extension-header chain parsing directly from the specification, with TEID-based tunnel demultiplexing enforced on decapsulation. 7 of 7 Robot Framework tests passing over a real UDP tunnel on port 2152.',
    tags: ['Python', 'GTP-U (TS 29.281)', 'UDP', 'Robot Framework', 'Protocol Engineering', 'GitHub Actions'],
    link: 'https://github.com/sajancr3/gtp-tunnel-toolkit',
    thumbnail: 'gtpu',
  },
]

export default function Networking() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 96px' }}>

      <div style={{ marginBottom: 64 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
          Networking
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
          Protocol Testing, Policy Enforcement & Fault Injection
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 580, lineHeight: 1.7 }}>
          Test automation and network engineering from the routing layer up through the telecom
          transport and tunneling protocols: TCP/HTTP/DNS correctness, Linux traffic-control fault
          injection, iptables policy enforcement, kernel-level SCTP multi-streaming, GTP-U tunnel
          encapsulation, and CI-driven regression testing throughout.
        </p>

        {/* Project chain narrative */}
        <div style={{
          marginTop: 28, padding: '14px 18px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, maxWidth: 680,
        }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            Routing → transport → tunneling
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'var(--mono)' }}>
            IP Routing Lab (enforce policy at the routing layer)
            <span style={{ color: 'var(--text3)' }}> → </span>
            NetProbe (validate protocol behaviour, inject real-world link faults)
            <span style={{ color: 'var(--text3)' }}> → </span>
            telesignal-sctp (real kernel signaling transport, RFC 4960)
            <span style={{ color: 'var(--text3)' }}> → </span>
            gtp-tunnel-toolkit (real user-plane tunneling, TS 29.281)
          </div>
        </div>
      </div>

      <section>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
          Projects
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} accent={HEX} />)}
        </div>
      </section>

    </div>
  )
}
