import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Cpu, Database, TrendingUp } from 'lucide-react';

const steps = [
    { title: "Research", icon: Search, description: "Deep analysis of experimental requirements and scientific goals." },
    { title: "Instrumentation", icon: PenTool, description: "Precision engineering of hardware components and sensor arrays." },
    { title: "Automation", icon: Cpu, description: "Integrating intelligent logic and process control systems." },
    { title: "Data Acquisition", icon: Database, description: "High-resolution signaling and noise-resistant data pipelines." },
    { title: "Optimization", icon: TrendingUp, description: "Iterative refinement for peak experimental performance." }
];

export const Workflow = () => {
    return (
        <section id="workflow" className="py-40 bg-heading text-white overflow-hidden relative">
            {/* Cinematic Background Layering */}
            <div className="absolute inset-0 opacity-10 scientific-grid pointer-events-none" />
            <div className="absolute inset-0 scientific-dots opacity-5 pointer-events-none" />
            
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4 pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono tracking-[0.6em] text-primary uppercase mb-6">Execution Pipeline</h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black mb-10 tracking-tighter leading-none italic uppercase">METHODICAL <span className="text-primary tracking-normal not-italic underline underline-offset-[20px] decoration-4 decoration-primary/20">ACCURACY</span></h3>
                        <p className="text-xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
                            Our proprietary 5-step research lifecycle ensures that every instrument delivered satisfies the most rigorous scientific constraints.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Visual Connector Line */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:block absolute top-[80px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-40 h-40 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center mb-10 relative group transition-all duration-700 hover:border-primary hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
                                    <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <step.icon className="h-14 w-14 text-primary group-hover:scale-110 transition-transform duration-500" />
                                    
                                    {/* Procedural Step Counter */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-lg font-black shadow-xl shadow-blue-500/30 transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                                        0{index + 1}
                                    </div>
                                </div>
                                <h4 className="text-2xl font-heading font-black mb-6 tracking-tight group-hover:text-primary transition-colors">{step.title}</h4>
                                <p className="text-slate-400 text-base leading-relaxed max-w-[220px] font-light tracking-tight group-hover:text-slate-200 transition-colors">
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
