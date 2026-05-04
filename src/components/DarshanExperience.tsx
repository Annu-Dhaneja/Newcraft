import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, CameraOff, Sparkles, Wind, Maximize2, X } from 'lucide-react';

export default function DarshanExperience() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isARActive, setIsARActive] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsARActive(true);
            setError(null);
        } catch (err) {
            console.error("Camera access denied:", err);
            setError("Camera access is required for the AR experience. Please enable it in your browser settings.");
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        setIsARActive(false);
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    // Simulated 3D particles
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    // Floating Om symbols
    const omSymbols = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2,
        dist: 250 + Math.random() * 50
    }));

    return (
        <section id="darshan" className="py-24 bg-darker relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Sparkles size={14} className="text-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sakshat Darshan AR</span>
                </div>
                <h2 className="text-6xl font-serif font-bold mb-6 italic">Divine <span className="text-teal">Presence</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto italic">Experience the 8K ultra-realistic meditative presence of Guruji in your own space using our Cyber-Luxe AR engine.</p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="relative aspect-[4/5] sm:aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black group/ar">
                    {/* Camera Feed */}
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isARActive ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Fallback/Idle Background */}
                    {!isARActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-dark to-darker flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mb-8 border border-white/10 group-hover/ar:border-teal/30 transition-all">
                                <Camera size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-4 italic lowercase">waiting for ar beam...</h3>
                            <button 
                                onClick={startCamera}
                                className="px-8 py-4 bg-teal text-white rounded-full font-bold teal-glow hover:scale-105 transition-all"
                            >
                                Activate AR Vision
                            </button>
                            {error && <p className="mt-4 text-xs text-red-400 max-w-xs mx-auto">{error}</p>}
                        </div>
                    )}

                    {/* The Divine UI Layer */}
                    <AnimatePresence>
                        {isARActive && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                {/* Volumetric Aura Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 via-transparent to-teal/10" />
                                
                                {/* Holographic Scanning Line */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/30 to-transparent h-[10%] w-full z-30 pointer-events-none"
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                />

                                {/* 3D Model Proxy (Guruji) */}
                                <motion.div 
                                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute inset-0 flex items-center justify-center p-8"
                                >
                                    <div className="relative w-full max-w-[450px] aspect-[1/1.2] flex items-center justify-center">
                                        {/* Aura Rings */}
                                        <div className="absolute inset-0 bg-neon-purple/30 blur-[100px] rounded-full animate-pulse" />
                                        <div className="absolute inset-[-40px] border border-teal/10 rounded-full animate-[spin_25s_linear_infinite]" />
                                        <div className="absolute inset-[-60px] border border-neon-purple/5 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
                                        
                                        {/* The Main Figure */}
                                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                                            <img 
                                                src="https://www.gurujimaharaj.com/img/guruji-maharaj-photo-1.jpg" 
                                                className="w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(0,242,255,0.4)] brightness-125 contrast-110 grayscale-20 group-hover:grayscale-0 transition-all duration-1000"
                                                referrerPolicy="no-referrer"
                                                alt="Guruji Masterpiece"
                                            />
                                            {/* Scanning Glitch Effect Layer */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                                        </div>

                                        {/* Live Wind Effects on Robes (Simulated) */}
                                        <motion.div 
                                            animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
                                            transition={{ repeat: Infinity, duration: 4 }}
                                            className="absolute inset-0 z-20 pointer-events-none opacity-30"
                                        >
                                            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-white/10 blur-xl rounded-full" />
                                        </motion.div>

                                        {/* Floating Om Symbols */}
                                        {omSymbols.map((om) => (
                                            <motion.div
                                                key={om.id}
                                                className="absolute text-teal/40 font-serif text-xl"
                                                animate={{
                                                    x: [
                                                        Math.cos(om.angle) * om.dist,
                                                        Math.cos(om.angle + 0.2) * (om.dist + 10),
                                                        Math.cos(om.angle) * om.dist
                                                    ],
                                                    y: [
                                                        Math.sin(om.angle) * om.dist,
                                                        Math.sin(om.angle + 0.2) * (om.dist + 10),
                                                        Math.sin(om.angle) * om.dist
                                                    ],
                                                    opacity: [0.2, 0.5, 0.2]
                                                }}
                                                transition={{ duration: 8 + Math.random() * 4, repeat: Infinity }}
                                            >
                                                ॐ
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Particle Dust (VFX) */}
                                {particles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        className="absolute bg-gradient-to-t from-teal to-neon-purple rounded-full blur-[1px]"
                                        style={{
                                            left: `${p.x}%`,
                                            top: `${p.y}%`,
                                            width: p.size,
                                            height: p.size,
                                        }}
                                        animate={{
                                            y: [0, -300],
                                            opacity: [0, 0.8, 0],
                                            scale: [0, 1.5, 0]
                                        }}
                                        transition={{
                                            duration: p.duration,
                                            repeat: Infinity,
                                            delay: p.delay,
                                            ease: "linear"
                                        }}
                                    />
                                ))}

                                {/* HUD Overlay */}
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                            <span className="text-[10px] font-bold text-teal tracking-widest uppercase">8K Render Active</span>
                                        </div>
                                        <span className="text-[10px] text-white/50 font-mono">Depth-Occlusion: v4.2.1-stable</span>
                                    </div>
                                    <button 
                                        onClick={stopCamera}
                                        className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 text-center">
                                    <p className="text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase">Gurucraftpro AR Experience</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Features Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                    {[
                        { icon: Maximize2, label: 'Standard Pose', val: 'Padmasana' },
                        { icon: Wind, label: 'Wind Physics', val: 'Active' },
                        { icon: Sparkles, label: 'Aura Bloom', val: 'Volumetric' },
                        { icon: Camera, label: 'Depth Tracking', val: '60 FPS' }
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <item.icon className="mx-auto mb-2 text-slate-500" size={16} />
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{item.label}</div>
                            <div className="text-xs font-serif font-bold italic text-white">{item.val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
