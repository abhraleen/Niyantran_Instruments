import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Cpu, BarChart3, Layers,
    GraduationCap, BookOpen, Users, Briefcase,
    ArrowRight,
} from 'lucide-react';
import type { Service } from '@/components/sections/Services';
import { ServicePanel, ServiceIcon } from '@/components/sections/Services';

// ─── Types ────────────────────────────────────────────────────────────────────
export type ActiveMode = 'industry' | 'education';

// ─── Mode Switch ──────────────────────────────────────────────────────────────
const modeSwitchOptions: { id: ActiveMode; label: string; dot: string }[] = [
    { id: 'industry',  label: 'Industry Mode',  dot: '#1b4ed8' },
    { id: 'education', label: 'Education Mode', dot: '#0ea5e9' },
];

const ModeSwitch = ({
    active,
    onChange,
}: {
    active: ActiveMode;
    onChange: (m: ActiveMode) => void;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="flex justify-center mb-12"
    >
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-slate-200/70 bg-white/90 backdrop-blur-sm shadow-[0_2px_16px_rgba(4,14,33,0.07),0_1px_3px_rgba(4,14,33,0.04)]">
            {modeSwitchOptions.map(opt => {
                const isOpt = active === opt.id;
                return (
                    <button
                        key={opt.id}
                        onClick={() => onChange(opt.id)}
                        className="relative px-5 h-[38px] rounded-full text-[11px] font-mono font-bold tracking-[0.22em] uppercase focus:outline-none select-none"
                    >
                        {isOpt && (
                            <motion.div
                                layoutId="mode-pill"
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: opt.id === 'industry'
                                        ? 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)'
                                        : 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)',
                                    boxShadow: opt.id === 'industry'
                                        ? '0 4px 18px rgba(27,78,216,0.35), 0 1px 4px rgba(4,14,33,0.18)'
                                        : '0 4px 18px rgba(14,165,233,0.32), 0 1px 4px rgba(14,165,233,0.14)',
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                            />
                        )}
                        <span
                            className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                                isOpt ? 'text-white' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <span
                                className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-all duration-300"
                                style={{ background: isOpt ? 'rgba(255,255,255,0.65)' : opt.dot }}
                            />
                            {opt.label}
                        </span>
                    </button>
                );
            })}
        </div>
    </motion.div>
);

