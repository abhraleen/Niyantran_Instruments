import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Users, Inbox, Settings, Search, CheckCircle2,
    Clock, ArrowUpRight, TrendingUp, FileText, Mail,
    BarChart3, RefreshCw, LogOut, Bell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const DEMO_INQUIRIES = [
    { id: 1, name: 'Dr. Arvind Kumar', organization: 'IIT Delhi', email: 'arvind.kumar@iitd.ac.in', phone: '+91 98100 12345', service: 'I–V Measurement Systems', message: 'Need a high-precision IV system for silicon nanowire characterization.', status: 'new', created_at: '2026-05-12T09:14:00Z' },
    { id: 2, name: 'Prof. Sunita Rao', organization: 'IISc Bangalore', email: 'sunita.rao@iisc.ac.in', phone: '+91 80223 56789', service: 'Quantum Efficiency Measurement', message: 'Looking for EQE measurement setup for perovskite solar cells.', status: 'in-progress', created_at: '2026-05-11T14:32:00Z' },
    { id: 3, name: 'Dr. Rahul Mehta', organization: 'TIFR Mumbai', email: 'rahul.mehta@tifr.res.in', phone: '+91 22227 88910', service: 'Software Consultancy', message: 'Require automation scripts for our PPMS setup.', status: 'pending', created_at: '2026-05-10T11:05:00Z' },
    { id: 4, name: 'Dr. Priya Nair', organization: 'DRDO Hyderabad', email: 'priya.nair@drdo.gov.in', phone: '+91 40243 11222', service: 'Evaporation Process Control', message: 'Interested in thin-film deposition monitoring for defense applications.', status: 'completed', created_at: '2026-05-08T16:20:00Z' },
    { id: 5, name: 'Prof. Vikram Singh', organization: 'IIT Bombay', email: 'vikram.singh@iitb.ac.in', phone: '+91 22572 20001', service: 'I–V Measurement Systems', message: 'Need custom SMU integration for organic semiconductor research.', status: 'new', created_at: '2026-05-07T08:45:00Z' },
    { id: 6, name: 'Dr. Ananya Pillai', organization: 'ISRO SAC Ahmedabad', email: 'ananya.pillai@isro.gov.in', phone: '+91 79268 91234', service: 'Quantum Efficiency Measurement', message: 'QE characterization for space-grade photodetectors.', status: 'in-progress', created_at: '2026-04-30T13:10:00Z' },
    { id: 7, name: 'Dr. Karthik Subramanian', organization: 'NIT Trichy', email: 'karthik.s@nitt.edu', phone: '+91 43151 30001', service: 'Software Consultancy', message: 'Lab automation software for student research facility.', status: 'completed', created_at: '2026-04-22T10:00:00Z' },
    { id: 8, name: 'Prof. Deepa Krishnan', organization: 'IIT Madras', email: 'deepa.krishnan@iitm.ac.in', phone: '+91 44227 48000', service: 'Evaporation Process Control', message: 'Thermal evaporation control for MoS2 thin-film experiments.', status: 'new', created_at: '2026-04-15T09:30:00Z' },
];

