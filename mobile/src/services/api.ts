import axios from 'axios';

// Use local IP for Android emulator (10.0.2.2) or machine IP for physical device
// Replace with your machine's local IP address, e.g., http://192.168.1.5:3000/api/v1
const API_URL = 'http://10.0.2.2:3000/api/v1';

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
