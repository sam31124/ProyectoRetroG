const pool = require('./src/config/db');

const fixImages = async () => {
  try {
    console.log("🎨 Reparando imágenes...");

    // Nintendo 64 (Foto de Wikimedia Commons)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/N64-Console-Set.jpg/640px-N64-Console-Set.jpg' 
      WHERE nombre ILIKE '%Nintendo 64%';
    `);

    // Mario 64 (Cartucho de Wikimedia Commons)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Super_Mario_64_cartridge.jpg/640px-Super_Mario_64_cartridge.jpg' 
      WHERE nombre ILIKE '%Super Mario%';
    `);

    console.log("✅ Imágenes reparadas. ¡Listo!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

fixImages();
