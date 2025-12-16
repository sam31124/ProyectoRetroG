const request = require('supertest');
const app = require('../index'); // Importamos tu backend

describe('Pruebas de Integración API Retro-G', () => {
    
    // 1. Prueba de Salud (Health Check)
    it('GET / debería devolver estado 200 y mensaje de bienvenida', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        // Esperamos que contenga la palabra "API"
        expect(res.text).toContain('API'); 
    });

    // 2. Prueba de Documentación
    it('GET /api-docs debería cargar Swagger', async () => {
        // Swagger a veces redirige (301) o carga (200), aceptamos ambos
        const res = await request(app).get('/api-docs/');
        expect(res.statusCode).toBeLessThan(400); 
    });

    // 3. Prueba de Seguridad (Login Fallido)
    it('POST /api/auth/login debería rechazar credenciales falsas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'hacker@falso.com',
                password: 'password_incorrecta'
            });
        
        // Esperamos un 404 (Usuario no encontrado) o 401 (No autorizado)
        // Según tu código actual devuelve 404 si el usuario no existe
        expect(res.statusCode).toEqual(404); 
    });
});