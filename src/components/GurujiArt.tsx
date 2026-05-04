import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Smartphone, Sticker, Bookmark, Share2, Calendar, ShoppingBag, Gift, Wand2, Send, Download, Info, RefreshCcw, Twitter, Facebook, MessageCircle } from 'lucide-react';
import DarshanExperience from './DarshanExperience';
import { generateDivineArt } from '../services/geminiService';
import toast from 'react-hot-toast';

const artProducts = [
    {
        title: "Chhatarpur Throne Portrait",
        category: "Sacred Art",
        price: "₹4,999",
        image: "https://www.gurujimaharaj.com/img/guruji-maharaj-photo-1.jpg"
    },
    {
        title: "Sovereign Bracelet",
        category: "Sacred Accessories",
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400"
    },
    {
        title: "Jai Guru Ji Stickers",
        category: "Digital Vinyl",
        price: "₹199 / pack",
        image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=400"
    },
    {
        title: "Divine Vachan Calendar",
        category: "Subscription",
        price: "Free",
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=400"
    }
];

export default function GurujiArt() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = (f) => {
            setSourceImage(f.target?.result as string);
            setIsUploading(false);
            toast.success("Source image uploaded for neural analysis.");
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `divine-art-${Date.now()}.jpg`;
        link.click();
        toast.success("Divine asset archived locally.");
    };

    const handleShare = async () => {
        if (!generatedImage) return;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Divine Art Manifestation',
                    text: 'Check out this spiritual artwork I generated with Guruji Mastery AI.',
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard.");
            }
        } catch (error) {
            // handle error or cancel
        }
    };

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent("Check out this spiritual artwork I generated with Guruji Mastery AI! 🙏");
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent("Check out this spiritual artwork I generated with Guruji Mastery AI! #Guruji #DivineArt");
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error("Vision protocol requires a text prompt.");
            return;
        }
        
        setIsGenerating(true);
        try {
            const result = await generateDivineArt(prompt, sourceImage);
            setGeneratedImage(result);
            toast.success("Intelligence manifested successfully.");
        } catch (error) {
            toast.error("Failed to manifest vision. Neural pathway saturated.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-32 pb-32">
            {/* Hero AR Section */}
            <section className="pt-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-gold/30 mb-8"
                        >
                            <Sparkles size={16} className="text-gold" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold">Divine Vision v2.0</span>
                        </motion.div>
                        <h2 className="text-8xl font-serif font-bold mb-8 italic tracking-tighter">Guruji Art <span className="text-neon-purple">Mastery</span></h2>
                        <p className="text-slate-400 max-w-3xl mx-auto italic text-xl opacity-80 leading-relaxed">Experience a sacred intersection of tradition and augmented reality. Access curated spiritual assets designed for the modern devotee.</p>
                    </div>

                    <div className="mb-24 flex justify-center">
                        <div className="relative group cursor-pointer">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative z-10 w-full max-w-2xl aspect-square glass rounded-[4rem] overflow-hidden border-gold/20 p-8"
                            >
                                <img 
                                    src="https://www.gurujimaharaj.com/img/guruji-maharaj-photo-1.jpg" 
                                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl"
                                    alt="Guruji Masterpiece"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                                <div className="absolute bottom-12 left-12 right-12 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                    <h4 className="text-4xl font-serif font-bold italic text-white mb-2">Alpha Divine Portrait</h4>
                                    <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">The Strategic Masterpiece</p>
                                </div>
                            </motion.div>
                            <div className="absolute inset-[-40px] bg-gold/5 blur-[100px] rounded-full animate-pulse -z-10" />
                        </div>
                    </div>
                    
                    <DarshanExperience />
                </div>
            </section>

            {/* Neural Asset Manifestation */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl border border-gold/20 flex items-center justify-center">
                            <Wand2 className="text-gold" size={24} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-serif font-bold italic text-white tracking-tight">Divine Asset Manifestation</h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Neural Synthesis v4.1 • Imagen AI Integration</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="glass p-10 rounded-[4rem] border-white/5 relative overflow-hidden">
                                <h4 className="text-2xl font-serif font-bold italic text-white mb-6">Describe the Vision</h4>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-1 relative">
                                            <textarea 
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                placeholder="Example: Chhatarpur Wale Guruji sitting on a golden throne in a cosmic temple with neon teal aura..."
                                                className="w-full h-40 bg-dark/40 border border-white/10 rounded-3xl p-6 text-sm text-white placeholder:text-slate-600 focus:border-gold/50 focus:outline-none transition-all resize-none italic"
                                            />
                                            <div className="absolute top-4 right-4 text-slate-800 pointer-events-none">
                                                <Send size={16} />
                                            </div>
                                        </div>
                                        
                                        <div className="w-40 flex flex-col gap-4">
                                            <div className="relative group/upload h-full">
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                <div className={`h-full glass border-dashed rounded-3xl flex flex-col items-center justify-center p-4 transition-all ${sourceImage ? 'border-teal/50 bg-teal/5' : 'border-white/10 hover:border-gold/30'}`}>
                                                    {sourceImage ? (
                                                        <div className="relative w-full h-full">
                                                            <img 
                                                                src={sourceImage} 
                                                                className="w-full h-full object-cover rounded-2xl" 
                                                                alt="Source" 
                                                                referrerPolicy="no-referrer"
                                                            />
                                                            <button 
                                                                onClick={(e) => { e.preventDefault(); setSourceImage(null); }}
                                                                className="absolute -top-2 -right-2 p-1.5 bg-dark border border-white/10 rounded-full text-slate-500 hover:text-white"
                                                            >
                                                                <RefreshCcw size={12} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Download className="text-slate-600 mb-2" size={24} />
                                                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 text-center">Reference Image</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={isGenerating || !prompt.trim()}
                                        className="w-full py-5 bg-gradient-to-r from-gold via-neon-purple to-teal rounded-2xl font-bold text-dark text-xs uppercase tracking-[0.3em] gold-glow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
                                    >
                                        {isGenerating ? 'Manifesting Intelligence...' : 'Manifest Divine Art'}
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                    <Info size={14} />
                                    <span>Allocating neural pathways for asset synthesis</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: 'Latency', val: '2.4s' },
                                    { label: 'Precision', val: 'Alpha' },
                                    { label: 'Style', val: 'Vibrant' },
                                    { label: 'Status', val: 'Stable' }
                                ].map((stat, i) => (
                                    <div key={i} className="glass p-6 rounded-3xl border-white/5">
                                        <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-2">{stat.label}</div>
                                        <div className="text-white font-serif italic font-bold">{stat.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative group min-h-[500px]">
                            <AnimatePresence mode="wait">
                                {isGenerating ? (
                                    <motion.div 
                                        key="generating"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center glass rounded-[5rem] border-gold/10"
                                    >
                                        <div className="relative mb-8">
                                            <div className="w-32 h-32 rounded-full border-t-2 border-gold animate-spin" />
                                            <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
                                                <Sparkles className="text-gold animate-pulse" size={40} />
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-serif font-bold italic text-white mb-2">Neural Synthesis</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold animate-pulse text-center px-8">Synthesizing spiritual dimensions from text prompt...</p>
                                    </motion.div>
                                ) : generatedImage ? (
                                    <motion.div 
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative w-full h-full aspect-square glass rounded-[5rem] overflow-hidden border-gold/30 p-8 shadow-2xl"
                                    >
                                        <img 
                                            src={generatedImage} 
                                            className="w-full h-full object-cover rounded-[3.5rem]" 
                                            alt="Generated Divine Art" 
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-8 rounded-[3.5rem] bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-12">
                                            <div className="w-full flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <div>
                                                    <h4 className="text-2xl font-serif font-bold italic text-white mb-2">Manifested Asset</h4>
                                                    <p className="text-gold uppercase tracking-[0.3em] font-bold text-[8px]">Protocol: Devotion_Synthesis</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex gap-2">
                                                            <button onClick={shareOnWhatsApp} className="p-3 bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366] rounded-xl transition-all" title="WhatsApp Share">
                                                                <MessageCircle size={18} />
                                                            </button>
                                                            <button onClick={shareOnTwitter} className="p-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/40 text-[#1DA1F2] rounded-xl transition-all" title="Twitter Share">
                                                                <Twitter size={18} />
                                                            </button>
                                                            <button onClick={handleShare} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all" title="Share Options">
                                                                <Share2 size={18} />
                                                            </button>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => setGeneratedImage(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all text-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                                                <RefreshCcw size={12} /> Regenerate
                                                            </button>
                                                            <button onClick={handleSave} className="px-6 py-3 bg-gold text-dark rounded-xl gold-glow hover:scale-105 transition-all text-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                                                <Download size={14} /> Archive
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center glass rounded-[5rem] border-white/5 border-dashed bg-white/[0.02]">
                                        <div className="mb-8 p-12 bg-white/5 rounded-full border border-white/5">
                                            <Sparkles className="text-slate-700" size={80} />
                                        </div>
                                        <h4 className="text-2xl font-serif font-bold italic text-slate-500 mb-2">Awaiting Prompt</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600">Neural core ready for asset manifestation</p>
                                    </div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-[-40px] bg-gold/5 blur-[100px] rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {artProducts.map((product, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-6 rounded-[3rem] border-white/5 group hover:border-gold/30 transition-all"
                            >
                                <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 relative">
                                    <img 
                                        src={product.image} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                        alt={product.title} 
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <button className="absolute bottom-6 right-6 p-4 bg-gold text-dark rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                                        <ShoppingBag size={20} />
                                    </button>
                                </div>
                                <div className="px-2">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">{product.category}</h4>
                                    <h3 className="text-2xl font-serif font-bold italic mb-4">{product.title}</h3>
                                    <p className="text-lg font-bold text-white">{product.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spiritual Tools Grid */}
            <section className="px-4 py-24 bg-dark/40 backdrop-blur-3xl border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-serif font-bold italic text-white mb-4">Chhatarpur <span className="text-teal">Grace</span></h3>
                        <p className="text-slate-500 italic">Curated perspectives of the Divine abode.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            { img: "https://www.gurujimaharaj.com/img/guruji-maharaj-photo-1.jpg", title: "Temple Sanctorum" },
                            { img: "https://www.gurujimaharaj.com/img/guruji-maharaj-photo-2.jpg", title: "Divine Aura" },
                            { img: "https://www.gurujimaharaj.com/img/guruji-maharaj-photo-3.jpg", title: "Sacred Darshan" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group rounded-[3rem] overflow-hidden border border-white/10 group">
                                <img src={item.img} className="w-full aspect-[16/10] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                    <span className="text-xl font-serif font-bold italic text-white">{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { icon: Smartphone, label: '4K Wallpapers', action: 'Download' },
                            { icon: Sticker, label: 'Signal Stickers', action: 'Sync' },
                            { icon: Share2, label: 'Share Grace', action: 'Social' },
                            { icon: Calendar, label: 'Daily Vachan', action: 'Subscribe' }
                        ].map((tool, i) => (
                            <div key={i} onClick={() => toast.success(`${tool.label} initiated.`)} className="text-center group cursor-pointer">
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-teal mx-auto mb-6 group-hover:border-gold/50 transition-all group-hover:scale-110">
                                    <tool.icon size={32} />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">{tool.label}</h4>
                                <p className="text-[10px] text-slate-500 uppercase font-bold italic">{tool.action} Protocol</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
