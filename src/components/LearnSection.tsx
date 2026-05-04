import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Hash, Download, Lock, FileText, ChevronRight, Binary, Cpu, Shield, Database, Sparkles } from 'lucide-react';

const technicalSpecs = [
    {
        title: "Neural Warp Synthesis",
        desc: "Deep pose estimation keypoints are analyzed in real-time to warp textures with thin-plate spline accuracy.",
        icon: Cpu,
        color: "text-teal"
    },
    {
        title: "Matrix Composition",
        desc: "Multi-layered alpha blending techniques that preserve skin tones and ambient lighting data.",
        icon: Binary,
        color: "text-neon-purple"
    },
    {
        title: "Data Integrity",
        desc: "Sovereign local storage for all matrix buffers, ensuring zero-latency and zero-leak privacy.",
        icon: Shield,
        color: "text-gold"
    }
];

const modules = [
    {
        id: "01",
        title: "Product Archetypes",
        category: "E-Commerce Logistics",
        content: "Understanding the hierarchy of Ghost Mannequin versus Jersey Task protocols for global marketplaces.",
        duration: "12 min reading"
    },
    {
        id: "02",
        title: "AR Vision Engines",
        category: "Spiritual Art",
        content: "How augmented reality anchors sacred assets to real-world coordinates using high-fidelity vision.",
        duration: "18 min reading"
    },
    {
        id: "03",
        title: "Unified Planning",
        category: "Wedding Strategy",
        content: "Architecting a digital legacy through 3D architectural invitations and neural budget projections.",
        duration: "15 min reading"
    }
];

export default function LearnSection() {
    return (
        <section id="learn" className="py-32 bg-darker overflow-hidden cyber-grid">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-teal/30 mb-8"
                        >
                            <BookOpen size={16} className="text-teal" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-teal">Knowledge Protocol</span>
                        </motion.div>
                        <h2 className="text-7xl font-serif font-bold mb-8 italic tracking-tighter text-white">Technological <span className="text-neon-purple">Mastery</span></h2>
                        <p className="text-slate-400 text-xl italic leading-relaxed mb-12">Gurucraftpro is more than a service provider; it is a neural laboratory where tradition meets advanced post-production algorithms.</p>
                        
                        <div className="grid sm:grid-cols-3 gap-8">
                            {technicalSpecs.map((spec, i) => (
                                <div key={i} className="group cursor-default">
                                    <spec.icon className={`mb-4 ${spec.color} group-hover:scale-110 transition-transform`} size={32} />
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">{spec.title}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold italic leading-relaxed">{spec.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px] aspect-square relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-neon-purple/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="relative h-full glass rounded-[4rem] border-white/5 flex items-center justify-center p-12">
                            <div className="space-y-8 w-full">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.random() * 60 + 20}%` }}
                                            transition={{ delay: i * 0.2, duration: 2 }}
                                            className="h-full bg-teal shadow-[0_0_10px_#2dd4bf]"
                                        />
                                    </div>
                                ))}
                                <div className="pt-8 text-center text-white/20 uppercase tracking-[0.3em] font-bold text-[8px]">
                                    <Database size={48} className="text-white/10 mx-auto mb-4" />
                                    <p>Processing Archives...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 mb-32">
                    {modules.map((module, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-12 rounded-[3.5rem] border-white/5 hover:border-white/20 transition-all flex flex-col h-full bg-dark/40 group overflow-hidden relative"
                        >
                            <div className="text-4xl font-serif font-bold text-teal/20 mb-8">{module.id}</div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 italic">{module.category}</h4>
                            <h3 className="text-3xl font-serif font-bold italic text-white mb-6 tracking-tight group-hover:text-teal transition-colors">{module.title}</h3>
                            <p className="text-sm text-slate-400 italic leading-relaxed mb-8 flex-1">{module.content}</p>
                            <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{module.duration}</span>
                                <button className="text-teal hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 blur-3xl -z-10 group-hover:bg-teal/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>

                {/* Neural Progress Lab */}
                <div className="glass p-12 rounded-[4rem] border-white/5 mb-32 relative overflow-hidden bg-dark/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-md">
                            <h3 className="text-4xl font-serif font-bold italic text-white mb-4 tracking-tight">Neural Knowledge Tracer</h3>
                            <p className="text-slate-400 italic text-sm">Visualize your integration with the Gurucraftpro methodology through our algorithmic roadmap tracker.</p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
                            {[
                                { label: 'Modules Decoded', val: '74%', color: 'text-teal' },
                                { label: 'Matrix Proficiency', val: 'Alpha', color: 'text-neon-purple' },
                                { label: 'Node Connections', val: '1,204', color: 'text-gold' },
                                { label: 'Latency Period', val: '0ms', color: 'text-white' }
                            ].map((stat, i) => (
                                <div key={i} className="glass p-8 rounded-3xl border-white/5 text-center group hover:bg-white/5 transition-all">
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-3">{stat.label}</div>
                                    <div className={`text-xl font-serif font-bold italic ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-teal/20 to-transparent" />
                </div>

                <div className="mt-32 glass p-16 rounded-[4rem] border-white/5 bg-gradient-to-br from-neon-purple/10 to-teal/10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-teal/20 rounded-lg text-teal">
                                <FileText size={20} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal">Technical Asset Release</span>
                        </div>
                        <h3 className="text-4xl font-serif font-bold italic text-white mb-4">Neural Architecture <br />Whitepaper v1.0</h3>
                        <p className="text-slate-400 italic text-sm max-w-md">Download our strategic framework on neural coordinate mapping and high-fidelity post-production integrity.</p>
                    </div>
                    <div className="relative z-10">
                        <button className="px-12 py-6 bg-white text-dark rounded-3xl font-bold uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                            <Download size={20} />
                            Get Whitepaper
                        </button>
                    </div>
                    {/* Background tech visual */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </section>
    );
}
