const pool = require('./src/config/db');

const updateImages = async () => {
  try {
    console.log("🔄 Actualizando imágenes...");

    // Nintendo 64 (Imagen real de Wikipedia)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/N64-Console-Set.jpg/1200px-N64-Console-Set.jpg' 
      WHERE nombre = 'Nintendo 64';
    `);

    // Mario 64 (Imagen real)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = 'https://upload.wikimedia.org/wikipedia/en/e/e9/Super_Mario_64.png' 
      WHERE nombre = 'Super Mario 64';
    `);

    console.log("✅ Imágenes actualizadas. ¡Recarga tu página!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

updateImages();
