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
                    initial={{ opacity: 0, scale: 0.98, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="p-1 rounded-[4rem] bg-slate-50 border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)]"
                >
                    <div className="bg-white rounded-[3.8rem] overflow-hidden border border-slate-50">
                        {/* Header */}
                        <div className="px-12 py-10 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="bg-black p-3.5 rounded-2xl text-white shadow-xl">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-black text-black tracking-tight uppercase">NIYANTRAN OS <span className="text-primary italic">v4.2</span></h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-[0.2em]">SYSTEMS OPTIMAL // 0x82A4F2</span>
                                    </div>
                                </div>
                            </div>
                            <Button className="rounded-2xl h-14 px-8 border-slate-100 hover:bg-slate-50 transition-all duration-500 bg-black text-white font-bold text-xs uppercase tracking-widest">
                                Global Dashboard <ArrowUpRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                            <div className="lg:col-span-8 space-y-10">
                                <div className="grid grid-cols-3 gap-8">
                                    {[
                                        { label: "Active Nodes", val: "32", icon: Layers, trend: "+4%" },
                                        { label: "Live Experiments", val: "12", icon: Activity, trend: "Stable" },
                                        { label: "Research Staff", val: "154", icon: Users, trend: "+12%" }
                                    ].map((card, i) => (
                                        <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-xl hover:-translate-y-2 group">
                                            <div className="flex justify-between items-center mb-10">
                                                <card.icon className="h-7 w-7 text-black group-hover:text-primary transition-colors duration-700" />
                                                <span className="text-[10px] font-bold text-primary tracking-widest">{card.trend}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">{card.label}</div>
                                            <div className="text-4xl font-heading font-black text-black tracking-tighter">{card.val}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm h-[340px] group">
                                    <div className="flex items-center justify-between mb-12">
                                        <h5 className="text-lg font-heading font-black tracking-tight flex items-center gap-4">
                                            <div className="h-2 w-2 bg-primary rounded-full" />
                                            Signal Stability Analysis
                                        </h5>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-1.5 w-1.5 bg-slate-100 rounded-full group-hover:bg-primary transition-colors duration-700" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-32 flex items-end gap-2.5 px-4">
                                        {[40, 60, 35, 75, 45, 90, 65, 80, 55, 70, 85, 50, 95, 60, 45, 80, 70, 90, 100, 85, 60, 40, 55, 75].map((h, i) => (
                                            <ChartBar key={i} height={`${h}%`} delay={i * 0.04} />
                                        ))}
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between text-[10px] font-mono text-slate-400 tracking-[0.4em] uppercase font-bold">
                                        <span>MAR 2026 // LOGGED</span>
                                        <span className="text-primary italic opacity-50">TELEMETRY STREAM ACTIVE</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                <div className="p-12 bg-black rounded-[3rem] text-white h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                                    <h5 className="text-2xl font-heading font-black mb-10 leading-tight">System Reliability Protocols</h5>
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
                                                transition={{ delay: 0.8 + (i * 0.15) }}
                                                className="p-6 bg-white/5 border border-white/5 rounded-2xl text-sm font-medium tracking-tight hover:bg-white/10 transition-all duration-500 cursor-pointer hover:translate-x-2"
                                            >
                                                {msg}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-16 pt-8 border-t border-white/5">
                                        <Button className="w-full h-16 rounded-[2rem] bg-primary hover:bg-white hover:text-black text-white font-black transition-all duration-700 uppercase text-xs tracking-[0.2em]">
                                            View Performance Logs
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
