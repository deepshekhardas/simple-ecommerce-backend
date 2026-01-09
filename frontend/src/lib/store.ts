import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from './api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { name: string; email: string; password: string; phone: string }) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                const response = await api.post('/auth/login', { email, password });
                const { token, data } = response.data;
                localStorage.setItem('token', token);
                set({ user: data.user, token, isAuthenticated: true });
            },

            register: async (data) => {
                const response = await api.post('/auth/signup', data);
                const { token, data: userData } = response.data;
                localStorage.setItem('token', token);
                set({ user: userData.user, token, isAuthenticated: true });
            },

            logout: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                set({ user: null, token: null, isAuthenticated: false });
            },

            checkAuth: () => {
                const token = localStorage.getItem('token');
                const userStr = localStorage.getItem('user');
                if (token && userStr) {
                    set({ token, user: JSON.parse(userStr), isAuthenticated: true });
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

interface CartItem {
    product: any;
    quantity: number;
    variant?: { size?: string; color?: string };
    price: number;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
    addItem: (item: CartItem) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            totalAmount: 0,

            addItem: (item: CartItem) => set((state) => {
                const existingIndex = state.items.findIndex(i => i.product._id === item.product._id);
                let newItems;
                if (existingIndex >= 0) {
                    newItems = [...state.items];
                    newItems[existingIndex].quantity += item.quantity;
                } else {
                    newItems = [...state.items, item];
                }
                const total = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                return { items: newItems, totalAmount: total };
            }),

            removeItem: (productId) => set((state) => {
                const newItems = state.items.filter(i => i.product._id !== productId);
                const total = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                return { items: newItems, totalAmount: total };
            }),

            updateQuantity: (productId, quantity) => set((state) => {
                const newItems = state.items.map(i =>
                    i.product._id === productId ? { ...i, quantity } : i
                );
                const total = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                return { items: newItems, totalAmount: total };
            }),

            clearCart: () => set({ items: [], totalAmount: 0 }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
