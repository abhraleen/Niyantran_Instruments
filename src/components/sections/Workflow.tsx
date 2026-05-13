import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Cpu, Database, TrendingUp } from 'lucide-react';

const steps = [
    { title: 'Research', icon: Search, description: 'Deep analysis of experimental requirements and scientific goals.' },
    { title: 'Instrumentation', icon: PenTool, description: 'Precision engineering of hardware components and sensor arrays.' },
    { title: 'Automation', icon: Cpu, description: 'Integrating intelligent logic and process control systems.' },
    { title: 'Data Acquisition', icon: Database, description: 'High-resolution signaling and noise-resistant data pipelines.' },
    { title: 'Optimization', icon: TrendingUp, description: 'Iterative refinement for peak experimental performance.' },
];

export const Workflow = () => {
    return (
        <section id="workflow" className="py-40 bg-surface overflow-hidden relative">
            <div className="absolute inset-0 scientific-grid opacity-[0.045] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="section-label justify-center mb-8">Execution Pipeline</p>
                        <h3 className="text-5xl md:text-7xl font-heading font-black text-navy mb-8 tracking-[-0.03em] leading-[0.9]">
                            METHODICAL <span className="text-navy/15 font-light italic">Accuracy.</span>
                        </h3>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
                            Our proprietary 5-step research lifecycle ensures that every instrument delivered satisfies the most rigorous scientific constraints.
                        </p>
                    </motion.div>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Animated connector line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:block absolute top-[88px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent origin-left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                transition={{ delay: index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col items-center text-center group cursor-default"
                            >
                                {/* Icon container */}
                                <div className="relative mb-8">
                                    <div className="w-44 h-44 rounded-[3rem] bg-white border border-blue-50 flex items-center justify-center transition-all duration-700 group-hover:border-primary/25 group-hover:shadow-[0_24px_60px_rgba(27,78,216,0.10)] relative overflow-hidden">
                                        {/* Hover inner glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />
                                        <step.icon className="h-12 w-12 text-navy/30 group-hover:text-primary group-hover:scale-110 transition-all duration-600 relative z-10" strokeWidth={1.5} />
                                    </div>

                                    {/* Step number badge */}
                                    <motion.div
                                        initial={{ rotate: 12 }}
                                        whileHover={{ rotate: 0, scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute -top-4 -right-4 w-11 h-11 rounded-[12px] bg-gradient-to-br from-navy to-primary flex items-center justify-center text-white text-sm font-black shadow-[0_6px_20px_rgba(4,14,33,0.30)] group-hover:shadow-[0_10px_28px_rgba(27,78,216,0.35)] transition-shadow duration-600"
                                    >
                                        {index + 1}
                                    </motion.div>
                                </div>

                                <h4 className="text-xl font-heading font-black mb-3 tracking-tight text-navy group-hover:text-primary transition-colors duration-400">
                                    {step.title}
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] font-medium tracking-tight group-hover:text-slate-600 transition-colors duration-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
