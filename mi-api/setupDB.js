const pool = require('./src/config/db');
const bcrypt = require('bcryptjs');

const setupDatabase = async () => {
  try {
    console.log("🔄 Creando tablas según Rúbrica (Figura 1)...");

    // Borrar todo para empezar de cero
    await pool.query('DROP TABLE IF EXISTS detalle_boleta CASCADE');
    await pool.query('DROP TABLE IF EXISTS boletas CASCADE');
    await pool.query('DROP TABLE IF EXISTS productos CASCADE');
    await pool.query('DROP TABLE IF EXISTS categorias CASCADE');
    await pool.query('DROP TABLE IF EXISTS usuarios CASCADE');

    // 1. Tabla USUARIOS (Con Rol)
    await pool.query(`
      CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(20) CHECK (rol IN ('admin', 'vendedor', 'cliente')) NOT NULL
      );
    `);

    // 2. Tabla CATEGORIAS
    await pool.query(`
      CREATE TABLE categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL
      );
    `);

    // 3. Tabla PRODUCTOS
    await pool.query(`
      CREATE TABLE productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        imagen_url VARCHAR(255),
        categoria_id INTEGER REFERENCES categorias(id)
      );
    `);

    // 4. Tabla BOLETAS
    await pool.query(`
      CREATE TABLE boletas (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total DECIMAL(10, 2) NOT NULL,
        estado VARCHAR(20) DEFAULT 'emitida'
      );
    `);

    // 5. Tabla DETALLE_BOLETA
    await pool.query(`
      CREATE TABLE detalle_boleta (
        id SERIAL PRIMARY KEY,
        boleta_id INTEGER REFERENCES boletas(id),
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER NOT NULL,
        precio_unitario DECIMAL(10, 2) NOT NULL
      );
    `);

    // --- DATOS DE EJEMPLO (SEED) ---
    const passwordHash = await bcrypt.hash('123456', 10);

    // Crear 3 Usuarios: Admin, Vendedor, Cliente
    await pool.query(`
      INSERT INTO usuarios (nombre, email, password, rol) VALUES
      ('Jefe Admin', 'admin@tienda.com', $1, 'admin'),
      ('Vendedor 1', 'vendedor@tienda.com', $1, 'vendedor'),
      ('Cliente 1', 'cliente@tienda.com', $1, 'cliente');
    `, [passwordHash]);

    // Crear Categorías
    await pool.query("INSERT INTO categorias (nombre) VALUES ('Consolas'), ('Juegos')");

    // Crear Productos
    await pool.query(`
      INSERT INTO productos (nombre, precio, stock, imagen_url, categoria_id) VALUES
      ('Nintendo 64', 120.00, 5, 'n64.jpg', 1),
      ('Super Mario 64', 45.00, 10, 'mario.jpg', 2);
    `);

    console.log("✅ ¡Base de datos creada exitosamente!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

setupDatabase();
