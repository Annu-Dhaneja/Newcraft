import React from 'react';
import { motion } from 'motion/react';
import { Heart, Camera, MapPin, Calculator, Send, Users, Sparkles, Globe, Shield } from 'lucide-react';
import WeddingBudgetPlanner from './WeddingBudgetPlanner';

const weddingServices = [
    {
        title: "Pre-Wedding Cinematic",
        desc: "Specialized photo/video acquisition at high-fidelity locations in Delhi/NCR.",
        icon: Camera,
        color: "text-rose-500",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "3D Digital Venue Design",
        desc: "Virtual hall decoration blueprints and thematic atmosphere synthesis.",
        icon: MapPin,
        color: "text-teal",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Digital Invitation Suite",
        desc: "Cyber-luxe 3D animated invitations with real-time RSVP protocol.",
        icon: Send,
        color: "text-neon-purple",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
    }
];

export default function WeddingPlanner() {
    return (
        <div className="space-y-32 pb-32">
            {/* Hero */}
            <section className="pt-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] opacity-10 pointer-events-none">
                    <img 
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
                        className="w-full h-full object-cover grayscale"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darker" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-rose-500/30 mb-8"
                        >
                            <Heart size={16} className="text-rose-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">Matrimonial Logistics v4.0</span>
                        </motion.div>
                        <h2 className="text-8xl font-serif font-bold mb-8 italic tracking-tighter">Unified <span className="text-rose-500">Union</span> Planning</h2>
                        <p className="text-slate-400 max-w-3xl mx-auto italic text-xl opacity-80 leading-relaxed">Systematically architecting your sacred celebration. From neural budget projections to 3D architectural invitations, we manage the entire digital legacy of your union.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 mb-32">
                        {weddingServices.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 0 50px rgba(255, 215, 0, 0.1)",
                                    borderColor: "rgba(255, 215, 0, 0.2)"
                                }}
                                transition={{ 
                                    delay: i * 0.1,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="glass rounded-[4rem] border-white/5 transition-all group overflow-hidden"
                            >
                                <div className="h-48 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                                </div>
                                <div className="p-12 text-center relative -mt-8 bg-dark/40 backdrop-blur-xl rounded-t-[3rem]">
                                    <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${service.color} border border-white/10 shadow-2xl`}>
                                        <service.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold italic mb-4 tracking-tight text-white">{service.title}</h3>
                                    <p className="text-sm text-slate-500 italic leading-relaxed">{service.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <WeddingBudgetPlanner />
                </div>
            </section>

            {/* Invitation Packages */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-20 px-12">
                        <Globe size={24} className="text-teal" />
                        <h3 className="text-4xl font-serif font-bold italic">Invitation <span className="text-teal">Infrastructure</span></h3>
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { name: 'Starter Blueprint', price: '₹999', items: ['Budget Breakdown', '50 Vendor Contacts', 'Checklist'] },
                            { name: 'Concept Portfolio', price: '₹2,499', items: ['Starter + Moodboards', 'Digital Invites', 'Theme Suggestion'] },
                            { name: 'Elite Digital Guide', price: 'Custom', items: ['Full Planning', 'Virtual Consultation', 'Vendor Negotiation'] }
                        ].map((pkg, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className={`p-10 rounded-[3.5rem] border flex flex-col h-full ${i === 1 ? 'glass border-teal/40 shadow-[0_0_50px_rgba(45,212,191,0.1)]' : 'bg-white/5 border-white/10'}`}
                            >
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 italic">Tier 0{i+1}</h4>
                                <h3 className="text-3xl font-serif font-bold italic mb-2 tracking-tight">{pkg.name}</h3>
                                <div className="text-4xl font-serif font-bold text-white mb-10">{pkg.price}</div>
                                
                                <ul className="flex-1 space-y-5 mb-12">
                                    {pkg.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-slate-400 italic">
                                            <Sparkles size={14} className="text-teal/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${i === 1 ? 'bg-teal text-white teal-glow shadow-2xl' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                                    Inquire Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Elite Venue Visualization */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-5xl font-serif font-bold italic text-white mb-6">Elite <span className="text-rose-500">Venue</span> Curation</h3>
                        <p className="text-slate-500 italic max-w-2xl mx-auto">Access the most exclusive matrimonial landscapes in the region, architected for multi-sensory experiences.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: 'The Imperial Pavilion', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200', tag: 'Architectural Excellence' },
                            { title: 'Crystal Mirror Palace', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200', tag: 'Sovereign Decor' }
                        ].map((venue, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="group relative h-[500px] rounded-[4rem] overflow-hidden border border-white/5"
                            >
                                <img src={venue.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt={venue.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/20 to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.4em] mb-3">{venue.tag}</div>
                                    <h4 className="text-4xl font-serif font-bold italic text-white mb-4">{venue.title}</h4>
                                    <button className="px-10 py-4 glass border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white">
                                        View Digital Blueprint
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Trust */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto glass p-20 rounded-[5rem] border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
                    <div className="relative z-10 w-32 h-32 bg-dark rounded-[2.5rem] border border-white/5 flex items-center justify-center shadow-2xl shrink-0">
                        <Shield size={64} className="text-teal/20" />
                        <Heart className="absolute text-rose-500" size={32} />
                    </div>
                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <h3 className="text-4xl font-serif font-bold italic mb-6">Confidential Union Mandate</h3>
                        <p className="text-slate-400 italic text-lg leading-relaxed">Every detail of your union is protected under our sovereign integrity protocol. We manage the logistics, so you can inhabit the moment.</p>
                    </div>
                    <div className="relative z-10">
                        <button className="px-16 py-6 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all flex items-center gap-4">
                            Contact Registrar <Users size={18} />
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full" />
                </div>
            </section>
        </div>
    );
}
