import axios from 'axios';

// Production Render Backend URL
const API_URL = 'https://simple-ecommerce-backend-1.onrender.com/api/v1';
// const API_URL = 'http://10.0.2.2:3000/api/v1'; // Local Emulator

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
