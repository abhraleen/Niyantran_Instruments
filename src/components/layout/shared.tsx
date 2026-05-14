import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Inquiry', href: '#inquiry' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-700 rounded-[1.75rem] px-6 ${
                    scrolled
                        ? 'bg-white/80 backdrop-blur-2xl h-[64px] border border-blue-100/80 shadow-[0_8px_40px_rgba(27,78,216,0.07),0_2px_12px_rgba(0,0,0,0.04)]'
                        : 'h-[76px] bg-transparent'
                }`}>

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-9 h-9 rounded-[10px] overflow-hidden shadow-[0_4px_16px_rgba(27,78,216,0.25)] group-hover:shadow-[0_8px_24px_rgba(27,78,216,0.40)] group-hover:scale-105 transition-all duration-500 flex-shrink-0">
                            <img src="/logo.png" alt="Niyantran" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[16px] font-heading font-black tracking-[-0.04em] text-navy">NIYANTRAN</span>
                            <span className="text-[8px] font-mono text-primary/60 tracking-[0.25em] uppercase font-bold">Instruments</span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[13px] font-medium text-slate-500 hover:text-navy transition-colors duration-200 tracking-wide"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#inquiry"
                            className="inline-flex items-center gap-2 rounded-[12px] px-5 h-[40px] bg-navy hover:bg-primary text-white text-[13px] font-bold tracking-[0.06em] shadow-[0_4px_16px_rgba(4,14,33,0.20)] hover:shadow-[0_6px_22px_rgba(27,78,216,0.35)] transition-all duration-300"
                        >
                            <Mail className="h-3.5 w-3.5" />
                            Get in Touch
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-[12px] text-navy hover:bg-blue-50 transition-colors"
                        onClick={() => setIsOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden mt-2 mx-4 bg-white/95 backdrop-blur-xl rounded-[1.5rem] border border-blue-100 shadow-[0_12px_40px_rgba(27,78,216,0.10)] overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-1">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-navy hover:bg-blue-50/60 rounded-[10px] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#inquiry"
                                onClick={() => setIsOpen(false)}
                                className="mt-1 px-4 py-3 text-sm font-bold text-white bg-navy rounded-[10px] text-center"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Inquiry', href: '#inquiry' },
    ];

    return (
        <footer className="py-10 border-t border-blue-50 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[8px] overflow-hidden">
                            <img src="/logo.png" alt="Niyantran" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[14px] font-heading font-black tracking-[-0.03em] text-navy">NIYANTRAN</span>
                    </a>

                    {/* Nav links */}
                    <div className="flex items-center gap-6">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[12px] text-slate-400 hover:text-navy transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Email + copyright */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-right">
                        <a
                            href="mailto:sb@niyantran.org"
                            className="inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-primary transition-colors"
                        >
                            <Mail className="h-3.5 w-3.5" />
                            sb@niyantran.org
                        </a>
                        <span className="hidden sm:block text-slate-200">·</span>
                        <span className="text-[11px] text-slate-300">© {new Date().getFullYear()} Niyantran Instruments</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
