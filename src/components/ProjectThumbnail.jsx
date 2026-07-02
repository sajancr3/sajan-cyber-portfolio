import { memo } from 'react'

// ── shared geometry helpers ───────────────────────────────────────────
// Neon line: bright stroke + wide outer glow
function NL({ x1,y1,x2,y2,a,w=1,op=0.88 }) {
  return <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth={w*4} strokeOpacity={0.11}/>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth={w} strokeOpacity={op}/>
  </>
}
// Neon circle
function NC({ cx,cy,r,a,w=1,op=0.88,fill='none' }) {
  return <>
    <circle cx={cx} cy={cy} r={r} stroke={a} strokeWidth={w*4} strokeOpacity={0.11} fill="none"/>
    <circle cx={cx} cy={cy} r={r} stroke={a} strokeWidth={w} strokeOpacity={op} fill={fill}/>
  </>
}
// Neon rect
function NR({ x,y,width,height,a,w=1,op=0.88,fill='none',rx=2 }) {
  return <>
    <rect x={x} y={y} width={width} height={height} rx={rx} stroke={a} strokeWidth={w*4} strokeOpacity={0.11} fill="none"/>
    <rect x={x} y={y} width={width} height={height} rx={rx} stroke={a} strokeWidth={w} strokeOpacity={op} fill={fill}/>
  </>
}
// Small mono text
function TX({ x,y,children,fill,size=7,anchor='start',op=0.55,weight='400',spacing='0.5' }) {
  return <text x={x} y={y} fill={fill} fontSize={size} textAnchor={anchor}
               fontFamily="'Courier New',monospace" fillOpacity={op}
               fontWeight={weight} letterSpacing={spacing}>{children}</text>
}
// Gauge arc (percentage fill, starts at 12 o'clock)
function Gauge({ cx,cy,r,pct,a,w=9 }) {
  const circ = 2*Math.PI*r
  const off  = circ * 0.25  // rotate to 12 o'clock
  return <>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${a}25`} strokeWidth={w}/>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={a} strokeWidth={w}
            strokeDasharray={`${pct*circ} ${circ}`}
            strokeDashoffset={off} strokeLinecap="round" strokeOpacity={0.9}/>
  </>
}
// Subtle scan lines grid
function Grid({ a }) {
  return <g stroke={`${a}`} strokeWidth="0.4" strokeOpacity="0.07">
    {[45,90,135].map(y => <line key={'h'+y} x1="0" y1={y} x2="600" y2={y}/>)}
    {[150,300,450].map(x => <line key={'v'+x} x1={x} y1="0" x2={x} y2="180"/>)}
  </g>
}
// Live pulse dot
function Dot({ cx,cy,fill='#00ff88' }) {
  return <>
    <circle cx={cx} cy={cy} r="4" fill={fill}>
      <animate attributeName="opacity" values="1;0.15;1" dur="1.4s" repeatCount="indefinite"/>
    </circle>
    <circle cx={cx} cy={cy} r="8" stroke={fill} strokeWidth="0.8" fill="none" opacity="0.3">
      <animate attributeName="r" values="8;14;8" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0;0.3" dur="1.4s" repeatCount="indefinite"/>
    </circle>
  </>
}
// Badge pill
function Badge({ x,y,label,a,w=42,h=14 }) {
  return <>
    <rect x={x} y={y} width={w} height={h} rx="2" fill={`${a}1a`} stroke={a} strokeWidth="0.7" strokeOpacity="0.8"/>
    <TX x={x+w/2} y={y+h-4} anchor="middle" fill={a} size={7.5} weight="700" op={0.9}>{label}</TX>
  </>
}

// ── SOC: SentinelForge ────────────────────────────────────────────────
function SOCDesign({ a }) {
  const logs = [
    '[22:41:03] T1046 DISC · 192.168.1.100 · risk:72 → AUTO-BLOCK',
    '[22:38:12] Suricata ET SCAN Nmap ×847 events · deduplicated',
    '[22:35:44] T1110 CRED · SSH BruteForce · 847/min peak',
    '[22:30:01] ControlProbe gap: T1021.002 zero alerts',
    '[22:28:55] AbuseIPDB 95% conf · 2/3 IPs flagged',
    '[22:25:11] STIX 2.1 CTI bundle → OpenCTI ingested',
    '[22:18:33] TrustShield: 47 orphans → review queue',
  ]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="2" op={0.45}>SENTINELFORGE · LIVE FEED</TX>
    <NL x1={20} y1={14} x2={360} y2={14} a={a} w={0.4} op={0.25}/>
    {/* Alert badges */}
    {[['CRIT','#ff2244'],['WARN','#ffaa00'],['DETC',a],['INFO','#22cc66']].map(([lbl,clr],i) => (
      <g key={lbl}>
        <rect x={20+i*54} y={19} width={46} height={14} rx="2" fill={`${clr}1a`} stroke={clr} strokeWidth="0.7"/>
        <TX x={43+i*54} y={30} fill={clr} anchor="middle" size={8} weight="700" op={0.95}>{lbl}</TX>
      </g>
    ))}
    {/* Log feed */}
    {logs.map((line, i) => (
      <TX key={i} x={20} y={49+i*17} fill={a} size={6.5} op={0.28+i*0.01}>{line}</TX>
    ))}
    {/* Radar — right side */}
    {[72,50,28].map((r,i) => (
      <NC key={r} cx={490} cy={90} r={r} a={a} w={0.7} op={0.18+i*0.12}/>
    ))}
    <NL x1={418} y1={90} x2={562} y2={90} a={a} w={0.4} op={0.18}/>
    <NL x1={490} y1={18} x2={490} y2={162} a={a} w={0.4} op={0.18}/>
    {/* Sweep */}
    <line x1={490} y1={90} x2={541} y2={36} stroke={a} strokeWidth="1.8" strokeOpacity="0.9"/>
    <line x1={490} y1={90} x2={541} y2={36} stroke={a} strokeWidth="5" strokeOpacity="0.14"/>
    {/* Blip */}
    <Dot cx={534} cy={43} fill={a}/>
    {/* Live */}
    <Dot cx={575} cy={14} fill="#00ff88"/>
    <TX x={567} y={19} fill="#00ff88" anchor="end" size={7} weight="700" op={0.9}>LIVE</TX>
    {/* Footer */}
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Suricata IDS · MITRE ATT&amp;CK · iptables · Flask · Python</TX>
  </>
}

// ── BAS: ControlProbe ─────────────────────────────────────────────────
function BASDesign({ a }) {
  const tactics = ['INIT','EXEC','PERS','PE','DEVA','CRED','DISC','LAT','EXFIL']
  // true=detected, false=missed
  const map = [
    true, true, true,
    true, true, true,
    true, false, false,
    true, false, false,
    true, false, false,
    true, true, false,
    true, true, true,
    false, false, false,
    false, false, false,
  ]
  const cw=27, ch=18, sx=18, sy=32, gap=5
  return <>
    <TX x={18} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>MITRE ATT&amp;CK COVERAGE · 15 TECHNIQUES</TX>
    {tactics.map((t,i) => (
      <TX key={t} x={sx+i*(cw+gap)+cw/2} y={26} fill={a} anchor="middle" size={5.5} op={0.5} weight="600">{t}</TX>
    ))}
    {map.map((det,idx) => {
      const col=Math.floor(idx/3), row=idx%3
      const x=sx+col*(cw+gap), y=sy+row*(ch+gap)
      const isGap = col >= 7
      const clr = det ? a : (isGap ? '#ff2244' : '#ff224455')
      return <rect key={idx} x={x} y={y} width={cw} height={ch} rx="1.5"
                   fill={det ? `${a}1e` : (isGap ? '#ff224415' : 'none')}
                   stroke={clr} strokeWidth={det ? 0.9 : (isGap ? 0.9 : 0.4)}
                   strokeOpacity={det ? 0.9 : (isGap ? 0.8 : 0.3)}/>
    })}
    {['GAP','GAP'].map((lbl,i) => (
      <TX key={i} x={sx+(7+i)*(cw+gap)+cw/2} y={sy+3*(ch+gap)+8} fill="#ff2244" anchor="middle" size={6} weight="700" op={0.75}>{lbl}</TX>
    ))}
    {/* Coverage gauge */}
    <Gauge cx={488} cy={90} r={60} pct={0.61} a={a} w={10}/>
    <circle cx={488} cy={90} r={60} fill="none" stroke="#ff2244" strokeWidth={10} strokeOpacity={0.35}
            strokeDasharray={`${0.39*2*Math.PI*60} ${2*Math.PI*60}`}
            strokeDashoffset={-0.61*2*Math.PI*60+2*Math.PI*60*0.25} strokeLinecap="round"/>
    <text x={488} y={85} fill={a} fontSize="24" fontWeight="700" textAnchor="middle"
          fontFamily="'Courier New',monospace" fillOpacity="0.95">61%</text>
    <TX x={488} y={103} fill={a} anchor="middle" size={8} op={0.45}>COVERAGE</TX>
    <TX x={488} y={118} fill="#ffaa00" anchor="middle" size={8} weight="700" op={0.85}>GRADE: C</TX>
    <Badge x={460} y={135} label="Wazuh SIEM" a={a} w={56}/>
    <TX x={18} y={172} fill={a} size={6.5} op={0.3}>ControlProbe BAS · FastAPI · Docker · AbuseIPDB · Chart.js</TX>
  </>
}

// ── Honeypot: DeceptionGrid ───────────────────────────────────────────
function HoneypotDesign({ a }) {
  const cx=300, cy=90, r=62
  const angles = Array.from({length:6},(_,i)=>i*Math.PI/3 - Math.PI/2)
  const nodes  = angles.map(ang=>({ x:cx+Math.cos(ang)*r, y:cy+Math.sin(ang)*r }))
  const threat = [{ x:120, y:38 },{ x:480, y:145 }]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>DeceptionGrid · DISTRIBUTED HONEYPOT</TX>
    {/* Hex web lines */}
    {nodes.map((n,i) => <NL key={'web'+i} x1={cx} y1={cy} x2={n.x} y2={n.y} a={a} w={0.8} op={0.4}/>)}
    {nodes.map((n,i) => <NL key={'ring'+i} x1={n.x} y1={n.y} x2={nodes[(i+1)%6].x} y2={nodes[(i+1)%6].y} a={a} w={0.6} op={0.3}/>)}
    {/* Honeypot center */}
    <NC cx={cx} cy={cy} r={16} a={a} w={1.2} op={0.8}/>
    <TX x={cx} y={cy-4} fill={a} anchor="middle" size={7} weight="700" op={0.8}>TRAP</TX>
    <TX x={cx} y={cy+8} fill={a} anchor="middle" size={5.5} op={0.55}>6,500</TX>
    {/* Outer nodes */}
    {nodes.map((n,i) => <NC key={'n'+i} cx={n.x} cy={n.y} r={9} a={a} w={0.9} op={0.7}/>)}
    {/* Threat actors (red) */}
    {threat.map((t,i) => <>
      <circle key={'tg'+i} cx={t.x} cy={t.y} r={12} stroke="#ff2244" strokeWidth={1.2} fill="#ff224415"/>
      <circle key={'tpulse'+i} cx={t.x} cy={t.y} r={12} stroke="#ff2244" strokeWidth={0.7} fill="none">
        <animate attributeName="r" values="12;22;12" dur={`${1.6+i*0.4}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur={`${1.6+i*0.4}s`} repeatCount="indefinite"/>
      </circle>
      {/* Lines from threats to center */}
      <line x1={t.x} y1={t.y} x2={cx} y2={cy} stroke="#ff2244" strokeWidth="0.7" strokeOpacity="0.35" strokeDasharray="4 4"/>
    </>)}
    {/* Stats */}
    <Badge x={470} y={14} label="STIX 2.1" a={a} w={48}/>
    <TX x={580} y={30} fill={a} anchor="end" size={7.5} weight="700" op={0.85}>6,500 EVENTS</TX>
    <TX x={580} y={42} fill={a} anchor="end" size={6.5} op={0.45}>4 HOURS · 3 IPs</TX>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Python · Paramiko · STIX 2.1 · AbuseIPDB · Docker · SQLite</TX>
  </>
}

