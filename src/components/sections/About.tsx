import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Rocket, Award } from 'lucide-react';

const milestones = [
    { year: "2010", label: "Founding", description: "Established as a specialized research hub for semiconductor instruments." },
    { year: "2015", label: "Automation", description: "Launched first precision automation layer for experimental physics." },
    { year: "2020", label: "Global Research", description: "Partnered with 50+ international labs for Quantum Efficiency systems." },
    { year: "Present", label: "Future Vision", description: "Pioneering sub-nanometer automation and research instrumentation." }
];

export const About = () => {
    return (
        <section id="about" className="py-48 bg-white relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-slate-50/50 skew-x-12 -translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-32 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/5 text-primary mb-12 border border-primary/10 transition-all hover:bg-primary/10 cursor-default"
                        >
                            <Rocket className="h-6 w-6" />
                            <span className="font-bold text-xs uppercase tracking-[0.2em]">Research Legacy</span>
                        </motion.div>
                        
                        <h2 className="text-sm font-mono tracking-[0.45em] text-slate-400 uppercase mb-8 flex items-center gap-4">
                            <span className="h-px w-10 bg-slate-200" />
                            Established 2010
                        </h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black text-heading mb-12 leading-[0.9] tracking-tighter">
                            ENGINEERING <br />
                            <span className="text-slate-300">PRECISION.</span>
                        </h3>
                        
                        <div className="space-y-10 text-xl md:text-2xl text-slate-500 leading-relaxed font-medium tracking-tight">
                            <p>
                                At Niyantran Instruments, we are building scientific instruments by researchers, for researchers. Our team brings together more than 15 years of hands-on research experience, primarily in the field of semiconductor science and advanced experimental techniques.
                            </p>
                            <p>
                                We understand the practical challenges faced in research laboratories because we have worked extensively with sophisticated measurement systems, device characterization, automation, and data acquisition ourselves. This deep research background allows us to design solutions that are reliable, precise, and tailored to real scientific needs.
                            </p>
                            <p className="text-black font-semibold">
                                Our mission is to develop advanced measurement systems and intelligent process automation tools that enhance experimental efficiency, accuracy, and usability. By combining strong scientific expertise with modern software and instrumentation engineering, we aim to bridge the gap between cutting-edge research requirements and accessible, high-quality instrumentation.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-16 mt-20">
                            {[
                                { val: "15+", label: "Years Experience" },
                                { val: "500+", label: "Systems Deployed" }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex flex-col"
                                >
                                    <span className="text-6xl font-heading font-black text-black mb-2">{stat.val}</span>
                                    <span className="text-[10px] text-primary font-mono uppercase tracking-[0.3em] font-bold">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/[0.03] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                <div className="text-[10px] font-mono text-primary font-bold mb-8 tracking-[0.3em] uppercase">{milestone.year}</div>
                                <h4 className="text-3xl font-heading font-black mb-6 text-heading leading-tight group-hover:text-primary transition-colors">{milestone.label}</h4>
                                <p className="text-lg text-slate-500 leading-relaxed font-medium tracking-tight relative z-10">
                                    {milestone.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
