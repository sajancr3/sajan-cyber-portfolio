"use client";

import { useMemo, useState } from "react";
import {
  Shield,
  Play,
  RotateCcw,
  Code2,
  Link,
  Mail,
  Activity,
  AlertTriangle,
  Terminal,
  Radar,
  FileText,
  Lock,
  Eye,
  CheckCircle2,
  Route,
  Server,
  HardDrive,
  KeyRound,
  Cpu,
  Network,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const projectTabs = [
  "SentinelForge",
  "IP Routing Lab",
  "Debian Audit",
  "NVMe Simulator",
  "Quantum Crypto",
  "JML IAM",
] as const;


type ProjectTab = (typeof projectTabs)[number];

const recruiterInsights: Record<ProjectTab, {
  roleFit: string;
  problem: string;
  skills: string;
  talkingPoint: string;
}> = {
  "SentinelForge": {
    roleFit: "SOC Analyst / Incident Response / Detection Engineering",
    problem: "Security teams need clear prioritization when raw IDS alerts become noisy or repetitive.",
    skills: "Suricata, EVE JSON parsing, MITRE ATT&CK mapping, cumulative risk scoring, multi-source correlation, incident timeline reconstruction, and downloadable incident reports, dashboarding, response logic.",
    talkingPoint: "I built an end-to-end detection pipeline that turns raw network alerts into analyst-ready decisions."
  },
  "IP Routing Lab": {
    roleFit: "Network Security / Security Engineering / Infrastructure Security",
    problem: "Security analysts need to understand why traffic is allowed, dropped, routed, or segmented.",
    skills: "Linux namespaces, iptables, routing, packet flow analysis, firewall policy testing.",
    talkingPoint: "I can reason through packet paths and explain why traffic is allowed or blocked at each stage."
  },
  "Debian Audit": {
    roleFit: "SOC Analyst / Linux Security / Vulnerability Management",
    problem: "Poor Linux configuration weakens incident readiness and increases attack surface.",
    skills: "Linux hardening, SSH review, firewall checks, permission analysis, update posture, remediation writing.",
    talkingPoint: "I created audit-style checks that connect host configuration to real security risk."
  },
  "NVMe Simulator": {
    roleFit: "Systems Security / Security Engineering / Low-Level Debugging",
    problem: "Security engineers benefit from understanding how low-level systems process commands, queues, and failures.",
    skills: "C/C++ systems thinking, queues, shared-memory concepts, fault-injection reasoning, debugging flow.",
    talkingPoint: "This project shows that I can understand software below the application layer, not only dashboards."
  },
  "Quantum Crypto": {
    roleFit: "Security Research / Cryptography / Secure Systems",
    problem: "Long-term security planning requires understanding how quantum threats affect classical cryptography.",
    skills: "Post-quantum cryptography, RSA/ECC comparison, Kyber/Dilithium research, benchmarking mindset.",
    talkingPoint: "My thesis work connects cryptographic research with practical secure-system implementation planning."
  },
  "JML IAM": {
    roleFit: "IAM Analyst / Access Control / GRC / Identity Governance",
    problem: "Organizations need accurate access reviews to detect excessive access, missing access, and leaver accounts that were not removed.",
    skills: "Joiner-Mover-Leaver lifecycle, RBAC, entitlement review, access validation, audit evidence, compliance documentation.",
    talkingPoint: "I built a JML access review simulation that compares expected role-based access with actual system export data and generates audit-ready findings."
  }
};


const socAlerts = [
  {
    time: "00:01",
    alert: "Nmap SYN Scan Detected",
    source: "192.168.64.4",
    destination: "192.168.64.6",
    attack: "Network Reconnaissance",
    mitre: "T1046 - Network Service Discovery",
    evidence: "Suricata detected repeated SYN packets from the same source toward multiple services.",
    rootCause: "The attacker VM performed reconnaissance against the SOC lab target to identify open ports and services.",
    remediation: "Validate whether the source is authorized. If external and unauthorized, block the IP and review exposed services.",
    risk: 55,
    response: "Monitor",
  },
  {
    time: "00:05",
    alert: "Aggressive Service Enumeration",
    source: "192.168.64.4",
    destination: "192.168.64.6",
    attack: "Service Discovery",
    mitre: "T1046 - Network Service Discovery",
    evidence: "The same source generated service-version probing and aggressive scan behavior.",
    rootCause: "The attacker continued reconnaissance after initial discovery, increasing confidence that this is active probing.",
    remediation: "Escalate for analyst review. Confirm whether scans are approved. Harden or close unnecessary services.",
    risk: 85,
    response: "Investigate",
  },
  {
    time: "00:09",
    alert: "Repeated Reconnaissance Activity",
    source: "192.168.64.4",
    destination: "192.168.64.6",
    attack: "Persistent Recon",
    mitre: "T1595 - Active Scanning",
    evidence: "Multiple scan events from the same host caused cumulative risk to reach critical level.",
    rootCause: "The activity pattern suggests persistent reconnaissance rather than a single accidental probe.",
    remediation: "For external sources, block at firewall. For internal lab/private IPs, keep safeguard enabled and document the incident.",
    risk: 100,
    response: "Safeguard: Internal IP not blocked",
  },
];

const firewallScenarios = [
  {
    label: "ICMP from Client to Server",
    source: "client-ns",
    destination: "server-ns",
    protocol: "ICMP",
    decision: "DROP",
    reason: "Policy blocks ping traffic between namespaces.",
  },
  {
    label: "HTTP API to Spring Boot service",
    source: "client-ns",
    destination: "router-ns:8080",
    protocol: "TCP/8080",
    decision: "ALLOW",
    reason: "Allowed service path through routing policy.",
  },
  {
    label: "Unauthorized TCP probe",
    source: "client-ns",
    destination: "server-ns:22",
    protocol: "TCP/22",
    decision: "DROP",
    reason: "SSH is not part of the allowed lab policy.",
  },
];

const auditControls = [
  { control: "SSH root login disabled", status: "Pass", severity: "High", fix: "PermitRootLogin no" },
  { control: "Firewall enabled", status: "Pass", severity: "High", fix: "ufw enable / iptables policy" },
  { control: "World-writable files reviewed", status: "Warn", severity: "Medium", fix: "Review permissions and remove unnecessary write access" },
  { control: "Package updates checked", status: "Pass", severity: "Medium", fix: "apt update && apt upgrade" },
  { control: "Audit logs enabled", status: "Warn", severity: "Medium", fix: "Enable auditd or journald monitoring" },
];

const nvmeSteps = [
  { step: "Host submits command", detail: "Read/write command enters submission queue.", latency: 10 },
  { step: "Firmware polls queue", detail: "Controller checks shared memory queue.", latency: 22 },
  { step: "Command executed", detail: "SSD image receives simulated block operation.", latency: 45 },
  { step: "Completion posted", detail: "Completion queue updates host side.", latency: 60 },
];

const cryptoComparison = [
  { name: "RSA", security: 55, speed: 45, quantum: 20 },
  { name: "ECC", security: 60, speed: 65, quantum: 25 },
  { name: "Kyber", security: 90, speed: 85, quantum: 92 },
  { name: "Dilithium", security: 88, speed: 75, quantum: 90 },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectTab>("SentinelForge");
  const [recruiterMode, setRecruiterMode] = useState(true);
  const [alerts, setAlerts] = useState<typeof socAlerts>([]);
  const [running, setRunning] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<(typeof socAlerts)[0] | null>(null);
  const [firewallIndex, setFirewallIndex] = useState(0);
  const [simulatedIpType, setSimulatedIpType] = useState<"internal" | "external">("internal");

  const latestRisk = alerts.length ? alerts[alerts.length - 1].risk : 0;
  const selectedFirewall = firewallScenarios[firewallIndex];

  const startSimulation = () => {
    setAlerts([]);
    setSelectedAlert(null);
    setRunning(true);

    socAlerts.forEach((alert, index) => {
      setTimeout(() => {
        setAlerts((prev) => [...prev, alert]);
        setSelectedAlert(alert);
        if (index === socAlerts.length - 1) setRunning(false);
      }, (index + 1) * 1100);
    });
  };

  const resetSimulation = () => {
    setAlerts([]);
    setSelectedAlert(null);
    setRunning(false);
  };

  const responseSimulation = useMemo(() => {
    if (simulatedIpType === "internal") {
      return {
        ip: "192.168.64.4",
        decision: "SAFEGUARD",
        action: "Internal lab IP detected. Blocking skipped safely.",
      };
    }

    return {
      ip: "34.107.221.82",
      decision: "BLOCK",
      action: "External attacker IP would be blocked using firewall response logic.",
    };
  }, [simulatedIpType]);

  const analystSummary = useMemo(() => {
    if (!alerts.length) {
      return "No incident replay has been started yet. Click Start SOC Replay to generate an analyst summary.";
    }

    const last = alerts[alerts.length - 1];

    return `Incident Summary:
A source host (${last.source}) generated repeated reconnaissance activity against ${last.destination}. The detection pipeline correlated multiple alerts, mapped the behavior to ${last.mitre}, and escalated cumulative risk to ${last.risk}/100. The response engine selected: ${last.response}. Analyst recommendation: ${last.remediation}`;
  }, [alerts]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <nav className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold">Sajan Cybersecurity Portfolio</h1>
              <p className="text-sm text-slate-400">Cybersecurity Engineer • SOC Detection • IAM Access Control • Cryptography Systems</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <button
              onClick={() => setRecruiterMode(!recruiterMode)}
              className="rounded-xl border border-cyan-400 px-3 py-1 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
            >
              Recruiter Mode: {recruiterMode ? "ON" : "OFF"}
            </button>

            <a href="https://jml-hybrid-o660.onrender.com/dashboard" className="flex items-center gap-1 hover:text-cyan-400">
              <Code2 size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/sajanchakkumkattuparambilraju" className="flex items-center gap-1 hover:text-cyan-400">
              <Link size={16} /> LinkedIn
            </a>
            <a href="mailto:crsajan98@gmail.com" className="flex items-center gap-1 hover:text-cyan-400">
              <Mail size={16} /> Contact
            </a>
          </div>
        </nav>

        <header className="grid gap-8 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Interactive Cybersecurity Portfolio
            </p>

            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              Recruiters can explore my projects like live engineering demos.
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              This portfolio turns my cybersecurity projects into safe interactive case studies:
              SOC incident replay, firewall policy decisions, Linux audit checks, storage queue flow,
              and post-quantum crypto comparison.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
              <strong className="text-cyan-300">Professional Profile:</strong> Final-semester master's student in Poland focused on SOC operations, incident response, detection engineering, and secure systems. Work eligibility documentation can be provided during HR verification.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2 text-cyan-400">
              <Activity size={20} />
              <span className="font-semibold">Portfolio Signal</span>
            </div>

            <div className="text-6xl font-bold">6</div>
            <p className="mt-2 text-slate-400">interactive cybersecurity project demos</p>

            <div className="mt-6 grid gap-3">
              <MiniMetric label="SOC Detection" value="Risk Replay" />
              <MiniMetric label="Network Security" value="Firewall Decisions" />
              <MiniMetric label="Systems Security" value="Audit + Storage" />
              <MiniMetric label="Research" value="Quantum-Safe Crypto" />
            </div>
          </div>
        </header>

        <section className="mb-10 grid gap-3 md:grid-cols-5">
          {projectTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveProject(tab)}
              className={`rounded-2xl border px-4 py-4 text-left font-semibold transition ${
                activeProject === tab
                  ? "border-cyan-400 bg-cyan-500 text-slate-950"
                  : "border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        {recruiterMode && (
          <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Recruiter Mode
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  Why {activeProject} matters professionally
                </h3>
              </div>
              <p className="max-w-xl text-sm text-slate-400">
                This view translates the technical project into role fit, business problem, skills proven, and interview talking point.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
              <RecruiterCard
                title="Role Fit"
                text={recruiterInsights[activeProject].roleFit}
              />
              <RecruiterCard
                title="Problem Solved"
                text={recruiterInsights[activeProject].problem}
              />
              <RecruiterCard
                title="Skills Proven"
                text={recruiterInsights[activeProject].skills}
              />
              <RecruiterCard
                title="Interview Talking Point"
                text={recruiterInsights[activeProject].talkingPoint}
              />
            </div>
          </section>
        )}

        {activeProject === "SentinelForge" && (
          <SentinelForgeDemo
            alerts={alerts}
            running={running}
            selectedAlert={selectedAlert}
            latestRisk={latestRisk}
            startSimulation={startSimulation}
            resetSimulation={resetSimulation}
            setSelectedAlert={setSelectedAlert}
            responseSimulation={responseSimulation}
            simulatedIpType={simulatedIpType}
            setSimulatedIpType={setSimulatedIpType}
            analystSummary={analystSummary}
          />
        )}

        {activeProject === "IP Routing Lab" && (
          <IpRoutingDemo
            selectedFirewall={selectedFirewall}
            firewallIndex={firewallIndex}
            setFirewallIndex={setFirewallIndex}
          />
        )}

        {activeProject === "Debian Audit" && <DebianAuditDemo />}

        {activeProject === "NVMe Simulator" && <NvmeDemo />}

        {activeProject === "Quantum Crypto" && <QuantumCryptoDemo />}

        {activeProject === "JML IAM" && <JMLDemo />}

        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 flex items-center gap-2 text-cyan-400">
            <CheckCircle2 />
            <h3 className="text-2xl font-bold text-white">Why this portfolio is safe</h3>
          </div>
          <p className="text-slate-300">
            These public demos use simulated data only. They do not scan, attack, expose a backend,
            or run security tools in the browser. The real labs run separately inside controlled Debian,
            Ubuntu, and local development environments.
          </p>
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-500">
          Built by Sajan — cybersecurity portfolio focused on SOC, IR, detection engineering, Linux systems, and secure infrastructure.
        </footer>
      </section>
    </main>
  );
}

function SentinelForgeDemo({
  alerts,
  running,
  selectedAlert,
  latestRisk,
  startSimulation,
  resetSimulation,
  setSelectedAlert,
  responseSimulation,
  simulatedIpType,
  setSimulatedIpType,
  analystSummary,
}: {
  alerts: typeof socAlerts;
  running: boolean;
  selectedAlert: (typeof socAlerts)[0] | null;
  latestRisk: number;
  startSimulation: () => void;
  resetSimulation: () => void;
  setSelectedAlert: (alert: (typeof socAlerts)[0]) => void;
  responseSimulation: { ip: string; decision: string; action: string };
  simulatedIpType: "internal" | "external";
  setSimulatedIpType: (type: "internal" | "external") => void;
  analystSummary: string;
}) {
  return (
    <>
      <ProjectHero
        icon={<Shield />}
        title="SentinelForge SOC Platform"
        subtitle="Real-time SOC detection pipeline with Suricata, Python, risk scoring, multi-source correlation, incident timeline reconstruction, and downloadable incident reports, MITRE mapping, dashboards, and safe response logic."
        link="https://github.com/sajancr3/sentinelforge-soc-platform"
      />

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-5 text-2xl font-bold">SentinelForge V2 SOC Upgrades</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Real-time auth.log failed-login detection",
            "Suricata EVE JSON IDS alert ingestion",
            "Multi-source correlation by source IP",
            "Risk scoring with CRITICAL/HIGH/MEDIUM logic",
            "MITRE ATT&CK mapping",
            "Incident timeline reconstruction",
            "Downloadable incident reports",
            "Streamlit SOC dashboard with correlated incident view",
          ].map((feature) => (
            <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
              ✅ {feature}
            </div>
          ))}
        </div>
      </section>

      <ProjectStory
        happened="An attacker VM generated reconnaissance activity against a monitored Debian SOC lab."
        detected="Suricata IDS telemetry and Linux authentication logs were parsed by a Python detection engine and escalated with cumulative risk scoring, multi-source correlation, incident timeline reconstruction, and downloadable incident reports."
        matters="This shows alert correlation, MITRE mapping, response decisions, and analyst-style investigation logic."
        did="I built the pipeline, dashboards, risk engine, safe response logic, and GitHub documentation."
      />

      <section className="grid gap-5 md:grid-cols-4">
        <Card icon={<Radar />} title="Detection" text="Suricata-style alerts replayed as a safe SOC stream." />
        <Card icon={<AlertTriangle />} title="Risk Scoring" text="Cumulative scoring escalates repeated behavior." />
        <Card icon={<Terminal />} title="Response" text="Monitor, investigate, safeguard, and block decisions." />
        <Card icon={<Shield />} title="MITRE Mapping" text="Mapped to ATT&CK techniques for analyst context." />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center gap-2 text-cyan-400">
            <Activity size={20} />
            <span className="font-semibold">Live Risk Score</span>
          </div>

          <div className="text-7xl font-bold">{latestRisk}</div>
          <p className="mt-2 text-slate-400">
            {latestRisk >= 85 ? "Critical threshold reached" : latestRisk >= 55 ? "High-risk behavior detected" : "Waiting for simulation"}
          </p>

          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alerts}>
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="#22d3ee" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={startSimulation} disabled={running} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60">
              <Play size={18} /> Start SOC Replay
            </button>
            <button onClick={resetSimulation} className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:border-cyan-400">
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center gap-2 text-cyan-400">
            <Eye size={20} />
            <h3 className="text-xl font-bold">Alert Detail</h3>
          </div>

          {!selectedAlert ? (
            <p className="text-sm text-slate-400">Click an alert after starting replay to inspect evidence, root cause, and remediation.</p>
          ) : (
            <div className="space-y-4 text-sm">
              <Detail label="Alert" value={selectedAlert.alert} />
              <Detail label="Evidence" value={selectedAlert.evidence} />
              <Detail label="Root Cause" value={selectedAlert.rootCause} />
              <Detail label="MITRE" value={selectedAlert.mitre} />
              <Detail label="Remediation" value={selectedAlert.remediation} />
            </div>
          )}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-5 text-2xl font-bold">Interactive Alert Queue</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-300">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Alert</th>
                <th className="p-4">Source</th>
                <th className="p-4">MITRE</th>
                <th className="p-4">Risk</th>
                <th className="p-4">Response</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">Click Start SOC Replay to simulate the incident.</td>
                </tr>
              ) : (
                alerts.map((a, i) => (
                  <tr key={i} onClick={() => setSelectedAlert(a)} className="cursor-pointer border-t border-slate-800 hover:bg-slate-800/60">
                    <td className="p-4 text-slate-400">{a.time}</td>
                    <td className="p-4 font-semibold">{a.alert}</td>
                    <td className="p-4">{a.source}</td>
                    <td className="p-4 text-cyan-400">{a.mitre}</td>
                    <td className="p-4 font-bold">{a.risk}/100</td>
                    <td className="p-4 text-slate-300">{a.response}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Lock className="text-cyan-400" />
            <h3 className="text-2xl font-bold">Response Decision Simulator</h3>
          </div>

          <div className="mb-5 flex gap-3">
            <button onClick={() => setSimulatedIpType("internal")} className={`rounded-xl px-4 py-2 font-semibold ${simulatedIpType === "internal" ? "bg-cyan-500 text-slate-950" : "border border-slate-700"}`}>
              Internal IP
            </button>
            <button onClick={() => setSimulatedIpType("external")} className={`rounded-xl px-4 py-2 font-semibold ${simulatedIpType === "external" ? "bg-cyan-500 text-slate-950" : "border border-slate-700"}`}>
              External IP
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Source IP</p>
            <p className="text-lg font-bold">{responseSimulation.ip}</p>
            <p className="mt-4 text-sm text-slate-400">Decision</p>
            <p className="text-lg font-bold text-cyan-400">{responseSimulation.decision}</p>
            <p className="mt-4 text-sm text-slate-400">Action</p>
            <p>{responseSimulation.action}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="text-cyan-400" />
            <h3 className="text-2xl font-bold">Generated Analyst Summary</h3>
          </div>
          <pre className="whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-300">{analystSummary}</pre>
        </div>
      </section>
    </>
  );
}

function IpRoutingDemo({
  selectedFirewall,
  firewallIndex,
  setFirewallIndex,
}: {
  selectedFirewall: (typeof firewallScenarios)[0];
  firewallIndex: number;
  setFirewallIndex: (index: number) => void;
}) {
  return (
    <>
      <ProjectHero
        icon={<Route />}
        title="IP Routing & Firewall Lab"
        subtitle="A Linux namespace lab that demonstrates routing paths, firewall policies, and packet filtering decisions."
        link="https://github.com/sajancr3/ip-routing-filter-lab"
      />

      <ProjectStory
        happened="Traffic moved between Linux namespaces through simulated routers and firewall rules."
        detected="Allowed and denied flows were evaluated using protocol, port, and policy logic."
        matters="This proves I understand packet flow, segmentation, iptables, and network troubleshooting."
        did="I built the namespace topology, routing rules, firewall policies, and test scenarios."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Packet Flow Simulator</h3>

          <div className="grid grid-cols-3 items-center gap-4 text-center">
            <Node title={selectedFirewall.source} icon={<Cpu />} />
            <div className="text-cyan-400">
              <Network className="mx-auto mb-2" />
              <p className="text-sm">{selectedFirewall.protocol}</p>
              <p className={`mt-2 rounded-xl px-3 py-2 font-bold ${selectedFirewall.decision === "ALLOW" ? "bg-green-500 text-slate-950" : "bg-red-500 text-white"}`}>
                {selectedFirewall.decision}
              </p>
            </div>
            <Node title={selectedFirewall.destination} icon={<Server />} />
          </div>

          <p className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-300">
            {selectedFirewall.reason}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Test Scenarios</h3>
          <div className="space-y-3">
            {firewallScenarios.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setFirewallIndex(i)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  firewallIndex === i ? "border-cyan-400 bg-slate-800" : "border-slate-800 bg-slate-950 hover:border-cyan-400"
                }`}
              >
                <p className="font-bold">{s.label}</p>
                <p className="text-sm text-slate-400">{s.protocol} • {s.decision}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DebianAuditDemo() {
  const passCount = auditControls.filter((c) => c.status === "Pass").length;
  const warnCount = auditControls.filter((c) => c.status === "Warn").length;

  return (
    <>
      <ProjectHero
        icon={<Terminal />}
        title="Debian Audit & Linux Security Hardening"
        subtitle="A Linux security checklist focused on host visibility, system posture, and remediation guidance."
        link="https://github.com/sajancr3/debian-audit"
      />

      <ProjectStory
        happened="A Debian system was reviewed for common security posture weaknesses."
        detected="Controls such as SSH hardening, firewall status, updates, permissions, and logging were checked."
        matters="This connects Linux administration with incident readiness and host hardening."
        did="I created audit-style checks, pass/warn outputs, and remediation guidance."
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <MetricCard label="Passed Controls" value={passCount.toString()} />
        <MetricCard label="Warnings" value={warnCount.toString()} />
        <MetricCard label="Focus" value="Linux Hardening" />
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-5 text-2xl font-bold">Audit Control Results</h3>
        <div className="space-y-3">
          {auditControls.map((c) => (
            <div key={c.control} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">{c.control}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${c.status === "Pass" ? "bg-green-500 text-slate-950" : "bg-yellow-400 text-slate-950"}`}>
                  {c.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Severity: {c.severity}</p>
              <p className="mt-1 text-sm text-cyan-300">Remediation: {c.fix}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function NvmeDemo() {
  return (
    <>
      <ProjectHero
        icon={<HardDrive />}
        title="NVMe Storage Stack Simulator"
        subtitle="A systems-level simulator showing host-to-firmware queue flow, shared memory behavior, and fault-injection thinking."
        link="https://github.com/sajancr3/nvme-storage-stack-simulator"
      />

      <ProjectStory
        happened="A host submitted simulated storage commands through a queue-based NVMe-like workflow."
        detected="The demo shows command submission, firmware polling, execution, and completion behavior."
        matters="This proves systems-level thinking, debugging ability, and understanding of low-level software flow."
        did="I implemented queue simulation, shared-memory concepts, and fault-injection style reasoning."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Command Queue Flow</h3>
          <div className="space-y-4">
            {nvmeSteps.map((s, index) => (
              <div key={s.step} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-cyan-400">Step {index + 1}</p>
                <p className="font-bold">{s.step}</p>
                <p className="text-sm text-slate-400">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Latency Simulation</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={nvmeSteps}>
                <XAxis dataKey="step" stroke="#94a3b8" hide />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#22d3ee" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}


function QuantumCryptoDemo() {
  const [threatModel, setThreatModel] = useState<"classical" | "quantum" | "hybrid">("hybrid");
  const [selectedAlgo, setSelectedAlgo] = useState("Kyber");

  const threatModels = {
    classical: {
      title: "Classical Attacker",
      risk: "Moderate",
      summary: "RSA and ECC remain widely used against classical attackers, but migration planning is still needed for long-term systems.",
    },
    quantum: {
      title: "Quantum Attacker",
      risk: "Critical",
      summary: "Large-scale quantum computers could threaten RSA and ECC using Shor's algorithm, making post-quantum alternatives necessary.",
    },
    hybrid: {
      title: "Hybrid Migration Risk",
      risk: "High",
      summary: "A safe migration strategy combines classical cryptography with post-quantum algorithms during transition periods.",
    },
  };

  const algorithms = [
    {
      name: "RSA",
      purpose: "Encryption / Signatures",
      quantumResistance: "Low",
      speed: 45,
      security: 55,
      useCase: "Legacy systems and certificates",
      weakness: "Vulnerable to future quantum attacks",
    },
    {
      name: "ECC",
      purpose: "Key exchange / Signatures",
      quantumResistance: "Low",
      speed: 65,
      security: 60,
      useCase: "Modern TLS, mobile, constrained systems",
      weakness: "Also vulnerable to Shor's algorithm",
    },
    {
      name: "Kyber",
      purpose: "Post-quantum key encapsulation",
      quantumResistance: "High",
      speed: 85,
      security: 90,
      useCase: "Quantum-resistant key exchange",
      weakness: "Requires migration and compatibility planning",
    },
    {
      name: "Dilithium",
      purpose: "Post-quantum digital signatures",
      quantumResistance: "High",
      speed: 75,
      security: 88,
      useCase: "Quantum-resistant authentication",
      weakness: "Larger signatures than classical schemes",
    },
    {
      name: "Hybrid TLS",
      purpose: "Classical + PQC migration design",
      quantumResistance: "Very High",
      speed: 70,
      security: 95,
      useCase: "Migration-safe secure communication",
      weakness: "More complex handshake and implementation",
    },
  ];

  const selected = algorithms.find((a) => a.name === selectedAlgo) || algorithms[2];

  const benchmarkData = [
    { operation: "KeyGen", score: selected.speed },
    { operation: "Encrypt/KEM", score: selected.name === "Dilithium" ? 20 : selected.speed - 5 },
    { operation: "Sign", score: selected.name === "Kyber" ? 15 : selected.speed },
    { operation: "Verify/Decap", score: selected.speed - 10 },
    { operation: "Security", score: selected.security },
  ];

  const thesisSummary = `Thesis Summary:
This project designs and evaluates a quantum-resistant cryptography computer system. It compares classical cryptography such as RSA and ECC with post-quantum candidates such as Kyber and Dilithium. The selected threat model is "${threatModels[threatModel].title}", where the assessed risk is ${threatModels[threatModel].risk}. The recommended direction is a hybrid migration model that keeps compatibility with existing systems while introducing post-quantum protection for future security.`;

  return (
    <>
      <ProjectHero
        icon={<KeyRound />}
        title="Quantum-Resistant Cryptography Computer System"
        subtitle="Interactive post-quantum migration lab based on my master's thesis: RSA/ECC vs Kyber/Dilithium, hybrid design, threat modeling, and benchmark planning."
        link="https://jml-hybrid-o660.onrender.com/dashboard"
      />

      <ProjectStory
        happened="Classical cryptographic systems face long-term risk from future quantum computers."
        detected="RSA and ECC were compared against post-quantum candidates such as Kyber and Dilithium."
        matters="This shows secure-system research ability, cryptography understanding, and future-focused security engineering."
        did="I structured the thesis around threat modeling, benchmarking, hybrid migration, and implementation planning on Linux."
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:col-span-1">
          <h3 className="mb-5 text-2xl font-bold">Threat Model Selector</h3>

          <div className="space-y-3">
            {Object.entries(threatModels).map(([key, model]) => (
              <button
                key={key}
                onClick={() => setThreatModel(key as "classical" | "quantum" | "hybrid")}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  threatModel === key
                    ? "border-cyan-400 bg-cyan-500 text-slate-950"
                    : "border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-400"
                }`}
              >
                <p className="font-bold">{model.title}</p>
                <p className="text-sm">Risk: {model.risk}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <h3 className="mb-3 text-2xl font-bold">{threatModels[threatModel].title}</h3>
          <p className="text-slate-300">{threatModels[threatModel].summary}</p>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Recommended Security Direction
            </p>
            <p className="mt-3 text-slate-300">
              Use a hybrid migration approach: keep classical compatibility while introducing PQC-based
              key exchange and signatures where suitable.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-5 text-2xl font-bold">Algorithm Comparison</h3>

        <div className="grid gap-4 md:grid-cols-5">
          {algorithms.map((algo) => (
            <button
              key={algo.name}
              onClick={() => setSelectedAlgo(algo.name)}
              className={`rounded-2xl border p-4 text-left transition ${
                selectedAlgo === algo.name
                  ? "border-cyan-400 bg-slate-800"
                  : "border-slate-800 bg-slate-950 hover:border-cyan-400"
              }`}
            >
              <p className="font-bold text-cyan-300">{algo.name}</p>
              <p className="mt-2 text-xs text-slate-400">{algo.purpose}</p>
              <p className="mt-3 text-sm">Quantum Resistance: {algo.quantumResistance}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h4 className="text-xl font-bold">{selected.name}</h4>
            <p className="mt-3 text-sm text-slate-300"><strong>Purpose:</strong> {selected.purpose}</p>
            <p className="mt-2 text-sm text-slate-300"><strong>Use Case:</strong> {selected.useCase}</p>
            <p className="mt-2 text-sm text-slate-300"><strong>Weakness:</strong> {selected.weakness}</p>
          </div>

          <div className="h-72 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <XAxis dataKey="operation" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="score" fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Proposed System Architecture</h3>

          <div className="space-y-3">
            <ArchitectureStep number="1" title="Client Request" text="A client initiates a secure communication session." />
            <ArchitectureStep number="2" title="Hybrid Key Exchange" text="Classical key exchange is combined with PQC KEM such as Kyber." />
            <ArchitectureStep number="3" title="Signature Verification" text="Authentication can be validated with PQC signatures such as Dilithium." />
            <ArchitectureStep number="4" title="Encrypted Session" text="A session key is derived and used for protected communication." />
            <ArchitectureStep number="5" title="Security Report" text="Performance and security results are compared against classical baselines." />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Migration Roadmap</h3>

          <div className="space-y-4">
            <InfoBlock title="Phase 1: Classical Baseline" text="Benchmark RSA and ECC to establish current performance and security assumptions." />
            <InfoBlock title="Phase 2: PQC Benchmark" text="Test Kyber and Dilithium operations including key generation, encapsulation, signing, and verification." />
            <InfoBlock title="Phase 3: Hybrid Model" text="Combine classical and PQC methods to reduce migration risk." />
            <InfoBlock title="Phase 4: Evaluation" text="Compare speed, key sizes, signature sizes, compatibility, and security benefits." />
            <InfoBlock title="Phase 5: Recommendation" text="Define practical deployment guidance for quantum-resistant migration." />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="text-cyan-400" />
          <h3 className="text-2xl font-bold">Generated Thesis Summary</h3>
        </div>

        <pre className="whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-300">
          {thesisSummary}
        </pre>
      </section>
    </>
  );
}

function ArchitectureStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
          {number}
        </div>
        <div>
          <p className="font-bold text-cyan-300">{title}</p>
          <p className="mt-1 text-sm text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectHero({ icon, title, subtitle, link }: { icon: React.ReactNode; title: string; subtitle: string; link: string }) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <div className="text-cyan-400">{icon}</div>
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-2 max-w-3xl text-slate-300">{subtitle}</p>
          </div>
        </div>
        <a href={link} className="rounded-xl border border-cyan-400 px-4 py-2 text-sm font-bold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950">
          View GitHub
        </a>
      </div>
    </section>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 text-cyan-400">{icon}</div>
      <h4 className="font-bold">{title}</h4>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 text-slate-200">{value}</p>
    </div>
  );
}

function Node({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="mb-2 flex justify-center text-cyan-400">{icon}</div>
      <p className="font-bold">{title}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="font-bold text-cyan-300">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-cyan-300">{value}</p>
    </div>
  );
}


function RecruiterCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}

function ProjectStory({
  happened,
  detected,
  matters,
  did,
}: {
  happened: string;
  detected: string;
  matters: string;
  did: string;
}) {
  return (
    <section className="mb-8 grid gap-4 md:grid-cols-4">
      <StoryBlock title="What Happened" text={happened} />
      <StoryBlock title="What I Detected" text={detected} />
      <StoryBlock title="Why It Matters" text={matters} />
      <StoryBlock title="What I Built" text={did} />
    </section>
  );
}

function StoryBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm font-bold text-cyan-300">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function JMLDemo() {
  const [selectedUser, setSelectedUser] = useState(0);

  const users = [
    {
      name: "John Kowalski",
      role: "Finance Analyst",
      status: "Mover",
      systemAccess: ["SAP", "Email", "Finance_DB"],
      expectedAccess: ["SAP", "Email"],
    },
    {
      name: "Anna Nowak",
      role: "HR Manager",
      status: "Joiner",
      systemAccess: ["HR_System", "Email", "Payroll"],
      expectedAccess: ["HR_System", "Email", "Payroll"],
    },
    {
      name: "Mike Smith",
      role: "Former Employee",
      status: "Leaver",
      systemAccess: ["VPN", "Email"],
      expectedAccess: [],
    },
  ];

  const user = users[selectedUser];

  const unauthorizedAccess = user.systemAccess.filter(
    (access) => !user.expectedAccess.includes(access)
  );

  const missingAccess = user.expectedAccess.filter(
    (access) => !user.systemAccess.includes(access)
  );

  const exportAuditReport = () => {
    const report = `JML IAM ACCESS REVIEW REPORT
================================

User: ${user.name}
Role: ${user.role}
Lifecycle Status: ${user.status}

System Export Data:
${user.systemAccess.length ? user.systemAccess.map((a) => "- " + a).join("\n") : "- No active access"}

Role-Based Expected Access:
${user.expectedAccess.length ? user.expectedAccess.map((a) => "- " + a).join("\n") : "- No access expected"}

Unauthorized Entitlements:
${unauthorizedAccess.length ? unauthorizedAccess.map((a) => "- " + a).join("\n") : "- None"}

Missing Entitlements:
${missingAccess.length ? missingAccess.map((a) => "- " + a).join("\n") : "- None"}

Audit Decision:
Access review compared system export data against role-based expected access.

Recommended Action:
Update access according to RBAC policy, document remediation, and retain this evidence for IAM audit review.

Generated by:
Sajan Cybersecurity Portfolio - JML IAM Access Review Lab
`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.name.replaceAll(" ", "_")}_JML_Audit_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <ProjectHero
        icon={<Shield />}
        title="JML IAM Access Review & Audit Lab"
        subtitle="Identity lifecycle simulation (Joiner-Mover-Leaver) demonstrating access validation, entitlement review, RBAC comparison, and audit evidence generation aligned with enterprise IAM workflows."
        link="https://jml-hybrid-o660.onrender.com/dashboard"
      />

      <ProjectStory
        happened="User access rights changed when employees joined, moved roles, or left the organization."
        detected="The review compared actual system export data against expected role-based access."
        matters="Incorrect access can create excessive privileges, audit findings, and compliance risk."
        did="I built an IAM workflow that identifies unauthorized entitlements, missing entitlements, and audit-ready remediation notes."
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold">Identity Records</h3>

          <div className="space-y-3">
            {users.map((u, i) => (
              <button
                key={u.name}
                onClick={() => setSelectedUser(i)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedUser === i
                    ? "border-cyan-400 bg-cyan-500 text-slate-950"
                    : "border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-400"
                }`}
              >
                <p className="font-bold">{u.name}</p>
                <p className="text-sm">{u.role}</p>
                <p className="mt-1 text-xs">Lifecycle: {u.status}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="mt-1 text-sm text-slate-400">
            Role: {user.role} · Lifecycle Status: {user.status}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h4 className="font-bold text-cyan-300">System Export Data</h4>
              <div className="mt-3 space-y-2">
                {user.systemAccess.length ? (
                  user.systemAccess.map((access) => (
                    <p key={access} className="text-sm text-slate-300">• {access}</p>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No active access</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h4 className="font-bold text-cyan-300">Role-Based Expected Access</h4>
              <div className="mt-3 space-y-2">
                {user.expectedAccess.length ? (
                  user.expectedAccess.map((access) => (
                    <p key={access} className="text-sm text-slate-300">• {access}</p>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No access expected</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-5">
              <h4 className="font-bold text-red-300">Unauthorized Entitlements</h4>
              <div className="mt-3 space-y-2">
                {unauthorizedAccess.length ? (
                  unauthorizedAccess.map((access) => (
                    <p key={access} className="text-sm text-red-200">• {access}</p>
                  ))
                ) : (
                  <p className="text-sm text-green-300">No unauthorized entitlements found</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-900/60 bg-yellow-950/20 p-5">
              <h4 className="font-bold text-yellow-300">Missing Entitlements</h4>
              <div className="mt-3 space-y-2">
                {missingAccess.length ? (
                  missingAccess.map((access) => (
                    <p key={access} className="text-sm text-yellow-200">• {access}</p>
                  ))
                ) : (
                  <p className="text-sm text-green-300">No missing entitlements found</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h4 className="font-bold text-cyan-300">Audit Evidence Note</h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              User {user.name} is classified as {user.status}. Access review compared system export data against role-based expected access. The review identified {unauthorizedAccess.length} unauthorized entitlements and {missingAccess.length} missing entitlements. Recommended action: update access according to RBAC policy, document remediation, and retain evidence for IAM audit review.
            </p>

            <button
              onClick={exportAuditReport}
              className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Export Audit Report (Simulated)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
