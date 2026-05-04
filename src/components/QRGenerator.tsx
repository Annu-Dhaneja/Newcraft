import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Download, RefreshCcw, Layout, ShieldCheck } from 'lucide-react';

export default function QRGenerator() {
    const [text, setText] = useState('https://gurucraftpro.com');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 800);
    };

    return (
        <section className="py-24 bg-dark">
            <div className="max-w-4xl mx-auto px-4">
                <div className="glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 blur-[100px] rounded-full" />
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                                <QrCode size={14} className="text-teal" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-teal">Static QR Protocol</span>
                            </div>
                            <h2 className="text-5xl font-serif font-bold mb-8 italic tracking-tight">Sovereign <br /> <span className="text-teal">QR Synthesis</span></h2>
                            
                            <div className="space-y-6 mb-10">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Neural Encoding Target</label>
                                    <input 
                                        type="text" 
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Enter URL or Encrypted Protocol..."
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                    />
                                </div>
                                <button 
                                    onClick={handleGenerate}
                                    className="w-full py-5 bg-teal text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl teal-glow flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    <RefreshCcw size={18} className={isGenerating ? 'animate-spin' : ''} />
                                    Generate Matrix
                                </button>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-slate-500 text-xs">
                                <ShieldCheck size={16} className="text-teal/40" />
                                <p>All generated matrices are stored in local buffers. No server-side logging enabled.</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <motion.div 
                                animate={isGenerating ? { scale: [1, 0.9, 1.1, 1], opacity: [1, 0.2, 1] } : {}}
                                className="aspect-square w-full max-w-[280px] bg-white p-6 rounded-[2.5rem] shadow-2xl relative group"
                            >
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`}
                                    className="w-full h-full grayscale transition-all group-hover:grayscale-0"
                                    alt="QR Code"
                                />
                                <div className="absolute inset-0 border-[1.5rem] border-white rounded-[2.5rem] pointer-events-none" />
                            </motion.div>
                            
                            <button className="mt-8 flex items-center gap-3 px-10 py-4 glass border-white/10 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:border-teal/30 transition-all">
                                <Download size={18} className="text-teal" />
                                Download SVG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
