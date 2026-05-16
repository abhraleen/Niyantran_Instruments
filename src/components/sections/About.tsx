import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: '15+', label: 'Years of Expertise' },
    { value: '500+', label: 'Systems Deployed' },
    { value: '50+', label: 'Research Laboratories' },
    { value: '99.98%', label: 'Measurement Accuracy' },
];

export const About = () => {
    return (
        <section id="about" className="py-16 sm:py-24 lg:py-28 bg-surface relative overflow-hidden">
            <div className="absolute inset-0 scientific-grid opacity-[0.035] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-5">About Us</p>
                        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05] mb-6">
                            Precision<br />
                            <span className="text-gradient">Engineered</span>
                        </h2>
                        <p className="text-slate-500 text-base font-light leading-relaxed mb-4 max-w-md">
                            Niyantran Instruments delivers custom precision measurement systems and research automation solutions for semiconductor and photovoltaic laboratories worldwide.
                        </p>
                        <p className="text-slate-500 text-base font-light leading-relaxed max-w-md">
                            With over 15 years of deep-tech instrumentation experience, we engineer systems that combine rigorous hardware design with intuitive scientific software — built to the exact requirements of your research.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: 0.12 + i * 0.08, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                                className="group bg-white rounded-[1.5rem] border border-blue-50 p-5 sm:p-7 cursor-default hover:border-primary/18 hover:-translate-y-1.5 hover:shadow-[0_18px_52px_rgba(27,78,216,0.11),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-500"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                            >
                                <div className="text-2xl sm:text-3xl font-heading font-black text-navy tracking-tight mb-1.5 group-hover:text-primary transition-colors duration-300">{s.value}</div>
                                <div className="text-[10px] text-slate-400 font-mono tracking-[0.3em] uppercase font-bold leading-relaxed">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

