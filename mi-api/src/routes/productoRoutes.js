const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

/**
 * @swagger
 * /api/productos:
 * get:
 * summary: Obtener todos los productos
 * tags: [Productos]
 * responses:
 * 200:
 * description: Lista de productos exitosa
 * post:
 * summary: Crear un producto
 * tags: [Productos]
 * responses:
 * 201:
 * description: Creado exitosamente
 */
router.get('/', productoController.getProductos);
router.post('/', productoController.createProducto);

// Rutas por ID
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProducto); // <--- ¡ESTA ES LA QUE FALTABA!
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
