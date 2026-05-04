import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Smartphone, Check, ShieldCheck, X, Zap, ArrowRight, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentGatewayProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onSuccess: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'crypto' | 'apple';

export default function PaymentGateway({ isOpen, onClose, amount, onSuccess }: PaymentGatewayProps) {
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<'selection' | 'details' | 'success'>('selection');

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment protocol
        setTimeout(() => {
            setIsProcessing(false);
            setStep('success');
            setTimeout(() => {
                onSuccess();
                onClose();
                setStep('selection');
            }, 3000);
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-darker/90 backdrop-blur-2xl"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl glass rounded-[3rem] border-white/10 overflow-hidden shadow-[0_0_100px_rgba(45,212,191,0.1)]"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-serif font-bold italic text-white tracking-tight">Checkout Infrastructure</h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Secure Neural Transaction Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {step === 'selection' && (
                            <motion.div 
                                key="selection"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div className="p-8 bg-teal/5 border border-teal/20 rounded-[2rem] flex items-center justify-between">
                                    <span className="text-slate-400 font-serif italic text-lg text-white">Total Commitment</span>
                                    <span className="text-4xl font-serif font-bold text-teal tracking-tighter">₹{amount}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'card', icon: CreditCard, label: 'Credit Card', desc: 'Secure • PCI-SSC v4.0' },
                                        { id: 'upi', icon: Smartphone, label: 'UPI / GPay', desc: 'Instant • Mobile Transfer' },
                                        { id: 'crypto', icon: Zap, label: 'Cyber Assets', desc: 'BTC • ETH • SOL • USDC' },
                                        { id: 'apple', icon: Wallet, label: 'Apple Wallet', desc: 'FaceID • Biometric Sync' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => { setMethod(opt.id as PaymentMethod); setStep('details'); }}
                                            className="p-6 glass border-white/5 rounded-[2rem] text-left hover:border-teal/30 group transition-all"
                                        >
                                            <opt.icon className="text-slate-500 mb-4 group-hover:text-teal transition-colors" size={24} />
                                            <div className="text-white font-bold text-xs uppercase tracking-widest mb-1">{opt.label}</div>
                                            <div className="text-[10px] text-slate-600 font-serif italic">{opt.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'details' && (
                            <motion.div 
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <button onClick={() => setStep('selection')} className="text-slate-500 hover:text-white transition-colors">
                                        <X size={20} className="rotate-45" />
                                    </button>
                                    <h4 className="text-xl font-serif font-bold italic text-white">{method.toUpperCase()} Authorization</h4>
                                </div>

                                {method === 'card' && (
                                    <div className="space-y-4">
                                        <div className="glass p-6 rounded-2xl border-white/5">
                                            <input type="text" placeholder="Card Identity Number" className="w-full bg-transparent text-white placeholder:text-slate-700 outline-none font-mono tracking-[0.2em] text-lg" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="glass p-6 rounded-2xl border-white/5">
                                                <input type="text" placeholder="MM/YY" className="w-full bg-transparent text-white placeholder:text-slate-700 outline-none font-mono" />
                                            </div>
                                            <div className="glass p-6 rounded-2xl border-white/5">
                                                <input type="password" placeholder="CVV" className="w-full bg-transparent text-white placeholder:text-slate-700 outline-none font-mono" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {method === 'upi' && (
                                    <div className="space-y-4">
                                        <div className="glass p-8 rounded-3xl border-white/5 text-center">
                                            <div className="w-32 h-32 bg-white/5 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example-upi" className="w-24 h-24 invert opacity-80" alt="QR" />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scan with any UPI Application</p>
                                        </div>
                                        <div className="text-center text-slate-600">OR</div>
                                        <div className="glass p-6 rounded-2xl border-white/5">
                                            <input type="text" placeholder="vantage@upi" className="w-full bg-transparent text-center text-white placeholder:text-slate-700 outline-none italic" />
                                        </div>
                                    </div>
                                )}

                                {method === 'crypto' && (
                                    <div className="space-y-4">
                                        <div className="glass p-6 rounded-2xl border-white/5 bg-dark/40">
                                            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2">BTC Network Addr</div>
                                            <div className="text-[10px] font-mono text-teal break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 italic text-center">Network confirmations required for fund allocation.</p>
                                    </div>
                                )}

                                {method === 'apple' && (
                                    <div className="flex flex-col items-center justify-center py-12 gap-8 text-center">
                                        <div className="w-24 h-24 bg-white text-dark rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                            <Smartphone size={48} />
                                        </div>
                                        <p className="text-slate-400 italic">Double-click side button to authenticate neural link.</p>
                                    </div>
                                )}

                                <button 
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full py-6 bg-teal text-white rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] teal-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Authorizing...
                                        </>
                                    ) : (
                                        <>Secure Commitment <ArrowRight size={16} /></>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center py-20 text-center"
                            >
                                <div className="w-32 h-32 bg-teal/20 rounded-full flex items-center justify-center mb-8 relative">
                                    <Check size={64} className="text-teal" />
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 2 }}
                                        className="absolute inset-0 border border-teal/30 rounded-full"
                                    />
                                </div>
                                <h3 className="text-4xl font-serif font-bold italic text-white mb-4">Sovereign Receipt</h3>
                                <p className="text-slate-400 italic max-w-sm">Transaction verified by neural consensus. Assets allocated to your account.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Strip */}
                <div className="p-6 bg-dark/60 backdrop-blur-xl border-t border-white/5 flex items-center justify-center gap-3 text-slate-500">
                    <ShieldCheck size={16} className="text-teal" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Encrypted by Vantage SecureLink v2.4</span>
                </div>
            </motion.div>
        </div>
    );
}
