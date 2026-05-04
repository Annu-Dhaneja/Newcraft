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

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    text: string;
    rating: number;
}
