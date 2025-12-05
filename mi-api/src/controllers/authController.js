const UsuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario en DB
    const user = await UsuarioModel.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // 2. Verificar contraseña
    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // 3. Crear Token (JWT)
    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '2h' }
    );

    res.json({ token, user: { nombre: user.nombre, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
