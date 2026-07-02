import { useEffect, useRef } from 'react'

const BG = [5, 9, 25]  // #050919

const STARFIELD = Array.from({ length: 240 }, () => ({
  xF: Math.random(), yF: Math.random(),
  r: 0.12 + Math.random() * 0.88,
  a: 0.03 + Math.random() * 0.22,
}))

// ── 16 types of cybersecurity objects ────────────────────────────────
const ALL_TYPES = [
  'shield','lock','eye','circuit','key','radar','node',
  'skull','dna','fingerprint','server','wifi','hexagon',
  'badge','satellite','firewall',
]

const BADGE_LABELS = [
  'SOC','EDR','IDS','IAM','CTI','WAF',
  'VPN','MFA','XDR','NDR','CSPM','SIEM',
  'SOAR','ZTA','TTP','CVE','APT','MITRE',
  'C2','IOC','SBOM','ZTNA','PAM','DLP',
]

// ── Page-specific object themes ───────────────────────────────────────
// Repeated entries in pool = higher probability for that type
const PAGE_THEMES = {
  '/': {
    pool:   ALL_TYPES,
    labels: BADGE_LABELS,
  },
  '/grc': {
    pool:   ['badge','firewall','server','hexagon','circuit','shield',
             'badge','firewall','badge','server','badge','hexagon'],
    labels: ['DORA','NIS2','GDPR','KNF','IIA','ISO','PIMS','ISMS',
             'CERT','PCI','SOC2','NIST','COBIT','ITGC','3LOD','GRC',
             'RTO','RPO','BCMS','TPRM','CMMC','CSF','COSO','ISAE'],
  },
  '/iam': {
    pool:   ['lock','key','fingerprint','node','badge','shield','server',
             'lock','key','badge','fingerprint','node','badge','lock'],
    labels: ['IAM','MFA','RBAC','JML','PAM','IGA','SSO','ZTNA',
             'LDAP','SAML','OAuth','SCIM','ABAC','ZTA','PKI',
             'IDP','FIDO','PIM','DAG','EPM','LAPS','CyberArk','Okta'],
  },
  '/cyber': {
    pool:   ['radar','skull','eye','wifi','circuit','node','badge',
             'satellite','shield','radar','skull','eye','badge','radar'],
    labels: ['SOC','SIEM','IDS','XDR','EDR','CTI','IOC','APT','MITRE',
             'BAS','C2','TTP','CVE','NDR','SOAR','UEBA','T1046',
             'T1190','T1059','T1548','Suricata','STIX','OpenCTI'],
  },
  '/writeups': {
    pool:   ['skull','eye','radar','fingerprint','badge','node',
             'dna','skull','eye','radar','skull','fingerprint'],
    labels: ['T1046','APT','IOC','CVE','TTP','MITRE','C2',
             'T1110','T1021','T1048','T1547','T1059','T1190','T1566',
             'IOCS','TTPs','ATT&CK','Sigma','YARA','KQL'],
  },
  '/gallery': {
    pool:   ALL_TYPES,
    labels: BADGE_LABELS,
  },
}

function pickFrom(pool) { return pool[Math.floor(Math.random() * pool.length)] }
// legacy compat (used in initialisation before themeRef is set)
function pickObjType() { return pickFrom(ALL_TYPES) }
function makeLabel()    { return pickFrom(BADGE_LABELS) }

// 16 objects — varied sizes and drift vectors
const OBJECTS_LAYOUT = [
  { xF:0.06, yF:0.15, s:90,  vx: 3,   vy: 6   },
  { xF:0.22, yF:0.68, s:55,  vx: 8,   vy:-5   },
  { xF:0.38, yF:0.18, s:48,  vx:-7,   vy:10   },
  { xF:0.55, yF:0.82, s:105, vx: 3,   vy: 4   },
  { xF:0.72, yF:0.10, s:38,  vx:-10,  vy: 7   },
  { xF:0.88, yF:0.48, s:65,  vx:-5,   vy:-6   },
  { xF:0.15, yF:0.85, s:52,  vx: 7,   vy:-8   },
  { xF:0.50, yF:0.52, s:32,  vx:12,   vy:11   },
  { xF:0.80, yF:0.75, s:72,  vx:-8,   vy: 5   },
  { xF:0.30, yF:0.40, s:44,  vx: 6,   vy:-9   },
  { xF:0.65, yF:0.30, s:58,  vx:-4,   vy: 8   },
  { xF:0.10, yF:0.55, s:88,  vx: 5,   vy:-7   },
  { xF:0.45, yF:0.92, s:40,  vx:-9,   vy:-4   },
  { xF:0.92, yF:0.22, s:30,  vx: 4,   vy: 9   },
  { xF:0.20, yF:0.30, s:62,  vx:-6,   vy: 6   },
  { xF:0.75, yF:0.62, s:46,  vx: 9,   vy:-5   },
]

