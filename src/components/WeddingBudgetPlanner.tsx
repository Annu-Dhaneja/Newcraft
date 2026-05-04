import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MapPin, Star, Calculator, PieChart, Coins } from 'lucide-react';

const cities = [
    { name: 'Delhi', Multiplier: 1.2 },
    { name: 'Mumbai', Multiplier: 1.5 },
    { name: 'Chandigarh', Multiplier: 1.0 },
    { name: 'Jaipur', Multiplier: 1.1 },
    { name: 'Others', Multiplier: 0.8 }
];

const priorities = [
    { name: 'Catering', icon: '🍲', baseBase: 1200 },
    { name: 'Decor', icon: '🎨', baseBase: 150000 },
    { name: 'Photography', icon: '📸', baseBase: 80000 },
    { name: 'Invitations', icon: '✉️', baseBase: 25000 }
];

export default function WeddingBudgetPlanner() {
    const [guests, setGuests] = useState(200);
    const [city, setCity] = useState(cities[0]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['Catering', 'Decor']);

    const calculateBudget = () => {
        let total = 0;
        const multiplier = city.Multiplier;

        if (selectedPriorities.includes('Catering')) {
            total += guests * 1500 * multiplier;
        }
        if (selectedPriorities.includes('Decor')) {
            total += 200000 * multiplier;
        }
        if (selectedPriorities.includes('Photography')) {
            total += 100000 * multiplier;
        }
        if (selectedPriorities.includes('Invitations')) {
            total += 50000 * multiplier;
        }

        return Math.round(total);
    };

    const togglePriority = (name: string) => {
        if (selectedPriorities.includes(name)) {
            setSelectedPriorities(selectedPriorities.filter(p => p !== name));
        } else {
            setSelectedPriorities([...selectedPriorities, name]);
        }
    };

    return (
        <section id="budget-planner" className="py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <Calculator size={14} className="text-teal" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Smart Planner v2.0</span>
                        </motion.div>
                        <h2 className="text-5xl font-serif font-bold mb-8 italic">Wedding <span className="text-neon-purple">Budget</span> Intelligence</h2>
                        <p className="text-slate-400 mb-12 text-lg italic">Real-time calculations based on guest count, city tier, and your personal priorities. Plan with precision.</p>
                        
                        <div className="space-y-10">
                            {/* Guest Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Users size={16} />
                                        <span>Expected Guests</span>
                                    </div>
                                    <span className="text-teal">{guests}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="2000" 
                                    step="50"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-teal"
                                />
                            </div>

                            {/* City Grid */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                                    <MapPin size={16} />
                                    <span>Selected City</span>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {cities.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setCity(c)}
                                            className={`py-3 rounded-xl text-xs font-bold transition-all border ${city.name === c.name ? 'bg-teal/20 border-teal text-teal' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Priorities */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                                    <Star size={16} />
                                    <span>Main Priorities</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {priorities.map((p) => (
                                        <button
                                            key={p.name}
                                            onClick={() => togglePriority(p.name)}
                                            className={`p-4 rounded-2xl flex items-center gap-4 border transition-all ${selectedPriorities.includes(p.name) ? 'bg-neon-purple/20 border-neon-purple text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'}`}
                                        >
                                            <span className="text-2xl">{p.icon}</span>
                                            <span className="text-sm font-bold uppercase">{p.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none" />
                        
                        <motion.div 
                            layout
                            className="relative glass p-10 rounded-[3rem] border-neon-purple/30 shadow-2xl backdrop-blur-3xl"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold italic lowercase mb-2">estimated investment</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Base estimation for {city.name}</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-teal/20 flex items-center justify-center text-teal">
                                    <PieChart size={24} />
                                </div>
                            </div>

                            <div className="text-6xl sm:text-7xl font-serif font-bold text-white mb-12 tracking-tighter">
                                <span className="text-teal text-4xl mr-2">₹</span>
                                {calculateBudget().toLocaleString()}
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                    <span>Breakdown Intelligence</span>
                                    <span>Logic Alpha v1.2</span>
                                </div>
                                <div className="space-y-3">
                                    {selectedPriorities.map(p => (
                                        <div key={p} className="flex items-center gap-4">
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    className="h-full bg-gradient-to-r from-neon-purple to-teal"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-white whitespace-nowrap min-w-[80px]">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button className="w-full py-4 bg-neon-purple text-white rounded-2xl font-bold neon-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <Coins size={18} />
                                    Download Full Roadmap
                                </button>
                                <a 
                                    href={`https://wa.me/918527837527?text=Hi Gurucraftpro, I used your Budget Planner and my estimated budget for a wedding in ${city.name} with ${guests} guests is ₹${calculateBudget().toLocaleString()}. Can we discuss further?`}
                                    className="w-full py-4 border border-white/10 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-all text-center"
                                >
                                    Speak to Elite Planner
                                </a>
                            </div>
                        </motion.div>

                        <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-white" />
                                    <div className="w-20 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
