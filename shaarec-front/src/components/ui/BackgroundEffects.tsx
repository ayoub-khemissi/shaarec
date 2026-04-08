"use client";

import { motion } from "framer-motion";

// Pseudo-random déterministe à partir d'un seed
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const SHAPE_TYPES = [
  "atom", "hexagon", "cross", "protractor", "triangle", "diamond",
  "ruler", "ring", "dot", "erlenmeyer", "testtube", "thermometer",
  "equation", "integral", "sigma", "pi", "infinity",
] as const;

// Emplacements épars sur le pourtour — pas de colonnes, bien dispersés
const SLOTS = [
  // Haut (y >= 12 pour ne pas être coupé par le header)
  { x: 8, y: 14 }, { x: 35, y: 12 }, { x: 65, y: 15 }, { x: 92, y: 13 },
  // Gauche
  { x: 3, y: 30 }, { x: 5, y: 70 },
  // Droite
  { x: 93, y: 35 }, { x: 90, y: 75 },
  // Bas (y <= 82 pour ne pas être coupé)
  { x: 10, y: 78 }, { x: 45, y: 82 }, { x: 75, y: 76 }, { x: 95, y: 80 },
];

function generateShapes(seed: number) {
  const rand = seededRandom(seed);
  // Mélanger les slots avec le seed
  const shuffled = [...SLOTS].sort(() => rand() - 0.5);
  const count = 7 + Math.floor(rand() * 3); // 7-9 formes
  const shapes = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const type = SHAPE_TYPES[Math.floor(rand() * SHAPE_TYPES.length)];
    const isDot = type === "dot";
    const isText = ["equation", "integral", "sigma", "pi", "infinity"].includes(type);
    const slot = shuffled[i];
    // Offset aléatoire pour casser la rigidité
    const jitterX = Math.floor(rand() * 14) - 7;
    const jitterY = Math.floor(rand() * 14) - 7;
    shapes.push({
      type,
      x: `${Math.max(1, Math.min(96, slot.x + jitterX))}%`,
      y: `${Math.max(1, Math.min(96, slot.y + jitterY))}%`,
      size: isDot ? 5 + Math.floor(rand() * 8) : isText ? 30 + Math.floor(rand() * 35) : 30 + Math.floor(rand() * 50),
      duration: 18 + Math.floor(rand() * 20),
      rotate: (rand() > 0.5 ? 1 : -1) * (rand() > 0.3 ? 180 + Math.floor(rand() * 180) : 0),
    });
  }
  return shapes;
}

// Chaque seed donne un layout unique et stable (pas de re-random au re-render)
const SHAPE_SETS: Record<string, ReturnType<typeof generateShapes>> = {
  default: generateShapes(42),
  accent: generateShapes(137),
  warm: generateShapes(256),
  "default-2": generateShapes(789),
  "accent-2": generateShapes(1024),
  "warm-2": generateShapes(512),
};

