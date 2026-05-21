import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Beaker, Layers, Code, X,
    CheckCircle2, Zap, FlaskConical, ArrowUpRight,
    Cpu, Scan,
} from 'lucide-react';
import { apiBaseUrl } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Service {
    id: number;
    title: string;
    slug: string;
    mode: 'industry' | 'education' | 'both';
    short_description: string;
    full_description: string;
    applications: string[];
    features: string[];
    icon: string;
    status: 'active' | 'draft' | 'archived';
    sort_order: number;
    created_at: string;
    updated_at: string;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
    Activity, Beaker, Layers, Code, Zap, FlaskConical, CheckCircle2, Cpu,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICON_MAP[name] ?? Activity;
    return <Icon className={className} strokeWidth={1.75} />;
}

// ─── Fallback static data ─────────────────────────────────────────────────────
const FALLBACK: Service[] = [
    {
        id: 1, slug: 'iv-measurement-systems', mode: 'industry', icon: 'Activity', status: 'active', sort_order: 1, created_at: '', updated_at: '',
        title: 'I–V Measurement Systems',
        short_description: 'Precision current–voltage characterisation for semiconductor devices, solar cells, and electronic materials research.',
        full_description: 'Our I–V Measurement Systems deliver sub-nanoampere resolution current-voltage characterisation for a wide range of electronic materials and devices. Built around high-accuracy source measure units (SMUs), these systems support temperature-dependent measurements, multi-contact probing, and real-time data acquisition. Ideal for research labs, quality control, and device qualification workflows.',
        applications: ['Solar cell J-V characterisation', 'Semiconductor device testing', 'Organic electronics research', 'Thin-film transistor evaluation', 'Diode and MOSFET parameter extraction', 'Temperature-dependent IV sweeps'],
        features: ['Sub-nA current resolution', 'Automated voltage sweep control', 'Multi-contact probe station integration', 'Real-time plotting and data export', 'Python & LabVIEW interfaces', 'Temperature stage support (77K–450K)'],
    },
    {
        id: 2, slug: 'quantum-efficiency-measurement', mode: 'industry', icon: 'Beaker', status: 'active', sort_order: 2, created_at: '', updated_at: '',
        title: 'Quantum Efficiency Measurement',
        short_description: 'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterisation and performance analysis.',
        full_description: 'Quantum Efficiency Measurement systems from Niyantran Instruments provide spectral-resolved photocurrent analysis for photovoltaic and optoelectronic devices. Our EQE/IQE systems cover 300–1200 nm spectral range with high signal-to-noise ratio, supporting both research-grade and production-line measurements. Lock-in amplifier-based signal recovery ensures accuracy even for low-efficiency devices.',
        applications: ['Perovskite solar cell EQE', 'Silicon PV characterisation', 'III-V multi-junction cell analysis', 'Organic photovoltaic research', 'Space-grade photodetector qualification', 'LED internal quantum efficiency'],
        features: ['Spectral range 300–1200 nm', 'Lock-in amplifier signal recovery', 'Bifacial measurement support', 'Monochromator-based illumination', 'Bias light and voltage control', 'Automated wavelength scanning'],
    },
    {
        id: 3, slug: 'evaporation-process-control', mode: 'industry', icon: 'Layers', status: 'active', sort_order: 3, created_at: '', updated_at: '',
        title: 'Evaporation Process Control',
        short_description: 'Automation and monitoring for thin-film deposition systems — improved process stability and repeatable results.',
        full_description: 'Niyantran Evaporation Process Control systems provide closed-loop automation for thermal and e-beam evaporation chambers. Real-time thickness monitoring via quartz crystal microbalance (QCM), combined with feedback-controlled power supplies, ensures precise deposition rates and target thicknesses. Suitable for metallic, organic, and dielectric thin-film processes.',
        applications: ['Metal electrode deposition', 'Organic semiconductor thin films', 'Dielectric layer deposition', 'Multi-layer stack fabrication', 'Transparent conducting oxide coating', 'Defense-grade optical coatings'],
        features: ['QCM-based real-time thickness monitoring', 'Closed-loop deposition rate control', 'Multi-source sequencing', 'Recipe storage and recall', 'Interlocks and safety shutdown', 'Data logging and process reports'],
    },
    {
        id: 4, slug: 'scientific-software-consultancy', mode: 'both', icon: 'Code', status: 'active', sort_order: 4, created_at: '', updated_at: '',
        title: 'Scientific Software Consultancy',
        short_description: 'Custom instrument interfacing, automation, data acquisition, and analysis software for research and industrial applications.',
        full_description: 'Our Scientific Software Consultancy service delivers bespoke instrument control and data acquisition solutions tailored to your lab or production environment. From SCPI-controlled bench instruments to complex multi-instrument automated test systems, we design, develop, and deploy software that integrates seamlessly with your existing hardware. We work with Python, LabVIEW, MATLAB, and C++ to deliver reliable, maintainable codebases.',
        applications: ['PPMS automation scripts', 'SCPI instrument control frameworks', 'Automated test and measurement (ATE)', 'Multi-channel data acquisition', 'Lab notebook and LIMS integration', 'Custom GUI dashboards for instrument control'],
        features: ['Python, LabVIEW, MATLAB, C++', 'GPIB, USB, RS-232, Ethernet support', 'Real-time data visualisation', 'Automated report generation', 'Version-controlled deliverables', 'Post-delivery support and training'],
    },
];

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useIsDesktop() {
    const [v, setV] = React.useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
    );
    React.useEffect(() => {
        const fn = () => setV(window.innerWidth >= 768);
        window.addEventListener('resize', fn, { passive: true });
        return () => window.removeEventListener('resize', fn);
    }, []);
    return v;
}

