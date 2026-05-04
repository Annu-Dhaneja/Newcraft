import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Sharma",
        location: "Rohini Sector 7",
        text: "The Guruji Art Work I got for my home is just amazing. The neon purple vibe matches my prayer room perfectly. Best in the area!",
        stars: 5
    },
    {
        name: "Priya Gupta",
        location: "Pitampura",
        text: "Used their 7 Day consultation for my boutique. Annu has a great eye for detail. My sales have improved since we implemented the changes.",
        stars: 5
    },
    {
        name: "Amit Varma",
        location: "Paschim Vihar",
        text: "Fastest delivery for sacred chants and quotes. I use them daily for my WhatsApp status. Highly recommend Gurucraftpro.",
        stars: 5
    }
];

export default function Testimonials() {
    return (
        <section id="reviews" className="py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-serif font-bold mb-16 italic text-center">Voices from the <span className="text-neon-purple">Community</span></h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col h-full hover:border-teal/30 transition-all"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.stars)].map((_, j) => (
                                    <Star key={j} className="text-teal fill-teal" size={14} />
                                ))}
                            </div>
                            <p className="text-slate-400 mb-8 flex-1 italic">"{review.text}"</p>
                            <div>
                                <h4 className="text-white font-bold">{review.name}</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-widest">{review.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
