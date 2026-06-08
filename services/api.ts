import axios from 'axios';

// Creamos una instancia centralizada de Axios
export const api = axios.create({
    // TODO: Cambia este puerto por el que usa tu API en .NET al hacer 'dotnet run'
    baseURL: 'http://localhost:5002/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Antes de que salga cualquier petición, le inyectamos el Token JWT si existe
api.interceptors.request.use((config) => {
    // En Next.js (lado del cliente), leemos el token de localStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken')?.trim();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});