import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const METRICS = [
    { value: '15+',    label: 'Years Experience'       },
    { value: '500+',   label: 'Systems Deployed'       },
    { value: '50+',    label: 'Research Labs'           },
    { value: '99.98%', label: 'Measurement Accuracy'   },
];

export const Hero = () => {
    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="relative min-h-[96vh] flex items-center justify-center pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-background">

            {/* ── Background atmosphere ── */}
            <div className="absolute inset-0 fine-grid opacity-[0.42] pointer-events-none" />

            {/* Central elliptical glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(27,78,216,0.055) 0%, transparent 68%)' }}
            />

            {/* Floating ambient orb — top-right */}
            <motion.div
                animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[18%] right-[12%] w-[380px] h-[380px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.045) 0%, transparent 70%)' }}
            />
            {/* Floating ambient orb — bottom-left */}
            <motion.div
                animate={{ x: [0, -22, 0], y: [0, 16, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute bottom-[18%] left-[8%] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(27,78,216,0.042) 0%, transparent 70%)' }}
            />

            {/* ── Content ── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-white text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary/70 mb-8 sm:mb-10 shadow-[0_2px_12px_rgba(27,78,216,0.07)]"
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    Scientific Instrumentation
                </motion.div>

                {/* Headline — per-line curtain reveal */}
                <h1
                    className="font-heading font-black tracking-[-0.038em] leading-[1.06] text-navy mb-7"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
                >
                    {(['Advanced Scientific', 'Instrumentation &'] as const).map((line, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.span
                                initial={{ y: '110%' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.05 + i * 0.11, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                {line}
                            </motion.span>
                        </div>
                    ))}
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.27, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-gradient"
                        >
                            Research Automation
                        </motion.span>
                    </div>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.72 }}
                    className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-8 sm:mb-11 leading-relaxed font-light px-2 sm:px-0"
                >
                    Precision measurement systems and automation solutions for modern research laboratories.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.46, duration: 0.68 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 sm:mb-16 w-full px-4 sm:px-0"
                >
                    <motion.button
                        onClick={() => scrollTo('inquiry')}
                        whileHover={{ y: -2.5, scale: 1.024 }}
                        whileTap={{ scale: 0.966 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        className="inline-flex items-center gap-2 rounded-[14px] px-6 sm:px-8 h-[48px] sm:h-[52px] w-full sm:w-auto justify-center bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.08em] uppercase shadow-[0_8px_32px_rgba(4,14,33,0.18)] hover:shadow-[0_14px_44px_rgba(27,78,216,0.32)] transition-colors transition-shadow duration-300"
                    >
                        Request Consultation
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => scrollTo('services')}
                        whileHover={{ y: -2, scale: 1.016 }}
                        whileTap={{ scale: 0.972 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        className="inline-flex items-center gap-1.5 rounded-[14px] px-6 sm:px-8 h-[48px] sm:h-[52px] w-full sm:w-auto justify-center text-sm font-semibold text-slate-500 hover:text-navy hover:bg-blue-50/70 transition-all duration-300"
                    >
                        View Services
                        <ChevronRight className="h-4 w-4 opacity-60" />
                    </motion.button>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.60, duration: 0.75 }}
                    className="inline-flex items-center justify-center flex-wrap rounded-[1.5rem] border border-blue-50 bg-white/70 backdrop-blur-sm shadow-[0_2px_16px_rgba(27,78,216,0.05)] px-1 py-1 w-full sm:w-auto"
                >
                    {METRICS.map((m, i) => (
                        <React.Fragment key={i}>
                            <div className="px-3 sm:px-5 py-3 text-center flex-1 sm:flex-none">
                                <div className="font-heading font-black text-[1.25rem] text-navy tracking-tight leading-none mb-0.5">
                                    {m.value}
                                </div>
                                <div className="text-[9.5px] text-slate-400 font-mono tracking-[0.28em] uppercase">
                                    {m.label}
                                </div>
                            </div>
                            {i < METRICS.length - 1 && (
                                <div className="h-6 w-px bg-blue-100 self-center mx-1" />
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>

            {/* Decorative oscilloscope trace */}
            <div aria-hidden className="absolute bottom-[5%] left-0 right-0 pointer-events-none opacity-[0.15]">
                <svg width="100%" height="36" viewBox="0 0 1440 36" preserveAspectRatio="none">
                    <motion.path
                        d="M0,18 C80,3 160,33 240,18 S400,3 480,18 S640,33 720,18 S880,3 960,18 S1120,33 1200,18 S1360,3 1440,18"
                        fill="none"
                        stroke="rgba(27,78,216,0.7)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.2, delay: 0.9, ease: 'easeInOut' }}
                    />
                </svg>
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        </section>
    );
};

