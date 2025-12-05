import axios from 'axios';

// APUNTA AL PUERTO 4000 (Donde vive tu Backend)
const BASE_URL = 'http://18.204.17.94:4000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el Token automáticamente (Requisito Rúbrica)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;