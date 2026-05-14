import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Beaker, Layers, Code } from 'lucide-react';

const services = [
    {
        icon: Activity,
        title: 'I–V Measurement Systems',
        description: 'Precision current–voltage characterisation for semiconductor devices, solar cells, and electronic materials research.',
    },
    {
        icon: Beaker,
        title: 'Quantum Efficiency Measurement',
        description: 'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterisation and performance analysis.',
    },
    {
        icon: Layers,
        title: 'Evaporation Process Control',
        description: 'Automation and monitoring for thin-film deposition systems — improved process stability and repeatable results.',
    },
    {
        icon: Code,
        title: 'Scientific Software Consultancy',
        description: 'Custom instrument interfacing, automation, data acquisition, and analysis software for research and industrial applications.',
    },
];

export const Services = () => {
    return (
        <section id="services" className="py-28 bg-white relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14"
                >
                    <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-4">What We Build</p>
                    <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05]">
                        Core Services
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.7 }}
                            className="group rounded-[1.5rem] border border-blue-50 bg-surface p-8 hover:border-primary/15 hover:shadow-[0_8px_32px_rgba(27,78,216,0.07)] transition-all duration-300"
                        >
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(27,78,216,0.22)] group-hover:shadow-[0_6px_20px_rgba(27,78,216,0.32)] transition-shadow duration-300">
                                <svc.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                            </div>
                            <h3 className="font-heading font-bold text-xl text-navy tracking-tight mb-2.5">{svc.title}</h3>
                            <p className="text-slate-500 text-sm font-light leading-relaxed">{svc.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
