export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    category: string;
    tags: string[];
    images: string[];
    variants: {
        size?: string;
        color?: string;
        stock: number;
    }[];
    stock: number;
    averageRating: number;
    numOfReviews: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
    variant?: { size?: string; color?: string };
    price: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface Order {
    _id: string;
    items: {
        product: string;
        name: string;
        price: number;
        quantity: number;
        variant?: { size?: string; color?: string };
    }[];
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    paymentInfo?: {
        id: string;
        status: string;
    };
    tax: number;
    shippingCharges: number;
    subtotal: number;
    total: number;
    status: string;
    isPaid?: boolean; // Backend might not send this directly in top level if it depends on status, but keeping for safety if used elsewhere
    isDelivered?: boolean;
    createdAt: string;
    user: User;
}
