import React from 'react';
import { motion } from 'framer-motion';

// ─── Static configuration ─────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
    id:    i,
    x:     5  + ((i * 4.73 + 3.1) % 90),
    y:     5  + ((i * 9.31 + 7.7) % 90),
    size:  0.9 + (i % 4) * 0.55,
    dur:   3.8 + (i % 6) * 1.3,
    delay: (i * 0.29) % 3.2,
    cyan:  i % 3 === 0,
}));

const STATUS_LINES = [
    { text: 'Initializing Precision Systems',     delay: 1.30, accent: false },
    { text: 'Loading Instrumentation Modules',    delay: 1.72, accent: false },
    { text: 'Connecting Research Infrastructure', delay: 2.14, accent: false },
    { text: 'All Systems Operational',            delay: 2.56, accent: true  },
] as const;

const WAVE_A =
    'M0,30 C30,8 60,52 90,30 S150,8 180,30 S240,52 270,30 S330,8 360,30 ' +
    'S420,52 450,30 S510,8 540,30 S600,52 630,30 S690,8 720,30 ' +
    'S780,52 810,30 S870,8 900,30 S960,52 990,30 S1050,8 1080,30 ' +
    'S1140,52 1170,30 L1200,30';

const WAVE_B =
    'M0,38 C25,18 50,56 75,38 S125,18 150,38 S200,56 225,38 S275,18 300,38 ' +
    'S350,56 375,38 S425,18 450,38 S500,56 525,38 S575,18 600,38 ' +
    'S650,56 675,38 S725,18 750,38 S800,56 825,38 S875,18 900,38 ' +
    'S950,56 975,38 S1025,18 1050,38 S1100,56 1125,38 S1175,18 1200,38';

// Precision ring geometry — 260×260 SVG, centre at (130,130)
const CX = 130;
const CY = 130;
const CARDINAL_TICKS = [0, 90, 180, 270].map(deg => {
    const r = (deg - 90) * Math.PI / 180;
    return {
        x1: CX + 112 * Math.cos(r), y1: CY + 112 * Math.sin(r),
        x2: CX + 122 * Math.cos(r), y2: CY + 122 * Math.sin(r),
    };
});
const DIAG_TICKS = [45, 135, 225, 315].map(deg => {
    const r = (deg - 90) * Math.PI / 180;
    return {
        x1: CX + 116 * Math.cos(r), y1: CY + 116 * Math.sin(r),
        x2: CX + 120 * Math.cos(r), y2: CY + 120 * Math.sin(r),
    };
});

const BRACKETS = [
    { pos: { top: '4.5%', left: '3.5%'  }, d: 'M10,0 L0,0 L0,10' },
    { pos: { top: '4.5%', right: '3.5%' }, d: 'M0,0 L10,0 L10,10' },
    { pos: { bottom: '4.5%', left: '3.5%'  }, d: 'M0,10 L0,0' },
    { pos: { bottom: '4.5%', right: '3.5%' }, d: 'M10,10 L10,0' },
] as const;

