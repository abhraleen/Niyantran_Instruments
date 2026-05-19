import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Cpu, BarChart3, Layers,
    GraduationCap, BookOpen, Users, Briefcase,
    ArrowRight, ArrowUpRight,
} from 'lucide-react';
import type { Service } from '@/components/sections/Services';
import { ServicePanel, ServiceIcon } from '@/components/sections/Services';

// ─── Types ────────────────────────────────────────────────────────────────────
export type ActiveMode = 'industry' | 'education';

// ─── Mode Switch ──────────────────────────────────────────────────────────────
const modeSwitchOptions: { id: ActiveMode; label: string; dot: string; Icon: React.FC<{ className?: string; strokeWidth?: number }> }[] = [
    { id: 'industry',  label: 'Industry Mode',  dot: '#1b4ed8', Icon: Cpu },
    { id: 'education', label: 'Education Mode', dot: '#0ea5e9', Icon: GraduationCap },
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
        <div
            className="inline-flex items-center p-1 rounded-[18px] border border-slate-200/60 bg-white/97 backdrop-blur-xl"
            style={{
                boxShadow: '0 2px 0 rgba(255,255,255,1) inset, 0 4px 24px rgba(4,14,33,0.08), 0 8px 40px rgba(27,78,216,0.06), 0 0 0 1px rgba(219,234,254,0.50)',
            }}
        >
            {modeSwitchOptions.map(opt => {
                const isOpt = active === opt.id;
                const { Icon } = opt;
                return (
                    <button
                        key={opt.id}
                        onClick={() => onChange(opt.id)}
                        className="relative px-5 h-[40px] rounded-[14px] text-[11px] font-bold tracking-[0.18em] uppercase focus:outline-none select-none min-w-[136px] transition-colors duration-200"
                    >
                        {isOpt && (
                            <motion.div
                                layoutId="mode-pill"
                                className="absolute inset-0 rounded-[14px]"
                                style={{
                                    background: opt.id === 'industry'
                                        ? 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)'
                                        : 'linear-gradient(135deg, #0284c7 0%, #22d3ee 100%)',
                                    boxShadow: opt.id === 'industry'
                                        ? '0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 26px rgba(27,78,216,0.42), 0 2px 8px rgba(4,14,33,0.20)'
                                        : '0 1px 0 rgba(255,255,255,0.22) inset, 0 6px 26px rgba(14,165,233,0.42), 0 2px 8px rgba(14,165,233,0.16)',
                                }}
                                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                            />
                        )}
                        <span
                            className={`relative z-10 flex items-center justify-center gap-2 transition-all duration-300 ${
                                isOpt ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <Icon
                                className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity duration-300 ${isOpt ? 'opacity-90' : 'opacity-40'}`}
                                strokeWidth={isOpt ? 2 : 1.75}
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
            { icon: Activity,  label: 'I–V Measurement Systems',        detail: 'Precision current–voltage characterisation for semiconductor devices and solar cells.' },
            { icon: Cpu,       label: 'Quantum Efficiency Measurement',  detail: 'Advanced EQE/IQE systems for photovoltaic characterisation and performance analysis.' },
            { icon: BarChart3, label: 'Evaporation Process Control',     detail: 'Closed-loop automation for thin-film deposition with real-time QCM monitoring.' },
            { icon: Layers,    label: 'Scientific Software Consultancy', detail: 'Custom instrument interfacing, automation, and data acquisition software.' },
        ],
        cta: 'Request a Consultation',
        ctaSub: 'Enterprise & laboratory inquiries',
        primaryIcon: Activity,
        iconGradient: 'from-primary to-primary-light' as const,
        headingGradient: 'linear-gradient(135deg, #040e21, #1b4ed8)',
        ctaBg: 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)',
        ctaShadow: '0 1px 0 rgba(255,255,255,0.14) inset, 0 6px 24px rgba(27,78,216,0.30)',
        tagStyle: { background: 'rgba(27,78,216,0.06)', borderColor: 'rgba(27,78,216,0.18)', color: 'rgba(27,78,216,0.80)' },
        featBorder: 'rgba(27,78,216,0.09)',
        featBg: 'rgba(239,246,255,0.55)',
        featIconBg: 'from-primary to-primary-light' as const,
        visualBorder: 'rgba(27,78,216,0.12)',
        visualShadow: '0 1px 0 rgba(255,255,255,0.92) inset, 0 8px 32px rgba(27,78,216,0.09), 0 24px 64px rgba(27,78,216,0.06), 0 48px 96px rgba(4,14,33,0.04)',
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
        ctaShadow: '0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 24px rgba(14,165,233,0.30)',
        tagStyle: { background: 'rgba(14,165,233,0.06)', borderColor: 'rgba(14,165,233,0.22)', color: 'rgba(14,165,233,0.90)' },
        featBorder: 'rgba(14,165,233,0.10)',
        featBg: 'rgba(236,254,255,0.50)',
        featIconBg: 'from-accent to-cyan-400' as const,
        visualBorder: 'rgba(14,165,233,0.14)',
        visualShadow: '0 1px 0 rgba(255,255,255,0.92) inset, 0 8px 32px rgba(14,165,233,0.08), 0 24px 64px rgba(14,165,233,0.05), 0 48px 96px rgba(4,14,33,0.03)',
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

// ─── Feature card sub-component ───────────────────────────────────────────────
interface FeatureCardProps {
    label: string;
    detail: string;
    iconEl: React.ReactNode;
    j: number;
    onClick?: () => void;
    carousel?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    label, detail, iconEl, j, onClick, carousel,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 + j * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
        whileTap={{ scale: 0.985 }}
        onClick={onClick}
        className={[
            'group relative flex flex-col overflow-hidden rounded-[1.75rem]',
            'border border-slate-200/80',
            'hover:border-[#1B4ED8]/30 hover:shadow-[0_16px_48px_rgba(27,78,216,0.11),0_2px_8px_rgba(27,78,216,0.06)]',
            'transition-all duration-300',
            onClick ? 'cursor-pointer' : 'cursor-default',
            carousel ? 'snap-start flex-shrink-0 w-[74vw] max-w-[268px] p-5' : 'p-7',
        ].filter(Boolean).join(' ')}
        style={{ background: 'linear-gradient(158deg, #f8faff 0%, #ffffff 55%)' }}
    >
        {/* Top accent bar — appears on hover */}
        <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-[2px] rounded-t-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(27,78,216,0.55) 35%, rgba(59,130,246,0.65) 65%, transparent 95%)' }}
        />

        {/* Radial glow on hover */}
        <div
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(27,78,216,0.04), transparent)' }}
        />

        {/* Card index */}
        <span
            aria-hidden
            className="absolute top-5 right-5 text-[10px] font-mono font-black text-slate-200 group-hover:text-[#1B4ED8]/35 transition-colors duration-300 tabular-nums select-none"
        >
            {String(j + 1).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="relative w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 text-slate-400 group-hover:text-[#1B4ED8] group-hover:bg-blue-50/70 group-hover:border-blue-100/80 transition-all duration-300 flex-shrink-0 overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50/80 to-transparent transition-opacity duration-300" />
            <span className="relative z-10">{iconEl}</span>
        </div>

        {/* Title */}
        <h4 className="font-heading font-bold text-[1.02rem] text-[#040E21] leading-snug mb-2.5 flex-1 pr-6">
            {label}
        </h4>

        {/* Description */}
        <p className="text-slate-400 text-[12.5px] font-light leading-relaxed mb-5 line-clamp-2">
            {detail}
        </p>

        {/* CTA — only for clickable industry-mode service cards */}
        {onClick && (
            <span className="flex items-center gap-1.5 text-[#1B4ED8] text-[12px] font-bold group-hover:gap-2.5 transition-all duration-200">
                View Technical Specs
                <span className="transition-transform duration-[150ms] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
            </span>
        )}
    </motion.div>
);

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
        console.log('🔵 PlatformCards: Starting fetch from /api/services');
        fetch('/api/services')
            .then(async r => {
                console.log('🟡 PlatformCards: Response status', r.status);
                const json = await r.json();
                console.log('🟢 PlatformCards: Response data', json);
                const raw: Service[] = Array.isArray(json.data) ? json.data : [];
                console.log('🟢 PlatformCards: Setting services state with', raw.length, 'items');
                setServices(raw.map(s => ({
                    ...s,
                    applications: Array.isArray(s.applications) ? s.applications : [],
                    features:     Array.isArray(s.features)     ? s.features     : [],
                })));
            })
            .catch(err => {
                console.error('🔴 PlatformCards: Fetch failed:', err);
            });
    }, []);

    // Services visible in industry mode (mode=industry or mode=both), max 4
    const industryServices = services
        .filter(s => s.mode === 'industry' || s.mode === 'both')
        .slice(0, 4);

    // ── Carousel drag-to-scroll ────────────────────────────────────────
    const carouselRef = useRef<HTMLDivElement>(null);
    const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
    const [activeDot, setActiveDot] = useState(0);

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const el = carouselRef.current;
        if (!el) return;
        dragState.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
        // Disable snap while dragging for smooth continuous scroll
        el.style.scrollSnapType = 'none';
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState.current.active || !carouselRef.current) return;
        const dx = e.clientX - dragState.current.startX;
        carouselRef.current.scrollLeft = dragState.current.scrollLeft - dx;
    }, []);

    const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const el = carouselRef.current;
        if (!el) return;
        dragState.current.active = false;
        el.style.cursor = 'grab';
        el.style.userSelect = '';
        // Re-enable snap so the card snaps into place on release
        el.style.scrollSnapType = 'x mandatory';
    }, []);

    const onScroll = useCallback(() => {
        const el = carouselRef.current;
        if (!el || el.children.length === 0) return;
        // Get the first card element to measure its width (excluding spacer)
        const firstCard = el.children[0] as HTMLElement;
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth + 12; // card width + gap (3 = 0.75rem)
        const cardIndex = Math.round(el.scrollLeft / cardWidth);
        setActiveDot(Math.max(0, Math.min(cardIndex, el.children.length - 2))); // -2 to exclude spacer
    }, []);

    return (
        <>
        <section id="platform" className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
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

            {/* Depth floor — soft gradient grounds the section */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 pointer-events-none"
                style={{
                    height: '42%',
                    background: 'linear-gradient(to top, rgba(241,245,249,0.28) 0%, transparent 100%)',
                }}
            />

            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >

                {/* ── Adaptive content panel ── */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeMode}
                        initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center"
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

                            {/* ── Feature cards — snap carousel on mobile, 2×2 grid on desktop ── */}
                            <div className="mb-8 sm:mb-10">
                                {(() => {
                                    const isLive = activeMode === 'industry' && industryServices.length > 0;
                                    const count = isLive ? industryServices.length : c.features.length;

                                    const makeCard = (carousel: boolean, j: number) => {
                                        if (isLive) {
                                            const svc = industryServices[j];
                                            return (
                                                 <FeatureCard
                                                     key={svc.id}
                                                     label={svc.title}
                                                     detail={svc.short_description}
                                                     iconEl={<ServiceIcon name={svc.icon} className="h-5 w-5" />}
                                                     j={j}
                                                     onClick={() => setSelectedService(svc)}
                                                     carousel={carousel}
                                                 />
                                             );

                                        }
                                        const feat = c.features[j];
                                        const FI = feat.icon;
                                        return (
                                             <FeatureCard
                                                 key={feat.label}
                                                 label={feat.label}
                                                 detail={feat.detail}
                                                 iconEl={<FI className="h-5 w-5" strokeWidth={1.75} />}
                                                 j={j}
                                                 carousel={carousel}
                                             />
                                         );

                                    };

                                    return (
                                        <>
                                            {/* Mobile: horizontal snap carousel — edge of next card always peeking */}
                                            <div
                                                ref={carouselRef}
                                                className="md:hidden -mx-4 px-4 overflow-x-auto pb-4 flex gap-3 snap-x snap-mandatory"
                                                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', touchAction: 'pan-x' } as React.CSSProperties}
                                                onPointerDown={onPointerDown}
                                                onPointerMove={onPointerMove}
                                                onPointerUp={onPointerUp}
                                                onPointerCancel={onPointerUp}
                                                onScroll={onScroll}
                                            >
                                                {Array.from({ length: count }, (_, j) => makeCard(true, j))}
                                                {/* Trailing spacer so last card snaps fully into view */}
                                                <div className="flex-shrink-0 w-4" aria-hidden="true" />
                                            </div>

                                            {/* Scroll position dots — track active card */}
                                            <div className="md:hidden flex items-center justify-center gap-1.5 mt-2">
                                                {Array.from({ length: count }, (_, i) => (
                                                    <div
                                                        key={i}
                                                        className="rounded-full transition-all duration-300"
                                                        style={{
                                                            width: i === activeDot ? 18 : 5,
                                                            height: 4,
                                                            background: i === activeDot ? c.rowDot : c.rowDot + '35',
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            {/* Desktop: 2×2 grid */}
                                            <div className="hidden md:grid grid-cols-2 gap-3">
                                                {Array.from({ length: count }, (_, j) => makeCard(false, j))}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                            {/* CTA row */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-4 flex-wrap"
                            >
                                <motion.button
                                    onClick={() => onSelectMode?.(activeMode)}
                                    whileHover={{ scale: 1.025, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className="inline-flex items-center gap-2 rounded-[14px] px-6 sm:px-8 h-[48px] sm:h-[52px] w-full sm:w-auto justify-center text-white text-sm font-bold tracking-[0.06em] dev-btn-sweep"
                                    style={{
                                        background: c.ctaBg,
                                        boxShadow: c.ctaShadow,
                                    }}
                                >
                                    {c.cta}
                                    <ArrowRight className="h-4 w-4" />
                                </motion.button>
                                <span className="text-[12px] text-slate-400 font-light">
                                    {c.ctaSub}
                                </span>
                            </motion.div>
                        </div>

                        {/* Right: visual panel */}
                        <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
                            <motion.div
                                className="relative rounded-[2.5rem] overflow-hidden"
                                whileHover={{ y: -7, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                                style={{
                                    background: c.visualBgGradient,
                                    border: `1.5px solid ${c.visualBorder}`,
                                    boxShadow: c.visualShadow,
                                }}
                            >
                                {/* Inner top highlight edge */}
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 inset-x-0 h-px z-20 pointer-events-none"
                                    style={{ background: 'linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0.96) 50%, rgba(255,255,255,0.88) 62%, transparent 92%)' }}
                                />
                                {/* Fine grid texture */}
                                <div className="absolute inset-0 fine-grid opacity-[0.22] pointer-events-none" />

                                {/* Radial glow — more vibrant */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(ellipse 80% 65% at 50% 20%, ${c.visualGlow}, transparent)`,
                                    }}
                                />
                                {/* Bottom ambient fill */}
                                <div
                                    className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${c.visualGlow.replace('0.10', '0.06').replace('0.09', '0.05')}, transparent)`,
                                    }}
                                />

                                <div className="relative p-6 sm:p-10 flex flex-col items-center">

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
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

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
