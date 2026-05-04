import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, ArrowUpRight, Palette, Heart, Sparkles, Image, Globe, ShoppingCart } from 'lucide-react';
import { allServices } from '../constants';
import { Service } from '../types';
import { CartContext } from '../App';

const categories = [
    { id: 'all', name: 'All', icon: Sparkles },
    { id: 'Graphics', name: 'Graphics', icon: Palette },
    { id: 'Wedding', name: 'Wedding', icon: Heart },
    { id: 'Devotion', name: 'Devotion', icon: Sparkles },
    { id: 'Photo', name: 'Photo', icon: Image },
    { id: 'Vantage', name: 'Vantage', icon: Globe },
];

export default function Services() {
    const [activeCategory, setActiveCategory] = useState('all');
    const { addToCart } = useContext(CartContext);

    const filteredServices = activeCategory === 'all' 
        ? allServices 
        : allServices.filter(s => s.category === activeCategory);

    return (
        <section id="services" className="py-24 bg-dark relative cyber-grid">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6"
                        >
                            <Sparkles size={14} className="text-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Elite Service Architecture</span>
                        </motion.div>
                        <h2 className="text-6xl font-serif font-bold mb-4 italic">The <span className="text-teal">Smart</span> Menu</h2>
                        <p className="text-slate-400 max-w-md italic">Categorized digital mastery for every merchant need. Explore our high-fidelity solutions.</p>
                    </div>

                    <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeCategory === cat.id ? 'bg-gold text-dark shadow-gold-glow' : 'hover:bg-white/5 text-slate-400'}`}
                            >
                                <cat.icon size={14} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 0 40px rgba(255, 215, 0, 0.05)",
                                    borderColor: "rgba(255, 215, 0, 0.3)"
                                }}
                                transition={{ 
                                    delay: idx * 0.05,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="group relative glass rounded-[2.5rem] overflow-hidden p-4 border-white/5 transition-all flex flex-col"
                            >
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-8">
                                    <img 
                                        src={service.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-widest text-gold">
                                        {service.category}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] text-teal font-bold uppercase tracking-[0.3em] mb-1">Standard Investment</div>
                                            <div className="text-3xl font-serif font-bold text-white">₹{service.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col p-2">
                                    <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold transition-colors italic">{service.name}</h3>
                                    <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed italic">
                                        {service.description}
                                    </p>
                                    
                                    <div className="mt-auto flex gap-3">
                                        <button 
                                            onClick={() => addToCart(service)}
                                            className="flex-1 flex items-center justify-center gap-3 py-4 bg-teal text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest teal-glow transition-all"
                                        >
                                            <ShoppingCart size={16} />
                                            Queue Asset
                                        </button>
                                        <a 
                                            href={`https://wa.me/918527837527?text=${encodeURIComponent(service.whatsappMessage)}`}
                                            className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-gold"
                                        >
                                            <MessageCircle size={18} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
