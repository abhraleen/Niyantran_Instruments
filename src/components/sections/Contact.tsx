import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

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
                const subject = `Booking Enquiry: ${formData.service} — ${formData.organization}`;
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

    const inputClass = "rounded-[14px] border border-blue-50 bg-blue-50/30 h-14 px-5 font-medium text-navy placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/6 transition-all duration-400 text-sm";

    return (
        <section id="contact" className="py-40 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-blue-50/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-start">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <p className="section-label mb-8">
                            <span className="h-px w-10 bg-primary/30" />
                            Global Outreach
                        </p>
                        <h3 className="text-5xl md:text-[5.5rem] font-heading font-black text-navy mb-10 tracking-[-0.03em] leading-[0.9]">
                            LET'S<br />
                            <span className="text-gradient">CONNECT.</span>
                        </h3>
                        <p className="text-lg text-slate-400 font-medium tracking-tight leading-relaxed max-w-md mb-16">
                            Ready to transform your laboratory with research-grade automation? Our instrumentation specialists are available for deep-tech consultation.
                        </p>

                        <div className="space-y-5 mb-16">
                            <a href="mailto:sb@niyantran.org" className="flex items-center gap-5 group cursor-pointer">
                                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_6px_20px_rgba(27,78,216,0.25)] group-hover:shadow-[0_10px_30px_rgba(27,78,216,0.40)] group-hover:scale-105 transition-all duration-500 flex-shrink-0">
                                    <Mail className="h-6 w-6 text-white" strokeWidth={1.75} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-300 font-mono tracking-[0.35em] uppercase font-bold mb-0.5">Scientific Hub</div>
                                    <div className="text-xl font-heading font-black text-navy group-hover:text-primary transition-colors duration-300 tracking-tight">sb@niyantran.org</div>
                                </div>
                            </a>
                        </div>

                        <div className="inline-flex items-center gap-4 px-7 py-5 rounded-[1.5rem] bg-white border border-blue-50 shadow-[0_4px_24px_rgba(27,78,216,0.06)] hover:shadow-[0_12px_40px_rgba(27,78,216,0.09)] transition-shadow duration-500">
                            <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_4px_14px_rgba(27,78,216,0.25)]">
                                <Activity className="h-6 w-6 text-white" strokeWidth={1.75} />
                            </div>
                            <div>
                                <div className="text-navy font-heading font-black text-lg tracking-tight">ISO-9001 Facility</div>
                                <div className="text-slate-400 font-medium text-sm tracking-tight">System validation & research calibration</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="p-10 md:p-14 rounded-[3rem] bg-white border border-blue-50 shadow-[0_24px_80px_rgba(27,78,216,0.07),0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-[3s]" />
                            <div className="absolute -top-1 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />

                            <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Full Name</label>
                                        <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Dr. Alice Chen" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Organization</label>
                                        <Input required value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} className={inputClass} placeholder="MIT / Bell Labs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Email Address</label>
                                        <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="researcher@lab.org" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Phone</label>
                                        <Input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="+91 98765 00000" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Research Category</label>
                                    <Select required onValueChange={(val: string) => setFormData({ ...formData, service: val })}>
                                        <SelectTrigger className={`${inputClass} w-full`}>
                                            <SelectValue placeholder="Select instrumentation" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-[1.5rem] border-blue-50 shadow-[0_20px_60px_rgba(27,78,216,0.12)] p-3">
                                            {['I–V Measurement Systems', 'Quantum Efficiency Measurement', 'Evaporation Process Control', 'Software Consultancy'].map(cat => (
                                                <SelectItem key={cat} value={cat} className="rounded-xl py-3 px-4 font-medium text-sm hover:bg-blue-50 transition-colors cursor-pointer">{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Scientific Objectives</label>
                                    <Textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="rounded-[1.5rem] border border-blue-50 bg-blue-50/30 min-h-[160px] p-5 font-medium text-navy placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/6 transition-all duration-400 text-sm leading-relaxed" placeholder="Describe your experimental objectives and requirements..." />
                                </div>
                                <Button disabled={isLoading || isSubmitted} className="w-full h-16 rounded-[1.5rem] bg-navy hover:bg-primary text-white text-sm font-bold tracking-[0.15em] uppercase shadow-[0_8px_30px_rgba(4,14,33,0.25)] hover:shadow-[0_14px_44px_rgba(27,78,216,0.40)] transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98] group/btn">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                                                    <Activity className="h-5 w-5" />
                                                </motion.div>
                                                Sending...
                                            </motion.div>
                                        ) : isSubmitted ? (
                                            <motion.span key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3">
                                                Inquiry Received <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                                            </motion.span>
                                        ) : (
                                            <span key="default" className="flex items-center gap-3">
                                                Initiate Consultation
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1.5" />
                                            </span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
