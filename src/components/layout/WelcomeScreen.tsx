import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

export const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-heading flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 scientific-grid opacity-[0.03]" />
            
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                <div className="absolute inset-[-40px] bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                <Activity className="h-24 w-24 text-primary relative z-10" />
            </motion.div>

            <div className="mt-12 text-center relative overflow-hidden">
                <motion.h1 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-heading font-black text-white tracking-[-0.05em] mb-4"
                >
                    NIYANTRAN <span className="text-primary italic">INSTRUMENTS</span>
                </motion.h1>
                
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
                />
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-6 text-slate-500 font-mono text-[10px] tracking-[0.6em] uppercase font-bold"
                >
                    Precision Engineering • Established 2010
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 2, duration: 1.5 }}
                onAnimationComplete={() => onComplete()}
                className="absolute bottom-20 flex flex-col items-center gap-4"
            >
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="h-1 w-1 rounded-full bg-primary" 
                        />
                    ))}
                </div>
                <span className="text-slate-600 font-mono text-[10px] tracking-[0.2em]">BOOTING RESEARCH ENGINE</span>
            </motion.div>
        </motion.div>
    );
};
