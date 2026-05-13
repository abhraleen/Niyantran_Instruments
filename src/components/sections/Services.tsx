import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Beaker, Layers, Code, ArrowRight } from 'lucide-react';

const services = [
    {
        title: "I–V Measurement Systems",
        description: "Precision current–voltage characterization solutions for semiconductor devices, solar cells, and electronic materials research.",
        icon: Activity,
        color: "blue",
    },
    {
        title: "Quantum Efficiency",
        description: "Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterization and performance analysis.",
        icon: Beaker,
        color: "cyan",
    },
    {
        title: "Evaporation Control",
        description: "Automation and monitoring solutions for thin-film deposition and evaporation systems, enabling improved process stability.",
        icon: Layers,
        color: "blue",
    },
    {
        title: "Scientific Software Consultancy",
        description: "Custom software development, instrument interfacing, automation, data acquisition, and analysis solutions.",
        icon: Code,
        color: "cyan",
    }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightX = useSpring(mouseX, { damping: 20, stiffness: 150 });
    const spotlightY = useSpring(mouseY, { damping: 20, stiffness: 150 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className="h-full bg-white transition-all duration-700 border-slate-100 group overflow-hidden rounded-[2.5rem] p-4 relative shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-primary/20">
                {/* Interactive Spotlight */}
                <motion.div 
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"
                    style={{
                        background: useSpring(
                            `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(37, 99, 235, 0.04), transparent 80%)`,
                            { damping: 40, stiffness: 150 }
                        )
                    }}
                />
                
                <CardHeader className="p-10 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white ${
                        service.color === 'blue' ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-400'
                    }`}>
                        <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-heading font-black mb-6 transition-colors tracking-tight leading-tight">{service.title}</CardTitle>
                    <CardDescription className="text-lg text-slate-500 leading-relaxed font-medium tracking-tight">
                        {service.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="px-10 pb-10 pt-0 relative z-10">
                    <Button variant="ghost" className="p-0 text-primary text-base font-black group/btn items-center hover:bg-transparent tracking-tight">
                        View Technical Specs <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export const Services = () => {
    return (
        <section id="services" className="py-48 bg-white relative overflow-hidden">
            {/* Minimalist Grid and Accent */}
            <div className="absolute inset-0 scientific-grid opacity-30" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-[120px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-12"
                    >
                        <div className="max-w-3xl">
                            <h2 className="text-sm font-mono tracking-[0.4em] text-primary uppercase mb-10 flex items-center gap-4">
                                <span className="h-px w-12 bg-primary/30" />
                                Specialist Expertise
                            </h2>
                            <h3 className="text-5xl md:text-8xl font-heading font-black text-heading mb-10 tracking-tighter leading-[0.9]">
                                CORE<br />
                                <span className="text-slate-300">CAPABILITIES.</span>
                            </h3>
                            <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight leading-relaxed">
                                We build bespoke measurement solutions that integrate into modern research workflows, ensuring extreme data integrity.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-1.5 rounded-full bg-slate-100" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