/** Formes géométriques flottantes décoratives */
export function FloatingShapes({
  variant = "default",
  seed,
  spread = "edges",
  opacity = "normal",
}: {
  variant?: "default" | "accent" | "warm";
  seed?: string;
  spread?: "edges" | "wide";
  opacity?: "normal" | "low";
}) {
  const palette = {
    default: { stroke: "stroke-accent/35", fill: "fill-accent/10" },
    accent: { stroke: "stroke-accent/40", fill: "fill-accent/12" },
    warm: { stroke: "stroke-sahara/50", fill: "fill-sahara/15" },
  };
  const { stroke, fill } = palette[variant];

  const key = seed || variant;
  const allShapes = SHAPE_SETS[key] || generateShapes(key.split("").reduce((a, c) => a + c.charCodeAt(0), 0));

  // En mode "wide", on recentre les formes (slots bords → plus vers le centre)
  const shapes = spread === "wide"
    ? allShapes.map((s) => {
        const x = parseInt(s.x);
        const nudgedX = x < 50 ? x + 15 : x - 15;
        return { ...s, x: `${nudgedX}%` };
      })
    : allShapes;

  const containerOpacity = opacity === "low" ? "opacity-50" : "";

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${containerOpacity}`}>
      {shapes.map((s, i) => {
        const hideMobile = i >= 5 ? " hidden sm:block" : "";
        return (
        <motion.div
          key={i}
          className={`absolute${hideMobile}`}
          style={{ left: s.x, top: s.y }}
          animate={{
            rotate: s.rotate,
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            rotate: { duration: s.duration, repeat: Infinity, ease: "linear" },
            y: { duration: s.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg width={s.size} height={s.size} viewBox={`0 0 ${s.size} ${s.size}`} className="scale-60 sm:scale-100 origin-center">
            {s.type === "ring" && (
              <circle
                cx={s.size / 2} cy={s.size / 2} r={s.size / 2 - 3}
                className={`${stroke} fill-none`}
                strokeWidth={2}
                strokeDasharray="10 5"
              />
            )}
            {s.type === "diamond" && (
              <rect
                x={s.size * 0.15} y={s.size * 0.15}
                width={s.size * 0.7} height={s.size * 0.7}
                className={`${stroke} ${fill}`}
                strokeWidth={2}
                transform={`rotate(45 ${s.size / 2} ${s.size / 2})`}
              />
            )}
            {s.type === "cross" && (
              <g className={stroke} strokeWidth={2} strokeLinecap="round">
                <line x1={s.size / 2} y1={4} x2={s.size / 2} y2={s.size - 4} />
                <line x1={4} y1={s.size / 2} x2={s.size - 4} y2={s.size / 2} />
              </g>
            )}
            {s.type === "triangle" && (
              <polygon
                points={`${s.size / 2},3 ${s.size - 3},${s.size - 3} 3,${s.size - 3}`}
                className={`${stroke} ${fill}`}
                strokeWidth={2}
                strokeLinejoin="round"
              />
            )}
            {s.type === "dot" && (
              <circle
                cx={s.size / 2} cy={s.size / 2} r={s.size / 2 - 1}
                className={`${stroke} ${fill}`}
                strokeWidth={1}
              />
            )}
            {s.type === "atom" && (
              <g className={stroke} strokeWidth={1.5} fill="none">
                <ellipse cx={s.size / 2} cy={s.size / 2} rx={s.size * 0.42} ry={s.size * 0.18} />
                <ellipse cx={s.size / 2} cy={s.size / 2} rx={s.size * 0.42} ry={s.size * 0.18} transform={`rotate(60 ${s.size / 2} ${s.size / 2})`} />
                <ellipse cx={s.size / 2} cy={s.size / 2} rx={s.size * 0.42} ry={s.size * 0.18} transform={`rotate(120 ${s.size / 2} ${s.size / 2})`} />
                <circle cx={s.size / 2} cy={s.size / 2} r={3} className={fill} />
              </g>
            )}
            {s.type === "hexagon" && (() => {
              const cx = s.size / 2, cy = s.size / 2, r = s.size * 0.42;
              const pts = Array.from({ length: 6 }, (_, i) => {
                const a = (Math.PI / 3) * i - Math.PI / 6;
                return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
              }).join(" ");
              return <polygon points={pts} className={`${stroke} ${fill}`} strokeWidth={1.5} strokeLinejoin="round" />;
            })()}
            {s.type === "protractor" && (
              <g className={stroke} strokeWidth={2} fill="none">
                <path d={`M ${s.size * 0.1} ${s.size * 0.8} A ${s.size * 0.4} ${s.size * 0.4} 0 0 1 ${s.size * 0.9} ${s.size * 0.8}`} />
                <line x1={s.size * 0.1} y1={s.size * 0.8} x2={s.size * 0.9} y2={s.size * 0.8} />
                {[30, 60, 90, 120, 150].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const r1 = s.size * 0.35, r2 = s.size * 0.4;
                  const cx = s.size / 2, cy = s.size * 0.8;
                  return <line key={deg}
                    x1={cx - r1 * Math.cos(rad)} y1={cy - r1 * Math.sin(rad)}
                    x2={cx - r2 * Math.cos(rad)} y2={cy - r2 * Math.sin(rad)}
                  />;
                })}
              </g>
            )}
            {s.type === "ruler" && (
              <g className={stroke} strokeWidth={1.5} fill="none">
                <rect x={2} y={s.size * 0.3} width={s.size - 4} height={s.size * 0.4} rx={2} />
                {Array.from({ length: 9 }, (_, i) => {
                  const x = ((i + 1) * (s.size - 4)) / 10 + 2;
                  const h = i % 2 === 0 ? s.size * 0.15 : s.size * 0.08;
                  return <line key={i} x1={x} y1={s.size * 0.3} x2={x} y2={s.size * 0.3 + h} />;
                })}
              </g>
            )}
            {/* ── Erlenmeyer flask ── */}
            {s.type === "erlenmeyer" && (
              <g className={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d={`M${s.size * 0.38},${s.size * 0.08} L${s.size * 0.38},${s.size * 0.4} L${s.size * 0.1},${s.size * 0.88} Q${s.size * 0.1},${s.size * 0.95} ${s.size * 0.2},${s.size * 0.95} L${s.size * 0.8},${s.size * 0.95} Q${s.size * 0.9},${s.size * 0.95} ${s.size * 0.9},${s.size * 0.88} L${s.size * 0.62},${s.size * 0.4} L${s.size * 0.62},${s.size * 0.08}`} />
                <line x1={s.size * 0.33} y1={s.size * 0.08} x2={s.size * 0.67} y2={s.size * 0.08} />
              </g>
            )}
            {/* ── Test tube ── */}
            {s.type === "testtube" && (
              <g className={stroke} strokeWidth={2} strokeLinecap="round" fill="none">
                <path d={`M${s.size * 0.35},${s.size * 0.1} L${s.size * 0.35},${s.size * 0.75} Q${s.size * 0.35},${s.size * 0.92} ${s.size * 0.5},${s.size * 0.92} Q${s.size * 0.65},${s.size * 0.92} ${s.size * 0.65},${s.size * 0.75} L${s.size * 0.65},${s.size * 0.1}`} />
                <line x1={s.size * 0.28} y1={s.size * 0.1} x2={s.size * 0.72} y2={s.size * 0.1} />
                <line x1={s.size * 0.35} y1={s.size * 0.35} x2={s.size * 0.65} y2={s.size * 0.35} strokeDasharray="3 3" />
              </g>
            )}
            {/* ── Thermometer ── */}
            {s.type === "thermometer" && (
              <g className={stroke} strokeWidth={2} fill="none">
                <path d={`M${s.size * 0.5},${s.size * 0.1} L${s.size * 0.5},${s.size * 0.65}`} />
                <circle cx={s.size * 0.5} cy={s.size * 0.78} r={s.size * 0.14} />
                <circle cx={s.size * 0.5} cy={s.size * 0.78} r={s.size * 0.06} className={fill} />
                {[0.2, 0.32, 0.44, 0.56].map((py) => (
                  <line key={py} x1={s.size * 0.55} y1={s.size * py} x2={s.size * 0.62} y2={s.size * py} />
                ))}
              </g>
            )}
            {/* ── Math: E=mc² style equation ── */}
            {s.type === "equation" && (
              <text
                x={s.size / 2} y={s.size / 2}
                textAnchor="middle" dominantBaseline="central"
                className={`${stroke} fill-current opacity-25`}
                style={{ fontSize: s.size * 0.3, fontFamily: "serif", fontStyle: "italic" }}
              >
                E=mc²
              </text>
            )}
            {/* ── Integral sign ── */}
            {s.type === "integral" && (
              <text
                x={s.size / 2} y={s.size / 2}
                textAnchor="middle" dominantBaseline="central"
                className={`${stroke} fill-current opacity-25`}
                style={{ fontSize: s.size * 0.7, fontFamily: "serif" }}
              >
                ∫
              </text>
            )}
            {/* ── Sigma ── */}
            {s.type === "sigma" && (
              <text
                x={s.size / 2} y={s.size / 2}
                textAnchor="middle" dominantBaseline="central"
                className={`${stroke} fill-current opacity-25`}
                style={{ fontSize: s.size * 0.7, fontFamily: "serif" }}
              >
                Σ
              </text>
            )}
            {/* ── Pi ── */}
            {s.type === "pi" && (
              <text
                x={s.size / 2} y={s.size / 2}
                textAnchor="middle" dominantBaseline="central"
                className={`${stroke} fill-current opacity-25`}
                style={{ fontSize: s.size * 0.7, fontFamily: "serif" }}
              >
                π
              </text>
            )}
            {/* ── Infinity ── */}
            {s.type === "infinity" && (
              <text
                x={s.size / 2} y={s.size / 2}
                textAnchor="middle" dominantBaseline="central"
                className={`${stroke} fill-current opacity-25`}
                style={{ fontSize: s.size * 0.6, fontFamily: "serif" }}
              >
                ∞
              </text>
            )}
          </svg>
        </motion.div>
        );
      })}
    </div>
  );
}

/** Grille de points subtile */
export function DotPattern() {
  return (
    <div
      className="absolute inset-0 -z-10 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

/** Séparateur organique en vague */
export function WaveDivider({
  flip = false,
  color = "fill-background",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-full h-10 sm:h-16 ${color}`}
      >
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}

