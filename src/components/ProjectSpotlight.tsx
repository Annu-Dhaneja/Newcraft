import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye } from 'lucide-react';

export default function ProjectSpotlight() {
    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                        <Sparkles size={20} className="animate-pulse" />
                    </div>
                    <span className="text-xs font-bold font-serif uppercase tracking-[0.4em] text-slate-500">Project Spotlight</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl font-serif font-bold mb-8 italic leading-tight">
                            The <span className="text-neon-purple leading-normal">Cyber-Luxe</span> <br /> 
                            Sacred Portrait
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 italic">
                            "Cinematic, ultra-realistic 3D portrait of Guruji in a meditative posture, centered within a divine, ethereal Chatarpur-inspired temple setting. A sophisticated color palette featuring glowing neon purple and electric teal blue gradients."
                        </p>
                        
                        <div className="space-y-4 text-slate-500 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                                <span>8K Divine Resolution</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                                <span>Volumetric Light Rendering</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                                <span>Live Shimmer Particle Effects</span>
                            </div>
                        </div>

                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3 group">
                            <Eye size={18} className="group-hover:text-teal transition-colors" />
                            View Concept Breakdown
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group lg:ml-auto"
                    >
                        <div className="aspect-[4/5] w-full max-w-[500px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                            />
                            {/* Overlaying Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/30 via-transparent to-teal/30 mix-blend-overlay" />
                            
                            {/* Particle simulaton (pseudo) */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl border-teal/30 shadow-2xl max-w-[200px] backdrop-blur-3xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">Live Status</p>
                            <p className="text-sm font-serif font-bold italic">"Divine aura rendering complete..."</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
