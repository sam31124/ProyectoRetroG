const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Leer el token del header
  const token = req.header('Authorization');

  // 2. Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' });
  }

  try {
    // 3. Limpiar el prefijo "Bearer " (si viene desde el frontend)
    const tokenLimpio = token.replace('Bearer ', '');

    // 4. Verificar que el token sea original
    const cifrado = jwt.verify(tokenLimpio, process.env.JWT_SECRET || 'secreto');

    // 5. Guardar el usuario en la petición para usarlo después
    req.usuario = cifrado;
    
    // Dejar pasar al controlador
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};