const pool = require('../config/db');

// Clase que maneja solo consultas SQL de usuarios
class UsuarioModel {
  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  async create(nombre, email, password, rol) {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, password, rol]
    );
    return result.rows[0];
  }
}

module.exports = new UsuarioModel();
