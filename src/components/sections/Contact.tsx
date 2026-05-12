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
        <section id="contact" className="py-40 bg-white relative overflow-hidden">
            {/* Premium Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-32 items-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-sm font-mono tracking-[0.6em] text-primary uppercase mb-10">Global Outreach</h2>
                        <h3 className="text-6xl md:text-9xl font-heading font-black text-heading mb-16 tracking-tighter leading-[0.8] italic uppercase">
                            LET'S <br />
                            <span className="text-primary not-italic underline underline-offset-[24px] decoration-4 decoration-primary/20">CONNECT.</span>
                        </h3>
                        <p className="text-2xl text-secondary-text mb-24 leading-relaxed font-light tracking-tight max-w-xl">
                            Ready to transform your laboratory with research-grade automation? Our instrumentation specialists are available for deep-tech consultation.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] font-bold">Scientific Hub</p>
                                <p className="text-2xl font-heading font-black text-heading">sb@niyantran.org</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] font-bold">Research Portal</p>
                                <p className="text-2xl font-heading font-black text-heading">niyantran.org</p>
                            </div>
                        </div>

                        <div className="mt-24 flex items-center gap-6 p-8 rounded-[2.5rem] bg-alternate/20 border border-primary/10">
                            <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                                <Activity className="h-7 w-7 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-heading font-black">ISO-9001 Facility</h4>
                                <p className="text-slate-500 font-light text-sm tracking-tight">System validation & calibration laboratory</p>
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
                        <div className="p-16 rounded-[4rem] glass border border-white shadow-[0_60px_120px_-30px_rgba(0,0,0,0.12)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-[2s]" />
                            
                            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Lead Researcher</label>
                                        <Input 
                                            required 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="rounded-2xl border-border bg-white h-18 px-8 font-black text-xl placeholder:font-light focus:ring-4 focus:ring-primary/10 transition-all" 
                                            placeholder="DR. ALICE CHEN"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Organization</label>
                                        <Input 
                                            required 
                                            value={formData.organization}
                                            onChange={e => setFormData({...formData, organization: e.target.value})}
                                            className="rounded-2xl border-border bg-white h-18 px-8 font-black text-xl placeholder:font-light" 
                                            placeholder="MIT / BELL LABS"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Research Category</label>
                                    <Select required onValueChange={(val: string) => setFormData({...formData, service: val})}>
                                        <SelectTrigger className="rounded-2xl border-border bg-white h-18 px-8 font-black text-xl shadow-sm">
                                            <SelectValue placeholder="SELECT INSTRUMENTATION" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-[2rem] border-slate-100 shadow-3xl p-4">
                                            {["IV SYSTEMS", "QUANTUM EFFICIENCY", "EVAPORATION CONTROL", "SCIENTIFIC SOFTWARE"].map(cat => (
                                                <SelectItem key={cat} value={cat} className="rounded-xl py-4 px-6 font-black text-lg tracking-tight hover:bg-primary/5 transition-colors">{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Project Scope</label>
                                    <Textarea 
                                        required 
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="rounded-[2.5rem] border-border bg-white min-h-[220px] p-10 font-light text-2xl tracking-tight leading-relaxed placeholder:font-light" 
                                        placeholder="Describe your experimental objectives..."
                                    />
                                </div>

                                <Button 
                                    disabled={isLoading}
                                    className="w-full h-24 rounded-[2.5rem] bg-primary hover:bg-primary/90 text-white text-2xl font-black shadow-[0_20px_60px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-2 group/btn"
                                >
                                    {isLoading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                            <Activity className="h-8 w-8" />
                                        </motion.div>
                                    ) : isSubmitted ? (
                                        <span className="flex items-center gap-4">
                                            DATA RECEIVED <CheckCircle2 className="h-8 w-8 text-green-400" />
                                        </span>
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