const COMET_REACH = 700

// Neon cybersecurity comet palette
const STAR_TYPES = [
  { r:0,   g:255, b:136, tailLen:168, width:1.4,  speed:505, glowW:5,   glowA:0.45, headR:8,  headA:0.88, weight:50 },
  { r:0,   g:200, b:255, tailLen:128, width:1.1,  speed:420, glowW:4,   glowA:0.38, headR:6,  headA:0.70, weight:25 },
  { r:130, g:55,  b:255, tailLen:90,  width:0.85, speed:330, glowW:3.5, glowA:0.28, headR:5,  headA:0.55, weight:15 },
  { r:255, g:0,   b:128, tailLen:70,  width:0.65, speed:755, glowW:6,   glowA:0.62, headR:10, headA:0.92, weight:7  },
  { r:255, g:165, b:0,   tailLen:110, width:1.0,  speed:460, glowW:4.5, glowA:0.40, headR:7,  headA:0.80, weight:3  },
]
const TYPE_TOTAL = STAR_TYPES.reduce((s, t) => s + t.weight, 0)

const LANES = [
  { yFrac:0.06, angleDeg: 1.5, interval:[8,  14] },
  { yFrac:0.16, angleDeg:-0.8, interval:[11, 18] },
  { yFrac:0.27, angleDeg: 2.2, interval:[7,  13] },
  { yFrac:0.38, angleDeg:-1.5, interval:[13, 20] },
  { yFrac:0.50, angleDeg: 0.7, interval:[9,  15] },
  { yFrac:0.62, angleDeg:-2.0, interval:[10, 16] },
  { yFrac:0.74, angleDeg: 1.3, interval:[12, 19] },
  { yFrac:0.86, angleDeg:-0.5, interval:[8,  14] },
  { yFrac:0.94, angleDeg: 1.0, interval:[10, 17] },
]

function rand(a, b) { return a + Math.random() * (b - a) }
function pickType() {
  let roll = Math.random() * TYPE_TOTAL
  for (const t of STAR_TYPES) { roll -= t.weight; if (roll <= 0) return t }
  return STAR_TYPES[0]
}
function buildStar(lane) {
  const type = pickType()
  const rad  = (lane.angleDeg * Math.PI) / 180
  return {
    x: -type.tailLen - 20, y: lane.yFrac * window.innerHeight,
    cos: Math.cos(rad), sin: Math.sin(rad),
    type, smoke: [], active: true, timer: rand(...lane.interval), lane,
  }
}

// ── Shape drawing functions ───────────────────────────────────────────
// All shapes use ctx.stroke() with the calling context's strokeStyle/shadowBlur

function strokeShield(ctx, x, y, s) {
  ctx.beginPath()
  ctx.moveTo(x, y - s)
  ctx.lineTo(x + s*0.75, y - s*0.45)
  ctx.lineTo(x + s*0.75, y + s*0.15)
  ctx.bezierCurveTo(x+s*0.72,y+s*0.78, x+s*0.22,y+s*0.92, x, y+s)
  ctx.bezierCurveTo(x-s*0.22,y+s*0.92, x-s*0.72,y+s*0.78, x-s*0.75,y+s*0.15)
  ctx.lineTo(x - s*0.75, y - s*0.45); ctx.closePath(); ctx.stroke()
  const f = 0.76
  ctx.beginPath()
  ctx.moveTo(x, y - s*f)
  ctx.lineTo(x+s*0.75*f, y-s*0.45*f); ctx.lineTo(x+s*0.75*f, y+s*0.15*f)
  ctx.bezierCurveTo(x+s*0.72*f,y+s*0.78*f, x+s*0.22*f,y+s*0.92*f, x, y+s*f)
  ctx.bezierCurveTo(x-s*0.22*f,y+s*0.92*f, x-s*0.72*f,y+s*0.78*f, x-s*0.75*f,y+s*0.15*f)
  ctx.lineTo(x-s*0.75*f, y-s*0.45*f); ctx.closePath(); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.24, y+s*0.02); ctx.lineTo(x-s*0.05, y+s*0.26); ctx.lineTo(x+s*0.30, y-s*0.20)
  ctx.stroke()
}

