import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Layered radial glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-primary/8 blur-[250px]" />
                <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/6 blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[180px]" />
            </div>

            {/* Subtle grid */}
            <div className="absolute inset-0 scientific-grid opacity-[0.035] pointer-events-none" />

            {/* Light beams */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: [0, 0.06, 0], y: '120vh' }}
                    transition={{ duration: 6 + i * 2, delay: i * 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-px bg-gradient-to-b from-transparent via-primary-light to-transparent h-[60vh]"
                    style={{ left: `${20 + i * 22}%` }}
                />
            ))}

            {/* Logo mark */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-14"
            >
                <motion.div
                    animate={{ scale: [1, 1.9, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-[-20px] rounded-[2.5rem] bg-primary/25 blur-2xl"
                />
                <motion.div
                    animate={{ scale: [1, 2.6, 1], opacity: [0.15, 0, 0.15] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                    className="absolute inset-[-30px] rounded-[3rem] bg-primary/15 blur-3xl"
                />
                <div className="relative z-10 w-[88px] h-[88px] bg-gradient-to-br from-primary to-primary-light rounded-[1.75rem] flex items-center justify-center shadow-[0_24px_80px_rgba(27,78,216,0.55)]">
                    <Activity className="h-11 w-11 text-white" strokeWidth={1.75} />
                </div>
            </motion.div>

            {/* Brand text */}
            <div className="text-center overflow-hidden">
                <motion.h1
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-heading font-black tracking-[-0.05em] mb-5"
                >
                    <span className="text-white">NIYANTRAN</span>
                    <span className="mx-4 text-white/15">·</span>
                    <span className="text-gradient">INSTRUMENTS</span>
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.65, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="mt-6 text-white/30 font-mono text-[10px] tracking-[0.65em] uppercase font-bold"
                >
                    Precision Engineering&nbsp;&nbsp;•&nbsp;&nbsp;Established 2010
                </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 2.1, duration: 1.6 }}
                onAnimationComplete={() => onComplete()}
                className="absolute bottom-16 flex flex-col items-center gap-4"
            >
                <div className="w-48 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.2, duration: 2.2, ease: 'easeInOut' }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                </div>
                <span className="text-white/25 font-mono text-[10px] tracking-[0.4em] uppercase">
                    Initializing Systems
                </span>
            </motion.div>
        </motion.div>
    );
};
