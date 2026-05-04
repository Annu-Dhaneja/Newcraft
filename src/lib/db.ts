import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface Service {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    whatsappMessage: string;
}

export interface Order {
    id: string;
    userId: string;
    items: any[];
    total: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: string;
}

export interface User {
    id: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
}

interface DB {
    users: User[];
    products: Product[];
    services: Service[];
    orders: Order[];
    templates: any[];
    learningContent: any[];
}

const DEFAULT_DB: DB = {
    users: [
        {
            id: 'admin-1',
            email: 'admin@gurucraftpro.com',
            password: '$2b$10$YourHashedPasswordHere', // Will be updated on first run
            role: 'admin'
        }
    ],
    products: [
        {
            id: 'p1',
            name: 'Guruji Portrait Frame',
            price: 1499,
            description: 'Premium acrylic or canvas frames for your spiritual space.',
            category: 'Art',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'
        }
    ],
    services: [
        {
            id: 's1',
            name: '7 Day Consultation',
            price: 4999,
            description: 'Full digital strategy for your business over 7 days.',
            category: 'Consulting',
            image: 'https://images.unsplash.com/photo-1454165833767-027eeea160d7?auto=format&fit=crop&q=80&w=800',
            whatsappMessage: 'Hi, I want Gurucraftpro 7 Day Consultation'
        },
        {
            id: 's2',
            name: 'WEDDING Planner',
            price: 25000,
            description: 'Digital invites and management for your big day.',
            category: 'Events',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
            whatsappMessage: 'Hi, I need wedding planning services'
        }
    ],
    orders: [],
    templates: [],
    learningContent: []
};

class Database {
    private db: DB;

    constructor() {
        this.db = this.load();
    }

    private load(): DB {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
            return DEFAULT_DB;
        }
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }

    private save() {
        fs.writeFileSync(DB_PATH, JSON.stringify(this.db, null, 2));
    }

    // Generic getters/setters
    get(key: keyof DB) { return this.db[key]; }
    
    upsert(key: keyof DB, item: any) {
        const items = this.db[key] as any[];
        const index = items.findIndex(i => i.id === item.id);
        if (index > -1) items[index] = item;
        else items.push(item);
        this.save();
    }

    delete(key: keyof DB, id: string) {
        const items = this.db[key] as any[];
        this.db[key] = items.filter(i => i.id !== id) as any;
        this.save();
    }

    findByEmail(email: string) {
        return this.db.users.find(u => u.email === email);
    }
}

export const db = new Database();
