import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

type ActiveMode = 'industry' | 'education';
const modeOpts: { id: ActiveMode; label: string; dot: string }[] = [
    { id: 'industry',  label: 'Industry',  dot: '#1b4ed8' },
    { id: 'education', label: 'Education', dot: '#0ea5e9' },
];

const ease = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } as const;

export const Navbar = ({
    activeMode,
    onActiveMode,
}: {
    activeMode?: ActiveMode;
    onActiveMode?: (m: ActiveMode) => void;
} = {}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Inquiry', href: '#inquiry' },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            {/* Mode switch — top-right corner, only when activeMode is provided */}
            {activeMode !== undefined && onActiveMode && (
                <div className="absolute top-4 right-5 pointer-events-auto z-10 hidden md:block">
                    <div className="inline-flex items-center gap-0.5 p-[3px] rounded-full border border-slate-100/90 bg-white/96 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.90)_inset,0_3px_16px_rgba(4,14,33,0.10),0_0_0_1px_rgba(219,234,254,0.55)]">
                        {modeOpts.map(opt => {
                            const isActive = activeMode === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => onActiveMode(opt.id)}
                                    className="relative px-4 h-7 rounded-full text-[10px] font-mono font-bold tracking-[0.18em] uppercase focus:outline-none select-none"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-mode-pill"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: opt.id === 'industry'
                                                    ? 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)'
                                                    : 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)',
                                            boxShadow: opt.id === 'industry'
                                                    ? '0 1px 0 rgba(255,255,255,0.18) inset, 0 4px 22px rgba(27,78,216,0.42), 0 1px 6px rgba(4,14,33,0.20)'
                                                    : '0 1px 0 rgba(255,255,255,0.22) inset, 0 4px 22px rgba(14,165,233,0.40), 0 1px 6px rgba(14,165,233,0.16)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                                        />
                                    )}
                                    <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${
                                        isActive ? 'text-white' : 'text-slate-300 hover:text-slate-500'
                                    }`}>
                                        <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: isActive ? 'rgba(255,255,255,0.65)' : opt.dot }} />
                                        {opt.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Centering shell — constrains max expanded width */}
            <div className="flex justify-center px-6">
                <motion.div
                    className="pointer-events-auto w-full"
                    style={{ maxWidth: 860 }}
                    animate={{ marginTop: scrolled ? 14 : 20 }}
                    transition={ease}
                >
                    {/* The pill */}
                    <motion.div
                        className="mx-auto flex items-center justify-between rounded-full border"
                        animate={{
                            width: scrolled ? '100%' : 'auto',
                            backgroundColor: scrolled
                                ? 'rgba(255,255,255,0.90)'
                                : 'rgba(255,255,255,0.04)',
                            borderColor: scrolled
                                ? 'rgba(219,234,254,0.90)'
                                : 'rgba(255,255,255,0.08)',
                            paddingLeft: scrolled ? 30 : 10,
                            paddingRight: scrolled ? 26 : 10,
                            height: scrolled ? 72 : 46,
                            boxShadow: scrolled
                                ? '0 1px 0 rgba(255,255,255,0.90) inset, 0 16px 48px rgba(27,78,216,0.12), 0 4px 16px rgba(0,0,0,0.05), 0 0 0 1px rgba(219,234,254,0.60)'
                                : '0 4px 24px rgba(4,14,33,0.06)',
                        }}
                        style={{
                            backdropFilter: 'blur(28px)',
                            WebkitBackdropFilter: 'blur(28px)',
                        }}
                        transition={ease}
                    >
                        {/* LEFT — Logo (icon always, text on expand) */}
                        <a href="/" className="flex items-center gap-3 group cursor-pointer flex-shrink-0">
                            <motion.div
                                className="overflow-hidden flex-shrink-0 shadow-[0_4px_14px_rgba(27,78,216,0.22)] group-hover:shadow-[0_6px_22px_rgba(27,78,216,0.36)] transition-shadow duration-300"
                                animate={{
                                    width: scrolled ? 42 : 30,
                                    height: scrolled ? 42 : 30,
                                    borderRadius: scrolled ? '11px' : '8px',
                                }}
                                transition={ease}
                            >
                                <img src="/logo.png" alt="Niyantran" className="w-full h-full object-cover" />
                            </motion.div>
                            <AnimatePresence>
                                {scrolled && (
                                    <motion.div
                                        key="logo-text"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.26, delay: 0.07 }}
                                        className="flex flex-col leading-none"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        <span className="text-[15px] font-heading font-black tracking-[-0.04em] text-navy">NIYANTRAN</span>
                                        <span className="text-[8px] font-mono text-primary/60 tracking-[0.22em] uppercase font-bold">Instruments</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </a>

                        {/* RIGHT — Nav links + CTA, desktop only, on expand */}
                        <AnimatePresence>
                            {scrolled && (
                                <motion.div
                                    key="nav-right"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.24, delay: 0.14 }}
                                    className="hidden md:flex items-center gap-10 flex-shrink-0"
                                >
                                    {navLinks.map(link => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="relative text-[14px] font-medium text-slate-500 hover:text-navy transition-colors duration-200 tracking-wide whitespace-nowrap group"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                        </a>
                                    ))}
                                    <a
                                        href="#inquiry"
                                        className="inline-flex items-center gap-2 rounded-full px-6 h-[44px] bg-navy hover:bg-primary text-white text-[13.5px] font-bold tracking-[0.04em] dev-btn-sweep shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_4px_16px_rgba(4,14,33,0.22)] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_28px_rgba(27,78,216,0.38)] transition-all duration-300 whitespace-nowrap"
                                    >
                                        <Mail className="h-3.5 w-3.5" />
                                        Get in Touch
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile hamburger — always visible on mobile */}
                        <button
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-navy hover:bg-blue-50/80 transition-colors flex-shrink-0 ml-2"
                            onClick={() => setIsOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="h-4 w-4" />
                                    </motion.span>
                                ) : (
                                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="h-4 w-4" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="pointer-events-auto absolute top-[76px] left-4 right-4 bg-white/95 backdrop-blur-xl rounded-[1.5rem] border border-blue-100 shadow-[0_12px_40px_rgba(27,78,216,0.12)] overflow-hidden"
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
        </div>
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
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-between gap-6"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
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
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-right">
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
                </motion.div>
            </div>
        </footer>
    );
};
