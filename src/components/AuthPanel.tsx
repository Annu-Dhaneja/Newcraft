import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, User, ShieldCheck, Github } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuthPanel() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (data.token) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                toast.success(isLogin ? 'Neural Link Established' : 'Identity Registered');
                window.location.href = '/';
            } else {
                toast.error(data.error || 'Authentication Refused');
            }
        } catch (err) {
            toast.error('Network Synapse Failure');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#050505] cyber-grid relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 blur-[150px] rounded-full pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl glass p-12 md:p-16 rounded-[4rem] border-white/5 relative z-10"
            >
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-dark border border-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl p-2">
                        <img src="/gurucraftpro_logo.png" className="w-full h-full object-contain" alt="Logo" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold italic mb-2 tracking-tight">
                        {isLogin ? 'Identify' : 'Register'} <span className="text-teal">Self</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Access the Gurucraft Synthesis Network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 overflow-hidden"
                            >
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 italic">Display Name</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input 
                                        required={!isLogin}
                                        type="text" 
                                        placeholder="Guruji Disciple"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 pl-16 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 italic">Email Node</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                required
                                type="email" 
                                placeholder="identity@neural.link"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 pl-16 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 italic">Secret Passkey</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                required
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 pl-16 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        disabled={isLoading}
                        className="w-full py-6 bg-teal text-white rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl teal-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        {isLoading ? 'Processing Signal...' : (
                            <>
                                {isLogin ? 'Initiate Link' : 'Register Identity'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Alternative Vectors</span>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Github size={18} /> GitHub
                        </button>
                        <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google
                        </button>
                    </div>

                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="w-full text-center text-slate-500 uppercase tracking-widest text-[10px] font-bold hover:text-teal transition-all pt-4"
                    >
                        {isLogin ? "No identity recorded? Register profile" : "Existing identity? Synchronize profile"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
