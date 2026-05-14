import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const Hero = () => {
    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-background">
            {/* Subtle background */}
            <div className="absolute inset-0 fine-grid opacity-[0.35] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-100 bg-white text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-primary/70 mb-10 shadow-[0_2px_12px_rgba(27,78,216,0.06)]"
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    Scientific Instrumentation
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading font-black tracking-[-0.035em] leading-[1.05] text-navy mb-7"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
                >
                    Advanced Scientific<br />
                    Instrumentation &amp;<br />
                    <span className="text-gradient">Research Automation</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Precision measurement systems and automation solutions for modern research laboratories.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    <button
                        onClick={() => scrollTo('inquiry')}
                        className="inline-flex items-center gap-2 rounded-[14px] px-8 h-[52px] bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.08em] uppercase shadow-[0_8px_32px_rgba(4,14,33,0.18)] hover:shadow-[0_12px_40px_rgba(27,78,216,0.30)] transition-all duration-400 hover:-translate-y-0.5 active:scale-95"
                    >
                        Request Consultation
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => scrollTo('services')}
                        className="inline-flex items-center gap-1.5 rounded-[14px] px-8 h-[52px] text-sm font-semibold text-slate-500 hover:text-navy hover:bg-blue-50/60 transition-all duration-300"
                    >
                        View Services
                        <ChevronRight className="h-4 w-4 opacity-60" />
                    </button>
                </motion.div>
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        </section>
    );
};

