import React from 'react';
import { motion } from 'motion/react';

const stats = [
    { label: 'Merchant Solutions', value: '500+' },
    { label: 'Sacred Artworks', value: '1.2k' },
    { label: 'Happy Families', value: '3k+' },
    { label: 'Years of Trust', value: 'Established 2026' }
];

export default function TrustStrip() {
    return (
        <section className="py-20 bg-darker border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group overflow-hidden">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-teal mb-2 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                    {stat.label}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
