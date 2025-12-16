const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:   <--- CORREGIDO: Agregado /api
 * post:
 * summary: Iniciar sesión
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login exitoso
 * 401:
 * description: Credenciales inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/register:   <--- AGREGADO: Documentación de Registro
 * post:
 * summary: Registrar nuevo usuario
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nombre:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * rol:
 * type: string
 * responses:
 * 201:
 * description: Usuario creado exitosamente
 */
// 👇 ¡ESTA ES LA LÍNEA QUE TE FALTABA!
router.post('/register', authController.register);

module.exports = router;