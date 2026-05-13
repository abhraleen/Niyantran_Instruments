import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu, FlaskConical, Gauge, Settings, Zap, Activity } from 'lucide-react';

const features = [
    { title: "Precision Engineering", icon: ShieldCheck, desc: "Sub-nanometer accuracy in every instrumentation build." },
    { title: "Research Expertise", icon: FlaskConical, desc: "Led by industry veterans with 15+ years of lab experience." },
    { title: "Automation Systems", icon: Cpu, desc: "End-to-end semiconductor characterization pipelines." },
    { title: "Reliable Measurement", icon: Gauge, desc: "ISO-certified calibration ensures scientific validity." }
];

export const WhyChooseUs = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="py-48 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <div className="flex-1 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-sm font-mono tracking-[0.4em] text-primary uppercase mb-10 flex items-center gap-4">
                                <span className="h-px w-12 bg-primary/30" />
                                Why Niyantran
                            </h2>
                            <h3 className="text-5xl md:text-[5.5rem] font-heading font-black text-heading mb-10 tracking-tighter leading-[0.9]">
                                MEASURING<br />
                                <span className="text-slate-300 tracking-tight">LIMITLESS.</span>
                            </h3>
                            <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight leading-relaxed max-w-xl">
                                We bridge the gap between complex physical phenomena and absolute data reliability through custom-built architectures.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -5 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group cursor-default"
                                >
                                    <div className="bg-slate-50 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-xl font-heading font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed tracking-tight text-sm">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div 
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ rotateX: rotateX, rotateY: rotateY, perspective: 1500 }}
                        className="flex-1 relative"
                    >
                        <div className="aspect-square rounded-[4rem] overflow-hidden bg-white border border-slate-100 relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]">
                             {/* Scientific Graphic Mockup */}
                             <div className="absolute inset-0 flex items-center justify-center p-16">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    style={{ 
                                        x: useTransform(mouseX, [-0.5, 0.5], [30, -30]),
                                        y: useTransform(mouseY, [-0.5, 0.5], [30, -30])
                                    }}
                                    className="w-full h-full border-2 border-dashed border-slate-200 rounded-full relative"
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                                        <Cpu className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                                        <Gauge className="h-10 w-10 text-accent" />
                                    </div>
                                </motion.div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div 
                                        style={{ 
                                            x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
                                            y: useTransform(mouseY, [-0.5, 0.5], [-20, 20])
                                        }}
                                        className="w-3/4 h-3/4 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] rounded-full blur-[80px]" 
                                    />
                                    <motion.div 
                                        animate={{ 
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 2, 0]
                                        }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ 
                                            x: useTransform(mouseX, [-0.5, 0.5], [40, -40]),
                                            y: useTransform(mouseY, [-0.5, 0.5], [40, -40])
                                        }}
                                        className="relative group/core"
                                    >
                                        <div className="absolute inset-x-[-60px] inset-y-[-60px] bg-primary/20 rounded-full blur-3xl opacity-0 group-hover/core:opacity-50 transition-opacity duration-1000" />
                                        <div className="bg-white p-16 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative border border-slate-100">
                                             <Activity className="h-24 w-24 text-primary" />
                                        </div>
                                    </motion.div>
                                </div>
                             </div>
                        </div>

                        {/* Floating Micro-Decors */}
                        <motion.div 
                            style={{ 
                                x: useTransform(mouseX, [-0.5, 0.5], [60, -60]),
                                y: useTransform(mouseY, [-0.5, 0.5], [60, -60])
                            }}
                            className="absolute -top-16 -right-16 w-64 h-64 bg-primary/[0.02] rounded-full blur-[100px]" 
                        />
                        <motion.div 
                            style={{ 
                                x: useTransform(mouseX, [-0.5, 0.5], [-80, 80]),
                                y: useTransform(mouseY, [-0.5, 0.5], [-80, 80])
                            }}
                            className="absolute -bottom-16 -left-16 w-80 h-80 bg-accent/[0.02] rounded-full blur-[120px]" 
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
