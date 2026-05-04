import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './src/lib/db';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'gurucraft-secret-key-123';
const ADMIN_EMAIL = 'annudhaneja@gmail.com';
const DEFAULT_PASSWORD = 'admin123'; // User should change this

async function startServer() {
    const app = express();
    const PORT = 3000;

    app.use(cors());
    app.use(express.json());

    // --- API Routes ---

    // Auth
    app.post('/api/auth/signup', async (req, res) => {
        const { email, password } = req.body;
        if (db.findByEmail(email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: uuidv4(), email, password: hashedPassword, role: 'CLIENT' };
        db.upsert('users', user);
        
        const token = jwt.sign({ id: user.id, role: 'CLIENT' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { email: user.email, role: 'CLIENT' } });
    });

    app.post('/api/auth/login', async (req, res) => {
        const { email, password } = req.body;
        
        // Owner 1 Access
        if (email === 'owner1@gurucraftpro.com' && password === 'guruji55') {
            const token = jwt.sign({ email, role: 'OWNER_SUPER' }, JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, user: { email, role: 'OWNER_SUPER', name: 'Annu Dhaneja' } });
        }
        
        // Owner 2 Access
        if (email === 'owner2@gurucraftpro.com' && password === 'tech45') {
            const token = jwt.sign({ email, role: 'OWNER_TECH' }, JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, user: { email, role: 'OWNER_TECH', name: 'Tech Lead' } });
        }

        const user = db.findByEmail(email);
        if (!user) return res.status(401).json({ error: 'Identity not found' });
        
        const isValid = await bcrypt.compare(password, user.password!);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: 'CLIENT' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { email: user.email, role: 'CLIENT' } });
    });

    // CRM / Contact Routing
    app.post('/api/contact', (req, res) => {
        const { name, email, subject, message } = req.body;
        const lead = { id: uuidv4(), name, email, subject, message, status: 'new', createdAt: new Date().toISOString() };
        
        // Internal Routing Simulation
        const routeTo = subject === 'Business Partnership' ? 'OWNER_SUPER' : 'OWNER_TECH';
        console.log(`[CRM] Lead routed to ${routeTo}:`, lead);
        
        // Save to DB
        db.upsert('orders', lead as any); // Reusing orders as general activity for now
        res.status(200).json({ success: true, routedTo: routeTo });
    });

    // Public Products & Services
    app.get('/api/products', (req, res) => res.json(db.get('products')));
    app.get('/api/services', (req, res) => res.json(db.get('services')));

    // Admin Protected Routes (Simple middleware)
    const authenticate = (req: any, res: any, next: any) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token' });
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };

    app.post('/api/admin/products', authenticate, (req, res) => {
        const product = { ...req.body, id: uuidv4() };
        db.upsert('products', product);
        res.json(product);
    });

    app.delete('/api/admin/products/:id', authenticate, (req, res) => {
        db.delete('products', req.params.id);
        res.sendStatus(200);
    });

    app.get('/api/admin/orders', authenticate, (req, res) => {
        res.json(db.get('orders'));
    });

    app.post('/api/admin/services', authenticate, (req, res) => {
        const service = { ...req.body, id: uuidv4() };
        db.upsert('services', service);
        res.json(service);
    });

    app.delete('/api/admin/services/:id', authenticate, (req, res) => {
        db.delete('services', req.params.id);
        res.sendStatus(200);
    });

    app.post('/api/admin/templates', authenticate, (req, res) => {
        const template = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString() };
        db.upsert('templates', template);
        res.json(template);
    });

    app.get('/api/templates', (req, res) => {
        res.json(db.get('templates'));
    });

    // --- Vite Middleware ---
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Gurucraftpro server running on http://localhost:${PORT}`);
    });
}

startServer();
