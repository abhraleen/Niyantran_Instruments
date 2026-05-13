import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Activity, Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        service: '',
        message: ''
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
                const subject = `Research Inquiry: ${formData.service} - ${formData.organization}`;
                const body = `Hello Niyantran Instruments,\n\nInquiry Details:\n- Name: ${formData.name}\n- Org: ${formData.organization}\n- Service: ${formData.service}\n\nMessage:\n${formData.message}`;
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
        <section id="contact" className="py-48 bg-white relative overflow-hidden">
            {/* Ultra-minimalist Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-slate-200 via-transparent to-transparent opacity-20" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-32 items-start">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-sm font-mono tracking-[0.4em] text-primary uppercase mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-primary/30" />
                            Global Outreach
                        </h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black text-heading mb-16 tracking-tighter leading-[0.9]">
                            LET'S<br />
                            <span className="text-slate-300">CONNECT.</span>
                        </h3>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight leading-relaxed max-w-xl mb-24">
                            Ready to transform your laboratory with research-grade automation? Our instrumentation specialists are available for deep-tech consultation.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-4 group cursor-pointer" onClick={() => window.location.href = 'mailto:sb@niyantran.org'}>
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] font-bold">Scientific Hub</p>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-2xl font-heading font-black text-heading group-hover:text-primary transition-colors">sb@niyantran.org</p>
                                </div>
                            </div>
                            <div className="space-y-4 group cursor-pointer" onClick={() => window.location.href = 'https://niyantran.org'}>
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] font-bold">Research Portal</p>
                                <div className="flex items-center gap-3">
                                    <ArrowRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-2xl font-heading font-black text-heading group-hover:text-primary transition-colors">niyantran.org</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-32 flex items-center gap-8 p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-700">
                            <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Activity className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-heading font-black">ISO-9001 Facility</h4>
                                <p className="text-slate-500 font-medium text-sm tracking-tight">System validation & research calibration laboratory</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="p-16 rounded-[4rem] bg-white border border-slate-100 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-[3s]" />
                            
                            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Full Name</label>
                                        <Input 
                                            required 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="rounded-2xl border-slate-100 bg-slate-50/30 h-16 px-8 font-bold text-lg focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-500" 
                                            placeholder="DR. ALICE CHEN"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Organization</label>
                                        <Input 
                                            required 
                                            value={formData.organization}
                                            onChange={e => setFormData({...formData, organization: e.target.value})}
                                            className="rounded-2xl border-slate-100 bg-slate-50/30 h-16 px-8 font-bold text-lg focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-500" 
                                            placeholder="MIT / BELL LABS"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Research Category</label>
                                    <Select required onValueChange={(val: string) => setFormData({...formData, service: val})}>
                                        <SelectTrigger className="rounded-2xl border-slate-100 bg-slate-50/30 h-16 px-8 font-bold text-lg focus:bg-white transition-all duration-500">
                                            <SelectValue placeholder="SELECT INSTRUMENTATION" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-3xl border-slate-100 shadow-3xl p-4">
                                            {["I–V Measurement Systems", "Quantum Efficiency Measurement", "Evaporation Process Control", "Software Consultancy"].map(cat => (
                                                <SelectItem key={cat} value={cat} className="rounded-xl py-4 px-6 font-bold text-base tracking-tight hover:bg-primary/5 transition-colors">{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Scientific Objectives</label>
                                    <Textarea 
                                        required 
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="rounded-[2.5rem] border-slate-100 bg-slate-50/30 min-h-[220px] p-10 font-medium text-lg tracking-tight leading-relaxed focus:bg-white transition-all duration-500" 
                                        placeholder="Describe your experimental objectives..."
                                    />
                                </div>

                                <Button 
                                    disabled={isLoading || isSubmitted}
                                    className="w-full h-24 rounded-[2.5rem] bg-heading hover:bg-black text-white text-xl font-black shadow-2xl transition-all hover:-translate-y-2 active:scale-95 duration-500 group/btn"
                                >
                                    {isLoading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                            <Activity className="h-8 w-8" />
                                        </motion.div>
                                    ) : isSubmitted ? (
                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                                            DATA RECEIVED <CheckCircle2 className="h-8 w-8 text-green-400" />
                                        </motion.span>
                                    ) : (
                                        <span className="flex items-center gap-4">
                                            INITIATE CONSULTATION <ArrowRight className="h-8 w-8 transition-transform group-hover/btn:translate-x-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
