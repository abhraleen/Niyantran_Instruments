import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Beaker, Layers, Code, ArrowRight } from 'lucide-react';

const services = [
    {
        title: "IV Measurement Systems",
        description: "Precision source-measure units and characterization systems for advanced semiconductors and nanomaterials.",
        icon: Activity,
        color: "blue",
    },
    {
        title: "Quantum Efficiency",
        description: "Spectral response measurement systems for solar cells, photodetectors, and optoelectronic research.",
        icon: Beaker,
        color: "cyan",
    },
    {
        title: "Evaporation Control",
        description: "Intelligent process control systems for thermal and e-beam evaporation systems with high-resolution feedback.",
        icon: Layers,
        color: "blue",
    },
    {
        title: "Software Consultancy",
        description: "Custom instrumentation software, automation drivers, and data analysis pipelines for research workflows.",
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
            <Card className="h-full glass hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.2)] transition-all duration-700 border-white/50 group overflow-hidden rounded-[3rem] p-4 relative">
                {/* Interactive Spotlight */}
                <motion.div 
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]"
                    style={{
                        background: useSpring(
                            `radial-gradient(600px circle at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(37, 99, 235, 0.08), transparent 80%)`,
                            { damping: 50, stiffness: 200 }
                        )
                    }}
                />
                
                <CardHeader className="p-10 relative z-10">
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${
                        service.color === 'blue' ? 'bg-primary/20 text-primary shadow-xl shadow-blue-500/10' : 'bg-accent/20 text-accent shadow-xl shadow-cyan-500/10'
                    }`}>
                        <service.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-3xl font-heading font-black mb-8 group-hover:text-primary transition-colors tracking-tight leading-tight">{service.title}</CardTitle>
                    <CardDescription className="text-lg text-slate-500 leading-relaxed font-light tracking-tight">
                        {service.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="px-10 pb-10 pt-0 relative z-10">
                    <Button variant="ghost" className="p-0 text-primary text-lg font-black group/btn items-center hover:bg-transparent">
                        View Specs <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover/btn:translate-x-3" />
                    </Button>
                </CardFooter>
                
                {/* Animated underline element */}
                <div className="absolute bottom-0 left-0 h-2 w-0 bg-primary group-hover:w-full transition-all duration-1000 ease-[0.16,1,0.3,1] z-20" />
            </Card>
        </motion.div>
    );
};

export const Services = () => {
    return (
        <section id="services" className="py-40 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 scientific-grid opacity-30" />
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono tracking-[0.5em] text-primary uppercase mb-8">Specialized Services</h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black text-heading mb-10 tracking-tighter leading-none italic uppercase">
                            CORE <span className="text-primary not-italic underline underline-offset-[16px] decoration-4 decoration-primary/20">CAPABILITIES</span>
                        </h3>
                        <p className="text-2xl text-secondary-text max-w-4xl mx-auto font-light leading-relaxed tracking-tight">
                            We build bespoke measurement solutions that integrate perfectly into modern research workflows, ensuring extreme data integrity.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