/** Séparateur diagonal */
export function DiagonalDivider({
  flip = false,
  color = "fill-background",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`w-full h-8 sm:h-12 ${color}`}
      >
        <path d="M0,60 L1440,0 L1440,60 Z" />
      </svg>
    </div>
  );
}

/** Lignes décoratives latérales */
export function SideLines() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Ligne gauche */}
      <motion.div
        className="absolute start-8 sm:start-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ligne droite */}
      <motion.div
        className="absolute end-8 sm:end-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * Fond cassé en 3 parties diagonales avec dégradé de couleurs
 * Couleur foncée → moyenne → claire
 */
export function CrackedGradient({ palette = "accent" }: { palette?: "accent" | "warm" | "ocean" }) {
  const colors = {
    accent: {
      dark: "var(--foreground)",
      mid: "var(--accent)",
      light: "var(--oasis-light)",
    },
    warm: {
      dark: "var(--foreground)",
      mid: "var(--sahara)",
      light: "var(--sand-dark)",
    },
    ocean: {
      dark: "oklch(0.45 0.15 240)",
      mid: "oklch(0.60 0.12 220)",
      light: "oklch(0.75 0.08 210)",
    },
  };
  const c = colors[palette];
  const id = `cracked-${palette}`;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Zone 1 — foncée */}
        <polygon
          points="0,0 100,0 0,50"
          fill={c.dark}
          opacity={0.12}
        />

        {/* Zone 2 — moyenne */}
        <polygon
          points="0,50 100,0 0,85"
          fill={c.mid}
          opacity={0.10}
        />

        {/* Zone 3 — claire */}
        <polygon
          points="0,85 100,0 100,100 0,100"
          fill={c.light}
          opacity={0.06}
        />
      </svg>
    </div>
  );
}

/** Grille perspective avec fade radial */
export function GridLines() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.04]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          mask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}
