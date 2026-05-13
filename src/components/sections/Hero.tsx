import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Cpu, FlaskConical, Gauge, Zap } from 'lucide-react';

const floatingStats = [
    { label: 'System Accuracy', value: '99.98%', icon: Gauge, color: 'from-primary to-primary-light' },
    { label: 'Labs Worldwide', value: '50+', icon: FlaskConical, color: 'from-accent to-primary-light' },
    { label: 'Systems Deployed', value: '500+', icon: Cpu, color: 'from-primary-light to-accent' },
];

export const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useSpring(mouseX, { damping: 50, stiffness: 150 });
    const glowY = useSpring(mouseY, { damping: 50, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background"
        >
            {/* Cursor-following glow */}
            <motion.div
                style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%' }}
                className="absolute pointer-events-none w-[900px] h-[900px] bg-primary/[0.045] rounded-full blur-[160px] z-0"
            />

            {/* Atmospheric orbs */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18], x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 -left-1/4 w-[900px] h-[900px] bg-primary/6 rounded-full blur-[200px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.22, 0.15], x: [0, -40, 0], y: [0, 25, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-accent/5 rounded-full blur-[200px] pointer-events-none"
            />

            {/* Grid */}
            <div className="absolute inset-0 scientific-dots opacity-50 pointer-events-none" />
            <div className="absolute inset-0 fine-grid opacity-30 pointer-events-none" />

            {/* Top gradient fade */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-[1]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-blue-100 text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-12 shadow-[0_4px_24px_rgba(27,78,216,0.08)] hover:border-primary/30 transition-all duration-500 cursor-default"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                        </span>
                        Next-Generation Scientific Automation
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-heading font-black tracking-[-0.04em] leading-[0.88] mb-10"
                    >
                        <span className="block text-[clamp(4rem,11vw,10rem)] text-navy">PIONEERING</span>
                        <span className="block text-[clamp(4rem,11vw,10rem)] text-gradient">PRECISION</span>
                        <span className="block text-[clamp(3rem,8vw,7.5rem)] text-navy/12 font-light italic tracking-tight mt-2">
                            Redefined
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-14 leading-relaxed font-light tracking-tight"
                    >
                        Deep-tech instrumentation and semiconductor research automation systems engineered for the world's most demanding laboratories. Where physics meets absolute control.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
                    >
                        <Button
                            className="group rounded-[16px] px-10 h-[60px] bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.12em] uppercase shadow-[0_12px_40px_rgba(4,14,33,0.25)] hover:shadow-[0_16px_50px_rgba(27,78,216,0.40)] transition-all duration-500 hover:-translate-y-1 active:scale-95"
                        >
                            Explore Catalog
                            <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="rounded-[16px] px-10 h-[60px] text-sm font-bold tracking-[0.12em] uppercase text-slate-500 hover:text-navy hover:bg-blue-50/60 transition-all duration-400 border border-transparent hover:border-blue-100"
                        >
                            Our Methodology
                            <ChevronRight className="ml-2 h-4 w-4 opacity-60" />
                        </Button>
                    </motion.div>

                    {/* Floating stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 w-full max-w-3xl"
                    >
                        {floatingStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="flex-1 flex items-center gap-4 px-6 py-5 bg-white rounded-[20px] border border-blue-50 shadow-[0_4px_24px_rgba(27,78,216,0.06)] hover:shadow-[0_12px_40px_rgba(27,78,216,0.10)] transition-shadow duration-500 cursor-default"
                            >
                                <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-[0_4px_12px_rgba(27,78,216,0.25)] flex-shrink-0`}>
                                    <stat.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-heading font-black text-navy tracking-tight leading-none">{stat.value}</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-[0.2em] uppercase font-bold mt-0.5">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Dashboard console mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="p-1.5 rounded-[2.5rem] bg-gradient-to-br from-blue-100/60 via-white to-blue-50/40 border border-blue-100/80 shadow-[0_40px_100px_rgba(27,78,216,0.12),0_8px_32px_rgba(0,0,0,0.04)]">
                        <div className="bg-navy rounded-[2.2rem] p-8 relative overflow-hidden">
                            {/* Console glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                {/* Left â€” waveform */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase font-bold">System Load</span>
                                    <div className="flex items-end gap-1 h-8">
                                        {[6,10,7,14,9,16,8,13,10,7,12,15,8,11,9].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [h, h * 1.6, h] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                                                className="w-1 bg-gradient-to-t from-primary to-primary-light rounded-full opacity-80"
                                                style={{ height: h }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Center â€” accuracy */}
                                <div className="text-center">
                                    <div className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase font-bold mb-1">Calibration Pulse</div>
                                    <div className="text-3xl font-heading font-black text-gradient tracking-tight">99.982%</div>
                                    <div className="text-[10px] text-white/25 font-mono tracking-widest mt-1">ACCURACY</div>
                                </div>

                                {/* Right â€” status badge */}
                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.04]">
                                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] text-white/40 font-mono tracking-[0.25em] uppercase font-bold">All systems optimal</span>
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                                        <span className="text-[10px] text-primary-light font-mono tracking-[0.2em] uppercase font-black">ISO-9001 Certified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-[1]" />
        </section>
    );
};