// ─── Adaptive content data ─────────────────────────────────────────────────
const modeContent = {
    industry: {
        eyebrow: 'For Research & Industry',
        tag: 'Business Inquiries',
        headingA: 'Scientific Systems',
        headingB: 'Built for Industry',
        description:
            'Precision measurement instruments, custom automation software, and process control systems engineered for semiconductor laboratories, photovoltaic research, and industrial measurement applications.',
        features: [
            { icon: Activity,  label: 'I–V & QE Measurement',  detail: 'Solar cell characterization' },
            { icon: Cpu,       label: 'Process Automation',     detail: 'Semiconductor workflows' },
            { icon: BarChart3, label: 'Data Acquisition',       detail: 'Custom DAQ software' },
            { icon: Layers,    label: 'Evaporation Control',    detail: 'Thin-film deposition' },
        ],
        cta: 'Request a Consultation',
        ctaSub: 'Enterprise & laboratory inquiries',
        primaryIcon: Activity,
        iconGradient: 'from-primary to-primary-light' as const,
        headingGradient: 'linear-gradient(135deg, #040e21, #1b4ed8)',
        ctaBg: 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)',
        ctaShadow: '0 6px 24px rgba(27,78,216,0.30)',
        tagStyle: { background: 'rgba(27,78,216,0.06)', borderColor: 'rgba(27,78,216,0.18)', color: 'rgba(27,78,216,0.80)' },
        featBorder: 'rgba(27,78,216,0.09)',
        featBg: 'rgba(239,246,255,0.55)',
        featIconBg: 'from-primary to-primary-light' as const,
        visualBorder: 'rgba(27,78,216,0.12)',
        visualShadow: '0 24px 64px rgba(27,78,216,0.08), 0 4px 20px rgba(4,14,33,0.05)',
        visualGlow: 'rgba(27,78,216,0.10)',
        iconShadow: '0 12px 40px rgba(27,78,216,0.28), 0 4px 12px rgba(27,78,216,0.16)',
        statusBg: '#1b4ed8',
        statusColor: 'rgba(27,78,216,0.75)',
        statusText: 'Systems Active',
        rowDot: '#1b4ed8',
        rowBorder: 'rgba(27,78,216,0.07)',
        visualBgGradient: 'linear-gradient(145deg, rgba(239,246,255,0.85) 0%, rgba(255,255,255,0.97) 70%)',
    },
    education: {
        eyebrow: 'For Students & Researchers',
        tag: 'Open Programs',
        headingA: 'Scientific Learning',
        headingB: 'Built for Everyone',
        description:
            'Structured programs bridging academic learning and applied research — designed for students, graduates, and early-career researchers seeking real-world scientific exposure.',
        features: [
            { icon: BookOpen,      label: 'Instrumentation Training', detail: 'Hands-on lab experience' },
            { icon: GraduationCap, label: 'Research Programs',        detail: 'Industry-integrated exposure' },
            { icon: Users,         label: 'Internship Tracks',        detail: 'Mentorship-led pathways' },
            { icon: Briefcase,     label: 'Career Pathways',          detail: 'Employability outcomes' },
        ],
        cta: 'Explore Student Programs',
        ctaSub: 'Open enrollment · No prior experience required',
        primaryIcon: GraduationCap,
        iconGradient: 'from-accent to-cyan-400' as const,
        headingGradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
        ctaBg: 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)',
        ctaShadow: '0 6px 24px rgba(14,165,233,0.30)',
        tagStyle: { background: 'rgba(14,165,233,0.06)', borderColor: 'rgba(14,165,233,0.22)', color: 'rgba(14,165,233,0.90)' },
        featBorder: 'rgba(14,165,233,0.10)',
        featBg: 'rgba(236,254,255,0.50)',
        featIconBg: 'from-accent to-cyan-400' as const,
        visualBorder: 'rgba(14,165,233,0.14)',
        visualShadow: '0 24px 64px rgba(14,165,233,0.08), 0 4px 20px rgba(4,14,33,0.04)',
        visualGlow: 'rgba(14,165,233,0.09)',
        iconShadow: '0 12px 40px rgba(14,165,233,0.30), 0 4px 12px rgba(14,165,233,0.16)',
        statusBg: '#0ea5e9',
        statusColor: 'rgba(14,165,233,0.80)',
        statusText: 'Enrollment Open',
        rowDot: '#0ea5e9',
        rowBorder: 'rgba(14,165,233,0.08)',
        visualBgGradient: 'linear-gradient(145deg, rgba(236,254,255,0.75) 0%, rgba(255,255,255,0.97) 70%)',
    },
};