const STATUS_CONFIG: Record<string, { label: string; className: string; dot: string }> = {
    new: { label: 'New', className: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500 animate-pulse' },
    pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500 animate-pulse' },
    'in-progress': { label: 'In Progress', className: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
    completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
};

const MONTHLY_DATA = [
    { month: 'Dec', count: 2 }, { month: 'Jan', count: 3 }, { month: 'Feb', count: 2 },
    { month: 'Mar', count: 5 }, { month: 'Apr', count: 4 }, { month: 'May', count: 8 },
];

export const AdminDashboard = () => {
    const [inquiries, setInquiries] = React.useState<typeof DEMO_INQUIRIES>([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState<string>('all');

    React.useEffect(() => {
        fetch('/api/inquiries')
            .then(res => res.json())
            .then(data => {
                setInquiries(data.length > 0 ? data : DEMO_INQUIRIES);
                setLoading(false);
            })
            .catch(() => {
                setInquiries(DEMO_INQUIRIES);
                setLoading(false);
            });
    }, []);

    const filtered = inquiries.filter(i => {
        const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.organization.toLowerCase().includes(search.toLowerCase()) ||
            i.service.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || i.status === filter;
        return matchSearch && matchFilter;
    });

    const stats = [
        { title: 'Total Inquiries', value: inquiries.length, icon: Inbox, change: '+18%', up: true },
        { title: 'New Leads', value: inquiries.filter(i => i.status === 'new').length, icon: Users, change: '+3 today', up: true },
        { title: 'In Progress', value: inquiries.filter(i => i.status === 'in-progress').length, icon: Activity, change: 'Active', up: true },
        { title: 'Avg. Response', value: '4.2h', icon: Clock, change: '-12%', up: true },
    ];

    const maxCount = Math.max(...MONTHLY_DATA.map(d => d.count));

    return (
        <div className="min-h-screen bg-[#F6F8FC]">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                <div className="max-w-[1600px] mx-auto px-6 h-[68px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#040E21] to-[#1B4ED8] flex items-center justify-center shadow-[0_4px_14px_rgba(27,78,216,0.35)]">
                            <Activity className="h-5 w-5 text-white" strokeWidth={1.75} />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-heading font-black text-[#040E21] tracking-tight leading-none">Niyantran Control Panel</h1>
                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mt-0.5">Research Monitoring System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                            <Input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search inquiries..."
                                className="pl-10 w-60 bg-slate-50 border-slate-100 rounded-xl h-10 text-sm text-slate-600 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#040E21] to-[#1B4ED8] flex items-center justify-center text-white text-xs font-black shadow-md">
                            SB
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                        >
                            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white group cursor-default">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="p-2.5 bg-blue-50 rounded-[10px] group-hover:bg-blue-100 transition-colors">
                                            <stat.icon className="h-5 w-5 text-[#1B4ED8]" strokeWidth={1.75} />
                                        </div>
                                        <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${stat.up ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                                            {stat.change}
                                        </Badge>
                                    </div>
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">{stat.title}</div>
                                    <div className="text-3xl font-heading font-black text-[#040E21] tracking-tight">{stat.value}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="inquiries" className="space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <TabsList className="bg-white border border-slate-100 p-1 rounded-xl h-12 shadow-sm">
                            <TabsTrigger value="inquiries" className="px-6 rounded-lg data-[state=active]:bg-[#040E21] data-[state=active]:text-white h-full text-sm font-semibold transition-all">
                                <Inbox className="h-4 w-4 mr-2" /> Inquiries
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="px-6 rounded-lg data-[state=active]:bg-[#040E21] data-[state=active]:text-white h-full text-sm font-semibold transition-all">
                                <BarChart3 className="h-4 w-4 mr-2" /> Analytics
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="px-6 rounded-lg data-[state=active]:bg-[#040E21] data-[state=active]:text-white h-full text-sm font-semibold transition-all">
                                <Settings className="h-4 w-4 mr-2" /> Settings
                            </TabsTrigger>
                        </TabsList>

                        {/* Filter chips */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {['all', 'new', 'pending', 'in-progress', 'completed'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all capitalize ${filter === s ? 'bg-[#040E21] text-white border-[#040E21]' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                                >
                                    {s === 'all' ? 'All' : s.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Inquiries Tab */}
                    <TabsContent value="inquiries">
                        <Card className="border-slate-100 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="px-7 py-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-base font-heading font-black text-[#040E21]">Research Network Inquiries</CardTitle>
                                    <p className="text-xs text-slate-400 mt-0.5 font-medium">All booking enquiries from the scientific outreach platform</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="rounded-xl h-9 border-slate-100 text-xs font-semibold text-slate-500 hover:text-[#040E21]">
                                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
                                    </Button>
                                    <Button variant="outline" size="sm" className="rounded-xl h-9 border-slate-100 text-xs font-semibold text-slate-500 hover:text-[#040E21]">
                                        <FileText className="h-3.5 w-3.5 mr-1.5" /> Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 pl-7">Researcher</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Organization</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Service</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Status</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Date</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 text-right pr-7">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-14 text-slate-300 text-sm font-medium">
                                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="inline-block mr-2">
                                                        <RefreshCw className="h-4 w-4" />
                                                    </motion.div>
                                                    Syncing with database...
                                                </TableCell>
                                            </TableRow>
                                        ) : filtered.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-14 text-slate-300 text-sm font-medium">No inquiries match your search.</TableCell>
                                            </TableRow>
                                        ) : filtered.map((inquiry, idx) => {
                                            const sc = STATUS_CONFIG[inquiry.status] ?? STATUS_CONFIG.pending;
                                            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inquiry.email)}&su=${encodeURIComponent(`Re: Your Niyantran Enquiry — ${inquiry.name}`)}&body=${encodeURIComponent(`Dear ${inquiry.name},\n\nThank you for reaching out to Niyantran Instruments regarding ${inquiry.service}.\n\nWe have reviewed your requirements and would like to schedule a consultation.\n\nBest regards,\nNiyantran Instruments Team`)}`;
                                            return (
                                                <motion.tr
                                                    key={inquiry.id}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.04 }}
                                                    className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group/row"
                                                >
                                                    <TableCell className="pl-7 py-4">
                                                        <div className="font-semibold text-[#040E21] text-sm">{inquiry.name}</div>
                                                        <div className="text-xs text-slate-400 font-medium mt-0.5">{inquiry.email}</div>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-500 font-medium">{inquiry.organization}</TableCell>
                                                    <TableCell>
                                                        <span className="text-xs font-semibold text-[#1B4ED8] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{inquiry.service}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                                                            <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sc.className}`}>{sc.label}</Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-slate-400 font-mono">{new Date(inquiry.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                                                    <TableCell className="text-right pr-7">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => window.open(gmailUrl, '_blank')}
                                                            className="h-8 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-[#1B4ED8] hover:bg-blue-50 opacity-0 group-hover/row:opacity-100 transition-all"
                                                        >
                                                            <Mail className="h-3.5 w-3.5 mr-1.5" /> Reply
                                                            <ArrowUpRight className="h-3 w-3 ml-1" />
                                                        </Button>
                                                    </TableCell>
                                                </motion.tr>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {/* Monthly bar chart */}
                            <Card className="lg:col-span-2 border-slate-100 shadow-sm bg-white">
                                <CardHeader className="px-7 pt-6 pb-4 border-b border-slate-50">
                                    <CardTitle className="text-base font-heading font-black text-[#040E21]">Monthly Inquiry Volume</CardTitle>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Booking enquiries received per month</p>
                                </CardHeader>
                                <CardContent className="p-7">
                                    <div className="flex items-end gap-4 h-48">
                                        {MONTHLY_DATA.map((d, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <span className="text-xs font-black text-[#1B4ED8]">{d.count}</span>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(d.count / maxCount) * 100}%` }}
                                                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                    className={`w-full rounded-t-lg ${i === MONTHLY_DATA.length - 1 ? 'bg-gradient-to-t from-[#040E21] to-[#1B4ED8]' : 'bg-blue-100 hover:bg-blue-200 transition-colors'}`}
                                                />
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{d.month}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Breakdown by service */}
                            <Card className="border-slate-100 shadow-sm bg-white">
                                <CardHeader className="px-7 pt-6 pb-4 border-b border-slate-50">
                                    <CardTitle className="text-base font-heading font-black text-[#040E21]">By Service</CardTitle>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Distribution across offerings</p>
                                </CardHeader>
                                <CardContent className="p-7 space-y-5">
                                    {['I–V Measurement Systems', 'Quantum Efficiency Measurement', 'Evaporation Process Control', 'Software Consultancy'].map((svc, i) => {
                                        const count = inquiries.filter(x => x.service === svc).length;
                                        const pct = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                                        return (
                                            <div key={i}>
                                                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                                                    <span className="truncate max-w-[160px]">{svc}</span>
                                                    <span className="text-[#1B4ED8] font-black ml-2">{count}</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                        className="h-full bg-gradient-to-r from-[#040E21] to-[#1B4ED8] rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="pt-5 border-t border-slate-50 space-y-3 mt-2">
                                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                                            const count = inquiries.filter(x => x.status === key).length;
                                            return (
                                                <div key={key} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`h-2 w-2 rounded-full ${cfg.dot.replace(' animate-pulse', '')}`} />
                                                        <span className="font-medium text-slate-500 capitalize">{cfg.label}</span>
                                                    </div>
                                                    <span className="font-black text-[#040E21]">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Card className="border-slate-100 shadow-sm bg-white">
                                <CardHeader className="px-7 py-6 border-b border-slate-50">
                                    <CardTitle className="text-base font-heading font-black text-[#040E21]">System Configuration</CardTitle>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Manage platform settings and integrations</p>
                                </CardHeader>
                                <CardContent className="p-7 space-y-5">
                                    {[
                                        { label: 'Notification Email', value: 'sb@niyantran.org' },
                                        { label: 'Platform Version', value: 'v2.4.1' },
                                        { label: 'Database', value: 'NeonDB (PostgreSQL)' },
                                        { label: 'API Status', value: 'Operational' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                                            <span className="text-sm font-medium text-slate-400">{item.label}</span>
                                            <span className="text-sm font-bold text-[#040E21]">{item.value}</span>
                                        </div>
                                    ))}
                                    <Button className="w-full mt-4 rounded-xl bg-[#040E21] hover:bg-[#1B4ED8] text-white text-sm font-bold h-11 transition-all duration-300">
                                        <Settings className="h-4 w-4 mr-2" /> Save Configuration
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-100 shadow-sm bg-white">
                                <CardHeader className="px-7 py-6 border-b border-slate-50">
                                    <CardTitle className="text-base font-heading font-black text-[#040E21]">Quick Actions</CardTitle>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Common admin operations</p>
                                </CardHeader>
                                <CardContent className="p-7 space-y-3">
                                    {[
                                        { label: 'Export All Inquiries (CSV)', icon: FileText, action: () => {} },
                                        { label: 'Send Broadcast to All Leads', icon: Mail, action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=sb@niyantran.org&su=Niyantran+Instruments+Update', '_blank') },
                                        { label: 'View Live Website', icon: ArrowUpRight, action: () => window.open('/', '_blank') },
                                        { label: 'Check System Health', icon: CheckCircle2, action: () => window.open('/api/health', '_blank') },
                                    ].map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={item.action}
                                            className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 text-left transition-all group"
                                        >
                                            <item.icon className="h-4 w-4 text-slate-300 group-hover:text-[#1B4ED8] transition-colors flex-shrink-0" />
                                            <span className="text-sm font-semibold text-slate-500 group-hover:text-[#040E21] transition-colors">{item.label}</span>
                                        </button>
                                    ))}
                                    <div className="pt-3">
                                        <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border border-red-50 hover:border-red-200 hover:bg-red-50/40 text-left transition-all group">
                                            <LogOut className="h-4 w-4 text-red-200 group-hover:text-red-400 transition-colors flex-shrink-0" />
                                            <span className="text-sm font-semibold text-red-200 group-hover:text-red-400 transition-colors">Sign Out</span>
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};
