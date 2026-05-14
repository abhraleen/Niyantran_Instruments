import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export type InquiryMode = 'industry' | 'education';

interface Props {
    mode: InquiryMode;
    onModeChange: (m: InquiryMode) => void;
}

type IndustryData = {
    name: string; organization: string; email: string; phone: string;
    service: string; requirement: string; message: string;
};
type EducationData = {
    name: string; email: string; phone: string;
    qualification: string; interest: string; goal: string; message: string;
};

const IND0: IndustryData = { name: '', organization: '', email: '', phone: '', service: '', requirement: '', message: '' };
const EDU0: EducationData = { name: '', email: '', phone: '', qualification: '', interest: '', goal: '', message: '' };

const fieldCls = 'rounded-[12px] border-blue-50 bg-blue-50/40 h-11 px-4 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300';
const areaCls  = 'rounded-[12px] border-blue-50 bg-blue-50/40 px-4 py-3 text-sm placeholder:text-slate-300 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300 resize-none';

const modeConfig = {
    industry: {
        line1: 'Industry',
        line2: 'Inquiry',
        sub: "Tell us about your measurement requirements and we'll propose a system tailored to your laboratory.",
        ctaLabel: 'Submit Industry Inquiry',
        btnCls: 'bg-navy hover:bg-primary shadow-[0_4px_18px_rgba(4,14,33,0.20)] hover:shadow-[0_8px_32px_rgba(27,78,216,0.28)]',
        pillCls: 'bg-navy text-white',
    },
    education: {
        line1: 'Training',
        line2: 'Inquiry',
        sub: "Share your background and goals — we'll match you with the right program or internship track.",
        ctaLabel: 'Submit Training Inquiry',
        btnCls: 'bg-accent hover:bg-cyan-600 shadow-[0_4px_18px_rgba(14,165,233,0.18)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.28)]',
        pillCls: 'bg-accent text-white',
    },
} as const;

