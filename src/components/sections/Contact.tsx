import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const subject = `Inquiry: ${formData.service} — ${formData.organization}`;
                const body = `Dear Niyantran Instruments Team,\n\nI would like to enquire about: ${formData.service}\n\nMy Details:\nName: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nRequirements:\n${formData.message}\n\nPlease get back to me at your earliest convenience.\n\nRegards,\n${formData.name}`;
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sb@niyantran.org&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(gmailUrl, '_blank');

                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', organization: '', email: '', phone: '', service: '', message: '' });
                }, 4000);
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="inquiry" className="py-28 bg-surface relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute inset-0 scientific-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="pt-2"
                    >
                        <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-5">Get in Touch</p>
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05] mb-6">
                            Request a<br />
                            <span className="text-gradient">Consultation</span>
                        </h2>
                        <p className="text-slate-500 text-base font-light leading-relaxed mb-8 max-w-sm">
                            Tell us about your measurement requirements and we'll propose a system tailored to your research or industrial application.
                        </p>
                        <a
                            href="mailto:sb@niyantran.org"
                            className="inline-flex items-center gap-2.5 text-sm font-medium text-primary hover:text-navy transition-colors duration-200"
                        >
                            <Mail className="h-4 w-4" />
                            sb@niyantran.org
                        </a>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <div className="bg-white rounded-[2rem] border border-blue-50 p-8 shadow-[0_8px_40px_rgba(27,78,216,0.06)]">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" strokeWidth={1.5} />
                                        <h3 className="font-heading font-bold text-xl text-navy mb-2">Inquiry Received</h3>
                                        <p className="text-slate-400 text-sm">We'll be in touch within one business day.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-3.5"
                                    >
                                        <div className="grid grid-cols-2 gap-3.5">
                                            <Input
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                                required
                                                className="rounded-[14px] border-blue-50 bg-blue-50/30 h-12 px-4 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            />
                                            <Input
                                                placeholder="Organisation"
                                                value={formData.organization}
                                                onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))}
                                                required
                                                className="rounded-[14px] border-blue-50 bg-blue-50/30 h-12 px-4 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3.5">
                                            <Input
                                                type="email"
                                                placeholder="Email address"
                                                value={formData.email}
                                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                                required
                                                className="rounded-[14px] border-blue-50 bg-blue-50/30 h-12 px-4 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            />
                                            <Input
                                                placeholder="Phone (optional)"
                                                value={formData.phone}
                                                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                                                className="rounded-[14px] border-blue-50 bg-blue-50/30 h-12 px-4 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            />
                                        </div>
                                        <Select
                                            value={formData.service}
                                            onValueChange={v => setFormData(p => ({ ...p, service: v }))}
                                        >
                                            <SelectTrigger className="rounded-[14px] border-blue-50 bg-blue-50/30 h-12 px-4 text-sm data-[placeholder]:text-slate-300 focus:ring-2 focus:ring-primary/10 transition-all duration-300">
                                                <SelectValue placeholder="Area of interest" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="iv-measurement">I–V Measurement Systems</SelectItem>
                                                <SelectItem value="quantum-efficiency">Quantum Efficiency Measurement</SelectItem>
                                                <SelectItem value="evaporation">Evaporation Process Control</SelectItem>
                                                <SelectItem value="software">Scientific Software Consultancy</SelectItem>
                                                <SelectItem value="other">Other / General Inquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Textarea
                                            placeholder="Describe your requirements..."
                                            value={formData.message}
                                            onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                                            rows={4}
                                            className="rounded-[14px] border-blue-50 bg-blue-50/30 px-4 py-3.5 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300 resize-none"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="group w-full rounded-[14px] h-12 bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.06em] shadow-[0_6px_24px_rgba(4,14,33,0.18)] hover:shadow-[0_8px_32px_rgba(27,78,216,0.30)] transition-all duration-300 mt-1"
                                        >
                                            {isLoading ? 'Sending…' : 'Send Inquiry'}
                                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
