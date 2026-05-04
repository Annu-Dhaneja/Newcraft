import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-darker cyber-grid">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8"
                        >
                            <Shield size={14} className="text-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold text-white/60">Sovereign Encryption Active</span>
                        </motion.div>
                        
                        <h2 className="text-6xl font-serif font-bold mb-10 italic">Direct Line to <br /> <span className="text-neon-purple">Gurucraftpro</span></h2>
                        <p className="text-slate-400 text-lg mb-16 max-w-md italic leading-relaxed">Initiate a secure channel with our lead architects. Whether for sacred art or global e-commerce scaling, our response is immediate.</p>
                        
                        <div className="space-y-10">
                            <div className="flex items-start gap-8 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal shrink-0 group-hover:border-teal/50 transition-all shadow-xl">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1 italic tracking-tight">Geographic Operations</h4>
                                    <p className="text-slate-500 text-sm italic">Rohini Sector-Tech, Delhi - 110085, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-8 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-purple shrink-0 group-hover:border-neon-purple/50 transition-all shadow-xl">
                                    <Clock size={24} />
                                </div>
                                <div className="grid grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-white font-bold mb-1 italic tracking-tight">Alpha Cycle</h4>
                                        <p className="text-slate-500 text-sm italic">Monday — Saturday</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1 italic tracking-tight">Active Hours</h4>
                                        <p className="text-slate-500 text-sm italic">08:00 — 20:00 IST</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-8 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 group-hover:border-gold/50 transition-all shadow-xl">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1 italic tracking-tight">Vocal Link</h4>
                                    <a href="tel:+918527837527" className="text-slate-500 hover:text-gold transition-colors italic text-sm">+91 8527 837 527</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 flex flex-wrap gap-4">
                            <a 
                                href="https://wa.me/918527837527?text=PROTOCOL INITIATED: I require specialized digital services from Gurucraftpro."
                                className="flex-1 min-w-[200px] py-5 bg-gold text-dark rounded-2xl font-bold text-center gold-glow flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
                            >
                                <MessageCircle size={20} />
                                Secure WhatsApp Link
                            </a>
                            <a 
                                href="mailto:annudhaneja@gmail.com"
                                className="flex-1 min-w-[200px] py-5 border border-white/10 rounded-2xl font-bold text-center hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] italic"
                            >
                                <Mail size={20} />
                                Encrypted Mail
                            </a>
                        </div>
                    </div>

                    <div className="glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 blur-[100px] rounded-full" />
                        
                        <div className="relative z-10 mb-12">
                            <h3 className="text-4xl font-serif font-bold italic mb-4">Smart <span className="text-teal">Form</span> Protocol</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Neural Routing Enabled • Zero-Data-Leak</p>
                        </div>

                        <form className="space-y-6 relative z-10" onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const payload = {
                                name: formData.get('name'),
                                email: formData.get('email'),
                                subject: formData.get('subject'),
                                message: formData.get('message'),
                            };
                            
                            try {
                                const res = await fetch('/api/contact', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(payload)
                                });
                                const data = await res.json();
                                if (data.success) {
                                    toast.success(`Encrypted transmission routed to ${data.routedTo === 'OWNER_SUPER' ? 'Owner Alpha' : 'Owner Beta'}`);
                                    (e.target as HTMLFormElement).reset();
                                }
                            } catch (err) {
                                toast.error('Signal transmission failure');
                            }
                        }}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Full Identity</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="John Doe"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Email Node</label>
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="john@neural.network"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Transmission Layer (Subject)</label>
                                <select 
                                    name="subject"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none appearance-none"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Business Partnership">Strategic Partnership (Owner 1)</option>
                                    <option value="Technical Help">Technical Infrastructure (Owner 2)</option>
                                    <option value="Custom Project">Custom Neural Synthesis</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Encrypted Payload (Message)</label>
                                <textarea 
                                    required
                                    rows={4}
                                    placeholder="Initiate communication payload..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:border-teal/50 transition-all outline-none resize-none"
                                />
                            </div>

                            <button className="w-full py-6 bg-teal text-white rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl teal-glow hover:scale-[1.02] active:scale-95 transition-all">
                                Send Encrypted Signal
                            </button>
                        </form>

                        <div className="mt-12 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-slate-500 text-[10px] relative z-10">
                            <Shield size={16} className="text-teal/40" />
                            <p>Every submission creates a record in the sovereign database, triggering an instant notification to the designated owner.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
