import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
            scrolled ? 'py-4' : 'py-10'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-700 rounded-[2.5rem] px-10 flex justify-between items-center ${
                    scrolled ? 'glass h-20 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]' : 'h-24 bg-transparent'
                }`}>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="bg-primary p-3 rounded-[1.25rem] shadow-xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Activity className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-3xl font-heading font-black tracking-tighter text-heading leading-none">
                            NIYANTRAN
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-12">
                        {['About', 'Services', 'Workflow', 'Contact'].map((item) => (
                            <a 
                                key={item}
                                href={`#${item.toLowerCase()}`} 
                                className="relative text-[10px] font-bold text-secondary-text hover:text-primary tracking-[0.3em] uppercase transition-colors group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary/20 rounded-full transition-all duration-500 group-hover:w-full" />
                            </a>
                        ))}
                        <Button className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95">
                            Get Started <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-secondary-text hover:bg-primary/5 rounded-2xl transition-colors">
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-4 right-4 mt-4 glass rounded-[2.5rem] border border-white/50 overflow-hidden shadow-2xl p-8"
                    >
                        <div className="flex flex-col gap-6">
                            {['About', 'Services', 'Workflow', 'Contact'].map((item) => (
                                <a 
                                    key={item}
                                    href={`#${item.toLowerCase()}`} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-heading font-black px-8 py-4 hover:bg-primary/5 rounded-3xl transition-all hover:translate-x-2"
                                >
                                    {item}
                                </a>
                            ))}
                            <Button className="w-full h-18 rounded-[2rem] bg-primary text-white font-black text-xl shadow-2xl">Get Started</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-heading text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="h-6 w-6 text-primary" />
                            <span className="text-2xl font-heading font-bold tracking-tight">NIYANTRAN</span>
                        </div>
                        <p className="text-slate-400 max-w-md leading-relaxed">
                            Pioneering the future of scientific instrumentation and semiconductor research automation with precision-engineered systems.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-heading font-semibold mb-6">Explore</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Research Solutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Measurement Systems</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Automation Hardware</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Scientific Software</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-heading font-semibold mb-6">Connect</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="mailto:sb@niyantran.org" className="hover:text-primary transition-colors">sb@niyantran.org</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">ResearchGate</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-sm">
                    <p>© 2026 Niyantran Instruments. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
