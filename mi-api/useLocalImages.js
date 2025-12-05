const pool = require('./src/config/db');

const useLocalImages = async () => {
  try {
    console.log("📁 Cambiando a imágenes locales...");

    // Nintendo 64 (Asumiendo que la foto se llama 'n64_real.jpg' en public/assets)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = '/assets/n64_real.jpg' 
      WHERE nombre ILIKE '%Nintendo 64%';
    `);

    // Mario 64 (Asumiendo que la foto se llama 'mario_real.jpg' en public/assets)
    await pool.query(`
      UPDATE productos 
      SET imagen_url = '/assets/mario64.png' 
      WHERE nombre ILIKE '%Super Mario%';
    `);
    
    console.log("✅ Base de datos actualizada para usar fotos locales.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
};

useLocalImages();
