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
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1"
                    >
                        <h2 className="text-sm font-mono tracking-[0.4em] text-primary uppercase mb-6">Partnership Value</h2>
                        <h3 className="text-4xl md:text-6xl font-heading font-bold text-heading mb-10 leading-tight">
                            Uncompromising <span className="text-primary italic">Accuracy</span> for Global Research
                        </h3>
                        <p className="text-xl text-secondary-text mb-16 leading-relaxed font-light">
                            We bridge the gap between theoretical research and practical measurement reality with systems that redefine accuracy.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 group cursor-pointer"
                                >
                                    <div className="bg-primary/5 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-bold text-xl text-heading mb-3">{feature.title}</h4>
                                    <p className="text-sm text-secondary-text leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ rotateX, rotateY, perspective: 1000 }}
                        className="flex-1 relative"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-border/50 relative group transition-transform duration-700">
                             {/* Scientific Graphic Mockup */}
                             <div className="absolute inset-0 flex items-center justify-center p-12">
                                <motion.div 
                                    style={{ 
                                        x: useTransform(mouseX, [-0.5, 0.5], [20, -20]),
                                        y: useTransform(mouseY, [-0.5, 0.5], [20, -20])
                                    }}
                                    className="w-full h-full border-2 border-dashed border-primary/20 rounded-full animate-spin-slow relative"
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-xl border border-primary/20 group-hover:scale-110 transition-transform duration-700">
                                        <Cpu className="h-8 w-8 text-primary" />
                                    </div>
                                </motion.div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div 
                                        style={{ 
                                            x: useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
                                            y: useTransform(mouseY, [-0.5, 0.5], [-15, 15])
                                        }}
                                        className="w-3/4 h-3/4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[80px] animate-pulse" 
                                    />
                                    <motion.div 
                                        style={{ 
                                            x: useTransform(mouseX, [-0.5, 0.5], [30, -30]),
                                            y: useTransform(mouseY, [-0.5, 0.5], [30, -30])
                                        }}
                                        className="relative group/core"
                                    >
                                        <div className="absolute inset-x-[-40px] inset-y-[-40px] bg-primary/20 rounded-full blur-2xl opacity-0 group-hover/core:opacity-100 transition-opacity duration-700" />
                                        <div className="bg-white p-12 rounded-full shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] relative border border-primary/10">
                                             <Activity className="h-20 w-20 text-primary animate-pulse" />
                                        </div>
                                    </motion.div>
                                </div>
                             </div>
                        </div>
                        {/* Decorative elements */}
                        <motion.div 
                            style={{ 
                                x: useTransform(mouseX, [-0.5, 0.5], [50, -50]),
                                y: useTransform(mouseY, [-0.5, 0.5], [50, -50])
                            }}
                            className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[100px] animate-pulse" 
                        />
                        <motion.div 
                            style={{ 
                                x: useTransform(mouseX, [-0.5, 0.5], [-60, 60]),
                                y: useTransform(mouseY, [-0.5, 0.5], [-60, 60])
                            }}
                            className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} 
                        />
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </section>
    );
};
