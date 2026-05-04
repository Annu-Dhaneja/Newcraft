import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Trash2, Sparkles } from 'lucide-react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function SadhanaTracker() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', text: 'Morning Meditation (4:00 AM)', completed: false },
        { id: '2', text: 'Chanting Guru Mantra (108 times)', completed: true },
        { id: '3', text: 'Offer fresh flowers to Guruji', completed: false },
    ]);
    const [newTask, setNewTask] = useState('');

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const task: Task = {
            id: Date.now().toString(),
            text: newTask,
            completed: false
        };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return (
        <section className="py-24 bg-darker selection:bg-neon-purple/30">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 glass border-gold/20 rounded-full mb-6"
                    >
                        <Sparkles size={14} className="text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Divine Discipline</span>
                    </motion.div>
                    <h2 className="text-5xl font-serif font-bold italic text-foreground mb-4">Sadhana <span className="text-teal">Tracker</span></h2>
                    <p className="text-muted italic">Organize your spiritual journey with neural precision.</p>
                </div>

                <div className="glass border-border rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <form onSubmit={addTask} className="relative flex gap-4 mb-12">
                        <input 
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Divine intention for today..."
                            className="flex-1 bg-dark/40 border border-border rounded-2xl px-6 py-4 text-foreground placeholder:text-slate-600 focus:border-teal/50 focus:outline-none transition-all font-serif italic"
                        />
                        <button 
                            type="submit"
                            className="bg-teal text-dark p-4 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-teal/20"
                        >
                            <Plus size={24} />
                        </button>
                    </form>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all ${
                                        task.completed 
                                            ? 'bg-teal/5 border-teal/20' 
                                            : 'bg-dark/40 border-border hover:border-slate-800'
                                    }`}
                                >
                                    <button 
                                        onClick={() => toggleTask(task.id)}
                                        className={`relative w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                                            task.completed 
                                                ? 'bg-teal border-teal' 
                                                : 'bg-transparent border-slate-700 hover:border-teal/50'
                                        }`}
                                    >
                                        <AnimatePresence>
                                            {task.completed && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                                                    transition={{ 
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 20
                                                    }}
                                                >
                                                    <Check size={18} className="text-dark font-bold" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        {/* Particle burst effect on completion */}
                                        {task.completed && (
                                            <motion.div 
                                                initial={{ scale: 0, opacity: 1, outline: "0px solid #2dd4bf" }}
                                                animate={{ scale: 2.5, opacity: 0, outline: "4px solid #2dd4bf" }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                className="absolute inset-0 bg-teal/20 rounded-xl"
                                            />
                                        )}
                                    </button>

                                    <span className={`flex-1 text-lg font-serif italic transition-all ${
                                        task.completed ? 'text-slate-500 line-through' : 'text-foreground'
                                    }`}>
                                        {task.text}
                                    </span>

                                    <button 
                                        onClick={() => deleteTask(task.id)}
                                        className="opacity-0 group-hover:opacity-100 p-3 text-slate-700 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {tasks.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-600 italic">No intentions set for this cycle.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
