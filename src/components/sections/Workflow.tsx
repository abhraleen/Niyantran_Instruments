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
        <section id="workflow" className="py-48 bg-white overflow-hidden relative">
            {/* Cinematic Background Layering */}
            <div className="absolute inset-0 opacity-[0.03] scientific-grid pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono tracking-[0.6em] text-primary uppercase mb-10">Execution Pipeline</h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black text-black mb-12 tracking-tighter leading-none italic uppercase">
                            METHODICAL <span className="text-slate-300 tracking-normal not-italic">ACCURACY.</span>
                        </h3>
                        <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed tracking-tight">
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
                        className="hidden lg:block absolute top-[90px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent origin-left" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-20 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-44 h-44 rounded-[3.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 relative group transition-all duration-700 hover:border-primary/30 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
                                    <div className="absolute inset-0 bg-primary/[0.03] rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <step.icon className="h-14 w-14 text-black group-hover:text-primary group-hover:scale-110 transition-all duration-700" />
                                    
                                    {/* Procedural Step Counter */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-sm font-black shadow-2xl transform rotate-12 group-hover:rotate-0 transition-all duration-700 group-hover:bg-primary">
                                        {index + 1}
                                    </div>
                                </div>
                                <h4 className="text-2xl font-heading font-black mb-6 tracking-tight group-hover:text-primary transition-colors">{step.title}</h4>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-[240px] font-medium tracking-tight group-hover:text-slate-900 transition-colors">
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
