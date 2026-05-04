import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, Wand2, ArrowRight, CheckCircle2, Download, Package, CreditCard, Calendar } from 'lucide-react';
import { allServices } from '../constants';
import { Service } from '../types';

export default function AIMixer() {
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quote, setQuote] = useState<{ total: number; date: string } | null>(null);
    const magicBoxRef = useRef<HTMLDivElement>(null);

    const totalInvestment = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

    const handleServiceSelect = (service: Service) => {
        if (selectedServices.find(s => s.id === service.id)) {
            setSelectedServices(selectedServices.filter(s => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleDragEnd = (event: any, info: any, service: Service) => {
        const box = magicBoxRef.current?.getBoundingClientRect();
        if (!box) return;

        const dropX = info.point.x;
        const dropY = info.point.y;

        if (
            dropX > box.left && 
            dropX < box.right && 
            dropY > box.top && 
            dropY < box.bottom
        ) {
            if (!selectedServices.find(s => s.id === service.id)) {
                setSelectedServices([...selectedServices, service]);
            }
        }
    };

    const generateQuote = () => {
        if (selectedServices.length === 0) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            const date = new Date();
            date.setDate(date.getDate() + 14); // Standard agency delivery
            setQuote({
                total: totalInvestment,
                date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
            });
        }, 4000);
    };

    return (
        <section id="ai-mixer" className="py-32 bg-darker relative cyber-grid">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-gold/30 mb-8"
                    >
                        <Sparkles size={16} className="text-gold animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold">Protocol: Studio Integrator</span>
                    </motion.div>
                    <h2 className="text-7xl font-serif font-bold mb-8 italic tracking-tight">The <span className="text-neon-purple">Strategic</span> Mixer</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto italic text-lg opacity-80 leading-relaxed">Drag digital commodities into the Neural Void. Our engine will synthesize a localized investment roadmap and delivery schedule in 8K resolution.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Service Selection Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {allServices.map((service) => {
                            const isSelected = selectedServices.find(s => s.id === service.id);
                            return (
                                <motion.div
                                    key={service.id}
                                    drag
                                    dragSnapToOrigin
                                    onDragEnd={(e, info) => handleDragEnd(e, info, service)}
                                    whileDrag={{ 
                                        scale: 1.1, 
                                        zIndex: 50,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                                    }}
                                    className={`relative p-6 rounded-[2rem] border transition-all cursor-grab active:cursor-grabbing group ${isSelected ? 'bg-neon-purple/20 border-neon-purple shadow-[0_0_40px_rgba(127,0,255,0.1)] opacity-40 grayscale pointer-events-none' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors">
                                        <Package size={24} />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 line-clamp-1 italic">{service.name}</h4>
                                    <p className="text-[10px] text-teal font-bold tracking-[0.3em]">₹{service.price.toLocaleString()}</p>
                                    
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 text-neon-purple">
                                            <CheckCircle2 size={18} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Magic Box & Output */}
                    <div className="space-y-12">
                        <motion.div 
                            ref={magicBoxRef}
                            animate={isProcessing ? { 
                                x: [0, -2, 2, -2, 2, 0],
                                transition: { repeat: Infinity, duration: 0.1 }
                            } : {}}
                            className="relative aspect-video rounded-[4rem] glass border-dashed border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden shadow-inner"
                        >
                            <AnimatePresence mode="wait">
                                {isProcessing ? (
                                    <motion.div 
                                        key="processing"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.2 }}
                                        className="text-center z-10"
                                    >
                                        <div className="relative mb-10 scale-125">
                                            <div className="w-32 h-32 rounded-full border-2 border-t-gold border-r-neon-purple border-b-teal border-l-transparent animate-spin mx-auto" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Wand2 className="text-gold animate-bounce" size={40} />
                                            </div>
                                            {/* Particle sprays during processing */}
                                            <motion.div 
                                                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                                className="absolute inset-0 bg-gold/20 rounded-full blur-2xl"
                                            />
                                        </div>
                                        <h3 className="text-3xl font-serif font-bold italic lowercase text-gold tracking-tight">synthesizing roadmap...</h3>
                                        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 mt-4">Vibrational Engine Engaged</p>
                                    </motion.div>
                                ) : quote ? (
                                    <motion.div 
                                        key="quote"
                                        initial={{ opacity: 0, y: 100, rotateX: 20 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        className="w-full max-w-md glass bg-dark/40 rounded-[3rem] border-gold/40 p-10 shadow-2xl backdrop-blur-3xl overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-neon-purple/10 pointer-events-none" />
                                        
                                        <div className="relative z-10 text-center">
                                            <div className="flex justify-between items-start mb-10 text-left">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Alpha Transmission 01-X</p>
                                                    <h3 className="text-3xl font-serif font-bold italic lowercase tracking-tighter">Investment Report</h3>
                                                </div>
                                                <div className="p-4 bg-gold/10 rounded-2xl text-gold shadow-lg shadow-gold/10">
                                                    <Wand2 size={24} />
                                                </div>
                                            </div>

                                            <div className="space-y-5 mb-10 text-left max-h-[120px] overflow-y-auto scrollbar-hide">
                                                {selectedServices.map(s => (
                                                    <div key={s.id} className="flex justify-between text-xs tracking-tight">
                                                        <span className="text-slate-400 italic">× {s.name}</span>
                                                        <span className="text-white font-mono font-bold tracking-widest">₹{s.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                                <div className="h-px bg-white/5 my-6" />
                                            </div>

                                            <div className="mb-10 p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-gold/20 transition-all">
                                                <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-3">Net Asset Investment</div>
                                                <div className="text-5xl font-serif font-bold text-gold italic gold-glow group-hover:scale-105 transition-transform tracking-tighter">
                                                    ₹{quote.total.toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-5 bg-black/40 rounded-[2rem] border border-white/5 mb-10 group cursor-help">
                                                <Calendar size={20} className="text-teal animate-pulse" />
                                                <div className="text-left">
                                                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-[0.3em]">Engineered Delivery</p>
                                                    <p className="text-sm font-bold text-white italic">{quote.date}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={() => { setQuote(null); setSelectedServices([]); }}
                                                    className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase hover:bg-white/10 transition-colors"
                                                >
                                                    Reset
                                                </button>
                                                <a 
                                                    href={`https://wa.me/918527837527?text=MISSION INITIATED: I want to execute the following digital roadmap: ${selectedServices.map(s => s.name).join(', ')}. Calculated Total: ₹${quote.total}`}
                                                    className="flex-1 py-5 bg-gold text-dark rounded-2xl font-bold text-xs uppercase gold-glow hover:scale-[1.02] active:scale-95 transition-all text-center tracking-[0.2em]"
                                                >
                                                    Finalize Acquisition
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center group">
                                        <div className="relative mb-10">
                                            <div className="w-40 h-40 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mx-auto group-hover:border-teal/50 transition-all duration-700">
                                                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                                                    <Package className="text-white/20 group-hover:text-teal transition-colors duration-500" size={56} />
                                                </div>
                                            </div>
                                            {/* Suction animation element - visible when dragging or having items */}
                                            {selectedServices.length > 0 && (
                                                <motion.div 
                                                    animate={{ 
                                                        scale: [1, 1.3, 1], 
                                                        opacity: [0.1, 0.4, 0.1],
                                                        rotate: 360
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                                    className="absolute inset-x-0 -inset-y-4 bg-teal/10 rounded-full blur-3xl -z-10"
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-3xl font-serif font-bold mb-5 italic lowercase text-white tracking-tight">The Neural Void</h3>
                                        <p className="text-sm text-slate-500 max-w-[280px] mx-auto mb-10 italic leading-relaxed">
                                            {selectedServices.length > 0 
                                                ? `Synchronizing ${selectedServices.length} digital commodities...` 
                                                : "Drag commodities here to initiate neural synthesis."}
                                        </p>
                                        
                                        {selectedServices.length > 0 && (
                                            <motion.button 
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                onClick={generateQuote}
                                                className="px-14 py-6 bg-gradient-to-r from-neon-purple via-teal to-neon-purple bg-[length:200%_auto] rounded-[2rem] font-bold text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4 mx-auto uppercase tracking-[0.3em] text-[10px] animate-gradient-flow"
                                            >
                                                <Sparkles size={20} />
                                                Generate Smart Roadmap
                                            </motion.button>
                                        )}
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Order Summary Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: 'Commodities', val: selectedServices.length, color: 'text-white' },
                                { label: 'Optimization', val: 'Active', color: 'text-teal' },
                                { label: 'Net Total', val: `₹${totalInvestment.toLocaleString()}`, color: 'text-neon-purple' }
                            ].map((stat, i) => (
                                <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 text-center group hover:bg-white/5 transition-all">
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-3">{stat.label}</div>
                                    <div className={`text-xl font-serif font-bold italic leading-none ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
