import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const images = [
    {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
        tag: "Portrait",
        id: "101"
    },
    {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
        tag: "Event",
        id: "102"
    },
    {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
        tag: "Digital",
        id: "103"
    },
    {
        url: "https://images.unsplash.com/photo-1454165833767-027eeea160d7?auto=format&fit=crop&q=80&w=600",
        tag: "Corporate",
        id: "104"
    },
    {
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
        tag: "Minimal",
        id: "105"
    },
    {
        url: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=600",
        tag: "Abstract",
        id: "106"
    },
    {
        url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600",
        tag: "Spiritual",
        id: "107"
    },
    {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
        tag: "Modern",
        id: "108"
    },
    {
        url: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=600",
        tag: "Tech",
        id: "109"
    }
];

export default function Gallery() {
    const [search, setSearch] = useState('');

    const filteredImages = useMemo(() => {
        return images.filter(img => 
            img.tag.toLowerCase().includes(search.toLowerCase()) ||
            img.url.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <section id="gallery" className="py-24 bg-darker overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-4 italic text-foreground">The <span className="text-teal">Masterpiece</span> Vault</h2>
                        <p className="text-muted">A showcase of our recent digital triumphs and spiritual artworks.</p>
                    </div>

                    <div className="relative group max-w-md w-full">
                        <div className="absolute inset-0 bg-teal/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative glass border-border rounded-2xl flex items-center px-6 py-4">
                            <Search className="text-slate-500 mr-4" size={20} />
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search visuals or tags..."
                                className="bg-transparent border-none outline-none text-foreground placeholder:text-slate-600 w-full font-serif italic"
                            />
                            <SlidersHorizontal className="text-slate-700 ml-4 cursor-pointer hover:text-teal transition-colors" size={18} />
                        </div>
                    </div>
                </div>
                
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((img, idx) => (
                            <motion.div
                                key={img.url}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ 
                                    duration: 0.4,
                                    delay: idx * 0.05
                                }}
                                className="relative rounded-3xl overflow-hidden group border border-border"
                            >
                                <img 
                                    src={img.url} 
                                    loading="lazy"
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                    alt={img.tag}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div className="w-full flex justify-between items-center">
                                        <span className="text-white font-bold text-xs uppercase tracking-widest">GCP Design #{img.id}</span>
                                        <div className="bg-teal/20 backdrop-blur-md px-3 py-1 rounded-lg border border-teal/30">
                                            <span className="text-teal text-[10px] font-bold uppercase tracking-wider">{img.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredImages.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 glass border-border border-dashed rounded-[4rem]"
                    >
                        <Sparkles className="mx-auto text-slate-800 mb-6" size={48} />
                        <h3 className="text-2xl font-serif italic text-muted mb-2">No visuals manifested for "{search}"</h3>
                        <p className="text-slate-600 text-sm">Attempt adjusting your search parameters.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
