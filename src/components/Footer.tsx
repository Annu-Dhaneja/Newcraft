import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle, Shield } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="pt-32 pb-12 bg-darker border-t border-white/5 cyber-grid relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-neon-purple/5 blur-[120px] rounded-[50%] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-teal rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-xl">
                                G
                            </div>
                            <span className="font-serif font-bold text-3xl tracking-tight text-white italic">Gurucraft<span className="text-teal">pro</span></span>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-10 italic text-sm">
                            Architecting "Cyber-Luxe" digital identities at the intersection of spiritual legacy and commercial supremacy. Based in the Rohini-Technology Sector.
                        </p>
                        <div className="flex gap-5">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-neon-purple transition-all border border-white/10 group shadow-lg">
                                    <Icon size={20} className="text-slate-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-gold mb-10">System Map</h3>
                        <ul className="space-y-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <li><a href="#services" className="hover:text-teal transition-colors flex items-center gap-2 italic">× Services</a></li>
                            <li><a href="#product-grid" className="hover:text-teal transition-colors flex items-center gap-2 italic">× Curated Boutique</a></li>
                            <li><a href="#ai-mixer" className="hover:text-teal transition-colors flex items-center gap-2 italic">× Neural Mixer</a></li>
                            <li><a href="#consultation" className="hover:text-teal transition-colors flex items-center gap-2 italic">× Strategy Portal</a></li>
                            <li><a href="#about" className="hover:text-teal transition-colors flex items-center gap-2 italic">× Agency Mandate</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-gold mb-10">Channel Logic</h3>
                        <div className="space-y-6 text-slate-500">
                            <a href="tel:+918527837527" className="flex items-center gap-4 hover:text-gold transition-colors group">
                                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gold/50">
                                    <Phone size={16} className="text-gold" />
                                </div>
                                <span className="text-xs font-bold font-mono tracking-widest">+91 8527 837 527</span>
                            </a>
                            <a href="mailto:annudhaneja@gmail.com" className="flex items-center gap-4 hover:text-teal transition-colors group">
                                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 group-hover:border-teal/50">
                                    <Mail size={16} className="text-teal" />
                                </div>
                                <span className="text-xs font-bold italic tracking-tight">annudhaneja@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                                    <MapPin size={16} className="text-slate-400" />
                                </div>
                                <span className="text-xs italic leading-relaxed">Rohini Ops Center,<br />Delhi - 110085, India</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-gold mb-10">Operational Protocol</h3>
                        <div className="p-6 glass rounded-3xl border-gold/20 shadow-2xl relative overflow-hidden group">
                            <Shield className="absolute -right-6 -bottom-6 text-gold/5 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                            <p className="text-[10px] text-slate-400 italic mb-4 leading-relaxed relative z-10">
                                "All digital assets under Gurucraftpro management are encrypted using Alpha-Luxe standards. Sovereign integrity protocols enforced."
                            </p>
                            <div className="flex items-center gap-2 text-gold relative z-10">
                                <div className="w-1 h-1 rounded-full bg-gold animate-ping" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Active Protection</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 italic">
                    <p>© 2026 GURUCRAFTPRO ARCHITECTS. COAUTHORED BY ANNU DHANEJA.</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Protocol</a>
                        <a href="#" className="hover:text-gold transition-colors">Integrity Terms</a>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Hub */}
            <a 
                href="https://wa.me/918527837527"
                className="fixed bottom-12 right-12 w-20 h-20 bg-dark border border-gold/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.2)] z-50 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-16 right-0 bg-gold text-dark px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pointer-events-none shadow-2xl italic">
                    INITIATE DIRECT LINE
                </div>
                <MessageCircle size={36} className="text-gold group-hover:scale-110 transition-transform" />
            </a>
        </footer>
    );
}