// ── Network: IP Routing Lab ───────────────────────────────────────────
function NetworkDesign({ a }) {
  const nodes = [
    { x:80,  y:90, lbl:'ROUTER A', sub:'192.168.1.1'  },
    { x:300, y:90, lbl:'ROUTER B', sub:'iptables CORE' },
    { x:520, y:90, lbl:'ROUTER C', sub:'192.168.2.1'  },
  ]
  const rules = ['ALLOW  192.168.1.0/24 → 80/tcp','DENY   192.168.3.0/24 → ALL','LOG    ALL → 22/tcp → WARN']
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>IP ROUTING · POLICY ENFORCEMENT LAB</TX>
    {/* Connections */}
    {[[0,1],[1,2]].map(([i,j]) => {
      const from=nodes[i], to=nodes[j]
      const pathD = `M${from.x+36} ${from.y} L${to.x-36} ${to.y}`
      return <g key={`${i}-${j}`}>
        <NL x1={from.x+36} y1={from.y} x2={to.x-36} y2={to.y} a={a} w={1.2} op={0.5}/>
        {/* Packet dot moving along connection */}
        <circle r="3" fill={a} fillOpacity="0.85">
          <animateMotion dur={`${1.6+i*0.6}s`} repeatCount="indefinite" path={pathD}/>
        </circle>
      </g>
    })}
    {/* Router boxes */}
    {nodes.map((n,i) => <>
      <NR key={'box'+i} x={n.x-36} y={n.y-24} width={72} height={48} a={a} w={i===1?1.2:0.9} op={i===1?0.9:0.7}/>
      {i===1 && <>
        {/* iptables shield overlay */}
        <polygon points={`${n.x},${n.y-28} ${n.x+14},${n.y-22} ${n.x+14},${n.y-10} ${n.x},${n.y} ${n.x-14},${n.y-10} ${n.x-14},${n.y-22}`}
                 stroke={a} strokeWidth="0.9" fill={`${a}22`} transform={`translate(0,-5)`}/>
      </>}
      <TX key={'lbl'+i} x={n.x} y={n.y+5} fill={a} anchor="middle" size={7} weight="700" op={0.85}>{n.lbl}</TX>
      <TX key={'sub'+i} x={n.x} y={n.y+17} fill={a} anchor="middle" size={6} op={0.45}>{n.sub}</TX>
    </>)}
    {/* Rules panel */}
    <NR x={16} y={128} width={260} height={38} a={a} w={0.7} op={0.4}/>
    <TX x={22} y={140} fill={a} size={6.5} weight="700" op={0.55}>POLICY RULES</TX>
    {rules.map((r,i) => <TX key={i} x={22} y={151+i*10} fill={a} size={6} op={0.35}>{r}</TX>)}
    <Badge x={540} y={130} label="tcpdump" a={a} w={44}/>
    <Badge x={540} y={152} label="Swagger" a={a} w={44}/>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Spring Boot · Java 17 · iptables · Linux Namespaces · MySQL · Docker</TX>
  </>
}

