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
] as const;

type ProjectTab = (typeof projectTabs)[number];

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
              <p className="text-sm text-slate-400">SOC Analyst • Incident Response • Detection Engineering</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <a href="https://github.com/sajancr3" className="flex items-center gap-1 hover:text-cyan-400">
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
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2 text-cyan-400">
              <Activity size={20} />
              <span className="font-semibold">Portfolio Signal</span>
            </div>

            <div className="text-6xl font-bold">5</div>
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
        subtitle="Real-time SOC detection pipeline with Suricata, Python, risk scoring, MITRE mapping, dashboards, and safe response logic."
        link="https://github.com/sajancr3/sentinelforge-soc-platform"
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
  return (
    <>
      <ProjectHero
        icon={<KeyRound />}
        title="Quantum-Resistant Cryptography System"
        subtitle="A research-focused project comparing classical cryptography against post-quantum approaches like Kyber and Dilithium."
        link="https://github.com/sajancr3"
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Crypto Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cryptoComparison}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="security" fill="#22d3ee" />
                <Bar dataKey="quantum" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-2xl font-bold">Research Focus</h3>
          <div className="space-y-4">
            <InfoBlock title="Problem" text="RSA and ECC are vulnerable to large-scale quantum attacks using Shor's algorithm." />
            <InfoBlock title="Approach" text="Compare classical algorithms with quantum-resistant candidates such as Kyber and Dilithium." />
            <InfoBlock title="Engineering Angle" text="Benchmark key generation, signing, verification, and deployment tradeoffs on Linux." />
          </div>
        </div>
      </section>
    </>
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
