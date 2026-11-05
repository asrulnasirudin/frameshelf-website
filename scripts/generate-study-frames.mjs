// Generates the Study-mode sample clip: a 48-frame bouncing-ball animation drawn as
// an authentic animator's line-test / lightbox exposure sheet with 12-field grid,
// ACME registration pegs, non-repro cyan guides, and volume-preserving squash & stretch.
// Original artwork; regenerate with `node scripts/generate-study-frames.mjs`.
// To swap the clip, replace the files in public/media/study and update
// `studyClip` in src/data/sampleLibrary.ts.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media', 'study');
mkdirSync(outDir, { recursive: true });

const W = 960;
const H = 540;
const GROUND = 430;
const R = 32;
const FRAMES = 48;

/** Piecewise parabolic height above the ground for frame f (0-based). */
function height(f) {
  const arc = (centre, half, apex) => apex * (1 - ((f - centre) / half) ** 2);
  if (f <= 10) return 290 * (1 - (f / 10) ** 2);
  if (f <= 28) return Math.max(0, arc(19, 9, 195));
  if (f <= 42) return Math.max(0, arc(35, 7, 105));
  return Math.max(0, arc(45, 3, 38));
}

function xAt(f) {
  const t = f / (FRAMES - 1);
  return 140 + 680 * (1 - (1 - t) ** 1.45);
}

function ballAt(f) {
  const h = Math.max(0, height(f));
  let sx;
  let sy;
  let angle;

  if (h < 0.8) {
    // Impact squash at ground
    sx = 1.35;
    sy = 0.68;
    angle = 0;
  } else {
    // Dynamic stretch along velocity vector
    const nextH = height(Math.min(f + 1, FRAMES - 1));
    const prevH = height(Math.max(f - 1, 0));
    const vy = (nextH - prevH) / 2;
    const vx = (xAt(Math.min(f + 1, FRAMES - 1)) - xAt(Math.max(f - 1, 0))) / 2;
    const speed = Math.hypot(vx, vy);
    angle = (Math.atan2(-vy, vx) * 180) / Math.PI;

    const stretch = Math.min(0.28, speed * 0.009);
    sx = 1 + stretch;
    sy = 1 / sx;
  }

  return {
    f,
    x: xAt(f),
    cy: GROUND - h - R * sy,
    rx: R * sx,
    ry: R * sy,
    h,
    angle,
  };
}

// Precompute full arc path for the non-repro cyan guide
const arcPoints = Array.from({ length: FRAMES }, (_, f) => {
  const b = ballAt(f);
  return `${f === 0 ? 'M' : 'L'}${b.x.toFixed(1)} ${b.cy.toFixed(1)}`;
}).join(' ');

function lightbox(f) {
  const frameNum = String(f + 1).padStart(3, '0');
  let timingLabel = 'SPACING';
  if (f === 10 || f === 28 || f === 42) timingLabel = 'CONTACT / SQUASH';
  else if (f === 19) timingLabel = 'KEY · APEX 01';
  else if (f === 35) timingLabel = 'KEY · APEX 02';
  else if (f <= 3 || f === 11 || f === 29) timingLabel = 'BREAKDOWN · STRETCH';

  return `<!-- Lightbox desk base -->
<rect width="${W}" height="${H}" fill="#141312"/>

<!-- Illuminated drawing vellum area -->
<rect x="24" y="20" width="912" height="466" rx="4" fill="#1a1917" stroke="#2a2825" stroke-width="1"/>

<!-- 12-Field Animation Guide Grid (Non-repro Cyan) -->
<g stroke="#263b4a" stroke-width="0.8">
  <!-- Outer 12-field boundary -->
  <rect x="72" y="46" width="816" height="400" fill="none" stroke="#2e485a" stroke-width="1.2"/>
  <!-- 10-field safety -->
  <rect x="140" y="80" width="680" height="332" fill="none" stroke-dasharray="3 4"/>
  <!-- 8-field safety -->
  <rect x="208" y="114" width="544" height="264" fill="none" stroke-dasharray="3 4"/>
  <!-- Center crosshair -->
  <path d="M465 246H495 M480 231V261" stroke="#3d637c" stroke-width="1.2"/>
  <!-- Corner registration ticks -->
  <path d="M72 46L92 66 M888 46L868 66 M72 446L92 426 M888 446L868 426" stroke="#2e485a" stroke-width="1"/>
  <!-- Field ruler ticks along center axis -->
  <path d="M276 242V250 M344 242V250 M412 242V250 M548 242V250 M616 242V250 M684 242V250" stroke="#2e485a"/>
</g>

<!-- Ground baseline with technical drafting ticks -->
<path d="M72 ${GROUND}H888" stroke="#365469" stroke-width="1.5"/>
<g stroke="#243845" stroke-width="1">
  <path d="M120 ${GROUND}l-5 8 M200 ${GROUND}l-5 8 M280 ${GROUND}l-5 8 M360 ${GROUND}l-5 8 M440 ${GROUND}l-5 8 M520 ${GROUND}l-5 8 M600 ${GROUND}l-5 8 M680 ${GROUND}l-5 8 M760 ${GROUND}l-5 8 M840 ${GROUND}l-5 8"/>
</g>

<!-- Arc trajectory guide in cyan non-repro pencil -->
<path d="${arcPoints}" fill="none" stroke="#2e4d61" stroke-width="1.2" stroke-dasharray="3 4"/>

<!-- ACME Registration Peg Bar along bottom -->
<rect x="24" y="492" width="912" height="38" fill="#100f0e" stroke="#23211f" stroke-width="1"/>
<!-- Center circular peg hole -->
<circle cx="480" cy="511" r="7" fill="#090807" stroke="#302d2a" stroke-width="1.2"/>
<!-- Left oblong peg hole -->
<rect x="210" y="505" width="28" height="12" rx="6" fill="#090807" stroke="#302d2a" stroke-width="1.2"/>
<!-- Right oblong peg hole -->
<rect x="722" y="505" width="28" height="12" rx="6" fill="#090807" stroke="#302d2a" stroke-width="1.2"/>
<text x="480" y="525" text-anchor="middle" fill="#4d4740" font-family="ui-monospace, monospace" font-size="7.5" letter-spacing="1.5">ACME STANDARD REGISTRATION</text>

<!-- Production Exposure Sheet Stamping -->
<g font-family="ui-monospace, 'Cascadia Mono', 'SF Mono', monospace">
  <text x="80" y="38" fill="#3a5b70" font-size="10" letter-spacing="1.5">12 FIELD · SAFETY GRID</text>
  <text x="880" y="38" text-anchor="end" fill="#5c564e" font-size="9" letter-spacing="1.5">STUDY REF · BOUNCE TEST · 24 FPS</text>
  <text x="880" y="70" text-anchor="end" fill="#d97757" font-size="12" font-weight="600" letter-spacing="0.5">FR ${frameNum} / 048</text>
  <text x="880" y="86" text-anchor="end" fill="#6e685f" font-size="9" letter-spacing="1">${timingLabel}</text>
</g>`;
}

