import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Cpu, BarChart3, Layers,
    GraduationCap, BookOpen, Users, Briefcase,
    ArrowRight,
} from 'lucide-react';

const platforms = [
    {
        id: 'industry',
        label: 'For Research & Industry',
        tag: 'Business Inquiries',
        title: 'Industry Solutions',
        description:
            'Precision instrumentation and automation systems engineered for semiconductor laboratories, photovoltaic research, and industrial measurement applications.',
        features: [
            { icon: Activity,  text: 'I–V & QE Measurement Systems' },
            { icon: Cpu,       text: 'Semiconductor Process Automation' },
            { icon: BarChart3, text: 'Custom Data Acquisition Software' },
            { icon: Layers,    text: 'Thin-Film Evaporation Control' },
        ],
        cta: 'Request a Consultation',
        iconGradient: 'from-primary to-primary-light',
        accentBar: 'from-primary to-primary-light',
        hoverBorder: 'hover:border-primary/25',
        hoverShadow: 'hover:shadow-[0_20px_64px_rgba(27,78,216,0.09)]',
        ctaGradient: 'from-navy to-primary',
        ctaShadow: 'shadow-[0_4px_18px_rgba(4,14,33,0.20)] hover:shadow-[0_8px_32px_rgba(27,78,216,0.28)]',
    },
    {
        id: 'education',
        label: 'For Students & Researchers',
        tag: 'Open Programs',
        title: 'Education & Training',
        description:
            'Structured programs designed to bridge academic learning and applied scientific research — for students, graduates, and early-career researchers.',
        features: [
            { icon: BookOpen,     text: 'Scientific Instrumentation Training' },
            { icon: GraduationCap, text: 'Research Exposure Programs' },
            { icon: Users,        text: 'Internship & Mentorship Tracks' },
            { icon: Briefcase,    text: 'Employability & Career Pathways' },
        ],
        cta: 'Explore Student Programs',
        iconGradient: 'from-accent to-cyan-400',
        accentBar: 'from-accent to-cyan-300',
        hoverBorder: 'hover:border-cyan-300/35',
        hoverShadow: 'hover:shadow-[0_20px_64px_rgba(14,165,233,0.08)]',
        ctaGradient: 'from-accent to-cyan-500',
        ctaShadow: 'shadow-[0_4px_18px_rgba(14,165,233,0.18)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.28)]',
    },
] as const;

interface PlatformCardsProps {
    onSelectMode?: (mode: 'industry' | 'education') => void;
}

export const PlatformCards = ({ onSelectMode }: PlatformCardsProps) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-3">
                        Platform
                    </p>
                    <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05]">
                        Two Domains.<br />
                        <span className="text-gradient">One Ecosystem.</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                    {platforms.map((p, i) => (
                        <motion.div
                            id={p.id}
                            key={p.id}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.75 }}
                            className={`group relative rounded-[2rem] border border-blue-50 bg-surface p-8 flex flex-col transition-all duration-500 ${p.hoverBorder} ${p.hoverShadow}`}
                        >
                            {/* Top accent bar */}
                            <div
                                className={`absolute top-0 left-10 right-10 h-[2px] rounded-b-full bg-gradient-to-r ${p.accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            {/* Meta row */}
                            <div className="flex items-center justify-between mb-7">
                                <span className="text-[10px] font-mono font-bold tracking-[0.38em] uppercase text-slate-400">
                                    {p.label}
                                </span>
                                <span className="text-[9px] font-mono font-bold tracking-[0.28em] uppercase px-3 py-1 rounded-full bg-white border border-blue-100 text-primary/55">
                                    {p.tag}
                                </span>
                            </div>

                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${p.iconGradient} flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(27,78,216,0.18)] group-hover:scale-[1.06] transition-transform duration-400`}
                            >
                                {i === 0
                                    ? <Activity className="h-5 w-5 text-white" strokeWidth={1.75} />
                                    : <GraduationCap className="h-5 w-5 text-white" strokeWidth={1.75} />
                                }
                            </div>

                            {/* Title + description */}
                            <h3 className="font-heading font-black text-[1.6rem] text-navy tracking-[-0.02em] mb-3">
                                {p.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
                                {p.description}
                            </p>

                            {/* Feature list */}
                            <ul className="space-y-3 mb-10 flex-1">
                                {p.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div
                                            className={`w-7 h-7 rounded-[8px] bg-gradient-to-br ${p.iconGradient} flex items-center justify-center opacity-75 flex-shrink-0 group-hover:opacity-100 transition-opacity duration-300`}
                                        >
                                            <feat.icon className="h-3.5 w-3.5 text-white" strokeWidth={1.75} />
                                        </div>
                                        <span className="text-[13px] text-slate-600 font-medium">{feat.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={() => onSelectMode?.(p.id)}
                                className={`inline-flex items-center gap-2 self-start rounded-[12px] px-6 h-[44px] bg-gradient-to-r ${p.ctaGradient} text-white text-[13px] font-bold tracking-[0.06em] ${p.ctaShadow} hover:-translate-y-0.5 active:scale-95 transition-all duration-300`}
                            >
                                {p.cta}
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        </section>
    );
};
