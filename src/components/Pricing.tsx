import React from 'react';
import { motion } from 'motion/react';
import { Tag } from 'lucide-react';

const priceList = [
    { item: '7 Day 7 Cloth Concept Consultation', price: '₹4,999' },
    { item: 'Sacred Guruji Art Portrait (High Res)', price: '₹1,500' },
    { item: 'Custom Satsang Invite Design', price: '₹750' },
    { item: 'Blessing & Quotes Daily Bundle', price: '₹2,500/mo' },
    { item: 'VantageEcom Store Management', price: '₹19,999' },
    { item: 'Jersey Task Editing (Per Image)', price: '₹150' },
    { item: 'Chola Design Custom Layout', price: '₹3,500' },
    { item: 'Wedding Digital Full Planning', price: '₹9,999' }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-darker">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold mb-4 italic">Clear <span className="text-teal">Pricing</span></h2>
                    <p className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">Transparent & Fair</p>
                </div>

                <div className="bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden">
                    {priceList.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className={`flex justify-between items-center p-6 sm:p-8 ${i !== priceList.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors group`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">
                                    <Tag size={14} />
                                </div>
                                <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{item.item}</span>
                            </div>
                            <span className="text-teal font-serif font-bold text-xl">{item.price}</span>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm mb-6">Need a custom quote for a large project?</p>
                    <a 
                        href="https://wa.me/918527837527?text=Hi Gurucraftpro, I need a custom quote for a project."
                        className="inline-flex items-center gap-2 px-8 py-4 bg-teal rounded-full font-bold text-white teal-glow hover:scale-105 active:scale-95 transition-all"
                    >
                        Request Custom Quote
                    </a>
                </div>
            </div>
        </section>
    );
}
