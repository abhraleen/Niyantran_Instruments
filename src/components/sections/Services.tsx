import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Beaker, Layers, Code, X, ChevronRight, CheckCircle2, Zap, FlaskConical, ArrowUpRight } from 'lucide-react';

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
    Activity, Beaker, Layers, Code, Zap, FlaskConical, CheckCircle2,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICON_MAP[name] ?? Activity;
    return <Icon className={className} strokeWidth={1.75} />;
}

// ─── Fallback static data (used when API is offline) ─────────────────────────
const FALLBACK: Service[] = [
    { id: 1, title: 'I–V Measurement Systems',       slug: 'iv-measurement-systems',       mode: 'industry',  short_description: 'Precision current–voltage characterisation for semiconductor devices, solar cells, and electronic materials research.',   full_description: '', applications: [], features: [], icon: 'Activity',    status: 'active', sort_order: 1, created_at: '', updated_at: '' },
    { id: 2, title: 'Quantum Efficiency Measurement', slug: 'quantum-efficiency-measurement', mode: 'industry', short_description: 'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterisation and performance analysis.',     full_description: '', applications: [], features: [], icon: 'Beaker',      status: 'active', sort_order: 2, created_at: '', updated_at: '' },
    { id: 3, title: 'Evaporation Process Control',    slug: 'evaporation-process-control',   mode: 'industry',  short_description: 'Automation and monitoring for thin-film deposition systems — improved process stability and repeatable results.',        full_description: '', applications: [], features: [], icon: 'Layers',      status: 'active', sort_order: 3, created_at: '', updated_at: '' },
    { id: 4, title: 'Scientific Software Consultancy',slug: 'scientific-software-consultancy',mode: 'both',     short_description: 'Custom instrument interfacing, automation, data acquisition, and analysis software for research and industrial applications.', full_description: '', applications: [], features: [], icon: 'Code',        status: 'active', sort_order: 4, created_at: '', updated_at: '' },
];

// ─── Service Detail Modal ─────────────────────────────────────────────────────
function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
    React.useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', fn);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const modeLabel = service.mode === 'industry' ? 'Industry' : service.mode === 'education' ? 'Education' : 'Industry & Education';
    const modeColor = service.mode === 'industry' ? 'bg-blue-50 text-blue-700 border-blue-200' : service.mode === 'education' ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-teal-50 text-teal-700 border-teal-200';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040E21]/40 backdrop-blur-[4px]"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-[0_48px_120px_rgba(4,14,33,0.28)] border border-slate-100"
            >
                {/* Header */}
                <div className="relative px-9 pt-9 pb-7 bg-gradient-to-br from-[#040E21] to-[#1B4ED8] rounded-t-[28px] overflow-hidden">
                    {/* bg decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-400/20 blur-2xl" />
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <X className="h-4 w-4 text-white/80" />
                    </button>
                    <div className="relative flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <ServiceIcon name={service.icon} className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${modeColor}`}>{modeLabel}</span>
                            </div>
                            <h2 className="font-heading font-black text-2xl text-white leading-tight tracking-[-0.02em]">{service.title}</h2>
                            <p className="text-white/60 text-sm mt-2 leading-relaxed">{service.short_description}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="px-9 py-8 space-y-8">
                    {/* Full description */}
                    {service.full_description && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-px flex-1 bg-slate-100" />
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.22em]">Overview</span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            <p className="text-slate-600 text-[14px] leading-[1.75]">{service.full_description}</p>
                        </div>
                    )}

                    {/* Applications + Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {service.applications.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <ArrowUpRight className="h-3.5 w-3.5 text-[#1B4ED8]" />
                                    </div>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.18em]">Applications</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {service.applications.map((app, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <ChevronRight className="h-3.5 w-3.5 text-[#1B4ED8] mt-[2px] flex-shrink-0" />
                                            <span className="text-[13px] text-slate-600 leading-snug">{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {service.features.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    </div>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.18em]">Key Features</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {service.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-[5px] flex-shrink-0" />
                                            <span className="text-[13px] text-slate-600 leading-snug">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="pt-2 flex gap-3">
                        <a
                            href="#contact"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_14px_rgba(27,78,216,0.2)]"
                        >
                            Request a Consultation
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <button
                            onClick={onClose}
                            className="px-5 h-11 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:border-slate-300 hover:text-slate-700 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Services Section ────────────────────────────────────────────────────────
export const Services = () => {
    const [services, setServices]   = React.useState<Service[]>([]);
    const [loading, setLoading]     = React.useState(true);
    const [selected, setSelected]   = React.useState<Service | null>(null);

    React.useEffect(() => {
        fetch('/api/services')
            .then(async r => {
                const json = await r.json();
                const data: Service[] = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
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
                        {displayServices.map((svc, i) => (
                            <motion.button
                                key={svc.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.7 }}
                                onClick={() => setSelected(svc)}
                                className="group rounded-[1.5rem] border border-blue-50 bg-surface p-8 hover:border-primary/15 hover:shadow-[0_8px_32px_rgba(27,78,216,0.07)] transition-all duration-300 text-left w-full"
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_4px_14px_rgba(27,78,216,0.22)] group-hover:shadow-[0_6px_20px_rgba(27,78,216,0.32)] transition-shadow duration-300 flex-shrink-0">
                                        <ServiceIcon name={svc.icon} className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-[#1B4ED8] transition-colors flex items-center gap-1 mt-0.5">
                                        Learn more <ArrowUpRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-xl text-navy tracking-tight mb-2.5">{svc.title}</h3>
                                <p className="text-slate-500 text-sm font-light leading-relaxed">{svc.short_description}</p>
                                {(svc.applications.length > 0 || svc.features.length > 0) && (
                                    <div className="mt-4 pt-4 border-t border-blue-50/80 flex items-center gap-3 text-[11px] text-slate-400">
                                        {svc.applications.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <ArrowUpRight className="h-3 w-3 text-[#1B4ED8]" />
                                                {svc.applications.length} applications
                                            </span>
                                        )}
                                        {svc.features.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                {svc.features.length} features
                                            </span>
                                        )}
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service detail modal */}
            <AnimatePresence>
                {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </>
    );
};
