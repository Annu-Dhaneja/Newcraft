/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthPanel from './components/AuthPanel';
import AdminDashboard from './components/AdminDashboard';
import CanvasEditor from './components/Editor/CanvasEditor';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ConsultationWizard from './components/ConsultationWizard';
import DesignEditor from './components/Studio/DesignEditor';
import ProductGrid from './components/ProductGrid';
import ProjectSpotlight from './components/ProjectSpotlight';
import DarshanExperience from './components/DarshanExperience';
import VantageTryOn from './components/Studio/VantageTryOn';
import AIMixer from './components/AIMixer';
import WeddingPlanner from './components/WeddingPlanner';
import GurujiArt from './components/GurujiArt';
import SadhanaTracker from './components/SadhanaTracker';
import VantageEcom from './components/VantageEcom';
import PhotoEditor from './components/PhotoEditor';
import QRGenerator from './components/QRGenerator';
import LearnSection from './components/LearnSection';
import About from './components/About';
import Gallery from './components/Gallery';
import DesignPortfolio from './components/DesignPortfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import TrustStrip from './components/TrustStrip';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { Toaster, toast } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

export const CartContext = React.createContext<{
    cart: any[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    const [cart, setCart] = React.useState<any[]>([]);

    const addToCart = (item: any) => {
        setCart(prev => [...prev, { ...item, cartId: Math.random().toString(36).substr(2, 9) }]);
        toast.success(`× ${item.name || item.title} added to matrix buffer`);
    };

    const removeFromCart = (cartId: string) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => setCart([]);

    return (
        <ThemeProvider>
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
                <Router>
                    <ScrollToTop />
                    <div className="min-h-screen bg-darker selection:bg-neon-purple/30 selection:text-teal scroll-smooth flex flex-col transition-colors duration-500">
                        <Toaster position="top-right" />
                        <Header />
                        <main className="flex-1 pt-16">
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <Hero />
                                        <TrustStrip />
                                        <AIMixer />
                                        <DesignPortfolio />
                                        <ProjectSpotlight />
                                        <Testimonials />
                                    </>
                                } />
                                <Route path="/consultation" element={<ConsultationWizard />} />
                                <Route path="/wedding" element={<WeddingPlanner />} />
                                <Route path="/guruji" element={<GurujiArt />} />
                                <Route path="/tracker" element={<SadhanaTracker />} />
                                <Route path="/editor" element={
                                    <div className="space-y-4">
                                        <PhotoEditor />
                                        <VantageTryOn />
                                        <QRGenerator />
                                    </div>
                                } />
                                <Route path="/studio" element={<CanvasEditor />} />
                                <Route path="/login" element={<AuthPanel />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/ecom" element={
                                    <div className="space-y-4 pt-12">
                                        <VantageEcom />
                                        <Services />
                                        <ProductGrid />
                                    </div>
                                } />
                                <Route path="/learn" element={<LearnSection />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/pricing" element={<Pricing />} />
                            </Routes>
                        </main>
                        <Footer />
                        <ChatWidget />
                    </div>
                </Router>
            </CartContext.Provider>
        </ThemeProvider>
    );
}
