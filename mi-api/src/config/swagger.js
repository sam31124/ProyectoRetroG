const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tienda Retro - Grupo G',
      version: '1.0.0',
      description: 'Documentación Oficial para Evaluación 3',
    },
    servers: [
      {
        url: 'http://52.7.131.177:4000', // Tu IP Pública
        description: 'Servidor AWS EC2',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
    
    // 👇 DEFINICIÓN MANUAL COMPLETA (CRUD)
    paths: {
      "/api/productos": {
        "get": {
          "summary": "Listar todos los productos",
          "tags": ["Productos"],
          "responses": { "200": { "description": "Lista obtenida correctamente" } }
        },
        "post": {
          "summary": "Crear producto nuevo",
          "tags": ["Productos"],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nombre": { "type": "string", "example": "Sega Genesis" },
                    "precio": { "type": "number", "example": 50000 },
                    "stock": { "type": "integer", "example": 10 },
                    "imagen_url": { "type": "string", "example": "http://imagen.com/foto.jpg" }
                  }
                }
              }
            }
          },
          "responses": { "201": { "description": "Producto creado" } }
        }
      },
      "/api/productos/{id}": {
        "put": {
          "summary": "Actualizar producto existente",
          "tags": ["Productos"],
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "ID del producto" }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nombre": { "type": "string" },
                    "precio": { "type": "number" },
                    "stock": { "type": "integer" }
                  }
                }
              }
            }
          },
          "responses": { "200": { "description": "Producto actualizado" } }
        },
        "delete": {
          "summary": "Eliminar producto",
          "tags": ["Productos"],
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "ID del producto a eliminar" }
          ],
          "responses": { "200": { "description": "Producto eliminado" } }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "Iniciar sesión (Obtener Token)",
          "tags": ["Autenticación"],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": { "type": "string", "example": "admin@tienda.com" },
                    "password": { "type": "string", "example": "123456" }
                  }
                }
              }
            }
          },
          "responses": { "200": { "description": "Login exitoso" } }
        }
      }
    }
  },
  apis: [], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;