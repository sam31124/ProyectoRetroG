const pool = require('../config/db');

// 1. OBTENER TODOS
exports.getAllProductos = async (req, res) => {
  try {
    // Consulta real a la base de datos
    const result = await pool.query('SELECT * FROM productos');
    
    // Devolvemos LA LISTA (Array) directamente
    res.json(result.rows); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// 2. OBTENER POR ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. CREAR PRODUCTO (Corregido: Sin descripción y columnas reales)
exports.createProducto = async (req, res) => {
  // Recibimos los datos (Swagger envía imagen_url, nos aseguramos de leerlo bien)
  const { nombre, precio, stock, imagen, imagen_url, categoria, categoria_id } = req.body;

  try {
    // Definimos los valores finales (usando lo que llegue)
    const imagenFinal = imagen_url || imagen;
    const categoriaFinal = categoria_id || categoria || 1; // 1 por defecto si no envían categoría

    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, precio, stock, imagenFinal, categoriaFinal]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al crear:", error.message);
    res.status(500).json({ error: "Error al crear producto: " + error.message });
  }
};

// 4. ELIMINAR
exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. ACTUALIZAR PRODUCTO (Corregido: Sin descripción)
exports.updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, imagen, categoria } = req.body;

    try {
        // 1. Verificar si existe
        const check = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (check.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // 2. Ejecutar UPDATE (Sin la columna descripcion)
        const query = `
            UPDATE productos 
            SET 
                nombre = COALESCE($1, nombre),
                precio = COALESCE($2, precio),
                stock = COALESCE($3, stock),
                imagen_url = COALESCE($4, imagen_url),
                categoria_id = COALESCE($5, categoria_id)
            WHERE id = $6
            RETURNING *;
        `;

        const values = [
            nombre || null, 
            precio || null, 
            stock || null, 
            imagen || null, 
            categoria || null, 
            id
        ];

        const result = await pool.query(query, values);

        res.json({ message: "Producto actualizado", producto: result.rows[0] });

    } catch (error) {
        console.error("❌ Error SQL:", error.message);
        res.status(500).json({ error: "Error al actualizar: " + error.message });
    }
};