function ball(b, opacity = 1) {
  const shadowW = Math.max(10, 48 * (1 - b.h / 380));
  const shadowO = (0.55 * Math.max(0, 1 - b.h / 340)).toFixed(3);

  return `<g opacity="${opacity}">
  <!-- Ground contact shadow -->
  <ellipse cx="${b.x.toFixed(1)}" cy="${GROUND + 3}" rx="${shadowW.toFixed(1)}" ry="5" fill="#070605" opacity="${shadowO}"/>
  
  <!-- Ball volume with dynamic tangent rotation -->
  <g transform="translate(${b.x.toFixed(1)}, ${b.cy.toFixed(1)}) rotate(${b.angle.toFixed(1)})">
    <!-- Volume core fill -->
    <ellipse cx="0" cy="0" rx="${b.rx.toFixed(1)}" ry="${b.ry.toFixed(1)}" fill="#d97757"/>
    <!-- Form shadow cel tier -->
    <path d="M ${(-b.rx * 0.2).toFixed(1)} ${(-b.ry).toFixed(1)} A ${b.rx.toFixed(1)} ${b.ry.toFixed(1)} 0 0 1 ${(b.rx * 0.8).toFixed(1)} ${(b.ry * 0.6).toFixed(1)} A ${(b.rx * 0.85).toFixed(1)} ${(b.ry * 0.85).toFixed(1)} 0 0 1 ${(-b.rx * 0.2).toFixed(1)} ${(-b.ry).toFixed(1)} Z" fill="#b05436" opacity="0.6"/>
    <!-- Chalk specular highlight -->
    <ellipse cx="${(-b.rx * 0.28).toFixed(1)}" cy="${(-b.ry * 0.3).toFixed(1)}" rx="${(b.rx * 0.32).toFixed(1)}" ry="${(b.ry * 0.22).toFixed(1)}" fill="#f9cfbe" opacity="0.85"/>
    <!-- Pencil graphite contour stroke -->
    <ellipse cx="0" cy="0" rx="${b.rx.toFixed(1)}" ry="${b.ry.toFixed(1)}" fill="none" stroke="#2a160f" stroke-width="2.4"/>
  </g>
</g>`;
}

const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>\n`;

// Generate all 48 frames
for (let f = 0; f < FRAMES; f++) {
  const name = `bounce-${String(f + 1).padStart(3, '0')}.svg`;
  writeFileSync(join(outDir, name), svg(lightbox(f) + ball(ballAt(f))));
}

// Generate the poster frame with onion-skinned spacing ghosts
const ghosts = Array.from({ length: FRAMES }, (_, f) =>
  f % 3 === 0 && f !== 19 ? ball(ballAt(f), 0.18) : '',
).join('');

writeFileSync(
  join(outDir, 'bounce-poster.svg'),
  svg(lightbox(19) + ghosts + ball(ballAt(19))),
);

console.log(`Wrote ${FRAMES} authentic animation line-test frames and poster to ${outDir}`);
