import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Activity, Layers, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChartBar = ({ height, delay }: { height: string, delay: number }) => (
    <motion.div
        initial={{ height: 0 }}
        whileInView={{ height }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="w-full bg-primary/20 rounded-t-sm relative group"
    >
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-sm" />
    </motion.div>
);

export const DashboardPreview = () => {
    return (
        <section className="py-40 bg-white overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono tracking-[0.4em] text-primary uppercase mb-6">Operational Intelligence</h2>
                        <h3 className="text-5xl md:text-7xl font-heading font-black text-heading mb-10 leading-none tracking-tighter">
                            Advanced Monitoring <br /> for Modern Labs
                        </h3>
                        <p className="text-xl text-secondary-text max-w-4xl mx-auto font-light leading-relaxed mb-12">
                            Every Niyantran system comes equipped with our proprietary Control Panel, providing real-time analytics and predictive maintenance alerts.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="p-3 glass rounded-[3rem] border border-white/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] mask-fade-bottom"
                >
                    <div className="bg-[#F8FAFC] rounded-[2.5rem] overflow-hidden border border-border/50">
                        {/* Header */}
                        <div className="px-10 py-8 border-b border-border/50 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                                    <Activity className="h-7 w-7" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-black text-heading tracking-tight">NIYANTRAN OS v4.2</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge variant="outline" className="rounded-full bg-green-50 text-green-700 border-green-200 uppercase text-[10px] font-bold">Systems Optimal</Badge>
                                        <span className="text-[10px] font-mono text-slate-400">SESSION ID: 0x82A4F2</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-2xl h-12 px-6 border-border hover:bg-slate-50">
                                Global Dashboard <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 space-y-8">
                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: "Active Nodes", val: "32", icon: Layers, trend: "+4%" },
                                        { label: "Live Experiments", val: "12", icon: Activity, trend: "Stable" },
                                        { label: "Research Staff", val: "154", icon: Users, trend: "+12%" }
                                    ].map((card, i) => (
                                        <div key={i} className="p-8 bg-white rounded-[2rem] border border-border/50 shadow-sm transition-transform hover:-translate-y-1">
                                            <div className="flex justify-between items-center mb-6">
                                                <card.icon className="h-6 w-6 text-primary" />
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{card.trend}</span>
                                            </div>
                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</div>
                                            <div className="text-4xl font-heading font-black text-heading tracking-tight">{card.val}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-10 bg-white rounded-[2.5rem] border border-border/50 shadow-sm h-[320px]">
                                    <div className="flex items-center justify-between mb-10">
                                        <h5 className="text-xl font-heading font-black tracking-tight flex items-center gap-3">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                            Signal Stability Analysis
                                        </h5>
                                        <div className="flex gap-2">
                                            <div className="h-3 w-3 bg-primary rounded-full" />
                                            <div className="h-3 w-3 bg-accent rounded-full" />
                                            <div className="h-3 w-3 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="h-32 flex items-end gap-3 px-4">
                                        {[40, 60, 35, 75, 45, 90, 65, 80, 55, 70, 85, 50, 95, 60, 45, 80, 70, 90, 100, 85, 60].map((h, i) => (
                                            <ChartBar key={i} height={`${h}%`} delay={i * 0.05} />
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase">
                                        <span>MAR 12, 2026</span>
                                        <span>REAL-TIME TELEMETRY STREAMING</span>
                                        <span>ISO-CERTIFIED DATA</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                <div className="p-10 bg-heading rounded-[2.5rem] text-white h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                                    <h5 className="text-2xl font-heading font-black mb-10 leading-tight">Instant Decision Support AI</h5>
                                    <div className="space-y-6">
                                        {[
                                            "Analyze spectral deviations in Node-04",
                                            "Optimize evaporation rate for Au layer",
                                            "Calculate QE baseline for device AR-12"
                                        ].map((msg, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 + (i * 0.2) }}
                                                className="p-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-light tracking-tight hover:bg-white/10 transition-colors cursor-pointer"
                                            >
                                                {msg}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-white/10">
                                        <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-[1.02]">
                                            Deploy Intelligent Logic
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-20 flex justify-center">
                    <div className="px-8 py-3 rounded-full border border-border bg-slate-50 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-[0.4em] flex items-center gap-4">
                        <span className="flex h-2 w-2 rounded-full bg-green-500" />
                        Live Monitoring Active in 54 Locations
                    </div>
                </div>
            </div>
        </section>
    );
};