function strokeLock(ctx, x, y, s) {
  ctx.beginPath(); ctx.rect(x-s*0.52, y-s*0.05, s*1.04, s*0.85); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y-s*0.05, s*0.36, Math.PI*1.08, Math.PI*1.92); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y+s*0.28, s*0.12, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.06, y+s*0.38); ctx.lineTo(x+s*0.06, y+s*0.38); ctx.lineTo(x, y+s*0.56)
  ctx.closePath(); ctx.stroke()
}

function strokeEye(ctx, x, y, s) {
  ctx.beginPath()
  ctx.moveTo(x-s, y)
  ctx.quadraticCurveTo(x-s*0.1, y-s*0.52, x, y-s*0.10)
  ctx.quadraticCurveTo(x+s*0.1, y-s*0.52, x+s, y)
  ctx.quadraticCurveTo(x+s*0.1, y+s*0.52, x, y+s*0.10)
  ctx.quadraticCurveTo(x-s*0.1, y+s*0.52, x-s, y)
  ctx.closePath(); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y, s*0.30, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y, s*0.12, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.48,y); ctx.lineTo(x-s*0.33,y)
  ctx.moveTo(x+s*0.33,y); ctx.lineTo(x+s*0.48,y)
  ctx.moveTo(x,y-s*0.48); ctx.lineTo(x,y-s*0.33)
  ctx.moveTo(x,y+s*0.33); ctx.lineTo(x,y+s*0.48)
  ctx.stroke()
}

function strokeCircuit(ctx, x, y, s) {
  ctx.beginPath(); ctx.rect(x-s*0.80, y-s*0.75, s*1.60, s*1.50); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.80,y-s*0.28); ctx.lineTo(x+s*0.80,y-s*0.28)
  ctx.moveTo(x-s*0.80,y+s*0.28); ctx.lineTo(x+s*0.80,y+s*0.28)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.28,y-s*0.75); ctx.lineTo(x-s*0.28,y+s*0.75)
  ctx.moveTo(x+s*0.28,y-s*0.75); ctx.lineTo(x+s*0.28,y+s*0.75)
  ctx.stroke()
  ;[[x-s*0.28,y-s*0.28],[x+s*0.28,y-s*0.28],[x-s*0.28,y+s*0.28],[x+s*0.28,y+s*0.28],[x,y]].forEach(([nx,ny]) => {
    ctx.beginPath(); ctx.arc(nx, ny, s*0.07, 0, Math.PI*2); ctx.stroke()
  })
  const b = s*0.15
  ;[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy]) => {
    const cx2 = x+sx*s*0.68, cy2 = y+sy*s*0.62
    ctx.beginPath(); ctx.moveTo(cx2-sx*b,cy2); ctx.lineTo(cx2,cy2); ctx.lineTo(cx2,cy2-sy*b); ctx.stroke()
  })
}

function strokeKey(ctx, x, y, s) {
  ctx.beginPath(); ctx.arc(x-s*0.40, y, s*0.38, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.04,y-s*0.08); ctx.lineTo(x+s*0.88,y-s*0.08)
  ctx.lineTo(x+s*0.88,y+s*0.08); ctx.lineTo(x-s*0.04,y+s*0.08)
  ctx.stroke()
  ;[[0.32,0.22],[0.52,0.18],[0.70,0.14]].forEach(([tx,th]) => {
    ctx.beginPath()
    ctx.moveTo(x+s*tx,y+s*0.08); ctx.lineTo(x+s*tx,y+s*0.08+s*th)
    ctx.lineTo(x+s*(tx+0.13),y+s*0.08+s*th); ctx.lineTo(x+s*(tx+0.13),y+s*0.08)
    ctx.stroke()
  })
}

