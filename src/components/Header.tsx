import React, { useContext } from 'react';
import { Phone, MessageCircle, Menu, X, ShoppingCart, Trash2, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../App';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Wedding', path: '/wedding' },
    { name: 'E-com', path: '/ecom' },
    { name: 'Studio', path: '/studio' },
    { name: 'Try On', path: '/editor' },
    { name: 'Guruji Art', path: '/guruji' },
    { name: 'Tracker', path: '/tracker' },
    { name: 'Learn', path: '/learn' },
    { name: 'About', path: '/about' },
    { name: 'Admin', path: '/admin' },
    { name: 'Contact', path: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const total = cart.reduce((acc, item) => acc + (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0), 0);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img 
                        src="/gurucraftpro_logo.png" 
                        alt="GurucraftPro Logo" 
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="font-serif font-bold text-xl tracking-wide">Gurucraft<span className="text-teal">pro</span></span>
                </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={`hover:text-teal transition-colors relative py-2 ${location.pathname === link.path ? 'text-teal' : 'text-muted'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleTheme}
                            className="w-10 h-10 glass border-border rounded-full flex items-center justify-center hover:bg-white/5 transition-all text-muted hover:text-teal"
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative w-10 h-10 glass border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-all"
                        >
                            <ShoppingCart size={18} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                                    {cart.length}
                                </span>
                            )}
                        </button>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="tel:+918527837527" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                                <Phone size={14} />
                                <span>Link</span>
                            </a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="xl:hidden fixed inset-y-0 right-0 w-80 bg-dark/95 backdrop-blur-2xl border-l border-white/10 p-8 z-[60] shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-serif font-bold text-xl tracking-wide">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.path} 
                                        to={link.path} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-sm font-bold uppercase tracking-[0.2em] hover:text-teal transition-all ${location.pathname === link.path ? 'text-teal pl-4 border-l-2 border-teal' : 'text-muted'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                
                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                                    <a href="https://wa.me/918527837527" className="flex items-center justify-center gap-3 bg-teal p-4 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest teal-glow">
                                        <MessageCircle size={18} />
                                        Secure WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Cart Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-dark border-l border-white/10 shadow-2xl z-[80] flex flex-col"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <ShoppingCart className="text-teal" />
                                    <h2 className="text-2xl font-serif font-bold italic tracking-tight text-white">Manifest Buffer</h2>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <ShoppingCart size={64} className="mb-6" />
                                        <p className="text-sm italic uppercase tracking-widest">Buffer Empty</p>
                                    </div>
                                ) : (
                                    cart.map((item, i) => (
                                        <motion.div 
                                            key={item.cartId}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4 p-4 glass border-white/10 rounded-2xl group"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5">
                                                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold truncate text-white italic">{item.name || item.title}</h4>
                                                <p className="text-[10px] text-teal font-bold uppercase tracking-widest mt-1">₹{item.price}</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.cartId)}
                                                className="text-slate-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-8 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                                    <div className="flex justify-between items-end mb-8">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Gross Investment</span>
                                        <span className="text-3xl font-serif font-bold text-gold italic">₹{total.toLocaleString()}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button 
                                            onClick={clearCart}
                                            className="py-4 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                                        >
                                            Purge Buffer
                                        </button>
                                        <a 
                                            href={`https://wa.me/918527837527?text=${encodeURIComponent(`MANIFEST INITIATED: I wish to acquire the following services: ${cart.map(i => i.name || i.title).join(', ')}. Total: ₹${total}`)}`}
                                            className="py-4 bg-teal text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center teal-glow flex items-center justify-center gap-2 group/btn"
                                        >
                                            Secure Order <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
