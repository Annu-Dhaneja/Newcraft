import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Package, ShoppingCart, Filter, CreditCard, Wand2, Box, Cpu, ArrowRight, User, Shirt, Sparkles, RefreshCcw, Download, Info, Trash2, Smartphone, Wallet } from 'lucide-react';
import { CartContext } from '../App';
import toast from 'react-hot-toast';
import PaymentGateway from './PaymentGateway';

const ecomServices = [
    {
        title: "Logo Design Lab",
        desc: "Neural vector synthesis for premium brand identities. Architectural precision and logo scalability.",
        price: "2500",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "T-Shirt Mastery",
        desc: "Custom merchandise architectural blueprints. Perfect for brands, events, and high-fidelity streetwear.",
        price: "750",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Ghost Mannequin",
        desc: "Strict adherence to Amazon/Flipkart/Etsy guidelines. 3D form retention and seamless neck joinings.",
        price: "49",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400"
    },
    {
        title: "AI Virtual Try-On",
        desc: "Compose garments onto users with high-fidelity texture and pose matching logic.",
        price: "15000",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=400"
    }
];

export default function VantageEcom() {
    const { addToCart, cart, removeFromCart, clearCart } = useContext(CartContext);
    const [subjectImage, setSubjectImage] = useState<string | null>(null);
    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + parseInt(item.price || 0), 0);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'subject' | 'garment') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (f) => {
            const data = f.target?.result as string;
            if (type === 'subject') setSubjectImage(data);
            else setGarmentImage(data);
            setResultImage(null);
        };
        reader.readAsDataURL(file);
    };

    const handleSwap = () => {
        if (!subjectImage || !garmentImage) {
            toast.error("Telemetry incomplete. Upload both Subject and Garment assets.");
            return;
        }

        setIsProcessing(true);
        // Simulate high-fidelity neural processing
        setTimeout(() => {
            setIsProcessing(false);
            // In a real scenario, this would be the API result
            setResultImage("https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800");
            toast.success("Neural composition successful.");
        }, 3000);
    };

    return (
        <section className="py-24 bg-darker cyber-grid">
            <PaymentGateway 
                isOpen={isPaymentOpen} 
                onClose={() => setIsPaymentOpen(false)} 
                amount={totalAmount}
                onSuccess={() => {
                    clearCart();
                    toast.success("Transaction Buffer Cleared.");
                }}
            />

            {/* Cart Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-[60] flex justify-end">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="absolute inset-0 bg-darker/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="relative w-full max-w-md glass h-full border-l border-white/10 p-12 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-3xl font-serif font-bold italic text-white">Active <span className="text-teal">Cart</span></h3>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
                                    <ArrowRight size={24} />
                                </button>
                            </div>

                            <div className="space-y-6 mb-12">
                                {cart.length === 0 ? (
                                    <div className="text-center py-20 text-slate-600 italic">Matrix buffer is empty</div>
                                ) : (
                                    cart.map((item, i) => (
                                        <div key={item.cartId || i} className="glass p-6 rounded-3xl border-white/5 flex items-center justify-between group">
                                            <div>
                                                <h4 className="text-white font-serif font-bold italic text-lg">{item.name || item.title}</h4>
                                                <div className="text-teal font-serif text-sm">₹{item.price}</div>
                                            </div>
                                            <button onClick={() => removeFromCart(item.cartId)} className="p-3 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="space-y-6">
                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between mb-12">
                                        <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Total Commitment</span>
                                        <span className="text-3xl font-serif font-bold text-white tracking-tighter">₹{totalAmount}</span>
                                    </div>
                                    <button 
                                        onClick={() => { setIsCartOpen(false); setIsPaymentOpen(true); }}
                                        className="w-full py-6 bg-teal text-white rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] teal-glow hover:scale-105 active:scale-95 transition-all shadow-2xl"
                                    >
                                        Initiate Checkout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8"
                        >
                            <Cpu size={14} className="text-neon-purple" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Merchant Scalability Suite</span>
                        </motion.div>
                        <h2 className="text-7xl font-serif font-bold mb-8 italic tracking-tight"><span className="text-teal">Smart</span> Asset Factory</h2>
                        <p className="text-slate-500 text-lg italic leading-relaxed">Systematic post-production for professional merchants. We deliver pixel-perfect assets bound by global marketplace integrity standards.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="hidden md:flex items-center gap-6 px-8 py-4 glass border-white/5 rounded-2xl mr-4">
                            <div className="flex items-center gap-2">
                                <CreditCard size={14} className="text-slate-500" />
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-600">PCI-SSC</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Smartphone size={14} className="text-slate-500" />
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-600">UPI/GPAY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-slate-500" />
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-600">CRYPTO</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wallet size={14} className="text-slate-500" />
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-600">APPLE</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-3 px-8 py-4 glass border-white/10 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                            <Filter size={18} className="text-teal" />
                            Filter by Platform
                        </button>
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-3 px-8 py-4 bg-neon-purple text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all relative"
                        >
                            <ShoppingCart size={18} />
                            Active Cart ({cart.length})
                        </button>
                    </div>
                </div>

                {/* AI Virtual Try-On Lab */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-teal/10 rounded-2xl border border-teal/20 flex items-center justify-center">
                            <Wand2 className="text-teal" size={24} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-serif font-bold italic text-white tracking-tight">AI Virtual Try-On Lab</h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Real-Time Neural Garment Synthesis v2.4</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Subject Uploader */}
                        <div className={`glass p-8 rounded-[3rem] border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] group transition-all ${subjectImage ? 'border-teal/30' : ''}`}>
                            <input 
                                type="file" 
                                id="subject-upload" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, 'subject')}
                                accept="image/*"
                            />
                            {subjectImage ? (
                                <div className="relative w-full h-full flex flex-col items-center">
                                    <img src={subjectImage} className="w-full h-[300px] object-contain rounded-2xl mb-6 shadow-2xl" alt="Subject" />
                                    <label htmlFor="subject-upload" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-teal cursor-pointer hover:underline">
                                        <RefreshCcw size={14} /> Replace Subject
                                    </label>
                                </div>
                            ) : (
                                <label htmlFor="subject-upload" className="flex flex-col items-center gap-4 cursor-pointer">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-teal/20 transition-all">
                                        <User size={32} className="text-slate-500 group-hover:text-teal" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Input Subject Image</span>
                                </label>
                            )}
                            <div className="absolute top-4 left-4 text-[8px] font-bold text-slate-600 uppercase tracking-widest">Protocol: Model_Input</div>
                        </div>

                        {/* Garment Uploader */}
                        <div className={`glass p-8 rounded-[3rem] border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] group transition-all ${garmentImage ? 'border-neon-purple/30' : ''}`}>
                            <input 
                                type="file" 
                                id="garment-upload" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, 'garment')}
                                accept="image/*"
                            />
                            {garmentImage ? (
                                <div className="relative w-full h-full flex flex-col items-center">
                                    <img src={garmentImage} className="w-full h-[300px] object-contain rounded-2xl mb-6 shadow-2xl" alt="Garment" />
                                    <label htmlFor="garment-upload" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-purple cursor-pointer hover:underline">
                                        <RefreshCcw size={14} /> Replace Garment
                                    </label>
                                </div>
                            ) : (
                                <label htmlFor="garment-upload" className="flex flex-col items-center gap-4 cursor-pointer">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-neon-purple/20 transition-all">
                                        <Shirt size={32} className="text-slate-500 group-hover:text-neon-purple" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Input Garment Image</span>
                                </label>
                            )}
                            <div className="absolute top-4 left-4 text-[8px] font-bold text-slate-600 uppercase tracking-widest">Protocol: SKU_Matrix</div>
                        </div>

                        {/* Synthesis Engine & Output */}
                        <div className="glass p-8 rounded-[3rem] border-teal/20 bg-dark/40 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-2xl">
                            <AnimatePresence mode="wait">
                                {isProcessing ? (
                                    <motion.div 
                                        key="processing"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center gap-8"
                                    >
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-b-2 border-teal animate-spin" />
                                            <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
                                                <Sparkles className="text-teal animate-pulse" size={32} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-2xl font-serif font-bold italic text-white mb-2">Neural Synthesis</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-teal">Mapping Coordinates...</p>
                                        </div>
                                    </motion.div>
                                ) : resultImage ? (
                                    <motion.div 
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full h-full flex flex-col items-center"
                                    >
                                        <div className="relative w-full mb-8">
                                            <img src={resultImage} className="w-full h-[300px] object-cover rounded-[2rem] shadow-[0_0_50px_rgba(45,212,191,0.2)]" alt="Synthesis Result" />
                                            <div className="absolute top-4 right-4 p-4 bg-dark/60 backdrop-blur-xl rounded-2xl border border-teal/30">
                                                <Sparkles className="text-teal" size={20} />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 w-full">
                                            <button 
                                                onClick={() => { setResultImage(null); setSubjectImage(null); setGarmentImage(null); }}
                                                className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                            >
                                                Reset Lab
                                            </button>
                                            <button className="flex-1 py-4 bg-teal text-white rounded-2xl text-[9px] font-bold uppercase tracking-widest teal-glow hover:scale-105 transition-all flex items-center justify-center gap-2">
                                                <Download size={14} /> Download Asset
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-8 p-10 bg-white/5 rounded-full inline-block relative border border-white/5">
                                            <Cpu className="text-slate-500" size={64} />
                                            <div className="absolute inset-0 bg-teal/5 blur-3xl rounded-full" />
                                        </div>
                                        <h4 className="text-2xl font-serif font-bold italic text-white mb-6">Ready for Synthesis</h4>
                                        <button 
                                            onClick={handleSwap}
                                            disabled={!subjectImage || !garmentImage}
                                            className="px-12 py-5 bg-gradient-to-r from-teal to-neon-purple rounded-2xl font-bold text-white text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:scale-100"
                                        >
                                            Launch AI Swap
                                        </button>
                                        <div className="mt-8 flex items-center justify-center gap-3 text-slate-500 italic text-[10px]">
                                            <Info size={14} />
                                            Neural Engine v2.4 (Alpha Integrity Status)
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ecomServices.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 rounded-[3rem] border-white/5 hover:border-gold/30 transition-all group flex flex-col h-full overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                <Box size={100} />
                            </div>

                            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative">
                                <img src={service.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt={service.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <span className="text-xs font-bold text-teal bg-dark/60 backdrop-blur-xl px-3 py-1 rounded-full border border-teal/30">₹{service.price}</span>
                                </div>
                            </div>

                            <div className="flex-1 px-4">
                                <h3 className="text-2xl font-serif font-bold mb-4 italic tracking-tight">{service.title}</h3>
                                <p className="text-xs text-slate-500 italic leading-relaxed mb-8">{service.desc}</p>
                            </div>

                            <div className="px-4 pb-4">
                                <button 
                                    onClick={() => addToCart({ ...service, name: service.title })}
                                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-[9px] uppercase tracking-widest hover:bg-gold hover:text-dark hover:border-gold transition-all flex items-center justify-center gap-3 group/btn"
                                >
                                    <Zap size={14} className="text-gold group-hover/btn:text-dark" />
                                    Acquire License
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 glass rounded-[4rem] border-gold/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="relative z-10">
                        <h3 className="text-4xl font-serif font-bold italic mb-4">Merchant Bulk Contract</h3>
                        <p className="text-slate-400 italic text-sm max-w-md">Need to process 500+ SKUs monthly? Initiate a dedicated neural pipeline for your brand.</p>
                    </div>
                    <div className="relative z-10 flex gap-6">
                        <div className="p-6 glass rounded-3xl border-white/5 text-center min-w-[140px]">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contract Grade</div>
                            <div className="text-2xl font-serif font-bold text-gold italic">Alpha-Luxe</div>
                        </div>
                        <a href="/contact" className="px-12 py-6 bg-gold text-dark rounded-[2rem] font-bold text-xs uppercase tracking-widest gold-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                            Initiate Inquiry <ArrowRight size={20} />
                        </a>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
                </div>
            </div>
        </section>
    );
}

