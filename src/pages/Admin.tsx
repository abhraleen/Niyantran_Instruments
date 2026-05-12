import React from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, 
    Users, 
    Inbox, 
    Settings, 
    Search, 
    CheckCircle2, 
    Clock, 
    ArrowUpRight,
    TrendingUp,
    FileText,
    ExternalLink
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export const AdminDashboard = () => {
    const [inquiries, setInquiries] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/inquiries')
            .then(res => res.json())
            .then(data => {
                setInquiries(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const stats = [
        { title: "Total Inquiries", value: inquiries.length, icon: Inbox, change: "+12%", trend: "up" },
        { title: "New Leads", value: inquiries.filter(i => i.status === 'pending').length, icon: Users, change: "+5%", trend: "up" },
        { title: "Conversion Rate", value: "24%", icon: TrendingUp, change: "+2%", trend: "up" },
        { title: "Avg. Response", value: "4.2h", icon: Clock, change: "-10%", trend: "down" }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-12">
            {/* Sidebar-style Header */}
            <header className="bg-white border-b border-border sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-heading font-bold text-heading">Control Panel</h1>
                            <p className="text-xs text-secondary-text font-mono uppercase tracking-tighter">Research Monitoring System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search research logs..." className="pl-10 w-64 bg-slate-50 border-border rounded-lg" />
                        </div>
                        <Button variant="outline" className="rounded-full">System Diagnostics</Button>
                        <div className="w-10 h-10 rounded-full bg-alternate flex items-center justify-center font-bold text-primary border border-primary/20">
                            SB
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow group">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/5 transition-colors">
                                        <stat.icon className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <Badge variant="outline" className={`rounded-full ${stat.trend === 'up' ? 'text-green-600 bg-green-50 border-green-100' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
                                        {stat.change}
                                    </Badge>
                                </div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.title}</h3>
                                <p className="text-3xl font-heading font-bold text-heading">{stat.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue="inquiries" className="space-y-6">
                    <TabsList className="bg-white border border-border p-1 rounded-xl h-14">
                        <TabsTrigger value="inquiries" className="px-8 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white h-full">
                            <Inbox className="h-4 w-4 mr-2" /> Inquiries
                        </TabsTrigger>
                        <TabsTrigger value="content" className="px-8 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white h-full">
                            <Settings className="h-4 w-4 mr-2" /> System Content
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="px-8 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white h-full">
                            <TrendingUp className="h-4 w-4 mr-2" /> Performance
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="inquiries">
                        <Card className="border-border/50 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-border p-6 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Research Network Inquiries</CardTitle>
                                    <p className="text-sm text-slate-500 mt-1">Real-time leads from the scientific outreach platform.</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-lg">
                                    <FileText className="h-4 w-4 mr-2" /> Export Logs
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[200px]">Inquirer</TableHead>
                                            <TableHead>Organization</TableHead>
                                            <TableHead>Service Area</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Received</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-12 text-slate-400">Synchronizing with researcher database...</TableCell>
                                            </TableRow>
                                        ) : inquiries.map((inquiry) => (
                                            <TableRow key={inquiry.id} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell>
                                                    <div className="font-semibold text-heading">{inquiry.name}</div>
                                                    <div className="text-xs text-slate-500">{inquiry.email}</div>
                                                </TableCell>
                                                <TableCell className="text-slate-600 italic">{inquiry.organization}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 rounded-md">
                                                        {inquiry.service}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`h-2 w-2 rounded-full ${inquiry.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                                                        <span className="text-sm font-medium capitalize text-slate-700">{inquiry.status}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right text-slate-500 text-sm font-mono">
                                                    {new Date(inquiry.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="rounded-lg hover:bg-primary/10 hover:text-primary">
                                                        Review <ExternalLink className="ml-1 h-3 w-3" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="content">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <Card className="border-border/50 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <Settings className="h-16 w-16 text-slate-200 mb-6" />
                                <h3 className="text-xl font-heading font-bold mb-4">Module Management System</h3>
                                <p className="text-slate-500 max-w-sm mb-8">
                                    Dynamic content editing for service modules and product documentation. These updates sync instantly with the research portal.
                                </p>
                                <Button className="rounded-xl px-10 h-14 text-white">Initialize Content Sync</Button>
                             </Card>
                             <Card className="border-border/50 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <Activity className="h-16 w-16 text-slate-200 mb-6" />
                                <h3 className="text-xl font-heading font-bold mb-4">Scientific Assets Repository</h3>
                                <p className="text-slate-500 max-w-sm mb-8">
                                    Manage instrumentation imagery, technical diagrams, and case studies shown across the platform.
                                </p>
                                <Button variant="outline" className="rounded-xl px-10 h-14">Access Asset Manager</Button>
                             </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};
