import React, { useRef } from 'react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Database, Microchip, FlaskConical, Beaker } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

export const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useSpring(mouseX, { damping: 40, stiffness: 200 });
    const glowY = useSpring(mouseY, { damping: 40, stiffness: 200 });

    const consoleRef = useRef<HTMLDivElement>(null);
    const consoleX = useMotionValue(0);
    const consoleY = useMotionValue(0);
    const consoleRotateX = useSpring(useTransform(consoleY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
    const consoleRotateY = useSpring(useTransform(consoleX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);

        if (consoleRef.current) {
            const rect = consoleRef.current.getBoundingClientRect();
            const x = (clientX - rect.left) / rect.width - 0.5;
            const y = (clientY - rect.top) / rect.height - 0.5;
            consoleX.set(x);
            consoleY.set(y);
        }
    };

    const handleConsoleLeave = () => {
        consoleX.set(0);
        consoleY.set(0);
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background selection:bg-primary/20"
        >
            {/* Immersive Mouse Glow */}
            <motion.div 
                style={{ 
                    x: glowX, 
                    y: glowY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                className="absolute pointer-events-none w-[1000px] h-[1000px] bg-primary/[0.04] rounded-full blur-[150px] z-0"
            />

            {/* Background Layers with subtle movement */}
            <motion.div 
                style={{ 
                    x: useTransform(mouseX, [0, 2000], [15, -15]),
                    y: useTransform(mouseY, [0, 1000], [15, -15])
                }}
                className="absolute inset-0 scientific-grid opacity-30" 
            />
            <motion.div 
                style={{ 
                    x: useTransform(mouseX, [0, 2000], [-30, 30]),
                    y: useTransform(mouseY, [0, 1000], [-30, 30])
                }}
                className="absolute inset-0 scientific-dots opacity-40" 
            />
            
            {/* Animated Glow Fields */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                    x: [0, 40, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px]" 
            />
            <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.25, 0.2],
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-1/4 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[180px]" 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center"
                >
                    <motion.div 
                        variants={itemVariants} 
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-slate-100 text-primary font-bold text-xs tracking-[0.25em] uppercase mb-12 shadow-[0_10px_40px_rgba(37,99,235,0.06)] hover:border-primary/20 transition-colors cursor-default"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(37,99,235,1)]" />
                        Next-Generation Scientific Automation
                    </motion.div>

                    <motion.h1 
                        variants={itemVariants} 
                        className="text-6xl md:text-[9.5rem] font-heading font-black tracking-tighter text-heading leading-[0.85] mb-12"
                    >
                        PIONEERING <br /> 
                        <span className="text-gradient">PRECISION</span>
                        <br />
                        <span className="text-heading/20 font-light italic tracking-tight">REDEFINED</span>
                    </motion.h1>

                    <motion.p 
                        variants={itemVariants} 
                        className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mb-16 leading-relaxed font-light tracking-tight"
                    >
                        Deep-tech instrumentation and semiconductor research automation systems engineered for the world's most demanding laboratories. Where physics meets absolute control.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Button size="xl" className="group rounded-2xl px-12 h-20 bg-primary hover:bg-black text-white text-xl font-black shadow-[0_25px_60px_-10px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-2 active:scale-95 duration-500">
                            Explore Catalog 
                            <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                        </Button>
                        <Button variant="ghost" size="xl" className="rounded-2xl px-12 h-20 text-xl font-bold text-slate-600 hover:text-black hover:bg-slate-50 transition-all hover:-translate-y-1">
                            Our Methodology
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Status Console Mockup */}
                <motion.div 
                    ref={consoleRef}
                    onMouseLeave={handleConsoleLeave}
                    style={{ rotateX: consoleRotateX, rotateY: consoleRotateY, perspective: 1000 }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-32 p-1.5 glass rounded-[2.5rem] max-w-4xl mx-auto border border-white/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group cursor-crosshair"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="bg-heading rounded-[2rem] p-8 flex flex-col md:row items-center justify-between text-white relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">System Load</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: [12, 20, 12] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-1 bg-primary rounded-full" 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Calibration Pulse</span>
                                <span className="text-xl font-heading font-bold text-primary">99.982% Accuracy</span>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest uppercase">
                            ISO-9001 RESEARCH CERTIFIED
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Floating Scientific Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: Math.random() * 100 + "%", y: "100%" }}
                        animate={{ 
                            opacity: [0, 0.3, 0],
                            y: "-10%",
                            x: (Math.random() * 100) + "%"
                        }}
                        transition={{ 
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className="absolute"
                    >
                        <Microchip className="h-6 w-6 text-primary/20" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