function strokeRadar(ctx, x, y, s) {
  ctx.beginPath(); ctx.arc(x, y, s*0.80, Math.PI, 0)
  ctx.lineTo(x+s*0.80,y); ctx.lineTo(x,y); ctx.lineTo(x-s*0.80,y); ctx.stroke()
  ;[0.30,0.55].forEach(r => { ctx.beginPath(); ctx.arc(x,y,s*r,Math.PI,0); ctx.stroke() })
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+s*0.74, y-s*0.34); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x,y); ctx.lineTo(x,y+s*0.55)
  ctx.moveTo(x-s*0.35,y+s*0.55); ctx.lineTo(x+s*0.35,y+s*0.55)
  ctx.stroke()
}

function strokeNode(ctx, x, y, s) {
  ctx.beginPath(); ctx.arc(x, y, s*0.28, 0, Math.PI*2); ctx.stroke()
  ;[[x+s*0.80,y-s*0.55],[x+s*0.82,y+s*0.42],[x-s*0.80,y-s*0.45],[x-s*0.72,y+s*0.60]].forEach(([cx,cy]) => {
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(cx,cy); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx,cy,s*0.15,0,Math.PI*2); ctx.stroke()
  })
}

function strokeSkull(ctx, x, y, s) {
  ctx.beginPath(); ctx.ellipse(x, y-s*0.10, s*0.62, s*0.68, 0, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath(); ctx.arc(x-s*0.24, y-s*0.14, s*0.16, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath(); ctx.arc(x+s*0.24, y-s*0.14, s*0.16, 0, Math.PI*2); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-s*0.09,y+s*0.12); ctx.lineTo(x,y+s*0.05); ctx.lineTo(x+s*0.09,y+s*0.12)
  ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y+s*0.15, s*0.42, 0, Math.PI); ctx.stroke()
  ;[-0.28,-0.10,0.10,0.28].forEach(tx => {
    ctx.beginPath(); ctx.moveTo(x+tx*s,y+s*0.34); ctx.lineTo(x+tx*s,y+s*0.58); ctx.stroke()
  })
}

function strokeDNA(ctx, x, y, s) {
  const h  = s * 1.80, w = s * 0.45, pts = 32
  ctx.beginPath()
  for (let i = 0; i <= pts; i++) {
    const t = i/pts, py = y-h/2+t*h, px = x - Math.sin(t*Math.PI*4)*w
    i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py)
  }
  ctx.stroke()
  ctx.beginPath()
  for (let i = 0; i <= pts; i++) {
    const t = i/pts, py = y-h/2+t*h, px = x + Math.sin(t*Math.PI*4)*w
    i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py)
  }
  ctx.stroke()
  for (let i = 0; i <= 8; i++) {
    const t = i/8, phase = t*Math.PI*4
    if (Math.abs(Math.sin(phase)) > 0.55) {
      const py = y-h/2+t*h
      ctx.beginPath()
      ctx.moveTo(x-Math.sin(phase)*w, py); ctx.lineTo(x+Math.sin(phase)*w, py)
      ctx.stroke()
    }
  }
}

function strokeFingerprint(ctx, x, y, s) {
  const cx = x+s*0.06, cy = y
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath()
    ctx.arc(cx, cy, s*0.17*i, Math.PI*0.88, Math.PI*2.12)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(x-s*0.85, y+s*0.10); ctx.quadraticCurveTo(x, y+s*0.65, x+s*0.85, y+s*0.10)
  ctx.stroke()
}

function strokeServer(ctx, x, y, s) {
  const w=s*1.2, h=s*0.26, gap=s*0.08, count=4
  const totalH = count*(h+gap)-gap
  const sy = y-totalH/2
  for (let i = 0; i < count; i++) {
    const uy = sy+i*(h+gap)
    ctx.beginPath(); ctx.rect(x-w/2, uy, w, h); ctx.stroke()
    ctx.beginPath(); ctx.arc(x+w/2-s*0.10, uy+h/2, s*0.05, 0, Math.PI*2); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x-w/2+s*0.10, uy+h/2); ctx.lineTo(x-w/2+s*0.45, uy+h/2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x-w/2+s*0.50, uy+h*0.25); ctx.lineTo(x-w/2+s*0.50, uy+h*0.75)
    ctx.moveTo(x-w/2+s*0.65, uy+h*0.25); ctx.lineTo(x-w/2+s*0.65, uy+h*0.75)
    ctx.stroke()
  }
}

