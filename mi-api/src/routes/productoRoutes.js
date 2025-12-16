const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController'); // Importamos el cerebro
const authMiddleware = require('../middleware/authMiddleware'); // Importamos la seguridad

// --- RUTAS PÚBLICAS (Cualquiera puede ver) ---

// 1. Obtener todos los productos (ESTA ES LA QUE FALLABA)
// Antes tenías: res.json({mensaje...}) -> ESO ESTABA MAL
router.get('/', productoController.getAllProductos);

// 2. Obtener un producto por ID
router.get('/:id', productoController.getProductoById);


// --- RUTAS PRIVADAS (Solo Admin/Vendedor con Token) ---

// 3. Crear producto (Protegido)
router.post('/', authMiddleware, productoController.createProducto);

// 4. Actualizar producto (Protegido)
router.put('/:id', authMiddleware, productoController.updateProducto);

// 5. Eliminar producto (Protegido)
router.delete('/:id', authMiddleware, productoController.deleteProducto);

module.exports = router;