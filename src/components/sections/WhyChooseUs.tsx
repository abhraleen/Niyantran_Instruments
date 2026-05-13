import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu, FlaskConical, Gauge, Activity, CheckCircle2 } from 'lucide-react';

const features = [
    {
        title: 'Precision Engineering',
        icon: ShieldCheck,
        desc: 'Sub-nanometer accuracy in every instrumentation build with rigorous QA processes.',
    },
    {
        title: 'Research Expertise',
        icon: FlaskConical,
        desc: 'Led by industry veterans with 15+ years of hands-on laboratory experience.',
    },
    {
        title: 'Automation Systems',
        icon: Cpu,
        desc: 'End-to-end semiconductor characterization pipelines built for real workflows.',
    },
    {
        title: 'Reliable Measurement',
        icon: Gauge,
        desc: 'ISO-certified calibration ensures scientific validity across every data point.',
    },
];

const differentiators = [
    'Custom-built measurement architectures for your exact experimental conditions',
    'Seamless integration with existing laboratory infrastructure',
    'Continuous firmware and software support post-deployment',
    'Expert on-site calibration and training programs',
    'Research publications backed by our instrumentation',
];

export const WhyChooseUs = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 120 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 120 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section className="py-40 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/40 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">

                    {/* Left â€” text content */}
                    <div className="flex-1 space-y-14">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="section-label mb-8">
                                <span className="h-px w-10 bg-primary/30" />
                                Why Niyantran
                            </p>
                            <h3 className="text-5xl md:text-[5.5rem] font-heading font-black text-navy mb-8 tracking-[-0.03em] leading-[0.9]">
                                MEASURING<br />
                                <span className="text-navy/15 font-light tracking-tight">LIMITLESS.</span>
                            </h3>
                            <p className="text-lg text-slate-400 font-medium tracking-tight leading-relaxed max-w-lg">
                                We bridge the gap between complex physical phenomena and absolute data reliability through custom-built architectures.
                            </p>
                        </motion.div>

                        {/* Feature grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -4 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className="p-7 rounded-[1.5rem] border border-blue-50 bg-white hover:border-primary/18 hover:shadow-[0_16px_40px_rgba(27,78,216,0.07)] transition-all duration-500 group cursor-default"
                                >
                                    <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-light rounded-[12px] flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(27,78,216,0.25)] group-hover:shadow-[0_8px_24px_rgba(27,78,216,0.35)] group-hover:scale-105 transition-all duration-500">
                                        <feature.icon className="h-5 w-5 text-white" strokeWidth={2} />
                                    </div>
                                    <h4 className="text-lg font-heading font-bold mb-2 tracking-tight text-navy group-hover:text-primary transition-colors duration-400">{feature.title}</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed text-sm tracking-tight">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right â€” 3D card */}
                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ rotateX, rotateY, perspective: 1200 }}
                        className="flex-1 max-w-lg w-full"
                    >
                        {/* Navy premium card */}
                        <div className="bg-navy rounded-[3rem] overflow-hidden border border-white/[0.07] shadow-[0_40px_100px_rgba(4,14,33,0.35),0_8px_32px_rgba(4,14,33,0.15)] relative group">
                            {/* Top accent line */}
                            <div className="h-1 w-full bg-gradient-to-r from-primary via-primary-light to-accent" />

                            {/* Inner glow */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/12 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />

                            <div className="p-10 relative z-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-[14px] flex items-center justify-center shadow-[0_6px_20px_rgba(27,78,216,0.5)]">
                                        <Activity className="h-6 w-6 text-white" strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <div className="text-white font-heading font-black text-lg tracking-tight">Research Grade</div>
                                        <div className="text-white/35 text-[10px] font-mono tracking-[0.25em] uppercase">Quality Assurance</div>
                                    </div>
                                </div>

                                {/* Differentiator list */}
                                <ul className="space-y-4 mb-10">
                                    {differentiators.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
                                            className="flex items-start gap-3.5 group/item"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-primary-light mt-0.5 flex-shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity" />
                                            <span className="text-white/50 text-sm font-medium leading-relaxed tracking-tight group-hover/item:text-white/80 transition-colors duration-300">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Bottom stat */}
                                <div className="pt-8 border-t border-white/[0.06]">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-5xl font-heading font-black text-gradient tracking-tight leading-none">99.98%</span>
                                        <div>
                                            <div className="text-white/60 text-sm font-bold leading-tight">Measurement</div>
                                            <div className="text-white/60 text-sm font-bold">Accuracy</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-[10px] text-white/20 font-mono tracking-[0.3em] uppercase font-bold">ISO-9001 Research Certified</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
