import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { 
    Square, 
    Circle, 
    Type, 
    Image as ImageIcon, 
    Trash2, 
    Download, 
    Layers, 
    ChevronUp, 
    ChevronDown,
    Palette,
    Maximize,
    Save,
    Undo,
    Redo
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CanvasEditor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    useEffect(() => {
        if (!canvasRef.current) return;

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#111',
        });

        fabricCanvas.on('selection:created', (e) => setSelectedObject(e.selected?.[0] || null));
        fabricCanvas.on('selection:updated', (e) => setSelectedObject(e.selected?.[0] || null));
        fabricCanvas.on('selection:cleared', () => setSelectedObject(null));
        fabricCanvas.on('object:modified', saveHistory);
        fabricCanvas.on('object:added', saveHistory);

        setCanvas(fabricCanvas);

        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    const saveHistory = () => {
        if (!canvas) return;
        const json = JSON.stringify(canvas.toJSON());
        setHistory(prev => [...prev.slice(0, historyIndex + 1), json]);
        setHistoryIndex(prev => prev + 1);
    };

    const addRect = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: '#2dd4bf',
            width: 100,
            height: 100,
            cornerColor: '#ffffff',
            cornerSize: 8,
            transparentCorners: false
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            left: 150,
            top: 150,
            fill: '#a855f7',
            radius: 50,
            cornerColor: '#ffffff'
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
    };

    const addText = () => {
        if (!canvas) return;
        const text = new fabric.IText('Double click to edit', {
            left: 200,
            top: 200,
            fontFamily: 'Inter',
            fill: '#ffffff',
            fontSize: 40
        });
        canvas.add(text);
        canvas.setActiveObject(text);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !canvas) return;

        const reader = new FileReader();
        reader.onload = (f) => {
            const data = f.target?.result as string;
            fabric.Image.fromURL(data, (img) => {
                img.scaleToWidth(400);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.centerObject(img);
            });
        };
        reader.readAsDataURL(file);
    };

    const deleteObject = () => {
        if (!canvas || !selectedObject) return;
        canvas.remove(selectedObject);
        setSelectedObject(null);
    };

    const bringForward = () => {
        if (!canvas || !selectedObject) return;
        canvas.bringForward(selectedObject);
    };

    const sendBackward = () => {
        if (!canvas || !selectedObject) return;
        canvas.sendBackwards(selectedObject);
    };

    const downloadCanvas = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        const link = document.createElement('a');
        link.download = 'gurucraft-design.png';
        link.href = dataURL;
        link.click();
        toast.success('Design synthesized to file');
    };

    const changeColor = (color: string) => {
        if (!canvas || !selectedObject) return;
        selectedObject.set('fill', color);
        canvas.requestRenderAll();
        saveHistory();
    };

    const saveTemplate = async () => {
        if (!canvas) return;
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error('Identity required for template persistence');
            return;
        }

        const template = {
            name: `Design_${Date.now()}`,
            data: canvas.toJSON()
        };

        try {
            await fetch('/api/admin/templates', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(template)
            });
            toast.success('Design encoded to archives');
        } catch (err) {
            toast.error('Encoding failure');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-[calc(100vh-64px)] bg-darker">
            {/* Toolbar */}
            <div className="lg:w-20 bg-dark rounded-3xl border border-white/5 p-4 flex lg:flex-col items-center gap-6 shadow-2xl">
                <button onClick={addRect} className="p-3 hover:bg-teal/20 text-teal rounded-xl transition-all" title="Rectangle">
                    <Square size={24} />
                </button>
                <button onClick={addCircle} className="p-3 hover:bg-neon-purple/20 text-neon-purple rounded-xl transition-all" title="Circle">
                    <Circle size={24} />
                </button>
                <button onClick={addText} className="p-3 hover:bg-white/10 text-white rounded-xl transition-all" title="Text">
                    <Type size={24} />
                </button>
                <label className="p-3 hover:bg-gold/20 text-gold rounded-xl transition-all cursor-pointer" title="Upload Image">
                    <ImageIcon size={24} />
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
                <div className="h-px w-full bg-white/5 hidden lg:block" />
                <button 
                    onClick={deleteObject} 
                    disabled={!selectedObject}
                    className="p-3 hover:bg-red-500/20 text-red-500 rounded-xl transition-all disabled:opacity-20"
                    title="Delete"
                >
                    <Trash2 size={24} />
                </button>
                <button 
                    onClick={downloadCanvas}
                    className="p-3 hover:bg-green-500/20 text-green-500 rounded-xl transition-all mt-auto"
                    title="Download"
                >
                    <Download size={24} />
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between px-6 py-4 bg-dark rounded-2xl border border-white/5 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-teal animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Canva-Luxe Engine v1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Undo size={18} /></button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Redo size={18} /></button>
                        <div className="w-px h-6 bg-white/5 mx-2" />
                        <button onClick={downloadCanvas} className="bg-teal text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest teal-glow hover:scale-105 transition-all">
                            Export High-Res
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-dark rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center p-8 bg-[#0a0a0a] cyber-grid relative shadow-2xl">
                    <div className="shadow-[0_0_100px_rgba(45,212,191,0.05)] border border-white/5 p-1 bg-[#111]">
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            </div>

            {/* Properties Panel */}
            <div className="lg:w-80 space-y-6">
                {selectedObject ? (
                    <div className="bg-dark p-8 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 italic">Transform Protocol</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={bringForward} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl text-[10px] uppercase font-bold hover:bg-white/10 transition-all">
                                    <ChevronUp size={16} /> Bring Up
                                </button>
                                <button onClick={sendBackward} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl text-[10px] uppercase font-bold hover:bg-white/10 transition-all">
                                    <ChevronDown size={16} /> Send Down
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 italic">Color Palette</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {['#2dd4bf', '#a855f7', '#eab308', '#f43f5e', '#ffffff', '#000000', '#3b82f6', '#10b981', '#f97316', '#64748b'].map(color => (
                                    <button 
                                        key={color}
                                        onClick={() => changeColor(color)}
                                        className="w-full aspect-square rounded-lg border border-white/10 transition-transform hover:scale-110"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <button 
                                onClick={saveTemplate}
                                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                <Save size={18} /> Save as Template
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-dark p-8 rounded-[3rem] border border-white/5 h-full flex flex-row lg:flex-col items-center justify-center text-center opacity-40 italic shadow-2xl">
                        <Layers size={48} className="mb-6" />
                        <p className="text-sm uppercase tracking-widest">No Asset Selected</p>
                    </div>
                )}

                <div className="bg-dark p-8 rounded-[3rem] border border-white/5 shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 italic">Global Context</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-500">Workspace</span>
                            <span className="text-white">800 x 600</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-500">Renderer</span>
                            <span className="text-teal">Fabric.js 5.3.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
