import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Heart, Sparkles, Globe, Target, Cpu, Boxes, Database } from 'lucide-react';

const values = [
    { title: "Integrity", icon: Shield, desc: "Absolute adherence to global marketplace standards and client confidentiality." },
    { title: "Devotion", icon: Heart, desc: "Merging spiritual reverence with technical precision in all our sacred assets." },
    { title: "Precision", icon: Target, desc: "A relentless pursuit of the perfect pixel, anchored by neural analytics." },
    { title: "Global Vision", icon: Globe, desc: "Empowering local brands to achieve international aesthetic dominance." }
];

export default function About() {
    return (
        <section id="about" className="py-32 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] glass rounded-[5rem] border-white/5 overflow-hidden relative"
                        >
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale opacity-40" alt="Vision" />
                            <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent" />
                            <div className="absolute bottom-16 left-16 right-16">
                                <div className="text-6xl font-serif font-bold italic text-white mb-4">55/45</div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-teal">Strategic Partnership Mandate</p>
                            </div>
                        </motion.div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 glass rounded-full border-white/10 flex items-center justify-center animate-spin-slow backdrop-blur-3xl">
                            <Sparkles size={40} className="text-gold" />
                        </div>
                    </div>

                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-gold/30 mb-8"
                        >
                            <Users size={16} className="text-gold" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold">The Collective</span>
                        </motion.div>
                        <h2 className="text-7xl font-serif font-bold mb-8 italic text-white tracking-tighter">Unified <br /><span className="text-gold">Philosophy</span></h2>
                        <p className="text-slate-400 text-xl italic leading-relaxed mb-8">Gurucraftpro was founded on the singular vision of merging advanced technology with human creativity. We operate as a high-fidelity agency for modern merchants, spiritual devotees, and life partners.</p>
                        <p className="text-slate-500 text-lg italic leading-relaxed mb-12">Our infrastructure is built for scale, but our heart is anchored in local craftsmanship. From Rohini to the digital world, we bridge the gap between imagination and implementation.</p>
                        
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 glass rounded-3xl border-white/5">
                                <h4 className="text-3xl font-serif font-bold italic text-teal mb-2">₹1.8M+</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Asset Flux Managed</p>
                            </div>
                            <div className="p-8 glass rounded-3xl border-white/5">
                                <h4 className="text-3xl font-serif font-bold italic text-neon-purple mb-2">5000+</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Neural Syntheses</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {values.map((value, idx) => (
                        <div key={idx} className="p-10 glass rounded-[3rem] border-white/5 text-center group hover:bg-white/5 transition-all">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                <value.icon size={28} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-serif font-bold italic text-white mb-4">{value.title}</h3>
                            <p className="text-xs text-slate-500 italic leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-40">
                    <div className="text-center mb-20">
                        <h3 className="text-5xl font-serif font-bold italic text-white mb-4">Leadership <span className="text-neon-purple">Protocol</span></h3>
                        <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">The Strategic Nodes Behind Gurucraftpro</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-40">
                        <div className="glass p-12 rounded-[4rem] border-gold/20 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-dark rounded-3xl mb-8 flex items-center justify-center border border-gold/30">
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all" alt="Annu Dhaneja" />
                                </div>
                                <h4 className="text-3xl font-serif font-bold italic text-white mb-2">Annu Dhaneja</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Owner Alpha • Strategic Vision</p>
                                <p className="text-sm text-slate-400 italic leading-relaxed">Directing the high-fidelity aesthetic standards and spiritual integrity of the collective.</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 text-gold/10 group-hover:text-gold/20 transition-colors">
                                <Sparkles size={120} />
                            </div>
                        </div>

                        <div className="glass p-12 rounded-[4rem] border-teal/20 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-dark rounded-3xl mb-8 flex items-center justify-center border border-teal/30">
                                    <Cpu size={40} className="text-teal" />
                                </div>
                                <h4 className="text-3xl font-serif font-bold italic text-white mb-2">Tech Matrix Lead</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-teal mb-6">Owner Beta • Infrastructure</p>
                                <p className="text-sm text-slate-400 italic leading-relaxed">Architecting the neural pipelines and real-time asset synthesis protocols.</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 text-teal/10 group-hover:text-teal/20 transition-colors">
                                <Database size={120} />
                            </div>
                        </div>
                    </div>

                    {/* Brand Timeline */}
                    <div className="max-w-4xl mx-auto relative px-4">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
                        
                        <div className="space-y-24 relative">
                            {[
                                { year: '2021', title: 'Neural Genesis', desc: 'Inception of the Gurucraftpro laboratory with a focus on 3D spiritual assets.' },
                                { year: '2022', title: 'Merchant Expansion', desc: 'Scaling to global e-commerce protocols including Ghost Mannequin and Jersey Task standards.' },
                                { year: '2023', title: 'AR Deployment', desc: 'Universal rollout of Augmented Reality vision engines for mobile-first brand experiences.' },
                                { year: '2024', title: 'Alpha Matrix v4', desc: 'Implementation of the current high-fidelity neural synthesis pipeline and merchant scalability suite.' }
                            ].map((milestone, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    <div className="flex-1 text-center md:text-right w-full">
                                        {idx % 2 === 0 && (
                                            <>
                                                <h4 className="text-3xl font-serif font-bold italic text-white mb-2">{milestone.title}</h4>
                                                <p className="text-xs text-slate-500 italic leading-relaxed">{milestone.desc}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-dark border-2 border-teal/30 flex items-center justify-center text-teal font-bold font-serif italic text-xl shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                                        {milestone.year.slice(2)}
                                    </div>
                                    <div className="flex-1 text-center md:text-left w-full">
                                        {idx % 2 !== 0 && (
                                            <>
                                                <h4 className="text-3xl font-serif font-bold italic text-white mb-2">{milestone.title}</h4>
                                                <p className="text-xs text-slate-500 italic leading-relaxed">{milestone.desc}</p>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-32 p-20 glass rounded-[5rem] border-teal/20 text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <Boxes size={64} className="text-teal mb-8" />
                        <h3 className="text-5xl font-serif font-bold italic text-white mb-6">Our Infrastructure</h3>
                        <p className="text-slate-400 text-lg italic max-w-2xl mx-auto mb-12 leading-relaxed">Operating behind an Nginx reverse proxy layer routing all technical traffic exclusively to port 3000, our system ensures maximum stability for real-time asset generation.</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-teal">
                            <Cpu size={16} />
                            <span>Neural Performance Node V4.2</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent" />
                </div>
            </div>
        </section>
    );
}