const HUD_LABELS = [
    { text: 'NI · SYS · 2025', top:    '4.5%', left:  'calc(3.5% + 16px)' },
    { text: 'REV · 04 · PROD', top:    '4.5%', right: 'calc(3.5% + 16px)' },
    { text: 'INITIALIZED',     bottom: '4.5%', left:  'calc(3.5% + 16px)' },
    { text: 'v3.0 · STABLE',   bottom: '4.5%', right: 'calc(3.5% + 16px)' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
    React.useEffect(() => {
        const t = setTimeout(onComplete, 3300);
        return () => clearTimeout(t);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.018,
                filter: 'blur(14px)',
                transition: { duration: 0.75, ease: [0.4, 0, 0.6, 1] },
            }}
            transition={{ duration: 0.38 }}
            className="fixed inset-0 z-[100] overflow-hidden select-none"
            style={{ backgroundColor: '#040E21' }}
            aria-label="Loading Niyantran Instruments"
            role="status"
        >
            {/* ── FILM GRAIN ────────────────────────────────────────────── */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.042,
                    backgroundImage:
                        // eslint-disable-next-line max-len
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '256px 256px',
                }}
            />

            {/* ── RADIAL GLOWS ──────────────────────────────────────────── */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(27,78,216,0.17) 0%, transparent 65%)' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-0 right-0 w-[620px] h-[620px]"
                    style={{ background: 'radial-gradient(ellipse at 82% 14%, rgba(14,165,233,0.046) 0%, transparent 65%)' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[600px] h-[600px]"
                    style={{ background: 'radial-gradient(ellipse at 17% 84%, rgba(27,78,216,0.055) 0%, transparent 65%)' }}
                />
            </div>

            {/* ── DOT GRID ──────────────────────────────────────────────── */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.17) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />

            {/* ── BLUEPRINT HAIRLINES — H ───────────────────────────────── */}
            {([12, 28, 50, 72, 88] as const).map((yPct, i) => (
                <motion.div
                    key={`h${i}`}
                    aria-hidden
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.88, ease: 'easeOut' }}
                    className="absolute left-0 right-0 h-px origin-left pointer-events-none"
                    style={{
                        top: `${yPct}%`,
                        background: `linear-gradient(90deg,
                            transparent 0%,
                            rgba(59,130,246,${yPct === 50 ? 0.10 : 0.043}) 14%,
                            rgba(59,130,246,${yPct === 50 ? 0.13 : 0.062}) 50%,
                            rgba(59,130,246,${yPct === 50 ? 0.10 : 0.043}) 86%,
                            transparent 100%)`,
                    }}
                />
            ))}

            {/* ── BLUEPRINT HAIRLINES — V ───────────────────────────────── */}
            {([8, 25, 50, 75, 92] as const).map((xPct, i) => (
                <motion.div
                    key={`v${i}`}
                    aria-hidden
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 0.07 + i * 0.05, duration: 0.92, ease: 'easeOut' }}
                    className="absolute top-0 bottom-0 w-px origin-top pointer-events-none"
                    style={{
                        left: `${xPct}%`,
                        background: `linear-gradient(180deg,
                            transparent 0%,
                            rgba(59,130,246,${xPct === 50 ? 0.10 : 0.043}) 14%,
                            rgba(59,130,246,${xPct === 50 ? 0.13 : 0.062}) 50%,
                            rgba(59,130,246,${xPct === 50 ? 0.10 : 0.043}) 86%,
                            transparent 100%)`,
                    }}
                />
            ))}

            {/* ── SCAN SWEEP ────────────────────────────────────────────── */}
            <motion.div
                aria-hidden
                initial={{ top: '-3px', opacity: 0 } as React.CSSProperties}
                animate={{ top: '100vh', opacity: [0, 0.75, 0.55, 0] } as never}
                transition={{ duration: 2.9, delay: 0.18, ease: 'linear' }}
                className="absolute left-0 right-0 pointer-events-none z-10"
            >
                <div
                    className="h-px w-full"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.55) 28%, rgba(14,165,233,0.82) 50%, rgba(59,130,246,0.55) 72%, transparent 95%)',
                        boxShadow: '0 0 12px rgba(14,165,233,0.42)',
                    }}
                />
                <div
                    className="h-[72px] w-full"
                    style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.04) 0%, transparent 100%)' }}
                />
            </motion.div>

            {/* ── PARTICLES ─────────────────────────────────────────────── */}
            {PARTICLES.map(p => (
                <motion.div
                    key={p.id}
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, p.cyan ? 0.96 : 0.76, 0.38, 0.66, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `${p.x}%`,
                        top:  `${p.y}%`,
                        width:  `${p.size}px`,
                        height: `${p.size}px`,
                        background: p.cyan ? '#0EA5E9' : '#3B82F6',
                        boxShadow: `0 0 ${p.size * 6}px ${
                            p.cyan ? 'rgba(14,165,233,0.65)' : 'rgba(59,130,246,0.60)'
                        }`,
                    }}
                />
            ))}

            {/* ── WAVEFORM TRACES — bottom ──────────────────────────────── */}
            <div aria-hidden className="absolute bottom-[11%] left-0 right-0 pointer-events-none">
                <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
                    <motion.path
                        d={WAVE_A}
                        fill="none"
                        stroke="rgba(59,130,246,0.34)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.42, delay: 0.30, ease: 'easeInOut' }}
                    />
                    <motion.path
                        d={WAVE_B}
                        fill="none"
                        stroke="rgba(14,165,233,0.19)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.68, delay: 0.46, ease: 'easeInOut' }}
                    />
                    {/* Baseline */}
                    <motion.line
                        x1="0" y1="30" x2="1200" y2="30"
                        stroke="rgba(59,130,246,0.07)"
                        strokeWidth="0.5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.75, delay: 0.26 }}
                        style={{ transformOrigin: '0 30px' }}
                    />
                    {/* Moving probe dot */}
                    <motion.circle
                        cx={0} cy={30} r={2.5}
                        fill="#0EA5E9"
                        animate={{ cx: [0, 1200] }}
                        transition={{ duration: 2.3, delay: 0.48, ease: 'linear', repeat: Infinity, repeatDelay: 0.7 }}
                        style={{ filter: 'drop-shadow(0 0 5px rgba(14,165,233,0.9))' }}
                    />
                </svg>
            </div>

            {/* Faint secondary trace — upper */}
            <div aria-hidden className="absolute top-[15%] left-0 right-0 pointer-events-none opacity-35">
                <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none">
                    <motion.path
                        d="M0,20 C25,4 50,36 75,20 S125,4 150,20 S200,36 225,20 S275,4 300,20 S350,36 375,20 S425,4 450,20 S500,36 525,20 S575,4 600,20 S650,36 675,20 S725,4 750,20 S800,36 825,20 S875,4 900,20 S950,36 975,20 S1025,4 1050,20 S1100,36 1125,20 S1175,4 1200,20"
                        fill="none"
                        stroke="rgba(59,130,246,0.14)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.1, delay: 0.38 }}
                    />
                </svg>
            </div>

            {/* ── ATMOSPHERIC LIGHT ─────────────────────────────────────── */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3.1, delay: 0.55 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 55% 38% at 50% 46%, rgba(255,255,255,0.022) 0%, transparent 100%)',
                }}
            />

            {/* ── CENTER CONTENT ────────────────────────────────────────── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

                {/* ── LOGO + PRECISION RING ──────────────────────────── */}
                <div
                    className="relative flex-shrink-0 mb-11"
                    style={{ width: 88, height: 88 }}
                >
                    {/* Outer glow bloom */}
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.42 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2.2, delay: 0.60, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            inset: '-116px',
                            background: 'radial-gradient(circle, rgba(27,78,216,0.24) 0%, transparent 65%)',
                        }}
                    />
                    {/* Inner accent bloom */}
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.38 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            inset: '-66px',
                            background: 'radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%)',
                        }}
                    />

                    {/* Precision ring SVG — 260×260 centred on 88×88 logo */}
                    <motion.svg
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.55 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.18, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute pointer-events-none"
                        width="260"
                        height="260"
                        viewBox="0 0 260 260"
                        style={{ top: '-86px', left: '-86px' }}
                    >
                        {/* Outermost dashed — CW rotation */}
                        <motion.circle
                            cx={CX} cy={CY} r={120}
                            fill="none"
                            stroke="rgba(27,78,216,0.30)"
                            strokeWidth="0.75"
                            strokeDasharray="7 3.5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: `${CX}px ${CY}px` }}
                        />
                        {/* Middle reference ring — static, dotted */}
                        <circle
                            cx={CX} cy={CY} r={104}
                            fill="none"
                            stroke="rgba(59,130,246,0.17)"
                            strokeWidth="0.5"
                            strokeDasharray="2 7"
                        />
                        {/* Inner dashed — CCW rotation */}
                        <motion.circle
                            cx={CX} cy={CY} r={88}
                            fill="none"
                            stroke="rgba(14,165,233,0.28)"
                            strokeWidth="0.75"
                            strokeDasharray="5 6"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: `${CX}px ${CY}px` }}
                        />
                        {/* Innermost solid */}
                        <circle
                            cx={CX} cy={CY} r={72}
                            fill="none"
                            stroke="rgba(59,130,246,0.11)"
                            strokeWidth="0.5"
                        />

                        {/* Cardinal tick marks (0°, 90°, 180°, 270°) */}
                        {CARDINAL_TICKS.map((t, i) => (
                            <motion.line
                                key={`ct${i}`}
                                x1={t.x1} y1={t.y1}
                                x2={t.x2} y2={t.y2}
                                stroke="rgba(59,130,246,0.48)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.96 + i * 0.06, duration: 0.28 }}
                            />
                        ))}
                        {/* Diagonal tick marks (45°, 135°, 225°, 315°) */}
                        {DIAG_TICKS.map((t, i) => (
                            <motion.line
                                key={`dt${i}`}
                                x1={t.x1} y1={t.y1}
                                x2={t.x2} y2={t.y2}
                                stroke="rgba(59,130,246,0.24)"
                                strokeWidth="0.75"
                                strokeLinecap="round"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.06 + i * 0.04, duration: 0.28 }}
                            />
                        ))}

                        {/* Accent arc — top-right quadrant (cyan) */}
                        <motion.path
                            d={`M ${CX},${CY - 120} A 120,120 0 0 1 ${CX + 120},${CY}`}
                            fill="none"
                            stroke="rgba(14,165,233,0.60)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 1.00, duration: 0.82, ease: 'easeOut' }}
                        />
                        {/* Secondary arc — bottom-left quadrant (navy) */}
                        <motion.path
                            d={`M ${CX},${CY + 120} A 120,120 0 0 1 ${CX - 120},${CY}`}
                            fill="none"
                            stroke="rgba(27,78,216,0.35)"
                            strokeWidth="0.85"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 1.16, duration: 0.70, ease: 'easeOut' }}
                        />
                    </motion.svg>

                    {/* Logo image */}
                    <motion.div
                        initial={{ scale: 0.26, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.18, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full h-full rounded-[1.75rem] overflow-hidden"
                        style={{
                            boxShadow:
                                '0 20px 72px rgba(27,78,216,0.52), 0 6px 24px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.07)',
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="Niyantran Instruments"
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </motion.div>
                </div>

                {/* ── BRAND NAME — per-character stagger ─────────────── */}
                <div className="flex items-baseline overflow-hidden mb-2.5">
                    {'NIYANTRAN'.split('').map((ch, i) => (
                        <motion.span
                            key={`a${i}`}
                            initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.41 + i * 0.037, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                            className="font-heading font-black leading-none text-white"
                            style={{
                                fontSize: 'clamp(1.6rem, 4.2vw, 3.1rem)',
                                letterSpacing: '0.14em',
                            }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.17 }}
                        transition={{ delay: 0.80, duration: 0.4 }}
                        className="mx-3 font-heading font-black leading-none"
                        style={{
                            fontSize: 'clamp(1.6rem, 4.2vw, 3.1rem)',
                            color: 'rgba(255,255,255,0.17)',
                        }}
                    >
                        ·
                    </motion.span>
                    {'INSTRUMENTS'.split('').map((ch, i) => (
                        <motion.span
                            key={`b${i}`}
                            initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.78 + i * 0.033, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                            className="font-heading font-black leading-none"
                            style={{
                                fontSize: 'clamp(1.6rem, 4.2vw, 3.1rem)',
                                letterSpacing: '0.14em',
                                color: i >= 6 ? 'rgba(59,130,246,0.88)' : '#FFFFFF',
                            }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </div>

                {/* Hairline divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.16, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-72 h-px mb-7"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.36) 50%, transparent 100%)',
                    }}
                />

                {/* ── SYSTEM STATUS LINES ─────────────────────────────── */}
                <div className="flex flex-col items-center gap-[7px] mb-8">
                    {STATUS_LINES.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 7 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: line.delay, duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-[10px]"
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: line.delay + 0.07, duration: 0.20 }}
                                className="rounded-full flex-shrink-0"
                                style={{
                                    width:  4,
                                    height: 4,
                                    background: line.accent
                                        ? 'rgba(52,211,153,1)'
                                        : 'rgba(59,130,246,0.62)',
                                    boxShadow: line.accent
                                        ? '0 0 8px rgba(52,211,153,0.75), 0 0 18px rgba(52,211,153,0.28)'
                                        : '0 0 5px rgba(59,130,246,0.45)',
                                }}
                            />
                            <span
                                className="font-mono uppercase"
                                style={{
                                    fontSize: '9.5px',
                                    letterSpacing: '0.32em',
                                    color: line.accent
                                        ? 'rgba(52,211,153,0.9)'
                                        : 'rgba(255,255,255,0.34)',
                                }}
                            >
                                {line.text}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* ── PROGRESS BAR ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.50, duration: 0.55 }}
                    className="flex flex-col items-center gap-[10px]"
                >
                    <div
                        className="w-56 h-[2px] rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.60, duration: 2.42, ease: [0.4, 0, 0.2, 1] }}
                            className="h-full rounded-full"
                            style={{
                                background:
                                    'linear-gradient(90deg, rgba(27,78,216,0.88), rgba(14,165,233,0.96))',
                            }}
                        />
                    </div>
                    <p
                        className="font-mono uppercase"
                        style={{
                            fontSize: '8.5px',
                            letterSpacing: '0.44em',
                            color: 'rgba(255,255,255,0.17)',
                        }}
                    >
                        Niyantran Instruments · Est.&nbsp;2010
                    </p>
                </motion.div>
            </div>

            {/* ── CORNER BRACKETS ───────────────────────────────────────── */}
            {BRACKETS.map((b, i) => (
                <motion.div
                    key={`br${i}`}
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.14 + i * 0.06, duration: 0.52 }}
                    className="absolute pointer-events-none"
                    style={b.pos}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d={b.d} stroke="rgba(59,130,246,0.38)" strokeWidth="0.9" strokeLinecap="square" />
                    </svg>
                </motion.div>
            ))}

            {/* ── HUD CORNER LABELS ─────────────────────────────────────── */}
            {HUD_LABELS.map((h, i) => (
                <motion.span
                    key={`hud${i}`}
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.22 }}
                    transition={{ delay: 0.24 + i * 0.07, duration: 0.68 }}
                    className="absolute font-mono uppercase pointer-events-none"
                    style={{
                        ...(h as object),
                        fontSize: '7.5px',
                        letterSpacing: '0.34em',
                        color: 'rgba(147,197,253,0.55)',
                    }}
                >
                    {h.text}
                </motion.span>
            ))}
        </motion.div>
    );
};