// ── Storage: NVMe Simulator ───────────────────────────────────────────
function StorageDesign({ a }) {
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>NVMe STORAGE STACK SIMULATOR</TX>
    {/* Drive body */}
    <NR x={180} y={22} width={240} height={136} a={a} w={1.2} op={0.7} rx={6}/>
    <NR x={190} y={32} width={220} height={116} a={a} w={0.5} op={0.25} rx={4}/>
    {/* Controller chip */}
    <NR x={268} y={62} width={64} height={56} a={a} w={1} op={0.85}/>
    <TX x={300} y={86} fill={a} anchor="middle" size={6.5} weight="700" op={0.8}>NVMe</TX>
    <TX x={300} y={97} fill={a} anchor="middle" size={6} op={0.55}>CTRL</TX>
    <TX x={300} y={109} fill={a} anchor="middle" size={5.5} op={0.4}>PCIe</TX>
    {/* NAND channels */}
    {[0,1,2,3].map(i => <>
      <NR key={'ch'+i} x={200} y={38+i*25} width={58} height={18} a={a} w={0.7} op={0.5} rx={2}/>
      <TX key={'lbl'+i} x={229} y={50+i*25} fill={a} anchor="middle" size={5.5} op={0.4}>CH{i}</TX>
      <NL key={'wire'+i} x1={258} y1={47+i*25} x2={268} y2={90} a={a} w={0.4} op={0.2}/>
    </>)}
    {/* Queue rings */}
    <NC cx={470} cy={80} r={38} a={a} w={0.8} op={0.5}/>
    <NC cx={470} cy={80} r={22} a={a} w={0.8} op={0.65}/>
    <TX x={470} y={76} fill={a} anchor="middle" size={6} weight="700" op={0.75}>SQ/CQ</TX>
    <TX x={470} y={88} fill={a} anchor="middle" size={5.5} op={0.45}>QUEUES</TX>
    {/* Stats */}
    <TX x={470} y={128} fill={a} anchor="middle" size={11} weight="700" op={0.9}>4.2M</TX>
    <TX x={470} y={142} fill={a} anchor="middle" size={7} op={0.5}>IOPS · 18μs</TX>
    {/* Left stats */}
    {[['IDENTIFY','CMD'],['READ','CMD'],['WRITE','CMD']].map(([cmd,lbl],i) => <>
      <NL key={'ca'+i} x1={54} y1={40+i*30} x2={170} y2={40+i*30} a={a} w={0.5} op={0.3}/>
      <TX key={'cl'+i} x={20} y={38+i*30} fill={a} size={7} weight="700" op={0.65}>{cmd}</TX>
      <TX key={'cs'+i} x={20} y={50+i*30} fill={a} size={6} op={0.35}>{lbl}</TX>
    </>)}
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>C · C++ · NVMe Protocol · POSIX Shared Memory · Fault Injection</TX>
  </>
}

