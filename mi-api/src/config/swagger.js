const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tienda Retro - Grupo G',
      version: '1.0.0',
      description: 'Documentación de API para Evaluación 3',
    },
    servers: [
      {
        // Esto usa tu puerto 4000 automáticamente
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Aquí le decimos dónde buscar los comentarios para documentar
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;