// ─── Section heading row ──────────────────────────────────────────────────────
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[#1B4ED8]">
                {icon}
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{label}</span>
            <div className="flex-1 h-px bg-slate-100" />
        </div>
    );
}

// ─── Service Detail Panel ─────────────────────────────────────────────────────
export function ServicePanel({ service, onClose }: { service: Service; onClose: () => void }) {
    const isDesktop = useIsDesktop();

    const modeLabel =
        service.mode === 'industry' ? 'Industry' :
        service.mode === 'education' ? 'Education' : 'Industry & Education';

    const modeDot =
        service.mode === 'industry' ? 'bg-blue-400' :
        service.mode === 'education' ? 'bg-violet-400' : 'bg-teal-400';

    const modePill =
        service.mode === 'industry' ? 'bg-blue-500/10 text-blue-300 border-blue-400/20' :
        service.mode === 'education' ? 'bg-violet-500/10 text-violet-300 border-violet-400/20' :
        'bg-teal-500/10 text-teal-300 border-teal-400/20';

    React.useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', fn);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Stagger variants for body lists
    const listVars = {
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: 0.24 } },
    };
    const itemVars = {
        hidden: { opacity: 0, x: isDesktop ? 10 : 0, y: isDesktop ? 0 : 8 },
        show:   { opacity: 1, x: 0, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
    };

    // Stats to show in header
    const stats = [
        service.applications.length > 0 && { value: service.applications.length, label: 'Use\nCases' },
        service.features.length    > 0 && { value: service.features.length,      label: 'Key\nCapabilities' },
    ].filter(Boolean) as { value: number; label: string }[];

    return (
        <>
            {/* Backdrop */}
            <motion.div
                key="svc-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-[#040E21]/28 backdrop-blur-[3px]"
                onClick={onClose}
            />

            {/* Panel — desktop: right drawer | mobile: bottom sheet */}
            <motion.div
                key="svc-panel"
                initial={isDesktop ? { x: '100%', opacity: 0.8 } : { y: '100%' }}
                animate={isDesktop ? { x: 0,      opacity: 1   } : { y: 0       }}
                exit={  isDesktop ? { x: '110%',  opacity: 0   } : { y: '100%'  }}
                transition={{ type: 'spring', stiffness: 360, damping: 40 }}
                className={`fixed z-50 bg-white flex flex-col overflow-hidden ${
                    isDesktop
                        ? 'right-0 top-0 h-full w-[480px] shadow-[-16px_0_64px_rgba(4,14,33,0.16)] border-l border-slate-100/80'
                        : 'inset-x-0 bottom-0 h-[92vh] rounded-t-[26px] shadow-[0_-20px_60px_rgba(4,14,33,0.18)]'
                }`}
            >
                {/* Mobile drag pill */}
                {!isDesktop && (
                    <div className="flex justify-center pt-[10px] pb-1 flex-shrink-0">
                        <div className="w-9 h-[3px] rounded-full bg-slate-200" />
                    </div>
                )}

                {/* ── Header ───────────────────────────────────────────── */}
                <div className="relative flex-shrink-0 bg-[#040E21] overflow-hidden px-8 pt-8 pb-7">
                    {/* Dot grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-100" style={{
                        backgroundImage: 'radial-gradient(rgba(59,130,246,0.18) 1.5px, transparent 1.5px)',
                        backgroundSize: '22px 22px',
                    }} />
                    {/* Glows */}
                    <div className="absolute -top-16 -right-12 w-52 h-52 rounded-full bg-[#1B4ED8]/22 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-6 w-36 h-24 rounded-full bg-[#3B82F6]/10 blur-2xl pointer-events-none" />
                    {/* Subtle circuit lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="55%" x2="100%" y2="55%" stroke="white" strokeWidth="1" strokeDasharray="5 9" />
                        <line x1="72%" y1="0" x2="72%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="5 9" />
                        <circle cx="72%" cy="55%" r="3" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                    </svg>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 z-10 h-8 w-8 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center transition-all"
                    >
                        <X className="h-3.5 w-3.5 text-white/55" />
                    </button>

                    {/* Icon + title */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, delay: 0.07 }}
                        className="relative flex items-start gap-4"
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-[52px] h-[52px] rounded-[14px] bg-white/[0.07] border border-white/[0.12] flex items-center justify-center">
                                <ServiceIcon name={service.icon} className="h-6 w-6 text-white" />
                            </div>
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-[14px] ring-1 ring-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.28)] pointer-events-none" />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <span className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-[5px] rounded-full border mb-2 tracking-[0.08em] uppercase ${modePill}`}>
                                <span className={`h-[5px] w-[5px] rounded-full ${modeDot}`} />
                                {modeLabel}
                            </span>
                            <h2 className="font-heading font-black text-[21px] text-white leading-tight tracking-[-0.02em]">
                                {service.title}
                            </h2>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.38, delay: 0.15 }}
                        className="relative text-white/45 text-[12.5px] mt-4 leading-relaxed"
                    >
                        {service.short_description}
                    </motion.p>

                    {/* Stats strip */}
                    {stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.38, delay: 0.22 }}
                            className="relative flex items-center gap-5 mt-5 pt-4 border-t border-white/[0.07]"
                        >
                            {stats.map((s, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <div className="w-px h-8 bg-white/[0.08]" />}
                                    <div className="flex items-baseline gap-2.5">
                                        <span className="text-[28px] font-heading font-black text-white leading-none tabular-nums">{s.value}</span>
                                        <span className="text-[9px] text-white/30 font-mono uppercase tracking-wider leading-snug whitespace-pre-line">{s.label}</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* ── Scrollable body ───────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="px-8 py-7 space-y-8">

                        {/* Overview */}
                        {service.full_description && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.38 }}
                            >
                                <SectionLabel icon={<Scan className="h-3 w-3" />} label="Overview" />
                                <p className="text-[13.5px] text-slate-600 leading-[1.82] font-light">
                                    {service.full_description}
                                </p>
                            </motion.div>
                        )}

                        {/* Research Use Cases */}
                        {service.applications.length > 0 && (
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.24, duration: 0.38 }}
                                >
                                    <SectionLabel icon={<FlaskConical className="h-3 w-3" />} label="Research Use Cases" />
                                </motion.div>
                                <motion.ul
                                    variants={listVars}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-2"
                                >
                                    {service.applications.map((app, i) => (
                                        <motion.li key={i} variants={itemVars} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-px">
                                                <span className="text-[8px] font-black text-[#1B4ED8]/70 font-mono leading-none">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <span className="text-[13px] text-slate-600 leading-snug">{app}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        )}

                        {/* Instrument Capabilities */}
                        {service.features.length > 0 && (
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.38 }}
                                >
                                    <SectionLabel icon={<Cpu className="h-3 w-3" />} label="Instrument Capabilities" />
                                </motion.div>
                                <motion.div
                                    variants={listVars}
                                    initial="hidden"
                                    animate="show"
                                    className="grid gap-2"
                                >
                                    {service.features.map((feat, i) => (
                                        <motion.div
                                            key={i}
                                            variants={itemVars}
                                            className="flex items-start gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50/70 to-transparent border border-emerald-100/70"
                                        >
                                            <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-[1px]">
                                                <div className="w-[5px] h-[5px] rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="text-[13px] text-slate-600 leading-snug">{feat}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                        {/* Empty state */}
                        {!service.full_description && service.applications.length === 0 && service.features.length === 0 && (
                            <div className="py-10 text-center">
                                <p className="text-[13px] text-slate-300 font-medium">Full specification coming soon.</p>
                            </div>
                        )}
                        <div className="pb-4" />
                    </div>
                </div>

                {/* ── Sticky footer ─────────────────────────────────────── */}
                <div className="flex-shrink-0 px-8 py-5 bg-white border-t border-slate-100">
                    <a
                        href="#contact"
                        onClick={onClose}
                        className="flex w-full h-11 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-[13px] font-bold items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(27,78,216,0.18)] hover:shadow-[0_4px_24px_rgba(27,78,216,0.34)]"
                    >
                        Request a Consultation
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </motion.div>
        </>
    );
}

// ─── Services Section ─────────────────────────────────────────────────────────
export const Services = () => {
    const [services, setServices] = React.useState<Service[]>([]);
    const [loading, setLoading]   = React.useState(true);
    const [selected, setSelected] = React.useState<Service | null>(null);

    React.useEffect(() => {
        console.log('🔵 Services: Starting fetch from /api/services');
        fetch(`${apiBaseUrl}/api/services`)
            .then(async r => {
                console.log('🟡 Services: Response status', r.status);
                const json = await r.json();
                console.log('🟢 Services: Response data', json);
                const raw: Service[] = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
                // Normalise: ensure applications/features are always arrays
                const data = raw.map(s => ({
                    ...s,
                    applications: Array.isArray(s.applications) ? s.applications : [],
                    features:     Array.isArray(s.features)     ? s.features     : [],
                }));
                console.log('🟢 Services: Setting services state with', data.length, 'items');
                setServices(data.length > 0 ? data : FALLBACK);
            })
            .catch(err => {
                console.error('🔴 Services: Fetch failed:', err);
                setServices(FALLBACK);
            })
            .finally(() => setLoading(false));
    }, []);

    const displayServices = loading ? FALLBACK : services;

    return (
        <>
            <section id="services" className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-14"
                    >
                        <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-4">What We Build</p>
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05]">
                            Core Services
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {displayServices.map((svc, i) => (
                            <motion.button
                                key={svc.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelected(svc)}
                                className="group flex flex-col rounded-[1.75rem] p-7 text-left w-full border border-slate-200/70 bg-white hover:border-[#1B4ED8]/20 hover:shadow-[0_8px_36px_rgba(27,78,216,0.09)] transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-slate-400 group-hover:text-[#1B4ED8] group-hover:bg-blue-50/60 group-hover:border-blue-100/80 transition-all duration-300">
                                    <ServiceIcon name={svc.icon} className="h-5 w-5" />
                                </div>

                                {/* Title */}
                                <h3 className="font-heading font-bold text-[1.15rem] text-navy leading-snug mb-3 flex-1 text-left">
                                    {svc.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                                    {svc.short_description}
                                </p>

                                {/* CTA */}
                                <span className="flex items-center gap-1.5 text-[#1B4ED8] text-[13px] font-bold group-hover:gap-2.5 transition-all duration-200">
                                    View Technical Specs
                                    <span className="transition-transform duration-[150ms] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </span>
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service detail panel */}
            <AnimatePresence>
                {selected && (
                    <ServicePanel
                        key={selected.id}
                        service={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
