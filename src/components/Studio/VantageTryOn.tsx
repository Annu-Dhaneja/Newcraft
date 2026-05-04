import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, User, Shirt, RefreshCcw, Download, Wand2, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-hot-toast';

export default function VantageTryOn() {
    const [subjectImage, setSubjectImage] = useState<string | null>(null);
    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'subject' | 'garment') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (val) => {
            if (type === 'subject') setSubjectImage(val.target?.result as string);
            else setGarmentImage(val.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleTryOn = async () => {
        if (!subjectImage || !garmentImage) {
            toast.error('Please upload both a person and a garment image.');
            return;
        }

        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
            
            // Convert base64 to parts for Gemini
            const subjectBase64 = subjectImage.split(',')[1];
            const garmentBase64 = garmentImage.split(',')[1];

            const prompt = `
                [TASK]: Perform accurate, photo-realistic virtual try-on composition from two input images in real-time (<2 seconds execution).
                [INPUT 1: TARGET USER]: Analyzing: Human body segmentation, pose estimation keypoints, skin tone matching, facial identity preservation, ambient lighting detection.
                [INPUT 2: GARMENT]: Analyzing: Product type [e.g., top-wear], high-resolution texture map, fabric drape property, logo/pattern placement.
                [PROCESS]:
                SEGMENTATION: Isolate target body part on User.
                WARPING: Apply thin-plate spline warping to Garment to match User’s pose keypoints.
                COMPOSITION: Overlay warped Garment onto segmented region. Preserve User's hands, neck, and face over the garment edges where applicable.
                REFINING: Simulate realistic shadows beneath fabric folds. Blending edges to match input lighting. Maintain full fabric texture fidelity without blur.
                [OUTPUT]: Single composed photo-realistic image showing User wearing Garment. 4k resolution, 0 milliseconds additional lag.
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-image",
                contents: {
                    parts: [
                        { inlineData: { data: subjectBase64, mimeType: "image/png" } },
                        { inlineData: { data: garmentBase64, mimeType: "image/png" } },
                        { text: prompt }
                    ]
                }
            });

            const resultPart = response.candidates[0].content.parts.find(p => p.inlineData);
            if (resultPart?.inlineData) {
                setResultImage(`data:image/png;base64,${resultPart.inlineData.data}`);
                toast.success('Try-on successful!');
            } else {
                throw new Error('No image returned from AI');
            }
        } catch (error) {
            console.error('Try-on error:', error);
            toast.error('Failed to generate try-on. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section id="vantage-tryon" className="py-24 bg-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Sparkles size={14} className="text-neon-purple" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">VantageEcom AI Engine</span>
                    </motion.div>
                    <h2 className="text-6xl font-serif font-bold mb-6 italic">Virtual <span className="text-neon-purple">Clothing</span> Swap</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto italic">High-fidelity virtual try-on powered by our custom Cyber-Luxe AI engine. Perfect for merchant catalogs and previews.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Grid: Uploaders */}
                    <div className="space-y-6">
                        {/* Subject Uploader */}
                        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                                    <User size={16} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider">Human Subject</h3>
                            </div>
                            
                            <label className="relative block h-64 border-2 border-dashed border-white/10 rounded-2xl hover:border-neon-purple/50 transition-colors cursor-pointer group/label overflow-hidden">
                                {subjectImage ? (
                                    <>
                                        <img src={subjectImage} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover/label:opacity-100 transition-opacity flex items-center justify-center">
                                            <RefreshCcw className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                                        <Upload size={32} />
                                        <span className="text-xs font-bold uppercase">Upload Photo</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'subject')} />
                            </label>
                            <p className="text-[10px] text-slate-500 mt-4 italic">Face and body features will be 100% preserved.</p>
                        </div>

                        {/* Garment Uploader */}
                        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center text-teal">
                                    <Shirt size={16} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider">Garment Image</h3>
                            </div>
                            
                            <label className="relative block h-64 border-2 border-dashed border-white/10 rounded-2xl hover:border-teal/50 transition-colors cursor-pointer group/label overflow-hidden">
                                {garmentImage ? (
                                    <>
                                        <img src={garmentImage} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover/label:opacity-100 transition-opacity flex items-center justify-center">
                                            <RefreshCcw className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                                        <Upload size={32} />
                                        <span className="text-xs font-bold uppercase">Upload Garment</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'garment')} />
                            </label>
                            <p className="text-[10px] text-slate-500 mt-4 italic">Textures and stitching details will be maintained.</p>
                        </div>
                    </div>

                    {/* Middle Grid: Action & Logic */}
                    <div className="flex flex-col items-center justify-center h-full py-12 gap-8 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-teal flex items-center justify-center text-white shadow-2xl relative">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20" />
                            <Wand2 size={32} />
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-serif font-bold italic lowercase">processing...</h3>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500">Cyber-Luxe Integration</span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500">Seamless Edge Detection</span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500">Physics Alignment</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleTryOn}
                            disabled={isGenerating || !subjectImage || !garmentImage}
                            className="w-full py-6 bg-teal text-white rounded-2xl font-bold teal-glow hover:scale-[1.02] active:scale-95 disabled:grayscale disabled:opacity-50 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <AnimatePresence mode="wait">
                                {isGenerating ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <RefreshCcw className="animate-spin" size={18} />
                                        Rendering 8K Masterpiece...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Sparkles size={18} />
                                        Launch AI Swap
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {/* Scanning line effect */}
                            {isGenerating && (
                                <motion.div 
                                    className="absolute inset-0 bg-white/10"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                />
                            )}
                        </button>
                        
                        <div className="flex items-center gap-2 text-slate-500">
                            <Info size={14} />
                            <span className="text-[10px] font-bold uppercase">Estimated time: 15-30 seconds</span>
                        </div>
                    </div>

                    {/* Right Grid: Result */}
                    <div className="bg-white/5 p-6 rounded-[2.5rem] border border-teal/20 relative overflow-hidden group min-h-[600px] flex flex-col h-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center text-teal">
                                    <Sparkles size={16} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider">AI Render Output</h3>
                            </div>
                            {resultImage && (
                                <a href={resultImage} download="vantage-tryon.png" className="p-2 hover:text-teal transition-colors">
                                    <Download size={18} />
                                </a>
                            )}
                        </div>

                        <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/5 bg-dark/50 flex items-center justify-center">
                            {resultImage ? (
                                <motion.img 
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    src={resultImage} 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="text-center p-12">
                                    <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-neon-purple animate-spin mx-auto mb-6 opacity-20" />
                                    <p className="text-xs text-slate-500 italic uppercase tracking-widest">Waiting for simulation...</p>
                                </div>
                            )}
                            
                            {/* Grid overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                            <p className="text-[10px] text-neon-purple font-bold uppercase mb-2">Technical Report</p>
                            <p className="text-[11px] text-slate-400 italic">"Edge-preserving blending applied. Dynamic lighting recalculated for Cyber-Luxe environment."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
