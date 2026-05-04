import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Maximize, FileType, CheckCircle2, Wand2, ArrowRightLeft, FileDown, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PhotoEditor() {
    const [image, setImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const runProcess = (type: string) => {
        if (!image) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setResult(image); // In a real app, this would be the processed image
            toast.success(`${type} completed!`);
        }, 3000);
    };

    return (
        <section className="py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-teal/30 mb-8"
                    >
                        <Wand2 size={16} className="text-teal" />
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-teal">Neural Processing Unit</span>
                    </motion.div>
                    <h2 className="text-6xl font-serif font-bold mb-8 italic">The <span className="text-neon-purple">Smart</span> Editor</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto italic text-lg opacity-80">High-fidelity post-production for Amazon/Flipkart/Etsy and beyond. Real-time background removal, color correction, and format synthesis.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Input */}
                    <div className="space-y-8">
                        <div className="aspect-square glass rounded-[3rem] border-dashed border-white/20 flex flex-col items-center justify-center p-12 relative overflow-hidden group">
                            {image ? (
                                <img src={image} className="w-full h-full object-contain rounded-2xl" alt="Preview" />
                            ) : (
                                <>
                                    <Upload size={64} className="text-slate-700 mb-8 group-hover:text-teal transition-colors" />
                                    <h3 className="text-2xl font-serif font-bold italic mb-4">Input Neural Asset</h3>
                                    <p className="text-sm text-slate-500 mb-8">Drop your raw image here for synthesis</p>
                                    <label className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase cursor-pointer hover:bg-white/10 transition-all">
                                        Select File
                                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                    </label>
                                </>
                            )}
                            {image && (
                                <button 
                                    onClick={() => { setImage(null); setResult(null); }}
                                    className="absolute top-6 right-6 p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl backdrop-blur-xl"
                                >
                                    <CheckCircle2 className="rotate-45" size={20} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Resize Protocol', icon: Maximize, action: 'Resize' },
                                { name: 'PDF Synthesis', icon: FileType, action: 'Format Conversion' },
                                { name: 'Mask & Remove', icon: Layers, action: 'Background Removal' },
                                { name: 'Bulk Optimize', icon: ArrowRightLeft, action: 'Optimization' }
                            ].map((tool, i) => (
                                <button 
                                    key={i}
                                    disabled={!image || isProcessing}
                                    onClick={() => runProcess(tool.action)}
                                    className="flex items-center gap-4 p-6 glass rounded-3xl border-white/5 hover:border-teal/30 transition-all disabled:opacity-20 group"
                                >
                                    <tool.icon className="text-teal group-hover:scale-110 transition-transform" size={24} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-left">{tool.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="aspect-square glass rounded-[3rem] border-white/5 bg-dark/40 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {isProcessing ? (
                                <motion.div 
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center"
                                >
                                    <div className="w-24 h-24 rounded-full border-4 border-t-teal border-r-neon-purple border-b-gold border-l-transparent animate-spin mx-auto mb-8 shadow-[0_0_50px_rgba(45,212,191,0.2)]" />
                                    <h3 className="text-3xl font-serif font-bold italic text-teal animate-pulse">Processing...</h3>
                                    <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 mt-4">Vibrational Engine Engaged</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-full flex flex-col"
                                >
                                    <div className="flex-1 relative mb-8">
                                        <img src={result} className="w-full h-full object-contain rounded-2xl" alt="Result" />
                                        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full border-teal/50">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-teal">Neural Extract Ready</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-6 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl teal-glow hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px]">
                                        <FileDown size={20} />
                                        Download Standard Package
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="text-center opacity-20">
                                    <FileType size={80} className="mx-auto mb-8" />
                                    <h3 className="text-2xl font-serif font-bold italic">Awaiting Asset</h3>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