// ─── Props ─────────────────────────────────────────────────────────────────────
interface PlatformCardsProps {
    activeMode?: ActiveMode;
    onActiveMode?: (mode: ActiveMode) => void;
    onSelectMode?: (mode: ActiveMode) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const PlatformCards = ({
    activeMode = 'industry',
    onActiveMode,
    onSelectMode,
}: PlatformCardsProps) => {
    const c = modeContent[activeMode];

    // ── Live services from DB ──────────────────────────────────────────
    const [services, setServices]             = React.useState<Service[]>([]);
    const [selectedService, setSelectedService] = React.useState<Service | null>(null);

    React.useEffect(() => {
        fetch('/api/services')
            .then(async r => {
                const json = await r.json();
                const raw: Service[] = Array.isArray(json.data) ? json.data : [];
                setServices(raw.map(s => ({
                    ...s,
                    applications: Array.isArray(s.applications) ? s.applications : [],
                    features:     Array.isArray(s.features)     ? s.features     : [],
                })));
            })
            .catch(() => {});
    }, []);

    // Services visible in industry mode (mode=industry or mode=both), max 4
    const industryServices = services
        .filter(s => s.mode === 'industry' || s.mode === 'both')
        .slice(0, 4);

    return (
        <>
        <section id="platform" className="py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            {/* Adaptive atmosphere */}
            <motion.div
                animate={{ opacity: activeMode === 'industry' ? 1 : 0.15 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 -left-40 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none"
            />
            <motion.div
                animate={{ opacity: activeMode === 'education' ? 1 : 0.15 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 -right-40 w-[700px] h-[700px] bg-cyan-400/[0.03] rounded-full blur-[160px] pointer-events-none"
            />
            <motion.div
                animate={{
                    background: activeMode === 'industry'
                        ? 'radial-gradient(ellipse 70% 55% at 8% 50%, rgba(27,78,216,0.022), transparent)'
                        : 'radial-gradient(ellipse 70% 55% at 92% 50%, rgba(14,165,233,0.020), transparent)',
                }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Static section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.75 }}
                    className="mb-10 text-center"
                >
                    <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-4">
                        Platform
                    </p>
                    <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05] mb-5">
                        Choose Your Path
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                        One scientific ecosystem — precision solutions for industry, open pathways for the next generation.
                    </p>
                </motion.div>

                {/* Mode switch */}
                <ModeSwitch active={activeMode} onChange={mode => onActiveMode?.(mode)} />

                {/* ── Adaptive content panel ── */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeMode}
                        initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
                    >
                        {/* Left: text content */}
                        <div className="flex-1 min-w-0">

                            {/* Eyebrow + tag */}
                            <div className="flex items-center gap-3 mb-7">
                                <span className="text-[10px] font-mono font-bold tracking-[0.42em] uppercase text-slate-400">
                                    {c.eyebrow}
                                </span>
                                <span
                                    className="text-[9px] font-mono font-bold tracking-[0.28em] uppercase px-3 py-1 rounded-full border"
                                    style={c.tagStyle}
                                >
                                    {c.tag}
                                </span>
                            </div>

                            {/* Adaptive heading */}
                            <h3
                                className="font-heading font-black tracking-[-0.03em] leading-[1.05] text-navy mb-5"
                                style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
                            >
                                {c.headingA}<br />
                                <span
                                    style={{
                                        background: c.headingGradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {c.headingB}
                                </span>
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 text-base font-light leading-relaxed mb-9 max-w-lg">
                                {c.description}
                            </p>

                            {/* Feature grid 2×2 */}
                            <div className="grid grid-cols-2 gap-3 mb-10">
                                {activeMode === 'industry' && industryServices.length > 0 ? (
                                    industryServices.map((svc, j) => (
                                        <motion.button
                                            key={svc.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.06 + j * 0.07,
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            whileHover={{ y: -2, scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedService(svc)}
                                            className="flex items-start gap-3 p-4 rounded-2xl border text-left group cursor-pointer transition-shadow duration-200 hover:shadow-[0_4px_18px_rgba(27,78,216,0.13)]"
                                            style={{
                                                background: c.featBg,
                                                borderColor: c.featBorder,
                                            }}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-[10px] bg-gradient-to-br ${c.featIconBg} flex items-center justify-center flex-shrink-0 transition-shadow duration-200 group-hover:shadow-[0_4px_14px_rgba(27,78,216,0.30)]`}
                                                style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.10)' }}
                                            >
                                                <ServiceIcon name={svc.icon} className="h-3.5 w-3.5 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[12px] font-bold text-navy/90 leading-tight mb-0.5 truncate">{svc.title}</p>
                                                <p className="text-[11px] text-slate-400 font-light leading-tight truncate">
                                                    {svc.short_description.length > 40
                                                        ? svc.short_description.slice(0, 40) + '…'
                                                        : svc.short_description}
                                                </p>
                                            </div>
                                        </motion.button>
                                    ))
                                ) : (
                                    c.features.map((feat, j) => (
                                        <motion.div
                                            key={feat.label}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.06 + j * 0.07,
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="flex items-start gap-3 p-4 rounded-2xl border"
                                            style={{
                                                background: c.featBg,
                                                borderColor: c.featBorder,
                                            }}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-[10px] bg-gradient-to-br ${c.featIconBg} flex items-center justify-center flex-shrink-0`}
                                                style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.10)' }}
                                            >
                                                <feat.icon className="h-3.5 w-3.5 text-white" strokeWidth={1.75} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[12px] font-bold text-navy/90 leading-tight mb-0.5 truncate">{feat.label}</p>
                                                <p className="text-[11px] text-slate-400 font-light leading-tight">{feat.detail}</p>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* CTA row */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-5 flex-wrap"
                            >
                                <button
                                    onClick={() => onSelectMode?.(activeMode)}
                                    className="inline-flex items-center gap-2 rounded-[14px] px-8 h-[52px] text-white text-sm font-bold tracking-[0.06em] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                                    style={{
                                        background: c.ctaBg,
                                        boxShadow: c.ctaShadow,
                                    }}
                                >
                                    {c.cta}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <span className="text-[12px] text-slate-400 font-light">
                                    {c.ctaSub}
                                </span>
                            </motion.div>
                        </div>

                        {/* Right: visual panel */}
                        <div className="w-full lg:w-[340px] flex-shrink-0">
                            <div
                                className="relative rounded-[2.5rem] overflow-hidden"
                                style={{
                                    background: c.visualBgGradient,
                                    border: `1.5px solid ${c.visualBorder}`,
                                    boxShadow: c.visualShadow,
                                }}
                            >
                                {/* Fine grid texture */}
                                <div className="absolute inset-0 fine-grid opacity-[0.18] pointer-events-none" />

                                {/* Radial glow */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(ellipse 75% 55% at 50% 25%, ${c.visualGlow}, transparent)`,
                                    }}
                                />

                                <div className="relative p-10 flex flex-col items-center">

                                    {/* Status indicator */}
                                    <div className="flex items-center gap-2 mb-9">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                                style={{ background: c.statusBg }}
                                            />
                                            <span
                                                className="relative inline-flex rounded-full h-1.5 w-1.5"
                                                style={{ background: c.statusBg }}
                                            />
                                        </span>
                                        <span
                                            className="text-[9px] font-mono font-bold tracking-[0.42em] uppercase"
                                            style={{ color: c.statusColor }}
                                        >
                                            {c.statusText}
                                        </span>
                                    </div>

                                    {/* Primary icon */}
                                    <div
                                        className={`w-[88px] h-[88px] rounded-[26px] bg-gradient-to-br ${c.iconGradient} flex items-center justify-center mb-9`}
                                        style={{ boxShadow: c.iconShadow }}
                                    >
                                        <c.primaryIcon className="h-10 w-10 text-white" strokeWidth={1.5} />
                                    </div>

                                    {/* Capability rows */}
                                    <div className="w-full space-y-2.5">
                                        {c.features.slice(0, 3).map(feat => (
                                            <div
                                                key={feat.label}
                                                className="flex items-center justify-between px-4 py-2.5 rounded-[14px] border bg-white/60"
                                                style={{ borderColor: c.rowBorder }}
                                            >
                                                <span className="text-[12px] text-slate-600 font-medium">{feat.label}</span>
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full opacity-60"
                                                    style={{ background: c.rowDot }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        </section>

        {/* Service detail panel (shared with Services section) */}
        <AnimatePresence>
            {selectedService && (
                <ServicePanel
                    key={selectedService.id}
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </AnimatePresence>
        </>
    );
};
