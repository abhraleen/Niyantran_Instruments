import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Beaker, Layers, Code, X,
    CheckCircle2, Zap, FlaskConical, ArrowUpRight,
    Cpu, Scan,
} from 'lucide-react';

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
    { id: 1, title: 'I–V Measurement Systems',        slug: 'iv-measurement-systems',        mode: 'industry',  short_description: 'Precision current–voltage characterisation for semiconductor devices, solar cells, and electronic materials research.',                                                    full_description: '', applications: [], features: [], icon: 'Activity',     status: 'active', sort_order: 1, created_at: '', updated_at: '' },
    { id: 2, title: 'Quantum Efficiency Measurement',  slug: 'quantum-efficiency-measurement', mode: 'industry',  short_description: 'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterisation and performance analysis.',                                                    full_description: '', applications: [], features: [], icon: 'Beaker',       status: 'active', sort_order: 2, created_at: '', updated_at: '' },
    { id: 3, title: 'Evaporation Process Control',     slug: 'evaporation-process-control',    mode: 'industry',  short_description: 'Automation and monitoring for thin-film deposition systems — improved process stability and repeatable results.',                                                       full_description: '', applications: [], features: [], icon: 'Layers',       status: 'active', sort_order: 3, created_at: '', updated_at: '' },
    { id: 4, title: 'Scientific Software Consultancy', slug: 'scientific-software-consultancy', mode: 'both',     short_description: 'Custom instrument interfacing, automation, data acquisition, and analysis software for research and industrial applications.', full_description: '', applications: [], features: [], icon: 'Code',         status: 'active', sort_order: 4, created_at: '', updated_at: '' },
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
        fetch('/api/services')
            .then(async r => {
                const json = await r.json();
                const raw: Service[] = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
                // Normalise: ensure applications/features are always arrays
                const data = raw.map(s => ({
                    ...s,
                    applications: Array.isArray(s.applications) ? s.applications : [],
                    features:     Array.isArray(s.features)     ? s.features     : [],
                }));
                setServices(data.length > 0 ? data : FALLBACK);
            })
            .catch(() => setServices(FALLBACK))
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {displayServices.map((svc, i) => {
                            const isSelected = selected?.id === svc.id;
                            return (
                                <motion.button
                                    key={svc.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -3, scale: 1.006 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setSelected(isSelected ? null : svc)}
                                    className={`group relative rounded-[1.5rem] p-8 text-left w-full overflow-hidden transition-all duration-300 ${
                                        isSelected
                                            ? 'border-[1.5px] border-[#1B4ED8]/30 bg-gradient-to-br from-white via-blue-50/20 to-blue-50/50 shadow-[0_0_0_4px_rgba(27,78,216,0.05),0_12px_40px_rgba(27,78,216,0.12)]'
                                            : 'border border-blue-50 bg-surface hover:border-[#1B4ED8]/20 hover:bg-white hover:shadow-[0_8px_36px_rgba(27,78,216,0.09)]'
                                    }`}
                                >
                                    {/* Hover glow wash */}
                                    <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-blue-50/0 to-blue-100/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Selected left bar */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.span
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                exit={{ scaleY: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute left-0 top-8 bottom-8 w-[3px] bg-[#1B4ED8] rounded-full origin-center"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="relative flex items-start justify-between mb-5">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            isSelected
                                                ? 'bg-gradient-to-br from-[#1B4ED8] to-[#3B82F6] shadow-[0_4px_22px_rgba(27,78,216,0.42)]'
                                                : 'bg-gradient-to-br from-primary to-primary-light shadow-[0_4px_14px_rgba(27,78,216,0.22)] group-hover:shadow-[0_6px_22px_rgba(27,78,216,0.34)]'
                                        }`}>
                                            <ServiceIcon name={svc.icon} className="h-5 w-5 text-white" />
                                        </div>

                                        <span className={`text-[10px] font-bold flex items-center gap-1 mt-0.5 transition-colors duration-300 ${
                                            isSelected ? 'text-[#1B4ED8]' : 'text-slate-300 group-hover:text-[#1B4ED8]'
                                        }`}>
                                            {isSelected ? 'Close' : 'Details'}
                                            <ArrowUpRight className={`h-3 w-3 transition-transform duration-300 ${
                                                isSelected ? 'rotate-90' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                                            }`} />
                                        </span>
                                    </div>

                                    <h3 className="relative font-heading font-bold text-xl text-navy tracking-tight mb-2.5">{svc.title}</h3>
                                    <p className="relative text-slate-500 text-sm font-light leading-relaxed">{svc.short_description}</p>

                                    {(svc.applications.length > 0 || svc.features.length > 0) && (
                                        <div className="relative mt-4 pt-4 border-t border-blue-50/80 flex items-center gap-4 flex-wrap">
                                            {svc.applications.length > 0 && (
                                                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4ED8]/40" />
                                                    {svc.applications.length} use cases
                                                </span>
                                            )}
                                            {svc.features.length > 0 && (
                                                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                                                    {svc.features.length} capabilities
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
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
