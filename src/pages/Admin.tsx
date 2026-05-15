import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Inbox, Search, CheckCircle2, Clock,
    ArrowUpRight, TrendingUp, FileText, Mail,
    BarChart3, RefreshCw, Settings, X,
    Building2, GraduationCap, Briefcase, ChevronRight,
    ExternalLink, Layers, AlertCircle, Beaker, Code,
    PlusCircle, Pencil, Trash2, Zap, FlaskConical,
    ToggleLeft, ToggleRight, Package,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Service } from '@/components/sections/Services';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Inquiry {
    id: number;
    inquiry_type: 'industry' | 'education';
    full_name: string;
    email: string;
    phone: string | null;
    organization: string | null;
    qualification: string | null;
    area_of_interest: string;
    message: string;
    status: 'pending' | 'reviewed' | 'resolved';
    created_at: string;
}

type View = 'inquiries' | 'analytics' | 'platform' | 'services';
type TypeFilter = 'all' | 'industry' | 'education';

// ─── Constants ─────────────────────────────────────────────────────────────────
const STATUS_CFG = {
    pending:  { label: 'Pending',   dot: 'bg-amber-400 animate-pulse', pill: 'bg-amber-50  text-amber-700  border-amber-200'  },
    reviewed: { label: 'In Review', dot: 'bg-indigo-500',              pill: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    resolved: { label: 'Resolved',  dot: 'bg-emerald-500',             pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
} as const;

const MONTHLY = [
    { month: 'Dec', count: 2 }, { month: 'Jan', count: 3 }, { month: 'Feb', count: 2 },
    { month: 'Mar', count: 5 }, { month: 'Apr', count: 4 }, { month: 'May', count: 8 },
];

const DEMO: Inquiry[] = [
    { id: 1,  inquiry_type: 'industry',  full_name: 'Dr. Arvind Kumar',     email: 'arvind.kumar@iitd.ac.in',         phone: '+91 98100 12345', organization: 'IIT Delhi',         qualification: null,              area_of_interest: 'I–V Measurement Systems',       message: 'Need a high-precision IV system for silicon nanowire characterization with sub-nanoampere resolution and temperature-dependent measurements.',    status: 'pending',  created_at: '2026-05-12T09:14:00Z' },
    { id: 2,  inquiry_type: 'industry',  full_name: 'Prof. Sunita Rao',      email: 'sunita.rao@iisc.ac.in',           phone: '+91 80223 56789', organization: 'IISc Bangalore',    qualification: null,              area_of_interest: 'Quantum Efficiency Measurement', message: 'Looking for EQE measurement setup for perovskite solar cells with spectral range 300–1200 nm.',                                                 status: 'reviewed', created_at: '2026-05-11T14:32:00Z' },
    { id: 3,  inquiry_type: 'education', full_name: 'Rohan Sharma',          email: 'rohan.sharma@gmail.com',          phone: '+91 99100 22334', organization: null,                qualification: 'B.Tech (EE)',      area_of_interest: 'Instrumentation & Measurement', message: 'Want to learn advanced instrumentation techniques for my final year project on impedance spectroscopy.',                                          status: 'pending',  created_at: '2026-05-11T10:22:00Z' },
    { id: 4,  inquiry_type: 'industry',  full_name: 'Dr. Rahul Mehta',       email: 'rahul.mehta@tifr.res.in',         phone: '+91 22227 88910', organization: 'TIFR Mumbai',       qualification: null,              area_of_interest: 'Software Consultancy',           message: 'Require custom automation scripts for our PPMS setup with Python-based data acquisition and LabVIEW integration.',                               status: 'pending',  created_at: '2026-05-10T11:05:00Z' },
    { id: 5,  inquiry_type: 'education', full_name: 'Priya Nambiar',         email: 'priya.nambiar@outlook.com',       phone: '+91 70123 44556', organization: null,                qualification: 'M.Sc Physics',    area_of_interest: 'Quantum Efficiency Measurement', message: 'Interested in learning solar cell characterization techniques for my dissertation.',                                                            status: 'reviewed', created_at: '2026-05-09T16:40:00Z' },
    { id: 6,  inquiry_type: 'industry',  full_name: 'Dr. Priya Nair',        email: 'priya.nair@drdo.gov.in',          phone: '+91 40243 11222', organization: 'DRDO Hyderabad',    qualification: null,              area_of_interest: 'Evaporation Process Control',    message: 'Interested in thin-film deposition monitoring for defense applications with real-time thickness feedback.',                                      status: 'resolved', created_at: '2026-05-08T16:20:00Z' },
    { id: 7,  inquiry_type: 'education', full_name: 'Arjun Patel',           email: 'arjun.patel@student.iitb.ac.in', phone: '+91 98765 43210', organization: null,                qualification: 'PhD Nanotechnology', area_of_interest: 'I–V Measurement Systems',      message: 'Need guidance on characterization routines for 2D materials research using STM-correlated IV measurements.',                                    status: 'pending',  created_at: '2026-05-07T09:15:00Z' },
    { id: 8,  inquiry_type: 'industry',  full_name: 'Prof. Vikram Singh',    email: 'vikram.singh@iitb.ac.in',         phone: '+91 22572 20001', organization: 'IIT Bombay',        qualification: null,              area_of_interest: 'I–V Measurement Systems',       message: 'Need custom SMU integration for organic semiconductor research, preferably with LabVIEW and Python interfaces.',                                 status: 'resolved', created_at: '2026-05-07T08:45:00Z' },
    { id: 9,  inquiry_type: 'industry',  full_name: 'Dr. Ananya Pillai',     email: 'ananya.pillai@isro.gov.in',       phone: '+91 79268 91234', organization: 'ISRO SAC',          qualification: null,              area_of_interest: 'Quantum Efficiency Measurement', message: 'QE characterization for space-grade photodetectors operating at 77K.',                                                                         status: 'reviewed', created_at: '2026-04-30T13:10:00Z' },
    { id: 10, inquiry_type: 'education', full_name: 'Meera Krishnaswamy',    email: 'meera.k@nitt.edu',                phone: '+91 43151 30001', organization: null,                qualification: 'M.Tech VLSI',     area_of_interest: 'Software Consultancy',           message: 'Looking for training on instrument control software and SCPI protocol programming.',                                                            status: 'pending',  created_at: '2026-04-28T11:30:00Z' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function initials(name: string) {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function gmailReply(inq: Inquiry) {
    const subject = `Re: Your Niyantran Instruments Enquiry — ${inq.full_name}`;
    const body    = `Dear ${inq.full_name},\n\nThank you for reaching out to Niyantran Instruments regarding ${inq.area_of_interest}.\n\nWe have reviewed your inquiry and would like to schedule a consultation at your earliest convenience.\n\nBest regards,\nNiyantran Instruments Team`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inq.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ─── Service Icon Map ─────────────────────────────────────────────────────────
const SVC_ICON_MAP: Record<string, React.ElementType> = {
    Activity, Beaker, Layers, Code, Zap, FlaskConical, CheckCircle2,
};

const ICON_OPTIONS = ['Activity', 'Beaker', 'Layers', 'Code', 'Zap', 'FlaskConical'] as const;

function SvcIcon({ name, className }: { name: string; className?: string }) {
    const Icon = SVC_ICON_MAP[name] ?? Activity;
    return <Icon className={className} strokeWidth={1.75} />;
}

// ─── Service Status Config ────────────────────────────────────────────────────
const SVC_STATUS_CFG = {
    active:   { label: 'Active',   dot: 'bg-emerald-500',              pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    draft:    { label: 'Draft',    dot: 'bg-amber-400 animate-pulse',  pill: 'bg-amber-50 text-amber-700 border-amber-200'       },
    archived: { label: 'Archived', dot: 'bg-slate-300',                pill: 'bg-slate-50 text-slate-500 border-slate-200'       },
} as const;

// ─── Service Form Modal (create / edit) ───────────────────────────────────────
function ServiceFormModal({
    initial,
    onSave,
    onClose,
}: {
    initial?: Service | null;
    onSave: (svc: Service) => void;
    onClose: () => void;
}) {
    const isEdit = !!initial;
    const [saving, setSaving] = React.useState(false);
    const [err, setErr]       = React.useState('');

    const [title,     setTitle]     = React.useState(initial?.title             ?? '');
    const [mode,      setMode]      = React.useState<Service['mode']>(initial?.mode ?? 'industry');
    const [icon,      setIcon]      = React.useState(initial?.icon              ?? 'Activity');
    const [status,    setStatus]    = React.useState<Service['status']>(initial?.status ?? 'active');
    const [sortOrder, setSortOrder] = React.useState(String(initial?.sort_order ?? 0));
    const [shortDesc, setShortDesc] = React.useState(initial?.short_description ?? '');
    const [fullDesc,  setFullDesc]  = React.useState(initial?.full_description  ?? '');
    const [appsRaw,   setAppsRaw]   = React.useState((initial?.applications  ?? []).join('\n'));
    const [featsRaw,  setFeatsRaw]  = React.useState((initial?.features      ?? []).join('\n'));

    React.useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    async function handleSave() {
        if (!title.trim())     { setErr('Title is required');            return; }
        if (!shortDesc.trim()) { setErr('Short description is required'); return; }
        setSaving(true); setErr('');
        try {
            const payload = {
                title:            title.trim(),
                mode,
                shortDescription: shortDesc.trim(),
                fullDescription:  fullDesc.trim(),
                applications:     appsRaw.split('\n').map(s => s.trim()).filter(Boolean),
                features:         featsRaw.split('\n').map(s => s.trim()).filter(Boolean),
                icon,
                status,
                sortOrder: parseInt(sortOrder, 10) || 0,
            };
            const url    = isEdit ? `/api/services/${initial!.id}` : '/api/services';
            const method = isEdit ? 'PATCH' : 'POST';
            const res    = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (!json.success) { setErr(json.message ?? 'Save failed'); setSaving(false); return; }
            onSave(json.data as Service);
        } catch {
            setErr('Network error — is the backend running?');
            setSaving(false);
        }
    }

    const inputCls = 'w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all';
    const labelCls = 'block text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1.5';

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040E21]/35 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 14 }}
                transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-[24px] shadow-[0_40px_100px_rgba(4,14,33,0.24)] border border-slate-100"
            >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-[17px] font-heading font-black text-[#040E21]">{isEdit ? 'Edit Service' : 'New Service'}</h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">{isEdit ? `Updating "${initial!.title}"` : 'Add a service to the platform'}</p>
                    </div>
                    <button onClick={onClose} className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                        <X className="h-4 w-4 text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="px-8 py-6 space-y-5">
                    {err && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />{err}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className={labelCls}>Title</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Service title" className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Mode</label>
                            <select value={mode} onChange={e => setMode(e.target.value as Service['mode'])} className={inputCls}>
                                <option value="industry">Industry</option>
                                <option value="education">Education</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className={labelCls}>Icon</label>
                            <select value={icon} onChange={e => setIcon(e.target.value)} className={inputCls}>
                                {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value as Service['status'])} className={inputCls}>
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Sort Order</label>
                            <input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Short Description (card preview)</label>
                        <textarea rows={2} value={shortDesc} onChange={e => setShortDesc(e.target.value)} placeholder="Concise one-liner shown on the homepage card" className={`${inputCls} h-auto py-2.5 resize-none`} />
                    </div>
                    <div>
                        <label className={labelCls}>Full Description (modal body)</label>
                        <textarea rows={4} value={fullDesc} onChange={e => setFullDesc(e.target.value)} placeholder="Detailed description shown when user clicks the card" className={`${inputCls} h-auto py-2.5 resize-none`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Applications (one per line)</label>
                            <textarea rows={5} value={appsRaw} onChange={e => setAppsRaw(e.target.value)} placeholder={"Solar cell J-V characterisation\nSemiconductor device testing"} className={`${inputCls} h-auto py-2.5 resize-none font-mono text-[12px]`} />
                        </div>
                        <div>
                            <label className={labelCls}>Features (one per line)</label>
                            <textarea rows={5} value={featsRaw} onChange={e => setFeatsRaw(e.target.value)} placeholder={"Sub-nA current resolution\nPython & LabVIEW interfaces"} className={`${inputCls} h-auto py-2.5 resize-none font-mono text-[12px]`} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-7 flex gap-3">
                    <button onClick={handleSave} disabled={saving} className="flex-1 h-10 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-[13px] font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {saving && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                        {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Service'}
                    </button>
                    <button onClick={onClose} className="px-5 h-10 rounded-xl border border-slate-200 text-slate-500 text-[13px] font-semibold hover:border-slate-300 hover:text-slate-700 transition-all">
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteConfirmModal({
    service,
    onConfirm,
    onClose,
}: {
    service: Service;
    onConfirm: () => Promise<void>;
    onClose: () => void;
}) {
    const [deleting, setDeleting] = React.useState(false);
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040E21]/35 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 14 }}
                transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-sm bg-white rounded-[22px] shadow-[0_40px_100px_rgba(4,14,33,0.24)] border border-slate-100 p-8"
            >
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
                    <Trash2 className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-[17px] font-heading font-black text-[#040E21] text-center">Delete Service?</h3>
                <p className="text-[13px] text-slate-500 text-center mt-2 mb-6 leading-relaxed">
                    <strong className="text-[#040E21]">{service.title}</strong> will be permanently removed from the platform and homepage.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={async () => { setDeleting(true); await onConfirm(); }}
                        disabled={deleting}
                        className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {deleting && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                        {deleting ? 'Deleting…' : 'Delete'}
                    </button>
                    <button onClick={onClose} className="px-5 h-10 rounded-xl border border-slate-200 text-slate-500 text-[13px] font-semibold hover:border-slate-300 transition-all">
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <tr className="border-b border-slate-50">
            <td className="pl-8 pr-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse flex-shrink-0" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-28 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-2.5 w-36 bg-slate-100 rounded-full animate-pulse" />
                    </div>
                </div>
            </td>
            {[80, 140, 60, 64].map((w, i) => (
                <td key={i} className="px-4 py-4">
                    <div className="h-3 bg-slate-100 rounded-full animate-pulse" style={{ width: w }} />
                </td>
            ))}
            <td className="pr-6 py-4" />
        </tr>
    );
}

// ─── Inquiry Detail Modal ─────────────────────────────────────────────────────
function InquiryModal({ inquiry, onClose }: { inquiry: Inquiry; onClose: () => void }) {
    const sc    = STATUS_CFG[inquiry.status];
    const isInd = inquiry.inquiry_type === 'industry';

    // Close on Escape
    React.useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040E21]/30 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-[24px] shadow-[0_40px_100px_rgba(4,14,33,0.22)] border border-slate-100 overflow-hidden"
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                        <X className="h-4 w-4 text-slate-500" />
                    </button>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#040E21] to-[#1B4ED8] flex items-center justify-center text-white text-sm font-black shadow-lg flex-shrink-0">
                            {initials(inquiry.full_name)}
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-[17px] font-heading font-black text-[#040E21] leading-tight">{inquiry.full_name}</h2>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${isInd ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-violet-50 text-violet-700 border-violet-200'}`}>
                                    {isInd ? <Building2 className="h-2.5 w-2.5" /> : <GraduationCap className="h-2.5 w-2.5" />}
                                    {isInd ? 'Industry' : 'Education'}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 mt-0.5">{inquiry.email}</p>
                            {(inquiry.organization || inquiry.qualification) && (
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{inquiry.organization ?? inquiry.qualification}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <div className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                            <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sc.pill}`}>{sc.label}</Badge>
                        </div>
                        <span className="text-slate-200">·</span>
                        <span className="text-[11px] text-slate-400 font-mono">{fmtDate(inquiry.created_at)}</span>
                    </div>
                </div>

                {/* Body */}
                <div className="border-t border-slate-50 px-8 pb-8 pt-6 space-y-5">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">Area of Interest</div>
                            <div className="text-sm font-semibold text-[#040E21]">{inquiry.area_of_interest}</div>
                        </div>
                        {inquiry.phone && (
                            <div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">Phone</div>
                                <div className="text-sm font-semibold text-[#040E21]">{inquiry.phone}</div>
                            </div>
                        )}
                        {inquiry.organization && (
                            <div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">Organisation</div>
                                <div className="text-sm font-semibold text-[#040E21]">{inquiry.organization}</div>
                            </div>
                        )}
                        {inquiry.qualification && (
                            <div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">Qualification</div>
                                <div className="text-sm font-semibold text-[#040E21]">{inquiry.qualification}</div>
                            </div>
                        )}
                    </div>
                    {inquiry.message && (
                        <div>
                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-2">Message</div>
                            <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">{inquiry.message}</p>
                        </div>
                    )}
                    <button
                        onClick={() => window.open(gmailReply(inquiry), '_blank')}
                        className="w-full h-11 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_14px_rgba(27,78,216,0.2)] mt-1"
                    >
                        <Mail className="h-4 w-4" />
                        Reply via Gmail
                        <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export const AdminDashboard = () => {
    const [inquiries, setInquiries]           = React.useState<Inquiry[]>([]);
    const [loading, setLoading]               = React.useState(true);
    const [demoMode, setDemoMode]             = React.useState(false);
    const [search, setSearch]                 = React.useState('');
    const [typeFilter, setTypeFilter]         = React.useState<TypeFilter>('all');
    const [statusFilter, setStatusFilter]     = React.useState<string>('all');
    const [view, setView]                     = React.useState<View>('inquiries');
    const [selected, setSelected]             = React.useState<Inquiry | null>(null);
    const [tick, setTick]                     = React.useState(0);

    // ── Services state ───────────────────────────────────────────────────────
    const [services,        setServices]      = React.useState<Service[]>([]);
    const [svcLoading,      setSvcLoading]    = React.useState(false);
    const [svcForm,         setSvcForm]       = React.useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
    const [svcDeleteTarget, setSvcDeleteTarget] = React.useState<Service | null>(null);
    const [svcSearch,       setSvcSearch]     = React.useState('');

    React.useEffect(() => {
        setLoading(true);
        fetch('/api/inquiries')
            .then(async res => {
                const json = await res.json();
                const rows: Inquiry[] = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : [];
                setInquiries(rows.length > 0 ? rows : DEMO);
                setDemoMode(rows.length === 0);
            })
            .catch(() => { setInquiries(DEMO); setDemoMode(true); })
            .finally(() => setLoading(false));
    }, [tick]);

    // Fetch all services (including drafts/archived) for admin
    React.useEffect(() => {
        if (view !== 'services') return;
        setSvcLoading(true);
        fetch('/api/services/all')
            .then(async r => {
                const json = await r.json();
                setServices(Array.isArray(json.data) ? json.data : []);
            })
            .catch(() => setServices([]))
            .finally(() => setSvcLoading(false));
    }, [view, tick]);

    const filtered = React.useMemo(() => inquiries
        .filter(i => typeFilter === 'all' || i.inquiry_type === typeFilter)
        .filter(i => statusFilter === 'all' || i.status === statusFilter)
        .filter(i => {
            if (!search) return true;
            const q = search.toLowerCase();
            return i.full_name.toLowerCase().includes(q)
                || i.email.toLowerCase().includes(q)
                || (i.organization ?? '').toLowerCase().includes(q)
                || i.area_of_interest.toLowerCase().includes(q);
        }),
        [inquiries, typeFilter, statusFilter, search]
    );

    const indCount  = inquiries.filter(i => i.inquiry_type === 'industry').length;
    const eduCount  = inquiries.filter(i => i.inquiry_type === 'education').length;
    const pendCount = inquiries.filter(i => i.status === 'pending').length;
    const maxBar    = Math.max(...MONTHLY.map(d => d.count));
    const allAreas  = Array.from(new Set(inquiries.map(i => i.area_of_interest)));

    const svcFiltered = React.useMemo(() => {
        if (!svcSearch) return services;
        const q = svcSearch.toLowerCase();
        return services.filter(s => s.title.toLowerCase().includes(q) || s.mode.includes(q) || s.status.includes(q));
    }, [services, svcSearch]);

    const NAV = [
        { id: 'inquiries' as View, label: 'Inquiries', icon: Inbox,    badge: pendCount },
        { id: 'analytics' as View, label: 'Analytics', icon: BarChart3, badge: 0 },
        { id: 'services'  as View, label: 'Services',  icon: Package,   badge: services.filter(s => s.status === 'draft').length },
        { id: 'platform'  as View, label: 'Platform',  icon: Settings,  badge: 0 },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FD] flex">

            {/* ── Sidebar ──────────────────────────────────────────────────── */}
            <aside className="w-[216px] flex-shrink-0 sticky top-0 h-screen bg-[#040E21] flex flex-col overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f45] via-[#040E21] to-[#040E21] pointer-events-none" />

                {/* Logo */}
                <div className="relative px-6 pt-7 pb-6 flex items-center gap-3 border-b border-white/[0.06]">
                    <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#1B4ED8] to-[#3B82F6] flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.4)] flex-shrink-0">
                        <Activity className="h-[18px] w-[18px] text-white" strokeWidth={1.75} />
                    </div>
                    <div>
                        <div className="text-[13px] font-heading font-black text-white leading-none tracking-tight">Niyantran</div>
                        <div className="text-[9px] text-blue-400/60 font-mono uppercase tracking-[0.22em] mt-0.5">Control Panel</div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="relative flex-1 px-3 pt-5 space-y-0.5">
                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.22em] px-3 pb-3">Overview</div>
                    {NAV.map(item => {
                        const active = view === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-[11px] rounded-[10px] text-left transition-all relative ${active ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/65 hover:bg-white/[0.04]'}`}
                            >
                                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-[#3B82F6] rounded-full" />}
                                <item.icon className={`h-[15px] w-[15px] flex-shrink-0 ${active ? 'text-[#60A5FA]' : ''}`} strokeWidth={1.75} />
                                <span className="text-[13px] font-semibold flex-1">{item.label}</span>
                                {item.badge > 0 && (
                                    <span className="text-[10px] font-black bg-[#1B4ED8] text-white px-1.5 py-[3px] rounded-full min-w-[20px] text-center leading-none">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="relative px-5 py-5 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B4ED8] to-[#3B82F6] flex items-center justify-center text-white text-[11px] font-black flex-shrink-0">SB</div>
                    <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-white/70 leading-none">Admin</div>
                        <div className="text-[10px] text-white/25 font-mono mt-0.5 truncate">sb@niyantran.org</div>
                    </div>
                </div>
            </aside>

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 h-[58px] flex items-center px-8 gap-4">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] font-mono">Admin</span>
                        <ChevronRight className="h-3 w-3 text-slate-200 flex-shrink-0" />
                        <span className="text-[13px] font-semibold text-slate-600 capitalize">{view}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        {view === 'inquiries' && (
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[13px] w-[13px] text-slate-300 pointer-events-none" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search name, org, interest…"
                                    className="pl-8 pr-4 w-52 h-9 bg-slate-50 border border-slate-100 rounded-xl text-[12px] text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
                                />
                            </div>
                        )}
                        <button
                            onClick={() => setTick(t => t + 1)}
                            title="Refresh"
                            className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1B4ED8] hover:bg-blue-50 hover:border-blue-200 transition-all"
                        >
                            <RefreshCw className={`h-[13px] w-[13px] ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        {demoMode && (
                            <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-100">
                                <AlertCircle className="h-3 w-3" /> Demo data
                            </span>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-7 space-y-6">

                    {/* Stats */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Inquiries', value: inquiries.length, icon: Inbox,         sub: 'All time',             hi: false },
                            { label: 'Industry',        value: indCount,          icon: Briefcase,     sub: inquiries.length > 0 ? `${Math.round(indCount / inquiries.length * 100)}% of total` : '—', hi: false },
                            { label: 'Education',       value: eduCount,          icon: GraduationCap, sub: inquiries.length > 0 ? `${Math.round(eduCount / inquiries.length * 100)}% of total` : '—', hi: false },
                            { label: 'Pending',         value: pendCount,         icon: TrendingUp,    sub: 'Awaiting response',    hi: pendCount > 0 },
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.4 }}>
                                <div className={`bg-white rounded-[18px] border p-6 shadow-sm hover:shadow-md transition-shadow ${s.hi ? 'border-blue-200 ring-1 ring-blue-100' : 'border-slate-100'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2.5 rounded-[10px] ${s.hi ? 'bg-blue-100' : 'bg-slate-50'}`}>
                                            <s.icon className={`h-4 w-4 ${s.hi ? 'text-[#1B4ED8]' : 'text-slate-400'}`} strokeWidth={1.75} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg leading-none ${s.hi ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>{s.sub}</span>
                                    </div>
                                    <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">{s.label}</div>
                                    <div className="text-[32px] font-heading font-black text-[#040E21] leading-none">
                                        {loading ? <span className="text-slate-200 text-2xl">–</span> : s.value}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View panels */}
                    <AnimatePresence mode="wait">

                        {/* ── INQUIRIES ── */}
                        {view === 'inquiries' && (
                            <motion.div key="inquiries" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                                {/* Filter bar */}
                                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                                    <div className="flex bg-white border border-slate-100 rounded-[14px] p-1 shadow-sm gap-0.5">
                                        {([
                                            { id: 'all'       as TypeFilter, label: 'All',       count: inquiries.length },
                                            { id: 'industry'  as TypeFilter, label: 'Industry',  count: indCount },
                                            { id: 'education' as TypeFilter, label: 'Education', count: eduCount },
                                        ]).map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setTypeFilter(tab.id)}
                                                className={`px-4 py-2 rounded-[10px] text-[12px] font-bold transition-all flex items-center gap-2 ${typeFilter === tab.id ? 'bg-[#040E21] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                {tab.label}
                                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none ${typeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    {tab.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {(['all', 'pending', 'reviewed', 'resolved'] as const).map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setStatusFilter(s)}
                                                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all ${statusFilter === s ? 'bg-[#040E21] text-white border-[#040E21]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                                            >
                                                {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-heading font-black text-[#040E21]">Inquiry Pipeline</h3>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} · newest first`}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-xl h-8 border-slate-100 text-[11px] font-semibold text-slate-400 hover:text-[#040E21]">
                                            <FileText className="h-3.5 w-3.5 mr-1.5" /> Export
                                        </Button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-slate-50/80 border-b border-slate-100/70">
                                                    {['Contact', 'Type', 'Area of Interest', 'Status', 'Date', ''].map((h, i) => (
                                                        <th key={i} className={`text-[9px] font-black uppercase tracking-[0.14em] text-slate-300 py-3.5 ${i === 0 ? 'pl-8 pr-4 text-left' : i === 5 ? 'pr-6 text-right' : 'px-4 text-left'}`}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                                                ) : filtered.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="py-20 text-center">
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                                    <Inbox className="h-5 w-5 text-slate-200" strokeWidth={1.5} />
                                                                </div>
                                                                <p className="text-sm text-slate-300 font-medium">No inquiries match your filters</p>
                                                                <button onClick={() => { setSearch(''); setTypeFilter('all'); setStatusFilter('all'); }} className="text-[12px] font-bold text-[#1B4ED8] hover:underline">
                                                                    Clear all filters
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : filtered.map((inq, idx) => {
                                                    const sc    = STATUS_CFG[inq.status];
                                                    const isInd = inq.inquiry_type === 'industry';
                                                    return (
                                                        <motion.tr
                                                            key={inq.id}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: idx * 0.025, duration: 0.3 }}
                                                            onClick={() => setSelected(inq)}
                                                            className="border-b border-slate-50 hover:bg-blue-50/20 transition-colors cursor-pointer group/row"
                                                        >
                                                            <td className="pl-8 pr-4 py-[14px]">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 flex-shrink-0">
                                                                        {initials(inq.full_name)}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-[13px] font-semibold text-[#040E21] leading-tight">{inq.full_name}</div>
                                                                        <div className="text-[11px] text-slate-400">{inq.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 w-fit ${isInd ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-violet-50 text-violet-700 border-violet-100'}`}>
                                                                    {isInd ? <Building2 className="h-2.5 w-2.5" /> : <GraduationCap className="h-2.5 w-2.5" />}
                                                                    {isInd ? 'Industry' : 'Education'}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <div className="text-[12px] font-semibold text-slate-600 max-w-[180px] truncate">{inq.area_of_interest}</div>
                                                                <div className="text-[11px] text-slate-400 max-w-[180px] truncate">{inq.organization ?? inq.qualification ?? '—'}</div>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className={`h-2 w-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                                                                    <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sc.pill}`}>{sc.label}</Badge>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-[14px] text-[11px] text-slate-400 font-mono whitespace-nowrap">{fmtDate(inq.created_at)}</td>
                                                            <td className="pr-6 py-[14px] text-right">
                                                                <span className="text-[11px] font-semibold text-slate-300 group-hover/row:text-[#1B4ED8] flex items-center gap-1 justify-end transition-colors opacity-0 group-hover/row:opacity-100">
                                                                    View <ArrowUpRight className="h-3 w-3" />
                                                                </span>
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── ANALYTICS ── */}
                        {view === 'analytics' && (
                            <motion.div key="analytics" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="space-y-5">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                    {/* Monthly bar chart */}
                                    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-slate-50">
                                            <h3 className="text-sm font-heading font-black text-[#040E21]">Monthly Inquiry Volume</h3>
                                            <p className="text-[11px] text-slate-400 mt-0.5">Inquiries received over the last 6 months</p>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-end gap-3 h-44">
                                                {MONTHLY.map((d, i) => (
                                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                        <span className="text-[11px] font-black text-[#1B4ED8]">{d.count}</span>
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${(d.count / maxBar) * 100}%` }}
                                                            transition={{ delay: i * 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                                                            className={`w-full rounded-t-xl transition-colors ${i === MONTHLY.length - 1 ? 'bg-gradient-to-t from-[#040E21] to-[#1B4ED8]' : 'bg-blue-100 hover:bg-blue-200'}`}
                                                        />
                                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{d.month}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Area of interest */}
                                    <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                        <div className="px-7 py-6 border-b border-slate-50">
                                            <h3 className="text-sm font-heading font-black text-[#040E21]">By Area of Interest</h3>
                                            <p className="text-[11px] text-slate-400 mt-0.5">Distribution across focus areas</p>
                                        </div>
                                        <div className="p-7 space-y-4">
                                            {allAreas.slice(0, 5).map((area, i) => {
                                                const cnt = inquiries.filter(x => x.area_of_interest === area).length;
                                                const pct = inquiries.length > 0 ? Math.round((cnt / inquiries.length) * 100) : 0;
                                                return (
                                                    <div key={i}>
                                                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                                                            <span className="truncate max-w-[148px]">{area}</span>
                                                            <span className="text-[#1B4ED8] font-black ml-2">{cnt}</span>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${pct}%` }}
                                                                transition={{ delay: 0.2 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                                                                className="h-full bg-gradient-to-r from-[#040E21] to-[#1B4ED8] rounded-full"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <div className="pt-5 border-t border-slate-50 space-y-3">
                                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">By Type</div>
                                                {[{ label: 'Industry', count: indCount, color: 'bg-blue-500' }, { label: 'Education', count: eduCount, color: 'bg-violet-500' }].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between text-[12px]">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`h-2 w-2 rounded-full ${item.color}`} />
                                                            <span className="font-medium text-slate-500">{item.label}</span>
                                                        </div>
                                                        <span className="font-black text-[#040E21]">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pipeline status */}
                                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="px-8 py-6 border-b border-slate-50">
                                        <h3 className="text-sm font-heading font-black text-[#040E21]">Pipeline Status</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Current distribution across inquiry lifecycle states</p>
                                    </div>
                                    <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {(Object.entries(STATUS_CFG) as [keyof typeof STATUS_CFG, typeof STATUS_CFG[keyof typeof STATUS_CFG]][]).map(([key, cfg]) => {
                                            const cnt = inquiries.filter(x => x.status === key).length;
                                            const pct = inquiries.length > 0 ? Math.round((cnt / inquiries.length) * 100) : 0;
                                            return (
                                                <div key={key} className="p-6 bg-slate-50/70 rounded-2xl border border-slate-100">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot.replace(' animate-pulse', '')}`} />
                                                        <span className="text-[11px] font-bold text-slate-400">{cfg.label}</span>
                                                    </div>
                                                    <div className="text-3xl font-heading font-black text-[#040E21]">{cnt}</div>
                                                    <div className="text-[10px] text-slate-300 font-medium mt-0.5">{pct}% of total</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── PLATFORM ── */}
                        {view === 'platform' && (
                            <motion.div key="platform" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="px-8 py-6 border-b border-slate-50">
                                        <h3 className="text-sm font-heading font-black text-[#040E21]">System Configuration</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Platform settings and integrations</p>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {[
                                            { label: 'Notification Email', value: 'sb@niyantran.org',    ok: true },
                                            { label: 'Platform Version',   value: 'v2.4.1',              ok: true },
                                            { label: 'Database',           value: 'NeonDB (PostgreSQL)', ok: true },
                                            { label: 'API Status',         value: 'Operational',         ok: true },
                                            { label: 'Email Provider',     value: 'Resend',              ok: true },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center px-8 py-[14px]">
                                                <span className="text-[13px] font-medium text-slate-400">{item.label}</span>
                                                <div className="flex items-center gap-2">
                                                    {item.ok && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                                                    <span className="text-[13px] font-bold text-[#040E21]">{item.value}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="px-8 py-6 border-b border-slate-50">
                                        <h3 className="text-sm font-heading font-black text-[#040E21]">Quick Actions</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Common operational shortcuts</p>
                                    </div>
                                    <div className="p-5 space-y-1.5">
                                        {[
                                            { label: 'View Live Website', icon: ExternalLink, action: () => window.open('/', '_blank')                           },
                                            { label: 'Check API Health',  icon: CheckCircle2, action: () => window.open('/api/health', '_blank')                 },
                                            { label: 'Open Gmail Inbox',  icon: Mail,         action: () => window.open('https://mail.google.com', '_blank')     },
                                            { label: 'Dev Preview Page',  icon: Layers,       action: () => window.open('/dev', '_blank')                        },
                                            { label: 'System Clock',      icon: Clock,        action: () => {}                                                   },
                                        ].map((item, i) => (
                                            <button key={i} onClick={item.action} className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 text-left transition-all group">
                                                <item.icon className="h-4 w-4 text-slate-300 group-hover:text-[#1B4ED8] transition-colors flex-shrink-0" strokeWidth={1.75} />
                                                <span className="text-[13px] font-semibold text-slate-500 group-hover:text-[#040E21] transition-colors flex-1">{item.label}</span>
                                                <ArrowUpRight className="h-3.5 w-3.5 text-slate-200 group-hover:text-[#1B4ED8] transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── SERVICES ── */}
                        {view === 'services' && (
                            <motion.div key="services" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="space-y-5">

                                {/* Header bar */}
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <div>
                                        <h3 className="text-sm font-heading font-black text-[#040E21]">Services CMS</h3>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{svcFiltered.length} service{svcFiltered.length !== 1 ? 's' : ''} · changes reflect on homepage instantly</p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[13px] w-[13px] text-slate-300 pointer-events-none" />
                                            <input
                                                value={svcSearch}
                                                onChange={e => setSvcSearch(e.target.value)}
                                                placeholder="Search services…"
                                                className="pl-8 pr-4 w-44 h-9 bg-white border border-slate-100 rounded-xl text-[12px] text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all shadow-sm"
                                            />
                                        </div>
                                        <button
                                            onClick={() => setSvcForm({ open: true, editing: null })}
                                            className="h-9 px-4 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-[12px] font-bold flex items-center gap-2 transition-all shadow-sm"
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" /> Add Service
                                        </button>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-slate-50/80 border-b border-slate-100/70">
                                                    {['Service', 'Mode', 'Status', 'Applications', 'Sort', 'Actions'].map((h, i) => (
                                                        <th key={i} className={`text-[9px] font-black uppercase tracking-[0.14em] text-slate-300 py-3.5 ${i === 0 ? 'pl-8 pr-4 text-left' : i === 5 ? 'pr-6 text-right' : 'px-4 text-left'}`}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {svcLoading ? (
                                                    Array.from({ length: 4 }).map((_, i) => (
                                                        <tr key={i} className="border-b border-slate-50">
                                                            <td className="pl-8 pr-4 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-slate-100 animate-pulse flex-shrink-0" /><div className="space-y-1.5"><div className="h-3 w-36 bg-slate-100 rounded-full animate-pulse" /><div className="h-2.5 w-24 bg-slate-100 rounded-full animate-pulse" /></div></div></td>
                                                            {[60, 70, 50, 24, 80].map((w, j) => <td key={j} className="px-4 py-4"><div className="h-3 bg-slate-100 rounded-full animate-pulse" style={{ width: w }} /></td>)}
                                                        </tr>
                                                    ))
                                                ) : svcFiltered.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="py-16 text-center">
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                                    <Package className="h-5 w-5 text-slate-200" strokeWidth={1.5} />
                                                                </div>
                                                                <p className="text-sm text-slate-300 font-medium">No services yet</p>
                                                                <button onClick={() => setSvcForm({ open: true, editing: null })} className="text-[12px] font-bold text-[#1B4ED8] hover:underline">Add your first service</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : svcFiltered.map((svc, idx) => {
                                                    const sc   = SVC_STATUS_CFG[svc.status];
                                                    const mode = svc.mode === 'industry' ? 'Industry' : svc.mode === 'education' ? 'Education' : 'Both';
                                                    const modeColor = svc.mode === 'industry' ? 'bg-blue-50 text-blue-700 border-blue-100' : svc.mode === 'education' ? 'bg-violet-50 text-violet-700 border-violet-100' : 'bg-teal-50 text-teal-700 border-teal-100';
                                                    return (
                                                        <motion.tr
                                                            key={svc.id}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: idx * 0.03, duration: 0.25 }}
                                                            className="border-b border-slate-50 hover:bg-blue-50/10 transition-colors group/srow"
                                                        >
                                                            <td className="pl-8 pr-4 py-[14px]">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B4ED8] to-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-sm">
                                                                        <SvcIcon name={svc.icon} className="h-4 w-4 text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-[13px] font-semibold text-[#040E21] leading-tight max-w-[220px] truncate">{svc.title}</div>
                                                                        <div className="text-[11px] text-slate-400 max-w-[220px] truncate">{svc.short_description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${modeColor}`}>{mode}</span>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className={`h-2 w-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                                                                    <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sc.pill}`}>{sc.label}</Badge>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <span className="text-[12px] font-semibold text-slate-500">{svc.applications.length}</span>
                                                                <span className="text-[11px] text-slate-300 ml-1">items</span>
                                                            </td>
                                                            <td className="px-4 py-[14px]">
                                                                <span className="text-[12px] font-mono text-slate-400">{svc.sort_order}</span>
                                                            </td>
                                                            <td className="pr-6 py-[14px]">
                                                                <div className="flex items-center gap-1.5 justify-end opacity-0 group-hover/srow:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => setSvcForm({ open: true, editing: svc })}
                                                                        className="h-7 w-7 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 flex items-center justify-center transition-all"
                                                                        title="Edit"
                                                                    >
                                                                        <Pencil className="h-3 w-3 text-slate-400 hover:text-[#1B4ED8]" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setSvcDeleteTarget(svc)}
                                                                        className="h-7 w-7 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-200 flex items-center justify-center transition-all"
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 className="h-3 w-3 text-slate-400 hover:text-red-500" />
                                                                    </button>
                                                                    <button
                                                                        onClick={async () => {
                                                                            const newStatus = svc.status === 'active' ? 'draft' : 'active';
                                                                            const res = await fetch(`/api/services/${svc.id}`, {
                                                                                method: 'PATCH',
                                                                                headers: { 'Content-Type': 'application/json' },
                                                                                body: JSON.stringify({ status: newStatus }),
                                                                            });
                                                                            const json = await res.json();
                                                                            if (json.success) {
                                                                                setServices(prev => prev.map(s => s.id === svc.id ? json.data as Service : s));
                                                                            }
                                                                        }}
                                                                        className="h-7 w-7 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 flex items-center justify-center transition-all"
                                                                        title={svc.status === 'active' ? 'Set to Draft' : 'Set to Active'}
                                                                    >
                                                                        {svc.status === 'active'
                                                                            ? <ToggleRight className="h-3.5 w-3.5 text-emerald-500" />
                                                                            : <ToggleLeft  className="h-3.5 w-3.5 text-slate-400" />
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Quick stats row */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Total',    value: services.length,                                  color: 'text-[#040E21]' },
                                        { label: 'Active',   value: services.filter(s => s.status === 'active').length,   color: 'text-emerald-600' },
                                        { label: 'Draft',    value: services.filter(s => s.status === 'draft').length,    color: 'text-amber-500' },
                                        { label: 'Archived', value: services.filter(s => s.status === 'archived').length, color: 'text-slate-400' },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-sm">
                                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] mb-1">{s.label}</div>
                                            <div className={`text-[28px] font-heading font-black leading-none ${s.color}`}>{s.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </main>
            </div>

            {/* ── Detail Modal ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {selected && <InquiryModal inquiry={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>

            {/* ── Service Form Modal ───────────────────────────────────────── */}
            <AnimatePresence>
                {svcForm.open && (
                    <ServiceFormModal
                        initial={svcForm.editing}
                        onSave={svc => {
                            setServices(prev =>
                                svcForm.editing
                                    ? prev.map(s => s.id === svc.id ? svc : s)
                                    : [svc, ...prev]
                            );
                            setSvcForm({ open: false, editing: null });
                        }}
                        onClose={() => setSvcForm({ open: false, editing: null })}
                    />
                )}
            </AnimatePresence>

            {/* ── Delete Confirm Modal ─────────────────────────────────────── */}
            <AnimatePresence>
                {svcDeleteTarget && (
                    <DeleteConfirmModal
                        service={svcDeleteTarget}
                        onConfirm={async () => {
                            await fetch(`/api/services/${svcDeleteTarget.id}`, { method: 'DELETE' });
                            setServices(prev => prev.filter(s => s.id !== svcDeleteTarget.id));
                            setSvcDeleteTarget(null);
                        }}
                        onClose={() => setSvcDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};
