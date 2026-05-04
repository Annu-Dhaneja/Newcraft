import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';

const portfolioItems = [
    {
        title: "Neon Logo Concept",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
        tag: "Vector Alpha"
    },
    {
        title: "Streetwear T-Shirt Blueprint",
        category: "Merchandise",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
        tag: "3D Mockup"
    },
    {
        title: "Chatarpur Divine Art",
        category: "Sacred Design",
        image: "https://www.gurujimaharaj.com/img/guruji-maharaj-photo-1.jpg",
        tag: "Neural Render"
    },
    {
        title: "Strategic Web Banner",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
        tag: "CTR Optimized"
    },
    {
        title: "Premium Mug Concept",
        category: "Merchandise",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=800",
        tag: "Ceramic Design"
    },
    {
        title: "Tech Conference Slide Deck",
        category: "Presentation",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
        tag: "Investor Pitch"
    }
];

export default function DesignPortfolio() {
    return (
        <section className="py-32 bg-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-teal/30 mb-8"
                        >
                            <Sparkles size={16} className="text-teal" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal">Neural Design Portfolio</span>
                        </motion.div>
                        <h2 className="text-7xl font-serif font-bold mb-8 italic tracking-tight">Recent <span className="text-gold">Synthesizations</span></h2>
                        <p className="text-slate-400 italic text-xl opacity-80">Explore our high-fidelity designs across logo, apparel, and spiritual dimensions.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {portfolioItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative glass rounded-[4rem] overflow-hidden border-white/5 cursor-pointer"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            </div>

                            <div className="absolute top-8 left-8 right-8 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="px-4 py-2 bg-dark/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-teal">
                                    {item.tag}
                                </span>
                                <div className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-12 right-12 translate-y-12 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-3">{item.category}</p>
                                <h3 className="text-3xl font-serif font-bold italic text-white tracking-tight">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="px-16 py-6 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                        Access Full Matrix Gallery
                    </button>
                </div>
            </div>
        </section>
    );
}
