import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Activity, Layers, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChartBar = ({ height, delay, highlight }: { height: string; delay: number; highlight?: boolean }) => (
    <motion.div
        initial={{ height: 0 }}
        whileInView={{ height }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full rounded-t-md relative group cursor-default ${highlight ? 'bg-gradient-to-t from-primary to-primary-light' : 'bg-primary/10'}`}
    >
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md" />
    </motion.div>
);

export const DashboardPreview = () => {
    return (
        <section className="py-36 bg-white overflow-hidden relative">
            {/* Atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="section-label justify-center mb-6">Operational Intelligence</p>
                        <h3 className="text-5xl md:text-7xl font-heading font-black text-navy mb-8 leading-[0.9] tracking-[-0.03em]">
                            Advanced Monitoring<br />
                            <span className="text-gradient">for Modern Labs</span>
                        </h3>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
                            Every Niyantran system comes equipped with our proprietary Control Panel, providing real-time analytics and predictive maintenance alerts.
                        </p>
                    </motion.div>
                </div>

                {/* Dashboard mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[3rem] overflow-hidden border border-blue-50 shadow-[0_40px_120px_rgba(27,78,216,0.10),0_8px_32px_rgba(0,0,0,0.04)]"
                >
                    {/* Window chrome */}
                    <div className="bg-navy px-8 py-5 flex items-center justify-between border-b border-white/[0.05]">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                            </div>
                            <div className="w-px h-5 bg-white/[0.07]" />
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-[10px] flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-white" strokeWidth={2} />
                                </div>
                                <div>
                                    <span className="text-white font-heading font-black text-sm tracking-tight">NIYANTRAN OS </span>
                                    <span className="text-primary-light font-heading font-black text-sm italic">v4.2</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[9px] text-white/30 font-mono tracking-[0.25em] uppercase font-bold">Systems Optimal</span>
                            </div>
                        </div>
                        <Button className="rounded-[10px] h-9 px-5 bg-primary/20 hover:bg-primary text-white font-bold text-[10px] uppercase tracking-[0.15em] border border-primary/30 transition-all duration-400">
                            Live Dashboard <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                    </div>

                    {/* Dashboard content */}
                    <div className="bg-white p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Main content area */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* KPI cards */}
                            <div className="grid grid-cols-3 gap-5">
                                {[
                                    { label: 'Active Nodes', val: '32', icon: Layers, trend: '+4%', pos: true },
                                    { label: 'Live Experiments', val: '12', icon: Activity, trend: 'Stable', pos: null },
                                    { label: 'Research Staff', val: '154', icon: Users, trend: '+12%', pos: true },
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        whileHover={{ y: -4 }}
                                        className="p-7 bg-surface rounded-[1.5rem] border border-blue-50 hover:border-primary/18 hover:shadow-[0_12px_40px_rgba(27,78,216,0.08)] hover:bg-white transition-all duration-500 group cursor-default"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center group-hover:shadow-[0_4px_14px_rgba(27,78,216,0.30)] transition-shadow duration-500">
                                                <card.icon className="h-4.5 w-4.5 text-white" strokeWidth={2} />
                                            </div>
                                            <span className={`text-[10px] font-bold tracking-widest ${card.pos === true ? 'text-emerald-500' : card.pos === false ? 'text-red-400' : 'text-primary'}`}>
                                                {card.trend}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.35em] mb-1">{card.label}</div>
                                        <div className="text-4xl font-heading font-black text-navy tracking-tighter">{card.val}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Chart */}
                            <div className="p-9 bg-white rounded-[2rem] border border-blue-50 shadow-[0_2px_16px_rgba(27,78,216,0.04)] group">
                                <div className="flex items-center justify-between mb-10">
                                    <h5 className="text-base font-heading font-black tracking-tight text-navy flex items-center gap-3">
                                        <div className="h-2 w-2 bg-gradient-to-br from-primary to-primary-light rounded-full" />
                                        Signal Stability Analysis
                                    </h5>
                                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300 tracking-[0.25em] uppercase font-bold">
                                        <span className="text-primary/60 italic">Telemetry Live</span>
                                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-28 flex items-end gap-1.5 px-2">
                                    {[40,60,35,75,45,90,65,80,55,70,85,50,95,60,45,80,70,90,100,85,60,40,55,75].map((h, i) => (
                                        <ChartBar key={i} height={`${h}%`} delay={0.5 + i * 0.03} highlight={h >= 85} />
                                    ))}
                                </div>
                                <div className="mt-7 pt-6 border-t border-blue-50 flex justify-between text-[10px] font-mono text-slate-300 tracking-[0.3em] uppercase font-bold">
                                    <span>Mar 2026 Â· Logged</span>
                                    <span className="text-primary/40">Stream active</span>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="h-full bg-navy rounded-[2rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-[2s]" />
                                <div className="absolute -bottom-8 left-0 w-40 h-40 bg-accent/10 rounded-full blur-[80px]" />
                                <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />

                                <div className="p-8 relative z-10">
                                    <h5 className="text-xl font-heading font-black mb-7 leading-tight text-white tracking-tight">
                                        System Reliability<br />Protocols
                                    </h5>
                                    <div className="space-y-3 mb-8">
                                        {[
                                            'Analyze spectral deviations in Node-04',
                                            'Optimize evaporation rate for Au layer',
                                            'Calculate QE baseline for device AR-12',
                                        ].map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.6 + i * 0.12 }}
                                                className="p-4 bg-white/[0.04] border border-white/[0.04] rounded-[14px] text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.07] hover:translate-x-1 transition-all duration-400 cursor-pointer leading-snug"
                                            >
                                                {msg}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <Button className="w-full h-12 rounded-[14px] bg-primary hover:bg-white hover:text-navy text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500">
                                        View Performance Logs
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Live indicator pill */}
                <div className="mt-10 flex justify-center">
                    <div className="px-7 py-3 rounded-full border border-blue-50 bg-white shadow-[0_2px_16px_rgba(27,78,216,0.06)] text-[10px] font-mono text-slate-400 font-bold uppercase tracking-[0.35em] flex items-center gap-3">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Monitoring Active in 54 Locations
                    </div>
                </div>
            </div>
        </section>
    );
};