function strokeWifi(ctx, x, y, s) {
  const cy = y + s*0.32
  ;[s*0.26, s*0.52, s*0.78].forEach(r => {
    ctx.beginPath(); ctx.arc(x, cy, r, Math.PI*1.22, Math.PI*1.78); ctx.stroke()
  })
  ctx.beginPath(); ctx.arc(x, cy, s*0.07, 0, Math.PI*2); ctx.stroke()
}

function strokeHexagon(ctx, x, y, s) {
  ;[1.0, 0.55].forEach(scale => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const a = (i/6)*Math.PI*2 - Math.PI/2
      const px = x+Math.cos(a)*s*scale, py = y+Math.sin(a)*s*scale
      i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py)
    }
    ctx.closePath(); ctx.stroke()
  })
  for (let i = 0; i < 6; i++) {
    const a = (i/6)*Math.PI*2 - Math.PI/2
    ctx.beginPath()
    ctx.moveTo(x+Math.cos(a)*s*0.55, y+Math.sin(a)*s*0.55)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function strokeBadge(ctx, x, y, s, label) {
  const w=s*1.5, h=s*0.75
  ctx.beginPath(); ctx.rect(x-w/2, y-h/2, w, h); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x-w/2,y-h/2+s*0.14); ctx.lineTo(x-w/2,y-h/2); ctx.lineTo(x-w/2+s*0.14,y-h/2)
  ctx.moveTo(x+w/2-s*0.14,y-h/2); ctx.lineTo(x+w/2,y-h/2); ctx.lineTo(x+w/2,y-h/2+s*0.14)
  ctx.moveTo(x-w/2,y+h/2-s*0.14); ctx.lineTo(x-w/2,y+h/2); ctx.lineTo(x-w/2+s*0.14,y+h/2)
  ctx.moveTo(x+w/2-s*0.14,y+h/2); ctx.lineTo(x+w/2,y+h/2); ctx.lineTo(x+w/2,y+h/2-s*0.14)
  ctx.stroke()
  ctx.font = `bold ${Math.round(s*0.52)}px 'JetBrains Mono', 'Courier New', monospace`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.strokeText(label || 'SOC', x, y)
}

function strokeSatellite(ctx, x, y, s) {
  ctx.beginPath(); ctx.rect(x-s*0.24, y-s*0.18, s*0.48, s*0.36); ctx.stroke()
  ctx.beginPath(); ctx.rect(x-s*0.90, y-s*0.38, s*0.60, s*0.76); ctx.stroke()
  ctx.beginPath(); ctx.rect(x+s*0.30, y-s*0.38, s*0.60, s*0.76); ctx.stroke()
  ;[-1,1].forEach(side => {
    const px = side===-1 ? x-s*0.90 : x+s*0.30
    ;[1/3, 2/3].forEach(t => {
      ctx.beginPath()
      ctx.moveTo(px, y-s*0.38+t*s*0.76); ctx.lineTo(px+s*0.60, y-s*0.38+t*s*0.76)
      ctx.stroke()
    })
    ctx.beginPath()
    ctx.moveTo(px+s*0.30, y-s*0.38); ctx.lineTo(px+s*0.30, y+s*0.38)
    ctx.stroke()
  })
  ctx.beginPath(); ctx.moveTo(x,y-s*0.18); ctx.lineTo(x,y-s*0.55); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y-s*0.55, s*0.08, 0, Math.PI*2); ctx.stroke()
}

function strokeFirewall(ctx, x, y, s) {
  ;[-s*0.46, 0, s*0.46].forEach(gx => {
    ctx.beginPath(); ctx.rect(x+gx-s*0.12, y-s*0.62, s*0.24, s*1.24); ctx.stroke()
  })
  ctx.beginPath()
  ctx.moveTo(x-s*0.70,y-s*0.62); ctx.lineTo(x+s*0.70,y-s*0.62)
  ctx.moveTo(x-s*0.70,y+s*0.62); ctx.lineTo(x+s*0.70,y+s*0.62)
  ctx.stroke()
  ;[-s*0.23, s*0.23].forEach(gx => {
    ctx.beginPath()
    ctx.moveTo(x+gx,y-s*0.85); ctx.lineTo(x+gx,y-s*0.64)
    ctx.moveTo(x+gx-s*0.08,y-s*0.76); ctx.lineTo(x+gx,y-s*0.85); ctx.lineTo(x+gx+s*0.08,y-s*0.76)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x+gx-s*0.08,y+s*0.30); ctx.lineTo(x+gx+s*0.08,y+s*0.46)
    ctx.moveTo(x+gx+s*0.08,y+s*0.30); ctx.lineTo(x+gx-s*0.08,y+s*0.46)
    ctx.stroke()
  })
}

