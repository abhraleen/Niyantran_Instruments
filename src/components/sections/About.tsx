import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';

const milestones = [
    { year: '2010', label: 'Founding', description: 'Established as a specialized research hub for semiconductor instruments.' },
    { year: '2015', label: 'Automation', description: 'Launched first precision automation layer for experimental physics.' },
    { year: '2020', label: 'Global Research', description: 'Partnered with 50+ international labs for Quantum Efficiency systems.' },
    { year: 'Today', label: 'Future Vision', description: 'Pioneering sub-nanometer automation and next-gen research instrumentation.' },
];

const stats = [
    { val: '15+', label: 'Years Experience', suffix: '' },
    { val: '500+', label: 'Systems Deployed', suffix: '' },
    { val: '50+', label: 'Global Partners', suffix: '' },
];

export const About = () => {
    return (
        <section id="about" className="py-40 bg-white relative overflow-hidden">
            {/* Background geometry */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-50/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-100/60 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-24 lg:gap-32 items-center">

                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/6 text-primary mb-10 border border-primary/12 hover:bg-primary/10 transition-colors cursor-default"
                        >
                            <Rocket className="h-4 w-4" />
                            <span className="font-bold text-[10px] uppercase tracking-[0.25em]">Research Legacy</span>
                        </motion.div>

                        <p className="section-label mb-8">
                            <span className="h-px w-10 bg-primary/30" />
                            Established 2010
                        </p>

                        <h3 className="text-5xl md:text-[5.5rem] font-heading font-black text-navy mb-10 leading-[0.9] tracking-[-0.03em]">
                            ENGINEERING <br />
                            <span className="text-gradient">PRECISION.</span>
                        </h3>

                        <div className="space-y-7 text-lg text-slate-500 leading-relaxed font-light tracking-tight">
                            <p>
                                At Niyantran Instruments, we are building scientific instruments by researchers, for researchers. Our team brings together more than 15 years of hands-on research experience, primarily in the field of semiconductor science and advanced experimental techniques.
                            </p>
                            <p>
                                We understand the practical challenges faced in research laboratories because we have worked extensively with sophisticated measurement systems, device characterization, automation, and data acquisition ourselves. This deep research background allows us to design solutions that are reliable, precise, and tailored to real scientific needs.
                            </p>
                            <p>
                                Our mission is to develop advanced measurement systems and intelligent process automation tools that enhance experimental efficiency, accuracy, and usability. By combining strong scientific expertise with modern software and instrumentation engineering, we aim to bridge the gap between cutting-edge research requirements and accessible, high-quality instrumentation.
                            </p>
                            <p className="text-navy font-medium">
                                At Niyantran Instruments, innovation is driven not only by technology, but by genuine research experience and a commitment to supporting the scientific community.
                            </p>
                        </div>


                        {/* Stats row */}
                        <div className="flex flex-wrap gap-12 mt-16 pt-12 border-t border-blue-50">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                >
                                    <div className="text-5xl font-heading font-black text-navy tracking-tight leading-none mb-1">{stat.val}</div>
                                    <div className="text-[10px] text-primary font-mono uppercase tracking-[0.3em] font-bold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right â€” milestone cards */}
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                className="p-9 rounded-[2.5rem] bg-white border border-blue-50 hover:border-primary/20 shadow-[0_4px_24px_rgba(27,78,216,0.04)] hover:shadow-[0_20px_60px_rgba(27,78,216,0.09)] transition-all duration-600 group relative overflow-hidden cursor-default"
                            >
                                {/* Hover glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/[0.04] rounded-full group-hover:bg-primary/[0.08] group-hover:scale-150 transition-all duration-700" />

                                <div className="text-[10px] font-mono text-primary font-black mb-6 tracking-[0.35em] uppercase">{milestone.year}</div>
                                <h4 className="text-2xl font-heading font-black mb-4 text-navy leading-tight group-hover:text-primary transition-colors duration-400">{milestone.label}</h4>
                                <p className="text-slate-400 leading-relaxed font-medium text-sm tracking-tight relative z-10">
                                    {milestone.description}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-primary/0 group-hover:text-primary/60 transition-colors duration-400">
                                    <ArrowRight className="h-4 w-4 -translate-x-2 group-hover:translate-x-0 transition-transform duration-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
