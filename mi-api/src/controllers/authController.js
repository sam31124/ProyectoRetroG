const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/UsuarioModel');

// 1. LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsuarioModel.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '2h' }
    );
    res.json({ token, user: { nombre: user.nombre, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. REGISTER
exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const nuevoUsuario = await UsuarioModel.create({
        nombre, 
        email, 
        password: hashedPassword, 
        rol
    });
    
    res.status(201).json({ message: 'Usuario registrado', user: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar' });
  }
};
