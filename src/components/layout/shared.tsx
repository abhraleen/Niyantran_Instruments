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
                <div className={`transition-all duration-700 rounded-[2.5rem] px-8 flex justify-between items-center ${
                    scrolled ? 'bg-white/80 backdrop-blur-2xl h-20 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]' : 'h-24 bg-transparent'
                }`}>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="bg-heading p-3 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:bg-primary transition-all duration-700">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-heading font-black tracking-tighter text-heading leading-none">
                            NIYANTRAN
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-12">
                        {['Services', 'Workflow', 'Contact'].map((item) => (
                            <a 
                                key={item}
                                href={`#${item.toLowerCase()}`} 
                                className="relative text-[10px] font-bold text-slate-500 hover:text-black tracking-[0.3em] uppercase transition-colors group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-700 group-hover:w-full" />
                            </a>
                        ))}
                        <Button className="rounded-2xl h-14 px-10 bg-heading hover:bg-black text-white font-black shadow-2xl transition-all hover:-translate-y-1 active:scale-95 duration-500">
                            Get Started
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors">
                            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="md:hidden absolute top-full left-4 right-4 mt-4 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl p-8"
                    >
                        <div className="flex flex-col gap-4">
                            {['Services', 'Workflow', 'Contact'].map((item) => (
                                <a 
                                    key={item}
                                    href={`#${item.toLowerCase()}`} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-heading font-black px-8 py-5 hover:bg-slate-50 rounded-3xl transition-all hover:translate-x-2"
                                >
                                    {item}
                                </a>
                            ))}
                            <Button className="w-full h-20 rounded-3xl bg-heading text-white font-black text-xl shadow-2xl mt-4">Get Started</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-32 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-slate-50/30 -skew-x-12 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-32">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-2xl font-heading font-black tracking-tighter text-black">NIYANTRAN</span>
                        </div>
                        <p className="text-slate-500 max-w-sm leading-relaxed font-medium tracking-tight text-lg mb-12">
                            Pioneering the future of scientific instrumentation and semiconductor research automation with precision-engineered systems.
                        </p>
                        <div className="flex gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer" />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-slate-400 mb-10">Explore</h4>
                        <ul className="space-y-5 text-slate-600 font-bold tracking-tight">
                            <li><a href="#" className="hover:text-primary transition-all">Research Solutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-all">Measurement Systems</a></li>
                            <li><a href="#" className="hover:text-primary transition-all">Automation Hardware</a></li>
                            <li><a href="#" className="hover:text-primary transition-all">Scientific Software</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-slate-400 mb-10">Connect</h4>
                        <ul className="space-y-5 text-slate-600 font-bold tracking-tight">
                            <li><a href="mailto:sb@niyantran.org" className="hover:text-primary transition-colors">sb@niyantran.org</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">ResearchGate</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:row items-center justify-between gap-6 text-slate-400 text-xs font-mono font-bold tracking-widest">
                    <p>© 2026 NIYANTRAN INSTRUMENTS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-slate-600 transition-colors">PRIVACY POLICY</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
