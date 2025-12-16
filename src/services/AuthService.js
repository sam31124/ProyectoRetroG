import axios from 'axios'; // 1. Usamos axios directo, no la config

// LA URL COMPLETA Y EXPLICITA (A prueba de fallos)
const API_URL = "http://52.7.131.177:4000/api/auth"; 

class AuthService {
    
    // 1. INICIAR SESIÓN
    async login(usuario, password) {
        console.log("🔵 Intentando login en:", API_URL + '/login');
        
        // Usamos axios.post directo con la dirección completa
        const response = await axios.post(API_URL + '/login', { 
            email: usuario, // Tu backend espera 'email', tu front manda 'correo' -> Aquí lo mapeamos
            password: password 
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuarioActivo', JSON.stringify(response.data.user));
        }
        return response.data;
    }

    // 2. REGISTRAR USUARIO
    async register(nombre, email, password, rol) {
        const response = await axios.post(API_URL + '/register', { 
            nombre, email, password, rol 
        });
        return response.data;
    }

    // 3. LOGOUT
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