// ── Master object renderer ────────────────────────────────────────────
function drawCyberObject(ctx, obj, cn, cR, cG, cB) {
  const { x, y, s, type, label } = obj

  // Filled shapes: punch interior with bg color so glow only shows at edge
  ctx.save()
  ctx.fillStyle = `rgb(${BG[0]},${BG[1]},${BG[2]})`
  if (type === 'shield') {
    ctx.beginPath()
    ctx.moveTo(x,y-s); ctx.lineTo(x+s*0.75,y-s*0.45); ctx.lineTo(x+s*0.75,y+s*0.15)
    ctx.bezierCurveTo(x+s*0.72,y+s*0.78, x+s*0.22,y+s*0.92, x, y+s)
    ctx.bezierCurveTo(x-s*0.22,y+s*0.92, x-s*0.72,y+s*0.78, x-s*0.75,y+s*0.15)
    ctx.lineTo(x-s*0.75,y-s*0.45); ctx.closePath(); ctx.fill()
  } else if (type === 'eye') {
    ctx.beginPath()
    ctx.moveTo(x-s,y)
    ctx.quadraticCurveTo(x-s*0.1,y-s*0.52, x,y-s*0.10)
    ctx.quadraticCurveTo(x+s*0.1,y-s*0.52, x+s,y)
    ctx.quadraticCurveTo(x+s*0.1,y+s*0.52, x,y+s*0.10)
    ctx.quadraticCurveTo(x-s*0.1,y+s*0.52, x-s,y)
    ctx.closePath(); ctx.fill()
  } else if (type === 'hexagon') {
    ctx.beginPath()
    for (let i=0;i<6;i++){const a=(i/6)*Math.PI*2-Math.PI/2;i===0?ctx.moveTo(x+Math.cos(a)*s,y+Math.sin(a)*s):ctx.lineTo(x+Math.cos(a)*s,y+Math.sin(a)*s)}
    ctx.closePath(); ctx.fill()
  }
  ctx.restore()

  if (cn <= 0.008) return

  // Outer diffuse halo
  ctx.save()
  const glow = ctx.createRadialGradient(x, y, s*0.2, x, y, s*2.4)
  glow.addColorStop(0,   `rgba(${cR},${cG},${cB},${cn*0.18})`)
  glow.addColorStop(0.5, `rgba(${cR},${cG},${cB},${cn*0.06})`)
  glow.addColorStop(1,   `rgba(${cR},${cG},${cB},0)`)
  ctx.beginPath(); ctx.arc(x, y, s*2.4, 0, Math.PI*2)
  ctx.fillStyle = glow; ctx.fill()
  ctx.restore()

  // Neon stroke — the main reveal effect
  ctx.save()
  ctx.strokeStyle = `rgba(${cR},${cG},${cB},${Math.min(1, cn*0.92)})`
  ctx.fillStyle   = `rgba(${cR},${cG},${cB},${Math.min(1, cn*0.92)})`
  ctx.lineWidth   = 1.0 + cn * 0.9
  ctx.lineCap     = 'round'; ctx.lineJoin = 'round'
  ctx.shadowColor = `rgba(${cR},${cG},${cB},${Math.min(1, cn)})`
  ctx.shadowBlur  = 8 + s*0.10*cn

  if      (type==='shield')      strokeShield(ctx,x,y,s)
  else if (type==='lock')        strokeLock(ctx,x,y,s)
  else if (type==='eye')         strokeEye(ctx,x,y,s)
  else if (type==='circuit')     strokeCircuit(ctx,x,y,s)
  else if (type==='key')         strokeKey(ctx,x,y,s)
  else if (type==='radar')       strokeRadar(ctx,x,y,s)
  else if (type==='node')        strokeNode(ctx,x,y,s)
  else if (type==='skull')       strokeSkull(ctx,x,y,s)
  else if (type==='dna')         strokeDNA(ctx,x,y,s)
  else if (type==='fingerprint') strokeFingerprint(ctx,x,y,s)
  else if (type==='server')      strokeServer(ctx,x,y,s)
  else if (type==='wifi')        strokeWifi(ctx,x,y,s)
  else if (type==='hexagon')     strokeHexagon(ctx,x,y,s)
  else if (type==='badge')       strokeBadge(ctx,x,y,s,label)
  else if (type==='satellite')   strokeSatellite(ctx,x,y,s)
  else if (type==='firewall')    strokeFirewall(ctx,x,y,s)

  ctx.restore()
}