// ── Crypto: Quantum-Resistant ─────────────────────────────────────────
function CryptoDesign({ a }) {
  // Wave path (sine wave — two slightly offset)
  const w1 = Array.from({length:61},(_,i)=>{
    const x=i*10, y=90+Math.sin(i*0.4)*30
    return `${i===0?'M':'L'}${x} ${y}`
  }).join(' ')
  const w2 = Array.from({length:61},(_,i)=>{
    const x=i*10, y=90+Math.sin(i*0.4+Math.PI)*30
    return `${i===0?'M':'L'}${x} ${y}`
  }).join(' ')
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>QUANTUM-RESISTANT CRYPTOGRAPHY · M.Sc.</TX>
    {/* Background wave fills (very faint) */}
    <path d={w1} stroke={a} strokeWidth="4" strokeOpacity="0.08" fill="none"/>
    <path d={w2} stroke={a} strokeWidth="4" strokeOpacity="0.06" fill="none"/>
    {/* Main waves */}
    <path d={w1} stroke={a} strokeWidth="1.3" strokeOpacity="0.75" fill="none"/>
    <path d={w2} stroke={a} strokeWidth="1.3" strokeOpacity="0.55" fill="none"/>
    {/* Lock at center */}
    <NR x={256} y={58} width={88} height={64} a={a} w={1.2} op={0.9} rx={6}/>
    <g stroke={a} strokeWidth="1.1" fill="none" strokeOpacity="0.9">
      <path d="M276 58 C276 44 324 44 324 58"/>
    </g>
    <NC cx={300} cy={82} r={10} a={a} w={1} op={0.8}/>
    <NL x1={300} y1={92} x2={300} y2={104} a={a} w={1.2} op={0.8}/>
    {/* Algorithm badges */}
    <Badge x={130} y={128} label="SHA3-512" a={a} w={58}/>
    <Badge x={198} y={128} label="Ed25519" a={a} w={50}/>
    <Badge x={258} y={128} label="HMAC" a={a} w={38}/>
    <Badge x={306} y={128} label="POST-QUANTUM" a={a} w={78}/>
    {/* Vistula University note */}
    <TX x={20} y={150} fill={a} size={7} op={0.35}>Vistula University · Warsaw · 2026</TX>
    <TX x={20} y={163} fill={a} size={6.5} op={0.28}>Comparative analysis: Kyber, Dilithium, NTRU vs. classical RSA/ECC</TX>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Python · SHA3-512 · Ed25519 · HMAC-SHA3-512 · Post-Quantum Security</TX>
  </>
}

