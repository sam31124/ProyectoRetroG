const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express'); // Importar Swagger UI
const swaggerSpecs = require('./src/config/swagger'); // Importar Configuración


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// --- RUTAS ---
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/productos', require('./src/routes/productoRoutes')); // <--- ESTA ERA LA QUE FALTABA

// --- DOCUMENTACIÓN SWAGGER (Requisito Rúbrica) ---
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Funcionando correctamente 🚀. Ve a /api-docs para ver la documentación.');
});

// Arrancar Servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});