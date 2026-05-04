import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Wand2, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center cyber-grid bg-darker">
            {/* Background Kinetic Particles (Enhanced Organic Movement) */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                {[...Array(40)].map((_, i) => {
                    const xStart = Math.random() * 100;
                    const yStart = Math.random() * 100;
                    const xNodes = [
                        xStart + '%',
                        (xStart + (Math.random() * 30 - 15)) + '%',
                        (xStart + (Math.random() * 60 - 30)) + '%',
                        (xStart + (Math.random() * 30 - 15)) + '%',
                        xStart + '%'
                    ];
                    const yNodes = [
                        yStart + '%',
                        (yStart + (Math.random() * 30 - 15)) + '%',
                        (yStart + (Math.random() * 60 - 30)) + '%',
                        (yStart + (Math.random() * 30 - 15)) + '%',
                        yStart + '%'
                    ];
                    const size = Math.random() * 3 + 1;
                    const duration = Math.random() * 25 + 25;
                    const isTeal = i % 2 === 0;

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: size,
                                height: size,
                                backgroundColor: isTeal ? '#2dd4bf' : '#a855f7',
                                boxShadow: isTeal ? '0 0 15px rgba(45, 212, 191, 0.4)' : '0 0 15px rgba(168, 85, 247, 0.4)',
                                filter: 'blur(1px)'
                            }}
                            initial={{ 
                                x: xStart + '%', 
                                y: yStart + '%',
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{ 
                                x: xNodes,
                                y: yNodes,
                                opacity: [0, 0.6, 1, 0.6, 0],
                                scale: [0.5, 1.2, 1.5, 1.2, 0.5]
                            }}
                            transition={{ 
                                duration: duration,
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: Math.random() * 20,
                                times: [0, 0.25, 0.5, 0.75, 1]
                            }}
                        />
                    );
                })}
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-teal/20 rounded-full blur-[140px] animate-pulse" />
            
            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-12 backdrop-blur-2xl"
                    >
                        <div className="w-2 h-2 rounded-full bg-teal animate-ping" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/80">Quantum Agency Engine v4.0.2</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-8xl md:text-[10rem] font-serif font-bold leading-[0.85] mb-14 tracking-tighter"
                    >
                        Gurucraft<span className="text-neon-purple italic">pro</span> <br /> 
                        <span className="text-teal">Intelligence</span> Agency
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl text-slate-400 mb-20 max-w-3xl leading-relaxed italic opacity-80"
                    >
                        Facilitating "Cyber-Luxe" digital experiences through high-fidelity AR, 3D spiritual art, and AI-driven e-commerce architectural optimization.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-8 mb-32"
                    >
                        <a href="#ai-mixer" className="px-12 py-6 bg-gold text-dark rounded-3xl font-bold flex items-center gap-3 gold-glow hover:scale-105 transition-all text-xs uppercase tracking-[0.2em]">
                            Initialize Studio Mixer <Wand2 size={20} />
                        </a>
                        <a href="#consultation" className="px-12 py-6 bg-white/5 border border-white/10 rounded-3xl font-bold hover:bg-white/10 transition-all text-xs uppercase tracking-[0.2em] backdrop-blur-xl">
                            7-Day Strategy Portal
                        </a>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1.2, duration: 2 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-16 w-full max-w-4xl"
                    >
                        {[
                            { label: 'Uptime Integrity', val: '99.99%' },
                            { label: 'Neural Latency', val: '< 15ms' },
                            { label: 'Core Archetype', val: 'Gen-AI' },
                            { label: 'Protocol', val: 'SSL-Luxe' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group cursor-crosshair">
                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-3 group-hover:text-teal transition-colors">{stat.label}</div>
                                <div className="text-2xl font-serif font-bold text-white italic transition-all group-hover:scale-110">{stat.val}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scanning lines effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                <motion.div 
                    animate={{ y: ['-20%', '120%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1 bg-gradient-to-r from-transparent via-teal/10 to-transparent blur-sm"
                />
            </div>
            
            {/* Global HUD elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/4 w-[1200px] h-[1200px] border-[0.5px] border-white/10 rounded-full"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -right-1/4 w-[1500px] h-[1500px] border-[0.5px] border-white/10 rounded-full"
                />
            </div>
        </section>
    );
}
