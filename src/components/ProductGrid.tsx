import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Filter, ArrowRight } from 'lucide-react';
import { Product } from '../types';

const mockProducts: Product[] = [
    {
        id: 'p1',
        name: 'Sacred Guruji Frame',
        price: 1499,
        description: 'Handcrafted acrylic frame with high-def spiritual artwork.',
        category: 'Spiritual',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500'
    },
    {
        id: 'p2',
        name: 'GCP Design Prompts',
        price: 299,
        description: 'Elite prompt collection for graphic designers.',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=500'
    },
    {
        id: 'p3',
        name: 'Premium Canvas Print',
        price: 2499,
        description: 'Large scale museum quality canvas for office/home.',
        category: 'Art',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=500'
    }
];

export default function ProductGrid() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = mockProducts.filter(p => 
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section id="shop" className="py-24 px-4 bg-dark">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4"
                        >
                            <ShoppingCart size={14} className="text-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Elite Merchandise</span>
                        </motion.div>
                        <h2 className="text-5xl font-serif font-bold italic">Curated <span className="text-neon-purple">Boutique</span></h2>
                    </div>
                    
                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search inventory..."
                                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-3xl focus:outline-none focus:border-gold transition-all text-sm italic"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                    {['All', 'Spiritual', 'Design', 'Art'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-8 py-3 rounded-2xl border transition-all whitespace-nowrap text-[10px] font-bold uppercase tracking-widest ${category === cat ? 'bg-gold text-dark border-gold shadow-gold-glow' : 'border-white/10 hover:bg-white/5 text-slate-500'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass p-5 rounded-[3rem] border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden"
                            >
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8">
                                    <img 
                                        src={product.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-6 right-6 bg-gold text-dark px-4 py-2 rounded-full text-xs font-bold shadow-gold-glow uppercase tracking-widest">
                                        ₹{product.price}
                                    </div>
                                </div>
                                
                                <div className="px-2">
                                    <p className="text-[10px] text-teal font-bold uppercase tracking-[0.3em] mb-2">{product.category}</p>
                                    <h3 className="text-2xl font-serif font-bold mb-3 italic transition-colors group-hover:text-gold">{product.name}</h3>
                                    <p className="text-xs text-slate-500 mb-8 line-clamp-2 leading-relaxed italic">{product.description}</p>
                                    
                                    <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-gold hover:text-dark transition-all">
                                        <ShoppingCart size={16} />
                                        Initialize Acquisition
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
