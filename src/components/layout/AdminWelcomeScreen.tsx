import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Static geometry ────────────────────────────────────────────────────────────
const GRID_COLS = 14;
const GRID_ROWS = 8;
const DOTS = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => ({
    id: i,
    col: i % GRID_COLS,
    row: Math.floor(i / GRID_COLS),
    delay: ((i % GRID_COLS) + Math.floor(i / GRID_COLS)) * 0.04,
    bright: i % 7 === 0,
}));

const SCAN_LINES = Array.from({ length: 5 }, (_, i) => ({ id: i, delay: i * 0.18 }));

const NAME = 'SUMAN'.split('');
const WELCOME = 'Welcome,'.split('');

const STATS = [
    { label: 'SYSTEM',   value: 'ONLINE',  color: '#22c55e' },
    { label: 'ACCESS',   value: 'GRANTED', color: '#3b82f6' },
    { label: 'SESSION',  value: 'ACTIVE',  color: '#a78bfa' },
];

// ── Component ──────────────────────────────────────────────────────────────────
interface AdminWelcomeScreenProps {
    onComplete: () => void;
}

export const AdminWelcomeScreen: React.FC<AdminWelcomeScreenProps> = ({ onComplete }) => {
    const [phase, setPhase] = React.useState<'enter' | 'hold' | 'exit'>('enter');
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        // Progress bar
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(interval); return 100; }
                return p + 1.4;
            });
        }, 30);

        // Hold → exit sequence
        const holdTimer  = setTimeout(() => setPhase('hold'),  500);
        const exitTimer  = setTimeout(() => setPhase('exit'),  2800);
        const doneTimer  = setTimeout(() => onComplete(),      3400);

        return () => {
            clearInterval(interval);
            clearTimeout(holdTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
            style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 40%, #0a1628 0%, #040E21 55%, #000000 100%)' }}
        >
            {/* ── Background dot grid ── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`, padding: '3%' }}
            >
                {DOTS.map(dot => (
                    <motion.div
                        key={dot.id}
                        className="flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: dot.bright ? [0, 0.5, 0.1] : [0, 0.2, 0.06] }}
                        transition={{ duration: 1.6, delay: dot.delay, ease: 'easeOut' }}
                    >
                        <div style={{
                            width: dot.bright ? 2 : 1.5,
                            height: dot.bright ? 2 : 1.5,
                            borderRadius: '50%',
                            background: dot.bright ? '#3b82f6' : 'rgba(100,140,255,0.5)',
                        }} />
                    </motion.div>
                ))}
            </div>

            {/* ── Animated scan lines ── */}
            {SCAN_LINES.map(line => (
                <motion.div
                    key={line.id}
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 30%, rgba(59,130,246,0.25) 50%, rgba(59,130,246,0.12) 70%, transparent 100%)' }}
                    initial={{ top: '-2%', opacity: 0 }}
                    animate={{ top: '102%', opacity: [0, 0.8, 0.8, 0] }}
                    transition={{ duration: 3.2, delay: line.delay * 2 + 0.2, ease: 'linear', repeat: Infinity, repeatDelay: 1.4 }}
                />
            ))}

            {/* ── Left edge accent ── */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, #1b4ed8 20%, #3b82f6 50%, #1b4ed8 80%, transparent 100%)' }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
                className="absolute right-0 top-0 bottom-0 w-0.5 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, #1b4ed8 20%, #3b82f6 50%, #1b4ed8 80%, transparent 100%)' }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ── Corner brackets ── */}
            {[
                { style: { top: 20, left: 24 },  d: 'M12,0 L0,0 L0,12' },
                { style: { top: 20, right: 24 },  d: 'M0,0 L12,0 L12,12' },
                { style: { bottom: 20, left: 24 }, d: 'M0,0 L0,12 M0,6 L0,12' },
                { style: { bottom: 20, right: 24 }, d: 'M12,0 L12,12' },
            ].map((bracket, i) => (
                <motion.svg
                    key={i}
                    width={16} height={16}
                    viewBox="0 0 16 16"
                    className="absolute pointer-events-none"
                    style={bracket.style as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.35, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                >
                    <path d={bracket.d} stroke="#3b82f6" strokeWidth={1.5} fill="none" strokeLinecap="round" />
                </motion.svg>
            ))}

            {/* ── HUD corner labels ── */}
            {[
                { text: 'NI · ADM · 2025', style: { top: 16, left: 44 } },
                { text: 'SECURE · ACCESS', style: { top: 16, right: 44 } },
                { text: 'AUTHENTICATED', style: { bottom: 16, left: 44 } },
                { text: 'v2.0 · PANEL', style: { bottom: 16, right: 44 } },
            ].map((label, i) => (
                <motion.div
                    key={i}
                    className="absolute font-mono text-[9px] tracking-[0.22em] uppercase pointer-events-none"
                    style={{ ...label.style as React.CSSProperties, color: 'rgba(59,130,246,0.35)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                >
                    {label.text}
                </motion.div>
            ))}

            {/* ── Central glow ── */}
            <motion.div
                className="absolute pointer-events-none"
                style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,216,0.18) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ── Main content ── */}
            <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">

                {/* Access granted badge */}
                <motion.div
                    className="flex items-center gap-2.5 px-5 py-2 rounded-full border"
                    style={{ borderColor: 'rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)' }}
                    initial={{ opacity: 0, y: -12, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#22c55e' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase" style={{ color: '#22c55e' }}>
                        Access Granted
                    </span>
                </motion.div>

                {/* "Welcome," text */}
                <div className="flex items-center gap-1.5 overflow-hidden">
                    {WELCOME.map((ch, i) => (
                        <motion.span
                            key={i}
                            className="font-heading font-black"
                            style={{ fontSize: 'clamp(2rem, 6vw, 3.6rem)', color: 'rgba(148,163,184,0.75)', lineHeight: 1 }}
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.45, delay: 0.5 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {ch === ' ' ? '\u00A0' : ch}
                        </motion.span>
                    ))}
                </div>

                {/* "SUMAN" — big bold blue letters */}
                <div className="flex items-end gap-2 sm:gap-3 overflow-hidden -mt-2">
                    {NAME.map((ch, i) => (
                        <motion.span
                            key={i}
                            className="font-heading font-black"
                            style={{
                                fontSize: 'clamp(3.5rem, 14vw, 8rem)',
                                lineHeight: 0.9,
                                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 40%, #1d4ed8 70%, #818cf8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 28px rgba(59,130,246,0.45))',
                            }}
                            initial={{ opacity: 0, y: 60, scale: 0.75, rotateX: 45 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            transition={{ duration: 0.65, delay: 0.78 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </div>

                {/* Subtitle */}
                <motion.div
                    className="font-mono text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(100,116,139,0.7)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.42, ease: 'easeOut' }}
                >
                    Niyantran Instruments · Admin Control Panel
                </motion.div>

                {/* Stats row */}
                <motion.div
                    className="flex items-center gap-6 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.65 }}
                >
                    {STATS.map((stat, i) => (
                        <React.Fragment key={stat.label}>
                            {i > 0 && <div style={{ width: 1, height: 22, background: 'rgba(59,130,246,0.15)' }} />}
                            <motion.div
                                className="flex flex-col items-center gap-0.5"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 1.72 + i * 0.1 }}
                            >
                                <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(100,116,139,0.5)' }}>{stat.label}</span>
                                <span className="font-mono text-[11px] font-bold tracking-[0.15em]" style={{ color: stat.color }}>{stat.value}</span>
                            </motion.div>
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    className="w-64 sm:w-80 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.9 }}
                >
                    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(30,58,138,0.25)' }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)',
                                boxShadow: '0 0 10px rgba(59,130,246,0.6)',
                                width: `${progress}%`,
                            }}
                            transition={{ duration: 0.05 }}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(59,130,246,0.4)' }}>LOADING DASHBOARD</span>
                        <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(59,130,246,0.4)' }}>{Math.min(100, Math.round(progress))}%</span>
                    </div>
                </motion.div>

            </div>

            {/* ── Bottom wave accent ── */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-[60px]">
                    <motion.path
                        d="M0,35 C200,15 400,55 600,35 S1000,15 1200,35 L1200,60 L0,60 Z"
                        fill="rgba(27,78,216,0.07)"
                        animate={{ d: [
                            'M0,35 C200,15 400,55 600,35 S1000,15 1200,35 L1200,60 L0,60 Z',
                            'M0,40 C200,55 400,20 600,40 S1000,55 1200,40 L1200,60 L0,60 Z',
                            'M0,35 C200,15 400,55 600,35 S1000,15 1200,35 L1200,60 L0,60 Z',
                        ]}}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};
