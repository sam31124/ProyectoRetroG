const pool = require('./src/config/db');

const syncAssets = async () => {
  try {
    console.log("🚀 Sincronizando base de datos con tus imágenes...");

    // 1. Arreglar Nintendo 64 (Usando tu archivo n64.avif)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = '/assets/products/n64.avif' 
      WHERE nombre ILIKE '%Nintendo 64%';
    `);

    // 2. Insertar las otras consolas que tienes en la carpeta (Si no existen)
    // NES
    await pool.query(`
      INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id)
      SELECT 'Nintendo NES', 79.99, 3, '/assets/products/nes.jpg', 1
      WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Nintendo NES');
    `);

    // SNES
    await pool.query(`
      INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id)
      SELECT 'Super Nintendo', 99.99, 4, '/assets/products/snes.jpg', 1
      WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Super Nintendo');
    `);

    // Wii
    await pool.query(`
      INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id)
      SELECT 'Nintendo Wii', 59.99, 10, '/assets/products/wii.png', 1
      WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Nintendo Wii');
    `);

    // Virtual Boy
    await pool.query(`
      INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id)
      SELECT 'Virtual Boy', 150.00, 1, '/assets/products/vb.png', 1
      WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Virtual Boy');
    `);

    console.log("✅ ¡Tienda actualizada con tus fotos locales!");
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
};

syncAssets();
