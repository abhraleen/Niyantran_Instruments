import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Rocket, Award } from 'lucide-react';

const milestones = [
    { year: "2010", label: "Founding", description: "Established as a specialized research hub for semiconductor instruments." },
    { year: "2015", label: "Automation Pivot", description: "Launched first intelligent automation layer for experimental physics." },
    { year: "2020", label: "Global Research", description: "Partnered with 50+ international labs for Quantum Efficiency systems." },
    { year: "Present", label: "AI Integration", description: "Pioneering AI-driven predictive measurement analytics." }
];

export const About = () => {
    return (
        <section id="about" className="py-40 bg-white relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-alternate/10 skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-32 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-4 p-4 rounded-3xl bg-primary/5 text-primary mb-10 border border-primary/10"
                        >
                            <Rocket className="h-8 w-8" />
                            <span className="font-bold text-xs uppercase tracking-[0.2em]">Research Legacy</span>
                        </motion.div>
                        
                        <h2 className="text-sm font-mono tracking-[0.5em] text-primary/60 uppercase mb-6">Established 2010</h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black text-heading mb-12 leading-[0.9] tracking-tighter">
                            Engineering <br />
                            <span className="text-primary italic">Precision</span> <br />
                            for Science
                        </h3>
                        
                        <div className="space-y-10 text-2xl text-secondary-text leading-relaxed font-light tracking-tight">
                            <p>
                                Niyantran Instruments started with a singular vision: to deliver sub-nanometer accuracy where standard instrumentation fails.
                            </p>
                            <p className="text-heading font-normal">
                                Today, we anchor the research infrastructure for 50+ global laboratories, pushing the boundaries of semiconductor characterization.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-16 mt-20">
                            {[
                                { val: "15+", label: "Years Experience" },
                                { val: "500+", label: "Systems Deployed" },
                                { val: "99.9%", label: "Uptime Rating" }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex flex-col"
                                >
                                    <span className="text-6xl font-heading font-black text-primary mb-2">{stat.val}</span>
                                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em] font-bold">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="p-12 rounded-[3rem] glass border border-white hover:shadow-[0_40px_80px_rgba(37,99,235,0.1)] transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                <div className="text-[10px] font-mono text-primary font-bold mb-8 tracking-[0.2em] uppercase">{milestone.year}</div>
                                <h4 className="text-3xl font-heading font-black mb-6 text-heading leading-tight group-hover:text-primary transition-colors">{milestone.label}</h4>
                                <p className="text-lg text-slate-500 leading-relaxed font-light tracking-tight relative z-10">
                                    {milestone.description}
                                </p>
                                <div className="mt-10 h-1 w-12 bg-primary/20 group-hover:w-full transition-all duration-700 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
