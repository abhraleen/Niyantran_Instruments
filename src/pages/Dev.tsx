import React, { Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/hooks/usePerformance';
import { ArrowRight, ChevronRight, Zap, Activity, Cpu, GraduationCap } from 'lucide-react';
import { MeshGradient } from '@paper-design/shaders-react';
import { BeamsBackground } from '@/components/ui/beams-background';
import { Navbar, Footer } from '@/components/layout/shared';
import { PlatformCards, type ActiveMode } from '@/components/sections/PlatformCards';
import { DevContact, type InquiryMode } from '@/components/sections/DevContact';

// ─── Magnetic button ──────────────────────────────────────────────────────────
const MagneticBtn = ({
    className, onClick, children, strength = 0.16,
}: {
    className: string; onClick?: () => void; children: React.ReactNode; strength?: number;
}) => {
    const { isLowEnd } = usePerformance();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 22, restDelta: 0.001 });
    const sy = useSpring(y, { stiffness: 200, damping: 22, restDelta: 0.001 });
    // On low-end devices skip the spring physics — just a regular button
    if (isLowEnd) {
        return (
            <button onClick={onClick} className={className}>
                {children}
            </button>
        );
    }
    return (
        <motion.button
            style={{ x: sx, y: sy }}
            onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                x.set((e.clientX - (r.left + r.width / 2)) * strength);
                y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// ─── Dev-only hero ────────────────────────────────────────────────────────────
const DevHero = ({ onSelectMode }: { onSelectMode: (mode: ActiveMode) => void }) => {
    const { isLowEnd } = usePerformance();
    const handleMode = (mode: ActiveMode) => {
        onSelectMode(mode);
        setTimeout(() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }), 50);
    };

    // ── Cursor parallax ──────────────────────────────────────────────────────
    const rawX = useMotionValue(0.5);
    const rawY = useMotionValue(0.5);
    const smoothX = useSpring(rawX, { stiffness: 42, damping: 26 });
    const smoothY = useSpring(rawY, { stiffness: 42, damping: 26 });
    const p2x = useTransform(smoothX, [0, 1], [-10, 10]);
    const p2y = useTransform(smoothY, [0, 1], [-8, 8]);
    const p3x = useTransform(smoothX, [0, 1], [6, -6]);
    const p3y = useTransform(smoothY, [0, 1], [4, -4]);

    // Only track cursor on capable devices — mousemove fires hundreds of times/s
    React.useEffect(() => {
        if (isLowEnd) return;
        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX / window.innerWidth);
            rawY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [rawX, rawY, isLowEnd]);

    return (
        <BeamsBackground intensity="medium" className="min-h-[88vh]">
        <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-20">

            {/* ── Layer -1: WebGL MeshGradient — skip on low-end (full GPU shader) ── */}
            {!isLowEnd && (
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 opacity-[0.28]">
                    <Suspense fallback={null}>
                        <MeshGradient
                            className="w-full h-full"
                            colors={['#f8faff', '#dbeafe', '#93c5fd', '#1b4ed8']}
                            speed={0.28}
                            backgroundColor="#f8faff"
                        />
                    </Suspense>
                </div>
            )}

            {/* ── Layer 0: Scientific precision grid texture ── */}
            <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
                {/* Fine grid — base */}
                <div className="absolute inset-0 fine-grid opacity-[0.35]" />
                {/* Coarser blueprint grid — depth */}
                <div
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(27,78,216,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(27,78,216,0.08) 1px, transparent 1px)
                        `,
                        backgroundSize: '96px 96px',
                    }}
                />
                {/* Diagonal accent lines — upper-right */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, rgba(27,78,216,0.5) 0px, rgba(27,78,216,0.5) 1px, transparent 1px, transparent 72px)',
                    }}
                />
            </div>

            {/* ── Layer 1: Animated blobs — skip on low-end (large blur filters + infinite animation) ── */}
            {!isLowEnd && (
                <>
                    {/* Blob A — primary blue, top-left origin */}
                    <motion.div
                        aria-hidden="true"
                        className="absolute pointer-events-none z-[2]"
                        style={{
                            top: '-12%', left: '-8%',
                            width: '75vw', height: '70vh',
                            background: 'radial-gradient(ellipse at 35% 40%, rgba(27,78,216,0.062) 0%, transparent 55%)',
                            filter: 'blur(72px)',
                            borderRadius: '50%',
                            willChange: 'transform',
                        }}
                        animate={{ x: [0, 38, 12, 0], y: [0, -28, 8, 0], scale: [1, 1.05, 1.01, 1] }}
                        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Blob B — cyan, bottom-right origin */}
                    <motion.div
                        aria-hidden="true"
                        className="absolute pointer-events-none z-[2]"
                        style={{
                            bottom: '-10%', right: '-10%',
                            width: '68vw', height: '62vh',
                            background: 'radial-gradient(ellipse at 65% 60%, rgba(14,165,233,0.055) 0%, transparent 55%)',
                            filter: 'blur(96px)',
                            borderRadius: '50%',
                            willChange: 'transform',
                        }}
                        animate={{ x: [0, -32, -10, 0], y: [0, 22, -6, 0], scale: [1, 1.04, 0.98, 1] }}
                        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                    />
                    {/* Blob C — mid-field, very slow oscillation */}
                    <motion.div
                        aria-hidden="true"
                        className="absolute pointer-events-none z-[2]"
                        style={{
                            top: '22%', left: '22%',
                            width: '56vw', height: '48vh',
                            background: 'radial-gradient(ellipse at center, rgba(27,78,216,0.038) 0%, transparent 60%)',
                            filter: 'blur(88px)',
                            borderRadius: '50%',
                            willChange: 'transform',
                        }}
                        animate={{ x: [0, 18, -6, 0], y: [0, -16, 4, 0], scale: [1, 1.03, 1.01, 1] }}
                        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 11 }}
                    />
                </>
            )}

            {/* ── Layer 2: Asymmetric ambient glow — cursor parallax (skipped on low-end) ── */}
            {!isLowEnd && (
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-[3]"
                style={{ x: p2x, y: p2y }}
            >
                {/* Glow — upper-left quadrant */}
                <div
                    className="absolute"
                    style={{
                        top: '2%', left: '-4%',
                        width: '52vw', height: '54vh',
                        background: 'radial-gradient(ellipse at 28% 32%, rgba(27,78,216,0.072) 0%, transparent 62%)',
                        filter: 'blur(28px)',
                    }}
                />
                {/* Glow — right-center */}
                <div
                    className="absolute"
                    style={{
                        top: '28%', right: '-3%',
                        width: '44vw', height: '48vh',
                        background: 'radial-gradient(ellipse at 72% 48%, rgba(14,165,233,0.058) 0%, transparent 62%)',
                        filter: 'blur(48px)',
                    }}
                />
                {/* Glow — lower-center, very faint */}
                <div
                    className="absolute"
                    style={{
                        bottom: '6%', left: '28%',
                        width: '44vw', height: '28vh',
                        background: 'radial-gradient(ellipse at center, rgba(27,78,216,0.045) 0%, transparent 65%)',
                        filter: 'blur(56px)',
                    }}
                />
            </motion.div>
            )}

            {/* ── Layer 3: Floating blur orbs — skipped on low-end ── */}
            {!isLowEnd && (
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-[4]"
                style={{ x: p3x, y: p3y }}
            >
                {/* Orb 1 — large, top-right, slow */}
                <motion.div
                    className="absolute"
                    style={{
                        top: '4%', right: '7%',
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle at center, rgba(14,165,233,0.085) 0%, transparent 62%)',
                        filter: 'blur(58px)',
                        borderRadius: '50%',
                        willChange: 'transform',
                    }}
                    animate={{ x: [0, 26, 6, -4, 0], y: [0, -14, -4, 4, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Orb 2 — medium, bottom-left */}
                <motion.div
                    className="absolute"
                    style={{
                        bottom: '10%', left: '4%',
                        width: '300px', height: '300px',
                        background: 'radial-gradient(circle at center, rgba(27,78,216,0.078) 0%, transparent 62%)',
                        filter: 'blur(48px)',
                        borderRadius: '50%',
                        willChange: 'transform',
                    }}
                    animate={{ x: [0, -18, -5, 3, 0], y: [0, 10, 3, -3, 0] }}
                    transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />
                {/* Orb 3 — small, mid-left, different rhythm */}
                <motion.div
                    className="absolute"
                    style={{
                        top: '38%', left: '14%',
                        width: '190px', height: '190px',
                        background: 'radial-gradient(circle at center, rgba(59,130,246,0.065) 0%, transparent 65%)',
                        filter: 'blur(34px)',
                        borderRadius: '50%',
                        willChange: 'transform',
                    }}
                    animate={{ x: [0, 14, 4, -7, 0], y: [0, -10, 3, 5, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                />
                {/* Orb 4 — tall ellipse, top-center deep field */}
                <motion.div
                    className="absolute"
                    style={{
                        top: '-6%', left: '32%',
                        width: '480px', height: '320px',
                        background: 'radial-gradient(ellipse at center, rgba(27,78,216,0.058) 0%, transparent 58%)',
                        filter: 'blur(76px)',
                        borderRadius: '50%',
                        willChange: 'transform',
                    }}
                    animate={{ x: [0, 22, 7, -5, 0], y: [0, 16, 5, -3, 0] }}
                    transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
                />
            </motion.div>
            )}

            {/* ── Layer 4: Floating data particles — skip on low-end ── */}
            {!isLowEnd && <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5]">
                {/* Top-left corner accent */}
                <motion.div
                    className="absolute top-[18%] left-[6%] flex items-center gap-2 opacity-0"
                    animate={{ opacity: [0, 0.55, 0.55, 0], y: [8, 0, 0, -8] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
                >
                    <span style={{ animation: 'status-pulse 2s ease-in-out infinite', display: 'inline-block' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    </span>
                    <span className="text-[9px] font-mono text-primary/50 tracking-[0.22em] uppercase">Systems Active</span>
                </motion.div>
                {/* Top-right data badge */}
                <motion.div
                    className="absolute top-[14%] right-[8%] opacity-0"
                    animate={{ opacity: [0, 0.45, 0.45, 0], y: [10, 0, 0, -10] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 3.2, ease: 'easeInOut' }}
                >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-100/60 bg-white/70 backdrop-blur-sm shadow-sm">
                        <Activity className="h-3 w-3 text-primary/60" />
                        <span className="text-[9px] font-mono text-primary/55 font-bold">DAQ · 24ch</span>
                    </div>
                </motion.div>
                {/* Bottom-left data badge */}
                <motion.div
                    className="absolute bottom-[22%] left-[7%] opacity-0"
                    animate={{ opacity: [0, 0.40, 0.40, 0], y: [-8, 0, 0, 8] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
                >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-100/50 bg-white/65 backdrop-blur-sm shadow-sm">
                        <Cpu className="h-3 w-3 text-accent/60" />
                        <span className="text-[9px] font-mono text-accent/55 font-bold">I–V · QE · EPC</span>
                    </div>
                </motion.div>
                {/* Bottom-right */}
                <motion.div
                    className="absolute bottom-[18%] right-[6%] opacity-0"
                    animate={{ opacity: [0, 0.38, 0.38, 0], y: [-10, 0, 0, 10] }}
                    transition={{ duration: 9, repeat: Infinity, delay: 5.5, ease: 'easeInOut' }}
                >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-100/50 bg-white/65 backdrop-blur-sm shadow-sm">
                        <GraduationCap className="h-3 w-3 text-primary/60" />
                        <span className="text-[9px] font-mono text-primary/55 font-bold">Open Enrollment</span>
                    </div>
                </motion.div>
            </div>}

            {/* ── Layer 5: Content backing — white radial gives text a depth plane ── */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none z-[9]"
                style={{
                    top: '12%', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '74vw', height: '70vh',
                    background: 'radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.28) 38%, transparent 68%)',
                }}
            />

            {/* ── Content — elevated above atmosphere (z-10) ── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-100 bg-white text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-primary/70 mb-10 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_2px_16px_rgba(27,78,216,0.10),0_0_0_1px_rgba(219,234,254,0.65)]"
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    Scientific Ecosystem
                    <Zap className="h-3 w-3 text-primary/50 ml-0.5" />
                </motion.div>

                {/* Headline — per-line blur-to-sharp stagger */}
                <h1
                    className="font-heading font-black tracking-[-0.035em] leading-[1.05] text-navy mb-7"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
                >
                    {(['Instrumentation for', 'Industry and'] as const).map((line, i) => (
                        <div key={line} className="overflow-hidden">
                            <motion.span
                                className="block"
                                initial={{ y: '108%', opacity: 0, filter: 'blur(7px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ delay: 0.12 + i * 0.11, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {line}
                            </motion.span>
                        </div>
                    ))}
                    <div className="overflow-hidden">
                        <motion.span
                            className="block"
                            initial={{ y: '108%', opacity: 0, filter: 'blur(7px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.34, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="relative inline-block">
                                <span className="text-gradient relative z-[1]">Research</span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-[-12%] inset-y-[-25%] rounded-full pointer-events-none z-0"
                                    style={{
                                        background: 'radial-gradient(ellipse at center, rgba(27,78,216,0.18) 0%, rgba(14,165,233,0.10) 42%, transparent 68%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                            </span>
                        </motion.span>
                    </div>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.44, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed font-light"
                >
                    A dual-platform scientific ecosystem — precision measurement systems for research and industry, and structured learning programs for the next generation of scientists.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.54, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    <MagneticBtn
                        onClick={() => handleMode('industry')}
                        className="inline-flex items-center justify-center gap-2.5 rounded-[14px] px-8 h-[52px] w-full sm:w-auto bg-navy text-white text-sm font-bold tracking-[0.08em] uppercase dev-btn-sweep shadow-[0_1px_0_rgba(255,255,255,0.13)_inset,0_8px_32px_rgba(4,14,33,0.22)] hover:bg-primary hover:shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_16px_48px_rgba(27,78,216,0.38)] transition-all duration-300"
                    >
                        <Cpu className="h-4 w-4 opacity-80" />
                        Industry Solutions
                        <ArrowRight className="h-4 w-4" />
                    </MagneticBtn>
                    <MagneticBtn
                        onClick={() => handleMode('education')}
                        strength={0.12}
                        className="inline-flex items-center gap-2 rounded-[14px] px-8 h-[52px] text-sm font-semibold text-slate-500 hover:text-navy hover:bg-blue-50/60 hover:shadow-[0_4px_20px_rgba(27,78,216,0.09)] transition-all duration-300 border border-transparent hover:border-blue-100/50"
                    >
                        <GraduationCap className="h-4 w-4 opacity-70" />
                        Education &amp; Training
                        <ChevronRight className="h-4 w-4 opacity-60" />
                    </MagneticBtn>
                </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/80 to-transparent" />
                <div
                    className="absolute bottom-0 inset-x-0 h-[8px] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 38% 100% at 50% 100%, rgba(27,78,216,0.12) 0%, transparent 100%)' }}
                />
            </div>
        </section>
        </BeamsBackground>
    );
};
export const Dev: React.FC<{ onLoginClick?: () => void }> = ({ onLoginClick }) => {
    const [inquiryMode, setInquiryMode] = React.useState<InquiryMode>('industry');
    const [activeMode, setActiveMode] = React.useState<ActiveMode>('industry');

    const handleSelectMode = (mode: InquiryMode) => {
        setInquiryMode(mode);
        setTimeout(() => {
            document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar activeMode={activeMode} onActiveMode={setActiveMode} />
            <main>
                <DevHero onSelectMode={setActiveMode} />
                <PlatformCards
                    activeMode={activeMode}
                    onActiveMode={setActiveMode}
                    onSelectMode={handleSelectMode}
                />
                <DevContact mode={inquiryMode} onModeChange={setInquiryMode} />
            </main>
            <Footer onLoginClick={onLoginClick} />
        </div>
    );
};
