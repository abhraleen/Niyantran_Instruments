import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Mail, ArrowRight, CheckCircle2, Cpu, GraduationCap } from 'lucide-react';

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
        btnCls: 'bg-navy hover:bg-primary shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_4px_18px_rgba(4,14,33,0.20)] hover:shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_10px_32px_rgba(27,78,216,0.30)]',
        pillCls: 'bg-navy text-white',
    },
    education: {
        line1: 'Training',
        line2: 'Inquiry',
        sub: "Share your background and goals — we'll match you with the right program or internship track.",
        ctaLabel: 'Submit Training Inquiry',
        btnCls: 'bg-accent hover:bg-cyan-600 shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_18px_rgba(14,165,233,0.18)] hover:shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_10px_32px_rgba(14,165,233,0.30)]',
        pillCls: 'bg-accent text-white',
    },
} as const;

const ADMIN_EMAIL = 'sb@niyantran.org';

function buildGmailUrl(subject: string, body: string): string {
    return (
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(ADMIN_EMAIL)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`
    );
}

export const DevContact = ({ mode, onModeChange }: Props) => {
    const [ind, setInd] = React.useState<IndustryData>(IND0);
    const [edu, setEdu] = React.useState<EducationData>(EDU0);
    type Status = 'idle' | 'loading' | 'preparing' | 'success' | 'error';
    const [status,   setStatus]   = React.useState<Status>('idle');
    const [errorMsg, setErrorMsg] = React.useState('');

    const si = (k: keyof IndustryData) => (v: string) => setInd(p => ({ ...p, [k]: v }));
    const se = (k: keyof EducationData) => (v: string) => setEdu(p => ({ ...p, [k]: v }));

    const submitIndustry = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!ind.service) {
            setErrorMsg('Please select the service type.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/inquiries', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType:    'industry',
                    fullName:       ind.name,
                    email:          ind.email,
                    phone:          ind.phone        || undefined,
                    organization:   ind.organization || undefined,
                    areaOfInterest: ind.service,
                    message:        [ind.requirement, ind.message].filter(Boolean).join('\n\n') || '—',
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({})) as { message?: string };
                throw new Error(data.message ?? `Request failed (${res.status})`);
            }

            const subject = `Industry Inquiry: ${ind.service} — ${ind.organization}`;
            const body =
                `Dear Niyantran Instruments Team,\n\n` +
                `─── INDUSTRY CONSULTATION INQUIRY ───\n\n` +
                `Name:          ${ind.name}\n` +
                `Organisation:  ${ind.organization || 'Not provided'}\n` +
                `Email:         ${ind.email}\n` +
                `Phone:         ${ind.phone || 'Not provided'}\n\n` +
                `Service Required:\n${ind.service}\n\n` +
                `Research Requirement:\n${ind.requirement || 'Not specified'}\n\n` +
                `Message:\n${ind.message || 'Not provided'}\n\n` +
                `Regards,\n${ind.name}`;

            setStatus('preparing');
            setTimeout(() => {
                window.open(buildGmailUrl(subject, body), '_blank');
                setStatus('success');
                setTimeout(() => { setStatus('idle'); setInd(IND0); }, 4500);
            }, 700);

        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    const submitEducation = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!edu.interest) {
            setErrorMsg('Please select your area of interest.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/inquiries', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType:    'education',
                    fullName:       edu.name,
                    email:          edu.email,
                    phone:          edu.phone         || undefined,
                    qualification:  edu.qualification || undefined,
                    areaOfInterest: edu.interest,
                    message:        [edu.goal, edu.message].filter(Boolean).join('\n\n') || '—',
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({})) as { message?: string };
                throw new Error(data.message ?? `Request failed (${res.status})`);
            }

            const subject = `Education Inquiry: ${edu.interest} — ${edu.name}`;
            const body =
                `Dear Niyantran Instruments Team,\n\n` +
                `─── EDUCATION & TRAINING INQUIRY ───\n\n` +
                `Name:           ${edu.name}\n` +
                `Email:          ${edu.email}\n` +
                `Phone:          ${edu.phone || 'Not provided'}\n` +
                `Qualification:  ${edu.qualification || 'Not specified'}\n\n` +
                `Area of Interest:\n${edu.interest}\n\n` +
                `Career Goal:\n${edu.goal || 'Not specified'}\n\n` +
                `Message:\n${edu.message || 'Not provided'}\n\n` +
                `Regards,\n${edu.name}`;

            setStatus('preparing');
            setTimeout(() => {
                window.open(buildGmailUrl(subject, body), '_blank');
                setStatus('success');
                setTimeout(() => { setStatus('idle'); setEdu(EDU0); }, 4500);
            }, 700);

        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    const cfg = modeConfig[mode];

    return (
        <section id="inquiry" className="py-16 sm:py-24 lg:py-28 bg-surface relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
            <div className="absolute inset-0 scientific-grid opacity-[0.03] pointer-events-none" />
            {/* Atmospheric depth glow — top-center light source */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 85% 52% at 50% 0%, rgba(27,78,216,0.045) 0%, transparent 65%)' }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* ── Left panel ────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-8%' }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-2"
                    >
                        <p className="text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-primary/60 mb-5">
                            Get in Touch
                        </p>

                        {/* Mode toggle */}
                        <div
                            className="inline-flex items-center p-1 rounded-[18px] border border-slate-200/60 bg-white backdrop-blur-xl mb-8"
                            style={{
                                boxShadow: '0 2px 0 rgba(255,255,255,1) inset, 0 4px 24px rgba(4,14,33,0.08), 0 0 0 1px rgba(219,234,254,0.45)',
                            }}
                        >
                            {([
                                { id: 'industry' as const,  label: 'Industry',  Icon: Cpu },
                                { id: 'education' as const, label: 'Education', Icon: GraduationCap },
                            ]).map(({ id: m, label, Icon }) => (
                                <button
                                    key={m}
                                    onClick={() => onModeChange(m)}
                                    className="relative px-5 py-2 rounded-[14px] text-[11px] font-bold tracking-[0.18em] uppercase focus:outline-none select-none min-w-[110px] transition-colors duration-200"
                                >
                                    {mode === m && (
                                        <motion.div
                                            layoutId="contact-mode-pill"
                                            className="absolute inset-0 rounded-[14px]"
                                            style={{
                                                background: m === 'industry'
                                                    ? 'linear-gradient(135deg, #040e21 0%, #1b4ed8 100%)'
                                                    : 'linear-gradient(135deg, #0284c7 0%, #22d3ee 100%)',
                                                boxShadow: m === 'industry'
                                                    ? '0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 26px rgba(27,78,216,0.42), 0 2px 8px rgba(4,14,33,0.20)'
                                                    : '0 1px 0 rgba(255,255,255,0.22) inset, 0 6px 26px rgba(14,165,233,0.42), 0 2px 8px rgba(14,165,233,0.16)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                        />
                                    )}
                                    <span className={`relative z-10 flex items-center justify-center gap-2 transition-all duration-300 ${
                                        mode === m ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                                    }`}>
                                        <Icon
                                            className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity duration-300 ${mode === m ? 'opacity-90' : 'opacity-40'}`}
                                            strokeWidth={mode === m ? 2 : 1.75}
                                        />
                                        {label}
                                    </span>
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
                                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-navy tracking-[-0.03em] leading-[1.05] mb-6">
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
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-8%' }}
                        transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-blue-50/80 p-5 sm:p-8 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_8px_40px_rgba(27,78,216,0.08),0_24px_64px_rgba(4,14,33,0.04)] relative overflow-hidden">
                            {/* Inner top highlight */}
                            <div
                                aria-hidden="true"
                                className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
                                style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(219,234,254,0.80) 35%, rgba(255,255,255,0.72) 50%, rgba(219,234,254,0.80) 65%, transparent 95%)' }}
                            />
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Input placeholder="Full name" value={ind.name}
                                                onChange={e => si('name')(e.target.value)} required className={fieldCls} />
                                            <Input placeholder="Organisation / Lab" value={ind.organization}
                                                onChange={e => si('organization')(e.target.value)} required className={fieldCls} />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                        {status === 'error' && mode === 'industry' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-center"
                                            >
                                                {errorMsg}
                                            </motion.p>
                                        )}
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading' || status === 'preparing'}
                                            whileHover={{ scale: 1.015, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            className={`group inline-flex items-center justify-center gap-2 w-full rounded-[12px] h-11 text-white text-[13px] font-bold tracking-[0.06em] mt-1 disabled:opacity-60 dev-btn-sweep ${cfg.btnCls}`}
                                        >
                                            {status === 'loading' ? 'Saving inquiry…' : status === 'preparing' ? 'Preparing email…' : cfg.ctaLabel}
                                            {status === 'idle' && (<span className="transition-transform duration-200 ease-in-out group-hover:translate-x-[4px] inline-flex"><ArrowRight className="h-3.5 w-3.5" /></span>)}
                                        </motion.button>
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Input placeholder="Full name" value={edu.name}
                                                onChange={e => se('name')(e.target.value)} required className={fieldCls} />
                                            <Input type="email" placeholder="Email address" value={edu.email}
                                                onChange={e => se('email')(e.target.value)} required className={fieldCls} />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                        {status === 'error' && mode === 'education' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-center"
                                            >
                                                {errorMsg}
                                            </motion.p>
                                        )}
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading' || status === 'preparing'}
                                            whileHover={{ scale: 1.015, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            className={`group inline-flex items-center justify-center gap-2 w-full rounded-[12px] h-11 text-white text-[13px] font-bold tracking-[0.06em] mt-1 disabled:opacity-60 dev-btn-sweep ${cfg.btnCls}`}
                                        >
                                            {status === 'loading' ? 'Saving inquiry…' : status === 'preparing' ? 'Preparing email…' : cfg.ctaLabel}
                                            {status === 'idle' && (<span className="transition-transform duration-200 ease-in-out group-hover:translate-x-[4px] inline-flex"><ArrowRight className="h-3.5 w-3.5" /></span>)}
                                        </motion.button>
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
