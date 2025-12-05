const pool = require('../config/db');

class ProductoModel {
  async findAll() {
    const result = await pool.query('SELECT * FROM productos');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(producto) {
    // Ajustado para aceptar nombre en español o inglés
    const { nombre, name, precio, price, stock, imagen_url, image, categoria_id } = producto;
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre || name, precio || price, stock || 0, imagen_url || image, categoria_id || 1]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    return { message: 'Producto eliminado' };
  }
}

module.exports = new ProductoModel();
