import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Workflow', href: '#workflow' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-700 rounded-[1.75rem] px-6 ${
                    scrolled
                        ? 'bg-white/80 backdrop-blur-2xl h-[68px] border border-blue-100/80 shadow-[0_8px_40px_rgba(27,78,216,0.07),0_2px_12px_rgba(0,0,0,0.04)]'
                        : 'h-[80px] bg-transparent'
                }`}>

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3.5 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-[12px] flex items-center justify-center shadow-[0_6px_20px_rgba(27,78,216,0.30)] group-hover:shadow-[0_10px_30px_rgba(27,78,216,0.45)] group-hover:scale-105 transition-all duration-500">
                            <Activity className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[17px] font-heading font-black tracking-[-0.04em] text-navy">NIYANTRAN</span>
                            <span className="text-[9px] font-mono text-primary/60 tracking-[0.25em] uppercase font-bold">Instruments</span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="relative text-[11px] font-bold tracking-[0.22em] uppercase text-slate-500 hover:text-navy transition-colors duration-300 py-1.5 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 group-hover:w-full" />
                            </a>
                        ))}
                        <Button
                            className="rounded-[14px] h-11 px-7 bg-navy hover:bg-primary text-white font-bold text-[10px] tracking-[0.2em] uppercase shadow-[0_6px_20px_rgba(4,14,33,0.25)] hover:shadow-[0_10px_30px_rgba(27,78,216,0.35)] transition-all duration-500 hover:-translate-y-0.5 active:scale-95"
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2.5 text-navy hover:bg-blue-50 rounded-xl transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/96 backdrop-blur-2xl rounded-[2rem] border border-blue-50 overflow-hidden shadow-[0_40px_80px_rgba(27,78,216,0.1)] p-5"
                    >
                        <div className="flex flex-col gap-1.5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-heading font-black px-5 py-4 hover:bg-blue-50 rounded-2xl transition-all hover:text-primary hover:translate-x-1"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button className="w-full h-14 rounded-2xl bg-navy text-white font-black text-base mt-2 hover:bg-primary transition-colors">
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-navy relative overflow-hidden">
            {/* Atmospheric glows */}
            <div className="absolute pointer-events-none inset-0">
                <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-accent/7 rounded-full blur-[180px]" />
            </div>
            <div className="absolute inset-0 scientific-grid opacity-[0.025] pointer-events-none" />

            {/* Top separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-24 pb-16 grid grid-cols-1 md:grid-cols-12 gap-16">

                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3.5 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-[12px] flex items-center justify-center">
                                <Activity className="h-5 w-5 text-white" strokeWidth={2} />
                            </div>
                            <span className="text-[17px] font-heading font-black tracking-[-0.04em] text-white">NIYANTRAN</span>
                        </div>
                        <p className="text-white/35 max-w-xs leading-relaxed text-sm font-medium mb-10">
                            Pioneering the future of scientific instrumentation and semiconductor research automation with precision-engineered systems.
                        </p>
                        <a
                            href="mailto:sb@niyantran.org"
                            className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors font-bold group"
                        >
                            <Mail className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            sb@niyantran.org
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>

                    {/* Solutions */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h4 className="text-[10px] font-black font-mono tracking-[0.4em] uppercase text-white/25 mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            {['I–V Measurement', 'Quantum Efficiency', 'Evaporation Control', 'Scientific Software'].map(item => (
                                <li key={item}>
                                    <a href="#services" className="text-white/45 hover:text-white transition-colors duration-300 text-sm font-semibold">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black font-mono tracking-[0.4em] uppercase text-white/25 mb-8">Connect</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'LinkedIn', href: '#' },
                                { label: 'ResearchGate', href: '#' },
                                { label: 'niyantran.org', href: 'https://niyantran.org' },
                            ].map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-white/45 hover:text-white transition-colors duration-300 text-sm font-semibold">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="h-px bg-white/[0.05]" />
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/20 text-[10px] font-mono tracking-[0.35em] uppercase">
                        © {year} Niyantran Instruments. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service'].map(item => (
                            <a key={item} href="#" className="text-white/20 hover:text-white/50 transition-colors text-[10px] font-mono tracking-[0.25em] uppercase">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
