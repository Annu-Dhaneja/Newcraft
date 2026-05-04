import React, { useState, useEffect, useContext } from 'react';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Wrench, 
    Users, 
    Settings, 
    Plus, 
    Trash2, 
    Save, 
    LogOut,
    Eye,
    TrendingUp,
    MessageSquare,
    Zap,
    Shield,
    Database,
    Activity,
    Lock,
    Image as ImageIcon
} from 'lucide-react';
import { Product, Service } from '../types';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

// Assuming roles are handled via a context or state
type AdminRole = 'OWNER_SUPER' | 'OWNER_TECH';

export default function AdminDashboard() {
    const [role, setRole] = useState<AdminRole | null>(null);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'orders' | 'leads' | 'settings'>('overview');
    
    // Mock Data
    const stats = {
        totalRevenue: '₹1,84,250',
        activeOrders: 14,
        newLeads: 8,
        uptime: '99.9%'
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Using common email for demo, but checking specific passwords for specific roles
        // Ideally we'd have two emails, but for simplicity we'll use the passwords as keys
        const email = password === 'guruji55' ? 'owner1@gurucraftpro.com' : 
                      password === 'tech45' ? 'owner2@gurucraftpro.com' : 'client@test.com';

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                setRole(data.user.role);
                toast.success(`Access Granted: ${data.user.name || data.user.role}`);
            } else {
                toast.error('Identity Misalignment: Access Denied');
            }
        } catch (err) {
            toast.error('Authentication Node Offline');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // In a real app, we'd verify the token first
            // For now, we'll just check if it exists and maybe decode it
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setRole(payload.role);
            } catch (e) {
                localStorage.removeItem('adminToken');
            }
        }
    }, []);

    const [orders, setOrders] = useState<any[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isAddingService, setIsAddingService] = useState(false);
    const [newServiceData, setNewServiceData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Graphics',
        image: '',
        whatsappMessage: ''
    });

    const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (f) => {
            setNewServiceData(prev => ({ ...prev, image: f.target?.result as string }));
            toast.success("Service imagery uploaded.");
        };
        reader.readAsDataURL(file);
    };

    const fetchData = async () => {
        setIsRefreshing(true);
        const token = localStorage.getItem('adminToken');
        try {
            const [ordersRes, servicesRes] = await Promise.all([
                fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/services')
            ]);
            setOrders(await ordersRes.json());
            setServices(await servicesRes.json());
        } catch (err) {
            toast.error('Data Sync Failed');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (role) fetchData();
    }, [role]);

    const handleDeleteService = async (id: string) => {
        const token = localStorage.getItem('adminToken');
        try {
            await fetch(`/api/admin/services/${id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            setServices(services.filter(s => s.id !== id));
            toast.success('Service Expunged');
        } catch (err) {
            toast.error('Deletion Protocal Failed');
        }
    };

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!newServiceData.name || !newServiceData.price) {
            toast.error("Required parameters missing.");
            return;
        }

        const payload = {
            ...newServiceData,
            price: parseFloat(newServiceData.price),
            image: newServiceData.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
            whatsappMessage: newServiceData.whatsappMessage || `I am interested in ${newServiceData.name}`
        };

        try {
            const res = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            setServices([...services, data]);
            setIsAddingService(false);
            setNewServiceData({
                name: '',
                price: '',
                description: '',
                category: 'Graphics',
                image: '',
                whatsappMessage: ''
            });
            toast.success('Service Synthesized');
        } catch (err) {
            toast.error('Synthesis Failure');
        }
    };

    if (!role) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] cyber-grid">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md glass p-12 rounded-[3.5rem] border-white/5 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-[60px] rounded-full" />
                    <div className="w-24 h-24 bg-dark border border-white/10 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl overflow-hidden p-2">
                        <img src="/gurucraftpro_logo.png" className="w-full h-full object-contain" alt="Logo" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold mb-4 italic">Security <span className="text-teal">Node</span></h2>
                    <p className="text-slate-500 text-sm mb-12 uppercase tracking-widest font-bold">Input Authentication Protocol</p>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sovereign Passphrase"
                            className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-teal/50 transition-all font-mono text-center text-teal tracking-widest"
                        />
                        <button className="w-full py-5 bg-teal text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] teal-glow hover:scale-[1.02] active:scale-95 transition-all">
                            Initiate Dash Link
                        </button>
                    </form>
                    <p className="mt-8 text-[10px] text-slate-600 uppercase tracking-widest font-bold">Encrypted Session Only</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300">
            {/* Top Bar */}
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 glass fixed top-0 left-0 right-0 z-40 bg-dark/80 backdrop-blur-3xl">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <img src="/gurucraftpro_logo.png" className="w-8 h-8 object-contain" alt="Logo" />
                        <span className="font-serif font-bold text-lg italic tracking-tight text-white">Command <span className="text-teal">Center</span></span>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                        <Shield size={14} className={role === 'OWNER_SUPER' ? 'text-gold' : 'text-teal'} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {role === 'OWNER_SUPER' ? 'Owner Alpha (Super)' : 'Owner Beta (Tech)'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-teal">System Status</p>
                        <p className="text-xs text-white font-mono">NEURAL_READY_V2</p>
                    </div>
                    <button 
                        onClick={() => setRole(null)}
                        className="p-3 hover:bg-red-500/10 text-red-500 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="pt-20 flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 p-8 fixed h-full bg-[#080808]/50 backdrop-blur-md">
                    <nav className="space-y-4">
                        {[
                            { id: 'overview', icon: LayoutDashboard, label: 'Analytics', minRole: 'OWNER_SUPER' },
                            { id: 'orders', icon: ShoppingBag, label: 'Order Queue', minRole: 'OWNER_TECH' },
                            { id: 'leads', icon: MessageSquare, label: 'Lead Manager', minRole: 'OWNER_TECH' },
                            { id: 'services', icon: Zap, label: 'Mixer Config', minRole: 'OWNER_SUPER' },
                            { id: 'settings', icon: Settings, label: 'Core Specs', minRole: 'OWNER_TECH' }
                        ].filter(link => {
                            if (role === 'OWNER_SUPER') return true;
                            if (role === 'OWNER_TECH' && link.minRole === 'OWNER_TECH') return true;
                            return false;
                        }).map(link => (
                            <button
                                key={link.id}
                                onClick={() => setActiveTab(link.id as any)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === link.id ? 'bg-teal text-white shadow-[0_0_30px_rgba(45,212,191,0.2)]' : 'hover:bg-white/5 text-slate-500 hover:text-white'}`}
                            >
                                <link.icon size={20} className={activeTab === link.id ? 'text-white' : 'group-hover:text-teal'} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{link.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border-white/5">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 italic">Session Node</h4>
                        <p className="text-xs text-white font-mono truncate">{Math.random().toString(36).substring(2, 15)}</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-72 flex-1 p-12">
                    <AnimatePresence mode="white">
                        {activeTab === 'overview' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-4 gap-8">
                                    {[
                                        { label: 'Investment Flux', val: stats.totalRevenue, icon: TrendingUp, color: 'text-teal' },
                                        { label: 'Active Matrix', val: stats.activeOrders, icon: Activity, color: 'text-neon-purple' },
                                        { label: 'Unprocessed Leads', val: stats.newLeads, icon: Users, color: 'text-gold' },
                                        { label: 'Neural Uptime', val: stats.uptime, icon: Database, color: 'text-emerald-400' }
                                    ].map((s, i) => (
                                        <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                                <s.icon size={64} />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">{s.label}</p>
                                            <p className={`text-3xl font-serif font-bold italic ${s.color}`}>{s.val}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 glass rounded-[3.5rem] border-white/5 p-10">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-3xl font-serif font-bold italic tracking-tight text-white">Live Flux Analysis</h3>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-teal hover:underline transition-all">Download Report</button>
                                        </div>
                                        <div className="h-64 flex items-end gap-2">
                                            {[40, 70, 45, 90, 65, 80, 50, 40, 70, 45, 90, 65].map((h, i) => (
                                                <div 
                                                    key={i} 
                                                    className="flex-1 bg-white/5 rounded-t-lg relative group transition-all hover:bg-teal/40"
                                                    style={{ height: `${h}%` }}
                                                >
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-bold text-teal opacity-0 group-hover:opacity-100 transition-opacity">₹{h}k</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass rounded-[3.5rem] border-white/5 p-10 flex flex-col items-center justify-center text-center">
                                        <div className="w-32 h-32 rounded-full border-4 border-teal flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin" />
                                            <span className="text-3xl font-serif font-bold italic text-white">55%</span>
                                        </div>
                                        <h3 className="text-xl font-serif font-bold mb-2">Owner Allocation</h3>
                                        <p className="text-xs text-slate-500 italic max-w-xs">Financial dividends currently optimized for Alpha Node (Owner 1).</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass rounded-[3.5rem] border-white/5 p-12 min-h-[600px]"
                            >
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-4xl font-serif font-bold italic tracking-tight text-white">Order <span className="text-neon-purple">Matrix</span></h3>
                                    <div className="flex gap-4">
                                        <button onClick={fetchData} className="p-3 hover:bg-white/5 rounded-xl text-slate-500"><Activity size={18} className={isRefreshing ? 'animate-spin text-teal' : ''} /></button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {orders.filter(o => o.subject !== 'Business Partnership' && o.subject !== 'Technical Help').length > 0 ? (
                                        orders.filter(o => o.subject !== 'Business Partnership' && o.subject !== 'Technical Help').map((order, i) => (
                                            <div key={order.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-teal/30 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-dark rounded-2xl flex items-center justify-center font-bold text-teal border border-teal/20">
                                                        #{i + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white italic">{order.name}</h4>
                                                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{order.subject} • {new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button className="px-6 py-3 bg-neon-purple text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">View Details</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 opacity-20 italic uppercase tracking-widest">No active orders in matrix</div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'leads' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass rounded-[3.5rem] border-white/5 p-12 min-h-[600px]"
                            >
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-4xl font-serif font-bold italic tracking-tight text-white">Lead <span className="text-gold">Archives</span></h3>
                                    <button onClick={fetchData} className="p-3 hover:bg-white/5 rounded-xl text-slate-500"><Activity size={18} className={isRefreshing ? 'animate-spin text-teal' : ''} /></button>
                                </div>

                                <div className="space-y-6">
                                    {orders.filter(o => o.subject === 'Business Partnership' || o.subject === 'Technical Help').map((lead, i) => (
                                        <div key={lead.id} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-4 group">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className={`w-2 h-2 rounded-full ${lead.subject.includes('Strategic') || lead.subject.includes('Business') ? 'bg-gold shadow-[0_0_10px_#eab308]' : 'bg-teal shadow-[0_0_10px_#2dd4bf]'}`} />
                                                        <h4 className="text-xl font-bold text-white italic">{lead.name}</h4>
                                                    </div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Signal Origin: {lead.email}</p>
                                                </div>
                                                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-slate-400 italic">
                                                    {lead.subject}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 font-mono p-4 bg-black/40 rounded-2xl border border-white/5 italic">
                                                "{lead.message}"
                                            </p>
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                                <button className="px-6 py-2 bg-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/20">Archive</button>
                                                <button className="px-6 py-2 bg-teal text-white rounded-full text-[10px] font-bold uppercase tracking-widest teal-glow">Initiate Reply</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'services' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-5xl font-serif font-bold italic tracking-tight text-white">AI Mixer <span className="text-teal">Dynamics</span></h3>
                                    {!isAddingService && (
                                        <button 
                                            onClick={() => setIsAddingService(true)}
                                            className="flex items-center gap-3 px-8 py-4 bg-teal text-white rounded-full text-[10px] font-bold uppercase tracking-widest teal-glow hover:scale-105 transition-all"
                                        >
                                            <Plus size={18} /> New Service Node
                                        </button>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {isAddingService && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="glass p-12 rounded-[3.5rem] border-white/10 overflow-hidden"
                                        >
                                            <h4 className="text-2xl font-serif font-bold italic text-white mb-8">Construct Service Node</h4>
                                            <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic ml-4">Service Name</label>
                                                        <input 
                                                            required
                                                            value={newServiceData.name}
                                                            onChange={e => setNewServiceData({...newServiceData, name: e.target.value})}
                                                            placeholder="e.g. Neural Logo Pack"
                                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-teal/50 outline-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic ml-4">Investment (₹)</label>
                                                        <input 
                                                            required
                                                            type="number"
                                                            value={newServiceData.price}
                                                            onChange={e => setNewServiceData({...newServiceData, price: e.target.value})}
                                                            placeholder="2500"
                                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-teal/50 outline-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic ml-4">Classification</label>
                                                        <select 
                                                            value={newServiceData.category}
                                                            onChange={e => setNewServiceData({...newServiceData, category: e.target.value})}
                                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-teal/50 outline-none appearance-none"
                                                        >
                                                            <option value="Graphics">Graphics</option>
                                                            <option value="Wedding">Wedding</option>
                                                            <option value="Devotion">Devotion</option>
                                                            <option value="Vantage">Vantage</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic ml-4">Neural Imagery</label>
                                                        <div className="relative h-32 rounded-2xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-teal/50 transition-all">
                                                            {newServiceData.image ? (
                                                                <img src={newServiceData.image} className="w-full h-full object-cover" alt="Preview" />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <ImageIcon className="text-slate-700" size={24} />
                                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-700">Upload Visual Specs</span>
                                                                </div>
                                                            )}
                                                            <input 
                                                                type="file" 
                                                                accept="image/*"
                                                                onChange={handleServiceImageUpload}
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic ml-4">Description Blueprint</label>
                                                        <textarea 
                                                            value={newServiceData.description}
                                                            onChange={e => setNewServiceData({...newServiceData, description: e.target.value})}
                                                            className="w-full h-24 bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-teal/50 outline-none resize-none"
                                                            placeholder="Define the technical specifications..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-1 md:col-span-2 flex gap-4 pt-4">
                                                    <button 
                                                        type="submit"
                                                        className="flex-1 py-4 bg-teal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] teal-glow hover:scale-[1.02] transition-all"
                                                    >
                                                        Synthesize Node
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setIsAddingService(false)}
                                                        className="px-8 py-4 border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-slate-500"
                                                    >
                                                        Abort
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {services.map(service => (
                                        <div key={service.id} className="glass rounded-[3.5rem] border-white/5 p-10 group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteService(service.id)}
                                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center gap-6 mb-8">
                                                <img src={service.image} alt={service.name} className="w-24 h-24 rounded-3xl object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                                                <div>
                                                    <h4 className="text-2xl font-serif font-bold italic text-white mb-1">{service.name}</h4>
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal">₹{service.price} • {service.category}</span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-500 mb-8 italic line-clamp-2">"{service.description}"</p>
                                            
                                            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                                <button className="flex-1 py-4 bg-white/5 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Edit Parameters</button>
                                                <button className="px-6 py-4 border border-white/10 text-slate-500 rounded-2xl hover:text-white hover:border-white transition-all"><Settings size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