// ── NIS2: Compliance Platform ─────────────────────────────────────────
function NIS2Design({ a }) {
  const arts = [
    { lbl:'ART. 21', sub:'Security Measures', pct:0.78, score:78 },
    { lbl:'ART. 23', sub:'Incident Reporting', pct:0.92, score:92 },
    { lbl:'ART. 24', sub:'Supply Chain',        pct:0.85, score:85 },
  ]
  const bx=90, bw=120, gap=40
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>NIS2 COMPLIANCE PLATFORM · EU 2022/2555</TX>
    {/* Three article gauge columns */}
    {arts.map((art,i) => {
      const cx=bx+(bw+gap)*i+bw/2+60
      return <>
        <Gauge key={'g'+i} cx={cx} cy={82} r={52} pct={art.pct} a={a} w={9}/>
        <text key={'score'+i} x={cx} y={78} fill={a} fontSize="20" fontWeight="700" textAnchor="middle"
              fontFamily="'Courier New',monospace" fillOpacity="0.95">{art.score}</text>
        <TX key={'pct'+i} x={cx} y={92} fill={a} anchor="middle" size={6.5} op={0.4}>/ 100</TX>
        <TX key={'lbl'+i} x={cx} y={148} fill={a} anchor="middle" size={8} weight="700" op={0.8}>{art.lbl}</TX>
        <TX key={'sub'+i} x={cx} y={160} fill={a} anchor="middle" size={6.5} op={0.45}>{art.sub}</TX>
      </>
    })}
    {/* Right panel */}
    <Badge x={510} y={20} label="KSC Poland" a={a} w={64}/>
    <Badge x={510} y={40} label="CERT Polska" a={a} w={64}/>
    <Badge x={510} y={60} label="IIA 4E" a={a} w={44}/>
    <NL x1={505} y1={86} x2={590} y2={86} a={a} w={0.4} op={0.2}/>
    <TX x={550} y={100} fill={a} anchor="middle" size={8} weight="700" op={0.8}>Score: 78%</TX>
    <TX x={550} y={112} fill={a} anchor="middle" size={7} op={0.45}>Essential Entity</TX>
    <TX x={550} y={124} fill={a} anchor="middle" size={6.5} op={0.35}>Banking Sector</TX>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>FastAPI · Streamlit · SQLite · Pydantic · Python · CERT Polska</TX>
  </>
}

// ── Risk: RiskLens GRC ────────────────────────────────────────────────
function RiskDesign({ a }) {
  // 3x3 risk matrix (likelihood vs impact)
  const cells = [
    '#22cc4440','#ffaa0030',`${a}25`,
    '#ffaa0030','#ffaa0060',`${a}40`,
    `${a}18`,   `${a}35`,   '#ff224430',
  ]
  const borders = [
    '#22cc44',  '#ffaa00',  a,
    '#ffaa00',  '#ffaa00',  a,
    a,          a,          '#ff2244',
  ]
  const cw=72, ch=48, sx=200, sy=28
  // dot items on matrix
  const dots = [[0,2,'CVE-2024'],[1,1,'Phishing'],[2,0,'Insider'],[2,2,'APT']]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>RiskLens GRC · THREAT-INFORMED RISK</TX>
    {/* Axes labels */}
    <TX x={sx+cw*1.5} y={20} fill={a} anchor="middle" size={7} weight="700" op={0.5} spacing="2">IMPACT →</TX>
    <text x={sx-16} y={sy+ch*1.5} fill={a} fontSize={7} textAnchor="middle" fillOpacity="0.5"
          fontFamily="'Courier New',monospace" letterSpacing="2"
          transform={`rotate(-90, ${sx-16}, ${sy+ch*1.5})`}>LIKELIHOOD</text>
    {/* Grid */}
    {cells.map((fill,idx) => {
      const col=idx%3, row=Math.floor(idx/3)
      return <g key={idx}>
        <rect x={sx+col*cw} y={sy+row*ch} width={cw} height={ch} fill={fill} stroke={borders[idx]} strokeWidth="0.8" strokeOpacity="0.6"/>
      </g>
    })}
    {/* Risk dots */}
    {dots.map(([col,row,lbl]) => <>
      <circle key={'d'+lbl} cx={sx+col*cw+cw/2} cy={sy+row*ch+ch/2} r="6" fill={borders[row*3+col]} fillOpacity="0.75"/>
      <TX key={'l'+lbl} x={sx+col*cw+cw/2} y={sy+row*ch+ch+8} fill={a} anchor="middle" size={5.5} op={0.45}>{lbl}</TX>
    </>)}
    {/* Legend */}
    {[['HIGH',`${a}cc`],['MED','#ffaa00cc'],['LOW','#22cc44cc']].map(([lbl,clr],i) => <>
      <circle key={'leg'+i} cx={30} cy={40+i*22} r={6} fill={clr}/>
      <TX key={'leglbl'+i} x={44} y={45+i*22} fill={a} size={7} op={0.6} weight="600">{lbl} RISK</TX>
    </>)}
    {/* Framework badges */}
    <Badge x={200} y={158} label="ISO 27001" a={a} w={56}/>
    <Badge x={264} y={158} label="NIST CSF" a={a} w={52}/>
    <Badge x={324} y={158} label="MITRE ATT&CK" a={a} w={74}/>
    <Badge x={406} y={158} label="CISA KEV" a={a} w={52}/>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Python · SQLite · AbuseIPDB · Nikto · CISA KEV · Entra ID</TX>
  </>
}

