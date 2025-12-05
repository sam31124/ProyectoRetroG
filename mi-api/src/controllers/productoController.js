const ProductoModel = require('../models/ProductoModel');

exports.getProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await ProductoModel.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const nuevo = await ProductoModel.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    await ProductoModel.delete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
