import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Activity, Beaker, Layers, Code, ArrowRight } from 'lucide-react';

const services = [
    {
        title: 'I–V Measurement Systems',
        description: 'Precision current–voltage characterization solutions for semiconductor devices, solar cells, and electronic materials research.',
        icon: Activity,
        accent: 'from-primary to-primary-light',
        bg: 'from-blue-50 to-white',
    },
    {
        title: 'Quantum Efficiency Measurement for Solar Cells',
        description: 'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterization and performance analysis.',
        icon: Beaker,
        accent: 'from-accent to-primary-light',
        bg: 'from-cyan-50/60 to-white',
    },
    {
        title: 'Evaporation Process Control',
        description: 'Automation and monitoring solutions for thin-film deposition and evaporation systems, enabling improved process stability and repeatability.',
        icon: Layers,
        accent: 'from-primary to-accent',
        bg: 'from-blue-50 to-white',
    },
    {
        title: 'Scientific Software Consultancy',
        description: 'Custom software development, instrument interfacing, automation, data acquisition, and analysis solutions for research and industrial applications.',
        icon: Code,
        accent: 'from-primary-light to-primary',
        bg: 'from-indigo-50/50 to-white',
    },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const spotY = useSpring(mouseY, { damping: 25, stiffness: 150 });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative"
        >
            <div className="h-full bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden transition-all duration-700 hover:border-primary/20 hover:shadow-[0_24px_60px_rgba(27,78,216,0.09)] hover:-translate-y-2 relative">
                {/* Spotlight */}
                {hovered && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-100"
                        style={{
                            background: `radial-gradient(400px circle at ${spotX.get()}px ${spotY.get()}px, rgba(27,78,216,0.05), transparent 70%)`,
                        }}
                    />
                )}

                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${service.accent}`} />

                <div className="p-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-[16px] bg-gradient-to-br ${service.accent} flex items-center justify-center mb-8 shadow-[0_6px_20px_rgba(27,78,216,0.22)] group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(27,78,216,0.30)] transition-all duration-600`}>
                        <service.icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                    </div>

                    <h3 className="text-2xl font-heading font-black text-navy mb-4 leading-tight tracking-tight group-hover:text-primary transition-colors duration-400">
                        {service.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm tracking-tight mb-8">
                        {service.description}
                    </p>

                    <Button variant="ghost" className="p-0 text-primary text-sm font-black group/btn items-center hover:bg-transparent tracking-tight">
                        View Technical Specs
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export const Services = () => {
    return (
        <section id="services" className="py-40 bg-surface relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 scientific-grid opacity-40 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-10"
                    >
                        <div className="max-w-2xl">
                            <p className="section-label mb-8">
                                <span className="h-px w-10 bg-primary/30" />
                                Specialist Expertise
                            </p>
                            <h2 className="text-5xl md:text-7xl font-heading font-black text-navy mb-8 tracking-[-0.03em] leading-[0.9]">
                                CORE<br />
                                <span className="text-navy/20 font-light tracking-tight">CAPABILITIES.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium tracking-tight leading-relaxed">
                                Bespoke measurement solutions that integrate into modern research workflows, ensuring extreme data integrity.
                            </p>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`rounded-full bg-primary/20 transition-all ${i === 1 ? 'w-8 h-2' : 'w-2 h-2'}`} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