// ── Awareness: Security Awareness ────────────────────────────────────
function AwarenessDesign({ a }) {
  const depts = [
    { name:'Finance',    risk:0.82, color:'#ff2244' },
    { name:'HR',         risk:0.62, color:'#ffaa00' },
    { name:'IT',         risk:0.35, color:a          },
    { name:'Legal',      risk:0.48, color:'#ffaa00' },
    { name:'Operations', risk:0.55, color:'#ffaa00' },
  ]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>SECURITY AWARENESS RISK ANALYTICS</TX>
    {/* Big metrics */}
    <text x={95} y={75} fill="#ff2244" fontSize="48" fontWeight="700" textAnchor="middle"
          fontFamily="'Courier New',monospace" fillOpacity="0.9">55%</text>
    <TX x={95} y={90} fill="#ff2244" anchor="middle" size={8.5} weight="700" spacing="1" op={0.8}>CLICK RATE</TX>
    <NL x1={170} y1={28} x2={170} y2={140} a={a} w={0.5} op={0.2}/>
    <text x={280} y={75} fill={a} fontSize="48" fontWeight="700" textAnchor="middle"
          fontFamily="'Courier New',monospace" fillOpacity="0.9">45%</text>
    <TX x={280} y={90} fill={a} anchor="middle" size={8.5} weight="700" spacing="1" op={0.8}>REPORT RATE</TX>
    {/* Stats */}
    <TX x={95} y={112} fill={a} anchor="middle" size={7} op={0.45}>200 USERS TESTED</TX>
    <TX x={280} y={112} fill={a} anchor="middle" size={7} op={0.45}>CREDENTIAL HARVEST</TX>
    <TX x={95} y={126} fill="#ff2244" anchor="middle" size={7} weight="600" op={0.7}>HIGH RISK: FINANCE</TX>
    <TX x={280} y={126} fill={a} anchor="middle" size={7} op={0.4}>PEAK TECHNIQUE</TX>
    {/* Department risk bars */}
    <NL x1={395} y1={22} x2={590} y2={22} a={a} w={0.4} op={0.2}/>
    <TX x={490} y={18} fill={a} anchor="middle" size={7} weight="700" op={0.5} spacing="1">DEPT RISK PROFILE</TX>
    {depts.map((d,i) => {
      const barW=130, bx=455, by=28+i*22
      return <>
        <TX key={'dn'+i} x={450} y={by+10} fill={a} anchor="end" size={6.5} op={0.55}>{d.name}</TX>
        <rect key={'bg'+i} x={bx} y={by} width={barW} height={14} rx="2" fill={`${a}08`} stroke={`${a}20`} strokeWidth="0.5"/>
        <rect key={'fill'+i} x={bx} y={by} width={barW*d.risk} height={14} rx="2" fill={d.color} fillOpacity="0.25"
              stroke={d.color} strokeWidth="0.7" strokeOpacity="0.7"/>
        <TX key={'pct'+i} x={bx+barW+4} y={by+10} fill={d.color} size={6.5} weight="700" op={0.75}>{Math.round(d.risk*100)}%</TX>
      </>
    })}
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Phishing Analysis · Human Risk · GRC · KPI Reporting · Executive Documentation</TX>
  </>
}

// ── TrustShield: IAM AI Platform ──────────────────────────────────────
function TrustShieldDesign({ a }) {
  const identities = [
    { x:300, y:32,  lbl:'HR CSV'    },
    { x:490, y:72,  lbl:'AD/Entra'  },
    { x:480, y:148, lbl:'Groups'    },
    { x:300, y:158, lbl:'Policies'  },
    { x:120, y:148, lbl:'Roles'     },
    { x:110, y:72,  lbl:'Auditor'   },
  ]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>TrustShield IAM AI · IDENTITY GOVERNANCE</TX>
    {/* Shield (center) */}
    <g transform="translate(300,90)">
      <path d="M0,-52 L45,-28 L45,10 C43,48 13,58 0,64 C-13,58 -43,48 -45,10 L-45,-28 Z"
            stroke={a} strokeWidth="1.4" fill={`${a}18`} strokeOpacity="0.9"/>
      <path d="M0,-40 L34,-21 L34,8 C32,36 10,45 0,49 C-10,45 -32,36 -34,8 L-34,-21 Z"
            stroke={a} strokeWidth="0.6" fill="none" strokeOpacity="0.45"/>
      <text y={-2} fill={a} fontSize="11" fontWeight="700" textAnchor="middle"
            fontFamily="'Courier New',monospace" fillOpacity="0.9">AI</text>
      <text y={14} fill={a} fontSize="7.5" textAnchor="middle"
            fontFamily="'Courier New',monospace" fillOpacity="0.55">IGA</text>
    </g>
    {/* Identity nodes */}
    {identities.map((n,i) => <>
      <NL key={'ln'+i} x1={n.x} y1={n.y} x2={300} y2={90} a={a} w={0.6} op={0.2}/>
      <NC key={'nc'+i} cx={n.x} cy={n.y} r={14} a={a} w={0.9} op={0.75}/>
      <TX key={'lbl'+i} x={n.x} y={n.y+4} fill={a} anchor="middle" size={6} weight="600" op={0.75}>{n.lbl}</TX>
    </>)}
    {/* Badges */}
    <Badge x={14} y={128} label="Ed25519" a={a} w={48}/>
    <Badge x={14} y={148} label="SHA3-512" a={a} w={52}/>
    <Badge x={14} y={168} label="Ollama AI" a={a} w={50}/>
    <Badge x={518} y={128} label="Streamlit" a={a} w={48}/>
    <Badge x={518} y={148} label="Docker" a={a} w={44}/>
    <Badge x={518} y={168} label="SQLite" a={a} w={40}/>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Python · Ollama · Ed25519 · SHA3-512 · SQLite · Docker · Streamlit</TX>
  </>
}

