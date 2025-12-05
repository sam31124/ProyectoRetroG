import api from './AxiosConfig'; // Reutilizamos la config base

class AuthService {
    
    // Iniciar Sesión
    async login(usuario, password) {
        // La ruta completa será: http://18.204.17.94:4000/api/auth/login
        const response = await api.post('/auth/login', { email: usuario, password });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // También guardamos el usuario para mostrar el nombre
            localStorage.setItem('usuarioActivo', JSON.stringify(response.data.user));
        }
        return response.data;
    }

    // Cerrar Sesión
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioActivo');
        window.location.href = "/";
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('usuarioActivo'));
    }
}

export default new AuthService();