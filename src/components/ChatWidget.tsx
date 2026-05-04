import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Command, Cpu } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <div className="fixed bottom-10 right-10 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-24 right-0 w-[400px] h-[550px] bg-[#050505] rounded-[3rem] border border-teal/30 shadow-[0_0_50px_rgba(45,212,191,0.1)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 bg-dark relative overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/30 flex items-center justify-center">
                                        <Cpu size={24} className="text-teal" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-serif font-bold italic text-white tracking-tight">Matrix Liaison</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-teal/60">Node Active</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {/* Futuristic accent lines */}
                            <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-teal/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-neon-purple/50 to-transparent" />
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-8 space-y-6 overflow-y-auto cyber-grid bg-[#050505]">
                            <div className="flex flex-col gap-2">
                                <div className="max-w-[80%] p-5 rounded-3xl rounded-tl-none bg-white/5 border border-white/10 text-sm text-slate-300 italic leading-relaxed">
                                    Welcome to the Gurucraftpro Neural Laboratory. How can I assist with your asset synthesis today?
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 ml-2">System • 16:42</span>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-dark border-t border-white/5">
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter Protocol..."
                                    className="w-full h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 pr-16 text-sm text-white placeholder:text-slate-600 focus:border-teal/50 focus:outline-none transition-colors italic"
                                />
                                <button className="absolute right-3 top-3 w-10 h-10 bg-teal text-dark rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 px-2">
                                <Command size={10} />
                                <span>Shift + Enter for multi-line telemetry</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-20 h-20 bg-[#050505] rounded-full border-[3px] border-teal flex items-center justify-center text-teal shadow-[0_0_30px_rgba(45,212,191,0.2)] hover:shadow-[0_0_50px_rgba(45,212,191,0.4)] transition-all relative group"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute inset-[-8px] rounded-full border border-teal/10 animate-spin-slow pointer-events-none" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-purple rounded-full blur-[4px] animate-pulse" />
            </motion.button>
        </div>
    );
}
