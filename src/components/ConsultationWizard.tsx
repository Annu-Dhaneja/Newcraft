import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Wand2, Info, ShoppingBag } from 'lucide-react';

const steps = [
    {
        title: "The Identity",
        desc: "Reveal your digital fashion persona.",
        fields: ["Modern Merchant", "Digital Nomad", "Trendsetter", "Traditionalist"]
    },
    {
        title: "Physiology",
        desc: "Precision matching for your unique form.",
        fields: ["Slim Athletic", "Regular Fit", "Solid / Broad", "Tailored Custom"]
    },
    {
        title: "Chromatic Spectrum",
        desc: "Select your power colors.",
        fields: ["Cyber Black & Neon", "Earth Tones", "Monochromatic Gray", "Vibrant Ethnic"]
    },
    {
        title: "The Scenario",
        desc: "Where will you manifest?",
        fields: ["Strategic Meeting", "Wedding Gala", "Casual Digital", "Spiritual Gathering"]
    },
    {
        title: "Fiscal Alignment",
        desc: "Calibrate your investment range.",
        fields: ["Essential (₹1k-5k)", "Professional (₹5k-15k)", "Elite (₹15k-50k)", "Luxe (₹50k+)"]
    },
    {
        title: "Style Archetype",
        desc: "Define your aesthetic frequency.",
        fields: ["Cyber-Luxe", "Minimalist Tech", "Royal Heritage", "Street Visionary"]
    },
    {
        title: "Synthesis",
        desc: "Ready to generate your 7-Day Cloth Strategy?",
        isFinal: true
    }
];

export default function ConsultationWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [report, setReport] = useState<any>(null);

    const handleSelect = (val: string) => {
        const newSelections = [...selections];
        newSelections[currentStep] = val;
        setSelections(newSelections);
        if (currentStep < steps.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300);
        }
    };

    const generateReport = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setReport({
                heroCloth: selections[0] === "Traditionalist" ? "Royal Sherwani with Neon Accents" : "Cyber-Tech Blazer with Smart Fibers",
                strategy: "Your profile suggests a focus on high-impact silhouette balancing comfort with digital prestige.",
                recommendation: selections[4] === "Luxe (50k+)" ? "Bespoke 7-Day Masterpiece Collection" : "7-Day Strategic Rotation Set"
            });
        }, 3000);
    };

    return (
        <section id="consultation" className="py-24 bg-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-teal to-gold opacity-50" />
            
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
                    >
                        <Sparkles size={14} className="text-teal" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal">7-Day Intelligent Styling</span>
                    </motion.div>
                    <h2 className="text-5xl font-serif font-bold italic mb-4">Digital <span className="text-neon-purple">Cloth</span> Consultation</h2>
                    <p className="text-slate-400 italic">"7 Day 7 Cloth Concept" — An AI-driven personalized fashion blueprint.</p>
                </div>

                <div className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden border-white/5 shadow-2xl">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                        <motion.div 
                            className="h-full bg-neon-purple"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    {!report ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="min-h-[400px] flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <div className="text-[10px] font-bold text-teal uppercase tracking-widest mb-2">Step 0{currentStep + 1} / 07</div>
                                        <h3 className="text-3xl font-serif font-bold italic">{steps[currentStep].title}</h3>
                                        <p className="text-slate-400 mt-2 italic">{steps[currentStep].desc}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                         <Info size={20} className="text-slate-500" />
                                    </div>
                                </div>

                                {steps[currentStep].isFinal ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
                                        <div className="w-24 h-24 rounded-full bg-neon-purple/20 flex items-center justify-center neon-glow">
                                            <Wand2 size={40} className="text-neon-purple" />
                                        </div>
                                        <button 
                                            onClick={generateReport}
                                            disabled={isGenerating}
                                            className="px-12 py-5 bg-neon-purple text-white rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-all gold-glow disabled:opacity-50"
                                        >
                                            {isGenerating ? "Synthesizing Strategy..." : "Finalize Blueprint"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {steps[currentStep].fields?.map((field) => (
                                            <button
                                                key={field}
                                                onClick={() => handleSelect(field)}
                                                className={`group p-6 rounded-3xl border text-left transition-all relative overflow-hidden ${selections[currentStep] === field ? 'bg-neon-purple/20 border-neon-purple' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                            >
                                                <div className="flex justify-between items-center relative z-10">
                                                    <span className="font-bold text-sm uppercase tracking-wider">{field}</span>
                                                    {selections[currentStep] === field && (
                                                        <Check size={18} className="text-neon-purple" />
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-12 flex justify-between items-center">
                                    <button 
                                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors disabled:opacity-0"
                                    >
                                        <ArrowLeft size={18} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Previous Phase</span>
                                    </button>
                                    
                                    {selections[currentStep] && !steps[currentStep].isFinal && (
                                        <button 
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            className="flex items-center gap-2 text-teal font-bold uppercase tracking-widest text-[10px]"
                                        >
                                            Continue Evolution
                                            <ArrowRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                                <ShoppingBag size={32} className="text-gold" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold italic mb-4">Evolution Complete</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto italic">Your custom 7-Day Cloth Strategy has been synthesized based on your digital persona.</p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
                                <div className="p-6 rounded-3xl bg-white/5 border border-neon-purple/30">
                                    <div className="text-[10px] font-bold text-neon-purple uppercase tracking-widest mb-2">Prime Recommendation</div>
                                    <div className="text-xl font-bold italic text-white">{report.heroCloth}</div>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-teal/30">
                                    <div className="text-[10px] font-bold text-teal uppercase tracking-widest mb-2">Strategic Core</div>
                                    <div className="text-sm italic text-slate-300">{report.recommendation}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button 
                                    onClick={() => setReport(null)}
                                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10"
                                >
                                    Recalibrate
                                </button>
                                <a 
                                    href="https://wa.me/918527837527?text=I've just generated my 7-Day Cloth Strategy! Can we book a session?"
                                    className="px-10 py-4 bg-gold text-dark rounded-2xl font-bold uppercase tracking-widest text-[10px] gold-glow hover:scale-105 transition-all"
                                >
                                    Book Your Session
                                </a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
