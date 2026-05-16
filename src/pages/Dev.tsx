import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Navbar, Footer } from '@/components/layout/shared';
import { PlatformCards, type ActiveMode } from '@/components/sections/PlatformCards';
import { DevContact, type InquiryMode } from '@/components/sections/DevContact';

// ─── Dev-only hero ────────────────────────────────────────────────────────────
const DevHero = ({ onSelectMode }: { onSelectMode: (mode: ActiveMode) => void }) => {
    const handleMode = (mode: ActiveMode) => {
        onSelectMode(mode);
        setTimeout(() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }), 50);
    };

    return (
        <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-background">
            <div className="absolute inset-0 fine-grid opacity-[0.35] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
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
                    Scientific Ecosystem
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading font-black tracking-[-0.035em] leading-[1.05] text-navy mb-7"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
                >
                    Instrumentation for<br />
                    Industry and<br />
                    <span className="text-gradient">Research</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed font-light"
                >
                    A dual-platform scientific ecosystem — precision measurement systems for research and industry, and structured learning programs for the next generation of scientists.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    <button
                        onClick={() => handleMode('industry')}
                        className="inline-flex items-center justify-center gap-2 rounded-[14px] px-8 h-[52px] w-full sm:w-auto bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.08em] uppercase shadow-[0_8px_32px_rgba(4,14,33,0.18)] hover:shadow-[0_12px_40px_rgba(27,78,216,0.30)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Industry Solutions
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleMode('education')}
                        className="inline-flex items-center gap-1.5 rounded-[14px] px-8 h-[52px] text-sm font-semibold text-slate-500 hover:text-navy hover:bg-blue-50/60 transition-all duration-300"
                    >
                        Education &amp; Training
                        <ChevronRight className="h-4 w-4 opacity-60" />
                    </button>
                </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
        </section>
    );
};

// ─── /dev page ────────────────────────────────────────────────────────────────
export const Dev = () => {
    const [inquiryMode, setInquiryMode] = React.useState<InquiryMode>('industry');
    const [activeMode, setActiveMode] = React.useState<ActiveMode>('industry');

    const handleSelectMode = (mode: InquiryMode) => {
        setInquiryMode(mode);
        setTimeout(() => {
            document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Dev banner */}
            <div className="fixed top-0 inset-x-0 z-[200] flex items-center justify-center gap-3 bg-amber-400 py-1.5 text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-amber-900 pointer-events-none select-none">
                <span className="flex h-1.5 w-1.5 rounded-full bg-amber-700 animate-pulse" />
                Development Preview — not for production
            </div>
            <div className="pt-7">
                <Navbar activeMode={activeMode} onActiveMode={setActiveMode} />
                <main>
                    <DevHero onSelectMode={setActiveMode} />
                    <PlatformCards
                        activeMode={activeMode}
                        onActiveMode={setActiveMode}
                        onSelectMode={handleSelectMode}
                    />
                    <DevContact mode={inquiryMode} onModeChange={setInquiryMode} />
                </main>
                <Footer />
            </div>
        </div>
    );
};