export const DevContact = ({ mode, onModeChange }: Props) => {
    const [ind, setInd] = React.useState<IndustryData>(IND0);
    const [edu, setEdu] = React.useState<EducationData>(EDU0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const si = (k: keyof IndustryData) => (v: string) => setInd(p => ({ ...p, [k]: v }));
    const se = (k: keyof EducationData) => (v: string) => setEdu(p => ({ ...p, [k]: v }));

    const submitIndustry = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...ind, type: 'industry' }),
            });
            if (res.ok) {
                const subject = `Inquiry [Industry]: ${ind.service} — ${ind.organization}`;
                const body = `Dear Niyantran Instruments Team,\n\nInquiry Type: Industry\nService Required: ${ind.service}\n\nOrganisation: ${ind.organization}\nName: ${ind.name}\nEmail: ${ind.email}\nPhone: ${ind.phone}\n\nResearch Requirement:\n${ind.requirement}\n\nMessage:\n${ind.message}\n\nRegards,\n${ind.name}`;
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sb@niyantran.org&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                setIsSubmitted(true);
                setTimeout(() => { setIsSubmitted(false); setInd(IND0); }, 4500);
            }
        } catch (err) { console.error(err); } finally { setIsLoading(false); }
    };

    const submitEducation = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...edu, type: 'education' }),
            });
            if (res.ok) {
                const subject = `Inquiry [Education]: ${edu.interest} — ${edu.name}`;
                const body = `Dear Niyantran Instruments Team,\n\nInquiry Type: Education & Training\nArea of Interest: ${edu.interest}\n\nName: ${edu.name}\nEmail: ${edu.email}\nPhone: ${edu.phone}\nQualification: ${edu.qualification}\nCareer Goal: ${edu.goal}\n\nMessage:\n${edu.message}\n\nRegards,\n${edu.name}`;
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sb@niyantran.org&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                setIsSubmitted(true);
                setTimeout(() => { setIsSubmitted(false); setEdu(EDU0); }, 4500);
            }
        } catch (err) { console.error(err); } finally { setIsLoading(false); }
    };

    const cfg = modeConfig[mode];

    return (
        <section id="inquiry" className="py-28 bg-surface relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute inset-0 scientific-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* ── Left panel ────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="pt-2"
                    >
                        <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-5">
                            Get in Touch
                        </p>

                        {/* Mode toggle */}
                        <div className="inline-flex items-center gap-1 bg-white border border-blue-100 rounded-full p-1 mb-8 shadow-[0_2px_10px_rgba(27,78,216,0.05)]">
                            {(['industry', 'education'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => onModeChange(m)}
                                    className={`rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.22em] uppercase transition-all duration-300 ${
                                        mode === m
                                            ? cfg.pillCls + ' shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {m === 'industry' ? 'Industry' : 'Education'}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic copy */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.28 }}
                            >
                                <h2 className="font-heading font-black text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05] mb-6">
                                    {cfg.line1}<br />
                                    <span className="text-gradient">{cfg.line2}</span>
                                </h2>
                                <p className="text-slate-500 text-base font-light leading-relaxed mb-8 max-w-sm">
                                    {cfg.sub}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <a
                            href="mailto:sb@niyantran.org"
                            className="inline-flex items-center gap-2.5 text-sm font-medium text-primary hover:text-navy transition-colors duration-200"
                        >
                            <Mail className="h-4 w-4" />
                            sb@niyantran.org
                        </a>
                    </motion.div>

                    {/* ── Right panel (form card) ─────────── */}
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
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" strokeWidth={1.5} />
                                        <h3 className="font-heading font-bold text-xl text-navy mb-2">Inquiry Received</h3>
                                        <p className="text-slate-400 text-sm">We'll be in touch within one business day.</p>
                                    </motion.div>

                                ) : mode === 'industry' ? (
                                    <motion.form
                                        key="industry"
                                        initial={{ opacity: 0, x: 14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -14 }}
                                        transition={{ duration: 0.25 }}
                                        onSubmit={submitIndustry}
                                        className="flex flex-col gap-3"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input placeholder="Full name" value={ind.name}
                                                onChange={e => si('name')(e.target.value)} required className={fieldCls} />
                                            <Input placeholder="Organisation / Lab" value={ind.organization}
                                                onChange={e => si('organization')(e.target.value)} required className={fieldCls} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input type="email" placeholder="Email address" value={ind.email}
                                                onChange={e => si('email')(e.target.value)} required className={fieldCls} />
                                            <Input placeholder="Phone (optional)" value={ind.phone}
                                                onChange={e => si('phone')(e.target.value)} className={fieldCls} />
                                        </div>
                                        <Select value={ind.service} onValueChange={si('service')}>
                                            <SelectTrigger className={fieldCls + ' data-[placeholder]:text-slate-300'}>
                                                <SelectValue placeholder="Service required" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="iv-measurement">I–V Measurement Systems</SelectItem>
                                                <SelectItem value="quantum-efficiency">Quantum Efficiency Measurement</SelectItem>
                                                <SelectItem value="evaporation">Evaporation Process Control</SelectItem>
                                                <SelectItem value="software">Scientific Software Consultancy</SelectItem>
                                                <SelectItem value="other">Other / General Inquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input placeholder="Research requirement (brief)" value={ind.requirement}
                                            onChange={e => si('requirement')(e.target.value)} className={fieldCls} />
                                        <Textarea placeholder="Additional details..." value={ind.message}
                                            onChange={e => si('message')(e.target.value)} rows={3} className={areaCls} />
                                        <button type="submit" disabled={isLoading}
                                            className={`group inline-flex items-center justify-center gap-2 w-full rounded-[12px] h-11 text-white text-[13px] font-bold tracking-[0.06em] mt-1 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 ${cfg.btnCls}`}>
                                            {isLoading ? 'Sending…' : cfg.ctaLabel}
                                            {!isLoading && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
                                        </button>
                                    </motion.form>

                                ) : (
                                    <motion.form
                                        key="education"
                                        initial={{ opacity: 0, x: 14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -14 }}
                                        transition={{ duration: 0.25 }}
                                        onSubmit={submitEducation}
                                        className="flex flex-col gap-3"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input placeholder="Full name" value={edu.name}
                                                onChange={e => se('name')(e.target.value)} required className={fieldCls} />
                                            <Input type="email" placeholder="Email address" value={edu.email}
                                                onChange={e => se('email')(e.target.value)} required className={fieldCls} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input placeholder="Phone (optional)" value={edu.phone}
                                                onChange={e => se('phone')(e.target.value)} className={fieldCls} />
                                            <Select value={edu.qualification} onValueChange={se('qualification')}>
                                                <SelectTrigger className={fieldCls + ' data-[placeholder]:text-slate-300'}>
                                                    <SelectValue placeholder="Current qualification" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high-school">High School / Secondary</SelectItem>
                                                    <SelectItem value="undergraduate">Undergraduate (B.Sc / B.Tech)</SelectItem>
                                                    <SelectItem value="postgraduate">Postgraduate (M.Sc / M.Tech)</SelectItem>
                                                    <SelectItem value="phd">PhD / Doctoral</SelectItem>
                                                    <SelectItem value="professional">Early Career Professional</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Select value={edu.interest} onValueChange={se('interest')}>
                                            <SelectTrigger className={fieldCls + ' data-[placeholder]:text-slate-300'}>
                                                <SelectValue placeholder="Area of interest" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="instrumentation">Scientific Instrumentation</SelectItem>
                                                <SelectItem value="semiconductor">Semiconductor Research</SelectItem>
                                                <SelectItem value="automation">Process Automation</SelectItem>
                                                <SelectItem value="software">Scientific Software</SelectItem>
                                                <SelectItem value="photovoltaics">Photovoltaics & Solar Research</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input placeholder="Career goal" value={edu.goal}
                                            onChange={e => se('goal')(e.target.value)} className={fieldCls} />
                                        <Textarea placeholder="Tell us more about yourself..." value={edu.message}
                                            onChange={e => se('message')(e.target.value)} rows={3} className={areaCls} />
                                        <button type="submit" disabled={isLoading}
                                            className={`group inline-flex items-center justify-center gap-2 w-full rounded-[12px] h-11 text-white text-[13px] font-bold tracking-[0.06em] mt-1 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 ${cfg.btnCls}`}>
                                            {isLoading ? 'Sending…' : cfg.ctaLabel}
                                            {!isLoading && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
                                        </button>
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