// ── Entra: Identity Governance Platform ───────────────────────────────
function EntraDesign({ a }) {
  const org  = { x:300, y:30 }
  const grps = [{ x:155, y:88 },{ x:300, y:88 },{ x:445, y:88 }]
  const users = [{ x:90,y:150 },{ x:220,y:150 },{ x:300,y:150 },{ x:380,y:150 },{ x:510,y:150 }]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>ENTRA ID IDENTITY GOVERNANCE PLATFORM</TX>
    {/* Org root */}
    <NR x={org.x-50} y={org.y-16} width={100} height={32} a={a} w={1.3} op={0.9} rx={4}/>
    <TX x={org.x} y={org.y-2} fill={a} anchor="middle" size={7.5} weight="700" op={0.9}>Entra ID Org</TX>
    <TX x={org.x} y={org.y+11} fill={a} anchor="middle" size={6.5} op={0.5}>Graph API</TX>
    {/* Org → groups */}
    {grps.map((g,i) => <NL key={'lg'+i} x1={org.x} y1={org.y+16} x2={g.x} y2={g.y-16} a={a} w={0.8} op={0.35}/>)}
    {grps.map((g,i) => <>
      <NR key={'gr'+i} x={g.x-40} y={g.y-16} width={80} height={32} a={a} w={1} op={0.8} rx={3}/>
      <TX key={'gl'+i} x={g.x} y={g.y-2} fill={a} anchor="middle" size={7} weight="700" op={0.85}>{['Security','Admin','Audit'][i]}</TX>
      <TX key={'gs'+i} x={g.x} y={g.y+11} fill={a} anchor="middle" size={6} op={0.45}>{['Group','Group','Group'][i]}</TX>
    </>)}
    {/* Groups → users */}
    {users.map((u,i) => {
      const grpIdx = Math.min(Math.floor(i/2), 2)
      return <>
        <NL key={'lu'+i} x1={grps[grpIdx>=grps.length?grps.length-1:grpIdx].x} y1={88+16}
            x2={u.x} y2={u.y-14} a={a} w={0.6} op={0.25}/>
        <NC key={'uc'+i} cx={u.x} cy={u.y} r={13} a={a} w={0.9} op={0.75}/>
        <TX key={'ul'+i} x={u.x} y={u.y+4} fill={a} anchor="middle" size={6} weight="600" op={0.7}>{['Admin','User','User','Auditor','User'][i]}</TX>
      </>
    })}
    <Badge x={20} y={130} label="MSAL" a={a} w={36}/>
    <Badge x={62} y={130} label="OAuth2" a={a} w={44}/>
    <Badge x={112} y={130} label="RBAC" a={a} w={38}/>
    <Badge x={156} y={130} label="JML" a={a} w={30}/>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Microsoft Entra ID · Graph API · MSAL · OAuth2 · Python · RBAC · Pandas</TX>
  </>
}

// ── IAM-Risk: AI Risk Analyzer ────────────────────────────────────────
function IAMRiskDesign({ a }) {
  const users = [
    { name:'ADM_svc_2019',   risk:0.91, score:91, clr:'#ff2244', tag:'STALE ADMIN'    },
    { name:'john.doe',       risk:0.74, score:74, clr:'#ff6622', tag:'EXCESSIVE PRIV' },
    { name:'sarah.chen',     risk:0.52, score:52, clr:'#ffaa00', tag:'DORMANT 90d'    },
    { name:'api_key_legacy', risk:0.88, score:88, clr:'#ff2244', tag:'ORPHAN'         },
    { name:'hr_batch_user',  risk:0.31, score:31, clr:a,          tag:'NORMAL'        },
  ]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>IAM AI RISK ANALYZER · IDENTITY ANOMALIES</TX>
    <TX x={20} y={22} fill="#ff2244" size={8} weight="700" op={0.8}>⚠ HIGH RISK: 2 IDENTITIES · REVIEW REQUIRED</TX>
    {/* User rows */}
    {users.map((u,i) => {
      const y=32+i*25
      const barW=200
      return <>
        <NR key={'row'+i} x={18} y={y} width={564} height={20} a={u.clr} w={0.5} op={0.3}/>
        {/* Avatar */}
        <NC key={'av'+i} cx={32} cy={y+10} r={7} a={u.clr} w={0.8} op={0.75}/>
        {/* Name */}
        <TX key={'nm'+i} x={46} y={y+14} fill={a} size={7.5} weight={u.risk>0.7?'700':'400'} op={u.risk>0.7?0.95:0.65}>{u.name}</TX>
        {/* Risk bar */}
        <rect key={'rbg'+i} x={220} y={y+4} width={barW} height={12} rx="2" fill={`${a}0a`}/>
        <rect key={'rfill'+i} x={220} y={y+4} width={barW*u.risk} height={12} rx="2" fill={u.clr} fillOpacity="0.35"
              stroke={u.clr} strokeWidth="0.7" strokeOpacity="0.7"/>
        {/* Score */}
        <TX key={'sc'+i} x={428} y={y+14} fill={u.clr} anchor="middle" size={8} weight="700" op={0.9}>{u.score}</TX>
        {/* Tag */}
        <rect key={'tg'+i} x={440} y={y+3} width={130} height={14} rx="2" fill={`${u.clr}18`} stroke={u.clr} strokeWidth="0.6"/>
        <TX key={'tgl'+i} x={505} y={y+13} fill={u.clr} anchor="middle" size={6.5} weight="700" op={0.85}>{u.tag}</TX>
      </>
    })}
    <Badge x={20} y={163} label="AI SCORING" a={a} w={60}/>
    <Badge x={88} y={163} label="Ollama" a={a} w={42}/>
    <TX x={20} y={172} fill={a} size={6.5} op={0.3}>Python · IAM · AI Risk Scoring · Identity Analytics · Access Governance</TX>
  </>
}

