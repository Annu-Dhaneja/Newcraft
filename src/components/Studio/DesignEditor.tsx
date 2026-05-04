import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { 
    Type, 
    Image as ImageIcon, 
    Square, 
    Circle, 
    Diamond, 
    Download, 
    Undo, 
    Redo, 
    Trash2, 
    Layers,
    Plus,
    Palette,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    ChevronUp,
    ChevronDown,
    ArrowUpToLine,
    ArrowDownToLine
} from 'lucide-react';

export default function DesignEditor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
    const [layers, setLayers] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const updateLayers = (fabricCanvas: fabric.Canvas) => {
        const objects = fabricCanvas.getObjects().slice().reverse();
        setLayers(objects.map((obj: any) => {
            if (!obj.id) obj.id = Math.random().toString(36).substr(2, 9);
            return {
                id: obj.id,
                type: obj.type,
                name: obj.customName || (obj.type === 'i-text' ? obj.text : obj.type.replace('i-text', 'Text').replace('rect', 'Shape').replace('circle', 'Circle')),
                locked: !!obj.lockMovementX,
                visible: obj.visible,
                ref: obj
            };
        }));
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
        });

        // Set up event listeners for layer updates
        const events = ['object:added', 'object:removed', 'object:modified', 'object:rotating', 'object:scaling', 'text:changed'];
        events.forEach(event => {
            fabricCanvas.on(event, () => updateLayers(fabricCanvas));
        });

        // Responsive handling
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width } = entry.contentRect;
                window.requestAnimationFrame(() => {
                    const scale = Math.min(width / 800, 1);
                    fabricCanvas.setZoom(scale);
                    fabricCanvas.setDimensions({
                        width: 800 * scale,
                        height: 600 * scale
                    });
                    fabricCanvas.renderAll();
                });
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        fabricCanvas.on('selection:created', (e) => {
            setActiveObject(e.target || null);
            updateLayers(fabricCanvas);
        });
        fabricCanvas.on('selection:updated', (e) => {
            setActiveObject(e.target || null);
            updateLayers(fabricCanvas);
        });
        fabricCanvas.on('selection:cleared', () => {
            setActiveObject(null);
            updateLayers(fabricCanvas);
        });

        setCanvas(fabricCanvas);

        return () => {
            fabricCanvas.dispose();
            observer.disconnect();
        };
    }, []);

    const addText = () => {
        if (!canvas) return;
        const text = new fabric.IText('Double click to edit', {
            left: 100,
            top: 100,
            fontFamily: 'Outfit',
            fontSize: 40,
            fill: '#333333'
        });
        canvas.add(text);
        canvas.setActiveObject(text);
    };

    const addRect = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: '#7c3aed',
            width: 100,
            height: 100,
            rx: 10,
            ry: 10
        });
        canvas.add(rect);
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: '#14b8a6',
            radius: 50
        });
        canvas.add(circle);
    };

    const deleteSelected = () => {
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) {
            canvas.remove(active);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
    };

    const exportImage = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2 // High res export
        });
        const link = document.createElement('a');
        link.download = 'gurucraftpro-design.png';
        link.href = dataURL;
        link.click();
    };

    const changeColor = (color: string) => {
        if (!canvas || !activeObject) return;
        activeObject.set('fill', color);
        canvas.requestRenderAll();
    };

    const moveLayer = (direction: 'up' | 'down' | 'top' | 'bottom') => {
        if (!canvas || !activeObject) return;
        switch (direction) {
            case 'up': canvas.bringForward(activeObject); break;
            case 'down': canvas.sendBackwards(activeObject); break;
            case 'top': canvas.bringToFront(activeObject); break;
            case 'bottom': canvas.sendToBack(activeObject); break;
        }
        canvas.requestRenderAll();
        updateLayers(canvas);
    };

    const toggleLock = (obj: any) => {
        const isLocked = !obj.lockMovementX;
        obj.set({
            lockMovementX: isLocked,
            lockMovementY: isLocked,
            lockRotation: isLocked,
            lockScalingX: isLocked,
            lockScalingY: isLocked,
            editable: !isLocked,
            hasControls: !isLocked
        });
        if (isLocked) canvas?.discardActiveObject();
        canvas?.requestRenderAll();
        if (canvas) updateLayers(canvas);
    };

    const toggleVisibility = (obj: any) => {
        obj.set('visible', !obj.visible);
        canvas?.requestRenderAll();
        if (canvas) updateLayers(canvas);
    };

    const selectFromPanel = (obj: any) => {
        if (obj.visible && !obj.lockMovementX) {
            canvas?.setActiveObject(obj);
            canvas?.requestRenderAll();
        }
    };

    const startEditing = (e: React.MouseEvent, layer: any) => {
        e.stopPropagation();
        setEditingId(layer.id);
        setEditValue(layer.name);
    };

    const saveRename = () => {
        if (!editingId || !canvas) return;
        const layer = layers.find(l => l.id === editingId);
        if (layer && layer.ref) {
            layer.ref.set('customName', editValue);
            if (layer.ref.type === 'i-text') {
                layer.ref.set('text', editValue);
            }
            canvas.requestRenderAll();
            updateLayers(canvas);
        }
        setEditingId(null);
    };

    return (
        <section id="studio" className="py-24 px-4 bg-darker">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-4">Design <span className="text-neon-purple">Studio</span></h2>
                    <p className="text-slate-400">Create your own masterpieces with our built-in Canva-style editor.</p>
                </div>

                <div className="grid lg:grid-cols-[300px_1fr_300px] gap-6 bg-dark p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <h3 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Elements</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={addText} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-neon-purple/20 border border-white/5 transition-all group">
                                    <Type size={20} className="group-hover:text-neon-purple transition-colors" />
                                    <span className="text-[10px] font-bold uppercase">Text</span>
                                </button>
                                <button onClick={addRect} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-teal/20 border border-white/5 transition-all group">
                                    <Square size={20} className="group-hover:text-teal transition-colors" />
                                    <span className="text-[10px] font-bold uppercase">Shape</span>
                                </button>
                                <button onClick={addCircle} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-teal/20 border border-white/5 transition-all group">
                                    <Circle size={20} className="group-hover:text-teal transition-colors" />
                                    <span className="text-[10px] font-bold uppercase">Circle</span>
                                </button>
                                <label className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer group">
                                    <ImageIcon size={20} className="group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-bold uppercase">Upload</span>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file || !canvas) return;
                                            const reader = new FileReader();
                                            reader.onload = (val) => {
                                                const data = val.target?.result as string;
                                                fabric.Image.fromURL(data, (img) => {
                                                    img.scaleToWidth(200);
                                                    img.set({
                                                        left: 100,
                                                        top: 100,
                                                        cornerColor: '#14b8a6',
                                                        transparentCorners: false,
                                                    });
                                                    canvas.add(img);
                                                    canvas.setActiveObject(img);
                                                    updateLayers(canvas);
                                                });
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {activeObject && (
                            <div className="bg-white/5 p-4 rounded-2xl border border-teal/30">
                                <h3 className="text-sm font-bold uppercase text-teal mb-4 tracking-wider">Controls</h3>
                                
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    <button onClick={() => moveLayer('top')} className="p-2 bg-white/5 rounded-lg hover:bg-teal/20 transition-all border border-white/5" title="Bring to Front">
                                        <ArrowUpToLine size={16} />
                                    </button>
                                    <button onClick={() => moveLayer('up')} className="p-2 bg-white/5 rounded-lg hover:bg-teal/20 transition-all border border-white/5" title="Bring Forward">
                                        <ChevronUp size={16} />
                                    </button>
                                    <button onClick={() => moveLayer('down')} className="p-2 bg-white/5 rounded-lg hover:bg-teal/20 transition-all border border-white/5" title="Send Backward">
                                        <ChevronDown size={16} />
                                    </button>
                                    <button onClick={() => moveLayer('bottom')} className="p-2 bg-white/5 rounded-lg hover:bg-teal/20 transition-all border border-white/5" title="Send to Back">
                                        <ArrowDownToLine size={16} />
                                    </button>
                                </div>

                                <div className="bg-white/5 p-3 rounded-xl mb-6">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-3 ml-1">Color Palette</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['#7c3aed', '#14b8a6', '#ffffff', '#000000', '#f43f5e', '#fbbf24', '#0ea5e9'].map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => changeColor(c)}
                                                className="w-6 h-6 rounded-full border border-white/20 shrink-0 hover:scale-110 transition-transform shadow-lg"
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button onClick={deleteSelected} className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all font-bold">
                                    <Trash2 size={16} />
                                    Delete Layer
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Canvas Area */}
                    <div ref={containerRef} className="bg-slate-200 rounded-3xl relative overflow-hidden min-h-[500px] flex items-center justify-center shadow-inner group">
                        <div className="absolute top-4 left-4 flex gap-2 z-20">
                            <div className="bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 flex items-center gap-2 uppercase">
                                <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                                Interactive Canvas
                            </div>
                        </div>
                        
                        <div className="relative group/canvas">
                            <canvas ref={canvasRef} />
                        </div>
                        
                        {!canvas && <p className="text-slate-500 font-bold animate-pulse">Initializing Studio...</p>}
                    </div>

                    {/* Layers Panel */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pl-2 border-l border-white/5">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                                    <Layers size={14} className="text-neon-purple" />
                                    Layers ({layers.length})
                                </h3>
                            </div>

                            <div className="space-y-2 flex-1">
                                {layers.length === 0 ? (
                                    <div className="text-center py-10 opacity-30">
                                        <p className="text-xs italic">No layers yet</p>
                                    </div>
                                ) : (
                                    layers.map((layer) => (
                                        <div 
                                            key={layer.id}
                                            onClick={() => selectFromPanel(layer.ref)}
                                            className={`group/layer flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeObject === layer.ref ? 'bg-teal/20 border-teal/50' : 'hover:bg-white/5 border-transparent'}`}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/layer:border-teal/30 overflow-hidden">
                                                {layer.type === 'i-text' ? <Type size={14} /> : 
                                                 layer.type === 'rect' ? <Square size={14} /> : 
                                                 layer.type === 'circle' ? <Circle size={14} /> :
                                                 layer.ref.getSrc ? <img src={layer.ref.getSrc()} className="w-full h-full object-cover" /> :
                                                 <ImageIcon size={14} />}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                {editingId === layer.id ? (
                                                    <input
                                                        autoFocus
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onBlur={saveRename}
                                                        onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full bg-dark/50 border border-teal/50 rounded px-1 py-0.5 text-[11px] font-bold focus:outline-none"
                                                    />
                                                ) : (
                                                    <p 
                                                        className="text-[11px] font-bold truncate hover:text-teal transition-colors"
                                                        onClick={(e) => startEditing(e, layer)}
                                                    >
                                                        {layer.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-1 opacity-0 group-hover/layer:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.ref); }}
                                                    className={`p-1.5 rounded-lg transition-colors ${layer.visible ? 'hover:text-teal' : 'text-slate-500'}`}
                                                >
                                                    {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); toggleLock(layer.ref); }}
                                                    className={`p-1.5 rounded-lg transition-colors ${layer.locked ? 'text-neon-purple' : 'hover:text-neon-purple text-slate-500'}`}
                                                >
                                                    {layer.locked ? <Lock size={12} /> : <Unlock size={12} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10">
                                <button 
                                    onClick={exportImage}
                                    className="w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg teal-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    <Download size={18} />
                                    Export Work
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