// ─────────────────────────────────────────────────────────────────────
export default function HologramBg({ page = '/' }) {
  const canvasRef     = useRef(null)
  const animRef       = useRef(null)
  const starsRef      = useRef([])
  const objectsRef    = useRef([])
  const cometColorRef = useRef({ r:0, g:255, b:136 })
  const themeRef      = useRef(PAGE_THEMES[page] || PAGE_THEMES['/'])

  // Reassign object types immediately when page changes
  useEffect(() => {
    const theme = PAGE_THEMES[page] || PAGE_THEMES['/']
    themeRef.current = theme
    const { pool, labels } = theme
    objectsRef.current.forEach(o => {
      const t = pickFrom(pool)
      o.type  = t
      o.label = t === 'badge' ? pickFrom(labels) : null
    })
  }, [page])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function assignType(def, W, H) {
      const { pool, labels } = themeRef.current
      const type = pickFrom(pool)
      return {
        ...def,
        x: def.xF * W, y: def.yF * H,
        cometNear: 0, type,
        label: type === 'badge' ? pickFrom(labels) : null,
      }
    }

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      objectsRef.current = OBJECTS_LAYOUT.map(def =>
        assignType(def, canvas.width, canvas.height)
      )
    }

    starsRef.current = LANES.map((lane, i) => ({
      ...buildStar(lane), active: false, timer: rand(i * 0.8, i * 0.8 + 3.5),
    }))

    resize()
    window.addEventListener('resize', resize)
    let lastTs = 0

    function draw(ts) {
      const dt      = Math.min((ts - lastTs) * 0.001, 0.05)
      lastTs        = ts
      const stars   = starsRef.current
      const objects = objectsRef.current
      const cc      = cometColorRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Starfield
      STARFIELD.forEach(st => {
        ctx.beginPath()
        ctx.arc(st.xF*canvas.width, st.yF*canvas.height, st.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(175,198,255,${st.a})`; ctx.fill()
      })

      // Move objects + reassign type on wrap (creates 20-min variety)
      objects.forEach(o => {
        o.x += o.vx * dt; o.y += o.vy * dt
        const pad = o.s * 3
        function respawn(o) {
          const { pool, labels } = themeRef.current
          o.type  = pickFrom(pool)
          o.label = o.type === 'badge' ? pickFrom(labels) : null
        }
        if (o.x < -pad)                { o.x = canvas.width  + pad; respawn(o) }
        if (o.x > canvas.width  + pad) { o.x = -pad;               respawn(o) }
        if (o.y < -pad)                { o.y = canvas.height + pad; respawn(o) }
        if (o.y > canvas.height + pad) { o.y = -pad;               respawn(o) }
        o.cometNear = 0
      })

      // Comet → object illumination
      stars.forEach(star => {
        if (!star.active) return
        const { r: cR, g: cG, b: cB } = star.type
        objects.forEach(obj => {
          const dx=star.x-obj.x, dy=star.y-obj.y
          const inf = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) / COMET_REACH)
          if (inf > obj.cometNear) {
            obj.cometNear = inf
            cometColorRef.current = { r:cR, g:cG, b:cB }
          }
        })
      })

      // Draw objects
      objects.forEach(o => drawCyberObject(ctx, o, o.cometNear, cc.r, cc.g, cc.b))

      // Shooting stars
      stars.forEach(star => {
        if (!star.active) {
          star.timer -= dt
          if (star.timer <= 0) Object.assign(star, buildStar(star.lane))
          return
        }

        const { type, cos, sin } = star
        const { r, g, b } = type
        const dist = type.speed * dt
        const prevX = star.x, prevY = star.y
        star.x += cos * dist; star.y += sin * dist

        // Smoke particles
        const steps = Math.max(1, Math.round(dist / 6))
        for (let i = 0; i < steps; i++) {
          if (Math.random() < 0.52) {
            const f = i / steps
            star.smoke.push({
              x: prevX+(star.x-prevX)*f+(Math.random()-0.5)*3,
              y: prevY+(star.y-prevY)*f+(Math.random()-0.5)*3,
              vx: -cos*rand(0.05,0.22), vy: (Math.random()-0.5)*0.38,
              life: rand(0.65,0.85), decay: rand(0.015,0.026),
              rad: rand(0.4,2.2), grow: rand(0.014,0.026), grav: rand(0.003,0.007),
            })
          }
        }
        star.smoke = star.smoke.filter(p => p.life > 0)
        star.smoke.forEach(p => {
          p.x+=p.vx; p.y+=p.vy; p.vy+=p.grav; p.rad+=p.grow; p.life-=p.decay
          if (p.life<=0) return
          ctx.beginPath(); ctx.arc(p.x,p.y,p.rad*2.2,0,Math.PI*2)
          ctx.fillStyle=`rgba(${r},${g},${b},${p.life*0.07})`; ctx.fill()
          ctx.beginPath(); ctx.arc(p.x,p.y,p.rad*0.48,0,Math.PI*2)
          ctx.fillStyle=`rgba(${r},${g},${b},${p.life*0.30})`; ctx.fill()
        })

        const tailX = star.x - cos*type.tailLen, tailY = star.y - sin*type.tailLen

        // Glow tail
        ctx.save()
        ctx.shadowColor=`rgba(${r},${g},${b},0.45)`; ctx.shadowBlur=type.glowW*3
        const gG=ctx.createLinearGradient(tailX,tailY,star.x,star.y)
        gG.addColorStop(0,`rgba(${r},${g},${b},0)`)
        gG.addColorStop(0.55,`rgba(${r},${g},${b},${type.glowA*0.25})`)
        gG.addColorStop(0.88,`rgba(${r},${g},${b},${type.glowA*0.75})`)
        gG.addColorStop(1,`rgba(${r},${g},${b},${type.glowA})`)
        ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(star.x,star.y)
        ctx.strokeStyle=gG; ctx.lineWidth=type.glowW; ctx.lineCap='round'; ctx.stroke()
        ctx.restore()

        // Ion core
        const gC=ctx.createLinearGradient(tailX,tailY,star.x,star.y)
        gC.addColorStop(0,`rgba(${r},${g},${b},0)`)
        gC.addColorStop(0.70,`rgba(${r},${g},${b},0.72)`)
        gC.addColorStop(0.94,`rgba(255,255,255,0.90)`)
        gC.addColorStop(1,`rgba(255,255,255,1)`)
        ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(star.x,star.y)
        ctx.strokeStyle=gC; ctx.lineWidth=type.width; ctx.lineCap='round'; ctx.stroke()

        // Head nucleus
        const hx=star.x, hy=star.y
        const c1=ctx.createRadialGradient(hx,hy,0,hx,hy,type.headR*2.3)
        c1.addColorStop(0,`rgba(255,255,255,${type.headA*0.52})`)
        c1.addColorStop(0.28,`rgba(${r},${g},${b},${type.headA*0.38})`)
        c1.addColorStop(1,`rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(hx,hy,type.headR*2.3,0,Math.PI*2); ctx.fillStyle=c1; ctx.fill()
        const c2=ctx.createRadialGradient(hx,hy,0,hx,hy,type.headR)
        c2.addColorStop(0,`rgba(255,255,255,${type.headA})`)
        c2.addColorStop(0.45,`rgba(${r},${g},${b},${type.headA*0.80})`)
        c2.addColorStop(1,`rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(hx,hy,type.headR,0,Math.PI*2); ctx.fillStyle=c2; ctx.fill()

        if (star.x > canvas.width + type.tailLen + 40) {
          star.active=false; star.timer=rand(...star.lane.interval); star.smoke=[]
        }
      })

      // Vignette
      const vig=ctx.createRadialGradient(
        canvas.width*0.5,canvas.height*0.5,canvas.height*0.18,
        canvas.width*0.5,canvas.height*0.5,canvas.height*0.84
      )
      vig.addColorStop(0,'rgba(5,9,28,0)'); vig.addColorStop(1,'rgba(5,9,28,0.55)')
      ctx.fillStyle=vig; ctx.fillRect(0,0,canvas.width,canvas.height)

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position:'fixed',top:0,left:0,width:'100%',height:'100%',
      zIndex:0,pointerEvents:'none',
    }}/>
  )
}
