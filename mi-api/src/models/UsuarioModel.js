const pool = require('../config/db');

class UsuarioModel {
  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  // Ahora acepta un objeto 'usuario' desestructurado
  async create(usuario) {
    const { nombre, email, password, rol } = usuario;
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, password, rol || 'cliente']
    );
    return result.rows[0];
  }
}

module.exports = new UsuarioModel();