// ── JML: Hybrid IAM System ────────────────────────────────────────────
function JMLDesign({ a }) {
  const stages = [
    { x:105, label:'JOIN',   sublbl:'Provision',  time:'< 4 hrs', clr:'#22cc66' },
    { x:300, label:'MOVE',   sublbl:'Delta Access',time:'Instant',  clr:'#ffaa00' },
    { x:495, label:'LEAVE',  sublbl:'Revoke',     time:'30 d seal', clr:'#ff2244' },
  ]
  return <>
    <TX x={20} y={11} fill={a} size={7.5} weight="700" spacing="1.5" op={0.45}>JML HYBRID IAM · IDENTITY LIFECYCLE</TX>
    {/* Stage circles */}
    {stages.map((s,i) => <>
      <circle key={'bg'+i} cx={s.x} cy={90} r={52} stroke={s.clr} strokeWidth="8" fill="none" strokeOpacity="0.12"/>
      <circle key={'ring'+i} cx={s.x} cy={90} r={52} stroke={s.clr} strokeWidth="1.2" fill={`${s.clr}0e`} strokeOpacity="0.8"/>
      <text key={'lbl'+i} x={s.x} y={84} fill={s.clr} fontSize="18" fontWeight="700" textAnchor="middle"
            fontFamily="'Courier New',monospace" fillOpacity="0.9">{s.label}</text>
      <TX key={'sub'+i} x={s.x} y={100} fill={a} anchor="middle" size={7.5} weight="600" op={0.55}>{s.sublbl}</TX>
      <TX key={'tim'+i} x={s.x} y={114} fill={s.clr} anchor="middle" size={7} weight="700" op={0.75}>{s.time}</TX>
    </>)}
    {/* Arrows between stages */}
    {[[stages[0],stages[1]],[stages[1],stages[2]]].map(([from,to],i) => {
      const mx=(from.x+to.x)/2, y=90
      return <>
        <NL key={'arr'+i} x1={from.x+55} y1={y} x2={to.x-55} y2={y} a={a} w={1.2} op={0.5}/>
        <polygon key={'head'+i} points={`${to.x-55},${y-6} ${to.x-42},${y} ${to.x-55},${y+6}`} fill={a} fillOpacity="0.7"/>
      </>
    })}
    {/* Badges */}
    <Badge x={20} y={152} label="RBAC" a={a} w={38}/>
    <Badge x={66} y={152} label="AUDIT EVIDENCE" a={a} w={86}/>
    <Badge x={160} y={152} label="Docker" a={a} w={44}/>
    <Badge x={20} y={168} label="JML AUTOMATED" a={a} w={84}/>
    <Badge x={112} y={168} label="Entra ID" a={a} w={48}/>
    <Badge x={168} y={168} label="HTML Dashboard" a={a} w={82}/>
    <TX x={20} y={176} fill={a} size={6.5} op={0.3}>Python · JML · RBAC · Access Validation · Docker Compose · Audit Evidence</TX>
  </>
}

// ── master component ──────────────────────────────────────────────────
const DESIGNS = {
  soc:         SOCDesign,
  bas:         BASDesign,
  honeypot:    HoneypotDesign,
  network:     NetworkDesign,
  storage:     StorageDesign,
  crypto:      CryptoDesign,
  nis2:        NIS2Design,
  risk:        RiskDesign,
  awareness:   AwarenessDesign,
  trustshield: TrustShieldDesign,
  entra:       EntraDesign,
  'iam-risk':  IAMRiskDesign,
  jml:         JMLDesign,
}

export default memo(function ProjectThumbnail({ type = 'soc', accent = '#3b5fd8', height = 180 }) {
  const Design = DESIGNS[type]
  if (!Design) return null

  return (
    <svg
      viewBox="0 0 600 180"
      width="100%"
      height={height}
      style={{ display: 'block', background: '#050919' }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Grid a={accent}/>
      <Design a={accent}/>
    </svg>
  )
})
